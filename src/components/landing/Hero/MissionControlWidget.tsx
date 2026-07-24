import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Radar,
  Fingerprint,
  Mail,
  Globe,
  Bug,
  FileText,
  AlertTriangle,
} from "lucide-react";

/* =============================================================
   MISSION CONTROL WIDGET (live interactive hero preview)
   Includes Corners, StatusTile, RadarScope as private sub-components.
   ============================================================= */

export function MissionControlWidget() {
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState(0);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [startAnim, setStartAnim] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mql = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (mql && mql.matches) {
      setStartAnim(true);
      setProgress(67);
      setFiles(12);
      setTimelineVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setStartAnim(true);
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!startAnim) return;
    const mql = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (mql && mql.matches) return;
    
    // Slight delay after hero text reveal (hero text delays are up to ~500ms)
    const timeout = setTimeout(() => {
      const start = performance.now();
      const dur = 800;
      const tick = (t: number) => {
        let p = (t - start) / dur;
        if (p > 1) p = 1;
        // ease-out cubic
        const ease = 1 - Math.pow(1 - p, 3);
        setProgress(Math.round(67 * ease));
        setFiles(Math.round(12 * ease));
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          // Trigger timeline bar
          setTimelineVisible(true);
        }
      };
      requestAnimationFrame(tick);
    }, 500);

    return () => clearTimeout(timeout);
  }, [startAnim]);

  const evidence = [
    { icon: Mail, label: "Suspicious_Phish.eml", count: "3.4 KB • Verified Header", ok: true, tone: "primary" as const },
    { icon: Globe, label: "Firewall_Logs.csv", count: "1.2 MB • IP 192.168.1.104", ok: true, tone: "primary" as const },
    { icon: Bug, label: "Memory_Payload.mem", count: "64 MB • Suspicious Process", ok: false, tone: "danger" as const },
    { icon: FileText, label: "Chrome_History.db", count: "4.8 MB • 142 URLs Indexed", ok: true, tone: "primary" as const },
  ];

  return (
    <div className="relative" ref={ref}>
      {/* Frame */}
      <div className="relative rounded-[26px] p-[1px] bg-gradient-to-br from-primary/40 via-white/5 to-primary/20 shadow-elevated">
        <div className="relative rounded-[25px] overflow-hidden bg-[oklch(0.16_0.03_260)]/95 backdrop-blur-xl">
          {/* HUD Corners */}
          <Corners />
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.22em]">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/20 text-primary">
                <Radar className="h-3 w-3" />
              </span>
              <span className="text-white">INVESTIGATION LAB PREVIEW</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/15 border border-success/30 px-2 py-0.5 text-success text-[9px]">
                <motion.span
                  className="h-1 w-1 rounded-full bg-success"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                LIVE
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="text-muted-foreground">CASE</span>
              <span className="text-white">#0421</span>
              <motion.span
                className="inline-flex items-center gap-1 rounded-md border border-danger/40 bg-danger/10 px-1.5 py-0.5 text-danger text-[9px]"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(218,54,51,.2)",
                    "0 0 12px rgba(218,54,51,.5)",
                    "0 0 0px rgba(218,54,51,.2)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <AlertTriangle className="h-2.5 w-2.5" />
                CRITICAL
              </motion.span>
            </div>
          </div>

          {/* Body grid */}
          <div className="grid grid-cols-12 gap-3 p-4">
            {/* Evidence column */}
            <div className="col-span-5 space-y-2.5">
              <div className="font-mono text-[9px] tracking-[0.22em] text-muted-foreground">
                EVIDENCE COLLECTED
              </div>
              {evidence.map((e, i) => {
                const Icon = e.icon;
                return (
                  <motion.div
                    key={i}
                    className="group relative rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/30 transition-all px-2.5 py-2 flex items-center gap-2.5"
                    style={{
                      opacity: startAnim ? 1 : 0,
                      transform: startAnim ? "translateY(0)" : "translateY(8px)",
                      transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                      transitionDelay: `${600 + i * 60}ms`,
                    }}
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <span
                      className={`h-8 w-8 shrink-0 rounded-md flex items-center justify-center border ${
                        e.tone === "danger"
                          ? "bg-danger/10 border-danger/30 text-danger"
                          : "bg-primary/10 border-primary/30 text-primary"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] text-white font-medium truncate">
                        {e.label}
                      </div>
                      <div className="text-[9px] text-muted-foreground font-mono">
                        {e.count}
                      </div>
                    </div>
                    {e.ok ? (
                      <span className="h-4 w-4 rounded-full bg-success/20 border border-success/40 flex items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      </span>
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5 text-danger animate-pulse-glow" />
                    )}
                  </motion.div>
                );
              })}
              <button className="w-full rounded-lg border border-dashed border-white/10 hover:border-primary/40 hover:bg-primary/[0.04] transition text-[10px] font-mono tracking-[0.2em] text-muted-foreground hover:text-primary py-2">
                EVIDENCE PREVIEW
              </button>
            </div>

            {/* Radar */}
            <div className="col-span-4 flex flex-col">
              <div className="relative flex-1 rounded-xl border border-white/5 bg-black/40 overflow-hidden flex items-center justify-center min-h-[220px] p-3">
                <RadarScope />
              </div>
            </div>

            {/* Status column */}
            <div className="col-span-3 space-y-2">
              <StatusTile label="CASE STATUS" value="Active" tone="success" />
              <StatusTile
                label="THREAT LEVEL"
                value={
                  <div className="flex items-end gap-0.5 h-4">
                    {[3, 5, 4, 7, 6, 9, 8, 10, 7].map((h, i) => (
                      <span
                        key={i}
                        className="w-[3px] bg-danger rounded-sm"
                        style={{
                          height: `${h * 8}%`,
                          animation: `pulse-glow 1.4s ease-in-out ${i * 0.1}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                }
                tone="danger"
              />
              <StatusTile label="EVIDENCE" value={<span className="text-white font-bold text-lg">{files} <span className="text-[10px] text-muted-foreground font-normal">Files</span></span>} />
              <div className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-2">
                <div className="font-mono text-[8px] tracking-[0.22em] text-muted-foreground">
                  PROGRESS
                </div>
                <div className="flex items-baseline justify-between mt-0.5">
                  <span className="text-white text-lg font-bold">{progress}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{
                      boxShadow: "0 0 12px oklch(0.55 0.22 260 / 0.8)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="px-4 pb-4">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.22em] text-muted-foreground">
                <span>TIMELINE PREVIEW</span>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span>11:22</span>
                  <span className="text-white">13:00</span>
                </div>
              </div>
              <div className="relative mt-2.5 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: timelineVisible ? "100%" : 0 }}
                  transition={{ duration: 1.15, ease: "easeOut" }}
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.55 0.22 260) 0%, oklch(0.80 0.17 75) 55%, oklch(0.65 0.24 25) 100%)",
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white border-2 border-primary shadow-[0_0_16px_oklch(0.55_0.22_260/0.9)] transition-opacity duration-300"
                  style={{ 
                    left: `calc(100% - 7px)`,
                    opacity: timelineVisible ? 1 : 0,
                    transitionDelay: timelineVisible ? "800ms" : "0ms"
                  }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[9px] font-mono">
                <span className="text-primary">● PHISH DELIVERED</span>
                <span className="text-warning">● PAYLOAD EXECUTED</span>
                <span className="text-danger">● DATA EXFILTRATED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating orbits behind */}
      <div className="absolute -inset-8 -z-10 rounded-[40px] opacity-40 blur-2xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 animate-pulse-glow" />
    </div>
  );
}

/* --- Private sub-components --- */

function Corners() {
  const corner = "absolute h-4 w-4 border-primary/70";
  return (
    <>
      <span className={`${corner} border-l border-t top-2 left-2`} />
      <span className={`${corner} border-r border-t top-2 right-2`} />
      <span className={`${corner} border-l border-b bottom-2 left-2`} />
      <span className={`${corner} border-r border-b bottom-2 right-2`} />
    </>
  );
}

function StatusTile({
  label,
  value,
  tone = "primary",
}: {
  label: string;
  value: ReactNode;
  tone?: "primary" | "success" | "danger";
}) {
  const dot =
    tone === "success"
      ? "bg-success"
      : tone === "danger"
      ? "bg-danger"
      : "bg-primary";
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-2">
      <div className="font-mono text-[8px] tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-[13px] text-white font-medium">
        {tone !== "primary" && (
          <motion.span
            className={`h-1.5 w-1.5 rounded-full ${dot}`}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        )}
        {value}
      </div>
    </div>
  );
}

