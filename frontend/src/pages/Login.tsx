import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "../api/client";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not log in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md glass-card p-8 rounded-2xl border border-line/60 shadow-xl relative overflow-hidden">
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-ink" />

        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-ink">Welcome back</h1>
          <p className="text-sm text-muted mt-1.5">Sign in to access BDM qualification reports.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <label className="grid gap-1.5">
            <span className="readout text-[10px] uppercase text-muted tracking-wider font-semibold">Email Address</span>
            <input
              type="email"
              required
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="premium-input rounded-lg"
            />
          </label>
          
          <label className="grid gap-1.5">
            <span className="readout text-[10px] uppercase text-muted tracking-wider font-semibold">Password</span>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="premium-input rounded-lg"
            />
          </label>

          {error && (
            <div className="border border-amber/30 bg-amber-light/30 text-amber text-xs px-4 py-3 rounded-lg flex items-center gap-2 font-semibold">
              <span className="font-bold">!</span>
              {error}
            </div>
          )}

          <button
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 readout text-xs uppercase font-bold bg-ink text-paper py-3.5 mt-2 disabled:opacity-50 hover:bg-signal transition-all duration-300 shadow-sm rounded-lg"
          >
            {submitting ? (
              <span className="flex items-center gap-1.5">
                <svg className="animate-spin h-4 w-4 text-paper" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Authenticating...
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-muted">
          Need qualification access?{" "}
          <Link to="/register" className="text-signal font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
