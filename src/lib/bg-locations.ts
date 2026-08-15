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

  // 2. Sofia Surroundings, Suburbs & Popular Event/Wedding Villages
  { name: "Равно поле", type: "село", lat: 42.6676, lng: 23.5262, region: "София област (Елин Пелин / St. Sofia Golf)" },
  { name: "Елин Пелин", type: "град", lat: 42.6694, lng: 23.6000, region: "София област" },
  { name: "Нови хан", type: "село", lat: 42.6044, lng: 23.5961, region: "София област" },
  { name: "Мусачево", type: "село", lat: 42.6781, lng: 23.5583, region: "София област" },
  { name: "Лесново", type: "село", lat: 42.6417, lng: 23.6417, region: "София област" },
  { name: "Габра", type: "село", lat: 42.5372, lng: 23.6167, region: "София област" },
  { name: "Горна Малина", type: "село", lat: 42.6861, lng: 23.7000, region: "София област" },
  { name: "Столник", type: "село", lat: 42.7167, lng: 23.6167, region: "София област" },
  { name: "Априлово", type: "село", lat: 42.6833, lng: 23.6833, region: "София област" },
  { name: "Григорево", type: "село", lat: 42.6833, lng: 23.6000, region: "София област" },
  { name: "Лозен", type: "село", lat: 42.6000, lng: 23.4833, region: "София-град" },
  { name: "Бистрица", type: "село", lat: 42.5833, lng: 23.3667, region: "София-град" },
  { name: "Панчарево", type: "село", lat: 42.5897, lng: 23.4072, region: "София-град" },
  { name: "Кокаляне", type: "село", lat: 42.5750, lng: 23.4194, region: "София-град" },
  { name: "Герман", type: "село", lat: 42.6167, lng: 23.4167, region: "София-град" },
  { name: "Пасарел", type: "село", lat: 42.5412, lng: 23.5012, region: "София област" },
  { name: "Железница", type: "село", lat: 42.5333, lng: 23.3667, region: "София-град" },
  { name: "Банкя", type: "град", lat: 42.7083, lng: 23.1417, region: "София-град" },
  { name: "Иваняне", type: "село", lat: 42.7167, lng: 23.1833, region: "София-град" },
  { name: "Божурище", type: "град", lat: 42.7611, lng: 23.1972, region: "София област" },
  { name: "Гурмазово", type: "село", lat: 42.7500, lng: 23.1667, region: "София област" },
  { name: "Пожарево", type: "село", lat: 42.7667, lng: 23.1333, region: "София област" },
  { name: "Пролеша", type: "село", lat: 42.7833, lng: 23.1833, region: "София област" },
  { name: "Хераково", type: "село", lat: 42.7833, lng: 23.1167, region: "София област" },
  { name: "Храбърско", type: "село", lat: 42.8167, lng: 23.1000, region: "София област" },
  { name: "Костинброд", type: "град", lat: 42.8139, lng: 23.2167, region: "София област" },
  { name: "Петърч", type: "село", lat: 42.8333, lng: 23.1500, region: "София област" },
  { name: "Драговищица", type: "село", lat: 42.8500, lng: 23.2333, region: "София област" },
  { name: "Голяновци", type: "село", lat: 42.8333, lng: 23.2167, region: "София област" },
  { name: "Нови Искър", type: "град", lat: 42.8056, lng: 23.3444, region: "София-град" },
  { name: "Мрамор", type: "село", lat: 42.7667, lng: 23.2667, region: "София-град" },
  { name: "Житен", type: "село", lat: 42.7833, lng: 23.2667, region: "София-град" },
  { name: "Доброславци", type: "село", lat: 42.8167, lng: 23.2833, region: "София-град" },
  { name: "Мировяне", type: "село", lat: 42.7833, lng: 23.3167, region: "София-град" },
  { name: "Требич", type: "село", lat: 42.7667, lng: 23.3167, region: "София-град" },
  { name: "Кубратово", type: "село", lat: 42.7667, lng: 23.3500, region: "София-град" },
  { name: "Световрачене", type: "село", lat: 42.7833, lng: 23.3833, region: "София-град" },
  { name: "Негован", type: "село", lat: 42.7667, lng: 23.4000, region: "София-град" },
  { name: "Чепинци", type: "село", lat: 42.7667, lng: 23.4333, region: "София-град" },
  { name: "Локорско", type: "село", lat: 42.8000, lng: 23.4500, region: "София-град" },
  { name: "Войнеговци", type: "село", lat: 42.8000, lng: 23.4167, region: "София-град" },
  { name: "Подгумер", type: "село", lat: 42.8000, lng: 23.3833, region: "София-град" },
  { name: "Кътина", type: "село", lat: 42.8333, lng: 23.3167, region: "София-град" },
  { name: "Своге", type: "град", lat: 42.9606, lng: 23.3517, region: "София област" },
  { name: "Владо Тричков", type: "село", lat: 42.8667, lng: 23.3667, region: "София област" },
  { name: "Искрец", type: "село", lat: 42.9833, lng: 23.2333, region: "София област" },
  { name: "Ботевград", type: "град", lat: 42.9056, lng: 23.7889, region: "София област" },
  { name: "Правец", type: "град", lat: 42.8944, lng: 23.9167, region: "София област" },
  { name: "Етрополе", type: "град", lat: 42.8333, lng: 23.9833, region: "София област" },
  { name: "Самоков", type: "град", lat: 42.3375, lng: 23.5614, region: "София област" },
  { name: "Боровец", type: "курорт", lat: 42.2667, lng: 23.6083, region: "София област" },
  { name: "Бели Искър", type: "село", lat: 42.2667, lng: 23.5333, region: "София област" },
  { name: "Говедарци", type: "село", lat: 42.2500, lng: 23.4667, region: "София област" },
  { name: "Мала църква", type: "село", lat: 42.2667, lng: 23.5000, region: "София област" },
  { name: "Долна баня", type: "град", lat: 42.3000, lng: 23.7667, region: "София област" },
  { name: "Костенец", type: "град", lat: 42.3083, lng: 23.8611, region: "София област" },
  { name: "Ихтиман", type: "град", lat: 42.4333, lng: 23.8167, region: "София област" },
  { name: "Сливница", type: "град", lat: 42.8500, lng: 23.0333, region: "София област" },
  { name: "Драгоман", type: "град", lat: 42.9167, lng: 22.9333, region: "София област" },
  { name: "Годеч", type: "град", lat: 43.0167, lng: 23.0500, region: "София област" },

  // 3. Plovdiv & Thrace Region Event Villages
  { name: "Белащица", type: "село", lat: 42.0667, lng: 24.7333, region: "Пловдив" },
  { name: "Марково", type: "село", lat: 42.0667, lng: 24.7000, region: "Пловдив" },
  { name: "Брестник", type: "село", lat: 42.0500, lng: 24.7667, region: "Пловдив" },
  { name: "Първенец", type: "село", lat: 42.0833, lng: 24.6667, region: "Пловдив" },
  { name: "Брестовица", type: "село", lat: 42.0833, lng: 24.6000, region: "Пловдив" },
  { name: "Храбрино", type: "село", lat: 42.0333, lng: 24.6500, region: "Пловдив" },
  { name: "Браниполе", type: "село", lat: 42.0833, lng: 24.7500, region: "Пловдив" },
  { name: "Куклен", type: "град", lat: 42.0333, lng: 24.7833, region: "Пловдив" },
  { name: "Катуница", type: "село", lat: 42.1000, lng: 24.8667, region: "Пловдив" },
  { name: "Ягодово", type: "село", lat: 42.1167, lng: 24.8500, region: "Пловдив" },
  { name: "Крумово", type: "село", lat: 42.0833, lng: 24.8167, region: "Пловдив" },
  { name: "Цалапица", type: "село", lat: 42.1833, lng: 24.5667, region: "Пловдив" },
  { name: "Старосел", type: "село", lat: 42.5000, lng: 24.5500, region: "Пловдив" },
  { name: "Хисаря", type: "град", lat: 42.5028, lng: 24.7083, region: "Пловдив" },
  { name: "Баня (Карлово)", type: "град", lat: 42.5500, lng: 24.8333, region: "Пловдив" },
  { name: "Раковски", type: "град", lat: 42.3000, lng: 24.9667, region: "Пловдив" },
  { name: "Перущица", type: "град", lat: 42.0567, lng: 24.5458, region: "Пловдив" },
  { name: "Кричим", type: "град", lat: 42.0500, lng: 24.4667, region: "Пловдив" },
  { name: "Стамболийски", type: "град", lat: 42.1333, lng: 24.5333, region: "Пловдив" },
  { name: "Карлово", type: "град", lat: 42.6417, lng: 24.8083, region: "Пловдив" },
  { name: "Сопот", type: "град", lat: 42.6500, lng: 24.7500, region: "Пловдив" },
  { name: "Калофер", type: "град", lat: 42.6125, lng: 24.9778, region: "Пловдив" },
  { name: "Копривщица", type: "град", lat: 42.6406, lng: 24.3583, region: "София област" },
  { name: "Панагюрище", type: "град", lat: 42.5056, lng: 24.1833, region: "Пазарджик" },
  { name: "Пещера", type: "град", lat: 42.0333, lng: 24.3000, region: "Пазарджик" },
  { name: "Брацигово", type: "град", lat: 42.0222, lng: 24.3722, region: "Пазарджик" },
  { name: "Велинград", type: "град", lat: 42.0278, lng: 23.9917, region: "Пазарджик" },
  { name: "Могилово", type: "село", lat: 42.3167, lng: 25.4000, region: "Стара Загора (Midalidare Estate)" },
  { name: "Павел баня", type: "град", lat: 42.5972, lng: 25.2064, region: "Стара Загора" },

  // 4. Black Sea Coast Towns & Seaside Villages
  { name: "Созопол", type: "град", lat: 42.4175, lng: 27.6958, region: "Бургас" },
  { name: "Несебър", type: "град", lat: 42.6592, lng: 27.7354, region: "Бургас" },
  { name: "Поморие", type: "град", lat: 42.5583, lng: 27.6444, region: "Бургас" },
  { name: "Слънчев бряг", type: "курорт", lat: 42.6953, lng: 27.7083, region: "Бургас" },
  { name: "Свети Влас", type: "град", lat: 42.7136, lng: 27.7597, region: "Бургас" },
  { name: "Равда", type: "село", lat: 42.6425, lng: 27.6764, region: "Бургас" },
  { name: "Ахелой", type: "град", lat: 42.6458, lng: 27.6486, region: "Бургас" },
  { name: "Черноморец", type: "град", lat: 42.4439, lng: 27.6381, region: "Бургас" },
  { name: "Равадиново", type: "село", lat: 42.3986, lng: 27.6714, region: "Бургас" },
  { name: "Росен", type: "село", lat: 42.4167, lng: 27.5500, region: "Бургас" },
  { name: "Приморско", type: "град", lat: 42.2683, lng: 27.7561, region: "Бургас" },
  { name: "Китен", type: "град", lat: 42.2344, lng: 27.7761, region: "Бургас" },
  { name: "Лозенец", type: "село", lat: 42.2114, lng: 27.8086, region: "Бургас" },
  { name: "Царево", type: "град", lat: 42.1708, lng: 27.8486, region: "Бургас" },
  { name: "Ахтопол", type: "град", lat: 42.0989, lng: 27.9408, region: "Бургас" },
  { name: "Синеморец", type: "село", lat: 42.0622, lng: 27.9786, region: "Бургас" },
  { name: "Варвара", type: "село", lat: 42.1214, lng: 27.9103, region: "Бургас" },
  { name: "Резлово", type: "село", lat: 41.9833, lng: 28.0167, region: "Бургас" },
  { name: "Балчик", type: "град", lat: 43.4114, lng: 28.1631, region: "Добрич" },
  { name: "Каварна", type: "град", lat: 43.4342, lng: 28.3392, region: "Добрич" },
  { name: "Шабла", type: "град", lat: 43.5358, lng: 28.5342, region: "Добрич" },
  { name: "Крапец", type: "село", lat: 43.6264, lng: 28.5714, region: "Добрич" },
  { name: "Тюленово", type: "село", lat: 43.4925, lng: 28.5833, region: "Добрич" },
  { name: "Дуранкулак", type: "село", lat: 43.6833, lng: 28.5333, region: "Добрич" },
  { name: "Камен бряг", type: "село", lat: 43.4500, lng: 28.5667, region: "Добрич" },
  { name: "Златни пясъци", type: "курорт", lat: 43.2875, lng: 28.0417, region: "Варна" },
  { name: "Св. Св. Константин и Елена", type: "курорт", lat: 43.2333, lng: 28.0167, region: "Варна" },
  { name: "Албена", type: "курорт", lat: 43.3667, lng: 28.0833, region: "Добрич" },
  { name: "Кранево", type: "село", lat: 43.3444, lng: 28.0569, region: "Добрич" },
  { name: "Обзор", type: "град", lat: 42.8186, lng: 27.8797, region: "Бургас" },
  { name: "Бяла", type: "град", lat: 42.8739, lng: 27.8886, region: "Варна" },
  { name: "Дюни", type: "курорт", lat: 42.3717, lng: 27.7083, region: "Бургас" },
  { name: "Приселци", type: "село", lat: 43.0833, lng: 27.8500, region: "Варна" },
  { name: "Близнаци", type: "село", lat: 43.0500, lng: 27.8667, region: "Варна" },

  // 5. Pirin, Rila & Rhodope Mountain Villages
  { name: "Банско", type: "град", lat: 41.8383, lng: 23.4883, region: "Благоевград" },
  { name: "Разлог", type: "град", lat: 41.8864, lng: 23.4686, region: "Благоевград" },
  { name: "Баня (Разлог)", type: "село", lat: 41.8833, lng: 23.5333, region: "Благоевград" },
  { name: "Добринище", type: "град", lat: 41.8175, lng: 23.5636, region: "Благоевград" },
  { name: "Огняново", type: "село", lat: 41.6167, lng: 23.7833, region: "Благоевград" },
  { name: "Гърмен", type: "село", lat: 41.6000, lng: 23.8167, region: "Благоевград" },
  { name: "Лещен", type: "село", lat: 41.6333, lng: 23.7667, region: "Благоевград" },
  { name: "Ковачевица", type: "село", lat: 41.6833, lng: 23.8333, region: "Благоевград" },
  { name: "Долен", type: "село", lat: 41.6167, lng: 23.9333, region: "Благоевград" },
  { name: "Сандански", type: "град", lat: 41.5647, lng: 23.2778, region: "Благоевград" },
  { name: "Мелник", type: "град", lat: 41.5236, lng: 23.3958, region: "Благоевград" },
  { name: "Рожен", type: "село", lat: 41.5333, lng: 23.4333, region: "Благоевград" },
  { name: "Петрич", type: "град", lat: 41.3986, lng: 23.2072, region: "Благоевград" },
  { name: "Сапарева баня", type: "град", lat: 42.2883, lng: 23.2583, region: "Кюстендил" },
  { name: "Паничище", type: "курорт", lat: 42.2667, lng: 23.2833, region: "Кюстендил" },
  { name: "Пампорово", type: "курорт", lat: 41.6583, lng: 24.6958, region: "Смолян" },
  { name: "Чепеларе", type: "град", lat: 41.7289, lng: 24.6853, region: "Смолян" },
  { name: "Девин", type: "град", lat: 41.7431, lng: 24.4008, region: "Смолян" },
  { name: "Широка лъка", type: "село", lat: 41.6833, lng: 24.5833, region: "Смолян" },
  { name: "Гела", type: "село", lat: 41.6333, lng: 24.5667, region: "Смолян" },
  { name: "Стойките", type: "село", lat: 41.6500, lng: 24.6333, region: "Смолян" },
  { name: "Момчиловци", type: "село", lat: 41.6667, lng: 24.7667, region: "Смолян" },
  { name: "Смилян", type: "село", lat: 41.5000, lng: 24.7500, region: "Смолян" },
  { name: "Триград", type: "село", lat: 41.6000, lng: 24.3833, region: "Смолян" },
  { name: "Ягодина", type: "село", lat: 41.6333, lng: 24.3500, region: "Смолян" },
  { name: "Златоград", type: "град", lat: 41.3833, lng: 25.1000, region: "Смолян" },

  // 6. Central Balkan & Historic Villages
  { name: "Арбанаси", type: "село", lat: 43.0975, lng: 25.6692, region: "Велико Търново" },
  { name: "Трявна", type: "град", lat: 42.8683, lng: 25.4958, region: "Габрово" },
  { name: "Боженци", type: "село", lat: 42.9333, lng: 25.4167, region: "Габрово" },
  { name: "Елена", type: "град", lat: 42.9306, lng: 25.8778, region: "Велико Търново" },
  { name: "Троян", type: "град", lat: 42.8944, lng: 24.7139, region: "Ловеч" },
  { name: "Априлци", type: "град", lat: 42.8417, lng: 24.9194, region: "Ловеч" },
  { name: "Тетевен", type: "град", lat: 42.9208, lng: 24.2611, region: "Ловеч" },
  { name: "Рибарица", type: "село", lat: 42.8333, lng: 24.3833, region: "Ловеч" },
  { name: "Белоградчик", type: "град", lat: 43.6264, lng: 22.6833, region: "Видин" },
  { name: "Вършец", type: "град", lat: 43.1947, lng: 23.2864, region: "Монтана" },
  { name: "Берковица", type: "град", lat: 43.2389, lng: 23.1278, region: "Монтана" },
];

