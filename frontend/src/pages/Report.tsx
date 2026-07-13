import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StatBlock from "../components/StatBlock";

interface ReportShape {
  id: number;
  flow: string;
  prospect_name: string;
  recommended_model: string;
  package_fit: string;
  confidence: number;
  effort_low_weeks: number;
  effort_high_weeks: number;
  red_flags: string[];
  responsibilities: { client_owns: string[]; vendor_owns: string[] };
  summary: string;
  created_at: string;
}

export default function Report() {
  const location = useLocation();
  const navigate = useNavigate();
  const report = (location.state as { report?: ReportShape } | null)?.report;

  if (!report) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="mb-6 inline-flex p-4 bg-line/30 rounded-full">
          <svg className="w-8 h-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="font-display text-3xl mb-4 font-semibold text-ink">No report loaded</h1>
        <p className="text-muted mb-8 max-w-md mx-auto">
          Please run a walkthrough first, or select a saved report from your dashboard.
        </p>
        <Link 
          to="/dashboard" 
          className="inline-flex items-center gap-2 readout text-xs uppercase font-bold bg-ink text-paper px-6 py-3 hover:bg-signal transition-all"
        >
          Go to dashboard
        </Link>
      </div>
    );
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
      {/* Report Header Card */}
      <div className="border border-ink bg-ink text-paper p-6 sm:p-8 rounded-xl shadow-lg relative overflow-hidden mb-10 print:border-line print:text-ink print:bg-transparent print:shadow-none">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-paper/20 pb-4 mb-6 print:border-line/40">
          <div className="readout text-xs uppercase tracking-widest text-signal-light/80 print:text-muted">
            {report.flow === "bdm" ? "BDM Qualification Assessment" : "Client Walkthrough Profile"}
          </div>
          <div className="readout text-xs text-paper/60 print:text-muted">
            {new Date(report.created_at).toLocaleString()}
          </div>
        </div>

        <div>
          <span className="readout text-[11px] uppercase bg-signal text-paper px-2 py-0.5 rounded mr-2 inline-block mb-3 tracking-widest">
            RECOMMENDED MODEL
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-paper print:text-ink">
            {report.recommended_model}
          </h1>
          <p className="mt-3 text-paper/85 text-base sm:text-lg max-w-2xl print:text-muted">
            Prepared diagnostic for <span className="font-semibold text-paper underline decoration-signal print:text-ink">{report.prospect_name || "Unnamed Prospect"}</span>.
          </p>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="glass-card p-6 sm:p-8 rounded-xl border border-line/60 mb-10">
        <h2 className="readout text-xs uppercase text-muted tracking-widest mb-3 font-semibold">
          Executive Qualification Brief
        </h2>
        <p className="text-ink text-base sm:text-lg leading-relaxed font-medium">
          {report.summary}
        </p>
      </div>

      {/* Score Grid Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="glass-card p-5 rounded-lg border border-line/60 flex flex-col justify-between">
          <span className="readout text-[10px] uppercase text-muted tracking-wider">Package Fit</span>
          <span className="font-display text-2xl font-bold text-ink mt-2">{report.package_fit}</span>
        </div>
        <div className="glass-card p-5 rounded-lg border border-line/60 flex flex-col justify-between">
          <span className="readout text-[10px] uppercase text-muted tracking-wider">Confidence</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-ink">{Math.round(report.confidence * 100)}%</span>
            <div className="w-full bg-line h-1.5 rounded-full overflow-hidden shrink-0 max-w-[60px]">
              <div 
                className="bg-signal h-full" 
                style={{ width: `${Math.round(report.confidence * 100)}%` }} 
              />
            </div>
          </div>
        </div>
        <div className="glass-card p-5 rounded-lg border border-line/60 flex flex-col justify-between">
          <span className="readout text-[10px] uppercase text-muted tracking-wider">Effort Range</span>
          <span className="font-display text-2xl font-bold text-signal mt-2">
            {report.effort_low_weeks}–{report.effort_high_weeks} <span className="text-xs uppercase text-muted">wks</span>
          </span>
        </div>
        <div className="glass-card p-5 rounded-lg border border-line/60 flex flex-col justify-between">
          <span className="readout text-[10px] uppercase text-muted tracking-wider">Diagnostic Flow</span>
          <span className="font-display text-2xl font-bold text-ink mt-2">
            {report.flow === "bdm" ? "Internal BDM" : "Client Portal"}
          </span>
        </div>
      </div>

      {/* Responsibility Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Client Owns */}
        <div className="glass-card p-6 sm:p-8 rounded-xl border border-line/60">
          <h3 className="readout text-xs uppercase text-signal font-bold tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-signal rounded-full" />
            Client Responsibilities
          </h3>
          <ul className="grid gap-3">
            {report.responsibilities.client_owns.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink leading-relaxed">
                <svg className="w-4 h-4 text-signal shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vendor Owns */}
        <div className="glass-card p-6 sm:p-8 rounded-xl border border-line/60">
          <h3 className="readout text-xs uppercase text-amber font-bold tracking-widest mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber rounded-full" />
            Vendor Responsibilities
          </h3>
          <ul className="grid gap-3">
            {report.responsibilities.vendor_owns.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-ink leading-relaxed">
                <svg className="w-4 h-4 text-amber shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Red Flags / Risk Factors */}
      {report.red_flags.length > 0 && (
        <div className="glass-card p-6 sm:p-8 rounded-xl border border-amber/30 bg-amber-light/10 mb-10">
          <h3 className="readout text-xs uppercase text-amber font-bold tracking-widest mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Risk Flags & Mitigations
          </h3>
          <ul className="grid gap-3">
            {report.red_flags.map((flag) => (
              <li key={flag} className="text-sm bg-paper/60 border border-line/60 rounded-lg px-4 py-3 flex items-start gap-2.5 leading-relaxed">
                <span className="font-semibold text-amber shrink-0">!</span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 readout text-xs uppercase font-bold border-2 border-ink px-6 py-3.5 hover:bg-ink hover:text-paper transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print / Export PDF
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 readout text-xs uppercase font-bold bg-ink text-paper px-6 py-3.5 hover:bg-signal transition-all duration-300 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Dashboard View
        </button>
      </div>
    </div>
  );
}
