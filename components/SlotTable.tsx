import React from 'react';
import { SlotEntry } from '../types';
import { Trash2, Trophy, PlayCircle } from 'lucide-react';

interface SlotTableProps {
  slots: SlotEntry[];
  onUpdatePayout: (id: string, value: string) => void;
  onDelete: (id: string) => void;
  onMarkPlayed: (id: string) => void;
}

export const SlotTable: React.FC<SlotTableProps> = ({ slots, onUpdatePayout, onDelete, onMarkPlayed }) => {
  return (
    <div className="w-full bg-brand-card border border-white/5 rounded-xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-brand-muted">
              <th className="p-4 font-semibold">#</th>
              <th className="p-4 font-semibold">Slot Name</th>
              <th className="p-4 font-semibold text-right">Kosten (Buy-In)</th>
              <th className="p-4 font-semibold text-right">Gewinn (Payout)</th>
              <th className="p-4 font-semibold text-right">Ergebnis</th>
              <th className="p-4 font-semibold text-right">Multiplikator</th>
              <th className="p-4 font-semibold text-center">Aktion</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {slots.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-12 text-center text-brand-muted italic">
                  Noch keine Boni eingetragen. Füge oben ein Spiel hinzu!
                </td>
              </tr>
            ) : (
              slots.map((slot, index) => {
                const isPlayed = slot.payout !== null;
                const result = isPlayed ? (slot.payout! - slot.buyIn) : 0;
                const isWin = result >= 0;
                const multiplier = isPlayed ? (slot.payout! / slot.buyIn).toFixed(2) : '-';

                return (
                  <tr 
                    key={slot.id} 
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="p-4 text-brand-muted font-mono">{index + 1}</td>
                    <td className="p-4 font-bold text-white flex items-center gap-3">
                        {isPlayed && (slot.payout! > slot.buyIn) && <Trophy size={14} className="text-yellow-400" />}
                        {slot.name}
                    </td>
                    <td className="p-4 text-right text-brand-muted">
                      {slot.buyIn.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                    </td>
                    <td className="p-4 text-right">
                      <input
                        type="number"
                        placeholder="0.00"
                        className={`bg-black/30 border border-white/10 rounded px-3 py-2 text-right w-32 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all ${isPlayed ? 'text-white font-bold' : 'text-gray-500'}`}
                        value={slot.payout === null ? '' : slot.payout}
                        onChange={(e) => onUpdatePayout(slot.id, e.target.value)}
                      />
                    </td>
                    <td className={`p-4 text-right font-bold ${!isPlayed ? 'text-gray-700' : isWin ? 'text-green-400' : 'text-red-400'}`}>
                      {isPlayed ? result.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) : '-'}
                    </td>
                    <td className="p-4 text-right font-mono text-brand-muted">
                      {multiplier}x
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => onDelete(slot.id)}
                        className="text-gray-600 hover:text-red-500 transition-colors p-2"
                        title="Löschen"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};