import React, { useState } from "react";
import { api, ApiError } from "../api/client";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.post("/api/contact", form);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not send your message.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-md glass-card p-8 rounded-2xl border border-line/60 shadow-xl text-center">
          <div className="mb-6 inline-flex p-4 bg-signal-light/40 rounded-full border border-signal/20">
            <svg className="w-8 h-8 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-ink mb-3">Message sent</h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Thank you for reaching out. A Business Development Manager will review your project parameters and respond shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md glass-card p-8 rounded-2xl border border-line/60 shadow-xl relative overflow-hidden">
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-signal" />

        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-ink">Get in touch</h1>
          <p className="text-sm text-muted mt-1.5">Schedule a diagnostic walkthrough validation with a BDM.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <label className="grid gap-1.5">
            <span className="readout text-[10px] uppercase text-muted tracking-wider font-semibold">Name</span>
            <input
              required
              placeholder="Sarah Connor"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="premium-input rounded-lg"
            />
          </label>
          
          <label className="grid gap-1.5">
            <span className="readout text-[10px] uppercase text-muted tracking-wider font-semibold">Email</span>
            <input
              type="email"
              required
              placeholder="sarah@domain.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="premium-input rounded-lg"
            />
          </label>
          
          <label className="grid gap-1.5">
            <span className="readout text-[10px] uppercase text-muted tracking-wider font-semibold">Company (optional)</span>
            <input
              placeholder="Acme Systems"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="premium-input rounded-lg"
            />
          </label>
          
          <label className="grid gap-1.5">
            <span className="readout text-[10px] uppercase text-muted tracking-wider font-semibold">Message</span>
            <textarea
              required
              rows={4}
              placeholder="Tell us a bit about your mobile project concept..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="premium-input rounded-lg resize-none"
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
                Sending...
              </span>
            ) : (
              "Send message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