function RadarScope() {
  const seeded = (value: number) => {
    const random = Math.sin(value * 12.9898) * 43758.5453;
    return random - Math.floor(random);
  };

  const threatMarkers = Array.from({ length: 8 }, (_, index) => {
    const tone = (index % 3) === 0 ? "normal" : (index % 3) === 1 ? "suspicious" : "critical";
    const angle = seeded(index + 4) * Math.PI * 2;
    const radius = 24 + seeded(index + 9) * 66;
    const cx = 110 + Math.cos(angle) * radius * 0.58;
    const cy = 110 + Math.sin(angle) * radius * 0.58;

    return {
      cx,
      cy,
      r: 1.8 + seeded(index + 17) * 2.2,
      tone: tone as "normal" | "suspicious" | "critical",
      delay: seeded(index + 22) * 1.3,
    };
  });

  return (
    <div className="absolute inset-[4%] sm:inset-[6%] flex items-center justify-center">
      <svg viewBox="0 0 220 220" className="h-full w-full max-w-[520px] drop-shadow-[0_0_22px_rgba(78,123,255,0.18)]" aria-hidden>
        <defs>
          <radialGradient id="rad-sweep" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.65 0.28 260)" stopOpacity="0" />
            <stop offset="58%" stopColor="oklch(0.65 0.28 260)" stopOpacity="0.46" />
            <stop offset="100%" stopColor="oklch(0.65 0.28 260)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rad-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.62 0.24 260 / 0.34)" />
            <stop offset="55%" stopColor="oklch(0.52 0.18 260 / 0.18)" />
            <stop offset="100%" stopColor="oklch(0.42 0.12 260 / 0.02)" />
          </radialGradient>
          <radialGradient id="radarShell" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor="oklch(0.33 0.06 260 / 0.95)" />
            <stop offset="62%" stopColor="oklch(0.21 0.04 260 / 0.92)" />
            <stop offset="100%" stopColor="oklch(0.14 0.03 260 / 0.96)" />
          </radialGradient>
          <radialGradient id="glassShine" cx="28%" cy="22%" r="78%">
            <stop offset="0%" stopColor="oklch(0.95 0.03 250 / 0.34)" />
            <stop offset="35%" stopColor="oklch(0.9 0.04 250 / 0.12)" />
            <stop offset="100%" stopColor="oklch(0.9 0.04 250 / 0)" />
          </radialGradient>
          <linearGradient id="radarFrame" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.65 0.18 250 / 0.85)" />
            <stop offset="50%" stopColor="oklch(0.55 0.22 260 / 0.35)" />
            <stop offset="100%" stopColor="oklch(0.62 0.18 245 / 0.6)" />
          </linearGradient>
          <filter id="radarGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="scopeShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="oklch(0.4 0.2 260 / 0.45)" />
            <feDropShadow dx="0" dy="2" stdDeviation="8" floodColor="oklch(0.16 0.04 260 / 0.9)" />
          </filter>
        </defs>

        <g filter="url(#scopeShadow)">
          <circle cx="110" cy="110" r="100" fill="url(#radarShell)" stroke="oklch(0.66 0.17 250 / 0.28)" strokeWidth="0.9" />
          <circle cx="110" cy="110" r="96" fill="url(#rad-bg)" stroke="url(#radarFrame)" strokeWidth="0.95" />
          <ellipse cx="110" cy="84" rx="56" ry="18" fill="oklch(0.62 0.20 260 / 0.10)" filter="url(#radarGlow)" />
          <ellipse cx="72" cy="64" rx="60" ry="34" fill="url(#glassShine)" />
        </g>
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "110px 110px" }}
        >
          <circle cx="110" cy="110" r="94" fill="none" stroke="oklch(0.55 0.22 260 / 0.28)" strokeWidth="0.8" strokeDasharray="1 8" />
        </motion.g>

        {[90, 78, 66, 54, 42, 30, 18, 6].map((r) => (
          <circle
            key={r}
            cx="110"
            cy="110"
            r={r}
            fill="none"
            stroke="oklch(0.55 0.22 260)"
            strokeOpacity={r === 90 ? 0.34 : 0.18}
            strokeDasharray={r === 90 ? "1 0" : "2 5"}
            strokeWidth={r === 90 ? 1.2 : 0.8}
          />
        ))}

        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 110 + Math.cos(angle) * 94;
          const y1 = 110 + Math.sin(angle) * 94;
          const x2 = 110 + Math.cos(angle) * 104;
          const y2 = 110 + Math.sin(angle) * 104;
          return (
            <line
              key={`grid-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="oklch(0.55 0.22 260 / 0.22)"
              strokeWidth="0.8"
            />
          );
        })}

        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x = 110 + Math.cos(angle) * 104;
          const y = 110 + Math.sin(angle) * 104;
          const label = ["0°", "30°", "60°", "90°", "120°", "150°", "180°", "210°", "240°", "270°", "300°", "330°"][i];
          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="5"
              fill="oklch(0.78 0.16 210 / 0.78)"
              fontFamily="monospace"
              letterSpacing="0.8"
            >
              {label}
            </text>
          );
        })}

        <line x1="20" y1="110" x2="200" y2="110" stroke="oklch(0.55 0.22 260 / 0.22)" strokeWidth="0.8" />
        <line x1="110" y1="20" x2="110" y2="200" stroke="oklch(0.55 0.22 260 / 0.22)" strokeWidth="0.8" />

        <line x1="110" y1="110" x2="110" y2="14" stroke="oklch(0.55 0.22 260 / 0.86)" strokeWidth="1.1" />
        <line x1="110" y1="110" x2="110" y2="206" stroke="oklch(0.55 0.22 260 / 0.86)" strokeWidth="1.1" />
        <line x1="110" y1="110" x2="14" y2="110" stroke="oklch(0.55 0.22 260 / 0.86)" strokeWidth="1.1" />
        <line x1="110" y1="110" x2="206" y2="110" stroke="oklch(0.55 0.22 260 / 0.86)" strokeWidth="1.1" />

        <circle cx="110" cy="110" r="5" fill="oklch(0.55 0.22 260 / 0.32)" />
        <circle cx="110" cy="110" r="9" fill="none" stroke="oklch(0.75 0.18 260 / 0.6)" strokeWidth="1.05" />
        <circle cx="110" cy="110" r="14" fill="none" stroke="oklch(0.55 0.22 260 / 0.22)" strokeWidth="0.7" />

        <g filter="url(#radarGlow)">
          <motion.g
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "110px 110px" }}
          >
            <path d="M110 110 L110 18 A92 92 0 0 1 202 110 Z" fill="url(#rad-sweep)" />
            <line x1="110" y1="110" x2="110" y2="18" stroke="oklch(0.55 0.22 260)" strokeWidth="1.2" strokeOpacity="0.9" />
          </motion.g>
        </g>

        <motion.circle
          cx="110"
          cy="110"
          r="18"
          fill="none"
          stroke="oklch(0.55 0.22 260 / 0.45)"
          strokeWidth="1"
          animate={{ scale: [0.9, 1.15, 1.5], opacity: [0.55, 0.3, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: "110px 110px" }}
        />

        <motion.g
          transform="translate(88 88)"
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "15px 15px" }}
        >
          <motion.circle
            cx="15"
            cy="15"
            r="20"
            fill="oklch(0.55 0.22 260 / 0.12)"
            animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "15px 15px" }}
          />
          <circle cx="15" cy="15" r="15" fill="oklch(0.55 0.22 260 / 0.15)" stroke="oklch(0.55 0.22 260)" strokeOpacity="0.5" />
          <Fingerprint x="4" y="4" width="22" height="22" color="oklch(0.55 0.22 260)" />
        </motion.g>

        {threatMarkers.map((marker, i) => {
          const colors = {
            normal: {
              stroke: "oklch(0.55 0.22 260)",
              fill: "oklch(0.55 0.22 260)",
            },
            suspicious: {
              stroke: "oklch(0.80 0.17 75)",
              fill: "oklch(0.80 0.17 75)",
            },
            critical: {
              stroke: "oklch(0.65 0.24 25)",
              fill: "oklch(0.65 0.24 25)",
            },
          };
          const tone = colors[marker.tone];

          return (
            <motion.g
              key={`${marker.cx}-${marker.cy}-${marker.tone}`}
              animate={{ scale: [1, 1.14, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut", delay: marker.delay }}
              style={{ transformOrigin: `${marker.cx}px ${marker.cy}px` }}
            >
              <motion.circle
                cx={marker.cx}
                cy={marker.cy}
                r={marker.r * 3.2}
                fill="none"
                stroke={tone.stroke}
                strokeOpacity="0.45"
                animate={{ opacity: [0.25, 0.74, 0.25], scale: [0.9, 1.15, 0.9] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: marker.delay }}
                style={{ transformOrigin: `${marker.cx}px ${marker.cy}px` }}
              />
              <motion.circle
                cx={marker.cx}
                cy={marker.cy}
                r={marker.r * 2.2}
                fill="none"
                stroke={tone.stroke}
                strokeOpacity="0.6"
                animate={{ opacity: [0.35, 0.9, 0.35] }}
                transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", delay: marker.delay + i * 0.04 }}
              />
              <motion.circle
                cx={marker.cx}
                cy={marker.cy}
                r={marker.r}
                fill={tone.fill}
                animate={{ scale: [1, 1.45, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: marker.delay + 0.1 }}
                style={{ transformOrigin: `${marker.cx}px ${marker.cy}px` }}
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
