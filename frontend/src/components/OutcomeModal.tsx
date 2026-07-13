import React, { useEffect } from "react";

interface OutcomeModalProps {
  outcome: {
    title: string;
    details: {
      whatItIs: string;
      bestFor: string;
      clientOwns: string[];
      vendorOwns: string[];
      timeline: string;
      cost: string;
    };
  };
  onClose: () => void;
}

export default function OutcomeModal({ outcome, onClose }: OutcomeModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 overflow-auto">
        <div
          className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-500 hover:text-slate-700 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="mb-8 pb-8 border-b border-slate-200">
              <h2 className="text-4xl font-bold text-slate-900 mb-2">{outcome.title}</h2>
              <p className="text-lg text-slate-600">{outcome.details.whatItIs}</p>
            </div>

            {/* Main Content Grid */}
            <div className="space-y-10">
              {/* Best For */}
              <section>
                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-widest mb-3">
                  Best For
                </h3>
                <p className="text-base text-slate-700 leading-relaxed">
                  {outcome.details.bestFor}
                </p>
              </section>

              {/* Timeline & Cost */}
              <div className="grid md:grid-cols-2 gap-8">
                <section>
                  <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-widest mb-3">
                    Typical Timeline
                  </h3>
                  <p className="text-base text-slate-700 leading-relaxed">
                    {outcome.details.timeline}
                  </p>
                </section>
                <section>
                  <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-widest mb-3">
                    Cost Structure
                  </h3>
                  <p className="text-base text-slate-700 leading-relaxed">
                    {outcome.details.cost}
                  </p>
                </section>
              </div>

              {/* Responsibilities */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Client Owns */}
                <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                  <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                    Client Responsibilities
                  </h3>
                  <ul className="space-y-3">
                    {outcome.details.clientOwns.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-blue-900">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Vendor Owns */}
                <section className="bg-amber-50 rounded-lg p-6 border border-amber-100">
                  <h3 className="text-sm font-semibold text-amber-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-amber-600 rounded-full" />
                    Vendor Responsibilities
                  </h3>
                  <ul className="space-y-3">
                    {outcome.details.vendorOwns.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-amber-900">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-8 border-t border-slate-200 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Ready to explore this model further?
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}