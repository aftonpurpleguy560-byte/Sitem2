import React from 'react';

export default function DinoRunnerEmbed() {
  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full h-full max-w-7xl">
        <iframe
          src="https://jworse.com/tr/embed/games/dino-runner?scroll=false"
          className="w-full h-full rounded-xl shadow-2xl"
          frameBorder="0"
          allowFullScreen
          title="Dino Runner Game"
        />
      </div>
    </div>
  );
}
