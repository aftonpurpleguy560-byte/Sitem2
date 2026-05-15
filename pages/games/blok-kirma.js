import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function BlokKirma() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans selection:bg-purple-600">
      <Head>
        <title>Blok Kırma | Moradam</title>
      </Head>

      {/* Geri Butonu */}
      <Link 
        href="/" 
        className="absolute top-10 left-10 bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
      >
        ← GERİ
      </Link>

      <div className="flex flex-col items-center w-full max-w-2xl text-center">
        {/* Başlık Bölümü */}
        <h1 className="text-5xl md:text-7xl font-black italic mb-2 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-700">
          BLOK KIRMA
        </h1>
        <p className="text-[10px] tracking-[0.5em] opacity-40 mb-16 uppercase font-bold text-blue-400">Geliştirme Aşamasında</p>

        {/* Oyun Önizleme Alanı */}
        <div className="w-full aspect-video bg-[#161d2b] border border-white/5 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group">
          {/* Neon Arka Plan Parıltısı */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-600/20 blur-[100px] rounded-full group-hover:bg-purple-600/40 transition-all duration-500"></div>

          {/* İkon */}
          <div className="text-7xl mb-6 animate-bounce">🧱</div>
          
          <p className="px-10 text-sm font-medium leading-relaxed opacity-60 max-w-sm">
            Bu oyun şu an <span className="text-purple-500 font-black">Samsung Galaxy Tab A9+</span> cihazın için optimize ediliyor.
          </p>
          
          <div className="mt-8 flex gap-2">
            <span className="w-2 h-2 bg-purple-600 rounded-full animate-ping"></span>
            <span className="text-[10px] font-black tracking-widest uppercase opacity-30 italic">Versiyon 2.0 Beta</span>
          </div>
        </div>

        {/* Bilgi Kartı */}
        <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-md">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <p className="text-[8px] opacity-30 font-bold uppercase mb-1">Kategori</p>
            <p className="text-xs font-black italic uppercase">Arcade</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <p className="text-[8px] opacity-30 font-bold uppercase mb-1">Durum</p>
            <p className="text-xs font-black italic uppercase text-yellow-500">Hazırlanıyor</p>
          </div>
        </div>
      </div>

      {/* Alt İmza */}
      <footer className="mt-24 opacity-20 text-[9px] tracking-[0.4em] font-bold uppercase">
        Purpleguy © 2026 - tablet power
      </footer>
    </div>
  );
}
