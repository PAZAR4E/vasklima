import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Wrench, Truck, Snowflake, MapPin, Phone } from 'lucide-react';
import AirConditioner from '../components/AirConditioner';
import ProductCard from '../components/ProductCard';
import QuoteModal from '../components/QuoteModal';
import Reveal from '../components/Reveal';
import HeatPumpCard from '../components/HeatPumpCard';
import type { Product, HeatPump, Testimonial } from '../types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pumps, setPumps] = useState<HeatPump[]>([]);
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, tRes, hRes] = await Promise.all([
          fetch('/api/products?featured=1'),
          fetch('/api/testimonials'),
          fetch('/api/heatpumps?featured=1'),
        ]);
        if (!pRes.ok) throw new Error('Неуспешно зареждане на климатиците');
        const pData = await pRes.json();
        const tData = tRes.ok ? await tRes.json() : [];
        const hData = hRes.ok ? await hRes.json() : [];
        setProducts(Array.isArray(pData) ? pData : []);
        setReviews(Array.isArray(tData) ? tData : []);
        setPumps(Array.isArray(hData) ? hData : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Грешка');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden grain">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[90px]" />
          <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-[110px]" />
          <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] bg-[size:28px_28px]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pb-16 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#e8d5a3]"
            >
              <Snowflake size={13} /> Пловдив · цялата страна
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-5 font-display text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl"
            >
              Климатичен комфорт
              <span className="block gold-text">с премиум характер</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
            >
              ВАС КЛИМА подбира, доставя и монтира инверторни климатици от водещи марки.
              Консултация, оглед и сервиз — от Пловдив до всеки град в България.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                onClick={() => setQuoteOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c9a24a] to-[#e8d5a3] px-6 py-3 text-sm font-medium text-[#0b1020]"
              >
                Заяви оферта
              </button>
            </motion.div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
              {[
                ['12+', 'марки'],
                ['24/7', 'консултация'],
                ['5 г.', 'гаранция'],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl text-white">{n}</div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="relative flex flex-col items-center justify-center"
          >
            <div className="absolute h-56 w-56 rounded-full bg-sky-400/15 blur-3xl" />
            <AirConditioner />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: ShieldCheck, t: 'Оригинални марки', d: 'Daikin, Mitsubishi, Gree, Midea, Toshiba, Fujitsu и други.' },
            { icon: Wrench, t: 'Сертифициран монтаж', d: 'Екип с опит, вакуумиране, дренаж и пусков протокол.' },
            { icon: Truck, t: 'Доставка в цялата страна', d: 'Оглед, транспорт и монтаж извън Пловдив по график.' },
          ].map((item, i) => (
            <Reveal key={item.t} delay={i * 0.1}>
              <div className="rounded-3xl border border-white/8 bg-[#0d1424] p-6">
                <item.icon className="text-[#c9a24a]" size={22} />
                <h3 className="mt-4 font-display text-2xl text-white">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{item.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-[#c9a24a]">Избрани модели</div>
              <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">Избрани климатични системи</h2>
            </div>
            <Link to="/klimatici" className="inline-flex items-center gap-2 text-sm text-[#e8d5a3]">
              Всички климатици <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        {loading && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl bg-white/5" />
            ))}
          </div>
        )}
        {error && <p className="mt-8 text-rose-300">{error}</p>}
        {!loading && !error && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {pumps.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-4">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-[#c9a24a]">Термопомпи</div>
                <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">Термопомпи въздух-вода</h2>
              </div>
              <Link to="/termopompi" className="inline-flex items-center gap-2 text-sm text-[#e8d5a3]">
                Всички термопомпи <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pumps.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                <HeatPumpCard item={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto mt-20 grid max-w-7xl items-center gap-8 px-4 lg:grid-cols-2">
        <Reveal x={-24}>
          <div className="overflow-hidden rounded-[28px] border border-white/8">
            <img src="/images/hero/ac-wall-white.jpg" alt="Стенен климатик в интериор" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <Reveal x={24} delay={0.08}>
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#c9a24a]">Правилният избор</div>
            <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">Подбираме мощност според помещението</h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              9 000 BTU за спалня, 12 000 за хол, 18 000 и 24 000 за по-големи пространства.
              Ще ви посъветваме за енергиен клас, Wi-Fi, филтри и тих нощен режим.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {['Безплатна консултация', 'Оглед преди монтаж', 'Гаранционно обслужване', 'Профилактика'].map((x) => (
                <div key={x} className="rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-white/75">{x}</div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {reviews.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-4">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.22em] text-[#c9a24a]">Отзиви</div>
            <h2 className="mt-2 font-display text-4xl text-white">Клиенти от цялата страна</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {reviews.slice(0, 3).map((r, i) => (
              <Reveal key={r.id} delay={i * 0.1}>
                <article className="rounded-3xl border border-white/8 bg-[#0d1424] p-6">
                  <div className="text-[#c9a24a]">{'★'.repeat(r.rating)}</div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">„{r.text}“</p>
                  <div className="mt-5 text-sm text-white">{r.name}</div>
                  <div className="text-xs text-white/40">{r.city}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto mt-20 max-w-7xl px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-[#c9a24a]/20 bg-gradient-to-br from-[#16120a] to-[#0b1220] p-8 sm:p-12">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-4xl text-white sm:text-5xl">Готови за оглед в Пловдив или цялата страна?</h2>
              <p className="mt-4 max-w-xl text-white/60">Обадете се или оставете заявка — връщаме се с конкретна оферта за модел и монтаж.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="tel:0877020320" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c9a24a] to-[#e8d5a3] px-5 py-3 text-sm font-medium text-[#0b1020]">
                  <Phone size={16} /> 0877 020 320
                </a>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm text-white/70">
                  <MapPin size={16} className="text-[#c9a24a]" /> ул. Йосиф Шнитер 10, Пловдив
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
