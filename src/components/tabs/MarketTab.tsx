import React from 'react';
import { Send, ShieldCheck, ArrowUpCircle, Bug } from 'lucide-react';
import { motion } from 'motion';
import { SHOP_ITEMS } from '../../constants';

interface MarketTabProps {
  credits: number;
  userUid?: string;
  transferTarget: string;
  transferAmount: string;
  isTransferring: boolean;
  onTargetChange: (val: string) => void;
  onAmountChange: (val: string) => void;
  onTransfer: () => void;
  onBuyItem: (item: any) => void;
}

const MarketTab: React.FC<MarketTabProps> = ({
  credits,
  userUid,
  transferTarget,
  transferAmount,
  isTransferring,
  onTargetChange,
  onAmountChange,
  onTransfer,
  onBuyItem
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-xl italic">Supply Exchange</h2>
        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Resource Acquisition</span>
      </div>

      <div className="hardware-panel p-4 space-y-4 border-water-blue/20 glass-panel">
        <div className="flex items-center gap-2 text-water-blue">
          <Send size={16} />
          <h4 className="text-xs font-bold uppercase tracking-widest">Secure Credit Transfer</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input 
            type="text" 
            placeholder="Recipient UID"
            value={transferTarget}
            onChange={(e) => onTargetChange(e.target.value)}
            className="bg-black/60 border border-white/5 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-water-blue/50 transition-all text-white placeholder:opacity-30"
          />
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="Amount"
              value={transferAmount}
              onChange={(e) => onAmountChange(e.target.value)}
              className="flex-1 bg-black/60 border border-white/5 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-water-blue/50 transition-all text-white placeholder:opacity-30"
            />
            <button 
              onClick={onTransfer}
              disabled={isTransferring || !transferTarget || !transferAmount}
              className="bg-water-blue text-soil-dark px-4 py-2 rounded-lg text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-water-blue/10"
            >
              {isTransferring ? '...' : 'SEND'}
            </button>
          </div>
        </div>
        <div className="p-2 bg-black/40 rounded border border-white/5">
          <p className="text-[9px] text-text-secondary leading-relaxed">
            <ShieldCheck size={10} className="inline mr-1 opacity-50" />
            TRANSFERS ARE PERMANENT. YOUR ID: <span className="text-water-blue font-mono select-all opacity-80">{userUid}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {SHOP_ITEMS.map(item => (
          <button 
            key={item.id}
            onClick={() => onBuyItem(item)}
            className="hardware-panel p-4 flex items-center gap-4 hover:border-mineral-gold/40 transition-all group glass-panel"
          >
            <div className="w-12 h-12 rounded-lg bg-mineral-gold/10 flex items-center justify-center text-mineral-gold group-hover:scale-110 transition-transform">
              {item.type === 'fertilizer' ? <ArrowUpCircle size={24} /> : <Bug size={24} />}
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-bold text-sm tracking-tight">{item.name}</h4>
              <p className="text-[10px] text-text-secondary opacity-80">
                {item.type === 'fertilizer' ? `+${item.nut}% Nutrients` : `Kills ${item.kills} Pests`}
                {item.stress !== 0 && `, ${item.stress > 0 ? '+' : ''}${item.stress} Stress`}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-mineral-gold">{item.cost} 🪙</span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default MarketTab;
