import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLinkActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col relative z-10 selection:bg-signal/20">
      {/* Sticky Header with Glassmorphism */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-paper/85 border-b border-line/60 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="bg-ink text-paper font-display text-lg font-bold px-2 py-0.5 rounded tracking-tighter transition-transform group-hover:scale-105">
              VE
            </span>
            <span className="readout text-xs font-semibold tracking-widest text-ink group-hover:text-signal transition-colors">
              MODEL ADVISOR
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link 
              to="/client-walkthrough" 
              className={`relative py-1 transition-colors ${
                isLinkActive("/client-walkthrough") ? "text-signal" : "text-muted hover:text-ink"
              }`}
            >
              Client walkthrough
              {isLinkActive("/client-walkthrough") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-signal rounded" />
              )}
            </Link>
            <Link 
              to="/bdm-qualification" 
              className={`relative py-1 transition-colors ${
                isLinkActive("/bdm-qualification") ? "text-signal" : "text-muted hover:text-ink"
              }`}
            >
              BDM qualification
              {isLinkActive("/bdm-qualification") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-signal rounded" />
              )}
            </Link>
            <Link 
              to="/contact" 
              className={`relative py-1 transition-colors ${
                isLinkActive("/contact") ? "text-signal" : "text-muted hover:text-ink"
              }`}
            >
              Contact
              {isLinkActive("/contact") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-signal rounded" />
              )}
            </Link>
            {user && (
              <Link 
                to="/dashboard" 
                className={`relative py-1 transition-colors ${
                  isLinkActive("/dashboard") ? "text-signal" : "text-muted hover:text-ink"
                }`}
              >
                Dashboard
                {isLinkActive("/dashboard") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-signal rounded" />
                )}
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted font-mono hidden sm:inline">
                  [{user.role.toUpperCase()}]
                </span>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="readout text-[11px] font-semibold tracking-wider uppercase border-2 border-ink px-4 py-1.5 hover:bg-ink hover:text-paper transition-all duration-200"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="readout text-[11px] font-semibold tracking-wider uppercase bg-ink text-paper border-2 border-ink px-4 py-1.5 hover:bg-transparent hover:text-ink transition-all duration-200"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 animate-fade-in">
        {children}
      </main>

      {/* Premium Footer */}
      <footer className="border-t border-line/60 bg-paper/60 backdrop-blur-sm mt-auto relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="readout text-[10px] text-muted text-center md:text-left max-w-xl leading-relaxed">
            VE Mobile App Engagement Diagnostic · An indicative scoring engine for strategic qualification. 
            All generated options represent guidelines; final models require BDM scoping.
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-signal rounded-full animate-pulse" />
              Engine V4.2 Online
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
