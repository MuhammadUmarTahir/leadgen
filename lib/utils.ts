import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Neighborhood } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function removeDuplicates(neighborhoods: Neighborhood[]): Neighborhood[] {
  return Array.from(
    new Map(
      neighborhoods.map(n => [
        `${n.name}-${n.coordinates[0].toFixed(4)}-${n.coordinates[1].toFixed(4)}`,
        n
      ])
    ).values()
  );
}

export function formatCoordinates(lat: number, lon: number): string {
  return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
}