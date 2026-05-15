import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RenkSasirtma() {
  const colors = [
    { n: 'KIRMIZI', c: 'text-red-500' }, { n: 'MAVİ', c: 'text-blue-500' },
    { n: 'YEŞİL', c: 'text-green-500' }, { n: 'SARI', c: 'text-yellow-500' }
  ];
  const [target, setTarget] = useState({ n: '', c: '' });
  const [score, setScore] = useState(0);

  const next = () => {
    const randomName = colors[Math.floor(Math.random() * colors.length)].n;
    const randomColor = colors[Math.floor(Math.random() * colors.length)].c;
    setTarget({ n: randomName, c: randomColor });
  };

  useEffect(() => next(), []);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6">
      <Link href="/" className="absolute top-10 left-10 text-slate-400">← GERİ</Link>
      <div className="text-sm mb-2 text-slate-500">YAZI RENGİNİ SEÇ!</div>
      <div className={`text-6xl font-black mb-12 ${target.c}`}>{target.n}</div>
      <div className="grid grid-cols-2 gap-4">
        {colors.map(col => (
          <button key={col.n} onClick={() => { if(`text-${col.c.split('-')[1]}-500` === target.c) setScore(s => s+1); else setScore(0); next(); }}
            className="bg-slate-800 px-6 py-4 rounded-xl font-bold uppercase">{col.n}</button>
        ))}
      </div>
      <div className="mt-10 font-bold text-xl">PUAN: {score}</div>
    </div>
  );
}
