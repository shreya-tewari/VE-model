import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReadoutBar from "./ReadoutBar";
import { Question } from "../data/quizData";
import { api, ApiError } from "../api/client";

interface Props {
  flow: "client" | "bdm";
  label: string;
  questions: Question[];
}

type AnswerValue = string | number | string[];

export default function QuizWizard({ flow, label, questions }: Props) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [prospectName, setProspectName] = useState("");
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const introStep = step === 0;
  const question = introStep ? null : questions[step - 1];
  const totalSteps = questions.length + 1;

  function setAnswer(key: string, value: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function toggleMulti(key: string, value: string) {
    setAnswers((prev) => {
      const current = (prev[key] as string[]) || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  }

  function canAdvance(): boolean {
    if (introStep) return prospectName.trim().length > 0;
    if (!question) return true;
    const val = answers[question.key];
    if (question.kind === "multi") return Array.isArray(val) && val.length > 0;
    return val !== undefined && val !== "";
  }

  async function handleNext() {
    if (step < totalSteps - 1) {
      setStep(step + 1);
      return;
    }
    // final step -> submit
    setSubmitting(true);
    setError(null);
    try {
      const report = await api.post("/api/reports/score", {
        answers: { flow, prospect_name: prospectName, ...answers },
      });
      navigate("/report", { state: { report } });
    } catch (e) {
      const msg =
        e instanceof ApiError && e.status === 401
          ? "Please log in to run and save a diagnostic report."
          : "Could not score this walkthrough. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16 w-full flex-1 flex flex-col justify-center">
      <div className="glass-card rounded-2xl border border-line/60 p-6 sm:p-10 shadow-lg relative overflow-hidden">
        {/* Accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${flow === "bdm" ? "bg-amber" : "bg-signal"}`} />

        <ReadoutBar step={step} totalSteps={totalSteps - 1} label={label} />

        <div className="mt-10 min-h-[260px] flex flex-col justify-between">
          {introStep ? (
            <div className="animate-fade-in">
              <span className="readout text-xs font-mono uppercase text-muted tracking-widest block mb-2">
                01 . INITIALIZATION
              </span>
              <h2 className="font-display text-3xl font-semibold text-ink mb-3">
                Who is this diagnostic for?
              </h2>
              <p className="text-muted text-sm sm:text-base mb-8 max-w-xl">
                This name is used to identify the saved report on your dashboard (e.g. client name, company, or project reference).
              </p>
              
              <div className="relative">
                <input
                  autoFocus
                  value={prospectName}
                  onChange={(e) => setProspectName(e.target.value)}
                  placeholder="e.g. Acme Corp Mobile App"
                  className="premium-input rounded-lg text-lg text-ink font-semibold"
                />
              </div>
            </div>
          ) : question ? (
            <div className="animate-fade-in">
              <span className="readout text-xs font-mono uppercase text-muted tracking-widest block mb-2">
                {(step + 1).toString().padStart(2, "0")} . QUALIFIER
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink mb-2 leading-snug">
                {question.prompt}
              </h2>
              {question.helper && (
                <p className="text-muted text-sm mb-6 flex items-start gap-1.5">
                  <svg className="w-4 h-4 text-signal shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {question.helper}
                </p>
              )}

              {/* CHOICE QUESTION */}
              {question.kind === "choice" && (
                <div className="grid gap-3 mt-4">
                  {question.options.map((opt) => {
                    const isSelected = answers[question.key] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setAnswer(question.key, opt.value)}
                        className={`text-left border rounded-xl px-5 py-4 flex items-center justify-between transition-all duration-200 ${
                          isSelected
                            ? "border-signal bg-signal-light/40 shadow-sm"
                            : "border-line/80 hover:border-ink/60 bg-paper/20"
                        }`}
                      >
                        <span className={`font-semibold ${isSelected ? "text-signal" : "text-ink"}`}>
                          {opt.label}
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "border-signal bg-signal" : "border-line"
                        }`}>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-paper" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* MULTI QUESTION */}
              {question.kind === "multi" && (
                <div className="grid gap-3 mt-4">
                  {question.options.map((opt) => {
                    const selected = ((answers[question.key] as string[]) || []).includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => toggleMulti(question.key, opt.value)}
                        className={`text-left border rounded-xl px-5 py-4 flex items-center justify-between transition-all duration-200 ${
                          selected
                            ? "border-signal bg-signal-light/40 shadow-sm"
                            : "border-line/80 hover:border-ink/60 bg-paper/20"
                        }`}
                      >
                        <span className={`font-semibold ${selected ? "text-signal" : "text-ink"}`}>
                          {opt.label}
                        </span>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                          selected ? "border-signal bg-signal" : "border-line"
                        }`}>
                          {selected && (
                            <svg className="w-3.5 h-3.5 text-paper" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* NUMBER INPUT */}
              {question.kind === "number" && (
                <div className="mt-6">
                  <input
                    type="number"
                    min={question.min}
                    max={question.max}
                    step={question.step}
                    value={(answers[question.key] as number) ?? ""}
                    onChange={(e) => setAnswer(question.key, Number(e.target.value))}
                    className="premium-input rounded-lg text-lg text-ink font-semibold"
                  />
                  <div className="flex justify-between text-xs text-muted mt-2 font-mono">
                    <span>Min: {question.min}</span>
                    <span>Max: {question.max}</span>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {error && (
          <div className="mt-6 border border-amber/30 bg-amber-light/30 text-amber text-sm px-4 py-3 rounded-lg flex items-center gap-2 font-semibold">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-line/40 flex items-center justify-between">
          <button
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
            className="readout text-xs uppercase font-bold text-muted hover:text-ink disabled:opacity-30 flex items-center gap-1.5 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          
          <button
            disabled={!canAdvance() || submitting}
            onClick={handleNext}
            className="inline-flex items-center gap-2 readout text-xs uppercase font-bold bg-ink text-paper px-6 py-3.5 disabled:opacity-30 hover:bg-signal transition-all duration-300 shadow-sm rounded"
          >
            {submitting ? (
              <span className="flex items-center gap-1.5">
                <svg className="animate-spin h-4 w-4 text-paper" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Scoring...
              </span>
            ) : step === totalSteps - 1 ? (
              <>
                Get recommendation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            ) : (
              <>
                Next
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
