import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Mail,
  Link2,
  KeyRound,
  Skull,
  Bell,
  Search,
  Home,
  Compass,
  FlaskConical,
  User,
  Trophy,
  Target,
  Crosshair,
  FileSearch,
  FolderLock,
  GraduationCap,
  Activity,
  Lock,
  PlayCircle,
  Sparkles,
  Radar,
  Fingerprint,
  ShieldAlert,
  CircleDot,
  ChevronLeft,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "ForenShield — Mission Control" },
      {
        name: "description",
        content:
          "ForenShield mobile — splash, onboarding, and mission control for cyber investigators in training.",
      },
      { name: "theme-color", content: "#020617" },
    ],
  }),
  component: AppExperience,
});

/* ============================================================
   PHASED EXPERIENCE
   ============================================================ */
type Phase = "splash" | "onboarding" | "home";

function AppExperience() {
  const [phase, setPhase] = useState<Phase>("splash");

  // Splash auto-advances to onboarding
  useEffect(() => {
    if (phase !== "splash") return;
    const t = setTimeout(() => setPhase("onboarding"), 3400);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="min-h-svh w-full bg-background text-foreground flex justify-center">
      {/* Phone frame on larger viewports; edge-to-edge on phones */}
      <div className="relative w-full max-w-[440px] min-h-svh overflow-hidden">
        {/* Ambient field */}
        <AmbientField />

        {phase === "splash" && <Splash onSkip={() => setPhase("onboarding")} />}
        {phase === "onboarding" && (
          <Onboarding onDone={() => setPhase("home")} />
        )}
        {phase === "home" && (
          <HomeScreen
            onReset={() => setPhase("splash")}
            onReplayOnboarding={() => setPhase("onboarding")}
          />
        )}
      </div>
    </div>
  );
}

/* ============================================================
   AMBIENT FIELD — soft cyber atmosphere behind every phase
   ============================================================ */
function AmbientField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-90"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute inset-0 grid-bg opacity-[0.12]" />
      <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
    </div>
  );
}

/* ============================================================
   STATUS BAR — fake iOS-style time + signals
   ============================================================ */
function StatusBar({ tone = "light" }: { tone?: "light" | "dim" }) {
  return null;
}

/* ============================================================
   SPLASH
   ============================================================ */
