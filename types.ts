export interface SlotEntry {
  id: string;
  name: string;
  buyIn: number;
  payout: number | null; // null represents not played/opened yet
  multiplier?: number;
}

export interface Stats {
  totalCost: number;
  totalPayout: number;
  netResult: number;
  roi: number;
  playedCount: number;
  totalCount: number;
}
