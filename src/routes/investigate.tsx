import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CASE_FILES,
  RANKS,
  type CaseFile,
  type Evidence,
  type Severity,
} from "@/lib/casefiles";

export const Route = createFileRoute("/investigate")({
  head: () => ({
    meta: [
      { title: "Investigation Lab — ForenShield" },
      {
        name: "description",
        content:
          "Enter the ForenShield Investigation Lab. Open active case files, analyze evidence, reconstruct the attack chain, and submit your forensic verdict.",
      },
      { property: "og:title", content: "Investigation Lab — ForenShield" },
      {
        property: "og:description",
        content:
          "Open case files, analyze evidence, reconstruct attack chains, and file forensic reports.",
      },
    ],
  }),
  component: InvestigatePage,
});

// ─────────────────────────────────────────────────────────────────────────────
// State machine for one investigation session
// ─────────────────────────────────────────────────────────────────────────────

type Phase =
  | "registry"
  | "briefing"
  | "evidence"
  | "analysis"
  | "timeline"
  | "verdict"
  | "report";

type SessionState = {
  caseId: string | null;
  phase: Phase;
  examined: Set<string>; // evidence ids opened
  clueHits: Set<string>; // "<evidenceId>::<clue>" toggled
  chainOrder: string[]; // ordering of timeline node ids picked by user
  verdict: string | null;
};

const SEV_TONE: Record<Severity, string> = {
  LOW: "text-emerald-400 border-emerald-400/40 bg-emerald-400/5",
  MEDIUM: "text-amber-300 border-amber-300/40 bg-amber-300/5",
  HIGH: "text-orange-400 border-orange-400/40 bg-orange-400/5",
  CRITICAL: "text-rose-400 border-rose-400/40 bg-rose-400/5",
};

const PHASES: { key: Phase; label: string; n: string }[] = [
  { key: "briefing", label: "Briefing", n: "01" },
  { key: "evidence", label: "Evidence", n: "02" },
  { key: "analysis", label: "Analysis", n: "03" },
  { key: "timeline", label: "Timeline", n: "04" },
  { key: "verdict", label: "Verdict", n: "05" },
  { key: "report", label: "Report", n: "06" },
];

