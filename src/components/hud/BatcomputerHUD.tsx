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
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // rotate the alert ticker
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 4200);
    return () => clearInterval(id);
  }, []);

  // Handle escape key and click outside
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const alert = useMemo(() => ALERTS[tick % ALERTS.length], [tick]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed z-[60] bottom-4 right-4 sm:bottom-6 sm:right-6 font-mono pointer-events-none"
      aria-live="polite"
    >
      <AnimatePresence>
        {!open && (
          <motion.div 
            key="compass-container"
            className="absolute bottom-0 right-0 pointer-events-auto"
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

      <AnimatePresence>
        {open && (
          <motion.div 
            key="panel-container"
            className="relative pointer-events-auto origin-bottom-right"
            initial={{ scale: 0.8, opacity: 0, filter: "blur(12px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.9, opacity: 0, filter: "blur(8px)", transition: { duration: 0.2, ease: "easeIn" } }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 24,
              mass: 0.8
            }}
          >
            <ExpandedPanel 
              onClose={() => setOpen(false)} 
              mission={mission} 
              alert={alert}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CompassOrb({ onClick, mission, prefersReducedMotion }: { onClick: () => void, mission: any, prefersReducedMotion: boolean | null }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex items-center justify-center rounded-full bg-black/85 border border-primary/40 backdrop-blur-md group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
      className={[
        "rounded-2xl glass-strong shadow-[0_8px_32px_rgba(0,163,255,0.15)] overflow-hidden backdrop-blur-xl",
        "border border-primary/20",
        "w-[300px]",
        "flex flex-col"
      ].join(" ")}
    >
      {/* top scanline */}
      <div className="relative h-px w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/70 to-transparent animate-scan" />
      </div>

      {/* Header bar */}
      <div className="w-full shrink-0 flex items-center justify-between gap-2.5 px-3 py-2 bg-white/[0.02]">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <RadarBadge tone={mission.tone} />
          <div className="min-w-0 flex-1">
            <div className={`text-[9px] tracking-[0.2em] ${mission.tone}`}>{mission.label}</div>
            <div className="text-[11px] text-foreground/90 truncate">{mission.sub}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/[0.08] text-muted-foreground hover:text-white transition-colors"
          aria-label="Close HUD"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Counters strip (always visible) */}
      <div className="grid grid-cols-3 border-t border-white/5 shrink-0">
        <Counter icon={<FileSearch className="h-3 w-3" />} label="EVID" value="128" tone="text-primary" />
        <Counter icon={<FolderLock className="h-3 w-3" />} label="CASE" value="07" tone="text-secondary" />
        <Counter icon={<Sparkles className="h-3 w-3" />} label="XP" value="4.8K" tone="text-achievement" />
      </div>

      {/* Expanded body */}
      <div className="border-t border-white/5 p-3 space-y-3 animate-fade-up overflow-y-auto custom-scrollbar max-h-[300px]">
        {/* Alert ticker */}
        <div className="rounded-lg border border-danger/25 bg-danger/[0.06] p-2 shrink-0">
          <div className="flex items-center gap-1.5 text-[9px] tracking-[0.2em] text-danger">
            <ShieldAlert className="h-3 w-3 animate-pulse-glow" /> ALERT FEED
          </div>
          <div key={alert.code} className="mt-1 text-[11px] text-foreground/90 animate-fade-up">
            <span className="text-danger">{alert.code}</span>
            <span className="text-muted-foreground"> · </span>
            {alert.text}
          </div>
        </div>

        {/* Vitals */}
        <div className="grid grid-cols-2 gap-2 text-[10px] shrink-0">
          <Vital label="UPLINK" value="STABLE" tone="text-success" dot />
          <Vital label="THREAT" value="ELEVATED" tone="text-warning" dot />
          <Vital label="LATENCY" value="42ms" tone="text-primary" />
          <Vital label="SHIELD" value="100%" tone="text-success" />
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
    <div className="px-2.5 py-1.5 border-r last:border-r-0 border-white/5">
      <div className="flex items-center gap-1 text-[8px] tracking-[0.2em] text-muted-foreground">
        <span className={tone}>{icon}</span>
        {label}
      </div>
      <div className={`text-[12px] font-semibold ${tone}`}>{value}</div>
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
