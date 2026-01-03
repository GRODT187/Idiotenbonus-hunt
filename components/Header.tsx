import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex flex-col items-center justify-center border-b border-white/5 bg-brand-dark/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <h1 className="font-display italic font-black text-3xl tracking-tighter text-white">
          IDIOTEN<span className="text-brand-purple neon-text">BONUS</span> HUNT
        </h1>
      </div>
    </header>
  );
};