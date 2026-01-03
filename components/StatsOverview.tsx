import React from 'react';
import { Stats } from '../types';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';

interface StatsOverviewProps {
  stats: Stats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const isProfit = stats.netResult >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Cost */}
      <div className="bg-brand-card border border-white/5 p-6 rounded-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Wallet size={48} />
        </div>
        <p className="text-brand-muted text-sm uppercase tracking-wider font-semibold">Start Balance</p>
        <h3 className="text-2xl font-bold text-white mt-1">
          {stats.totalCost.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
        </h3>
      </div>

      {/* Current Value */}
      <div className="bg-brand-card border border-white/5 p-6 rounded-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <DollarSign size={48} />
        </div>
        <p className="text-brand-muted text-sm uppercase tracking-wider font-semibold">Aktueller Gewinn</p>
        <h3 className="text-2xl font-bold text-white mt-1">
          {stats.totalPayout.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
        </h3>
        <div className="mt-2 text-xs text-brand-muted">
          {stats.playedCount} / {stats.totalCount} Boni geöffnet
        </div>
      </div>

      {/* Result */}
      <div className={`bg-brand-card border ${isProfit ? 'border-green-500/30' : 'border-red-500/30'} p-6 rounded-xl relative overflow-hidden group neon-box`}>
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
          {isProfit ? <TrendingUp size={48} /> : <TrendingDown size={48} />}
        </div>
        <p className="text-brand-muted text-sm uppercase tracking-wider font-semibold">Ergebnis</p>
        <h3 className={`text-2xl font-bold mt-1 ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
          {stats.netResult > 0 ? '+' : ''}{stats.netResult.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
        </h3>
      </div>

      {/* ROI */}
      <div className="bg-brand-card border border-white/5 p-6 rounded-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent"></div>
        <p className="text-brand-muted text-sm uppercase tracking-wider font-semibold relative z-10">RTP / ROI</p>
        <h3 className="text-2xl font-bold text-white mt-1 relative z-10">
          {isNaN(stats.roi) ? '0.00' : stats.roi.toFixed(2)}%
        </h3>
        <div className="w-full bg-gray-800 h-1 mt-3 rounded-full overflow-hidden relative z-10">
            <div 
                className={`h-full ${stats.roi >= 100 ? 'bg-green-500' : 'bg-brand-purple'}`} 
                style={{ width: `${Math.min(stats.roi, 100)}%` }}
            ></div>
        </div>
      </div>
    </div>
  );
};