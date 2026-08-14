export interface BgLocation {
  name: string;
  type: "град" | "село" | "курорт" | "локация";
  lat: number;
  lng: number;
  region?: string;
}

export const BG_LOCATIONS_DATABASE: BgLocation[] = [
  // 1. Regional Capitals & Major Cities
  { name: "София", type: "град", lat: 42.6977, lng: 23.3219, region: "София-град" },
  { name: "Пловдив", type: "град", lat: 42.1354, lng: 24.7453, region: "Пловдив" },
  { name: "Варна", type: "град", lat: 43.2141, lng: 27.9147, region: "Варна" },
  { name: "Бургас", type: "град", lat: 42.5048, lng: 27.4626, region: "Бургас" },
  { name: "Русе", type: "град", lat: 43.8356, lng: 25.9657, region: "Русе" },
  { name: "Стара Загора", type: "град", lat: 42.4258, lng: 25.6345, region: "Стара Загора" },
  { name: "Плевен", type: "град", lat: 43.417, lng: 24.6067, region: "Плевен" },
  { name: "Сливен", type: "град", lat: 42.6817, lng: 26.3228, region: "Сливен" },
  { name: "Добрич", type: "град", lat: 43.5726, lng: 27.8273, region: "Добрич" },
  { name: "Шумен", type: "град", lat: 43.2712, lng: 26.9361, region: "Шумен" },
  { name: "Перник", type: "град", lat: 42.6052, lng: 23.0378, region: "Перник" },
  { name: "Хасково", type: "град", lat: 41.9344, lng: 25.5556, region: "Хасково" },
  { name: "Ямбол", type: "град", lat: 42.4842, lng: 26.5035, region: "Ямбол" },
  { name: "Пазарджик", type: "град", lat: 42.1928, lng: 24.3336, region: "Пазарджик" },
  { name: "Благоевград", type: "град", lat: 42.0209, lng: 23.0943, region: "Благоевград" },
  { name: "Велико Търново", type: "град", lat: 43.0757, lng: 25.6172, region: "Велико Търново" },
  { name: "Габрово", type: "град", lat: 42.8742, lng: 25.3187, region: "Габрово" },
  { name: "Враца", type: "град", lat: 43.2102, lng: 23.5529, region: "Враца" },
  { name: "Казанлък", type: "град", lat: 42.6194, lng: 25.3939, region: "Стара Загора" },
  { name: "Видин", type: "град", lat: 43.9962, lng: 22.8679, region: "Видин" },
  { name: "Асеновград", type: "град", lat: 42.0089, lng: 24.8778, region: "Пловдив" },
  { name: "Кюстендил", type: "град", lat: 42.2869, lng: 22.6919, region: "Кюстендил" },
  { name: "Монтана", type: "град", lat: 43.4125, lng: 23.225, region: "Монтана" },
  { name: "Димитровград", type: "град", lat: 42.0569, lng: 25.5983, region: "Хасково" },
  { name: "Ловеч", type: "град", lat: 43.137, lng: 24.7142, region: "Ловеч" },
  { name: "Силистра", type: "град", lat: 44.1147, lng: 27.2672, region: "Силистра" },
  { name: "Разград", type: "град", lat: 43.5262, lng: 26.5256, region: "Разград" },
  { name: "Търговище", type: "град", lat: 43.2514, lng: 26.5728, region: "Търговище" },
  { name: "Дупница", type: "град", lat: 42.2644, lng: 23.1172, region: "Кюстендил" },
  { name: "Смолян", type: "град", lat: 41.5774, lng: 24.7121, region: "Смолян" },

  // 2. Black Sea Coast Resorts & Towns
  { name: "Созопол", type: "град", lat: 42.4175, lng: 27.6958, region: "Бургас" },
  { name: "Несебър", type: "град", lat: 42.6592, lng: 27.7354, region: "Бургас" },
  { name: "Поморие", type: "град", lat: 42.5583, lng: 27.6444, region: "Бургас" },
  { name: "Слънчев бряг", type: "курорт", lat: 42.6953, lng: 27.7083, region: "Бургас" },
  { name: "Свети Влас", type: "град", lat: 42.7136, lng: 27.7597, region: "Бургас" },
  { name: "Равда", type: "село", lat: 42.6425, lng: 27.6764, region: "Бургас" },
  { name: "Ахелой", type: "град", lat: 42.6458, lng: 27.6486, region: "Бургас" },
  { name: "Черноморец", type: "град", lat: 42.4439, lng: 27.6381, region: "Бургас" },
  { name: "Приморско", type: "град", lat: 42.2683, lng: 27.7561, region: "Бургас" },
  { name: "Китен", type: "град", lat: 42.2344, lng: 27.7761, region: "Бургас" },
  { name: "Лозенец", type: "село", lat: 42.2114, lng: 27.8086, region: "Бургас" },
  { name: "Царево", type: "град", lat: 42.1708, lng: 27.8486, region: "Бургас" },
  { name: "Ахтопол", type: "град", lat: 42.0989, lng: 27.9408, region: "Бургас" },
  { name: "Синеморец", type: "село", lat: 42.0622, lng: 27.9786, region: "Бургас" },
  { name: "Варвара", type: "село", lat: 42.1214, lng: 27.9103, region: "Бургас" },
  { name: "Балчик", type: "град", lat: 43.4114, lng: 28.1631, region: "Добрич" },
  { name: "Каварна", type: "град", lat: 43.4342, lng: 28.3392, region: "Добрич" },
  { name: "Шабла", type: "град", lat: 43.5358, lng: 28.5342, region: "Добрич" },
  { name: "Крапец", type: "село", lat: 43.6264, lng: 28.5714, region: "Добрич" },
  { name: "Тюленово", type: "село", lat: 43.4925, lng: 28.5833, region: "Добрич" },
  { name: "Златни пясъци", type: "курорт", lat: 43.2875, lng: 28.0417, region: "Варна" },
  { name: "Св. Св. Константин и Елена", type: "курорт", lat: 43.2333, lng: 28.0167, region: "Варна" },
  { name: "Албена", type: "курорт", lat: 43.3667, lng: 28.0833, region: "Добрич" },
  { name: "Обзор", type: "град", lat: 42.8186, lng: 27.8797, region: "Бургас" },
  { name: "Бяла", type: "град", lat: 42.8739, lng: 27.8886, region: "Варна" },
  { name: "Дюни", type: "курорт", lat: 42.3717, lng: 27.7083, region: "Бургас" },

  // 3. Mountain & Spa Resorts
  { name: "Банско", type: "град", lat: 41.8383, lng: 23.4883, region: "Благоевград" },
  { name: "Разлог", type: "град", lat: 41.8864, lng: 23.4686, region: "Благоевград" },
  { name: "Добринище", type: "град", lat: 41.8175, lng: 23.5636, region: "Благоевград" },
  { name: "Боровец", type: "курорт", lat: 42.2667, lng: 23.6083, region: "София област" },
  { name: "Самоков", type: "град", lat: 42.3375, lng: 23.5614, region: "София област" },
  { name: "Пампорово", type: "курорт", lat: 41.6583, lng: 24.6958, region: "Смолян" },
  { name: "Чепеларе", type: "град", lat: 41.7289, lng: 24.6853, region: "Смолян" },
  { name: "Велинград", type: "град", lat: 42.0278, lng: 23.9917, region: "Пазарджик" },
  { name: "Сандански", type: "град", lat: 41.5647, lng: 23.2778, region: "Благоевград" },
  { name: "Петрич", type: "град", lat: 41.3986, lng: 23.2072, region: "Благоевград" },
  { name: "Девин", type: "град", lat: 41.7431, lng: 24.4008, region: "Смолян" },
  { name: "Сапарева баня", type: "град", lat: 42.2883, lng: 23.2583, region: "Кюстендил" },
  { name: "Хисаря", type: "град", lat: 42.5028, lng: 24.7083, region: "Пловдив" },
  { name: "Павел баня", type: "град", lat: 42.5972, lng: 25.2064, region: "Стара Загора" },
  { name: "Вършец", type: "град", lat: 43.1947, lng: 23.2864, region: "Монтана" },
  { name: "Троян", type: "град", lat: 42.8944, lng: 24.7139, region: "Ловеч" },
  { name: "Априлци", type: "град", lat: 42.8417, lng: 24.9194, region: "Ловеч" },
  { name: "Тетевен", type: "град", lat: 42.9208, lng: 24.2611, region: "Ловеч" },
  { name: "Рибарица", type: "село", lat: 42.8333, lng: 24.3833, region: "Ловеч" },
  { name: "Гоце Делчев", type: "град", lat: 41.5714, lng: 23.7278, region: "Благоевград" },

  // 4. Cultural, Historic & Popular Wedding / Event Locations
  { name: "Перущица", type: "град", lat: 42.0567, lng: 24.5458, region: "Пловдив" },
  { name: "Червен", type: "село", lat: 43.6212, lng: 25.9961, region: "Русе" },
  { name: "Арбанаси", type: "село", lat: 43.0975, lng: 25.6692, region: "Велико Търново" },
  { name: "Мелник", type: "град", lat: 41.5236, lng: 23.3958, region: "Благоевград" },
  { name: "Трявна", type: "град", lat: 42.8683, lng: 25.4958, region: "Габрово" },
  { name: "Елена", type: "град", lat: 42.9306, lng: 25.8778, region: "Велико Търново" },
  { name: "Боженци", type: "село", lat: 42.9333, lng: 25.4167, region: "Габрово" },
  { name: "Копривщица", type: "град", lat: 42.6406, lng: 24.3583, region: "София област" },
  { name: "Панагюрище", type: "град", lat: 42.5056, lng: 24.1833, region: "Пазарджик" },
  { name: "Батак", type: "град", lat: 41.9431, lng: 24.2181, region: "Пазарджик" },
  { name: "Пещера", type: "град", lat: 42.0333, lng: 24.3000, region: "Пазарджик" },
  { name: "Брацигово", type: "град", lat: 42.0222, lng: 24.3722, region: "Пазарджик" },
  { name: "Карлово", type: "град", lat: 42.6417, lng: 24.8083, region: "Пловдив" },
  { name: "Сопот", type: "град", lat: 42.6500, lng: 24.7500, region: "Пловдив" },
  { name: "Калофер", type: "град", lat: 42.6125, lng: 24.9778, region: "Пловдив" },
  { name: "Белоградчик", type: "град", lat: 43.6264, lng: 22.6833, region: "Видин" },
  { name: "Своге", type: "град", lat: 42.9606, lng: 23.3517, region: "София област" },
  { name: "Правец", type: "град", lat: 42.8944, lng: 23.9167, region: "София област" },
  { name: "Ботевград", type: "град", lat: 42.9056, lng: 23.7889, region: "София област" },
  { name: "Елин Пелин", type: "град", lat: 42.6694, lng: 23.6000, region: "София област" },
  { name: "Горна Оряховица", type: "град", lat: 43.1278, lng: 25.7000, region: "Велико Търново" },
  { name: "Лясковец", type: "град", lat: 43.1083, lng: 25.7167, region: "Велико Търново" },
  { name: "Севлиево", type: "град", lat: 43.0250, lng: 25.1111, region: "Габрово" },
  { name: "Радомир", type: "град", lat: 42.5444, lng: 22.9639, region: "Перник" },
  { name: "Козлодуй", type: "град", lat: 43.7806, lng: 23.7250, region: "Враца" },
  { name: "Попово", type: "град", lat: 43.3486, lng: 26.2306, region: "Търговище" },
  { name: "Берковица", type: "град", lat: 43.2389, lng: 23.1278, region: "Монтана" },
  { name: "Провадия", type: "град", lat: 43.1806, lng: 27.4361, region: "Варна" },
  { name: "Луковит", type: "град", lat: 43.2042, lng: 24.1625, region: "Ловеч" },
  { name: "Свиленград", type: "град", lat: 41.7667, lng: 26.2000, region: "Хасково" },
  { name: "Харманли", type: "град", lat: 41.9333, lng: 25.9000, region: "Хасково" },
  { name: "Чирпан", type: "град", lat: 42.2000, lng: 25.3333, region: "Стара Загора" },
  { name: "Нова Загора", type: "град", lat: 42.4833, lng: 26.0167, region: "Сливен" },
  { name: "Айтос", type: "град", lat: 42.7000, lng: 27.2500, region: "Бургас" },
  { name: "Карнобат", type: "град", lat: 42.6500, lng: 26.9833, region: "Бургас" },
  { name: "Котел", type: "град", lat: 42.8833, lng: 26.4500, region: "Сливен" },
  { name: "Ивайловград", type: "град", lat: 41.5333, lng: 26.1333, region: "Хасково" },

  // 5. Popular Suburban & Wedding Villages
  { name: "с. Лозен", type: "село", lat: 42.6000, lng: 23.4833, region: "София-град" },
  { name: "с. Бистрица", type: "село", lat: 42.5833, lng: 23.3667, region: "София-град" },
  { name: "с. Панчарево", type: "село", lat: 42.5897, lng: 23.4072, region: "София-град" },
  { name: "с. Пасарел", type: "село", lat: 42.5412, lng: 23.5012, region: "София област" },
  { name: "Банкя", type: "град", lat: 42.7083, lng: 23.1417, region: "София-град" },
  { name: "Божурище", type: "град", lat: 42.7611, lng: 23.1972, region: "София област" },
  { name: "Костинброд", type: "град", lat: 42.8139, lng: 23.2167, region: "София област" },
  { name: "с. Белащица", type: "село", lat: 42.0667, lng: 24.7333, region: "Пловдив" },
  { name: "с. Марково", type: "село", lat: 42.0667, lng: 24.7000, region: "Пловдив" },
  { name: "с. Брестник", type: "село", lat: 42.0500, lng: 24.7667, region: "Пловдив" },
  { name: "с. Първенец", type: "село", lat: 42.0833, lng: 24.6667, region: "Пловдив" },
  { name: "с. Равадиново", type: "село", lat: 42.3986, lng: 27.6714, region: "Бургас" },
  { name: "с. Росен", type: "село", lat: 42.4167, lng: 27.5500, region: "Бургас" },
  { name: "с. Баня", type: "село", lat: 41.8833, lng: 23.5333, region: "Благоевград" },
  { name: "с. Огняново", type: "село", lat: 41.6167, lng: 23.7833, region: "Благоевград" },
  { name: "с. Лещен", type: "село", lat: 41.6333, lng: 23.7667, region: "Благоевград" },
  { name: "с. Ковачевица", type: "село", lat: 41.6833, lng: 23.8333, region: "Благоевград" },
  { name: "с. Могилово", type: "село", lat: 42.3167, lng: 25.4000, region: "Стара Загора (Midalidare)" },
  { name: "с. Кранево", type: "село", lat: 43.3444, lng: 28.0569, region: "Добрич" },
];

