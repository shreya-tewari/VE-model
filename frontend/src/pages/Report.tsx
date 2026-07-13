import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="mb-6 inline-flex p-4 bg-slate-100 rounded-full">
          <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">No report loaded</h1>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Please run a diagnostic walkthrough first, or select a saved report from your dashboard.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
      {/* Hero Report Header */}
      <div className="mb-12 pb-8 border-b border-slate-200">
        <div className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {report.flow === "bdm" ? "BDM Assessment" : "Client Walkthrough"}
            </span>
            <span className="text-xs text-slate-500">
              {new Date(report.created_at).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900">
            {report.recommended_model}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Diagnostic assessment for <span className="font-semibold text-slate-900">{report.prospect_name || "Unnamed Prospect"}</span>
          </p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-2">Package Fit</div>
          <div className="text-3xl font-bold text-slate-900">{report.package_fit}</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-2">Confidence</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-blue-900">{Math.round(report.confidence * 100)}%</span>
            <div className="w-full bg-blue-200 h-2 rounded-full overflow-hidden max-w-[80px]">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: `${Math.round(report.confidence * 100)}%` }} />
            </div>
          </div>
        </div>
        <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-2">Effort</div>
          <div className="text-3xl font-bold text-slate-900">
            {report.effort_low_weeks}–{report.effort_high_weeks}
            <span className="text-sm text-slate-600 ml-1">wks</span>
          </div>
        </div>
        <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-2">Flow</div>
          <div className="text-lg font-semibold text-slate-900">
            {report.flow === "bdm" ? "Internal" : "Client"}
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <section className="mb-12 bg-blue-50 rounded-lg p-8 border border-blue-200">
        <h2 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-4">
          Executive Summary
        </h2>
        <p className="text-lg text-slate-800 leading-relaxed">
          {report.summary}
        </p>
      </section>

      {/* Responsibilities Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Client Owns */}
        <section>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
            Client Responsibilities
          </h3>
          <ul className="space-y-3">
            {report.responsibilities.client_owns.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-base text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Vendor Owns */}
        <section>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-600 rounded-full" />
            Vendor Responsibilities
          </h3>
          <ul className="space-y-3">
            {report.responsibilities.vendor_owns.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-base text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Red Flags / Risk Factors */}
      {report.red_flags.length > 0 && (
        <section className="mb-12 bg-amber-50 rounded-lg p-8 border border-amber-200">
          <h3 className="text-sm font-bold text-amber-900 uppercase tracking-widest mb-5 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Risk Factors & Mitigations
          </h3>
          <ul className="space-y-3">
            {report.red_flags.map((flag, idx) => (
              <li key={idx} className="text-sm text-amber-900 leading-relaxed flex items-start gap-3">
                <span className="font-bold text-amber-600 shrink-0">!</span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 print:hidden pt-8 border-t border-slate-200">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-900 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print / Export PDF
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}