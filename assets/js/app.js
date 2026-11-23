/* =====================================================
   TRUCKPARKING NEDERLAND
   Main JavaScript
   Languages: RU / EN / BE / UK
   ===================================================== */
/* ==================== TRANSLATIONS ==================== */
const translations = {
  ru: {
    liveData: "Данные NDW",
    eyebrow: "ГРУЗОВЫЕ ПАРКОВКИ · НИДЕРЛАНДЫ",
    headline: 'Найди свободное место <span>для своего грузовика.</span>',
    description: "Актуальная информация о загруженности грузовых парковок Нидерландов в одном месте.",
    lastUpdate: "Последнее обновление",
    dataSource: "Источник: NDW",
    parkingCount: "Парковок в списке",
    totalCapacity: "Общая вместимость",
    freeSpaces: "Свободные места",
    searchPlaceholder: "Поиск парковки или города...",
    filterAll: "Все парковки",
    filterAvailable: "Есть свободные места",
    filterFull: "Заполненные",
    filterUnknown: "Нет данных",
    refresh: "Обновить",
    parkingTitle: "Грузовые парковки",
    noResults: "Парковки не найдены.",
    loadError: "Не удалось загрузить данные парковок.",
    retry: "Повторить",
    footerDescription: "Информация о грузовых парковках Нидерландов.",
    disclaimer: "Данные могут обновляться с задержкой. Перед въездом проверяйте доступность мест непосредственно на парковке.",
    free: "свободно",
    occupied: "занято",
    spaces: "мест",
    total: "всего",
    availableStatus: "Есть свободные места",
    almostFull: "Почти заполнена",
    fullStatus: "Заполнена",
    unknownStatus: "Нет данных",
    updated: "Обновлено",
    loading: "Загрузка..."

  },
  en: {
    liveData: "NDW data",
    eyebrow: "TRUCK PARKING · NETHERLANDS",
    headline: 'Find a free spot <span>for your truck.</span>',
    description: "Current truck parking availability across the Netherlands in one place.",
    lastUpdate: "Last update",
    dataSource: "Source: NDW",
    parkingCount: "Parkings listed",
    totalCapacity: "Total capacity",
    freeSpaces: "Free spaces",
    searchPlaceholder: "Search parking or city...",
    filterAll: "All parking",
    filterAvailable: "Spaces available",
    filterFull: "Full parking",
    filterUnknown: "No data",
    refresh: "Refresh",
    parkingTitle: "Truck parking",
    noResults: "No parking found.",
    loadError: "Unable to load parking data.",
    retry: "Try again",
    footerDescription: "Truck parking information for the Netherlands.",
    disclaimer: "Data may be delayed. Check availability locally before entering.",
    free: "free",
    occupied: "occupied",
    spaces: "spaces",
    total: "total",
    availableStatus: "Spaces available",
    almostFull: "Almost full",
    fullStatus: "Full",
    unknownStatus: "No data",
    updated: "Updated",
    loading: "Loading..."
  },
  be: {
    liveData: "Даныя NDW",
    eyebrow: "СТАЯНКІ ДЛЯ ГРУЗАВІКОЎ · НІДЭРЛАНДЫ",
    headline: 'Знайдзі свабоднае месца <span>для свайго грузавіка.</span>',
    description: "Актуальная інфармацыя пра загружанасць грузавых стаянак Нідэрландаў у адным месцы.",
    lastUpdate: "Апошняе абнаўленне",
    dataSource: "Крыніца: NDW",
    parkingCount: "Стаянкі ў спісе",
    totalCapacity: "Агульная ёмістасць",
    freeSpaces: "Свабодныя месцы",
    searchPlaceholder: "Пошук стаянкі або горада...",
    filterAll: "Усе стаянкі",
    filterAvailable: "Ёсць свабодныя месцы",
    filterFull: "Запоўненыя",
    filterUnknown: "Няма даных",
    refresh: "Абнавіць",
    parkingTitle: "Грузавыя стаянкі",
    noResults: "Стаянкі не знойдзены.",
    loadError: "Не ўдалося загрузіць даныя стаянак.",
    retry: "Паўтарыць",
    footerDescription: "Інфармацыя пра грузавыя стаянкі Нідэрландаў.",
    disclaimer: "Даныя могуць абнаўляцца з затрымкай. Правярай наяўнасць месцаў непасрэдна на стаянцы.",
    free: "свабодна",
    occupied: "занята",
    spaces: "месцаў",
    total: "усяго",
    availableStatus: "Ёсць свабодныя месцы",
    almostFull: "Амаль запоўнена",
    fullStatus: "Запоўнена",
    unknownStatus: "Няма даных",
    updated: "Абноўлена",
    loading: "Загрузка..."
  },
  uk: {
    liveData: "Дані NDW",
    eyebrow: "ВАНТАЖНІ ПАРКІНГИ · НІДЕРЛАНДИ",
    headline: 'Знайди вільне місце <span>для своєї вантажівки.</span>',
    description: "Актуальна інформація про завантаженість вантажних паркінгів Нідерландів в одному місці.",
    lastUpdate: "Останнє оновлення",
    dataSource: "Джерело: NDW",
    parkingCount: "Паркінгів у списку",
    totalCapacity: "Загальна місткість",
    freeSpaces: "Вільні місця",
    searchPlaceholder: "Пошук паркінгу або міста...",
    filterAll: "Усі паркінги",
    filterAvailable: "Є вільні місця",
    filterFull: "Заповнені",
    filterUnknown: "Немає даних",
    refresh: "Оновити",
    parkingTitle: "Вантажні паркінги",
    noResults: "Паркінги не знайдені.",
    loadError: "Не вдалося завантажити дані паркінгів.",
    retry: "Спробувати знову",
    footerDescription: "Інформація про вантажні паркінги Нідерландів.",
    disclaimer: "Дані можуть оновлюватися із затримкою. Перевіряйте наявність місць безпосередньо на паркінгу.",
    free: "вільно",
    occupied: "зайнято",
    spaces: "місць",
    total: "усього",
    availableStatus: "Є вільні місця",
    almostFull: "Майже заповнений",
    fullStatus: "Заповнений",
    unknownStatus: "Немає даних",
    updated: "Оновлено",
    loading: "Завантаження..."
  }

};

