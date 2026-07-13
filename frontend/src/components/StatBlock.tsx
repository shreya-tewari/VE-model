import React from "react";

export default function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card p-5 rounded-xl border border-line/60 flex flex-col justify-between hover:border-signal/40 transition-colors duration-200">
      <div className="readout text-[10px] uppercase text-muted tracking-wider mb-2 font-mono font-semibold">{label}</div>
      <div className="font-display text-3xl font-bold text-ink">{value}</div>
    </div>
  );
}
