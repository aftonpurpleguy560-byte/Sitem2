import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlokKule() {
  const [blocks, setBlocks] = useState([1]);
  const [gameOver, setGameOver] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center p-6 overflow-hidden">
      <Link href="/" className="self-start text-slate-400 mb-4">← GERİ</Link>
      <div className="flex flex-col-reverse items-center w-full max-w-xs">
        {blocks.map((b, i) => (
          <div key={i} className="h-8 bg-blue-500 border border-white transition-all duration-300" style={{ width: `${100 - i * 5}%` }}></div>
        ))}
      </div>
      <button onClick={() => { if(blocks.length < 20) setBlocks([...blocks, 1]); else setGameOver(true); }}
        className="mt-10 bg-green-600 px-10 py-4 rounded-2xl font-bold text-white">BLOK EKLE</button>
      {gameOver && <div className="mt-4 text-yellow-500 font-bold">KULE TAMAMLANDI!</div>}
    </div>
  );
      }