/**
 * Transliteration map to allow searching in both Latin and Cyrillic
 */
function toCyrillic(str: string): string {
  const map: Record<string, string> = {
    sht: "щ", sh: "ш", ch: "ч", zh: "ж", ts: "ц", yu: "ю", ya: "я",
    a: "а", b: "б", v: "в", g: "г", d: "д", e: "е", z: "з", i: "и",
    y: "й", k: "к", l: "л", m: "м", n: "н", o: "о", p: "п", r: "р",
    s: "с", t: "т", u: "у", f: "ф", h: "х", c: "ц"
  };

  let res = str.toLowerCase();
  for (const [latin, cyr] of Object.entries(map)) {
    res = res.replaceAll(latin, cyr);
  }
  return res;
}

/**
 * Search Bulgarian locations by keyword (case & accent insensitive, supporting prefixes and transliteration)
 */
export function searchBgLocations(query: string, limit: number = 10): BgLocation[] {
  if (!query || query.trim().length < 1) return [];

  const rawClean = query.trim().toLowerCase().replace(/^(гр\.|с\.|к\.к\.|община)\s+/i, "");
  const cyrClean = toCyrillic(rawClean);

  const matches = BG_LOCATIONS_DATABASE.filter((loc) => {
    const locName = loc.name.toLowerCase().replace(/^(гр\.|с\.|к\.к\.|община)\s+/i, "");
    const region = (loc.region || "").toLowerCase();
    
    return (
      locName.includes(rawClean) ||
      region.includes(rawClean) ||
      locName.includes(cyrClean) ||
      region.includes(cyrClean)
    );
  });

  // Sort exact matches or startsWith first
  matches.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    const aStarts = nameA.startsWith(rawClean) || nameA.startsWith(cyrClean);
    const bStarts = nameB.startsWith(rawClean) || nameB.startsWith(cyrClean);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return 0;
  });

  return matches.slice(0, limit);
}

/**
 * Find closest city/village location name from GPS coordinates (Haversine formula)
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

  // Only return if within reasonable proximity (e.g. 35 km)
  if (minDistance < 35) {
    return closest;
  }

  return closest;
}
