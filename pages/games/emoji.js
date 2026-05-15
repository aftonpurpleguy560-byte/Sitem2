import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const EMOJIS = ['🍎', '🍌', '🍒', '🥑', '🥦', '🌽', '🥨', '🍕'];

export default function EmojiGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const duplicatedEmojis = [...EMOJIS, ...EMOJIS];
    const shuffled = duplicatedEmojis.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const handleClick = (index) => {
    if (disabled || flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [first, second] = newFlipped;
      
      if (cards[first] === cards[second]) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-8 left-8 text-blue-400 font-bold">← GERİ DÖN</Link>
      
      <h1 className="text-4xl font-black mb-8 italic text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 uppercase">
        Emoji Hafıza
      </h1>

      <div className="grid grid-cols-4 gap-4 bg-white/5 p-6 rounded-[2rem] border border-white/10 shadow-2xl">
        {cards.map((emoji, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-3xl rounded-2xl cursor-pointer transition-all duration-300 transform ${
              flipped.includes(index) || solved.includes(index) 
                ? 'bg-blue-600 rotate-0' 
                : 'bg-white/10 -rotate-180'
            }`}
          >
            {(flipped.includes(index) || solved.includes(index)) ? emoji : '❓'}
          </div>
        ))}
      </div>

      {solved.length === cards.length && cards.length > 0 && (
        <button 
          onClick={() => window.location.reload()}
          className="mt-10 bg-green-600 px-8 py-3 rounded-full font-black animate-bounce"
        >
          TEBRİKLER! YENİDEN OYNA
        </button>
      )}
    </div>
  );
}
