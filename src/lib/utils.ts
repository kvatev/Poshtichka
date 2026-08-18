import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates transportation cost based on distance from Burgas.
 * - First 50km are free.
 * - Additional distance is charged at 0.23€ / km.
 */
export function calculateTransportationCost(distanceKm: number): number {
  if (distanceKm <= 50) return 0;
  const extraKm = distanceKm - 50;
  return Number((extraKm * 0.23).toFixed(2));
}

/**
 * Estimates total event package cost.
 * Base rental: 350€ - 500€ depending on guest count and products.
 * Custom artwork design: 25€ - 50€ (3 revisions included).
 */
export function calculateEventEstimate(options: {
  guestCount: number;
  distanceKm: number;
  includeCustomDesign?: boolean;
  productTypes?: string[];
}): {
  baseRental: number;
  designFee: number;
  transportFee: number;
  totalEstimateMin: number;
  totalEstimateMax: number;
} {
  const { guestCount, distanceKm, includeCustomDesign = true } = options;

  let baseRental = 350;
  if (guestCount > 100 && guestCount <= 200) {
    baseRental = 420;
  } else if (guestCount > 200) {
    baseRental = 500;
  }

  const designFee = includeCustomDesign ? 35 : 0; // Average typical design fee 35€ (range 25-50€)
  const transportFee = calculateTransportationCost(distanceKm);

  return {
    baseRental,
    designFee,
    transportFee,
    totalEstimateMin: baseRental + (includeCustomDesign ? 25 : 0) + transportFee,
    totalEstimateMax: baseRental + (includeCustomDesign ? 50 : 0) + transportFee,
  };
}

/**
 * Strips leading and trailing quotes (standard, Bulgarian „ “, or typographic quotes « » " ')
 * so that quotes are cleanly stored as plain text without baked-in quotation symbols.
 */
export function sanitizeTestimonialQuote(text: string): string {
  if (!text) return "";
  return text.trim().replace(/^["'„«“]+|["'»”]+$/g, "").trim();
}

/**
 * Automatically cleans and formats testimonial quote text with standard Bulgarian quotation marks „...“.
 * Strips existing quotes first to avoid duplicate wrapping.
 */
export function formatTestimonialQuote(text: string): string {
  if (!text) return "";
  const cleanText = sanitizeTestimonialQuote(text);
  if (!cleanText) return "";
  return `„${cleanText}“`;
}
