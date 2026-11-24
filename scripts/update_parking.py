import json
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "data" / "parking.json"

STATUS_URL = "https://opendata.ndw.nu/Truckparking_Parking_Status.xml"
TIMEOUT = 30

PARKING_IDS = {
    "NL-12_421",
    "NL-12_8",
    "NL-12_408",
    "NL-12_409",
    "NL-12_411",
    "NL-12_418",
    "NL-12_413",
    "NL-12_414",
}


def local_name(tag):
    return tag.split("}")[-1]


def find_all(element, name):
    return [
        e for e in element.iter()
        if local_name(e.tag) == name
    ]


def find_first(element, name):
    for e in element.iter():
        if local_name(e.tag) == name:
            return e
    return None


def text_of(element, name):
    node = find_first(element, name)
    return node.text.strip() if node is not None and node.text else None


def parse_int(value):
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def download_xml(url):
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "TruckParkingNederland/1.0"}
    )

    with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
        content = response.read()

    if not content:
        raise ValueError("NDW returned an empty response")

    return ET.fromstring(content)


def load_data():
    with DATA_FILE.open("r", encoding="utf-8") as f:
        return json.load(f)


def parse_status(xml_root):
    results = {}

    # NDW status records are named parkingRecordStatus.
    for record in find_all(xml_root, "parkingRecordStatus"):
        reference = find_first(record, "parkingRecordReference")

        if reference is None:
            continue

        ndw_id = reference.attrib.get("id")

        if ndw_id not in PARKING_IDS:
            continue

        # Read the first occupancy group only.
        occupancies = find_all(record, "parkingOccupancy")

        if not occupancies:
            continue

        occupancy = occupancies[0]

        free = parse_int(
            text_of(occupancy, "parkingNumberOfVacantSpaces")
        )

        occupied = parse_int(
            text_of(occupancy, "parkingNumberOfOccupiedSpaces")
        )

        site_status = text_of(record, "parkingSiteStatus")

        updated = text_of(record, "parkingStatusOriginTime")

        results[ndw_id] = {
            "free": free,
            "occupied": occupied,
            "site_status": site_status,
            "updated": updated,
        }

    return results


def validate_free(status, capacity):
    if not status or not capacity or capacity <= 0:
        return None

    free = status["free"]
    occupied = status["occupied"]
    site_status = status["site_status"]

    # Reject missing, negative, or impossible counts.
    if free is None or occupied is None:
        return None

    if free < 0 or occupied < 0:
        return None

    if free > capacity or occupied > capacity:
        return None

    if free + occupied > capacity:
        return None

    # A "full" status is trusted only if the count
    # independently confirms the parking is actually full.
    if site_status == "full":
        if free == 0 and occupied == capacity:
            return 0
        return None

    # Availability is accepted only when counts match
    # the reviewed total capacity.
    if site_status == "spacesAvailable":
        if free > 0 and free + occupied == capacity:
            return free
        return None

    # Unknown status means unknown availability.
    return None


def update_data():
    print("Fetching NDW data...")

    # Download and parse first. If this fails, the existing
    # parking.json will not be touched.
    xml_root = download_xml(STATUS_URL)
    statuses = parse_status(xml_root)

    data = load_data()
    timestamp = datetime.now(timezone.utc).isoformat(
        timespec="seconds"
    )

    for parking in data["parkings"]:
        ndw_id = parking.get("ndw_id")
        status = statuses.get(ndw_id)

        free = validate_free(status, parking.get("capacity"))

        parking["free"] = free
        parking["status"] = (
            status["site_status"] if status else "unknown"
        )

        # Only record a timestamp when availability
        # passed validation.
        parking["updated"] = (
            status["updated"]
            if status and free is not None
            else None
        )

        parking["source"] = "NDW"

    data["updated_at"] = timestamp

    # Write safely to a temporary file first.
    temp_file = DATA_FILE.with_suffix(".tmp")

    with temp_file.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")

    temp_file.replace(DATA_FILE)

    print("Update complete:", timestamp)


if __name__ == "__main__":
    try:
        update_data()
    except Exception as e:
        print("Update failed:", e)
        raise