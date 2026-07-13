import React, { useState } from "react";
import { Link } from "react-router-dom";
import OutcomeModal from "../components/OutcomeModal";

interface Outcome {
  id: string;
  title: string;
  short: string;
  description: string;
  details: {
    whatItIs: string;
    bestFor: string;
    clientOwns: string[];
    vendorOwns: string[];
    timeline: string;
    cost: string;
  };
}

const outcomes: Outcome[] = [
  {
    id: "staff_augmentation",
    title: "Staff Augmentation",
    short: "Specialized developers embedded in your team",
    description: "Plug skilled engineers directly into your existing processes and management structures.",
    details: {
      whatItIs: "Your company retains full control and decision-making authority. We provide dedicated, skilled engineers who work as extensions of your internal team, following your architecture, roadmap, and processes.",
      bestFor: "Teams with established processes and a clear technical direction who need additional hands for capacity.",
      clientOwns: ["Product strategy and roadmap", "Architecture decisions", "Day-to-day delivery management", "Final QA sign-off"],
      vendorOwns: ["Providing skilled engineers", "Code quality on assigned work", "Reporting progress and hours"],
      timeline: "Flexible, ongoing relationship (months to years)",
      cost: "Fixed per-engineer cost, billed by hours or seats",
    },
  },
  {
    id: "agency",
    title: "Agency Model",
    short: "End-to-end delivery with strategic partnership",
    description: "We own design, development, and delivery. Partner with us for polish without managing the daily build.",
    details: {
      whatItIs: "A true partnership where we take responsibility for the full delivery lifecycle. You focus on business goals; we handle architecture, technology choices, project management, and execution.",
      bestFor: "Companies that want a trusted partner to evolve their product over time, who prefer outcome-based delivery over task management.",
      clientOwns: ["Business goals and priorities", "Budget approval and oversight", "Final acceptance and sign-off"],
      vendorOwns: ["End-to-end delivery", "Architecture and tech stack decisions", "Project management and timelines", "QA, testing, and release management"],
      timeline: "Ongoing relationship with evolving scope (1+ years)",
      cost: "Monthly retainer or milestone-based pricing",
    },
  },
  {
    id: "project_outsourcing",
    title: "Project Outsourcing",
    short: "Fixed-scope, milestone-driven delivery",
    description: "We deliver a complete product or feature set to explicit specifications within a defined scope and timeline.",
    details: {
      whatItIs: "You lock down requirements upfront; we commit to delivering it on time and within budget. Clear scope boundaries, defined milestones, and fixed deliverables.",
      bestFor: "Well-defined projects with clear scope, fixed budgets, and discrete deliverable sets. Ideal when you know exactly what you need built.",
      clientOwns: ["Detailed, signed-off requirements", "Timely feedback in review rounds", "Milestone payments"],
      vendorOwns: ["Fixed-scope delivery and quality", "Timeline and budget adherence", "Documentation and handover"],
      timeline: "Fixed: typically 3–6 months per phase",
      cost: "Fixed project fee or per-milestone pricing",
    },
  },
  {
    id: "process_outsourcing",
    title: "Process Outsourcing",
    short: "Ongoing operation of recurring business functions",
    description: "Outsource operational work like QA testing, DevOps maintenance, or customer support operations on an ongoing basis.",
    details: {
      whatItIs: "We take over a defined business process and run it for you, meeting agreed SLAs and KPIs. Ideal for functions that are repetitive and require consistent execution.",
      bestFor: "Teams that have mature processes but lack internal capacity or specialist expertise to run them efficiently at scale.",
      clientOwns: ["Defining the process and SLA targets", "Escalation ownership for exceptions"],
      vendorOwns: ["Day-to-day operation and staffing", "Meeting SLA targets", "Regular reporting and metrics"],
      timeline: "Ongoing (months to years), with review cycles",
      cost: "Monthly retainer based on volume or effort",
    },
  },
  {
    id: "discovery",
    title: "Discovery Phase",
    short: "Structured consulting to define the solution",
    description: "A brief, intensive sprint to align on solution, architecture, prototypes, and a detailed roadmap before commitment.",
    details: {
      whatItIs: "When scope is unclear, we work with you in a time-boxed engagement to define the problem, validate assumptions, explore solutions, and produce a detailed estimate and roadmap.",
      bestFor: "Early-stage ideas, complex problems, or when you're unsure which engagement model fits. De-risks larger commitments.",
      clientOwns: ["Domain knowledge and stakeholder participation", "Availability for workshops and feedback"],
      vendorOwns: ["Facilitating discovery and workshops", "Producing scoped backlog and effort estimate", "Recommending the optimal engagement model"],
      timeline: "2–4 weeks, structured",
      cost: "Fixed engagement fee or daily rate",
    },
  },
];

export default function Home() {
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-600 text-xs font-semibold uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Enterprise Diagnostic Engine
          </div>
          
          <h1 className="font-display text-5xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
            Find your ideal engagement model.
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
            Answer a few strategic questions and instantly discover which of five operational frameworks aligns with your mobile project's scope, team, and goals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to="/client-walkthrough"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Client Walkthrough
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/bdm-qualification"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-slate-900 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-200"
            >
              BDM Qualification
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Outcomes Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-widest">
              Five Engagement Models
            </p>
            <h2 className="text-4xl font-bold text-slate-900">
              Which model fits your situation?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Click any card to explore detailed responsibilities, timelines, and cost structures.
            </p>
          </div>

          {/* Outcomes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {outcomes.map((outcome) => (
              <button
                key={outcome.id}
                onClick={() => setSelectedOutcome(outcome)}
                className="group text-left p-6 rounded-lg border border-slate-200 bg-white hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
              >
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                    {outcome.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {outcome.short}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
                    <span className="text-xs font-semibold uppercase tracking-wide">Learn more</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-200">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Transparent Scoring
            </h3>
            <p className="text-sm text-slate-600">No black-box algorithms—every recommendation is explainable and grounded in your specific project.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Saved Dashboard
            </h3>
            <p className="text-sm text-slate-600">All diagnostics saved to your dashboard for easy comparison and team review.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Export-Ready Reports
            </h3>
            <p className="text-sm text-slate-600">Download polished reports with effort estimates, red flags, and responsibility breakdowns.</p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedOutcome && (
        <OutcomeModal outcome={selectedOutcome} onClose={() => setSelectedOutcome(null)} />
      )}
    </div>
  );
}