/* ==================== STATE ==================== */

let currentLanguage = "ru";
let parkingData = [];
let isLoading = false;

/* ==================== ELEMENTS ==================== */
const elements = {
  language: document.getElementById("languageSelect"),
  search: document.getElementById("parkingSearch"),
  filter: document.getElementById("parkingFilter"),
  refresh: document.getElementById("refreshButton"),
  retry: document.getElementById("retryButton"),
  parkingList: document.getElementById("parkingList"),
  parkingCount: document.getElementById("parkingCount"),
  totalCapacity: document.getElementById("totalCapacity"),
  freeSpaces: document.getElementById("freeSpaces"),
  lastUpdate: document.getElementById("lastUpdateTime"),
  resultCount: document.getElementById("parkingResultCount"),
  emptyMessage: document.getElementById("emptyMessage"),
  errorMessage: document.getElementById("errorMessage")
};

/* ==================== LANGUAGE ==================== */

function t(key) {
  return translations[currentLanguage]?.[key]
    ?? translations.ru[key]
    ?? key;
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (translations[currentLanguage][key]) {
      element.innerHTML = translations[currentLanguage][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
    const key = element.dataset.i18nPlaceholder;
    if (translations[currentLanguage][key]) {
      element.placeholder = translations[currentLanguage][key];
    }
  });
  elements.language.value = currentLanguage;
  renderParking();
}

function changeLanguage(language) {
  if (!translations[language]) return;
  currentLanguage = language;

  try {
    localStorage.setItem("tp-language", language);
  } catch (error) {
    console.warn("Language preference could not be saved.", error);
  }
  applyLanguage();
}

/* ==================== DATA HELPERS ==================== */

function validNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}
function getOccupancy(parking) {
  const capacity = validNumber(parking.capacity);
  const free = validNumber(parking.free);

  if (capacity === null || free === null || capacity <= 0 || free > capacity) {
    return null;
  }
  return Math.round(((capacity - free) / capacity) * 100);
}

function getStatus(parking) {
  const capacity = validNumber(parking.capacity);
  const free = validNumber(parking.free);
  if (capacity === null || free === null || capacity <= 0 || free > capacity) {
    return {
      className: "unknown",
      label: t("unknownStatus")
    };
  }
  if (free === 0) {
    return {
      className: "full",
      label: t("fullStatus")
    };
  }
  const occupancy = getOccupancy(parking);
  if (occupancy >= 85) {
    return {
      className: "almost-full",
      label: t("almostFull")
    };
  }
  return {
    className: "available",
    label: t("availableStatus")
  };
}

/* ==================== SAFE HTML ==================== */
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g,
    character => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };
      return entities[character];
    });
}


/* ==================== STATISTICS ==================== */
function updateStatistics() {
  const knownCapacity = parkingData.reduce((sum, parking) => {
    return sum + (validNumber(parking.capacity) ?? 0);
  }, 0);

  const knownFreeSpaces = parkingData.reduce((sum, parking) => {
    return sum + (validNumber(parking.free) ?? 0);
  }, 0);

  elements.parkingCount.textContent = parkingData.length.toLocaleString(currentLanguage);
  elements.totalCapacity.textContent = knownCapacity.toLocaleString(currentLanguage);
  elements.freeSpaces.textContent = knownFreeSpaces.toLocaleString(currentLanguage);
}

