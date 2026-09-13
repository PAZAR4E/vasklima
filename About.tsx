import Reveal from '../components/Reveal';

export default function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <Reveal>
        <div className="pt-6 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.22em] text-[#c9a24a]">За нас</div>
          <h1 className="mt-2 font-display text-5xl text-white">ВАС КЛИМА — климатици с грижа</h1>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            Работим от Пловдив, ул. Йосиф Шнитер 10, и обслужваме клиенти в цялата страна.
            Подбираме климатични системи според помещението, бюджета и начина на ползване — не продаваме „на око“.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Reveal x={-20}>
          <img src="/images/about/outdoor-unit.jpg" alt="Външно тяло на климатик" className="h-72 w-full rounded-[28px] object-cover" />
        </Reveal>
        <Reveal x={20} delay={0.08}>
          <img src="/images/about/ac-outdoor-row.jpg" alt="Климатични външни тела" className="h-72 w-full rounded-[28px] object-cover" />
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          { t: 'Консултация', d: 'Измерваме квадратура, изолация и изложение, за да изберем правилната мощност.' },
          { t: 'Монтаж', d: 'Чиста работа, дренаж, вакуум и проверка. Оставяме помещението подредено.' },
          { t: 'След продажбата', d: 'Гаранция, профилактика и бърз сервиз — обадете се на 0877 020 320.' },
        ].map((x, i) => (
          <Reveal key={x.t} delay={i * 0.08}>
            <div className="rounded-3xl border border-white/8 bg-[#0d1424] p-6">
              <h2 className="font-display text-3xl text-white">{x.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{x.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
