import { useEffect, useState } from 'react';

const WISPS = Array.from({ length: 14 }, (_, i) => i);

export default function AirConditioner() {
  const [mode, setMode] = useState<'cool' | 'heat'>('cool');

  useEffect(() => {
    const id = window.setInterval(() => {
      setMode((m) => (m === 'cool' ? 'heat' : 'cool'));
    }, 5800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={`ac-scene mx-auto ac-${mode}`} aria-hidden="true">
      <div className="ac-rig">
        <div className="ac-unit">
          <div className="ac-face ac-top" />
          <div className="ac-face ac-front">
            <span className="ac-led" />
            <span className="ac-display">{mode === 'cool' ? '18°' : '26°'}</span>
            <div className="ac-louvers">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="ac-face ac-side" />
          <div className="ac-face ac-bottom" />
        </div>

        <div className="ac-airflow">
          <div className="ac-stream ac-stream-a" />
          <div className="ac-stream ac-stream-b" />
          <div className="ac-stream ac-stream-c" />
          {WISPS.map((i) => (
            <span
              key={i}
              className="ac-wisp"
              style={{
                left: `${10 + (i % 7) * 12}%`,
                animationDelay: `${(i % 7) * 0.18 + Math.floor(i / 7) * 0.35}s`,
                animationDuration: `${2.1 + (i % 5) * 0.22}s`,
              }}
            />
          ))}
        </div>

        <div className="ac-shadow" />
      </div>
      <div className="ac-mode">
        <span className="ac-mode-dot" />
        {mode === 'cool' ? 'Охлаждане' : 'Отопление'}
      </div>
    </div>
  );
}
