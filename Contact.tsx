import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Reveal from '../components/Reveal';
import { submitInquiry } from '../lib/inquiry';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);
  const [mailNote, setMailNote] = useState('');
  const [sending, setSending] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Моля, въведете име');
    if (phone.replace(/\D/g, '').length < 8) return setError('Моля, въведете валиден телефон');
    setSending(true);
    try {
      const result = await submitInquiry({ name, phone, email, city, message, type: 'contact' });
      setMailNote(result.emailed ? '' : (result.note || 'Запитването е записано.'));
      setOk(true);
      setName('');
      setPhone('');
      setEmail('');
      setCity('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Грешка');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <Reveal>
        <div className="pt-6">
          <div className="text-xs uppercase tracking-[0.22em] text-[#c9a24a]">Контакт</div>
          <h1 className="mt-2 font-display text-5xl text-white">Пишете ни или елате в Пловдив</h1>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal x={-20} className="space-y-4">
          <Info icon={MapPin} t="Адрес" d="Пловдив, ул. Йосиф Шнитер 10" />
          <Info icon={Phone} t="Телефон" d="0877 020 320" href="tel:0877020320" />
          <Info icon={Mail} t="Имейл" d="office@vasklima.bg" href="mailto:office@vasklima.bg" />
          <Info icon={Clock} t="Работно време" d="пн–пт 09:00–18:00 · съб 10:00–14:00" />
          <p className="rounded-3xl border border-white/8 bg-[#0d1424] p-5 text-sm text-white/55">
            Работим в цялата страна. За градове извън Пловдив насрочваме оглед и монтаж по график.
          </p>
          <div className="overflow-hidden rounded-[28px] border border-white/8">
            <iframe
              title="ВАС КЛИМА — Пловдив"
              className="h-64 w-full grayscale invert-[0.88] contrast-125"
              loading="lazy"
              src="https://maps.google.com/maps?q=Пловдив%20ул.%20Йосиф%20Шнитер%2010&t=&z=16&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </Reveal>

        <Reveal x={20} delay={0.08}>
        <form onSubmit={submit} className="rounded-[32px] border border-white/8 bg-[#0d1424] p-6 sm:p-8">
          <h2 className="font-display text-3xl text-white">Изпратете запитване</h2>
          {ok ? (
            <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-emerald-200">
              Съобщението е получено. Ще се свържем с вас скоро.
              {mailNote ? <p className="mt-2 text-amber-200 text-sm">{mailNote}</p> : null}
            </div>
          ) : (
            <div className="mt-6 grid gap-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Име *" className="field" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон *" className="field" />
              <div className="grid gap-3 sm:grid-cols-2">
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Имейл" className="field" />
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Град" className="field" />
              </div>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Какво търсите?" rows={5} className="field resize-none" />
              {error && <p className="text-sm text-rose-300">{error}</p>}
              <button disabled={sending} className="mt-2 rounded-full bg-gradient-to-r from-[#c9a24a] to-[#e8d5a3] px-5 py-3 text-sm font-medium text-[#0b1020] disabled:opacity-60">
                {sending ? 'Изпращане...' : 'Изпрати'}
              </button>
            </div>
          )}
        </form>
        </Reveal>
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

function Info({
  icon: Icon,
  t,
  d,
  href,
}: {
  icon: typeof MapPin;
  t: string;
  d: string;
  href?: string;
}) {
  const inner = (
    <div className="flex gap-3 rounded-3xl border border-white/8 bg-[#0d1424] p-5">
      <Icon className="mt-0.5 text-[#c9a24a]" size={18} />
      <div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-white/35">{t}</div>
        <div className="mt-1 text-white/80">{d}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:opacity-90">{inner}</a> : inner;
}
