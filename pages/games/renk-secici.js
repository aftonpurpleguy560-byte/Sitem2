import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RenkSecici() {
  const GAME_ID = 9;
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const colors = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"];

  useEffect(() => {
    const saved = localStorage.getItem(`highScore_${GAME_ID}`);
    if (saved) setHighScore(parseInt(saved));
    generateLevel();
  }, []);

  const generateLevel = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
    setOptions([...colors].sort(() => Math.random() - 0.5));
  };

  const handlePick = (color) => {
    if (color === targetColor) {
      const newScore = score + 50;
      setScore(newScore);
      generateLevel();
      if (newScore > highScore) {
        localStorage.setItem(`highScore_${GAME_ID}`, newScore.toString());
        setHighScore(newScore);
      }
    } else {
      setScore(0);
      generateLevel();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-black mb-4 italic tracking-tighter">RENK <span className="text-blue-500">AVCISI</span></h1>
      <p className="mb-10 text-gray-500 font-bold uppercase tracking-widest">En Yüksek: {highScore}</p>
      <div className="w-40 h-40 rounded-full mb-10 border-8 border-gray-800 shadow-inner" style={{ backgroundColor: targetColor }}></div>
      <div className="grid grid-cols-3 gap-4">
        {options.map((c, i) => (
          <div key={i} onClick={() => handlePick(c)} className="w-16 h-16 rounded-2xl cursor-pointer hover:scale-110 transition-transform active:scale-90" style={{ backgroundColor: c }}></div>
        ))}
      </div>
      <p className="mt-10 font-black text-2xl text-blue-400">{score}</p>
      <Link href="/" className="mt-8 text-gray-700 underline">← Geri</Link>
    </div>
  );
}
