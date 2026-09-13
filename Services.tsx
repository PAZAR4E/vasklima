import { useEffect, useState } from 'react';
import { Wrench, Shield, Sparkles, ThermometerSun, Settings, Headset } from 'lucide-react';
import type { ServiceItem } from '../types';
import { formatPrice } from '../lib/format';
import QuoteModal from '../components/QuoteModal';
import Reveal from '../components/Reveal';

const ICONS: Record<string, typeof Wrench> = {
  wrench: Wrench,
  shield: Shield,
  sparkles: Sparkles,
  thermo: ThermometerSun,
  settings: Settings,
  headset: Headset,
};

export default function Services() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/services');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Грешка');
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Грешка');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <Reveal>
        <div className="pt-6">
          <div className="text-xs uppercase tracking-[0.22em] text-[#c9a24a]">Услуги</div>
          <h1 className="mt-2 font-display text-5xl text-white">Монтаж, сервиз и профилактика</h1>
          <p className="mt-3 max-w-2xl text-white/55">
            Работим в Пловдив и цялата страна. Всеки монтаж включва вакуумиране, проверка за течове и пусков протокол.
          </p>
        </div>
      </Reveal>

      {loading && (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => <div key={i} className="h-56 animate-pulse rounded-3xl bg-white/5" />)}
        </div>
      )}
      {error && <p className="mt-8 text-rose-300">{error}</p>}

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((s) => {
          const Icon = ICONS[s.icon] || Wrench;
          return (
            <Reveal key={s.id} delay={(s.id % 3) * 0.07}>
              <article className="rounded-3xl border border-white/8 bg-[#0d1424] p-6">
                <Icon className="text-[#c9a24a]" size={24} />
                <h2 className="mt-4 font-display text-3xl text-white">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{s.description}</p>
                <p className="mt-4 text-sm text-white/70">{s.details}</p>
                <div className="mt-5 text-[#e8d5a3]">от {formatPrice(s.price_from)}</div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-12 overflow-hidden rounded-[32px] border border-white/8">
        <img src="/images/about/service-ac.jpg" alt="Сервиз на климатична система" className="h-72 w-full object-cover" />
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-gradient-to-r from-[#c9a24a] to-[#e8d5a3] px-6 py-3 text-sm font-medium text-[#0b1020]"
        >
          Заяви оглед
        </button>
      </div>
      <QuoteModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
