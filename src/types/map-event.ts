export interface EventLocation {
  id: string;
  eventName?: string; // Optional: Defaults to "Пощичка в {cityName}" if left blank
  cityName: string;
  latitude: number;
  longitude: number;
  coverImage?: string; // Optional: Uses fallback brand image if left blank
  galleryImages?: string[]; // Optional: Empty array if no images
  description?: string;
  eventDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEventLocationInput {
  eventName?: string;
  cityName: string;
  latitude: number;
  longitude: number;
  coverImage?: string;
  galleryImages?: string[];
  description?: string;
  eventDate?: string;
}
