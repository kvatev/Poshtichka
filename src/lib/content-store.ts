import { createClient } from "@/lib/supabase/client";

export interface GeneralSettings {
  phone: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  businessHours: string;
}

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export interface SeoSettings {
  home: PageSeoConfig;
  about: PageSeoConfig;
  services: PageSeoConfig;
  gallery: PageSeoConfig;
  faq: PageSeoConfig;
  contact: PageSeoConfig;
  calendar: PageSeoConfig;
  booking: PageSeoConfig;
}

export interface HomepageConfig {
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  heroImageUrl: string;
  heroVideoUrl: string;
  showVideo: boolean;
  howItWorksTitle: string;
  servicesPreviewTitle: string;
  calculatorTitle: string;
  galleryTitle: string;
  testimonialsTitle: string;
  faqTitle: string;
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  topBarPhrases?: string[];
  topBarSpeedSeconds?: number;
}


export interface WebsiteSectionText {
  id: string;
  page: string;
  section: string;
  title: string;
  subtitle: string;
  body: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface PromoPopup {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  buttonText: string;
  buttonLink: string;
  badgeText?: string;
  startDate?: string;
  endDate?: string;
  enabled: boolean;
  backgroundColor?: string;
}

export interface PromoBanner {
  id: string;
  type: "top" | "homepage" | "seasonal" | "announcement";
  message: string;
  buttonText?: string;
  buttonLink?: string;
  enabled: boolean;
  theme: "gold" | "dark" | "emerald" | "rose";
}

export interface MediaFileItem {
  id: string;
  url: string;
  filename: string;
  sizeBytes: number;
  createdAt: string;
  category?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  quote: string;
  role?: string;
  rating?: number;
}

export const defaultTestimonials: TestimonialItem[] = [
  {
    id: "1",
    name: "НИКОЛ и ДАНИЕЛ",
    quote: "За нас беше изключително удоволствие да бъде част от нашият ден! Благодарим от сърце!",
    role: "Сватбено тържество",
    rating: 5,
  },
  {
    id: "2",
    name: "МАЯ и НИКО",
    quote: "Още веднъж да ви благодарим за всичко и че бяхте част от нашия празник, беше прекрасно и гостите много харесаха картичките!",
    role: "Сватба в Бургас",
    rating: 5,
  },
  {
    id: "3",
    name: "РАЛИЦА и ЖЕЛЬО",
    quote: "Всички бяха много изненадани и много са се забавлявали с вендинг машината, татуировките определено са били хит. Много благодаря!",
    role: "Сватбено празненство",
    rating: 5,
  },
  {
    id: "4",
    name: "КРИСИ и ВИКТОР",
    quote: "Гери, много ти благодаря отново! Всичко беше прекрасно! Гостите толкова се зарадваха, не можем да си представим! Наистина много се радвам! Просто уникален подарък остана за гостите толкова съм впечатлена.",
    role: "Сватбен ден",
    rating: 5,
  },
  {
    id: "5",
    name: "МАРИНА и ИВАН",
    quote: "Искам пак да ви благодаря, бяхте прекрасни и хората се изкефиха супер много! И без това съм емоционален тези дни, от постовете ви пак се разплаках. Много се радваме, че ви намерихме. С удоволствие ви препоръчвам на всички!",
    role: "Сватбено събитие",
    rating: 5,
  },
];


export const defaultGeneralSettings: GeneralSettings = {
  phone: "+359 888 000 000",
  email: "hello@poshtichka.bg",
  address: "гр. Бургас, България",
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93967.58550130985!2d27.4046182!3d42.5047805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a6926514757c91%3A0x400a01269af5e70!2sBurgas!5e0!3m2!1sen!2sbg!4v1700000000000!5m2!1sen!2sbg",
  instagramUrl: "https://instagram.com/poshtichka.bg",
  facebookUrl: "https://facebook.com/poshtichka.bg",
  tiktokUrl: "https://tiktok.com/@poshtichka.bg",
  businessHours: "Пон - Нед: 09:00 - 20:00 ч.",
};

export const defaultSeoSettings: SeoSettings = {
  home: {
    title: "Пощичка | Интерактивно преживяване за събития в България",
    description: "Персонализирани картички и подаръци, създадени на живо по време на Вашето събитие чрез бутикова машина.",
    keywords: "пощичка, картички за събития, сватбен подарък за гости, бутикова машина, сватебно изживяване, бургас",
    ogImage: "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
  },
  about: {
    title: "За нас & Философия | Пощичка",
    description: "Научете историята и философията на Пощичка — бутикова машина от Бургас, създаваща емоции и спомени за събития.",
    keywords: "за пощичка, сватбени традиции, преживяване за гости, авторски картички",
    ogImage: "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
  },
  services: {
    title: "Услуги & Видове Събития | Пощичка",
    description: "Сватбено изживяване, корпоративно брандиране, рождени дни и маркетингови активации с Пощичка.",
    keywords: "сватбена машина, корпоративно събитие подарък, рожден ден картички, брандиране",
    ogImage: "/media/gallery/Tezza_2025_07_13_155324686.webp",
  },
  gallery: {
    title: "Галерия със спомени | Пощичка",
    description: "Разгледайте автентични снимки на брандирани картички, жетони и щастливи гости от нашите събития.",
    keywords: "галерия сватби, акварелни картички, маркови пликове, монети жетони",
    ogImage: "/media/gallery/Tezza_2025_07_13_155326413.webp",
  },
  faq: {
    title: "Често Задавани Въпроси | Пощичка",
    description: "Отговори на всички въпроси относно цени, транспорт, изработка на дизайн и организация за Пощичка.",
    keywords: "често задавани въпроси, цена наем машина, транспорт бургас",
    ogImage: "/media/gallery/Tezza_2025_07_07_152559638_1.webp",
  },
  contact: {
    title: "Контакти & Резервации | Пощичка",
    description: "Свържете се с екипа на Пощичка за проверка на свободна дата и изготвяне на персонална оферта.",
    keywords: "контакти пощичка, резервация сватба, запитване за дата",
    ogImage: "/media/gallery/Tezza_2025_07_13_155333570.webp",
  },
  calendar: {
    title: "Публичен Календар Заетост | Пощичка",
    description: "Проверете наличността и свободните дати за наемане на Пощичка за Вашето събитие.",
    keywords: "свободни дати сватба, календар заетост, наличност събитие",
    ogImage: "/media/gallery/Tezza_2025_07_13_155331795.webp",
  },
  booking: {
    title: "Запазете Дата за Събитие | Пощичка",
    description: "Попълнете формата за резервация и получете индивидуална оферта за Вашето незабравимо събитие.",
    keywords: "резервирай машина, форма за резервация, сватбена оферта",
    ogImage: "/media/gallery/Tezza_2025_07_13_155324686.webp",
  },
};

export const defaultHomepageConfig: HomepageConfig = {
  heroTitleLine1: "Всеки гост си тръгва",
  heroTitleHighlight: "със спомен",
  heroSubtitle: "Персонализирани подаръци, създадени на живо по време на Вашето събитие чрез специально проектирана бутикова машина.",
  primaryCtaText: "Запазете дата за събитие",
  secondaryCtaText: "Разгледайте галерията",
  heroImageUrl: "/media/gallery/Tezza_2025_07_07_170901960_1.webp",
  heroVideoUrl: "",
  showVideo: false,
  howItWorksTitle: "Как функционира Пощичка?",
  servicesPreviewTitle: "Услуги & Събития",
  calculatorTitle: "Изчислете цена за Вашето събитие",
  galleryTitle: "Моменти, записани в картички",
  testimonialsTitle: "Какво споделят нашите младоженци & клиенти",
  faqTitle: "Често задавани въпроси",
  finalCtaTitle: "Готови ли сте да създадем незабравим спомен?",
  finalCtaSubtitle: "Датите за сватбения сезон се запълват бързо. Свържете се с нас, за да проверим наличността за Вашето събитие.",
  topBarPhrases: [
    "✦ БЕЗПЛАТЕН ТРАНСПОРТ ДО 50 КМ ОТ БУРГАС",
    "РЕЗЕРВИРАЙТЕ ВАШАТА ДАТА СЕГА",
    "ИНТЕРАКТИВНО ПРЕЖИВЯВАНЕ ЗА ВАШЕТО СЪБИТИЕ ✦",
  ],
  topBarSpeedSeconds: 15,
};


export const defaultPopups: PromoPopup[] = [
  {
    id: "pop-01",
    title: "Ранни Резервации 2026",
    subtitle: "Запазете Пощичка за сватбения сезон с 10% отстъпка и безплатен индивидуален дизайн!",
    buttonText: "Проверете Вашата дата",
    buttonLink: "/calendar",
    badgeText: "Специална оферта",
    enabled: true,
    backgroundColor: "#1c1917",
  },
];

export const defaultBanners: PromoBanner[] = [
  {
    id: "ban-01",
    type: "top",
    message: "✨ Приемат се резервации за сезон 2026/2027! Първите 50 км транспорт от Бургас са безплатни.",
    buttonText: "Провери заетост",
    buttonLink: "/calendar",
    enabled: true,
    theme: "gold",
  },
];
