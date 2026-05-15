import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const WORDS = ["MORADAM", "TABLET", "YAZILIM", "GAMES", "REACT", "NEXTJS", "CYBER"];

export default function KelimeBulma() {
  const [target, setTarget] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);

  const setupGame = () => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTarget(word);
    setScrambled(word.split('').sort(() => Math.random() - 0.5).join(''));
    setGuess("");
  };

  useEffect(() => {
    setupGame();
  }, []);

  const checkGuess = (e) => {
    e.preventDefault();
    if (guess.toUpperCase() === target) {
      const newScore = score + 10;
      setScore(newScore);
      localStorage.setItem('kelimebulma-rekor', newScore);
      alert("Doğru! +10 Puan");
      setupGame();
    } else {
      alert("Hatalı Tahmin!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-8 left-8 text-purple-400 font-bold">← GERİ DÖN</Link>
      
      <h1 className="text-5xl font-black mb-8 italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 uppercase">
        Kelime Bulma
      </h1>

      <div className="bg-[#1e293b] p-10 rounded-[3rem] border border-white/5 shadow-2xl w-full max-w-md text-center">
        <p className="text-[10px] opacity-40 uppercase font-black tracking-widest mb-2">Karışık Harfler</p>
        <div className="text-4xl font-mono tracking-[0.3em] font-black text-purple-400 mb-10 bg-black/30 p-6 rounded-2xl">
          {scrambled}
        </div>

        <form onSubmit={checkGuess} className="flex flex-col gap-4">
          <input 
            type="text" 
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Kelimeyi yaz..."
            className="bg-black/40 border border-white/10 p-5 rounded-2xl text-center text-xl font-bold focus:ring-2 ring-purple-500 outline-none"
          />
          <button className="bg-purple-600 hover:bg-purple-500 py-4 rounded-2xl font-black transition-all">TAHMİN ET</button>
        </form>

        <p className="mt-8 text-sm font-bold opacity-60 uppercase">Puan: {score}</p>
      </div>
    </div>
  );
}
