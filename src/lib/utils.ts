import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function getRank(xp: number): string {
  if (xp < 500) return 'Beginner';
  if (xp < 1500) return 'Smart';
  if (xp < 3500) return 'Genius';
  return 'Math King 👑';
}
