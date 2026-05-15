import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Sudoku() {
  const GAME_ID = 10;
  const [grid, setGrid] = useState(Array(9).fill(null).map(() => Array(9).fill('')));
  const [prestij, setPrestij] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`highScore_${GAME_ID}`);
    if (saved) setPrestij(parseInt(saved));
  }, []);

  const handleInput = (r, c, val) => {
    if (!/^[1-9]?$/.test(val)) return;
    const newGrid = [...grid];
    newGrid[r][c] = val;
    setGrid(newGrid);
    
    if (val !== '') {
      const newTotal = prestij + 20;
      setPrestij(newTotal);
      localStorage.setItem(`highScore_${GAME_ID}`, newTotal.toString());
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-black mb-8 italic tracking-tighter">SİBER <span className="text-blue-500 text-5xl">9</span></h1>
      <p className="mb-6 font-bold text-blue-400">Toplam Zeka: {prestij}</p>
      <div className="grid grid-cols-9 bg-blue-500 border-2 border-blue-500 shadow-2xl">
        {grid.map((row, r) => row.map((cell, c) => (
          <input key={`${r}-${c}`} value={cell} onChange={(e) => handleInput(r, c, e.target.value)} className="w-8 h-8 md:w-10 md:h-10 text-center bg-gray-900 border border-gray-800 outline-none focus:bg-blue-900 text-sm font-bold transition-colors" />
        )))}
      </div>
      <Link href="/" className="mt-12 text-gray-600 underline text-xs">← Ana Menü</Link>
    </div>
  );
}
