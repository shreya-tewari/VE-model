import React from "react";
import { Link } from "react-router-dom";

const outcomeDetails = [
  {
    title: "Staff Augmentation",
    desc: "Plugging specialized developers directly into your existing engineering processes and management structures.",
    icon: (
      <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Agency Model",
    desc: "End-to-end design, development, and delivery. Ideal for when you want high polish without managing the daily build.",
    icon: (
      <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: "Project Outsourcing",
    desc: "Fixed-scope, milestone-driven delivery of a complete product or modular feature set built to explicit specifications.",
    icon: (
      <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  {
    title: "Process Outsourcing",
    desc: "Outsourcing a recurring business function (like QA testing, DevOps maintenance, or customer support operations).",
    icon: (
      <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.2" />
      </svg>
    )
  },
  {
    title: "Discovery Phase",
    desc: "A brief, structured consulting sprint to define the solution, architecture, interactive prototypes, and roadmap.",
    icon: (
      <svg className="w-5 h-5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  }
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      {/* Hero Badge & Header */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-signal/20 bg-signal-light/40 text-signal text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-signal" />
          Enterprise Diagnostic Engine
        </div>
        <h1 className="font-display text-4xl sm:text-6xl text-ink leading-tight tracking-tight">
          Find the right mobile app development model.
        </h1>
        <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
          Answer a few strategic questions and instantly map your mobile project to the ideal engagement structure: Staff Augmentation, Agency, Project Outsourcing, Process Outsourcing, or Discovery.
        </p>

        {/* Feature Highlights */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs uppercase tracking-wider text-muted/80 font-mono">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            No black-box scoring
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Saved to Dashboard
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Export-ready Brief
          </span>
        </div>
      </div>

      {/* Diagnostic Entry Points Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-24">
        {/* Client Walkthrough */}
        <div className="glass-card interactive-card p-8 sm:p-10 rounded-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-signal/5 rounded-bl-full pointer-events-none transition-all duration-300 group-hover:scale-110" />
          
          <div>
            <div className="readout text-xs uppercase text-signal font-semibold mb-4 tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal" />
              Client-Facing Flow
            </div>
            <h2 className="font-display text-3xl text-ink mb-4 font-semibold">
              Client Walkthrough
            </h2>
            <p className="text-muted leading-relaxed text-sm sm:text-base">
              A clear, plain-language path. A short guided walkthrough that points to the engagement model that fits your operational goals—perfect for client self-service or live qualification calls.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-line/40">
            <Link
              to="/client-walkthrough"
              className="inline-flex items-center gap-2 readout text-xs uppercase font-bold bg-ink text-paper px-6 py-3.5 hover:bg-signal transition-all duration-300 shadow-sm"
            >
              Start client walkthrough
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* BDM Qualification */}
        <div className="glass-card interactive-card p-8 sm:p-10 rounded-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber/5 rounded-bl-full pointer-events-none transition-all duration-300 group-hover:scale-110" />

          <div>
            <div className="readout text-xs uppercase text-amber font-semibold mb-4 tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber" />
              BDM Qualifier
            </div>
            <h2 className="font-display text-3xl text-ink mb-4 font-semibold">
              BDM Qualification
            </h2>
            <p className="text-muted leading-relaxed text-sm sm:text-base">
              Deep-dive technical assessment. Evaluates platforms, complexity, integrations, compliance parameters, and modules to generate detailed effort estimates, red flags, and handover briefs.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-line/40">
            <Link
              to="/bdm-qualification"
              className="inline-flex items-center gap-2 readout text-xs uppercase font-bold bg-ink text-paper px-6 py-3.5 hover:bg-amber transition-all duration-300 shadow-sm"
            >
              Start BDM qualification
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Five Outcomes Explanation Section */}
      <div className="border-t border-line/60 pt-16">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 gap-2">
          <div className="readout text-xs uppercase font-semibold text-muted tracking-widest">
            Mapped Outcomes
          </div>
          <div className="text-sm text-muted">
            Our engine classifies matches across 5 distinct operational frameworks.
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {outcomeDetails.map((outcome) => (
            <div 
              key={outcome.title} 
              className="glass-card p-6 rounded-lg hover:border-signal/40 transition-all duration-300 group"
            >
              <div className="mb-4 p-2 bg-paper border border-line/60 rounded-md w-fit group-hover:bg-signal-light/40 group-hover:border-signal/20 transition-colors">
                {outcome.icon}
              </div>
              <h3 className="font-display font-bold text-base text-ink mb-2">
                {outcome.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {outcome.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
