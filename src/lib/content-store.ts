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
  image?: string;
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
  email: "info@poshtichka.eu",
  address: "гр. Бургас, България",
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93967.58550130985!2d27.4046182!3d42.5047805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a6926514757c91%3A0x400a01269af5e70!2sBurgas!5e0!3m2!1sen!2sbg!4v1700000000000!5m2!1sen!2sbg",
  instagramUrl: "https://instagram.com/poshtichka",
  facebookUrl: "https://facebook.com/poshtichka",
  tiktokUrl: "https://tiktok.com/@poshtichka",
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
  heroTitleLine1: "ВЕНДИНГ МАШИНА ЗА СВАТБИ И СЪБИТИЯ",
  heroTitleHighlight: "",
  heroSubtitle: "Превръщаме традиционните подаръци за гости в незабравимо забавление!",
  primaryCtaText: "ЗА ПОЩИЧКА",
  secondaryCtaText: "Разгледайте галерията",
  heroImageUrl: "/media/Main Page/Main Banner.webp",
  heroVideoUrl: "",
  showVideo: false,
  howItWorksTitle: "Как функционира Пощичка?",
  servicesPreviewTitle: "Услуги & Събития",
  calculatorTitle: "Изчислете цена за Вашето събитие",
  galleryTitle: "Моменти, записани в картички",
  testimonialsTitle: "Какво споделят нашите младоженци & клиенти",
  faqTitle: "Често задавани въпроси",
  finalCtaTitle: "Готови ли сте да създадем незабравим спомен?",
  finalCtaSubtitle: "Датите за сватбения сезон се запълват бързо. Побързайте, за да запазите Пощичка за вашия повод!",
  topBarPhrases: [
    "БЕЗПЛАТЕН ТРАНСПОРТ ДО 50 КМ ОТ БУРГАС",
    "РЕЗЕРВИРАЙТЕ ВАШАТА ДАТА СЕГА",
    "ИНТЕРАКТИВНО ПРЕЖИВЯВАНЕ ЗА ВАШЕТО СЪБИТИЕ",
  ],
  topBarSpeedSeconds: 35,
};

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const defaultFaqs: FAQItem[] = [
  {
    id: "1",
    question: "Какво е включено в наема на машината?",
    answer:
      "В цената влиза изготвяне на дизайн, печат, стандартни картончета, използване на жетони, различна часова заетост на място, 2-ма служители които монтират машината и съдействат на гостите, масичка, рамка с постер, а като бонус от нас получавате и кратък клип, как е преминало изживяването на гостите с Пощичка, докато сме били на място.",
  },
  {
    id: "2",
    question: "За колко часа може да ви наемем?",
    answer:
      "Всяко събитие е различно и часовете варират спрямо това колко гости ще бъдат на даденото събитие. Примерно за 100 бр. гости 2 часа са напълно достатъчни, за да минат всички и да вземат подаръка си. Когато се свържете с нас може подробно да обсъдим за колко часа е подходящо да бъдем на вашия повод.",
  },
  {
    id: "3",
    question: "До кои локации пътувате?",
    answer:
      "Ако кола може да стигне до локацията, значи и ние може да присъстваме. Пътуваме из цяла България.",
  },
  {
    id: "4",
    question: "Включени ли са корекции при изготвянето на дизайна?",
    answer:
      "Да, преди да започнем работа обсъждаме стила, който си представяте, а след започване на работа са включени до 3 корекции на дизайн, които са напълно достатъчни, за да стигнем до финален вариант.",
  },
  {
    id: "5",
    question: "Колко по-рано трябва да се наеме Пощичка?",
    answer:
      "2-3 месеца по-рано е най-оптимално, за да имаме време да подготвим дизайна и печатните материали. Но не чакайте последния момент!",
  },
  {
    id: "6",
    question: "Ако гостите не знаят как да се справят с машината?",
    answer:
      "Ние сме там през цялото време и съдействаме на гостите, за да вземат своя подарък.",
  },
];

