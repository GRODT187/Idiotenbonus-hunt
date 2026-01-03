import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { SlotTable } from './components/SlotTable';
import { ChartSection } from './components/ChartSection';
import { Randomizer } from './components/Randomizer';
import { Button } from './components/ui/Button';
import { SlotEntry, Stats } from './types';
import { Plus, Shuffle, RotateCcw } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; // Need to mock or implement UUID manually since we can't use node modules easily in this strict output but I'll use a simple generator function.

// Simple ID generator to avoid external dependencies for this specific file request
const generateId = () => Math.random().toString(36).substr(2, 9);

export default function App() {
  const [slots, setSlots] = useState<SlotEntry[]>([
    // Initial example data
    { id: '1', name: 'Gates of Olympus', buyIn: 200, payout: 150, multiplier: 0.75 },
    { id: '2', name: 'Sweet Bonanza', buyIn: 200, payout: 450, multiplier: 2.25 },
    { id: '3', name: 'Wanted Dead or a Wild', buyIn: 400, payout: null },
  ]);

  const [newSlotName, setNewSlotName] = useState('');
  const [newSlotPrice, setNewSlotPrice] = useState('');
  const [isRandomizerOpen, setRandomizerOpen] = useState(false);

  // Derived Statistics
  const stats: Stats = useMemo(() => {
    let totalCost = 0;
    let totalPayout = 0;
    let playedCount = 0;

    slots.forEach(slot => {
      totalCost += slot.buyIn;
      if (slot.payout !== null) {
        totalPayout += slot.payout;
        playedCount++;
      }
    });

    const netResult = totalPayout - (slots.filter(s => s.payout !== null).reduce((acc, curr) => acc + curr.buyIn, 0));
    // ROI calculation based only on played games to be accurate
    const costOfPlayed = slots.filter(s => s.payout !== null).reduce((acc, curr) => acc + curr.buyIn, 0);
    const roi = costOfPlayed > 0 ? (totalPayout / costOfPlayed) * 100 : 0;

    return {
      totalCost,
      totalPayout,
      netResult,
      roi,
      playedCount,
      totalCount: slots.length
    };
  }, [slots]);

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotName || !newSlotPrice) return;

    const newSlot: SlotEntry = {
      id: generateId(),
      name: newSlotName,
      buyIn: parseFloat(newSlotPrice),
      payout: null
    };

    setSlots([...slots, newSlot]);
    setNewSlotName('');
    setNewSlotPrice('');
  };

  const handleUpdatePayout = (id: string, value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    setSlots(slots.map(slot => {
      if (slot.id === id) {
        return { ...slot, payout: numValue };
      }
      return slot;
    }));
  };

  const handleDelete = (id: string) => {
    setSlots(slots.filter(s => s.id !== id));
  };

  const handleReset = () => {
    if (window.confirm("Bist du sicher? Alle Daten werden gelöscht.")) {
      setSlots([]);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-purple selection:text-white pb-20">
      <Header />

      <main className="container mx-auto px-4 md:px-8 py-8 max-w-7xl">
        
        {/* Hero / Intro */}
        <div className="text-center mb-12 animate-fade-in-down">
            <h2 className="text-5xl md:text-6xl font-black font-display italic mb-4">
                DIE #1 FÜR <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-indigo-400">BONUS HUNTS</span>
            </h2>
            <p className="text-xl text-brand-muted max-w-2xl mx-auto">
                Tracke deine Bonus Buys, analysiere den Profit und lass den Zufall entscheiden. 
                Exklusiv für echte Idioten.
            </p>
        </div>

        <StatsOverview stats={stats} />

        {/* Input Area */}
        <div className="bg-[#0f0f16] border border-brand-purple/20 p-6 rounded-2xl shadow-xl mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                    <label className="block text-xs font-bold uppercase text-brand-muted mb-2 ml-1">Slot Name</label>
                    <input 
                        type="text" 
                        value={newSlotName}
                        onChange={(e) => setNewSlotName(e.target.value)}
                        placeholder="z.B. Wanted Dead or a Wild" 
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                    />
                </div>
                <div className="w-full md:w-48">
                    <label className="block text-xs font-bold uppercase text-brand-muted mb-2 ml-1">Preis (€)</label>
                    <input 
                        type="number" 
                        value={newSlotPrice}
                        onChange={(e) => setNewSlotPrice(e.target.value)}
                        placeholder="200" 
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none transition-all"
                    />
                </div>
                <Button 
                    onClick={handleAddSlot} 
                    disabled={!newSlotName || !newSlotPrice}
                    className="h-[50px] w-full md:w-auto min-w-[120px]"
                >
                    <Plus size={20} /> Hinzufügen
                </Button>
            </div>
        </div>

        {/* Controls Toolbar */}
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold font-display italic">DEINE LISTE</h3>
            <div className="flex gap-2">
                <Button variant="secondary" onClick={handleReset} className="text-xs">
                    <RotateCcw size={14} /> Reset
                </Button>
                <Button onClick={() => setRandomizerOpen(true)} className="neon-box animate-pulse-slow">
                    <Shuffle size={18} /> Nächster Slot
                </Button>
            </div>
        </div>

        <SlotTable 
            slots={slots} 
            onUpdatePayout={handleUpdatePayout} 
            onDelete={handleDelete}
            onMarkPlayed={() => {}} 
        />

        <ChartSection slots={slots} />

      </main>

      <Randomizer 
        slots={slots} 
        isOpen={isRandomizerOpen} 
        onClose={() => setRandomizerOpen(false)} 
      />

      <footer className="text-center text-brand-muted text-sm py-8 border-t border-white/5 mt-12">
        <p>© {new Date().getFullYear()} IDIOTENBONUS. Spielt verantwortungsbewusst. 18+</p>
      </footer>
    </div>
  );
}