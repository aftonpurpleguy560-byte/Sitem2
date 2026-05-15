import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const baseIcons = ['🍎', '🍌', '🥝', '🍇', '🍉', '🍓', '🍒', '🍍'];

export default function KartOyunu() {
  const [cards, setCards] = useState([]);
  const [opened, setOpened] = useState([]);
  const [matched, setMatched] = useState([]);
  const [mismatch, setMismatch] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffled = [...baseIcons, ...baseIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon }));
    setCards(shuffled);
  }, []);

  const flip = (index) => {
    if (opened.length === 2 || matched.includes(index) || opened.includes(index) || mismatch.length > 0) return;

    const newOpened = [...opened, index];
    setOpened(newOpened);

    if (newOpened.length === 2) {
      setMoves(m => m + 1);
      if (cards[newOpened[0]].icon === cards[newOpened[1]].icon) {
        setMatched(prev => [...prev, newOpened[0], newOpened[1]]);
        setOpened([]);
      } else {
        setMismatch(newOpened);
        setTimeout(() => {
          setOpened([]);
          setMismatch([]);
        }, 800);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
      <Head>
        <title>Kart Oyunu | Moradam</title>
      </Head>

      <div className="w-full max-w-md flex justify-between items-center mb-10 absolute top-10 px-6">
        <Link href="/" className="bg-white/5 border border-white/10 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black">
          ← GERİ
        </Link>
        <div className="text-right">
          <p className="text-[9px] opacity-40 uppercase font-bold tracking-tighter">Hamle</p>
          <p className="text-2xl font-black text-blue-500">{moves}</p>
        </div>
      </div>

      <h2 className="text-4xl md:text-6xl font-black italic mb-12 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">
        KART OYUNU
      </h2>

      <div className="grid grid-cols-4 gap-3 md:gap-5">
        {cards.map((card, i) => {
          const isOpened = opened.includes(i);
          const isMatched = matched.includes(i);
          const isWrong = mismatch.includes(i);

          return (
            <div 
              key={i} 
              onClick={() => flip(i)} 
              className={`w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-4xl rounded-[2rem] cursor-pointer transition-all duration-300 relative border 
                ${isOpened || isMatched ? 'bg-[#161d2b] border-white/10' : 'bg-neutral-900 border-white/5 hover:border-white/20'}
                ${isWrong ? 'border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)]' : ''}
                ${isMatched ? 'opacity-30' : 'opacity-100'}`}
            >
              {isWrong ? (
                <span className="text-red-600 font-black text-5xl">✕</span>
              ) : (isOpened || isMatched) ? (
                <span className="scale-110">{card.icon}</span>
              ) : (
                <span className="opacity-10 text-[8px] font-black tracking-tighter">MORADAM</span>
              )}
            </div>
          );
        })}
      </div>

      <footer className="absolute bottom-10 opacity-20 text-[9px] tracking-[0.4em] font-bold uppercase w-full text-center">
        Purpleguy © 2026 - tablet power
      </footer>
    </div>
  );
    }
