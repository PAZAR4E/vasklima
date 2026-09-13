import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setP(max > 0 ? el.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-[#38bdf8] via-[#e8d5a3] to-[#f59e0b]"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}
