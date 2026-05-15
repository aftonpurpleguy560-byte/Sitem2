import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TierList() {
  const GAME_ID = 11;
  const [items, setItems] = useState(["🍎", "🍕", "🎮", "💻", "🔥"]);
  const [prestij, setPrestij] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`highScore_${GAME_ID}`);
    if (saved) setPrestij(parseInt(saved));
  }, []);

  const update = () => {
    const next = prestij + 10;
    setPrestij(next);
    localStorage.setItem(`highScore_${GAME_ID}`, next.toString());
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-black mb-10 italic">TIER <span className="text-yellow-500 underline">LIST</span></h1>
      <p className="mb-6 font-bold text-gray-500">Küratör Puanı: {prestij}</p>
      <div className="w-full max-w-md space-y-4">
        {["S", "A", "B", "C"].map(tier => (
          <div key={tier} className="flex bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 min-h-[60px]">
            <div className={`w-16 flex items-center justify-center font-black text-2xl ${tier === 'S' ? 'bg-red-500' : 'bg-orange-500'}`}>{tier}</div>
            <div className="p-4 flex gap-4 overflow-x-auto">
               <button onClick={update} className="text-xs text-gray-600 uppercase">Öge Ekle</button>
            </div>
          </div>
        ))}
      </div>
      <Link href="/" className="mt-12 text-gray-600 underline">← Geri</Link>
    </div>
  );
}
