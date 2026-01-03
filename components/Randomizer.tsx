import React, { useState, useEffect } from 'react';
import { SlotEntry } from '../types';
import { X, Dices, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

interface RandomizerProps {
  slots: SlotEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export const Randomizer: React.FC<RandomizerProps> = ({ slots, isOpen, onClose }) => {
  const [currentSlot, setCurrentSlot] = useState<string>('???');
  const [winner, setWinner] = useState<SlotEntry | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // Filter only unplayed slots
  const playableSlots = slots.filter(s => s.payout === null);

  useEffect(() => {
    if (isOpen && playableSlots.length > 0) {
      startSpin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const startSpin = () => {
    setIsSpinning(true);
    setWinner(null);
    let counter = 0;
    const maxSpins = 30; // How many ticks before stop
    const speed = 100; // ms

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * playableSlots.length);
      setCurrentSlot(playableSlots[randomIndex].name);
      counter++;

      if (counter >= maxSpins) {
        clearInterval(interval);
        finalizeSpin();
      }
    }, speed);
  };

  const finalizeSpin = () => {
    const finalIndex = Math.floor(Math.random() * playableSlots.length);
    const winningSlot = playableSlots[finalIndex];
    setCurrentSlot(winningSlot.name);
    setWinner(winningSlot);
    setIsSpinning(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0f0f16] border border-brand-purple/50 w-full max-w-lg rounded-2xl p-8 relative shadow-[0_0_50px_rgba(139,92,246,0.3)] text-center">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-muted hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
            <div className="inline-block p-4 rounded-full bg-brand-purple/10 mb-4">
                <Dices size={48} className="text-brand-purple animate-pulse" />
            </div>
            <h2 className="text-2xl font-black font-display italic text-white mb-2">
                NÄCHSTER SLOT
            </h2>
            <p className="text-brand-muted">Der Zufallsgenerator entscheidet...</p>
        </div>

        {playableSlots.length === 0 ? (
            <div className="text-red-400 font-bold py-8">
                Keine offenen Boni mehr verfügbar!
            </div>
        ) : (
            <div className="py-10 my-6 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden">
                {winner && (
                    <div className="absolute inset-0 bg-brand-purple/10 flex items-center justify-center">
                        <Sparkles className="text-yellow-400 absolute top-2 right-2 animate-spin-slow" />
                        <Sparkles className="text-yellow-400 absolute bottom-2 left-2 animate-spin-slow" />
                    </div>
                )}
                <h3 className={`text-3xl md:text-4xl font-black tracking-tight transition-all duration-100 ${winner ? 'text-brand-purple scale-110 neon-text' : 'text-white'}`}>
                    {currentSlot}
                </h3>
            </div>
        )}

        <div className="flex justify-center gap-4">
            <Button variant="secondary" onClick={onClose}>
                Schließen
            </Button>
            {playableSlots.length > 0 && !isSpinning && (
                <Button onClick={startSpin}>
                    Neu auslosen
                </Button>
            )}
        </div>
      </div>
    </div>
  );
};