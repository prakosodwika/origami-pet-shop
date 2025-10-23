// lib/format.ts

/**
 * Format angka ke format lokal dengan dua desimal.
 * @param value Angka yang ingin diformat.
 * @param locale Locale bawaan default: 'id-ID' (bisa diganti).
 * @returns String hasil format angka.
 */
export function formatNumber(
  value: number,
  locale: string = "en-US",
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

/**
 * Format harga dengan simbol mata uang.
 * @param value Nominal harga.
 * @param currency Mata uang, default 'IDR'.
 * @param locale Locale default 'id-ID'.
 */
export function formatCurrency(
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

export function formatDate(
  date: string
): string {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}