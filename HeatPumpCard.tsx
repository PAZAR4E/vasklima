import { Link } from 'react-router-dom';
import { Droplets, Zap } from 'lucide-react';
import type { HeatPump } from '../types';
import { formatPrice } from '../lib/format';

export default function HeatPumpCard({ item }: { item: HeatPump }) {
  return (
    <Link
      to={`/termopompi/${item.slug}`}
      className="group relative overflow-hidden rounded-3xl border border-white/8 bg-[#0d1424] transition hover:-translate-y-1 hover:border-[#c9a24a]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
    >
      <div className="relative aspect-[4/3] bg-gradient-to-b from-[#182033] to-[#0b101c] p-5">
        <img src={item.image} alt={item.name} className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-black/45 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#e8d5a3] backdrop-blur">
            {item.brand}
          </span>
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-emerald-300 backdrop-blur">
            {item.energy_class}
          </span>
        </div>
        {item.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-[#c9a24a] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#0b1020]">
            Топ
          </span>
        )}
      </div>
      <div className="space-y-3 p-5">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">{item.series}</div>
          <h3 className="mt-1 font-display text-[22px] leading-tight text-white">{item.name}</h3>
          <p className="mt-1 text-xs text-white/45">{item.model}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
          <span className="inline-flex items-center gap-1"><Zap size={12} /> {item.power_kw} kW</span>
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span>{item.type}</span>
          {item.dhw && (
            <>
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span className="inline-flex items-center gap-1 text-sky-300"><Droplets size={12} /> БГВ</span>
            </>
          )}
        </div>
        <div className="flex items-end justify-between pt-1">
          <div className="text-xl font-medium text-[#e8d5a3]">{formatPrice(item.price)}</div>
          <span className="rounded-full border border-white/12 px-3 py-1.5 text-[11px] uppercase tracking-wider text-white/70 group-hover:border-[#c9a24a]/50 group-hover:text-[#e8d5a3]">
            Виж модел
          </span>
        </div>
      </div>
    </Link>
  );
}
