export interface EventLocation {
  id: string;
  eventName: string;
  cityName: string;
  latitude: number;
  longitude: number;
  coverImage: string;
  galleryImages: string[];
  description?: string;
  eventDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEventLocationInput {
  eventName: string;
  cityName: string;
  latitude: number;
  longitude: number;
  coverImage: string;
  galleryImages: string[];
  description?: string;
  eventDate?: string;
}
