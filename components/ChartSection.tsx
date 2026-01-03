import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell
} from 'recharts';
import { SlotEntry } from '../types';

interface ChartSectionProps {
  slots: SlotEntry[];
}

export const ChartSection: React.FC<ChartSectionProps> = ({ slots }) => {
  // Only show played slots in the chart
  const playedSlots = slots.filter(s => s.payout !== null);

  if (playedSlots.length === 0) {
    return (
      <div className="bg-brand-card border border-white/5 rounded-xl p-8 text-center text-brand-muted h-64 flex items-center justify-center">
        Spiele erst ein paar Boni, um die Statistik zu sehen.
      </div>
    );
  }

  const data = playedSlots.map((slot, index) => ({
    name: index + 1, // Or slot.name but names can be long
    fullName: slot.name,
    buyIn: slot.buyIn,
    payout: slot.payout || 0,
    profit: (slot.payout || 0) - slot.buyIn
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-brand-dark border border-white/10 p-4 rounded shadow-xl">
          <p className="font-bold text-white mb-2">{payload[0].payload.fullName}</p>
          <p className="text-sm text-brand-muted">Buy-In: <span className="text-white">{payload[0].payload.buyIn.toFixed(2)}€</span></p>
          <p className="text-sm text-brand-muted">Payout: <span className="text-white">{payload[0].payload.payout.toFixed(2)}€</span></p>
          <p className={`text-sm font-bold mt-2 ${payload[0].payload.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            Ergebnis: {payload[0].payload.profit > 0 ? '+' : ''}{payload[0].payload.profit.toFixed(2)}€
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-brand-card border border-white/5 rounded-xl p-6 mt-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-brand-purple rounded-full block"></span>
        Gewinnverlauf
      </h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#6b7280' }} />
            <YAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} unit="€" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
            <Legend />
            <ReferenceLine y={0} stroke="#ffffff30" />
            <Bar dataKey="profit" name="Gewinn/Verlust" barSize={40} radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.profit >= 0 ? '#4ade80' : '#f87171'} fillOpacity={0.8} />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};