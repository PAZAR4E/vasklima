import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import HeatPumpCard from '../components/HeatPumpCard';
import Reveal from '../components/Reveal';
import type { HeatPump } from '../types';

const BRANDS = ['всички', 'Gree', 'Immergas'];
const SERIES = ['всички', 'Versati III', 'Versati IV', 'Versati V', 'Flyarm', 'GRS-TD', 'Magis Pro V2', 'Magis Hercules Pro Mini', 'Magis Hercules Pro', 'Trio Pack Electric', 'Magis M'];
const TYPES = ['всички', 'сплит', 'моноблок', 'пакет', 'за басейн', 'бойлер'];
const PHASES = ['всички', 'монофазна', 'трифазна'];

export default function HeatPumps() {
  const [items, setItems] = useState<HeatPump[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [brand, setBrand] = useState('всички');
  const [series, setSeries] = useState('всички');
  const [type, setType] = useState('всички');
  const [phase, setPhase] = useState('всички');
  const [q, setQ] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        if (brand !== 'всички') params.set('brand', brand);
        if (series !== 'всички') params.set('series', series);
        if (type !== 'всички') params.set('type', type);
        if (phase !== 'всички') params.set('phase', phase);
        const res = await fetch(`/api/heatpumps?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Грешка при зареждане');
        setItems(Array.isArray(data) ? data : []);
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
  }, [brand, series, type, phase]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((p) =>
      `${p.name} ${p.brand} ${p.model} ${p.series}`.toLowerCase().includes(s)
    );
  }, [items, q]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <Reveal>
        <div className="pt-6">
          <div className="text-xs uppercase tracking-[0.22em] text-[#c9a24a]">Термопомпи</div>
          <h1 className="mt-2 font-display text-5xl text-white">Термопомпи въздух-вода</h1>
          <p className="mt-3 max-w-2xl text-white/55">
            Gree Versati и Immergas Magis — сплит, моноблок, системи с бойлер и термопомпи за басейн.
            Снимки и цени от официалните каталози.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 rounded-3xl border border-white/8 bg-[#0d1424] p-4">
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Търси модел или серия..."
            className="w-full rounded-2xl border border-white/10 bg-white/4 py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-[#c9a24a]/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-wider ${
                brand === b ? 'bg-[#c9a24a] text-[#0b1020]' : 'bg-white/5 text-white/60 hover:text-white'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {SERIES.map((b) => (
            <button
              key={b}
              onClick={() => setSeries(b)}
              className={`rounded-full px-3 py-1.5 text-xs ${
                series === b ? 'border border-[#c9a24a]/60 text-[#e8d5a3]' : 'border border-white/8 text-white/50'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-full px-3 py-1.5 text-xs ${
                type === t ? 'border border-[#c9a24a]/60 text-[#e8d5a3]' : 'border border-white/8 text-white/50'
              }`}
            >
              {t}
            </button>
          ))}
          {PHASES.map((t) => (
            <button
              key={t}
              onClick={() => setPhase(t)}
              className={`rounded-full px-3 py-1.5 text-xs ${
                phase === t ? 'border border-[#c9a24a]/60 text-[#e8d5a3]' : 'border border-white/8 text-white/50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-80 animate-pulse rounded-3xl bg-white/5" />
          ))}
        </div>
      )}
      {error && <p className="mt-8 text-rose-300">{error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p className="mt-10 text-white/50">Няма модели по избраните филтри.</p>
      )}
      {!loading && !error && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06}>
              <HeatPumpCard item={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