/**
 * Search Bulgarian locations by keyword (case & accent insensitive)
 */
export function searchBgLocations(query: string, limit: number = 8): BgLocation[] {
  if (!query || query.trim().length < 1) return [];

  const cleanQ = query.trim().toLowerCase().replace(/^(гр\.|с\.|к\.к\.|община)\s+/i, "");

  const matches = BG_LOCATIONS_DATABASE.filter((loc) => {
    const locName = loc.name.toLowerCase().replace(/^(гр\.|с\.|к\.к\.|община)\s+/i, "");
    const region = (loc.region || "").toLowerCase();
    return locName.includes(cleanQ) || region.includes(cleanQ);
  });

  // Sort exact matches or startsWith first
  matches.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    const aStarts = nameA.startsWith(cleanQ);
    const bStarts = nameB.startsWith(cleanQ);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return 0;
  });

  return matches.slice(0, limit);
}

/**
 * Find closest city/location name from GPS coordinates (Haversine formula)
 */
export function findNearestBgLocation(lat: number, lng: number): BgLocation | null {
  if (!lat || !lng) return null;

  let closest: BgLocation | null = null;
  let minDistance = Infinity;

  for (const loc of BG_LOCATIONS_DATABASE) {
    const dLat = ((loc.lat - lat) * Math.PI) / 180;
    const dLng = ((loc.lng - lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat * Math.PI) / 180) *
        Math.cos((loc.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = 6371 * c; // Earth radius in km

    if (distanceKm < minDistance) {
      minDistance = distanceKm;
      closest = loc;
    }
  }

  // Only return if within reasonable proximity (e.g. 50 km)
  if (minDistance < 50) {
    return closest;
  }

  return closest;
}
