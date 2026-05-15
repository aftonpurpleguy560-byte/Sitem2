import React, { useState } from 'react';
import Head from 'next/head';

// Oyun Başlatıldığında Açılan Ekran
const GameBox = ({ name, onBack }) => (
  <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
    <button 
      onClick={onBack} 
      className="absolute top-10 left-10 border border-white/20 px-6 py-2 rounded-xl hover:bg-white hover:text-black transition-all font-bold"
    >
      ← GERİ
    </button>
    <h2 className="text-6xl md:text-8xl font-black mb-4 italic uppercase tracking-tighter">{name}</h2>
    <p className="opacity-50 tracking-[0.6em] text-xs uppercase">Çok Yakında Sizlerle...</p>
    <div className="mt-12 animate-spin text-5xl text-purple-600">⚙️</div>
  </div>
);

export default function Home() {
  const [activeGame, setActiveGame] = useState(null);
  const [search, setSearch] = useState('');

  // Ekran görüntülerindeki tüm oyunlar ve detayları
  const games = [
    { id: 'cyber-snake', name: 'CYBER SNAKE', icon: '🐍', category: 'ARCADE', desc: 'Klasik yılan oyununu oyna!' },
    { id: 'carkifelek', name: 'ÇARKIFELEK', icon: '🎡', category: 'ŞANS', desc: '1-25 arası şansını dene!' },
    { id: 'dinozor', name: 'DINOZOR', icon: '🦖', category: 'ARCADE', desc: 'Engellerden atla, hayatta tut!' },
    { id: 'dynoo', name: 'DYNOO', icon: '🧱', category: 'MACERA', desc: '2004-2009 Roblox stili macera!' },
    { id: 'hizli-yazma', name: 'HIZLI YAZMA', icon: '⌨️', category: 'YETENEK', desc: 'Ne kadar hızlı yazabildiğini test et!' },
    { id: 'kart-oyunu', name: 'KART OYUNU', icon: '🃏', category: 'HAFIZA', desc: 'Kartları eşleştir, hafızanı zorla!' },
    { id: 'mayin-tarlasi', name: 'MAYIN TARLASI', icon: '💣', category: 'STRATEJİ', desc: 'Mayınlara basmadan temizle!' },
    { id: 'paint', name: 'PAINT', icon: '🎨', category: 'YARATICILIK', desc: 'Hayal gücünü konuştur, özgürce çiz!' },
    { id: 'renk-secici', name: 'RENK SEÇİCİ', icon: '🌈', category: 'YETENEK', desc: 'Doğru rengi yakala!' },
    { id: 'sudoku', name: 'SUDOKU', icon: '🔢', category: 'ZEKA', desc: 'Zekânı zorlayacak klasik!' },
    { id: 'tier-list', name: 'TIER LIST', icon: '📊', category: 'ARAÇ', desc: 'Öğeleri sırala!' },
    { id: 'ucan-tavuk', name: 'UÇAN TAVUK', icon: '🐔', category: 'ARCADE', desc: 'Tavuğu uçur, engellerden kaç!' },
    { id: 'havali-yilan', name: 'HAVALI YILAN', icon: '🤪', category: 'ARCADE', desc: 'Havalı ve yılan!' },
    { id: 'kelime-tahmin', name: 'KELIME TAHMIN', icon: '🔠', category: 'ZEKA', desc: 'Harfleri doğru tahmin et!' },
    { id: 'xox-oyunu', name: 'XOX OYUNU', icon: '❌', category: 'STRATEJİ', desc: 'X ve O rekabetine katıl!' },
    { id: 'sayi-tahmin', name: 'SAYI TAHMIN', icon: '🎯', category: 'ZEKA', desc: 'Tutulan sayıyı bul!' },
    { id: 'refleks-testi', name: 'REFLEKS TESTI', icon: '⚡', category: 'YETENEK', desc: 'Hızını milisaniye ile ölç!' },
    { id: 'hafiza-kartlari', name: 'HAFIZA KARTLARI', icon: '🧠', category: 'HAFIZA', desc: 'Aynı simgeleri bul!' },
    { id: 'blok-kirma', name: 'BLOK KIRMA', icon: '🧱', category: 'ARCADE', desc: 'Topu sektir, blokları yok et!' },
    { id: 'zar-atma', name: 'ZAR ATMA', icon: '🎲', category: 'ŞANS', desc: 'Zar at ve puanları topla!' },
    { id: 'renk-sasirtma', name: 'RENK ŞAŞIRTMA', icon: '🧠', category: 'ZEKA', desc: 'Beynini zorla!' },
    { id: 'blok-kule', name: 'BLOK KULE', icon: '🏢', category: 'BECERİ', desc: 'Dengeli diz!' },
    { id: 'emoji-bul', name: 'EMOJI BUL', icon: '🎭', category: 'HAFIZA', desc: 'Hafızanı test et!' },
    { id: 'zar-prestij', name: 'ZAR PRESTIJ', icon: '🎲', category: 'ŞANS', desc: 'Puanları topla!' },
    { id: 'kelime-bulma', name: 'KELIME BULMA', icon: '🔍', category: 'ZEKA', desc: 'Kelimeyi yakala!' },
    { id: 'cps-testi', name: 'CPS TESTI', icon: '🖱️', category: 'YETENEK', desc: 'Ne kadar hızlısın?' },
    { id: 'hizli-mat', name: 'HIZLI MAT', icon: '🧮', category: 'ZEKA', desc: 'Dahi misin?' },
    { id: 'yazitura', name: 'YAZI TURA', icon: '🪙', category: 'ŞANS', desc: 'Kaderini seç!' }
  ];

  if (activeGame) {
    const game = games.find(g => g.id === activeGame);
    return <GameBox name={game.name} onBack={() => setActiveGame(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white p-4 md:p-8 font-sans selection:bg-purple-600">
      <Head>
        <title>Moradam Oyun Portalı</title>
      </Head>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Navigasyon Linkleri */}
        <div className="flex gap-3 mb-12">
          <a href="https://jworse.com" target="_blank" rel="noreferrer" className="bg-[#2563eb] px-5 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider hover:scale-105 transition-transform">JWORSE</a>
          <a href="https://cosnowinka.com" target="_blank" rel="noreferrer" className="bg-[#db2777] px-5 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider hover:scale-105 transition-transform">COSNOWINKA</a>
        </div>

        {/* Logo */}
        <h1 className="text-7xl md:text-[10rem] font-black italic bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-700 leading-none mb-12 select-none tracking-tighter">
          MORADAM
        </h1>

        {/* Hata Bildirimi */}
        <div className="mb-12">
            <a href="mailto:aftonpurpleguy560@gmail.com" className="border-2 border-red-600/30 text-red-500 px-10 py-3 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-red-600/10">
              ⚠️ Hata Bildir
            </a>
        </div>

        {/* Arama Barı */}
        <div className="w-full max-w-xl mb-20 relative group">
          <input 
            type="text" 
            placeholder="Oyun ara..." 
            className="w-full bg-[#161d2b] border border-white/5 p-5 pl-8 rounded-full outline-none focus:ring-2 ring-purple-600 transition-all text-sm font-medium shadow-2xl"
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">🔍</span>
        </div>

        {/* Oyun Izgarası */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {games
            .filter(g => g.name.toLowerCase().includes(search.toLowerCase()))
            .map(game => (
              <div 
                key={game.id} 
                className="bg-[#161d2b] border border-white/5 p-10 rounded-[3.5rem] flex flex-col items-center hover:bg-[#1c2538] transition-all group relative overflow-hidden shadow-xl"
              >
                {/* Kupa İkonu */}
                <div className="absolute top-6 right-8 flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                  <span className="text-yellow-500 text-xs">🏆</span>
                  <span className="text-[10px] font-bold opacity-70">0</span>
                </div>

                <div className="text-7xl mb-8 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                  {game.icon}
                </div>
                
                <h3 className="text-2xl font-black italic mb-1 tracking-tighter uppercase">{game.name}</h3>
                <p className="text-[10px] font-bold text-blue-400 mb-4 tracking-[0.3em] uppercase opacity-80">{game.category}</p>
                
                <p className="text-[11px] opacity-40 mb-10 min-h-[32px] leading-relaxed">
                  {game.desc}
                </p>

                <button 
                  onClick={() => setActiveGame(game.id)}
                  className="w-full bg-gradient-to-r from-[#2563eb] to-[#9333ea] py-4 rounded-[1.5rem] font-black text-xs tracking-[0.2em] uppercase hover:brightness-125 transition-all shadow-lg shadow-purple-600/20 active:scale-95"
                >
                  Oyna
                </button>
              </div>
          ))}
        </div>

        {/* Footer / İmza */}
        <footer className="mt-32 pb-12 flex flex-col items-center gap-2">
          <p className="opacity-20 text-[10px] tracking-[0.5em] uppercase font-bold text-center">
             MORADAM © 2026 - TABLET POWER
          </p>
          <p className="opacity-10 text-[9px] font-medium italic">
            Purpleguy © 2026 - tablet power
          </p>
        </footer>
      </div>
    </div>
  );
    }
