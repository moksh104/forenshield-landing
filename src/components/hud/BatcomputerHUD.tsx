import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  FileSearch,
  FolderLock,
  Radar,
  ShieldAlert,
  Sparkles,
  Zap,
  X,
} from "lucide-react";

/**
 * Persistent Batcomputer-style HUD overlay.
 * Renders on every route as a fixed bottom-right console.
 * - Mission status: derived from the current route
 * - Radar sweep (SVG)
 * - Live counters: evidence, cases, XP
 * - Ticker of latest alerts
 */
type RouteKey = "/" | "/app" | "/investigate" | "/academy" | "/simulate" | "other";

const MISSIONS: Record<RouteKey, { label: string; sub: string; tone: string }> = {
  "/": { label: "RECON", sub: "Product Overview", tone: "text-muted-foreground" },
  "/app": { label: "MISSION CONTROL", sub: "Agent Console", tone: "text-primary" },
  "/investigate": { label: "ACTIVE CASE", sub: "Forensic Lab", tone: "text-secondary" },
  "/academy": { label: "TRAINING", sub: "Cyber Academy", tone: "text-warning" },
  "/simulate": { label: "RED-TEAM SIM", sub: "Attack Surface", tone: "text-danger" },
  other: { label: "STANDBY", sub: "Uplink", tone: "text-muted-foreground" },
};

function routeKey(pathname: string): RouteKey {
  if (pathname === "/") return "/";
  if (pathname.startsWith("/app")) return "/app";
  if (pathname.startsWith("/investigate")) return "/investigate";
  if (pathname.startsWith("/academy")) return "/academy";
  if (pathname.startsWith("/simulate")) return "/simulate";
  return "other";
}

const ALERTS = [
  { code: "FS-001", text: "UPI fraud · new mule VPA observed" },
  { code: "FS-005", text: "Spoofed invoice · DKIM=fail flagged" },
  { code: "FS-003", text: "WhatsApp OTP impersonation +2" },
  { code: "FS-007", text: "Job-scam ring · KYC dump indexed" },
];

export function BatcomputerHUD() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const key = routeKey(pathname);
  const mission = MISSIONS[key];

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // rotate the alert ticker
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 4200);
    return () => clearInterval(id);
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const alert = useMemo(() => ALERTS[tick % ALERTS.length], [tick]);

  if (!mounted) return null;

  return (
    <>
      {/* Floating Compass Button in Bottom Right */}
      <div className="fixed z-[50] bottom-4 right-4 sm:bottom-6 sm:right-6 font-mono pointer-events-auto">
        <AnimatePresence>
          {!open && (
            <motion.div 
              key="compass-container"
              exit={{ opacity: 0, scale: 0.5, filter: "blur(8px)", transition: { duration: 0.2 } }}
            >
              <CompassOrb 
                onClick={() => setOpen(true)} 
                mission={mission} 
                prefersReducedMotion={prefersReducedMotion} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Centered Modal Overlay */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-mono pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-slate-950/60 dark:bg-black/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Modal Box */}
            <motion.div 
              key="panel-container"
              className="relative z-10 origin-center"
              initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.9, opacity: 0, filter: "blur(8px)", transition: { duration: 0.2, ease: "easeIn" } }}
              transition={{ 
                type: "spring", 
                stiffness: 320, 
                damping: 26,
                mass: 0.8
              }}
            >
              <ExpandedPanel 
                onClose={() => setOpen(false)} 
                mission={mission} 
                alert={alert}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function CompassOrb({ onClick, mission, prefersReducedMotion }: { onClick: () => void, mission: any, prefersReducedMotion: boolean | null }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex items-center justify-center rounded-full bg-card border border-border text-foreground shadow-xl backdrop-blur-md group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-black/85 dark:border-primary/40"
      title="Mission Control"
      style={{ width: 56, height: 56 }}
      initial={{ scale: 0.8, opacity: 0, filter: "blur(8px)" }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        filter: "blur(0px)",
        y: prefersReducedMotion ? 0 : [0, -2, 0],
        boxShadow: prefersReducedMotion 
          ? "0 0 16px rgba(0, 163, 255, 0.2)" 
          : [
              "0 0 16px rgba(0, 163, 255, 0.2)", 
              "0 0 22px rgba(0, 163, 255, 0.3)", 
              "0 0 16px rgba(0, 163, 255, 0.2)"
            ]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut",
        scale: { duration: 0.4, type: "spring", bounce: 0.2 },
        opacity: { duration: 0.3 },
        filter: { duration: 0.3 }
      }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0 0 30px rgba(0, 163, 255, 0.5)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
    >
      <RadarBadge tone={mission.tone} size={48} noBg speedMultiplier={1.5} />
      
      {/* pulsing center dot */}
      <motion.div
        className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-primary/90"
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ boxShadow: "0 0 8px currentColor" }}
      />
    </motion.button>
  );
}

