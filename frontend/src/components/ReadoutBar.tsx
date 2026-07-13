import React from "react";

/**
 * The tool's signature element: a monospace "diagnostic readout" strip.
 * Shown at the top of each quiz step and, expanded, on the report page.
 */
export default function ReadoutBar({
  step,
  totalSteps,
  label,
}: {
  step: number;
  totalSteps: number;
  label: string;
}) {
  const pct = Math.round((step / totalSteps) * 100);
  return (
    <div className="border border-ink">
      <div className="flex items-center justify-between px-4 py-2 readout text-xs uppercase">
        <span>{label}</span>
        <span>
          Step {step.toString().padStart(2, "0")} / {totalSteps.toString().padStart(2, "0")}
        </span>
      </div>
      <div className="h-1 bg-line">
        <div className="h-1 bg-signal transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
