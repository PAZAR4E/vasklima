import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/8 bg-[#05070e]">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-3xl tracking-[0.14em] gold-text">ВАС КЛИМА</div>
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            Премиум климатици, професионален монтаж и сервиз. Работим в цялата страна.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-[#e8d5a3]">Навигация</div>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/65">
            <Link to="/klimatici" className="hover:text-white">Климатици</Link>
            <Link to="/termopompi" className="hover:text-white">Термопомпи</Link>
            <Link to="/uslugi" className="hover:text-white">Услуги</Link>
            <Link to="/za-nas" className="hover:text-white">За нас</Link>
            <Link to="/kontakt" className="hover:text-white">Контакт</Link>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-[#e8d5a3]">Кореспонденция</div>
          <div className="mt-4 space-y-3 text-sm text-white/65">
            <p className="flex gap-2"><MapPin size={16} className="mt-0.5 text-[#c9a24a]" /> Пловдив, ул. Йосиф Шнитер 10</p>
            <a href="tel:0877020320" className="flex gap-2 hover:text-white"><Phone size={16} className="text-[#c9a24a]" /> 0877 020 320</a>
            <a href="mailto:office@vasklima.bg" className="flex gap-2 hover:text-white"><Mail size={16} className="text-[#c9a24a]" /> office@vasklima.bg</a>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-[#e8d5a3]">Работно време</div>
          <div className="mt-4 space-y-2 text-sm text-white/65">
            <p className="flex gap-2"><Clock size={16} className="text-[#c9a24a]" /> пн – пт: 09:00 – 18:00</p>
            <p className="pl-6">събота: 10:00 – 14:00</p>
            <p className="pl-6">неделя: почивен ден</p>
            <p className="pt-2 text-white/80">Обслужване в цялата страна</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/6 py-5 text-center text-xs text-white/35 tracking-wide">
        © {new Date().getFullYear()} ВАС КЛИМА. Всички права запазени.
      </div>
    </footer>
  );
}
