import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function XOX() {
  const GAME_ID = 15;
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winCount, setWinCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`highScore_${GAME_ID}`);
    if (saved) setWinCount(parseInt(saved));
  }, []);

  const calculateWinner = (sq) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let [a, b, c] of lines) if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
    return null;
  };

  const handleClick = (i) => {
    if (calculateWinner(board) || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = isX ? 'X' : 'O';
    setBoard(newBoard);
    setIsX(!isX);

    const winner = calculateWinner(newBoard);
    if (winner === 'X') {
      const newTotal = winCount + 10;
      setWinCount(newTotal);
      localStorage.setItem(`highScore_${GAME_ID}`, newTotal.toString());
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-black mb-4">XOX <span className="text-blue-500">ARENA</span></h1>
      <p className="mb-8 text-yellow-500 font-bold uppercase tracking-widest">Galibiyet Puanı: {winCount}</p>
      <div className="grid grid-cols-3 gap-3 bg-gray-800 p-4 rounded-[2rem] border border-gray-700">
        {board.map((v, i) => (
          <button key={i} onClick={() => handleClick(i)} className="w-20 h-20 bg-gray-700 rounded-2xl text-3xl font-black hover:bg-gray-600 transition-all active:scale-90">
            {v}
          </button>
        ))}
      </div>
      <button onClick={() => setBoard(Array(9).fill(null))} className="mt-8 bg-white text-black px-8 py-2 rounded-full font-bold">TEMİZLE</button>
      <Link href="/" className="mt-4 text-gray-500 text-sm">← Geri</Link>
    </div>
  );
}
