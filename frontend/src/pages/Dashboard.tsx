import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
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
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-sm text-slate-600 font-medium">Loading your dashboard...</span>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <div className="border-2 border-amber-200 bg-amber-50 p-8 rounded-lg">
          <h2 className="font-bold text-lg mb-2 text-amber-900">Unable to load dashboard</h2>
          <p className="text-sm text-amber-800 mb-6">{error || "Unable to parse server diagnostics."}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const maxCount = Math.max(...Object.values(summary.model_distribution), 1);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      {/* Welcome Banner */}
      <div className="mb-12 pb-8 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Welcome, {user?.full_name.split(" ")[0]}
            </h1>
            <p className="text-slate-600 mt-2">Your diagnostic reports and engine metrics at a glance.</p>
          </div>

          {summary.open_contact_submissions > 0 && (
            <div className="inline-flex items-center gap-3 bg-amber-50 border border-amber-200 px-5 py-3 rounded-lg text-sm text-amber-900 font-semibold">
              <span className="w-2.5 h-2.5 bg-amber-600 rounded-full animate-pulse" />
              {summary.open_contact_submissions} pending lead{summary.open_contact_submissions > 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-3">Total Diagnostics</div>
          <div className="text-4xl font-bold text-slate-900">{summary.total_reports}</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">Client Portal Runs</div>
          <div className="text-4xl font-bold text-blue-900">{summary.client_flow_reports}</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-widest mb-3">BDM Qualifications</div>
          <div className="text-4xl font-bold text-slate-900">{summary.bdm_flow_reports}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-3">Avg. Confidence</div>
          <div className="text-4xl font-bold text-green-900">{Math.round(summary.average_confidence * 100)}%</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Model Distribution */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-slate-200 p-8">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">
            Outcomes Mapped
          </h2>
          {Object.entries(summary.model_distribution).length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-slate-600">No reports recorded yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(summary.model_distribution).map(([model, count]) => {
                const percentage = (count / maxCount) * 100;
                return (
                  <div key={model}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-900 capitalize">
                        {model.replace(/_/g, " ")}
                      </span>
                      <span className="text-xs font-bold text-blue-600">{count}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Reports */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-8">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">
            Recent Diagnostics
          </h2>

          {summary.recent_reports.length === 0 ? (
            <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-lg">
              <p className="text-slate-600 mb-4">No diagnostics yet. Get started with your first assessment.</p>
              <button
                onClick={() => navigate("/bdm-qualification")}
                className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Run First Diagnostic
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-widest">
                    <th className="text-left pb-4 font-semibold">Prospect</th>
                    <th className="text-left pb-4 font-semibold">Model</th>
                    <th className="text-right pb-4 font-semibold">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {summary.recent_reports.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => openReport(r.id)}
                      className="group cursor-pointer hover:bg-slate-50 transition-colors h-16"
                    >
                      <td className="py-4 text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {r.prospect_name || "Unnamed Prospect"}
                      </td>
                      <td className="py-4">
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          {r.recommended_model}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="h-2 w-16 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="bg-blue-600 h-full"
                              style={{ width: `${Math.round(r.confidence * 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-slate-900 w-12 text-right">
                            {Math.round(r.confidence * 100)}%
                          </span>
                        </div>
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