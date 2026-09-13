import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Начало' },
  { to: '/klimatici', label: 'Климатици' },
  { to: '/termopompi', label: 'Термопомпи' },
  { to: '/uslugi', label: 'Услуги' },
  { to: '/za-nas', label: 'За нас' },
  { to: '/kontakt', label: 'Контакт' },
];

function jumpTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-3">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <Link to="/" className="flex items-center gap-3" onClick={() => { setOpen(false); jumpTop(); }}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#e8d5a3] to-[#8a6a22] text-[#0b1020] font-display text-xl font-semibold">
              В
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[22px] tracking-[0.14em] gold-text">ВАС КЛИМА</span>
              <span className="block text-[10px] uppercase tracking-[0.28em] text-white/45">Климатици · Монтаж · Сервиз</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={jumpTop}
                className={({ isActive }: { isActive: boolean }) =>
                  `text-[13px] tracking-[0.16em] uppercase transition ${
                    isActive ? 'text-[#e8d5a3]' : 'text-white/60 hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <a
            href="tel:0877020320"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c9a24a] to-[#e8d5a3] px-4 py-2 text-[#0b1020] text-sm font-medium shadow-lg shadow-amber-900/20"
          >
            <Phone size={15} />
            0877 020 320
          </a>

          <button
            className="lg:hidden text-white/80 p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="glass mt-2 rounded-2xl p-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => { setOpen(false); jumpTop(); }}
                  className={({ isActive }: { isActive: boolean }) =>
                    `rounded-xl px-3 py-2 text-sm tracking-wide ${
                      isActive ? 'bg-white/8 text-[#e8d5a3]' : 'text-white/75'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <a href="tel:0877020320" className="rounded-xl px-3 py-2 text-[#e8d5a3]">
                0877 020 320
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
