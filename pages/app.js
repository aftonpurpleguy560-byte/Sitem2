import { useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Service Worker Kaydı - PWA desteği için
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(
          function(registration) {
            console.log('Moradam PWA: Aktif (Kapsam: ', registration.scope, ')');
          },
          function(err) {
            console.log('Moradam PWA Hatası: ', err);
          }
        );
      });
    }
  }, []);

  return (
    <>
      <Head>
        {/* Başlık ve Meta Ayarları */}
        <title>Moradam Oyun Portalı</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" />
        <meta name="description" content="Purpleguy tarafından hazırlanan dev oyun portalı. 28+ eğlenceli oyun!" />
        
        {/* PWA / Mobil Uygulama Gereksinimleri */}
        <meta name="application-name" content="Moradam" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Moradam" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* İstediğin Tam Siyah Arka Plan İçin Tema Rengi */}
        <meta name="theme-color" content="#000000" />
        
        {/* İkonlar ve Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Uygulama İçeriği */}
      <Component {...pageProps} />
      
      {/* Global CSS Dokunuşları */}
      <style jsx global>{`
        * {
          -webkit-tap-highlight-color: transparent; /* Mobilde tıklayınca çıkan mavi kutuyu siler */
        }
        html, body {
          margin: 0;
          padding: 0;
          background-color: #000000; /* Tam siyah arka plan */
          color: white;
          overscroll-behavior-y: contain; /* Sayfayı aşağı çekince yenilenmesini engeller (Oyunlar için kritik) */
          font-family: 'Inter', sans-serif; /* Daha modern bir font */
        }
        /* Scrollbar'ı daha şık ve ince yapalım */
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: #000000;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
      `}</style>
    </> 
  );
}

export default MyApp;