/* ==================== PARKING CARD ==================== */

function createParkingCard(parking) {
  const status = getStatus(parking);
  const occupancy = getOccupancy(parking);
  const capacity = validNumber(parking.capacity);
  const free = validNumber(parking.free);
  const occupied = capacity !== null && free !== null ? capacity - free : null;
  const card = document.createElement("article");
  card.className = "parking-card";
  card.innerHTML = `
  <div class="card-top">
      <div>
          <div class="parking-name">
              ${escapeHTML(parking.name)}
          </div>
          <div class="parking-location">
              ${escapeHTML(parking.location || "Nederland")}  
          </div>
      </div>
      <span class="status ${status.className}">
          ${status.label}
      </span>
  </div>
  <div class="numbers">
      <div class="free-number">
          ${free === null ? "-" : free.toLocaleString(currentLanguage)}
          <small>
              ${t("free")} / ${capacity === null ? "-" : capacity.toLocaleString(currentLanguage)}${t("spaces")}
          </small>
      </div>
      <div class="occupancy">
          <strong>
              ${occupancy === null ? "-" : occupancy + "%"}
          </strong>
          ${t("occupied")}
      </div>
  </div>
  <div class="progress">
      <span class="${status.className}"
      style="width: ${occupancy ?? 0}%">
      </span>
  </div>
  <div class="card-bottom">
      <span>
          ${escapeHTML(parking.source || "NDW")}
      </span>
      <span>
          ${parking.updated ? t("updated") + ": " + escapeHTML(parking.update)
      : t("unknownStatus")}
      </span>
  </div>
  `;
  return card;
}

/* ==================== FILTERING ==================== */

function getFilteredParking() {
  const query = elements.search.value.trim().toLocaleLowerCase(currentLanguage);
  const filter = elements.filter.value;
  return parkingData.filter(parking => {
    const searchableText = (
      (parking.name || "") + " " + (parking.location || "")
    ).toLocaleLowerCase(currentLanguage);
    if (query && !searchableText.includes(query)) {
      return false;
    }
    const status = getStatus(parking);
    if (filter === "available" && status.className !== "available") {
      return false;
    }
    if (filter === "full" && status.className !== "full") {
      return false;
    }
    if (filter === "unknown" && status.className !== "unknown") {
      return false;
    }
    return true;
  });
}

/* ==================== RENDER PARKING ==================== */

function renderParking() {
  if (!elements.parkingList) return;
  const filteredParking = getFilteredParking();
  elements.parkingList.replaceChildren();
  filteredParking.forEach(parking => {
    elements.parkingList.appendChild(
      createParkingCard(parking)
    );
  });
  elements.resultCount.textContent = `
  ${filteredParking.length}
  `;
  elements.emptyMessage.hidden = filteredParking.length !== 0;
  updateStatistics();
}


/* ==================== LOAD DATA ==================== */
async function loadParkingData() {
  if (isLoading) return;
  isLoading = true;
  elements.refresh.disabled = true;
  elements.errorMessage.hidden = true;

  try {
    const response = await fetch(
      "data/parking.json?timestamp=" + Date.now(),
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    const data = await response.json();
    if (!Array.isArray(data.parkings)) {
      throw new Error("Invalid parking data format");
    }
    parkingData = data.parkings;
    if (data.updated_at) {
      const date = new Date(data.updated_at);
      elements.lastUpdate.textContent = Number.isNaN(date.getTime())
        ? "-" : date.toLocaleString(currentLanguage);
    } else {
      elements.lastUpdate.textContent = "-";
    }
    renderParking();
  }
  catch (error) {
    console.error("Parking loading error:", error);
    elements.errorMessage.hidden = false;
  }
  finally {
    isLoading = false;
    elements.refresh.disabled = false;
  }
}

/* ==================== EVENTS ==================== */
elements.language.addEventListener("change", event => {
  changeLanguage(event.target.value);
});
elements.search.addEventListener("input", () => {
  renderParking();
});
elements.filter.addEventListener("change", () => {
  renderParking();
});
elements.refresh.addEventListener("click", () => {
  loadParkingData();
});
elements.retry.addEventListener("click", () => {
  loadParkingData();
});

/* ==================== INITIALIZATION ==================== */

function initializeApp() {
  try {
    const savedLanguage = localStorage.getItem("tp-language");
    if (savedLanguage && translations[savedLanguage]) {
      currentLanguage = savedLanguage;
    }
  } catch (error) {
    console.warn("Could not read saved language.", error);
  }
  applyLanguage();
  loadParkingData();
  // Automatic data refresh every 5 minutes
  setInterval(() => {
    loadParkingData();
  }, 5 * 60 * 1000);
}
initializeApp();
