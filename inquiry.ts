export const INQUIRY_EMAIL = 'chafi_89@abv.bg';
export const INQUIRY_SUBJECT = 'запитване';

export type InquiryPayload = {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  message?: string;
  product_id?: number | null;
  product_name?: string;
  type: 'quote' | 'contact';
};

export type InquiryResult = {
  saved: boolean;
  emailed: boolean;
  note?: string;
};

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResult> {
  const res = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Грешка при изпращане');

  if (data.email_sent) {
    return { saved: true, emailed: true };
  }

  return {
    saved: true,
    emailed: false,
    note: data.warning || 'Запитването е записано, но имейлът не можа да се изпрати.',
  };
}
