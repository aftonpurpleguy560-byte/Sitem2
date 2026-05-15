import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CPS() {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setActive(false);
      const best = localStorage.getItem('cps-rekor') || 0;
      if (clicks > best) localStorage.setItem('cps-rekor', clicks);
    }
  }, [active, timeLeft]);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6">
      <Link href="/" className="absolute top-10 left-10 text-slate-400">← GERİ</Link>
      <div className="text-4xl font-black mb-4">CPS: {(clicks / 10).toFixed(1)}</div>
      <div className="text-xl mb-10">Süre: {timeLeft}s | Toplam: {clicks}</div>
      <button 
        onClick={() => { if(timeLeft > 0) { setActive(true); setClicks(c => c + 1); } }}
        className="w-48 h-48 bg-red-600 rounded-full text-2xl font-bold shadow-lg active:scale-90 transition-all"
      >
        {timeLeft === 0 ? "BİTTİ!" : "TIKLA!"}
      </button>
      {timeLeft === 0 && <button onClick={() => window.location.reload()} className="mt-10 underline">TEKRAR DENE</button>}
    </div>
  );
      }
