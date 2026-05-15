import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function HavaliYilan() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 font-sans">
      <Head>
        <title>Havalı Yılan | Moradam</title>
      </Head>

      {/* Geri Butonu */}
      <Link href="/" className="absolute top-6 left-6 bg-white/5 border border-white/10 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all z-10">
        ← GERİ
      </Link>

      <div className="w-full h-[80vh] max-w-5xl relative mt-10">
        {/* Başlık Etiketi */}
        <div className="absolute -top-10 left-0">
          <span className="text-[10px] font-bold text-purple-500 tracking-[0.5em] uppercase">ARCADE / HAVALI YILAN</span>
        </div>

        {/* Oyun Çerçevesi (iframe) */}
        <iframe
          src="https://jworse.com/tr/embed/games/snake?scroll=false"
          className="w-full h-full rounded-[2.5rem] shadow-2xl border border-white/10"
          frameBorder="0"
          allowFullScreen
          title="Havalı Yılan"
        ></iframe>
      </div>

      {/* Alt Bilgi */}
      <footer className="mt-8 opacity-20 text-[9px] tracking-[0.4em] font-bold uppercase text-center w-full">
        Purpleguy © 2026 - tablet power
      </footer>
    </div>
  );
}
