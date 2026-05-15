import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Carkifelek() {
  const GAME_ID = 2;
  const [angle, setAngle] = useState(0);
  const [prestij, setPrestij] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`highScore_${GAME_ID}`);
    if (saved) setPrestij(parseInt(saved));
  }, []);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    // Rastgele bir dönüş açısı (en az 5 tam tur + rastgele derece)
    const extraDegree = Math.floor(Math.random() * 360);
    const totalSpin = angle + 1800 + extraDegree; 
    setAngle(totalSpin);

    setTimeout(() => {
      setIsSpinning(false);
      const earned = Math.floor(Math.random() * 500) + 100; // Şansına 100-600 arası puan
      const newTotal = prestij + earned;
      setPrestij(newTotal);
      localStorage.setItem(`highScore_${GAME_ID}`, newTotal.toString());
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center p-4">
      <h1 className="text-white text-4xl font-black mb-10 tracking-widest uppercase italic border-b-4 border-yellow-500">
        ÇARKIFELEK
      </h1>
      
      {/* Çark Görseli */}
      <div 
        style={{ transform: `rotate(${angle}deg)` }} 
        className="w-64 h-64 rounded-full border-8 border-yellow-500 bg-gradient-to-tr from-red-500 via-blue-500 to-green-500 transition-transform duration-[3000ms] ease-out shadow-[0_0_50px_rgba(234,179,8,0.3)] flex items-center justify-center relative"
      >
        <div className="absolute w-1 h-full bg-white/20"></div>
        <div className="absolute h-1 w-full bg-white/20"></div>
        <span className="text-4xl font-black text-white drop-shadow-lg">?</span>
      </div>

      {/* Ok Göstergesi */}
      <div className="text-3xl mt-[-20px] z-10 text-yellow-500 drop-shadow-md">▼</div>

      <button 
        onClick={spin} 
        disabled={isSpinning}
        className={`mt-10 px-12 py-4 rounded-2xl font-black text-xl transition-all shadow-xl active:scale-90 ${isSpinning ? 'bg-gray-600' : 'bg-yellow-500 hover:bg-yellow-400 text-black'}`}
      >
        {isSpinning ? "DÖNÜYOR..." : "ÇEVİR!"}
      </button>

      <div className="mt-12 bg-white/10 p-4 rounded-2xl border border-white/20 text-center">
        <p className="text-gray-300 text-xs uppercase font-bold tracking-widest">Toplam Servet</p>
        <p className="text-yellow-400 text-2xl font-black italic">{prestij} Puan</p>
      </div>

      <Link href="/" className="mt-8 text-gray-500 underline text-xs">← Menüye Dön</Link>
    </div>
  );
}
