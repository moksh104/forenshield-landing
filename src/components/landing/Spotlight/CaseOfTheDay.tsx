import { useState } from "react";
import { ArrowRight, ShieldAlert, Eye } from "lucide-react";
import { CasePreviewModal } from "./CasePreviewModal";
import { CountUp } from "@/components/animations/CountUp";

export function CaseOfTheDay() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="relative h-full rounded-[20px] overflow-hidden border border-border/80 bg-card shadow-sm dark:border-primary/15 group transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:border-primary/40 shadow-slate-200/40 dark:shadow-none">
        {/* Moody hero with digital transaction trail illustration */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0D14]">
          {/* Base tech background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 80% 50%, oklch(0.60 0.24 25 / 0.18), transparent 55%), radial-gradient(circle at 20% 50%, oklch(0.55 0.22 260 / 0.18), transparent 55%), #080B11",
            }}
          />

          {/* Grid overlay */}
          <div
            aria-hidden
            className="absolute inset-0 grid-bg opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_85%)] pointer-events-none"
          />

          {/* Transaction trail SVG Illustration */}
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <svg viewBox="0 0 400 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Vivid Gradients */}
                <linearGradient id="flow-cyan-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="flow-blue-red" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#F43F5E" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="1" />
                </linearGradient>

                <radialGradient id="red-glow-strong" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="#EF4444" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                </radialGradient>

                <radialGradient id="cyan-glow-strong" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background Grid Pattern */}
              <pattern id="grid-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.06)" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-dots)" />

              {/* Glowing Halos */}
              <circle cx="75" cy="108" r="62" fill="url(#cyan-glow-strong)" />
              <circle cx="325" cy="108" r="70" fill="url(#red-glow-strong)" />

              {/* PERFECTLY ALIGNED DASHED FLOW PATHS (Center Y = 108) */}
              <path
                d="M 103 108 L 175 108"
                stroke="url(#flow-cyan-blue)"
                strokeWidth="3.5"
                strokeDasharray="6 4.5"
                strokeLinecap="round"
              />
              <path
                d="M 225 108 L 300 108"
                stroke="url(#flow-blue-red)"
                strokeWidth="3.5"
                strokeDasharray="6 4.5"
                strokeLinecap="round"
              />

              {/* Pulsing In-Transit Particles */}
              <circle r="4" fill="#38BDF8" style={{ filter: "drop-shadow(0 0 6px #38BDF8)" }}>
                <animateMotion dur="2.2s" repeatCount="indefinite" path="M 103 108 L 175 108" />
              </circle>
              <circle r="4.5" fill="#EF4444" style={{ filter: "drop-shadow(0 0 8px #EF4444)" }}>
                <animateMotion dur="1.8s" repeatCount="indefinite" path="M 225 108 L 300 108" />
              </circle>

              {/* NODE 1 (LEFT): Smartphone / Victim App (Center Y = 108) */}
              <g transform="translate(75, 108)">
                <rect x="-28" y="-45" width="56" height="90" rx="9" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.2" />
                <rect x="-23" y="-38" width="46" height="74" rx="5" fill="#1E293B" opacity="0.85" />
                <rect x="-6" y="-42" width="12" height="2.5" rx="1.2" fill="#334155" />
                {/* UPI Icon */}
                <circle cx="0" cy="-14" r="11.5" fill="#38BDF8" fillOpacity="0.2" stroke="#38BDF8" strokeWidth="1.4" />
                <path d="M -3.5 -14 L 3.5 -14 M 0.8 -17.5 L 4.5 -14 L 0.8 -10.5" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                {/* Amount */}
                <text x="0" y="8" fill="#F8FAFC" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">₹25,000</text>
                <text x="0" y="18" fill="#94A3B8" fontSize="6" fontFamily="monospace" textAnchor="middle">SENT via UPI</text>
                {/* Success Check */}
                <circle cx="0" cy="27" r="4.5" fill="#10B981" />
                <path d="M -2 27 L -0.6 28.3 L 2.3 25.7" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

                {/* Node Label (Generous 17px breathing room below phone frame) */}
                <text x="0" y="62" fill="#94A3B8" fontSize="8.5" fontFamily="monospace" fontWeight="600" textAnchor="middle">VICTIM DEVICE</text>
              </g>

              {/* NODE 2 (MIDDLE): NPCI Payment Relay (Center Y = 108) */}
              <g transform="translate(200, 108)">
                <circle cx="0" cy="0" r="25" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.2" />
                <circle cx="0" cy="0" r="17" fill="#0284C7" fillOpacity="0.25" />
                {/* Bank / Server Icon */}
                <path d="M -8.5 -3 L 0 -9.5 L 8.5 -3 M -6.5 0 L -6.5 5.5 M -2 0 L -2 5.5 M 2.5 0 L 2.5 5.5 M 7 0 L 7 5.5 M -9.5 8.5 L 9.5 8.5" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
                {/* Tag */}
                <rect x="-34" y="36" width="68" height="16" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                <text x="0" y="47" fill="#CBD5E1" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">NPCI RELAY</text>
              </g>

              {/* NODE 3 (RIGHT): Flagged Mule Account (Center Y = 108) */}
              <g transform="translate(325, 108)">
                {/* Pulsing Target Rings */}
                <circle cx="0" cy="0" r="35" fill="none" stroke="#EF4444" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="4 3">
                  <animate attributeName="r" values="30;42;30" dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="strokeOpacity" values="0.7;0.1;0.7" dur="2.6s" repeatCount="indefinite" />
                </circle>

                {/* Main Circle */}
                <circle cx="0" cy="0" r="25" fill="#250B10" stroke="#EF4444" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="17" fill="#EF4444" fillOpacity="0.25" />

                {/* Alert Shield Icon */}
                <path d="M -6 -7 C -6 -7 0 -10 0 -10 C 0 -10 6 -7 6 -7 C 6 2 0 8 0 8 C 0 8 -6 2 -6 -7 Z" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M 0 -3.5 L 0 1 M 0 3.5 L 0 4.2" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />

                {/* FLAGGED MULE Badge */}
                <rect x="-45" y="36" width="90" height="18" rx="4" fill="#3F0D15" stroke="#EF4444" strokeWidth="1.2" />
                <text x="0" y="48" fill="#FF6B6B" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">MULE ACCOUNT</text>
              </g>

              {/* Telemetry Labels (Consistent 16px side & 20px bottom padding) */}
              <rect x="16" y="204" width="135" height="18" rx="4" fill="#0F172A" fillOpacity="0.95" stroke="rgba(56,189,248,0.3)" />
              <text x="23" y="216" fill="#38BDF8" fontSize="7.5" fontFamily="monospace" fontWeight="bold">TRAIL: #FS-UPI-8942</text>

              <rect x="249" y="204" width="135" height="18" rx="4" fill="#3F0D15" fillOpacity="0.95" stroke="#EF4444" strokeOpacity="0.5" />
              <text x="256" y="216" fill="#FF6B6B" fontSize="7.5" fontFamily="monospace" fontWeight="bold">STATUS: FLAGGED MULE</text>
            </svg>
          </div>

          {/* Scanline sweep */}
          <div
            aria-hidden
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent motion-safe:animate-scan pointer-events-none"
            style={{ top: 0 }}
          />

          {/* Bottom fade for text legibility */}
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#0B0F17] to-transparent pointer-events-none" />

          {/* Badge */}
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-md bg-slate-900/80 border border-slate-700/80 px-2.5 py-1 text-[10px] font-mono tracking-wider text-white backdrop-blur shadow-sm">
            <Eye className="h-3 w-3 text-primary" /> FEATURED INVESTIGATION
          </span>

          {/* Animated warning indicator */}
          <div className="absolute top-3 right-3 h-8 w-8" aria-label="Warning">
            <span className="absolute inset-0 rounded-full bg-danger/30 motion-safe:animate-[ping-soft_2s_ease-in-out_infinite]" />
            <div className="relative h-8 w-8 rounded-full bg-danger/20 border border-danger/50 flex items-center justify-center shadow-[0_0_16px_oklch(0.65_0.24_25/0.5)] motion-safe:animate-[pulse-glow_2s_ease-in-out_infinite]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path d="M12 3L22 20H2L12 3Z" fill="var(--color-danger)" />
                <path d="M12 9v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="18" r="1.5" fill="white" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-4 bg-card">
          <div className="text-foreground font-display font-bold text-lg leading-tight">
            UPI Fraud Investigation
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            A user lost ₹25,000 in a UPI scam. Trace the transaction trail,
            identify the mule account, and recover lost funds.
          </p>
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-md bg-danger/15 border border-danger/30 px-2 py-0.5 text-[10px] font-medium text-danger">
                Risk Level: High
              </span>
              <span className="rounded-md bg-danger/15 border border-danger/30 px-2 py-0.5 text-[10px] font-medium text-danger">
                <CountUp from={0} to={250} duration={2} delay={0.2} prefix="+" suffix=" XP Reward" />
              </span>
            </div>

            {/* Progress Indicator */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
                <span>EVIDENCE COLLECTED</span>
                <span className="font-bold text-primary">
                  <CountUp from={0} to={4} duration={2} delay={0.2} /> / 5
                </span>
              </div>
              <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: "80%" }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="relative w-full mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-primary transition-[transform,box-shadow] duration-300 will-change-transform hover:shadow-[0_10px_40px_-8px_oklch(0.55_0.22_260/0.75)]"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <span className="relative inline-flex items-center gap-2">
              View Sample Case
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
      <CasePreviewModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
