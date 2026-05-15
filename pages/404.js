import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
  // Hata bildirim linki
  const reportLink = "mailto:aftonpurpleguy560@gmail.com?subject=Moradam Hata Bildirimi (404)&body=Merhaba, bir sayfaya ulaşamadım. Hata detayı: "; 

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <Head>
        <title>404 - Sayfa Bulunamadı | Moradam</title>
      </Head>

      {/* Arka Plan Neon Efekti */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl">
        {/* Hata İkonu */}
        <div className="text-8xl mb-4 animate-pulse select-none">🚫</div>
        
        <h1 className="text-8xl md:text-[12rem] font-black italic tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-800">
          404
        </h1>
        
        <h2 className="text-xl md:text-2xl font-black uppercase mt-4 tracking-[0.3em] text-red-600 italic">
          OYUN SEVİYESİ KAYIP!
        </h2>
        
        <p className="mt-8 text-neutral-500 font-bold uppercase text-[10px] tracking-widest max-w-sm mx-auto leading-relaxed">
          Aradığın sayfa portalın karanlık dehlizlerinde kaybolmuş olabilir.
        </p>

        <div className="mt-16 flex flex-col items-center gap-6">
          <Link href="/">
            <button className="px-12 py-5 bg-white text-black rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-2xl active:scale-95 w-64">
              🏠 ANA SAYFAYA DÖN
            </button>
          </Link>

          <a 
            href={reportLink}
            className="px-12 py-5 bg-neutral-900 border border-red-900/50 text-red-500 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl flex items-center justify-center gap-2 w-64"
          >
            ⚠️ HATA BİLDİR (GMAIL)
          </a>
        </div>
      </div>

      {/* Alt İmza */}
      <footer className="absolute bottom-10 opacity-20 text-[9px] tracking-[0.4em] font-bold uppercase">
        Purpleguy © 2026 - tablet power
      </footer>
    </div>
  );
}
