import React, { useEffect, useState } from 'react';
import { Trophy, User, Medal } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

interface LeaderboardEntry {
  uid: string;
  displayName: string;
  credits: number;
  meritScore: number;
}

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(collection(db, 'users'), orderBy('meritScore', 'desc'), limit(10));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data()
        })) as unknown as LeaderboardEntry[];
        setEntries(data);
      } catch (e) {
        console.error("Error fetching leaderboard:", e);
        // Fallback to credits if meritScore query fails or isn't indexed yet
        const qFallback = query(collection(db, 'users'), orderBy('credits', 'desc'), limit(10));
        const snapshotFallback = await getDocs(qFallback);
        const dataFallback = snapshotFallback.docs.map(doc => ({
          uid: doc.id,
          ...doc.data()
        })) as unknown as LeaderboardEntry[];
        setEntries(dataFallback);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Medal className="text-water-blue" size={20} />
        <h2 className="font-serif text-xl italic uppercase tracking-wider">Apex Pathfinders</h2>
      </div>
      
      <div className="hardware-panel glass-panel border-white/5 divide-y divide-white/5">
        {loading ? (
          <div className="p-8 text-center text-[10px] uppercase font-bold tracking-widest text-text-secondary animate-pulse">
            Synchronizing Global Data...
          </div>
        ) : (
          entries.map((entry, i) => (
            <div key={entry.uid} className={`flex items-center justify-between p-4 transition-all hover:bg-white/5 ${i === 0 ? 'bg-mineral-gold/5' : ''}`}>
              <div className="flex items-center gap-4">
                <span className={`w-6 text-center font-mono text-xs ${i === 0 ? 'text-mineral-gold font-bold' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-amber-600' : 'text-text-secondary'}`}>
                  {i + 1}
                </span>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-mineral-gold text-soil-dark' : 'bg-white/5 text-text-secondary'}`}>
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-tight">{entry.displayName || 'Anonymous'}</p>
                    <p className="text-[9px] font-mono text-text-secondary italic">Merit Score: {entry.meritScore || 0}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-bold text-leaf-green">{entry.credits} 🪙</p>
                <p className="text-[9px] text-text-secondary uppercase tracking-widest">CREDITS</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
