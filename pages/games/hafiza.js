import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const icons = ['🍎', '🍌', '🍇', '🍒', '🍎', '🍌', '🍇', '🍒'];

export default function Memory() {
  const GAME_ID = 18;
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setCards(icons.sort(() => Math.random() - 0.5));
    const saved = localStorage.getItem(`highScore_${GAME_ID}`);
    if (saved) setScore(parseInt(saved));
  }, []);

  const flip = (i) => {
    if (flipped.length === 2 || solved.includes(i)) return;
    const newFlipped = [...flipped, i];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        const newSolved = [...solved, ...newFlipped];
        setSolved(newSolved);
        if (newSolved.length === cards.length) {
          const newScore = score + 50;
          setScore(newScore);
          localStorage.setItem(`highScore_${GAME_ID}`, newScore.toString());
        }
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-black mb-4 italic text-blue-500">HAFIZA</h1>
      <p className="mb-8 font-bold text-gray-400 text-sm tracking-widest">TOPLAM PRESTİJ: {score}</p>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((icon, i) => (
          <div key={i} onClick={() => flip(i)} className={`w-16 h-16 flex items-center justify-center rounded-2xl cursor-pointer text-2xl transition-all ${flipped.includes(i) || solved.includes(i) ? 'bg-blue-600 rotate-0' : 'bg-gray-800 rotate-180'}`}>
            {flipped.includes(i) || solved.includes(i) ? icon : '?'}
          </div>
        ))}
      </div>
      <Link href="/" className="mt-12 text-gray-500 underline text-xs">← GERİ DÖN</Link>
    </div>
  );
}
