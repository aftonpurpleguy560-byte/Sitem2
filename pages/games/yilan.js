import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Snake() {
  const GAME_ID = 1; // Ana sayfadaki ID ile aynı
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // 1. SKOR YÜKLEME (LocalStorage)
  useEffect(() => {
    const saved = localStorage.getItem(`highScore_${GAME_ID}`);
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // 2. OYUN MOTORU (Orijinal ve Hızlı)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 5, y: 5 };
    let dx = 1; let dy = 0; // Başlangıçta sağa gitsin
    let currentScore = 0;

    const gameLoop = setInterval(() => {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      // Duvara veya kendine çarpma kontrolü
      if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snake.some(s => s.x === head.x && s.y === head.y)) {
        clearInterval(gameLoop);
        setGameOver(true);
        // KAYIT İŞLEMİ: Rekor kırıldıysa kaydet
        const saved = parseInt(localStorage.getItem(`highScore_${GAME_ID}`)) || 0;
        if (currentScore > saved) {
          localStorage.setItem(`highScore_${GAME_ID}`, currentScore.toString());
        }
        return;
      }

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        currentScore += 10;
        setScore(currentScore);
        food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
      } else {
        snake.pop();
      }

      // Çizim İşlemleri (Tailwind renklerine uygun)
      ctx.fillStyle = '#111827'; ctx.fillRect(0, 0, 400, 400); // bg-gray-900
      ctx.fillStyle = '#3b82f6'; snake.forEach(s => ctx.fillRect(s.x * 20, s.y * 20, 18, 18)); // blue-500
      ctx.fillStyle = '#ef4444'; ctx.fillRect(food.x * 20, food.y * 20, 18, 18); // red-500
    }, 120); // İdeal hız

    const handleKey = (e) => {
      if (e.key === 'ArrowUp' && dy !== 1) { dx = 0; dy = -1; }
      else if (e.key === 'ArrowDown' && dy !== -1) { dx = 0; dy = 1; }
      else if (e.key === 'ArrowLeft' && dx !== 1) { dx = -1; dy = 0; }
      else if (e.key === 'ArrowRight' && dx !== -1) { dx = 1; dy = 0; }
    };

    window.addEventListener('keydown', handleKey);
    return () => { clearInterval(gameLoop); window.removeEventListener('keydown', handleKey); };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-black text-white italic tracking-tighter mb-2">SNAKE <span className="text-blue-500">PRO</span></h1>
        <div className="flex gap-4 text-sm font-bold">
          <span className="text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">SKOR: {score}</span>
          <span className="text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">REKOR: {highScore}</span>
        </div>
      </div>

      <canvas ref={canvasRef} width="400" height="400" className="bg-gray-800 rounded-2xl border-4 border-gray-700 shadow-2xl" />

      {gameOver && (
        <div className="mt-8 bg-gray-800 p-6 rounded-3xl border border-red-500/50 text-center animate-in zoom-in">
          <p className="text-red-500 font-black text-2xl mb-4 uppercase">Görüntü Gitti!</p>
          <button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-lg">TEKRAR DENE</button>
        </div>
      )}
      
      <Link href="/" className="mt-8 text-gray-500 hover:text-white transition-colors border-b border-gray-800 pb-1">← Ana Menüye Dön</Link>
    </div>
  );
}
