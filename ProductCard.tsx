import { Link } from 'react-router-dom';
import { Wifi, Volume2 } from 'lucide-react';
import type { Product } from '../types';
import { formatPrice } from '../lib/format';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/klimatici/${product.slug}`}
      className="group relative overflow-hidden rounded-3xl border border-white/8 bg-[#0d1424] transition hover:-translate-y-1 hover:border-[#c9a24a]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
    >
      <div className="relative aspect-[4/3] bg-gradient-to-b from-[#182033] to-[#0b101c] p-5">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-black/45 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#e8d5a3] backdrop-blur">
            {product.brand}
          </span>
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-emerald-300 backdrop-blur">
            {product.energy_class}
          </span>
        </div>
        {product.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-[#c9a24a] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#0b1020]">
            Топ
          </span>
        )}
      </div>
      <div className="space-y-3 p-5">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">{product.series}</div>
          <h3 className="mt-1 font-display text-[22px] leading-tight text-white">{product.name}</h3>
          <p className="mt-1 text-xs text-white/45">{product.model}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-white/50">
          <span>{product.btu.toLocaleString('bg-BG')} BTU</span>
          <span className="h-1 w-1 rounded-full bg-white/25" />
          <span className="inline-flex items-center gap-1"><Volume2 size={12} /> {product.noise_db} dB</span>
          {product.wifi && (
            <>
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span className="inline-flex items-center gap-1 text-sky-300"><Wifi size={12} /> Wi-Fi</span>
            </>
          )}
        </div>
        <div className="flex items-end justify-between pt-1">
          <div>
            {product.old_price ? (
              <div className="text-xs text-white/35 line-through">{formatPrice(product.old_price)}</div>
            ) : null}
            <div className="text-xl font-medium text-[#e8d5a3]">{formatPrice(product.price)}</div>
          </div>
          <span className="rounded-full border border-white/12 px-3 py-1.5 text-[11px] uppercase tracking-wider text-white/70 group-hover:border-[#c9a24a]/50 group-hover:text-[#e8d5a3]">
            Виж модел
          </span>
        </div>
      </div>
    </Link>
  );
}
