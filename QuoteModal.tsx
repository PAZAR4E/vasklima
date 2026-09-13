import { useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import type { Product } from '../types';
import { submitInquiry } from '../lib/inquiry';

type Props = {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
};

export default function QuoteModal({ open, onClose, product }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);
  const [mailNote, setMailNote] = useState('');
  const [sending, setSending] = useState(false);

  if (!open) return null;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Моля, въведете име');
    if (phone.replace(/\D/g, '').length < 8) return setError('Моля, въведете валиден телефон');
    setSending(true);
    try {
      const result = await submitInquiry({
        name,
        phone,
        email,
        city,
        message,
        product_id: product?.id ?? null,
        product_name: product ? `${product.brand} ${product.model}` : '',
        type: 'quote',
      });
      setMailNote(result.note || '');
      setOk(true);
      setName('');
      setPhone('');
      setEmail('');
      setCity('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Грешка при изпращане');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0d1424] p-6 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-white/50 hover:text-white" aria-label="Затвори">
          <X size={18} />
        </button>
        <div className="text-xs uppercase tracking-[0.22em] text-[#c9a24a]">Заявка за оферта</div>
        <h3 className="mt-2 font-display text-3xl text-white">
          {product ? product.name : 'Поискайте консултация'}
        </h3>
        {product && <p className="mt-1 text-sm text-white/45">{product.brand} · {product.model}</p>}

        {ok ? (
          <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-emerald-200">
            Благодарим! Ще се свържем с вас на указания телефон.
            {mailNote ? <p className="mt-2 text-amber-200 text-sm">{mailNote}</p> : null}
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 grid gap-3">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Име *" className="field" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон *" className="field" />
            <div className="grid gap-3 sm:grid-cols-2">
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Имейл" className="field" />
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Град" className="field" />
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Съобщение / квадратура на помещението"
              rows={3}
              className="field resize-none"
            />
            {error && <p className="text-sm text-rose-300">{error}</p>}
            <button
              disabled={sending}
              className="mt-1 rounded-full bg-gradient-to-r from-[#c9a24a] to-[#e8d5a3] px-5 py-3 text-sm font-medium text-[#0b1020] disabled:opacity-60"
            >
              {sending ? 'Изпращане...' : 'Изпрати заявка'}
            </button>
          </form>
        )}
      </div>
      <style>{`
        .field {
          width: 100%;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          padding: 12px 14px;
          color: white;
          outline: none;
        }
        .field:focus { border-color: rgba(201,162,74,0.55); }
      `}</style>
    </div>
  );
}
