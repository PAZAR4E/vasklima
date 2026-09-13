import { useEffect, useState } from 'react';

export default function ScrollAura() {
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = Math.max(1, el.scrollHeight - el.clientHeight);
      setY(el.scrollTop / max);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute h-[42vh] w-[42vh] rounded-full blur-[110px] transition-colors duration-700"
        style={{
          left: `${8 + y * 42}%`,
          top: `${12 + y * 38}%`,
          background: y < 0.5
            ? 'rgba(56, 189, 248, 0.08)'
            : 'rgba(245, 158, 11, 0.08)',
        }}
      />
      <div
        className="absolute h-[36vh] w-[36vh] rounded-full bg-amber-400/[0.06] blur-[100px]"
        style={{
          right: `${4 + y * 28}%`,
          top: `${48 - y * 22}%`,
        }}
      />
    </div>
  );
}
