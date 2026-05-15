import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function Paint() {
  const GAME_ID = 8;
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prestij, setPrestij] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`highScore_${GAME_ID}`);
    if (saved) setPrestij(parseInt(saved));
    const interval = setInterval(() => {
      setPrestij(p => {
        const next = p + 1;
        localStorage.setItem(`highScore_${GAME_ID}`, next.toString());
        return next;
      });
    }, 5000); // Sanatçıya her 5 saniyede bir prestij
    return () => clearInterval(interval);
  }, []);

  const startDrawing = (e) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-black text-white mb-4 italic uppercase">SİBER <span className="text-blue-500">TUVAL</span></h1>
      <p className="text-gray-500 mb-6 font-bold uppercase tracking-widest text-xs">Sanatçı Prestiji: {prestij}</p>
      <canvas ref={canvasRef} width="600" height="400" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={() => setIsDrawing(false)} className="bg-white rounded-[2.5rem] shadow-2xl cursor-crosshair max-w-full" />
      <div className="mt-8 flex gap-4">
        <button onClick={() => {const ctx=canvasRef.current.getContext('2d'); ctx.clearRect(0,0,600,400);}} className="bg-red-600 text-white px-8 py-2 rounded-xl font-bold uppercase text-xs">Temizle</button>
        <Link href="/" className="bg-gray-800 text-white px-8 py-2 rounded-xl font-bold uppercase text-xs">Çıkış</Link>
      </div>
    </div>
  );
}