function InvestigatePage() {
  const [state, setState] = useState<SessionState>({
    caseId: null,
    phase: "registry",
    examined: new Set(),
    clueHits: new Set(),
    chainOrder: [],
    verdict: null,
  });

  const activeCase = useMemo(
    () => CASE_FILES.find((c) => c.id === state.caseId) ?? null,
    [state.caseId],
  );

  const open = (id: string) =>
    setState({
      caseId: id,
      phase: "briefing",
      examined: new Set(),
      clueHits: new Set(),
      chainOrder: [],
      verdict: null,
    });

  const goto = (phase: Phase) => setState((s) => ({ ...s, phase }));

  return (
    <div className="min-h-screen bg-[#050816] text-white antialiased">
      <TopBar />
      {state.phase === "registry" || !activeCase ? (
        <Registry onOpen={open} />
      ) : (
        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-10">
          <CaseHeader c={activeCase} onExit={() => goto("registry")} />
          <PhaseRail phase={state.phase} onJump={goto} />
          <div className="mt-6">
            {state.phase === "briefing" && (
              <Briefing c={activeCase} onNext={() => goto("evidence")} />
            )}
            {state.phase === "evidence" && (
              <EvidenceCollection
                c={activeCase}
                examined={state.examined}
                onOpen={(id) =>
                  setState((s) => {
                    const next = new Set(s.examined);
                    next.add(id);
                    return { ...s, examined: next };
                  })
                }
                onNext={() => goto("analysis")}
              />
            )}
            {state.phase === "analysis" && (
              <AnalysisLab
                c={activeCase}
                clueHits={state.clueHits}
                onToggle={(k) =>
                  setState((s) => {
                    const next = new Set(s.clueHits);
                    if (next.has(k)) next.delete(k);
                    else next.add(k);
                    return { ...s, clueHits: next };
                  })
                }
                onNext={() => goto("timeline")}
              />
            )}
            {state.phase === "timeline" && (
              <TimelineBoard
                c={activeCase}
                order={state.chainOrder}
                setOrder={(o) => setState((s) => ({ ...s, chainOrder: o }))}
                onNext={() => goto("verdict")}
              />
            )}
            {state.phase === "verdict" && (
              <VerdictPanel
                c={activeCase}
                verdict={state.verdict}
                setVerdict={(v) => setState((s) => ({ ...s, verdict: v }))}
                onNext={() => goto("report")}
              />
            )}
            {state.phase === "report" && (
              <ForensicReport
                c={activeCase}
                state={state}
                onClose={() => goto("registry")}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#050816]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="relative grid h-8 w-8 place-items-center rounded-md border border-cyan-400/40 bg-cyan-400/10">
            <span className="absolute inset-0 animate-pulse rounded-md bg-cyan-400/10" />
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
            </svg>
          </div>
          <div>
            <div className="font-display text-sm font-bold tracking-[0.2em] text-white/90">
              FORENSHIELD
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/70">
              Investigation Lab · Classified
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-white/60">
          <Link to="/" className="rounded px-3 py-1.5 hover:bg-white/5">Mission Control</Link>
          <Link to="/app" className="rounded px-3 py-1.5 hover:bg-white/5">Field App</Link>
          <span className="rounded bg-cyan-400/10 px-3 py-1.5 text-cyan-300">Lab</span>
        </nav>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Registry — case files list
// ─────────────────────────────────────────────────────────────────────────────

function Registry({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      <div className="mb-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-300/80">
          Case Registry · Active Investigations
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Choose a case file.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/60">
          Each case is a real-world cybercrime modeled from NCRP filings and incident
          reports. Open a file to begin briefing, evidence collection, and forensic
          analysis.
        </p>
      </div>

      <RankStrip />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {CASE_FILES.map((c) => (
          <button
            key={c.id}
            onClick={() => onOpen(c.id)}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 text-left transition hover:border-cyan-400/40 hover:from-cyan-400/10"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest text-cyan-300/80">
                {c.id}
              </span>
              <span
                className={`rounded border px-2 py-0.5 font-mono text-[10px] tracking-widest ${SEV_TONE[c.severity]}`}
              >
                {c.severity}
              </span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">
              {c.title}
            </h3>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/40">
              {c.category} · {c.difficulty}
            </div>
            <p className="mt-3 text-sm text-white/65 line-clamp-3">{c.incident}</p>
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-white/50">
              <span className="font-mono">{c.evidence.length} evidence items</span>
              <span className="font-mono text-cyan-300/80">+{c.xp} XP</span>
            </div>
            <div className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-cyan-300 opacity-0 transition group-hover:opacity-100">
              Open file →
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}

function RankStrip() {
  // Mock progress for immersion — Threat Hunter tier
  const current = RANKS[1];
  const next = RANKS[2];
  const xp = 1620;
  const pct = Math.min(
    100,
    Math.round(((xp - current.xp) / (next.xp - current.xp)) * 100),
  );
  return (
    <div className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:grid-cols-3">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          Agent
        </div>
        <div className="mt-1 font-display text-lg font-semibold">Agent · K. Verma</div>
        <div className="font-mono text-[11px] text-cyan-300/80">
          Clearance: AMBER · Lab access granted
        </div>
      </div>
      <div className="sm:col-span-2">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-white/50">
          <span>Rank · {current.name}</span>
          <span>{xp} / {next.xp} XP → {next.name}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-400"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest">
          {["Phish Hunter", "Header Reader", "OSINT I"].map((b) => (
            <span
              key={b}
              className="rounded border border-cyan-400/30 bg-cyan-400/5 px-2 py-1 text-cyan-200/90"
            >
              ✦ {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Case header + phase rail
// ─────────────────────────────────────────────────────────────────────────────

function CaseHeader({ c, onExit }: { c: CaseFile; onExit: () => void }) {
  return (
    <div className="mt-8 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-300/80">
          <span>{c.id}</span>
          <span className="text-white/30">·</span>
          <span>{c.category}</span>
          <span
            className={`ml-2 rounded border px-2 py-0.5 ${SEV_TONE[c.severity]}`}
          >
            {c.severity}
          </span>
        </div>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {c.title}
        </h2>
        <div className="mt-1 text-sm text-white/55">
          Victim: <span className="text-white/80">{c.victim.name}</span> ·{" "}
          {c.victim.profile}
        </div>
      </div>
      <button
        onClick={onExit}
        className="self-start rounded-md border border-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white/70 hover:bg-white/5"
      >
        ← Close case
      </button>
    </div>
  );
}

function PhaseRail({
  phase,
  onJump,
}: {
  phase: Phase;
  onJump: (p: Phase) => void;
}) {
  const idx = PHASES.findIndex((p) => p.key === phase);
  return (
    <ol className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
      {PHASES.map((p, i) => {
        const active = p.key === phase;
        const done = i < idx;
        return (
          <li key={p.key}>
            <button
              onClick={() => done && onJump(p.key)}
              className={`group relative w-full overflow-hidden rounded-md border px-3 py-2 text-left transition ${
                active
                  ? "border-cyan-400/60 bg-cyan-400/10"
                  : done
                  ? "border-white/15 bg-white/[0.03] hover:bg-white/5"
                  : "border-white/10 bg-white/[0.01] opacity-50"
              }`}
            >
              <div className="font-mono text-[10px] tracking-widest text-white/40">
                {p.n}
              </div>
              <div
                className={`font-display text-sm font-semibold ${
                  active ? "text-cyan-200" : "text-white/85"
                }`}
              >
                {p.label}
              </div>
              {active && (
                <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 01 — Briefing
// ─────────────────────────────────────────────────────────────────────────────

function Briefing({ c, onNext }: { c: CaseFile; onNext: () => void }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      <article className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:repeating-linear-gradient(0deg,transparent_0_2px,rgba(255,255,255,0.03)_2px_3px)]" />
        <div className="relative">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-rose-400/80">
            ◉ Classified Briefing
          </div>
          <h3 className="mt-2 font-display text-xl font-semibold">
            Mission briefing for {c.id}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-white/80">{c.briefing}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Stat label="Incident summary" value={c.incident} />
            <Stat
              label="Threat classification"
              value={c.threatClassification}
              tone="cyan"
            />
          </div>

          <div className="mt-6">
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              Learning Objectives
            </div>
            <ul className="mt-2 space-y-1.5 text-sm text-white/80">
              {c.objectives.map((o) => (
                <li key={o} className="flex gap-2">
                  <span className="mt-2 inline-block h-1 w-1 rounded-full bg-cyan-400" />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={onNext}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-cyan-400 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#050816] hover:bg-cyan-300"
          >
            Accept mission · Enter evidence room →
          </button>
        </div>
      </article>

      <aside className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          Case meta
        </div>
        <dl className="mt-3 space-y-3 text-sm">
          <Row k="Case ID" v={c.id} />
          <Row k="Severity" v={c.severity} />
          <Row k="Difficulty" v={c.difficulty} />
          <Row k="Evidence count" v={`${c.evidence.length} items`} />
          <Row k="Reward" v={`+${c.xp} XP`} />
        </dl>
        <div className="mt-5 rounded-md border border-amber-300/30 bg-amber-300/5 p-3 font-mono text-[11px] leading-relaxed text-amber-100/80">
          ▲ All findings are sealed under the ForenShield evidence integrity protocol.
          Do not exfiltrate artefacts beyond this lab.
        </div>
      </aside>
    </section>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "cyan";
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.02] p-3">
      <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        {label}
      </div>
      <div
        className={`mt-1 text-sm ${
          tone === "cyan" ? "text-cyan-200" : "text-white/85"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
      <dt className="font-mono text-[11px] uppercase tracking-widest text-white/40">
        {k}
      </dt>
      <dd className="text-sm text-white/85">{v}</dd>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 02 — Evidence collection
// ─────────────────────────────────────────────────────────────────────────────

const EV_ICONS: Record<Evidence["type"], string> = {
  email: "✉",
  message: "💬",
  callLog: "📞",
  website: "◐",
  screenshot: "▢",
  document: "📄",
  transaction: "₹",
  social: "@",
};

function EvidenceCollection({
  c,
  examined,
  onOpen,
  onNext,
}: {
  c: CaseFile;
  examined: Set<string>;
  onOpen: (id: string) => void;
  onNext: () => void;
}) {
  const [active, setActive] = useState<string | null>(c.evidence[0]?.id ?? null);
  const ev = c.evidence.find((e) => e.id === active);
  const pct = Math.round((examined.size / c.evidence.length) * 100);

  return (
    <section className="grid gap-5 lg:grid-cols-[280px_1fr]">
      <aside className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-center justify-between px-2 pb-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Evidence vault
          </span>
          <span className="font-mono text-[10px] text-cyan-300/80">{pct}%</span>
        </div>
        <div className="mb-3 h-1 overflow-hidden rounded bg-white/5">
          <div
            className="h-full bg-cyan-400/70 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <ul className="space-y-1">
          {c.evidence.map((e) => {
            const open = examined.has(e.id);
            const sel = active === e.id;
            return (
              <li key={e.id}>
                <button
                  onClick={() => {
                    setActive(e.id);
                    onOpen(e.id);
                  }}
                  className={`flex w-full items-start gap-2 rounded-md border px-2.5 py-2 text-left transition ${
                    sel
                      ? "border-cyan-400/40 bg-cyan-400/10"
                      : "border-transparent hover:bg-white/5"
                  }`}
                >
                  <span className="mt-0.5 grid h-6 w-6 place-items-center rounded border border-white/10 bg-black/30 font-mono text-[11px] text-cyan-300">
                    {EV_ICONS[e.type]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-white/40">
                        {e.id}
                      </span>
                      {open ? (
                        <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-300">
                          opened
                        </span>
                      ) : (
                        <span className="font-mono text-[9px] uppercase tracking-widest text-amber-300/80">
                          sealed
                        </span>
                      )}
                    </div>
                    <div className="truncate text-sm text-white/85">{e.label}</div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
        <button
          disabled={examined.size < c.evidence.length}
          onClick={onNext}
          className="mt-4 w-full rounded-md bg-cyan-400 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#050816] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
        >
          {examined.size < c.evidence.length
            ? `Open all evidence (${examined.size}/${c.evidence.length})`
            : "Continue → Analysis"}
        </button>
      </aside>

      <div className="min-h-[420px] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-black/40 to-black/10">
        {ev ? (
          <div className="flex h-full flex-col">
            <header className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  {ev.id} · {ev.type} · {ev.timestamp}
                </div>
                <div className="font-display text-sm font-semibold">{ev.label}</div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                source: {ev.source}
              </span>
            </header>
            <pre className="m-5 flex-1 overflow-auto rounded-md border border-white/10 bg-black/40 p-4 font-mono text-[12.5px] leading-relaxed text-white/85 whitespace-pre-wrap">
              {ev.body}
            </pre>
            <footer className="border-t border-white/10 bg-white/[0.02] px-5 py-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                Examiner note
              </div>
              <p className="mt-1 text-xs text-white/65">
                Catalogued. Hidden clues will become tagable in the Analysis phase.
              </p>
            </footer>
          </div>
        ) : null}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 03 — Analysis (clue tagging)
// ─────────────────────────────────────────────────────────────────────────────

function AnalysisLab({
  c,
  clueHits,
  onToggle,
  onNext,
}: {
  c: CaseFile;
  clueHits: Set<string>;
  onToggle: (k: string) => void;
  onNext: () => void;
}) {
  // Distractor clues mixed with real ones — investigator must pick the truth.
  const distractors = [
    "browser autofill enabled",
    "user is left-handed",
    "default ringtone",
    "phone in dark mode",
  ];
  const totalReal = c.evidence.reduce((n, e) => n + e.clues.length, 0);
  const hits = Array.from(clueHits).filter((k) => {
    const [eid, clue] = k.split("::");
    const ev = c.evidence.find((x) => x.id === eid);
    return ev?.clues.includes(clue);
  }).length;

  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        {c.evidence.map((ev) => {
          const mixed = [...ev.clues, distractors[ev.id.charCodeAt(1) % distractors.length]];
          return (
            <article
              key={ev.id}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
            >
              <div className="flex items-center justify-between">
                <div className="font-display text-sm font-semibold">
                  {ev.id} · {ev.label}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Tag forensic clues
                </span>
              </div>
              <p className="mt-2 line-clamp-2 font-mono text-[11px] text-white/55">
                {ev.body}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {mixed.map((clue) => {
                  const key = `${ev.id}::${clue}`;
                  const active = clueHits.has(key);
                  const real = ev.clues.includes(clue);
                  return (
                    <button
                      key={key}
                      onClick={() => onToggle(key)}
                      className={`rounded-full border px-3 py-1 font-mono text-[11px] transition ${
                        active
                          ? real
                            ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-200"
                            : "border-rose-400/60 bg-rose-400/10 text-rose-200"
                          : "border-white/15 bg-white/[0.02] text-white/70 hover:border-cyan-300/40"
                      }`}
                    >
                      {active ? (real ? "✓ " : "✕ ") : "+ "}
                      {clue}
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      <aside className="h-fit space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 lg:sticky lg:top-20">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Forensic toolkit
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-white/80">
            {[
              "URL & domain analyzer",
              "Email header parser",
              "Password strength meter",
              "Social engineering pattern matcher",
              "Risk scoring engine",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-md border border-white/10 bg-black/30 p-3">
          <div className="flex items-center justify-between font-mono text-[11px] text-white/60">
            <span>Real clues identified</span>
            <span className="text-cyan-300">
              {hits} / {totalReal}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded bg-white/5">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-violet-400"
              style={{ width: `${(hits / totalReal) * 100}%` }}
            />
          </div>
        </div>
        <button
          onClick={onNext}
          disabled={hits < Math.ceil(totalReal * 0.6)}
          className="w-full rounded-md bg-cyan-400 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#050816] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
        >
          {hits < Math.ceil(totalReal * 0.6)
            ? "Identify more clues to proceed"
            : "Continue → Reconstruct timeline"}
        </button>
      </aside>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 04 — Timeline reconstruction (drag-free ordering)
// ─────────────────────────────────────────────────────────────────────────────

function TimelineBoard({
  c,
  order,
  setOrder,
  onNext,
}: {
  c: CaseFile;
  order: string[];
  setOrder: (o: string[]) => void;
  onNext: () => void;
}) {
  const pool = c.chain.map((n) => n.id).filter((id) => !order.includes(id));
  const canonical = c.chain.map((n) => n.id).join("|");
  const correct = order.join("|") === canonical && order.length === c.chain.length;

  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          Step pool
        </div>
        <p className="mt-1 text-xs text-white/55">
          Tap a step to place it next in the attack chain. Tap a placed step to remove
          it.
        </p>
        <ul className="mt-4 space-y-2">
          {pool.length === 0 && (
            <li className="rounded-md border border-dashed border-white/10 p-4 text-center font-mono text-[11px] text-white/40">
              All steps placed.
            </li>
          )}
          {pool.map((id) => {
            const node = c.chain.find((n) => n.id === id)!;
            return (
              <li key={id}>
                <button
                  onClick={() => setOrder([...order, id])}
                  className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2.5 text-left text-sm hover:border-cyan-400/40 hover:bg-cyan-400/5"
                >
                  <span className="font-mono text-[10px] text-white/40">{node.id}</span>
                  <div className="font-display font-medium">{node.label}</div>
                  <div className="mt-1 font-mono text-[10px] text-cyan-300/70">
                    supports: {node.evidenceIds.join(", ")}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-xl border border-white/10 bg-gradient-to-b from-cyan-400/5 to-transparent p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Reconstructed attack chain
          </span>
          {order.length === c.chain.length && (
            <span
              className={`font-mono text-[10px] uppercase tracking-widest ${
                correct ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {correct ? "✓ sequence valid" : "✕ sequence rejected"}
            </span>
          )}
        </div>
        <ol className="mt-4 space-y-3">
          {order.map((id, i) => {
            const node = c.chain.find((n) => n.id === id)!;
            return (
              <li key={id} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="grid h-8 w-8 place-items-center rounded-full border border-cyan-400/40 bg-cyan-400/10 font-mono text-[11px] text-cyan-200">
                    {i + 1}
                  </div>
                  {i < order.length - 1 && (
                    <div className="my-1 h-6 w-px bg-cyan-400/30" />
                  )}
                </div>
                <button
                  onClick={() => setOrder(order.filter((x) => x !== id))}
                  className="flex-1 rounded-md border border-cyan-400/30 bg-cyan-400/5 px-3 py-2 text-left hover:border-rose-400/40 hover:bg-rose-400/5"
                >
                  <div className="font-display text-sm font-semibold">{node.label}</div>
                  <div className="font-mono text-[10px] text-white/50">
                    {node.evidenceIds.join(" + ")}
                  </div>
                </button>
              </li>
            );
          })}
          {order.length === 0 && (
            <li className="rounded-md border border-dashed border-white/10 p-6 text-center font-mono text-[11px] text-white/40">
              No steps placed yet.
            </li>
          )}
        </ol>
        <button
          onClick={onNext}
          disabled={order.length !== c.chain.length}
          className="mt-5 w-full rounded-md bg-cyan-400 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#050816] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
        >
          Lock chain → File verdict
        </button>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 05 — Verdict
// ─────────────────────────────────────────────────────────────────────────────

function VerdictPanel({
  c,
  verdict,
  setVerdict,
  onNext,
}: {
  c: CaseFile;
  verdict: string | null;
  setVerdict: (v: string) => void;
  onNext: () => void;
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
      <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        Forensic verdict
      </div>
      <h3 className="mt-1 font-display text-lg font-semibold">
        Classify the attack pattern
      </h3>
      <p className="mt-1 text-sm text-white/60">
        Based on your evidence review and reconstructed timeline, select the threat
        category that best describes this incident.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {c.verdictOptions.map((opt) => {
          const sel = verdict === opt;
          return (
            <button
              key={opt}
              onClick={() => setVerdict(opt)}
              className={`rounded-md border px-4 py-3 text-left transition ${
                sel
                  ? "border-cyan-400/60 bg-cyan-400/10"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <div className="font-display text-sm font-semibold">{opt}</div>
              {sel && (
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-cyan-300">
                  ◉ Selected
                </div>
              )}
            </button>
          );
        })}
      </div>
      <button
        onClick={onNext}
        disabled={!verdict}
        className="mt-6 rounded-md bg-cyan-400 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#050816] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
      >
        Submit findings → Generate forensic report
      </button>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Phase 06 — Report
// ─────────────────────────────────────────────────────────────────────────────

function ForensicReport({
  c,
  state,
  onClose,
}: {
  c: CaseFile;
  state: SessionState;
  onClose: () => void;
}) {
  const totalClues = c.evidence.reduce((n, e) => n + e.clues.length, 0);
  const realHits = Array.from(state.clueHits).filter((k) => {
    const [eid, clue] = k.split("::");
    return c.evidence.find((x) => x.id === eid)?.clues.includes(clue);
  }).length;
  const falsePos = state.clueHits.size - realHits;
  const cluePct = Math.round((realHits / totalClues) * 100);

  const canonical = c.chain.map((n) => n.id).join("|");
  const chainOk = state.chainOrder.join("|") === canonical;
  const verdictOk = state.verdict === c.correctVerdict;

  const score = Math.max(
    0,
    Math.round(
      cluePct * 0.4 +
        (chainOk ? 30 : 10) +
        (verdictOk ? 30 : 0) -
        falsePos * 5,
    ),
  );
  const xpEarned = Math.round((c.xp * score) / 100);

  const grade =
    score >= 90 ? "S" : score >= 80 ? "A" : score >= 65 ? "B" : score >= 50 ? "C" : "D";

  return (
    <section className="space-y-5">
      <div className="overflow-hidden rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 via-transparent to-violet-400/10 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-300/80">
              Forensic Report · Sealed
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
              {c.id} — {c.title}
            </h3>
            <div className="mt-1 font-mono text-[11px] text-white/60">
              Investigator: Agent K. Verma · Filed: just now
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-full border-2 border-cyan-400/60 bg-black/30 font-display text-3xl font-bold text-cyan-200">
              {grade}
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                Score
              </div>
              <div className="font-display text-2xl font-semibold">{score}/100</div>
              <div className="font-mono text-[11px] text-cyan-300">
                +{xpEarned} XP earned
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ReportBlock title="Executive Summary">
          {c.briefing} The investigator examined {c.evidence.length} pieces of evidence,
          identified {realHits} of {totalClues} forensic clues ({cluePct}%), and{" "}
          {chainOk ? "correctly" : "partially"} reconstructed the attack chain. The
          submitted verdict was{" "}
          <span className={verdictOk ? "text-emerald-300" : "text-rose-300"}>
            {verdictOk ? "accepted" : "rejected"}
          </span>
          .
        </ReportBlock>

        <ReportBlock title="Threat Classification">
          <div className="font-mono text-sm text-cyan-200">{c.threatClassification}</div>
          <div className="mt-2 font-mono text-[11px] text-white/55">
            Severity: {c.severity} · Filed under {c.category}
          </div>
        </ReportBlock>

        <ReportBlock title="Attack Timeline">
          <ol className="space-y-1 text-sm text-white/80">
            {c.chain.map((n, i) => (
              <li key={n.id} className="flex gap-3">
                <span className="font-mono text-[11px] text-cyan-300/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{n.label}</span>
              </li>
            ))}
          </ol>
        </ReportBlock>

        <ReportBlock title="Evidence Summary">
          <ul className="space-y-1 text-sm text-white/80">
            {c.evidence.map((e) => (
              <li key={e.id} className="font-mono text-[12px]">
                <span className="text-white/40">{e.id}</span> · {e.label}
              </li>
            ))}
          </ul>
        </ReportBlock>

        <ReportBlock title="Risk Level">
          <div className={`inline-block rounded border px-3 py-1 font-mono text-[12px] ${SEV_TONE[c.severity]}`}>
            {c.severity}
          </div>
          <p className="mt-2 text-xs text-white/60">
            False positives recorded: {falsePos}. Reduce noise in future analyses to
            improve confidence scoring.
          </p>
        </ReportBlock>

        <ReportBlock title="Preventive Recommendations">
          <ul className="space-y-1.5 text-sm text-white/80">
            {c.recommendations.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="mt-2 inline-block h-1 w-1 rounded-full bg-emerald-400" />
                {r}
              </li>
            ))}
          </ul>
        </ReportBlock>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          Final verdict
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="font-display text-base">Your call:</span>
          <span
            className={`rounded border px-2 py-1 font-mono text-[12px] ${
              verdictOk
                ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-200"
                : "border-rose-400/50 bg-rose-400/10 text-rose-200"
            }`}
          >
            {state.verdict}
          </span>
          {!verdictOk && (
            <>
              <span className="font-mono text-[11px] text-white/40">Correct:</span>
              <span className="rounded border border-cyan-400/50 bg-cyan-400/10 px-2 py-1 font-mono text-[12px] text-cyan-200">
                {c.correctVerdict}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onClose}
          className="rounded-md bg-cyan-400 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#050816] hover:bg-cyan-300"
        >
          ← Return to Case Registry
        </button>
        <button
          onClick={() => window.print()}
          className="rounded-md border border-white/15 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-white/80 hover:bg-white/5"
        >
          Export PDF
        </button>
      </div>
    </section>
  );
}

function ReportBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">
        {title}
      </div>
      <div className="mt-3 text-sm text-white/80">{children}</div>
    </article>
  );
}
