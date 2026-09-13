const BGN_PER_EUR = 1.95583;

export function toEuro(amountBgn: number) {
  return Math.round(Number(amountBgn) / BGN_PER_EUR);
}

export function formatPrice(n: number) {
  return new Intl.NumberFormat('bg-BG', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(toEuro(n));
}

export function featureList(raw: string): string[] {
  if (!raw) return [];
  return raw.split('|').map((s) => s.trim()).filter(Boolean);
}
