import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "~/env";
import { Payload } from "~/types/payload";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calcDateDiff(dateString: string) {
  const dateObj = new Date(dateString);
  const currentDate = new Date();

  // İki tarih arasındaki farkı al
  const differenceInMilliseconds = currentDate.getTime() - dateObj.getTime();

  // Farkı saniyeye çevir
  const secondsDifference = Math.floor(differenceInMilliseconds / 1000);

  // Saniye, dakika, saat ve gün cinsinden farkı hesapla
  const seconds = secondsDifference % 60;
  const minutes = Math.floor(secondsDifference / 60) % 60;
  const hours = Math.floor(secondsDifference / (60 * 60)) % 24;
  const days = Math.floor(secondsDifference / (60 * 60 * 24));

  if (days) return `${days} Gün`;
  if (hours) return `${hours} Saat`;
  if (minutes) return `${minutes} Dakika`;
  if (seconds) return null;
}

export async function getStrapiData<T>(endpoint: string, qs?: string) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${endpoint}?${qs}`, {
    next: { revalidate: 30 },
  });
  return (await response.json()) as Payload<T>;
}
