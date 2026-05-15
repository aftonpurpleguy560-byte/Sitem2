import React, { useState } from 'react';
export default function Game19({ onSave }) {
  const [result, setResult] = useState("?");
  const flip = () => {
    const res = Math.random() > 0.5 ? "YAZI" : "TURA";
    setResult(res);
    onSave(50);
  };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-32 h-32 bg-yellow-500 rounded-full flex items-center justify-center text-2xl font-bold border-4 border-yellow-600 mb-8">{result}</div>
      <button onClick={flip} className="bg-blue-600 px-8 py-3 rounded-xl font-bold">PARAYI AT</button>
    </div>
  );
}
