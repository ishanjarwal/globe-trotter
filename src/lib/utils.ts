import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGooglePlacePhotoUrl(photoReference: string, maxWidth = 800) {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
}

export function getGoogleMapsLink(lat: string, lng: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    lat
  )},${encodeURIComponent(lng)}`;
}
