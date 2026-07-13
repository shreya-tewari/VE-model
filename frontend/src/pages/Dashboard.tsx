import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import StatBlock from "../components/StatBlock";
import { useAuth } from "../context/AuthContext";

interface Summary {
  total_reports: number;
  client_flow_reports: number;
  bdm_flow_reports: number;
  average_confidence: number;
  model_distribution: Record<string, number>;
  open_contact_submissions: number;
  recent_reports: {
    id: number;
    prospect_name: string;
    recommended_model: string;
    confidence: number;
    created_at: string;
  }[];
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<Summary>("/api/dashboard/summary")
      .then(setSummary)
      .catch(() => setError("Could not load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  async function openReport(id: number) {
    const report = await api.get(`/api/reports/${id}`);
    navigate("/report", { state: { report } });
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 flex flex-col items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-signal mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="readout text-xs uppercase text-muted tracking-widest">Retrieving engine logs...</span>
      </div>
    );
  }
  
  if (error || !summary) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <div className="border-2 border-amber bg-amber-light/35 p-6 rounded-xl">
          <h2 className="font-display text-xl font-bold mb-2 text-ink">Dashboard offline</h2>
          <p className="text-sm text-muted mb-4">{error || "Unable to parse server diagnostics."}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="readout text-xs uppercase bg-ink text-paper px-4 py-2 hover:bg-signal transition-all"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // Calculate highest distribution count to normalize bar chart widths
  const maxCount = Math.max(...Object.values(summary.model_distribution), 1);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-line/60 pb-8 mb-10">
        <div>
          <h1 className="font-display text-4xl font-bold text-ink">
            Hello, {user?.full_name.split(" ")[0]}
          </h1>
          <p className="text-muted mt-2 text-sm sm:text-base">
            System qualified metrics and customer leads at a glance.
          </p>
        </div>
        
        {summary.open_contact_submissions > 0 && (
          <div className="inline-flex items-center gap-3 bg-amber-light/40 border border-amber/35 px-4 py-3 rounded-lg text-sm text-ink animate-pulse">
            <span className="w-2.5 h-2.5 bg-amber rounded-full shrink-0" />
            <span className="font-semibold">
              {summary.open_contact_submissions} pending lead{summary.open_contact_submissions > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatBlock label="Total Diagnostics" value={String(summary.total_reports)} />
        <StatBlock label="Client Portal Runs" value={String(summary.client_flow_reports)} />
        <StatBlock label="BDM Scored Runs" value={String(summary.bdm_flow_reports)} />
        <StatBlock label="Avg. Match Index" value={`${Math.round(summary.average_confidence * 100)}%`} />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Model Distribution visual panel */}
        <div className="md:col-span-1 glass-card p-6 rounded-xl border border-line/60 flex flex-col justify-between">
          <div>
            <h2 className="readout text-xs uppercase text-muted tracking-widest mb-6 font-semibold">
              Outcomes Mapped
            </h2>
            <div className="grid gap-5">
              {Object.entries(summary.model_distribution).length === 0 ? (
                <p className="text-muted text-xs font-mono py-4">No reports recorded yet.</p>
              ) : (
                Object.entries(summary.model_distribution).map(([model, count]) => {
                  const percentage = (count / maxCount) * 100;
                  return (
                    <div key={model} className="group">
                      <div className="flex items-center justify-between text-xs font-semibold mb-1 text-ink">
                        <span>{model}</span>
                        <span className="readout font-mono font-bold text-signal">{count}</span>
                      </div>
                      <div className="w-full bg-line/60 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-signal h-full rounded-full transition-all duration-500 group-hover:bg-signal-dark" 
                          style={{ width: `${percentage}%` }} 
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Recent Reports Listing table */}
        <div className="md:col-span-2 glass-card p-6 rounded-xl border border-line/60">
          <h2 className="readout text-xs uppercase text-muted tracking-widest mb-6 font-semibold">
            Recent Diagnostics
          </h2>
          
          {summary.recent_reports.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-line/60 rounded-xl bg-paper/20">
              <p className="text-muted text-sm mb-4">No qualification records exist yet.</p>
              <button 
                onClick={() => navigate("/bdm-qualification")}
                className="readout text-xs uppercase bg-ink text-paper px-4 py-2 hover:bg-signal transition-all"
              >
                Run First Qualifier
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-line text-xs font-mono text-muted uppercase">
                    <th className="pb-3 font-semibold">Prospect</th>
                    <th className="pb-3 font-semibold">Target Model</th>
                    <th className="pb-3 font-semibold text-right">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/40">
                  {summary.recent_reports.map((r) => (
                    <tr 
                      key={r.id} 
                      onClick={() => openReport(r.id)}
                      className="group cursor-pointer hover:bg-paper/40 transition-colors"
                    >
                      <td className="py-4 font-semibold text-ink group-hover:text-signal transition-colors text-sm">
                        {r.prospect_name || "Unnamed Prospect"}
                      </td>
                      <td className="py-4 text-xs font-mono text-muted uppercase">
                        {r.recommended_model}
                      </td>
                      <td className="py-4 text-right">
                        <span className="readout text-xs font-bold text-ink">
                          {Math.round(r.confidence * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
