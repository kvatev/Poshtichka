export interface EventLocation {
  id: string;
  eventName?: string; // Optional: e.g. "ГЕРИ И КРАСИ"
  cityName: string; // e.g. "Созопол"
  venueName?: string; // e.g. "Комплекс Свети Тома"
  eventType?: string; // e.g. "сватбено тържество", "кръщение"
  latitude: number;
  longitude: number;
  coverImage?: string;
  galleryImages?: string[];
  description?: string;
  eventDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEventLocationInput {
  eventName?: string;
  cityName: string;
  venueName?: string;
  eventType?: string;
  latitude: number;
  longitude: number;
  coverImage?: string;
  galleryImages?: string[];
  description?: string;
  eventDate?: string;
}