function Splash({ onSkip }: { onSkip: () => void }) {
  const [pct, setPct] = useState(0);
  const phases = [
    "Booting forensic kernel",
    "Verifying evidence vault",
    "Connecting to case grid",
    "Initializing investigation environment",
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => {
        const next = Math.min(100, p + Math.random() * 9 + 3);
        return next;
      });
    }, 110);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setStep(Math.min(phases.length - 1, Math.floor((pct / 100) * phases.length)));
  }, [pct, phases.length]);

  return (
    <div className="relative z-10 flex min-h-svh flex-col">
      <StatusBar />

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Animated shield */}
        <div className="relative h-56 w-56">
          {/* radar rings */}
          <div className="absolute inset-0 rounded-full border border-primary/20" />
          <div className="absolute inset-4 rounded-full border border-primary/15" />
          <div className="absolute inset-10 rounded-full border border-primary/10" />
          {/* radar pulse */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[#2F81F7]/30"
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", repeatDelay: 1 }}
          />
          {/* pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/50"
            animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* glow */}
          <div className="absolute inset-6 rounded-full bg-primary/10 blur-2xl" />
          {/* shield core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative h-28 w-28 rounded-3xl glass-strong glow-cyan flex items-center justify-center"
              animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShieldCheck className="h-12 w-12 text-primary" />
              {/* scan line */}
              <div className="absolute inset-x-2 top-2 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
            </motion.div>
          </div>
        </div>


      </div>

      {/* Boot console */}
      <div className="px-8 pb-12">
        <div className="rounded-2xl glass-strong p-4">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-2">
              <Radar className="h-3 w-3 text-primary animate-pulse-glow" />
              {phases[step]}
            </span>
            <span className="text-primary">{Math.floor(pct)}%</span>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
          <button
            onClick={onSkip}
            className="mt-3 w-full text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 hover:text-primary transition"
          >
            Tap to skip
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ONBOARDING — 3 swipeable scenes
   ============================================================ */
const ONBOARDING = [
  {
    eyebrow: "MISSION 01",
    title: "Experience Real Cyber Attacks",
    body: "Step into realistic attack simulations — phishing, smishing, social engineering — engineered from real-world incidents.",
    scene: <SceneAttack />,
  },
  {
    eyebrow: "MISSION 02",
    title: "Investigate Digital Evidence",
    body: "Analyze screenshots, emails, URLs, messages, and system logs on an interactive forensics board.",
    scene: <SceneBoard />,
  },
  {
    eyebrow: "MISSION 03",
    title: "Solve Cybercrime Cases",
    body: "Think like a cyber investigator. Connect the dots, expose the threat actor, file your verdict.",
    scene: <SceneCaseFiles />,
  },
];

function Onboarding({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const isLast = i === ONBOARDING.length - 1;
  const slide = ONBOARDING[i];

  return (
    <div className="relative z-10 flex min-h-svh flex-col">
      <StatusBar />

      <div className="flex items-center justify-between px-6 pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
          {slide.eyebrow}
        </span>
        <button
          onClick={onDone}
          className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-white transition"
        >
          Skip
        </button>
      </div>

      {/* Animated scene */}
      <div key={i} className="px-6 mt-6 animate-fade-up">
        <div className="relative h-[320px] rounded-3xl glass-strong overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,oklch(0.52_0.25_295/0.18),transparent_60%)]" />
          {slide.scene}
        </div>
      </div>

      {/* Copy */}
      <div key={`copy-${i}`} className="px-6 mt-8 animate-fade-up">
        <h2 className="font-display text-[28px] leading-tight font-bold text-white tracking-tight">
          {slide.title}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          {slide.body}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto px-6 pb-10 pt-6">
        {/* progress dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {ONBOARDING.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Go to slide ${k + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                k === i ? "w-8 bg-primary" : "w-1.5 bg-white/15"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {i > 0 && (
            <button
              onClick={() => setI((p) => p - 1)}
              className="h-14 w-14 rounded-2xl glass-strong flex items-center justify-center text-white/80 hover:text-primary transition"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <button
            onClick={() => (isLast ? onDone() : setI((p) => p + 1))}
            className="group relative flex-1 h-14 rounded-2xl bg-primary text-primary-foreground font-semibold tracking-tight overflow-hidden glow-cyan"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLast ? "Enter Lab" : "Continue"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---- Onboarding scenes ---- */
function SceneAttack() {
  return (
    <div className="relative h-full w-full p-5 flex items-center justify-center">
      <div className="relative w-full max-w-xs">
        {/* phishing notification */}
        <div className="rounded-2xl glass-strong border border-danger/20 overflow-hidden shadow-elevated">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-danger/5">
            <Mail className="h-3.5 w-3.5 text-danger" />
            <span className="font-mono text-[10px] tracking-widest text-danger">
              INCOMING · SUSPICIOUS
            </span>
            <motion.span
              className="ml-auto h-1.5 w-1.5 rounded-full bg-danger"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </div>
          <div className="p-4 space-y-1.5">
            <div className="text-[11px] font-mono text-muted-foreground">From</div>
            <div className="text-sm text-white truncate">
              security-alerts@payp<span className="text-danger">aI</span>.com
            </div>
            <div className="pt-2 mt-2 border-t border-white/5 text-sm text-white/80 leading-snug">
              Your account has been suspended. Verify now at{" "}
              <span className="text-danger underline decoration-dotted">
                hxxps://verify-paypaI.app
              </span>
            </div>
          </div>
        </div>
        {/* threat tag */}
        <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-danger text-white text-[10px] font-mono uppercase tracking-widest shadow-elevated flex items-center gap-1.5">
          <Skull className="h-3 w-3" /> Threat
        </div>
        {/* scan beam */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
        {/* halo */}
        <div className="absolute -inset-4 rounded-3xl border border-primary/15 animate-pulse-glow pointer-events-none" />
      </div>
    </div>
  );
}

function SceneBoard() {
  return (
    <div className="relative h-full w-full p-5">
      <svg viewBox="0 0 320 280" className="absolute inset-0 h-full w-full" aria-hidden>
        <g stroke="oklch(0.86 0.16 210 / 0.4)" strokeWidth="1.2" fill="none">
          <path d="M 60 60 L 160 140" className="animate-data-flow" />
          <path d="M 260 50 L 160 140" className="animate-data-flow" style={{ animationDelay: "0.4s" }} />
          <path d="M 60 220 L 160 140" className="animate-data-flow" style={{ animationDelay: "0.8s" }} />
          <path d="M 260 230 L 160 140" className="animate-data-flow" style={{ animationDelay: "1.2s" }} />
        </g>
      </svg>
      <BoardChip className="absolute left-3 top-6" icon={<Mail className="h-3 w-3" />} label="Email" />
      <BoardChip className="absolute right-3 top-4" icon={<Link2 className="h-3 w-3" />} label="URL" tone="warning" />
      <BoardChip className="absolute left-3 bottom-6" icon={<KeyRound className="h-3 w-3" />} label="Creds" tone="danger" />
      <BoardChip className="absolute right-3 bottom-4" icon={<FileSearch className="h-3 w-3" />} label="Logs" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-2xl glass-strong border border-primary/30 glow-cyan flex flex-col items-center justify-center">
        <Fingerprint className="h-6 w-6 text-primary" />
        <span className="mt-1 font-mono text-[9px] tracking-widest text-muted-foreground">SUBJECT</span>
      </div>
    </div>
  );
}

function BoardChip({
  className = "",
  icon,
  label,
  tone = "primary",
}: {
  className?: string;
  icon: ReactNode;
  label: string;
  tone?: "primary" | "warning" | "danger";
}) {
  const ring =
    tone === "danger" ? "border-danger/30 text-danger" : tone === "warning" ? "border-warning/30 text-warning" : "border-primary/30 text-primary";
  return (
    <div className={`flex items-center gap-1.5 rounded-xl glass-strong border px-2.5 py-1.5 ${ring} ${className}`}>
      {icon}
      <span className="text-[10px] font-mono uppercase tracking-widest">{label}</span>
    </div>
  );
}

function SceneCaseFiles() {
  const files = [
    { code: "CF-091", title: "UPI Fraud", tag: "Financial", tone: "danger" as const },
    { code: "CF-058", title: "Phishing Wave", tag: "Email", tone: "warning" as const },
    { code: "CF-027", title: "Identity Theft", tag: "OSINT", tone: "primary" as const },
  ];
  return (
    <div className="relative h-full w-full p-5 flex items-center">
      <div className="relative w-full">
        {files.map((f, k) => (
          <div
            key={f.code}
            className="absolute left-1/2 w-[78%] rounded-2xl glass-strong p-4 shadow-elevated"
            style={{
              transform: `translateX(-50%) translateY(${k * 14}px) rotate(${(k - 1) * 3}deg)`,
              top: `${k * 16}px`,
              zIndex: 10 - k,
            }}
          >
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span>{f.code}</span>
              <span
                className={`px-1.5 py-0.5 rounded ${
                  f.tone === "danger"
                    ? "bg-danger/15 text-danger"
                    : f.tone === "warning"
                    ? "bg-warning/15 text-warning"
                    : "bg-primary/15 text-primary"
                }`}
              >
                {f.tag}
              </span>
            </div>
            <div className="mt-2 text-base font-semibold text-white">{f.title}</div>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="h-1 flex-1 rounded-full bg-white/10" />
              <span className="h-1 flex-1 rounded-full bg-white/10" />
              <span className="h-1 flex-1 rounded-full bg-primary/60" />
            </div>
          </div>
        ))}
        {/* stamp */}
        <div className="absolute right-2 top-0 h-20 w-20 rotate-12 rounded-full border-2 border-primary/40 flex items-center justify-center">
          <span className="font-mono text-[9px] tracking-widest text-primary text-center leading-tight">
            CLASSIFIED
            <br />
            LEVEL 03
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HOME SCREEN — Mission Control
   ============================================================ */
function HomeScreen({
  onReset,
  onReplayOnboarding,
}: {
  onReset: () => void;
  onReplayOnboarding: () => void;
}) {
  return (
    <div className="relative z-10 flex min-h-svh flex-col pb-28">
      <StatusBar />
      <Header onReset={onReset} onReplayOnboarding={onReplayOnboarding} />

      <div className="mt-2 space-y-6">
        <CaseOfTheDay />
        <QuickActions />
        <ActiveCases />
        <InvestigationBoard />
        <CyberTraining />
        <Achievements />
      </div>

      <BottomNav />
    </div>
  );
}

function Header({
  onReset,
  onReplayOnboarding,
}: {
  onReset: () => void;
  onReplayOnboarding: () => void;
}) {
  return (
    <div className="px-5 pt-3">
      <div className="flex items-center gap-3">
        {/* avatar */}
        <button className="relative h-12 w-12 rounded-2xl glass-strong overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40" />
          <span className="relative font-display font-bold text-lg text-white">A</span>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-background" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" /> Agent · LVL 07
          </div>
          <div className="text-[17px] font-semibold text-white truncate">
            Welcome back, Aarav
          </div>
        </div>
        <button
          onClick={onReplayOnboarding}
          className="h-10 w-10 rounded-xl glass-strong flex items-center justify-center text-muted-foreground hover:text-primary transition"
          aria-label="Replay onboarding"
        >
          <Search className="h-4 w-4" />
        </button>
        <button
          onClick={onReset}
          className="relative h-10 w-10 rounded-xl glass-strong flex items-center justify-center text-muted-foreground hover:text-primary transition"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <motion.span
            className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-danger"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </button>
      </div>

      {/* rank ribbon */}
      <div className="mt-4 rounded-2xl glass p-3 flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <ShieldCheck className="h-4 w-4 text-background" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              Threat Hunter
            </span>
            <span className="text-[11px] font-mono text-primary">
              4,820 / 6,000 XP
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              style={{ width: "80%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Case of the Day ---- */
function CaseOfTheDay() {
  return (
    <div className="px-5">
      <SectionLabel icon={<Crosshair className="h-3 w-3" />} title="Case of the Day" />
      <div className="mt-3 relative rounded-3xl overflow-hidden shadow-elevated">
        {/* artwork */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.21_0.04_265),oklch(0.13_0.03_265))]" />
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent animate-scan" />

        <div className="relative p-5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-danger/15 text-danger font-mono text-[10px] tracking-widest">
              ACTIVE · 24H
            </span>
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
              CASE #2041
            </span>
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold text-white leading-tight">
            UPI Fraud Investigation
          </h3>
          <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
            A victim's wallet drained in 4 minutes. Trace the SIM swap, follow
            the mule accounts.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <Stat label="Loss" value="₹25,000" tone="danger" />
            <Stat label="Evidence" value="4 Files" />
            <Stat label="Difficulty" value="Medium" tone="warning" />
          </div>

          <button className="mt-5 group w-full h-12 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 glow-cyan">
            <PlayCircle className="h-4 w-4" />
            Start Investigation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone = "primary",
}: {
  label: string;
  value: string;
  tone?: "primary" | "danger" | "warning";
}) {
  const c =
    tone === "danger"
      ? "text-danger"
      : tone === "warning"
      ? "text-warning"
      : "text-primary";
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2.5">
      <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className={`mt-0.5 text-sm font-semibold ${c}`}>{value}</div>
    </div>
  );
}

/* ---- Quick Actions ---- */
function QuickActions() {
  // Top-line tiles with live state — alerts pulse, progress is shown.
  const tiles: Array<{
    icon: typeof Target;
    label: string;
    sub: string;
    tone: "primary" | "secondary" | "danger" | "warning" | "success";
    to: "/simulate" | "/investigate" | "/academy" | "/app";
    pct?: number;
    badge?: { text: string; pulse?: boolean };
  }> = [
    {
      icon: Target,
      label: "Attack Sims",
      sub: "6 scenarios live",
      tone: "danger",
      to: "/simulate",
      badge: { text: "NEW", pulse: true },
    },
    {
      icon: FlaskConical,
      label: "Investigation Lab",
      sub: "FS-001 · 62% done",
      tone: "primary",
      to: "/investigate",
      pct: 62,
    },
    {
      icon: GraduationCap,
      label: "Cyber Academy",
      sub: "Lesson 4 of 8",
      tone: "warning",
      to: "/academy",
      pct: 50,
    },
    {
      icon: FileSearch,
      label: "Evidence Analyzer",
      sub: "12 items in vault",
      tone: "secondary",
      to: "/investigate",
    },
    {
      icon: FolderLock,
      label: "Case Files",
      sub: "4 active · 1 sealed",
      tone: "primary",
      to: "/investigate",
    },
    {
      icon: Activity,
      label: "Progress Tracker",
      sub: "Rank LVL 07",
      tone: "success",
      to: "/app",
    },
  ];
  const toneCls: Record<string, string> = {
    primary: "text-primary bg-primary/10 border-primary/25",
    secondary: "text-secondary bg-secondary/15 border-secondary/30",
    danger: "text-danger bg-danger/10 border-danger/25",
    warning: "text-warning bg-warning/10 border-warning/25",
    success: "text-success bg-success/10 border-success/25",
  };
  const barCls: Record<string, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    danger: "bg-danger",
    warning: "bg-warning",
    success: "bg-success",
  };

  return (
    <div className="px-5">
      <SectionLabel
        icon={<Sparkles className="h-3 w-3" />}
        title="Quick Actions"
        right="Live"
      />

      {/* Resume rail — one-click jumps into the latest lesson & last sim */}
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <Link
          to="/academy"
          className="group relative overflow-hidden rounded-2xl glass-strong border border-warning/25 p-3 flex items-center gap-3 hover:border-warning/50 transition"
        >
          <span className="absolute -top-8 -right-8 h-20 w-20 rounded-full bg-warning/15 blur-2xl" />
          <span className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-warning/70 to-transparent animate-scan" />
          <span className="relative h-10 w-10 rounded-xl bg-warning/15 border border-warning/30 flex items-center justify-center text-warning">
            <GraduationCap className="h-4 w-4" />
          </span>
          <span className="relative min-w-0">
            <span className="block text-[9px] font-mono tracking-[0.18em] text-warning">
              RESUME LESSON
            </span>
            <span className="block text-[12px] font-semibold text-foreground truncate">
              OTP & UPI Fraud
            </span>
            <span className="block text-[10px] text-muted-foreground">
              Module 4 · 3 min left
            </span>
          </span>
          <ArrowRight className="relative ml-auto h-4 w-4 text-warning/70 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <Link
          to="/simulate"
          className="group relative overflow-hidden rounded-2xl glass-strong border border-danger/25 p-3 flex items-center gap-3 hover:border-danger/50 transition"
        >
          <span className="absolute -top-8 -right-8 h-20 w-20 rounded-full bg-danger/15 blur-2xl" />
          <span className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-danger/70 to-transparent animate-scan" />
          <span className="relative h-10 w-10 rounded-xl bg-danger/15 border border-danger/30 flex items-center justify-center text-danger">
            <Zap className="h-4 w-4" />
          </span>
          <span className="relative min-w-0">
            <span className="block text-[9px] font-mono tracking-[0.18em] text-danger">
              REPLAY SIM
            </span>
            <span className="block text-[12px] font-semibold text-foreground truncate">
              CEO Wire Transfer
            </span>
            <span className="block text-[10px] text-muted-foreground">
              Best · Partial save
            </span>
          </span>
          <ArrowRight className="relative ml-auto h-4 w-4 text-danger/70 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Tile grid */}
      <div className="mt-3 grid grid-cols-3 gap-2.5">
        {tiles.map((it) => {
          const hasAlert = it.badge?.pulse;
          return (
            <Link
              key={it.label}
              to={it.to}
              className="group relative aspect-[1/1.08] rounded-2xl glass p-3 flex flex-col items-start justify-between text-left hover:border-primary/30 transition overflow-hidden"
            >
              {hasAlert && (
                <>
                  <span className="absolute inset-0 ring-1 ring-inset ring-danger/30 rounded-2xl animate-pulse-glow pointer-events-none" />
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-danger opacity-70 animate-ping-soft" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
                  </span>
                </>
              )}
              <span
                className={`h-9 w-9 rounded-xl flex items-center justify-center border ${toneCls[it.tone]}`}
              >
                <it.icon className="h-4 w-4" />
              </span>
              <span className="w-full">
                <span className="block text-[12px] font-semibold leading-tight text-foreground">
                  {it.label}
                </span>
                <span className="block text-[9.5px] font-mono text-muted-foreground truncate">
                  {it.sub}
                </span>
                {typeof it.pct === "number" && (
                  <span className="mt-1.5 block h-1 w-full rounded-full bg-white/5 overflow-hidden">
                    <span
                      className={`block h-full rounded-full ${barCls[it.tone]} transition-[width] duration-700`}
                      style={{ width: `${it.pct}%` }}
                    />
                  </span>
                )}
                {it.badge?.text && !it.pct && (
                  <span
                    className={`mt-1.5 inline-block px-1.5 py-0.5 rounded text-[8.5px] font-mono tracking-[0.18em] border ${toneCls[it.tone]}`}
                  >
                    {it.badge.text}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ---- Active Cases ---- */
function ActiveCases() {
  const cases = [
    {
      n: "#001",
      title: "Phishing Investigation",
      tag: "Email Forensics",
      status: "In Progress",
      tone: "primary" as const,
      pct: 62,
    },
    {
      n: "#002",
      title: "Fake Job Scam",
      tag: "Social Engineering",
      status: "Available",
      tone: "success" as const,
      pct: 0,
    },
    {
      n: "#003",
      title: "Identity Theft",
      tag: "OSINT",
      status: "Locked",
      tone: "muted" as const,
      pct: 0,
      locked: true,
    },
  ];
  return (
    <div>
      <div className="px-5 flex items-center justify-between">
        <SectionLabel icon={<FolderLock className="h-3 w-3" />} title="Active Cases" />
        <button className="text-[11px] font-mono uppercase tracking-widest text-primary flex items-center gap-1">
          All <ChevronRight className="h-3 w-3" />
        </button>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-thin scroll-smooth snap-x">
        {cases.map((c) => (
          <article
            key={c.n}
            className={`relative snap-start shrink-0 w-[260px] rounded-2xl glass-strong p-4 overflow-hidden ${
              c.locked ? "opacity-70" : ""
            }`}
          >
            <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                CASE {c.n}
              </span>
              <StatusPill status={c.status} tone={c.tone} />
            </div>
            <h4 className="relative mt-3 text-base font-semibold text-white leading-snug">
              {c.title}
            </h4>
            <div className="relative mt-1 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              {c.tag}
            </div>
            {!c.locked ? (
              <div className="relative mt-4">
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <span>Progress</span>
                  <span className="text-primary">{c.pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
                <button className="mt-3 w-full h-9 rounded-xl bg-primary/15 text-primary text-xs font-semibold border border-primary/25 hover:bg-primary/25 transition">
                  {c.pct > 0 ? "Resume" : "Begin"}
                </button>
              </div>
            ) : (
              <div className="relative mt-4 flex items-center gap-2 rounded-xl border border-dashed border-white/10 p-3">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground">
                  Reach Forensics Expert to unlock
                </span>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

function StatusPill({
  status,
  tone,
}: {
  status: string;
  tone: "primary" | "success" | "muted";
}) {
  const cls =
    tone === "primary"
      ? "text-primary bg-primary/10 border-primary/25"
      : tone === "success"
      ? "text-success bg-success/10 border-success/25"
      : "text-muted-foreground bg-white/5 border-white/10";
  return (
    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-mono tracking-widest ${cls}`}>
      <motion.span
        className="h-1 w-1 rounded-full bg-current"
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      {status}
    </span>
  );
}

/* ---- Investigation Board ---- */
function InvestigationBoard() {
  const nodes = [
    { icon: Mail, label: "Inbound Email", sub: "billing@payp**.com" },
    { icon: Link2, label: "Suspicious Link", sub: "hxxps://paypaI…" },
    { icon: KeyRound, label: "Fake Login Page", sub: "TLS · self-signed" },
    { icon: Skull, label: "Credential Theft", sub: "exfil → 203.0.***.41" },
  ];
  return (
    <div className="px-5">
      <SectionLabel icon={<ShieldAlert className="h-3 w-3" />} title="Investigation Board" right="Live Trace" />
      <div className="mt-3 relative rounded-2xl glass-strong p-4 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-scan" />
        <div className="relative space-y-2.5">
          {nodes.map((n, i) => (
            <div key={n.label}>
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <div
                  className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                    i === nodes.length - 1
                      ? "bg-danger/15 text-danger"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <n.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-white">{n.label}</div>
                  <div className="text-[11px] font-mono text-muted-foreground truncate">
                    {n.sub}
                  </div>
                </div>
                <motion.span
            className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
              </div>
              {i < nodes.length - 1 && (
                <div className="flex justify-center py-1">
                  <svg width="2" height="14" className="overflow-visible">
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="14"
                      stroke="oklch(0.86 0.16 210 / 0.6)"
                      strokeWidth="1.2"
                      strokeDasharray="2 3"
                      className="animate-data-flow"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Cyber Training ---- */
function CyberTraining() {
  return (
    <div className="px-5">
      <SectionLabel icon={<GraduationCap className="h-3 w-3" />} title="Cyber Training" />
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <Metric icon={<Target className="h-4 w-4" />} value="24" label="Simulations" sub="Completed" tone="danger" />
        <Metric icon={<Sparkles className="h-4 w-4" />} value="87%" label="Awareness" sub="Score" tone="primary" />
        <Metric icon={<FileSearch className="h-4 w-4" />} value="72%" label="Investigation" sub="Score" tone="secondary" />
        <Metric icon={<Trophy className="h-4 w-4" />} value="LVL 07" label="Threat Hunter" sub="Current Rank" tone="warning" />
      </div>
    </div>
  );
}

function Metric({
  icon,
  value,
  label,
  sub,
  tone,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  sub: string;
  tone: "primary" | "secondary" | "danger" | "warning";
}) {
  const cls = {
    primary: "text-primary bg-primary/10 border-primary/20",
    secondary: "text-secondary bg-secondary/15 border-secondary/25",
    danger: "text-danger bg-danger/10 border-danger/20",
    warning: "text-warning bg-warning/10 border-warning/20",
  }[tone];
  return (
    <div className="rounded-2xl glass p-3.5">
      <div className="flex items-center justify-between">
        <span className={`h-9 w-9 rounded-xl flex items-center justify-center border ${cls}`}>
          {icon}
        </span>
        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
          {sub}
        </span>
      </div>
      <div className="mt-3 text-2xl font-display font-bold text-white tracking-tight">
        {value}
      </div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

/* ---- Achievements ---- */
function Achievements() {
  const list = [
    { icon: CircleDot, label: "Cyber Rookie", earned: true },
    { icon: Crosshair, label: "Threat Hunter", earned: true, active: true },
    { icon: Fingerprint, label: "Digital Detective", earned: false, pct: 60 },
    { icon: FileSearch, label: "Forensics Expert", earned: false, pct: 24 },
    { icon: Shield, label: "Cyber Guardian", earned: false, pct: 5 },
  ];
  return (
    <div>
      <div className="px-5">
        <SectionLabel icon={<Trophy className="h-3 w-3" />} title="Achievements" />
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto px-5 pb-3 snap-x">
        {list.map((a) => (
          <div
            key={a.label}
            className={`snap-start shrink-0 w-[120px] rounded-2xl p-3 flex flex-col items-center text-center border ${
              a.active
                ? "glass-strong border-primary/40 glow-cyan"
                : a.earned
                ? "glass border-white/10"
                : "border-white/5 bg-white/[0.02]"
            }`}
          >
            <div
              className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                a.earned
                  ? "bg-gradient-to-br from-primary to-secondary text-background"
                  : "bg-white/5 text-muted-foreground"
              }`}
            >
              <a.icon className="h-5 w-5" />
            </div>
            <div className="mt-2 text-[12px] font-semibold text-white leading-tight">
              {a.label}
            </div>
            {a.earned ? (
              <div className="mt-1 text-[9px] font-mono uppercase tracking-widest text-primary">
                Unlocked
              </div>
            ) : (
              <>
                <div className="mt-2 h-1 w-full rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary/60"
                    style={{ width: `${a.pct}%` }}
                  />
                </div>
                <div className="mt-1 text-[9px] font-mono text-muted-foreground">
                  {a.pct}%
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Bottom Nav ---- */
function BottomNav() {
  const items = [
    { icon: Home, label: "Home", active: true },
    { icon: Compass, label: "Cases" },
    { icon: FlaskConical, label: "Lab", primary: true },
    { icon: Trophy, label: "Ranks" },
    { icon: User, label: "Agent" },
  ];
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-30 px-3 pb-3">
      <div className="relative rounded-3xl glass-strong px-2 py-2 flex items-center justify-between shadow-elevated">
        {items.map((it) => {
          if (it.primary) {
            return (
              <button
                key={it.label}
                className="relative -mt-7 h-14 w-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center glow-cyan"
                aria-label={it.label}
              >
                <it.icon className="h-5 w-5" />
              </button>
            );
          }
          return (
            <button
              key={it.label}
              className={`flex-1 flex flex-col items-center gap-1 py-2 transition ${
                it.active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <it.icon className="h-4 w-4" />
              <span className="text-[9px] font-mono uppercase tracking-widest">
                {it.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ============================================================
   SHARED
   ============================================================ */
function SectionLabel({
  icon,
  title,
  right,
}: {
  icon: ReactNode;
  title: string;
  right?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="h-6 w-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </span>
        <h3 className="text-sm font-semibold text-white tracking-tight">
          {title}
        </h3>
      </div>
      {right && (
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-primary"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          {right}
        </span>
      )}
    </div>
  );
}

// Keep unused-import linter happy for icons that future iterations may use
void useRef;
