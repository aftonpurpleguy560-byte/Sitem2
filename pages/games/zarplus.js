import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ZarPlus() {
  const [dice, setDice] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    setBest(localStorage.getItem('zarplus-rekor') || 0);
  }, []);

  const rollDice = () => {
    if (rolling) return;
    setRolling(true);
    
    // Zar atma animasyonu için kısa bir gecikme
    setTimeout(() => {
      const newDice = Math.floor(Math.random() * 6) + 1;
      setDice(newDice);
      setRolling(false);
      
      if (newDice === 1) {
        alert("1 Geldi! Prestij Kaybedildi! Skor Sıfırlandı.");
        setScore(0);
      } else {
        const newScore = score + newDice;
        setScore(newScore);
        if (newScore > best) {
          setBest(newScore);
          localStorage.setItem('zarplus-rekor', newScore);
        }
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-8 left-8 text-blue-400 font-bold">← GERİ DÖN</Link>
      
      <h1 className="text-5xl font-black mb-2 italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 uppercase">
        Zar Prestij
      </h1>
      <p className="text-slate-400 mb-12 text-sm uppercase tracking-[0.2em]">1 Getirme, Prestijini Koru!</p>

      <div className="bg-[#1e293b] p-12 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col items-center">
        <div className={`text-[10rem] mb-12 transition-all duration-500 ${rolling ? 'rotate-[360deg] scale-75 opacity-50' : 'rotate-0'}`}>
          {['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][dice - 1]}
        </div>

        <div className="flex gap-8 mb-10">
          <div className="text-center">
            <p className="text-[10px] opacity-40 uppercase font-black tracking-widest">Mevcut Skor</p>
            <p className="text-4xl font-black text-blue-400">{score}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] opacity-40 uppercase font-black tracking-widest">En İyi Prestij</p>
            <p className="text-4xl font-black text-yellow-500">{best}</p>
          </div>
        </div>

        <button 
          onClick={rollDice}
          disabled={rolling}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-black py-5 rounded-2xl font-black text-xl shadow-xl shadow-yellow-900/20 active:scale-95 transition-all"
        >
          {rolling ? 'ATILIYOR...' : 'ZAR AT'}
        </button>
      </div>
    </div>
  );
}