function ExpandedPanel({ onClose, mission, alert }: { onClose: () => void, mission: any, alert: any }) {
  return (
    <div
      className="rounded-2xl bg-card border border-border/80 text-foreground shadow-2xl shadow-slate-950/25 dark:shadow-black/70 overflow-hidden backdrop-blur-xl dark:bg-[#0E1116]/95 dark:border-primary/30 w-[min(92vw,350px)] flex flex-col"
    >
      {/* top scanline */}
      <div className="relative h-px w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/70 to-transparent animate-scan" />
      </div>

      {/* Header bar */}
      <div className="w-full shrink-0 flex items-center justify-between gap-3 px-3.5 py-3 bg-muted/40 border-b border-border/50">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="h-9 w-9 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:bg-primary/15 dark:border-primary/30 dark:text-primary flex items-center justify-center shadow-xs">
            <Radar className="h-4.5 w-4.5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono font-bold tracking-[0.24em] text-blue-600 dark:text-primary uppercase">{mission.label}</div>
            <div className="text-[14px] font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mt-0.5 truncate">{mission.sub}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="h-8 w-8 flex items-center justify-center rounded-xl hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors border border-transparent hover:border-border/40"
          aria-label="Close HUD"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Counters strip (always visible) */}
      <div className="grid grid-cols-3 border-b border-border/40 shrink-0 bg-muted/10">
        <Counter icon={<FileSearch className="h-3 w-3" />} label="EVID" value="128" tone="text-primary font-bold" />
        <Counter icon={<FolderLock className="h-3 w-3" />} label="CASE" value="07" tone="text-slate-900 dark:text-white font-bold" />
        <Counter icon={<Sparkles className="h-3 w-3" />} label="XP" value="4.8K" tone="text-amber-600 dark:text-warning font-bold" />
      </div>

      {/* Expanded body */}
      <div className="p-3.5 space-y-3.5 animate-fade-up overflow-y-auto custom-scrollbar max-h-[300px]">
        {/* Alert ticker */}
        <div className="rounded-xl border border-danger/25 bg-danger/[0.06] p-2.5 shrink-0">
          <div className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] text-danger font-bold">
            <ShieldAlert className="h-3 w-3 animate-pulse-glow" /> ALERT FEED
          </div>
          <div key={alert.code} className="mt-1 text-[11px] text-foreground font-medium animate-fade-up">
            <span className="text-danger font-semibold">{alert.code}</span>
            <span className="text-muted-foreground"> · </span>
            {alert.text}
          </div>
        </div>

        {/* Vitals */}
        <div className="grid grid-cols-2 gap-2 text-[10px] shrink-0">
          <Vital label="UPLINK" value="STABLE" tone="text-success font-semibold" dot />
          <Vital label="THREAT" value="ELEVATED" tone="text-warning font-semibold" dot />
          <Vital label="LATENCY" value="42ms" tone="text-primary font-semibold" />
          <Vital label="SHIELD" value="100%" tone="text-success font-semibold" />
        </div>
      </div>

      {/* bottom scanline */}
      <div className="relative h-px w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/60 to-transparent animate-scan" />
      </div>
    </div>
  );
}

function RadarBadge({ tone, size = 32, noBg = false, speedMultiplier = 1 }: { tone: string; size?: number; noBg?: boolean; speedMultiplier?: number }) {
  return (
    <div 
      className={`relative shrink-0 overflow-hidden ${noBg ? "" : "rounded-lg bg-black/40 border border-white/10"}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="hud-radar" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.0" />
            <stop offset="60%" stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className={tone}>
          <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeOpacity="0.25" />
          <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeOpacity="0.18" />
          <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeOpacity="0.18" />
          <line x1="2" y1="20" x2="38" y2="20" stroke="currentColor" strokeOpacity="0.12" />
          <line x1="20" y1="2" x2="20" y2="38" stroke="currentColor" strokeOpacity="0.12" />
        </g>
        <motion.g
          className={tone}
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", repeatDelay: 1 }}
          style={{ transformOrigin: "20px 20px" }}
        >
          <path d="M20 20 L20 2 A18 18 0 0 1 38 20 Z" fill="url(#hud-radar)" />
          <line x1="20" y1="20" x2="20" y2="2" stroke="currentColor" strokeOpacity="0.85" strokeWidth="1" />
        </motion.g>
        {/* contact blips */}
        <motion.circle
          cx="26"
          cy="13"
          r="1.1"
          className="fill-danger"
          animate={{ scale: [1, 1.18, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "26px 13px" }}
        />
        <motion.circle
          cx="13"
          cy="27"
          r="0.9"
          className="fill-primary"
          animate={{ scale: [1, 1.18, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
          style={{ transformOrigin: "13px 27px" }}
        />
      </svg>
      {!noBg && <Radar className="absolute inset-0 m-auto h-3 w-3 text-foreground/0" aria-hidden />}
    </div>
  );
}

function Counter({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="px-3 py-2.5 border-r last:border-r-0 border-border/40">
      <div className="flex items-center gap-1.5 text-[8.5px] tracking-[0.2em] font-mono text-muted-foreground">
        <span className={tone}>{icon}</span>
        {label}
      </div>
      <div className={`mt-1.5 text-[13px] font-mono font-bold leading-none ${tone}`}>{value}</div>
    </div>
  );
}

function Vital({
  label,
  value,
  tone,
  dot,
}: {
  label: string;
  value: string;
  tone: string;
  dot?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-md bg-white/[0.03] border border-white/5 px-2 py-1">
      <span className="tracking-[0.18em] text-muted-foreground">{label}</span>
      <span className={`flex items-center gap-1 ${tone}`}>
        {dot && (
          <motion.span
            className="h-1 w-1 rounded-full bg-current"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
        {value}
      </span>
    </div>
  );
}
