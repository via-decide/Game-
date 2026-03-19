import React from 'react';
import { AlertCircle, Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  logs: { msg: string; type: string }[];
}

const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-text-secondary">
        <TerminalIcon size={14} />
        <span className="text-[10px] font-bold uppercase tracking-widest">System Console</span>
      </div>
      <div className="hardware-panel p-4 h-64 md:h-[400px] overflow-y-auto font-mono text-[10px] space-y-2 bg-black/60 border-white/5">
        {logs.length === 0 && (
          <div className="text-text-secondary opacity-30 animate-pulse">Waiting for telemetry data...</div>
        )}
        {logs.map((log, i) => (
          <div key={i} className={`flex gap-2 ${
            log.type === 'success' ? 'text-leaf-green' : 
            log.type === 'danger' ? 'text-burn-red font-bold' : 
            log.type === 'system' ? 'text-text-secondary' : 'text-text-primary'
          }`}>
            <span className="opacity-20 flex-shrink-0">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
            <span className="break-words">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
