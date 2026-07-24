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
              <div className="relative flex-1 rounded-xl border border-white/5 bg-black/40 overflow-hidden flex items-center justify-center min-h-[220px]">
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
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="rad-sweep" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.55 0.22 260)" stopOpacity="0" />
          <stop offset="70%" stopColor="oklch(0.55 0.22 260)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.55 0.22 260)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rad-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.55 0.22 260)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="oklch(0.55 0.22 260)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="90" fill="url(#rad-bg)" />
      {[80, 60, 40, 20].map((r) => (
        <circle
          key={r}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="oklch(0.55 0.22 260)"
          strokeOpacity="0.18"
          strokeDasharray="2 4"
        />
      ))}
      <line x1="10" y1="100" x2="190" y2="100" stroke="oklch(0.55 0.22 260 / 0.18)" />
      <line x1="100" y1="10" x2="100" y2="190" stroke="oklch(0.55 0.22 260 / 0.18)" />
      {/* Sweep */}
      <motion.g
        initial={{ scale: 0.2, opacity: 0.8 }}
        animate={{ scale: 1.1, opacity: 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut", repeatDelay: 1 }}
        style={{ transformOrigin: "100px 100px" }}
      >
        <path d="M100 100 L100 10 A90 90 0 0 1 190 100 Z" fill="url(#rad-sweep)" />
        <line x1="100" y1="100" x2="100" y2="10" stroke="oklch(0.55 0.22 260)" strokeWidth="1.2" strokeOpacity="0.9" />
      </motion.g>
      {/* Center fingerprint */}
      <motion.g
        transform="translate(85 85)"
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "15px 15px" }}
      >
        <circle cx="15" cy="15" r="14" fill="oklch(0.55 0.22 260 / 0.15)" stroke="oklch(0.55 0.22 260)" strokeOpacity="0.5" />
        <Fingerprint x="4" y="4" width="22" height="22" color="oklch(0.55 0.22 260)" />
      </motion.g>
      {/* Contact blips */}
      {[
        { cx: 60, cy: 50, tone: "primary" },
        { cx: 148, cy: 68, tone: "primary" },
        { cx: 155, cy: 140, tone: "danger" },
        { cx: 74, cy: 154, tone: "warning" },
        { cx: 135, cy: 108, tone: "primary" },
      ].map((b, i) => (
        <motion.g
          key={i}
          animate={{ scale: [1, 1.18, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
          style={{ transformOrigin: `${b.cx}px ${b.cy}px` }}
        >
          <circle
            cx={b.cx}
            cy={b.cy}
            r="8"
            fill="none"
            stroke={
              b.tone === "danger"
                ? "oklch(0.65 0.24 25)"
                : b.tone === "warning"
                ? "oklch(0.80 0.17 75)"
                : "oklch(0.55 0.22 260)"
            }
            strokeOpacity="0.6"
          />
          <circle
            cx={b.cx}
            cy={b.cy}
            r="2.4"
            fill={
              b.tone === "danger"
                ? "oklch(0.65 0.24 25)"
                : b.tone === "warning"
                ? "oklch(0.80 0.17 75)"
                : "oklch(0.55 0.22 260)"
            }
          />
        </motion.g>
      ))}
    </svg>
  );
}
