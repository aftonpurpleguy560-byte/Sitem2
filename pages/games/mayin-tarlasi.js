import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MayinTarlasi() {
  const GAME_ID = 7;
  const size = 6; 
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [totalPrestij, setTotalPrestij] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`highScore_${GAME_ID}`);
    if (saved) setTotalPrestij(parseInt(saved));
    setupGame();
  }, []);

  const setupGame = () => {
    let newGrid = Array(size * size).fill(null).map(() => ({ isMine: Math.random() < 0.2, revealed: false }));
    setGrid(newGrid);
    setGameOver(false);
  };

  const reveal = (i) => {
    if (gameOver || grid[i].revealed) return;
    const newGrid = [...grid];
    newGrid[i].revealed = true;
    setGrid(newGrid);

    if (newGrid[i].isMine) {
      setGameOver(true);
    } else {
      const newScore = totalPrestij + 10;
      setTotalPrestij(newScore);
      localStorage.setItem(`highScore_${GAME_ID}`, newScore.toString());
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-3xl font-black mb-4">MAYIN <span className="text-red-600 text-4xl">!</span></h1>
      <p className="text-blue-400 font-bold mb-8">Toplam Prestij: {totalPrestij}</p>
      <div className="grid grid-cols-6 gap-2 bg-gray-800 p-4 rounded-3xl border border-gray-700">
        {grid.map((cell, i) => (
          <div key={i} onClick={() => reveal(i)} className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all ${cell.revealed ? (cell.isMine ? 'bg-red-600' : 'bg-gray-600') : 'bg-gray-700 hover:bg-gray-600'}`}>
            {cell.revealed && (cell.isMine ? '💣' : '💎')}
          </div>
        ))}
      </div>
      {gameOver && <button onClick={setupGame} className="mt-8 bg-red-600 px-8 py-2 rounded-full font-black">YANDIN! TEKRAR</button>}
      <Link href="/" className="mt-8 text-gray-500 underline text-xs">← ÇIK</Link>
    </div>
  );
      }
