import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UcanTavuk() {
  const GAME_ID = 12;
  const [birdPos, setBirdPos] = useState(200);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`highScore_${GAME_ID}`);
    if (saved) setHighScore(parseInt(saved));
    const fall = setInterval(() => {
      if (!gameOver) setBirdPos(p => p + 4);
    }, 30);
    return () => clearInterval(fall);
  }, [gameOver]);

  const jump = () => {
    if (!gameOver) setBirdPos(p => p - 60);
    if (birdPos < 0 || birdPos > 500) setGameOver(true);
  };

  useEffect(() => {
    if (gameOver) {
      const saved = parseInt(localStorage.getItem(`highScore_${GAME_ID}`)) || 0;
      if (score > saved) localStorage.setItem(`highScore_${GAME_ID}`, score.toString());
    }
  }, [gameOver]);

  return (
    <div onClick={jump} className="min-h-screen bg-gray-900 flex flex-col items-center justify-center overflow-hidden touch-none relative">
      <div className="absolute top-10 text-white text-3xl font-black z-10">SKOR: {score}</div>
      <div className={`text-6xl absolute transition-all duration-100`} style={{ top: birdPos, left: '20%' }}>🐔</div>
      <div className="w-full h-full bg-blue-900/10 absolute inset-0"></div>
      {gameOver && (
        <div className="z-20 bg-gray-800 p-10 rounded-3xl border border-red-500 text-center">
          <h2 className="text-white text-3xl font-black mb-4">EYVAH!</h2>
          <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-10 py-2 rounded-xl font-bold uppercase">TEKRAR</button>
        </div>
      )}
      <Link href="/" className="absolute bottom-10 text-gray-600 underline">← Menü</Link>
    </div>
  );
}
