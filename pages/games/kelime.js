import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function KelimeTahmin() {
  const GAME_ID = 14;
  const words = ["NEXTJS", "REACT", "TAILWIND", "JAVASCRIPT", "MODERN", "HAVALI"];
  const [word, setWord] = useState('');
  const [guessed, setGuessed] = useState([]);
  const [prestij, setPrestij] = useState(0);

  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    const saved = localStorage.getItem(`highScore_${GAME_ID}`);
    if (saved) setPrestij(parseInt(saved));
  }, []);

  const handleGuess = (letter) => {
    if (guessed.includes(letter)) return;
    const newGuessed = [...guessed, letter];
    setGuessed(newGuessed);

    const isWin = word.split('').every(l => newGuessed.includes(l));
    if (isWin) {
      const newTotal = prestij + 100;
      setPrestij(newTotal);
      localStorage.setItem(`highScore_${GAME_ID}`, newTotal.toString());
      alert("Kelimeyi Bildin! +100 Prestij");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-black mb-10 text-blue-500 tracking-tighter">KELİME <span className="text-white">BUL</span></h1>
      <p className="mb-8 font-bold text-gray-500 uppercase tracking-widest">Prestij: {prestij}</p>
      <div className="flex gap-4 mb-12">
        {word.split('').map((l, i) => (
          <span key={i} className="w-12 h-16 border-b-4 border-blue-500 flex items-center justify-center text-4xl font-black uppercase">
            {guessed.includes(l) ? l : ''}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 max-w-md">
        {"ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split('').map(l => (
          <button key={l} onClick={() => handleGuess(l)} disabled={guessed.includes(l)} className={`p-2 rounded-lg font-bold transition-all ${guessed.includes(l) ? 'bg-gray-800 text-gray-600' : 'bg-gray-700 hover:bg-blue-600'}`}>{l}</button>
        ))}
      </div>
      <Link href="/" className="mt-12 text-gray-600 underline">← Menü</Link>
    </div>
  );
}
