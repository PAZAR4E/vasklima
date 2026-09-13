import { useEffect, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Droplets, Zap } from 'lucide-react';
import type { HeatPump } from '../types';
import { featureList, formatPrice } from '../lib/format';
import QuoteModal from '../components/QuoteModal';
import HeatPumpCard from '../components/HeatPumpCard';
import Reveal from '../components/Reveal';

export default function HeatPumpPage() {
  const { slug } = useParams();
  const [item, setItem] = useState<HeatPump | null>(null);
  const [related, setRelated] = useState<HeatPump[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      setItem(null);
      try {
        const res = await fetch(`/api/heatpumps?slug=${encodeURIComponent(slug || '')}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Моделът не е намерен');
        setItem(data);
        const rel = await fetch(`/api/heatpumps?series=${encodeURIComponent(data.series)}`);
        const relData = await rel.json();
        if (Array.isArray(relData)) {
          setRelated(relData.filter((p: HeatPump) => p.slug !== data.slug).slice(0, 3));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Грешка');
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="h-[420px] animate-pulse rounded-[32px] bg-white/5" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-rose-300">{error || 'Моделът не е намерен'}</p>
        <Link to="/termopompi" className="mt-6 inline-block text-[#e8d5a3]">Назад към термопомпи</Link>
      </div>
    );
  }

  const features = featureList(item.features);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <Link to="/termopompi" className="inline-flex items-center gap-2 pt-4 text-sm text-white/50 hover:text-white">
        <ArrowLeft size={16} /> Термопомпи
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal x={-20}>
          <div className="overflow-hidden rounded-[32px] border border-white/8 bg-gradient-to-b from-[#182033] to-[#0b101c] p-8">
            <img src={item.image} alt={item.name} className="mx-auto max-h-[420px] w-full object-contain" />
          </div>
        </Reveal>
        <Reveal x={20} delay={0.06}>
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#c9a24a]">{item.brand} · {item.series}</div>
            <h1 className="mt-2 font-display text-5xl leading-tight text-white">{item.name}</h1>
            <p className="mt-2 text-white/45">{item.model}</p>
            <p className="mt-5 leading-relaxed text-white/65">{item.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Spec label="Мощност" value={`${item.power_kw} kW`} icon={<Zap size={14} />} />
              <Spec label="Клас" value={item.energy_class} />
              <Spec label="COP" value={String(item.cop)} />
              <Spec label="Захранване" value={item.phase} />
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/55">
              <span className="rounded-full border border-white/10 px-3 py-1">{item.type}</span>
              {item.dhw && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/20 px-3 py-1 text-sky-300">
                  <Droplets size={14} /> Битова гореща вода
                </span>
              )}
              <span className={`rounded-full px-3 py-1 ${
                item.in_stock ? 'border border-emerald-400/20 text-emerald-300' : 'border border-white/10'
              }`}>
                {item.in_stock ? 'Наличен' : 'По поръчка'}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="font-display text-5xl text-[#e8d5a3]">{formatPrice(item.price)}</div>
                <div className="mt-1 text-xs text-white/35">Цена по каталог, без монтаж</div>
              </div>
              <button
                onClick={() => setOpen(true)}
                className="rounded-full bg-gradient-to-r from-[#c9a24a] to-[#e8d5a3] px-6 py-3 text-sm font-medium text-[#0b1020]"
              >
                Заяви оферта
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {features.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-3xl text-white">Характеристики</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f} className="rounded-2xl border border-white/8 bg-[#0d1424] px-4 py-3 text-sm text-white/70">
                {f}
              </div>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-3xl text-white">Още от {item.series}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.07}>
                <HeatPumpCard item={p} />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <QuoteModal
        open={open}
        onClose={() => setOpen(false)}
        product={{
          id: item.id,
          slug: item.slug,
          name: item.name,
          brand: item.brand,
          model: item.model,
          series: item.series,
          btu: 0,
          energy_class: item.energy_class,
          cooling_kw: 0,
          heating_kw: item.power_kw,
          noise_db: 0,
          wifi: false,
          type: item.type,
          price: item.price,
          old_price: null,
          image: item.image,
          description: item.description,
          features: item.features,
          in_stock: item.in_stock,
          featured: item.featured,
        }}
      />
    </div>
  );
}

function Spec({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0d1424] px-3 py-3">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-white/35">
        {icon} {label}
      </div>
      <div className="mt-1 text-sm text-white">{value}</div>
    </div>
  );
}
