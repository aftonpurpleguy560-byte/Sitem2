import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DynooRoblox() {
  const GAME_ID = 4;
  const [pos, setPos] = useState(0); // 0: Sol, 1: Sağ
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`highScore_${GAME_ID}`);
    if (saved) setHighScore(parseInt(saved));
    if (gameOver) return;
    const interval = setInterval(() => setScore(s => s + 1), 100);
    return () => clearInterval(interval);
  }, [gameOver]);

  const move = () => { if(!gameOver) setPos(p => (p === 0 ? 1 : 0)); };

  useEffect(() => {
    if (gameOver) {
      const saved = parseInt(localStorage.getItem(`highScore_${GAME_ID}`)) || 0;
      if (score > saved) {
        localStorage.setItem(`highScore_${GAME_ID}`, score.toString());
        setHighScore(score);
      }
    }
  }, [gameOver]);

  return (
    <div onClick={move} className="min-h-screen bg-[#334455] flex flex-col items-center justify-center p-4 touch-none">
      {/* Nostaljik Roblox Üst Menü Rengi */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: 'sans-serif' }}>
          ROBLOX <span className="text-sm font-normal">2006 Edition</span>
        </h1>
        <p className="text-[#BBBBBB] font-mono text-xs mt-2">Score: {score} | Best: {highScore}</p>
      </div>

      {/* Oyun Alanı: Klasik Studs (Noktalı) Zemin Efekti */}
      <div className="relative w-72 h-96 bg-[#A3A2A5] border-[6px] border-[#888888] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] flex justify-around items-end pb-10 overflow-hidden">
        {/* Karakter (Bloklu Oof Karakteri Temsili) */}
        <div 
          className={`absolute bottom-10 w-12 h-16 transition-all duration-150 ${pos === 0 ? 'left-10' : 'right-10'}`}
        >
          {/* Kafa */}
          <div className="bg-[#F5CD2F] w-8 h-8 mx-auto rounded-sm border-b-2 border-black/20"></div>
          {/* Gövde */}
          <div className="bg-[#0029FF] w-12 h-10 rounded-sm"></div>
        </div>

        {/* Engel: Kırmızı Öldürücü Blok (Killbrick) */}
        {!gameOver && (
          <div 
            onClick={(e) => {e.stopPropagation(); setGameOver(true);}}
            className="absolute top-0 w-16 h-8 bg-[#FF0000] border-b-4 border-red-900 animate-[bounce_2s_infinite] cursor-pointer flex items-center justify-center text-[10px] font-bold text-white"
          >
            KILLBRICK
          </div>
        )}
      </div>

      {gameOver && (
        <div className="mt-8 bg-[#E5E5E5] p-6 border-2 border-[#888888] text-center shadow-lg">
          <p className="text-[#FF0000] font-bold text-xl mb-4" style={{ fontFamily: 'serif' }}>OOF!</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#00FF00] hover:bg-[#00DD00] border-2 border-black px-6 py-2 font-bold text-sm"
          >
            RESPAWN
          </button>
        </div>
      )}

      <Link href="/" className="mt-10 text-[#CCCCCC] text-xs hover:text-white">← Leave Game</Link>
    </div>
  );
        }
