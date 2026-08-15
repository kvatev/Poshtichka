export type LeadStatus =
  | "new" // 🟡 Ново запитване
  | "contacted" // 🔵 Свързахме се
  | "proposal_sent" // 🟣 Изпратена оферта
  | "deposit_pending" // 🟠 Очаква капаро
  | "confirmed" // 🟢 Потвърдена резервация
  | "completed" // ⚫ Приключено
  | "cancelled"; // 🔴 Отказано

export type PaymentStatus = "unpaid" | "deposit_paid" | "fully_paid" | "refunded";

export interface InternalNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface AttachedFile {
  id: string;
  name: string;
  url: string;
  size: string;
  type: "contract" | "invoice" | "design" | "moodboard" | "pdf" | "image";
  uploadedAt: string;
}

export interface CommunicationLog {
  id: string;
  type: "call" | "email" | "viber" | "instagram" | "note";
  summary: string;
  timestamp: string;
  author: string;
}

export interface PricingBreakdown {
  rentalPrice: number;
  designPrice: number;
  distanceKm: number;
  transportPrice: number;
  manualTransportOverride?: boolean;
  additionalServicesPrice: number;
  discountAmount: number;
  depositPaid: number;
  paymentStatus: PaymentStatus;
}

export interface CrmLead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  city: string;
  venueLocation: string;
  guestCount: number;
  requestedProducts: string[];
  message?: string;
  createdAt: string;
  status: LeadStatus;
  pricing: PricingBreakdown;
  internalNotes: InternalNote[];
  attachedFiles: AttachedFile[];
  communicationHistory: CommunicationLog[];
}

export interface CrmNotification {
  id: string;
  title: string;
  message: string;
  type: "lead" | "payment" | "cancellation" | "file";
  timestamp: string;
  read: boolean;
  leadId?: string;
}

// 7 Status Meta Configurations
export const leadStatusConfigs: Record<
  LeadStatus,
  { label: string; badgeClass: string; columnColor: string; icon: string }
> = {
  new: {
    label: "Ново запитване",
    badgeClass: "bg-amber-100 text-amber-900 border-amber-300",
    columnColor: "border-t-4 border-t-amber-400 bg-amber-50/20",
    icon: "🟡",
  },
  contacted: {
    label: "Свързахме се",
    badgeClass: "bg-blue-100 text-blue-900 border-blue-300",
    columnColor: "border-t-4 border-t-blue-400 bg-blue-50/20",
    icon: "🔵",
  },
  proposal_sent: {
    label: "Изпратена оферта",
    badgeClass: "bg-purple-100 text-purple-900 border-purple-300",
    columnColor: "border-t-4 border-t-purple-400 bg-purple-50/20",
    icon: "🟣",
  },
  deposit_pending: {
    label: "Очаква капаро",
    badgeClass: "bg-orange-100 text-orange-900 border-orange-300",
    columnColor: "border-t-4 border-t-orange-400 bg-orange-50/20",
    icon: "🟠",
  },
  confirmed: {
    label: "Потвърдена резервация",
    badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-300",
    columnColor: "border-t-4 border-t-emerald-500 bg-emerald-50/20",
    icon: "🟢",
  },
  completed: {
    label: "Приключено",
    badgeClass: "bg-gray-200 text-gray-900 border-gray-400",
    columnColor: "border-t-4 border-t-gray-500 bg-gray-50/20",
    icon: "⚫",
  },
  cancelled: {
    label: "Отказано",
    badgeClass: "bg-red-100 text-red-900 border-red-300",
    columnColor: "border-t-4 border-t-red-400 bg-red-50/20",
    icon: "🔴",
  },
};

// Transport Cost Calculator (Burgas origin, first 50km free, €0.23/km additional)
export function calculateTransportCost(distanceKm: number): number {
  if (distanceKm <= 50) return 0;
  const extraKm = distanceKm - 50;
  return Math.round(extraKm * 0.23 * 100) / 100;
}

// Calculate Total Price
export function calculateTotalPrice(p: PricingBreakdown): number {
  const base = p.rentalPrice + p.designPrice + p.transportPrice + p.additionalServicesPrice;
  const finalTotal = Math.max(0, base - p.discountAmount);
  return Math.round(finalTotal * 100) / 100;
}

// Calculate Remaining Balance
export function calculateRemainingBalance(p: PricingBreakdown): number {
  const total = calculateTotalPrice(p);
  const remaining = Math.max(0, total - p.depositPaid);
  return Math.round(remaining * 100) / 100;
}

export const defaultMockLeads: CrmLead[] = [
  {
    id: "BK-2027-06-17",
    fullName: "Резервация 17.06.2027",
    phone: "+359 888 000 000",
    email: "info@poshtichka.bg",
    eventType: "Сватбено тържество",
    eventDate: "2027-06-17",
    startTime: "16:00",
    endTime: "23:00",
    city: "София",
    venueLocation: "Локация на събитието",
    guestCount: 100,
    requestedProducts: ["Персонализирани картички"],
    message: "Потвърдена дата за 17 юни 2027 г.",
    createdAt: "2026-08-15 12:00",
    status: "confirmed",
    pricing: {
      rentalPrice: 500,
      designPrice: 0,
      distanceKm: 0,
      transportPrice: 0,
      additionalServicesPrice: 0,
      discountAmount: 0,
      depositPaid: 150,
      paymentStatus: "deposit_paid",
    },
    internalNotes: [
      {
        id: "n-1",
        author: "Админ",
        text: "Потвърдена резервация за 17.06.2027 с капаро 150€.",
        createdAt: "2026-08-15 12:05",
      },
    ],
    attachedFiles: [],
    communicationHistory: [],
  },
  {
    id: "BK-2027-06-26",
    fullName: "Резервация 26.06.2027",
    phone: "+359 888 000 000",
    email: "info@poshtichka.bg",
    eventType: "Сватбено тържество",
    eventDate: "2027-06-26",
    startTime: "16:00",
    endTime: "23:00",
    city: "Варна",
    venueLocation: "Локация на събитието",
    guestCount: 100,
    requestedProducts: ["Персонализирани картички"],
    message: "Потвърдена дата за 26 юни 2027 г.",
    createdAt: "2026-08-15 12:10",
    status: "confirmed",
    pricing: {
      rentalPrice: 500,
      designPrice: 0,
      distanceKm: 0,
      transportPrice: 0,
      additionalServicesPrice: 0,
      discountAmount: 0,
      depositPaid: 150,
      paymentStatus: "deposit_paid",
    },
    internalNotes: [
      {
        id: "n-2",
        author: "Админ",
        text: "Потвърдена резервация за 26.06.2027 с капаро 150€.",
        createdAt: "2026-08-15 12:15",
      },
    ],
    attachedFiles: [],
    communicationHistory: [],
  },
];

export const defaultNotifications: CrmNotification[] = [
  {
    id: "notif-1",
    title: "Ново запитване",
    message: "Светлана Василева изпрати запитване за сватба в Созопол на 14.08.2026.",
    type: "lead",
    timestamp: "Преди 10 минути",
    read: false,
    leadId: "BK-1001",
  },
  {
    id: "notif-2",
    title: "Потвърдено капаро",
    message: "Запитване BK-1001 премина в статус Потвърдена Резервация.",
    type: "payment",
    timestamp: "Преди 1 час",
    read: false,
    leadId: "BK-1001",
  },
];
