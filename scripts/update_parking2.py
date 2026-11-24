from _future_ import annotations

import json
import urllib.request
import xml.etree.ElementTree as etree
from datetime import datetime, timezone
from pathlib import Path 

# =========================================================
# TruckParking Nederland — NDW updater
# =========================================================

ROOT = Path(_file_).resolve().parent.parent
DATA_FILE = ROOT / "data" / "parking.json"

STATUS_URL = (
  "https://opendata.ndw.nu/Truckparking_Parking_Status.xml"
)

TIMEOUT = 30

# Only the parkings we have included in our project.
# Capacity is taken from our reviewed static table, not live status.

PARKING_IDS = {
  "NL-12_421": "venlo",
    "NL-12_8": "asten",
    "NL-12_408": "de-punt",
    "NL-12_409": "botlek",
    "NL-12_411": "maasvlakte-plaza",
    "NL-12_418": "maasvlakte-plaza-zuid",
    "NL-12_413": "hazeldonk",
    "NL-12_414": "waalhaven",
}

def now_utc():
  return
  datetime.now(timezone.utc).isoformat(timespec = "seconds")

def local_name(tag):
    """Remove XML namespace from tag."""
    return tag.split("}")[-1]

def find_all(element, name):
  """Find all elements by local XML name."""
  return [
    node for node in element.iter()
    if local_name(node.tag) == name
  ]

  def find_first(element, name):
    """Find first matching descendant."""
    for node in element.iter():
      if local_name(node.tag) == name:
        return node
    return None


def get_text(element, name):
  node = find_first(element, name)
  if node is None or node.text is None:
    return None
    return node.text.strip()   

def get_attribute_by_local_name(element, name):
  for key, value in element.attrib.items():
    if local_name(key) == name:
      return value
  return None 

def download_xml(url):
  request = urllib.request.Request(
    url,
    headers = {"User-Agent": "TruckParkingNederland/1.0"}
  )

  with urllib.request.urlopen(request, timeout= TIMEOUT) as
  response:
  content = response.read()

  if not content:
    raise ValueError("Downloaded XML is empty")

  return ET.fromstring(content)

  def parse_integer(value):
    if value is None:
      return None

  try:
    number = int(value.strip())
    return number
  except (ValueError, TypeError):
    return None

  def parse_percentage(value):
    if value is None:
      return None


  try:
    number = float(value.strip())
    except (ValueError, TypeError):
      return None

  if number < 0 or number > 100:
    return None


  return number

  def load_existing_data():
    if not DATA_FILE.exists():
      raise FileNotFoundError(
        f"Data file not found: {DATA_FILE}"
      )    

   with DATA_FILE.open("r", encoding="utf-8") as file:
    return json.load(file)

  def parse_status_xml(xml_root):
    """
    Parse dynamic status records from the NDW XML.
    Only IDs belonging to our selected parking list are used.
    """
    results = {}

    for record in find_all(xml_root, "parkingRecordReference"):
      ndw_id = get_attribute_by_local_name(record, "id")

      if not ndw_id or ndw_id not in PARKING_IDS:
        continue


      parent = None


      # The XML reference is not always the parent record itself.
        # Locate its nearest containing parking record.

    for candidate in xml_root.iter():
      if record in list(candidate):
        parent = candidate
        break


       # Fallback: use reference's enclosing structure.
       if parent is None:
        parent = record


      results[ndw_id] = {
        "free": None,
            "occupied": None,
            "percentage": None,
            "site_status": None,
            "updated": None,
      }

      # Parse whole parking records to retain context.
      for parking_record in find_all(xml_root, "parkingRecord"):
        reference = find_first(parking_record, "parkingRecordReference")


        if reference is None:
          # Some records may contain the ID directly.
          ndw_id = get_attribute_by_local_name(
            parking_record, "id"
          )
        else:
          ndw_id = get_attribute_by_local_name(
            reference, "id"
          )

        if not ndw_id or ndw_id not in PARKING_IDS:
          continue

        occupancy = find_first(
          parking_record, "parkingOccupancy"
        )

        if occupancy is None:
          continue

        free = parse_integer(
          get_text(occupancy, "parkingNumberOfVacantSpaces")
        )

        occupied = parse_integer(
          get_text(occupancy, "parkingNumberOfOccupiedSpaces")
        )

        percentage = parse_percentage(
          get_text(occupancy, "parkingOccupancyPercentage")
        )

        site_status = get_text(
          parking_record, "parkingSiteStatus"
        )

        timestamp = (
          get_text(parking_record, "parkingOccupancyTime")
          or get_text(parking_record, "observationTime")
        )

        results[ndw_id] = {
          "free": free,
            "occupied": occupied,
            "percentage": percentage,
            "site_status": site_status,
            "updated": timestamp,
        }

        return results


  def validate_status(status, capacity):
    """
    Returns a trustworthy free-space count or None.

    Never converts invalid values to zero.
    """

    if not status:
      return None

  free = status.get("free")
  occupied = status.get("occupied")
  percentage = status.get("percentage")
  site_status = status.get("site_status")

  if capacity is None or capacity <= 0:
    return None

  if free is None or free < 0 or free > capacity:
    return None


if occupied is not None:
  if occupied < 0 or occupied > capacity:
    return None

  if free + occupied > capacity:
    return None

if percentage is not None:
  if percentage < 0 or percentage > 100:
    return None

# If NDW explicitly reports "full", only accept zero free
    # spaces when occupancy data independently supports it.
if site_status == "full":
  if free != 0:
    return None

  if occupied is None or occupied != capacity:
    return None

  return 0

 # Accept free-space data only if NDW reports availability
    # and the numeric values are internally plausible.
if site_status == "spacesAvailable":
  if free <= 0:
    return None


  if occupied is None:
    return None


  if occupied + free != capacity:
    return None

  return free


  # Unknown status or any unrecognized status: do not guess.
  return None
       
      
def update_parking_data():
  print("Downloading NDW parking status...")

 # Download and parse before touching the existing file.
 xml_root = download_xml(STATUS_URL)
 status_data = parse_status_xml(xml_root)

 data = load_existing_data()

 successful_update_time = now_utc()

 for parking in data.get("parkings", [])
   ndw_id = parking.get("ndw_id")
   capacity = parking.get("capacity")

   status = status_data.get(ndw_id)

   validated_free = validate_status(status, capacity)

   parking["free"] = validated_free
   parking["status"] = (
    status.get("site_status", "unknown")
    if status
    else "unknown"
   )

   parking["updated"] = (
    status.get("updated")
    if status and validated_free is not None
    else None
   )

   # Keep the source explicit.
   parking["source"] = "NDW"

   data["updated_at"] = successful_update_time

   # Write to temporary file first to avoid corrupting JSON
    # if the process stops during writing.
    temporary_file = DATA_FILE.with_suffix(".tmp")

    with temporary_file.open("w", encoding="utf-8") as file:
      json.dump(
        data,
        file,
        ensure_ascii=False,
        indent=2
      )
      file.write("\n")

      temporary_file.replace(DATA_FILE)

      print("Parking data updated successfully.")
      print(f"Timestamp: {successful_update_time}")

   if _name_ == "_main_":
    try:
      update_parking_data()
      except Exception as error:
        print(f"Update failed: {error}")   
        raise