import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Phone,
  Mail,
  MessageSquare,
  QrCode,
  IndianRupee,
  Briefcase,
  Globe,
  Sparkles,
  Shield,
  Flame,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/simulate")({
  head: () => ({
    meta: [
      { title: "Simulation Lab — ForenShield" },
      {
        name: "description",
        content:
          "Safely experience realistic cyber attacks — phishing, vishing, UPI fraud, QR scams, and business email compromise. Every decision changes the outcome.",
      },
      { property: "og:title", content: "Simulation Lab — ForenShield" },
      {
        property: "og:description",
        content:
          "Branching cyber-attack simulations where your decisions determine the outcome.",
      },
    ],
  }),
  component: SimulatePage,
});

// ─────────────────────────────────────────────────────────────────────────────
// Branching simulation data
// ─────────────────────────────────────────────────────────────────────────────

type Outcome = "safe" | "compromised" | "partial";

type Step = {
  id: string;
  // Scene framing
  channel: string; // e.g. "SMS · +91 73xx xx1190"
  speaker?: string;
  body: string;
  // Optional visual indicator on the message bubble
  flags?: string[];
  choices: {
    label: string;
    rationale: string;
    next?: string; // next step id
    outcome?: Outcome; // terminal
    score: number; // -2..+2
  }[];
};

type Simulation = {
  id: string;
  code: string;
  title: string;
  blurb: string;
  Icon: LucideIcon;
  category:
    | "Phishing"
    | "Vishing"
    | "UPI Fraud"
    | "QR Scam"
    | "Job Scam"
    | "BEC";
  severity: "MEDIUM" | "HIGH" | "CRITICAL";
  difficulty: "Rookie" | "Analyst" | "Detective";
  xp: number;
  startStep: string;
  steps: Record<string, Step>;
  brief: string;
};

const SIMULATIONS: Simulation[] = [
  {
    id: "fake-refund-call",
    code: "SIM-01",
    title: "The Refund That Wasn't",
    blurb:
      "A 'customer support' agent calls about a refund. Make the calls a real victim faces — in real time.",
    Icon: Phone,
    category: "Vishing",
    severity: "CRITICAL",
    difficulty: "Analyst",
    xp: 320,
    brief:
      "You ordered a product online last week and want a refund. Your phone rings.",
    startStep: "s1",
    steps: {
      s1: {
        id: "s1",
        channel: "Incoming call · +91 73xx xx1190",
        speaker: "Caller",
        body: "Hello ma'am, I'm calling from UPI Refund Cell. We see your refund of ₹2,499 is stuck. Can you help us verify so we can release it in 5 minutes?",
        flags: ["Caller ID looks generic", "Unsolicited call"],
        choices: [
          {
            label: "Sure, what do you need?",
            rationale:
              "You engaged. Attackers count on the first 'yes' — every subsequent ask feels smaller.",
            next: "s2",
            score: -1,
          },
          {
            label: "Which company are you from exactly? I'll call you back on the official number.",
            rationale:
              "Reversing the channel is the single best defense. Real support will not object.",
            next: "s2_callback",
            score: 2,
          },
          {
            label: "Hang up immediately.",
            rationale:
              "Decisive. You may have over-blocked a legitimate call, but the asymmetry favors caution.",
            outcome: "safe",
            score: 1,
          },
        ],
      },
      s2_callback: {
        id: "s2_callback",
        channel: "Incoming call · +91 73xx xx1190",
        speaker: "Caller",
        body: "Ma'am the refund window closes in 4 minutes. If you call back later you'll lose it. Just open your UPI app please.",
        flags: ["Urgency / time pressure", "Resists out-of-band verification"],
        choices: [
          {
            label: "I understand, but I'll still call back on the official line.",
            rationale:
              "Textbook defense. Legitimate refunds never expire in minutes.",
            outcome: "safe",
            score: 2,
          },
          {
            label: "OK fine, I'll open the app to save the refund.",
            rationale:
              "Urgency worked. You bypassed your own verification rule.",
            next: "s2",
            score: -2,
          },
        ],
      },
      s2: {
        id: "s2",
        channel: "Incoming call · +91 73xx xx1190",
        speaker: "Caller",
        body: "Please install 'AnyDesk' from Play Store so I can guide you through the refund screen.",
        flags: ["Asks to install remote-access app"],
        choices: [
          {
            label: "Install AnyDesk and share the code",
            rationale:
              "Game over. The attacker now sees your screen, your OTPs, and your UPI PIN entry.",
            next: "s3_compromised",
            score: -2,
          },
          {
            label: "Refuse — I'll visit a branch instead.",
            rationale:
              "Screen-share is a one-way ticket. Refusing the install ends the attack here.",
            outcome: "safe",
            score: 2,
          },
        ],
      },
      s3_compromised: {
        id: "s3_compromised",
        channel: "UPI App",
        speaker: "On-screen prompt",
        body: "Caller asks you to enter your UPI PIN to 'authorize the refund'.",
        flags: ["PIN is only ever needed to SEND money"],
        choices: [
          {
            label: "Enter UPI PIN as instructed",
            rationale:
              "₹47,800 drained across four rotating VPAs in under 11 minutes.",
            outcome: "compromised",
            score: -2,
          },
          {
            label: "Stop. Uninstall AnyDesk and report the number.",
            rationale:
              "Late recovery. The attacker may have already screenshot your details, but you stopped the transaction.",
            outcome: "partial",
            score: 0,
          },
        ],
      },
    },
  },
  {
    id: "phishing-invoice",
    code: "SIM-02",
    title: "Spoofed Vendor Invoice",
    blurb:
      "A vendor invoice lands in your finance inbox. Read the headers like an analyst.",
    Icon: Mail,
    category: "Phishing",
    severity: "HIGH",
    difficulty: "Analyst",
    xp: 280,
    brief:
      "You're a finance associate. A familiar-looking invoice email arrives at 9:14 AM.",
    startStep: "s1",
    steps: {
      s1: {
        id: "s1",
        channel: "Outlook · Inbox",
        speaker: "From: Vendor Billing <accounts@vend0r-billing.com>",
        body: "Invoice #INV-2025-0817 — action required. Please review the attached invoice within 24 hours to avoid disruption to services.",
        flags: ["Domain 'vend0r' uses zero", "Generic urgency"],
        choices: [
          {
            label: "Open the link in the email body",
            rationale: "Premature click before any header inspection.",
            next: "s_land",
            score: -2,
          },
          {
            label: "View raw headers first",
            rationale: "Correct first move. Authentication results live in headers.",
            next: "s_headers",
            score: 2,
          },
          {
            label: "Reply asking to confirm",
            rationale:
              "Reply-To is attacker-controlled — you're confirming with the attacker, not the vendor.",
            next: "s_reply",
            score: -1,
          },
        ],
      },
      s_headers: {
        id: "s_headers",
        channel: "Raw headers",
        body: "Received-SPF: fail (microsoft.com: domain of vend0r-billing.com does not designate 198.51.100.42)\nAuthentication-Results: dkim=none; dmarc=fail\nReply-To: refunds@mailgrid.cc",
        flags: ["SPF fail", "DKIM none", "Reply-To mismatch"],
        choices: [
          {
            label: "Report to IT and quarantine the message",
            rationale: "Three converging failure signals. Textbook reporting flow.",
            outcome: "safe",
            score: 2,
          },
          {
            label: "Open the link anyway in a sandbox tab",
            rationale: "Risky even in a sandbox — credentials can still be entered by mistake.",
            next: "s_land",
            score: -1,
          },
        ],
      },
      s_reply: {
        id: "s_reply",
        channel: "Outlook · Reply draft",
        speaker: "To: refunds@mailgrid.cc",
        body: "Hi, just confirming you sent invoice INV-2025-0817? Thanks.",
        flags: ["Reply-To is attacker-controlled"],
        choices: [
          {
            label: "Send",
            rationale: "Attacker now knows your address is monitored and humans respond.",
            next: "s_followup",
            score: -2,
          },
          {
            label: "Discard. Verify via known vendor portal instead.",
            rationale: "Out-of-band verification — correct.",
            outcome: "safe",
            score: 2,
          },
        ],
      },
      s_followup: {
        id: "s_followup",
        channel: "Outlook · Inbox",
        speaker: "From: refunds@mailgrid.cc",
        body: "Yes, attached link is correct. Please confirm receipt via SSO login.",
        choices: [
          {
            label: "Click the SSO link",
            rationale: "Lookalike SSO harvests your credentials and session token.",
            next: "s_land",
            score: -2,
          },
          {
            label: "Report and quarantine.",
            rationale: "Late but correct.",
            outcome: "partial",
            score: 0,
          },
        ],
      },
      s_land: {
        id: "s_land",
        channel: "Browser",
        body: "Page: login.microsft-365.com — Microsoft 365 sign-in.",
        flags: ["Typosquat domain", "Let's Encrypt cert issued 2 hours ago"],
        choices: [
          {
            label: "Enter your work credentials",
            rationale: "Credentials + session token exfiltrated. Account takeover within minutes.",
            outcome: "compromised",
            score: -2,
          },
          {
            label: "Close tab and report.",
            rationale: "Late save. No credentials submitted means no exfil.",
            outcome: "safe",
            score: 1,
          },
        ],
      },
    },
  },
  {
    id: "whatsapp-otp",
    code: "SIM-03",
    title: "WhatsApp OTP Hijack",
    blurb:
      "Your 'cousin' messages asking for a 6-digit code. The whole account hangs on the next 30 seconds.",
    Icon: MessageSquare,
    category: "Phishing",
    severity: "HIGH",
    difficulty: "Rookie",
    xp: 180,
    brief: "It's 9:43 PM. Your phone buzzes with a familiar contact's name.",
    startStep: "s1",
    steps: {
      s1: {
        id: "s1",
        channel: "WhatsApp · Aditi (cousin)",
        body: "hey I sent my login code to your number by mistake, can you forward it? bank issue, urgent 🙏",
        flags: ["Urgency", "Requests a code"],
        choices: [
          {
            label: "Forward the code — she's family",
            rationale: "Code was actually your WhatsApp registration OTP. Account hijacked.",
            outcome: "compromised",
            score: -2,
          },
          {
            label: "Call her on her known number first",
            rationale: "Verify on a separate channel — exactly right.",
            next: "s_verify",
            score: 2,
          },
          {
            label: "Refuse — never share codes",
            rationale: "Hard rule, well applied.",
            outcome: "safe",
            score: 2,
          },
        ],
      },
      s_verify: {
        id: "s_verify",
        channel: "Phone call · Aditi",
        speaker: "Aditi",
        body: "I haven't messaged you all day. Someone's impersonating me.",
        choices: [
          {
            label: "Block the WhatsApp sender and enable two-step verification",
            rationale: "Closes the door and locks it.",
            outcome: "safe",
            score: 2,
          },
        ],
      },
    },
  },
  {
    id: "fake-job",
    code: "SIM-04",
    title: "The Offer Too Good",
    blurb: "A multinational 'recruiter' offers you a role — and charges onboarding fees.",
    Icon: Briefcase,
    category: "Job Scam",
    severity: "MEDIUM",
    difficulty: "Rookie",
    xp: 160,
    brief: "You're job-hunting. An email from a Fortune-500-styled recruiter lands.",
    startStep: "s1",
    steps: {
      s1: {
        id: "s1",
        channel: "Email · hr.accenture.recruit@gmail.com",
        body: "Congratulations! Offer for 'Junior Analyst' at Accen-ture Global Services. Joining fee ₹6,500 refundable on day-1. Please share Aadhaar + PAN + cancelled cheque.",
        flags: ["HR contact on Gmail", "Asks for joining fee", "Asks for unmasked KYC"],
        choices: [
          {
            label: "Pay the fee and send unmasked KYC",
            rationale: "Fee gone, identity harvested for resale on dark forums.",
            outcome: "compromised",
            score: -2,
          },
          {
            label: "Verify on the official Accenture careers portal",
            rationale: "Right move — the listing won't exist.",
            outcome: "safe",
            score: 2,
          },
          {
            label: "Send only the PAN to start",
            rationale: "Still a leak. PAN alone enables fraudulent loans.",
            outcome: "partial",
            score: -1,
          },
        ],
      },
    },
  },
  {
    id: "qr-tampered",
    code: "SIM-05",
    title: "The Sticker Over the QR",
    blurb: "A parking QR. A small payment. A big surprise.",
    Icon: QrCode,
    category: "QR Scam",
    severity: "MEDIUM",
    difficulty: "Rookie",
    xp: 140,
    brief: "You park, walk up to the meter, scan the QR.",
    startStep: "s1",
    steps: {
      s1: {
        id: "s1",
        channel: "UPI App preview",
        body: "Scan resolved to: pay.upi-secure.in/verify · amount blank · merchant 'Q_PARKING_OPS'",
        flags: ["Unknown domain", "Blank amount field"],
        choices: [
          {
            label: "Enter ₹40 and pay",
            rationale: "You authorized a custom amount — attacker can also raise a collect request later.",
            next: "s_collect",
            score: -1,
          },
          {
            label: "Abort. Pay at the staffed booth.",
            rationale: "Right call. Tampered stickers over real QRs are common.",
            outcome: "safe",
            score: 2,
          },
        ],
      },
      s_collect: {
        id: "s_collect",
        channel: "UPI App · Collect request",
        body: "₹4,000 collect request from q_parking_ops@ybl — Approve?",
        flags: ["Inflated amount", "Collect = money OUT"],
        choices: [
          {
            label: "Approve — must be the real fee",
            rationale: "Funds drained.",
            outcome: "compromised",
            score: -2,
          },
          {
            label: "Decline and block the VPA",
            rationale: "Caught it just in time.",
            outcome: "partial",
            score: 1,
          },
        ],
      },
    },
  },
  {
    id: "bec",
    code: "SIM-06",
    title: "CEO Wire Transfer",
    blurb: "Business Email Compromise — when 'the CEO' asks for an urgent wire.",
    Icon: Globe,
    category: "BEC",
    severity: "CRITICAL",
    difficulty: "Detective",
    xp: 380,
    brief: "You're in finance. The CEO emails from her usual address — almost.",
    startStep: "s1",
    steps: {
      s1: {
        id: "s1",
        channel: "Email · ceo@yourc0mpany.com",
        speaker: "From: Sarah Chen, CEO",
        body: "I'm in a board meeting and can't talk. Please wire ₹18,00,000 to new vendor account today. Details below. I'm trusting you to keep this confidential.",
        flags: ["Lookalike domain (0 vs o)", "Secrecy + urgency", "New vendor"],
        choices: [
          {
            label: "Process the wire — CEO said urgent",
            rationale: "₹18 lakh gone. Classic BEC playbook.",
            outcome: "compromised",
            score: -2,
          },
          {
            label: "Walk to her office or call her known mobile to confirm",
            rationale: "Out-of-band verification on any new vendor + any urgency. Always.",
            next: "s_verify",
            score: 2,
          },
          {
            label: "Reply asking for invoice and PO number",
            rationale: "Better than wiring, but attacker will fabricate both quickly.",
            next: "s_invoice",
            score: 0,
          },
        ],
      },
      s_verify: {
        id: "s_verify",
        channel: "Phone · Sarah Chen",
        speaker: "Sarah",
        body: "I didn't send that. Forward it to IT immediately and freeze any vendor onboarding requests today.",
        choices: [
          {
            label: "Report to IT and block the domain",
            rationale: "Textbook incident response.",
            outcome: "safe",
            score: 2,
          },
        ],
      },
      s_invoice: {
        id: "s_invoice",
        channel: "Email · ceo@yourc0mpany.com",
        body: "Invoice attached. PO #2025-887. Please don't delay.",
        flags: ["Pressure escalates", "Still no out-of-band check"],
        choices: [
          {
            label: "Process the wire",
            rationale: "Funds gone. Documents in BEC are always convincing.",
            outcome: "compromised",
            score: -2,
          },
          {
            label: "Stop and call her directly",
            rationale: "Late but recovered.",
            outcome: "safe",
            score: 1,
          },
        ],
      },
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

function SimulatePage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(
    () => SIMULATIONS.find((s) => s.id === activeId) ?? null,
    [activeId],
  );

  return (
    <div className="min-h-svh bg-[#050816] text-foreground">
      <BackgroundField />
      <TopBar />

      <main className="relative mx-auto max-w-6xl px-5 pb-24 pt-6">
        {active ? (
          <SimulationRunner sim={active} onExit={() => setActiveId(null)} />
        ) : (
          <SimulationGrid onOpen={setActiveId} />
        )}
      </main>
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-cyan-400/10 bg-[#050816]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link
          to="/app"
          className="flex items-center gap-2 text-xs text-cyan-200/70 transition hover:text-cyan-200"
        >
          <ArrowLeft className="size-4" /> Mission Control
        </Link>
        <div className="flex items-center gap-2">
          <Flame className="size-4 text-cyan-400" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/80">
            Simulation Lab
          </span>
        </div>
        <div className="hidden font-mono text-[10px] uppercase tracking-widest text-cyan-200/50 sm:block">
          Safe sandbox · No real systems touched
        </div>
      </div>
    </header>
  );
}

function SimulationGrid({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent p-6 sm:p-8">
        <div className="absolute -right-12 -top-12 size-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300/80">
          / branching simulations
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Experience the attack before it happens to you.{" "}
          <span className="text-cyan-300">Every choice has a consequence.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300/80">
          Each simulation is a realistic decision tree built from real cases. There are no
          shortcuts — only the path you take and the outcome you earn.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SIMULATIONS.map((sim) => (
          <SimCard key={sim.id} sim={sim} onOpen={() => onOpen(sim.id)} />
        ))}
      </div>
    </div>
  );
}

const SEV_TONE: Record<Simulation["severity"], string> = {
  MEDIUM: "text-amber-300 border-amber-300/30",
  HIGH: "text-orange-300 border-orange-300/30",
  CRITICAL: "text-rose-300 border-rose-300/30",
};

function SimCard({ sim, onOpen }: { sim: Simulation; onOpen: () => void }) {
  const { Icon } = sim;
  return (
    <button
      onClick={onOpen}
      className="group relative overflow-hidden rounded-2xl border border-cyan-400/10 bg-slate-950/40 p-5 text-left transition hover:border-cyan-300/40 hover:bg-slate-900/60"
    >
      <div className="flex items-start justify-between">
        <div className="flex size-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-cyan-300">
          <Icon className="size-5" />
        </div>
        <span
          className={`rounded-full border bg-slate-950/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${SEV_TONE[sim.severity]}`}
        >
          {sim.severity}
        </span>
      </div>
      <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-cyan-200/50">
        {sim.code} · {sim.category}
      </div>
      <h3 className="mt-1 text-base font-semibold text-white">{sim.title}</h3>
      <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-400">
        {sim.blurb}
      </p>
      <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-cyan-200/60">
        <span>{sim.difficulty}</span>
        <span>+{sim.xp} XP</span>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Runner
// ─────────────────────────────────────────────────────────────────────────────

function SimulationRunner({ sim, onExit }: { sim: Simulation; onExit: () => void }) {
  const [stepId, setStepId] = useState(sim.startStep);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<
    { stepId: string; choice: string; rationale: string }[]
  >([]);

  const step = sim.steps[stepId];

  function reset() {
    setStepId(sim.startStep);
    setOutcome(null);
    setScore(0);
    setHistory([]);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-cyan-200/70 hover:text-cyan-200"
        >
          <ArrowLeft className="size-3.5" /> Exit simulation
        </button>
        <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-200/50">
          {sim.code} · {sim.title}
        </div>
      </div>

      {outcome ? (
        <OutcomeReport
          sim={sim}
          outcome={outcome}
          score={score}
          history={history}
          onReset={reset}
          onExit={onExit}
        />
      ) : (
        <>
          {history.length === 0 && (
            <div className="rounded-xl border border-cyan-400/15 bg-slate-950/40 p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-300/80">
                Mission brief
              </div>
              <p className="mt-1 text-sm text-slate-200/90">{sim.brief}</p>
            </div>
          )}

          <SceneCard step={step} />

          <div className="grid gap-2.5">
            {step.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => {
                  setScore((s) => s + c.score);
                  setHistory((h) => [
                    ...h,
                    { stepId: step.id, choice: c.label, rationale: c.rationale },
                  ]);
                  if (c.outcome) {
                    setOutcome(c.outcome);
                  } else if (c.next) {
                    setStepId(c.next);
                  }
                }}
                className="group flex items-start justify-between gap-4 rounded-xl border border-cyan-400/15 bg-slate-950/40 p-4 text-left transition hover:border-cyan-300/50 hover:bg-slate-900/60"
              >
                <span className="text-sm text-slate-100">{c.label}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300/70 transition group-hover:text-cyan-200">
                  Choose →
                </span>
              </button>
            ))}
          </div>

          {history.length > 0 && (
            <details className="rounded-xl border border-cyan-400/10 bg-slate-950/30 p-4">
              <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-widest text-cyan-200/60">
                Decision log ({history.length})
              </summary>
              <ol className="mt-3 space-y-2 text-xs text-slate-300/80">
                {history.map((h, i) => (
                  <li key={i} className="border-l border-cyan-400/20 pl-3">
                    <div className="text-slate-100">{h.choice}</div>
                    <div className="mt-0.5 text-[11px] text-slate-400">{h.rationale}</div>
                  </li>
                ))}
              </ol>
            </details>
          )}
        </>
      )}
    </div>
  );
}

function SceneCard({ step }: { step: Step }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-slate-950 to-slate-900/60 shadow-[0_0_60px_-30px_rgba(0,229,255,0.4)]">
      <div className="flex items-center justify-between border-b border-cyan-400/10 bg-cyan-400/5 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-cyan-300/80">
        <span>{step.channel}</span>
        <span className="text-cyan-200/40">LIVE</span>
      </div>
      <div className="p-5">
        {step.speaker && (
          <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-cyan-200/50">
            {step.speaker}
          </div>
        )}
        <p className="whitespace-pre-line text-[15px] leading-relaxed text-slate-100">
          {step.body}
        </p>
        {step.flags && step.flags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {step.flags.map((f, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-200"
              >
                <AlertTriangle className="size-3" /> {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OutcomeReport({
  sim,
  outcome,
  score,
  history,
  onReset,
  onExit,
}: {
  sim: Simulation;
  outcome: Outcome;
  score: number;
  history: { stepId: string; choice: string; rationale: string }[];
  onReset: () => void;
  onExit: () => void;
}) {
  const tone =
    outcome === "safe"
      ? "border-emerald-400/40 bg-emerald-400/5 text-emerald-300"
      : outcome === "partial"
        ? "border-amber-400/40 bg-amber-400/5 text-amber-300"
        : "border-rose-400/40 bg-rose-400/5 text-rose-300";

  const headline =
    outcome === "safe"
      ? "Threat neutralized"
      : outcome === "partial"
        ? "Partial recovery"
        : "Compromised";

  const Icon =
    outcome === "safe" ? CheckCircle2 : outcome === "partial" ? AlertTriangle : XCircle;

  const xpEarned =
    outcome === "safe"
      ? sim.xp
      : outcome === "partial"
        ? Math.round(sim.xp * 0.4)
        : Math.round(sim.xp * 0.1);

  const grade =
    score >= 4 ? "S" : score >= 2 ? "A" : score >= 0 ? "B" : score >= -2 ? "C" : "D";

  return (
    <div className="space-y-5">
      <div className={`rounded-2xl border p-6 ${tone}`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest opacity-80">
              Simulation result
            </div>
            <div className="mt-1 flex items-center gap-2 text-2xl font-semibold">
              <Icon className="size-6" /> {headline}
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-widest opacity-80">
              Grade
            </div>
            <div className="font-mono text-3xl font-bold">{grade}</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center font-mono text-[10px] uppercase tracking-widest">
          <Metric label="Decision score" value={`${score >= 0 ? "+" : ""}${score}`} />
          <Metric label="Steps taken" value={String(history.length)} />
          <Metric label="XP earned" value={`+${xpEarned}`} />
        </div>
      </div>

      <div className="rounded-2xl border border-cyan-400/15 bg-slate-950/40 p-5">
        <div className="font-mono text-[11px] uppercase tracking-widest text-cyan-300/80">
          After-action review
        </div>
        <ol className="mt-3 space-y-3 text-sm text-slate-200/90">
          {history.map((h, i) => (
            <li key={i} className="rounded-lg border border-cyan-400/10 bg-slate-950/40 p-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-200/60">
                Decision {i + 1}
              </div>
              <div className="mt-1 text-slate-100">{h.choice}</div>
              <div className="mt-1 text-xs text-slate-400">{h.rationale}</div>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-md border border-cyan-400/30 bg-cyan-400/5 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-cyan-200 transition hover:bg-cyan-400/10"
        >
          <RotateCcw className="size-3.5" /> Retry simulation
        </button>
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 rounded-md bg-cyan-400 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-slate-950 transition hover:bg-cyan-300"
        >
          Back to lab
        </button>
        <Link
          to="/investigate"
          className="inline-flex items-center gap-2 rounded-md border border-cyan-400/30 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-cyan-200 transition hover:bg-cyan-400/10"
        >
          <Shield className="size-3.5" /> Open Investigation Lab
        </Link>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-current/20 bg-black/20 p-3">
      <div className="opacity-70">{label}</div>
      <div className="mt-1 text-lg font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function BackgroundField() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      <div className="absolute -left-32 top-1/4 size-96 rounded-full bg-cyan-500/5 blur-3xl" />
      <div className="absolute -right-32 bottom-1/4 size-96 rounded-full bg-cyan-500/5 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
    </div>
  );
}

// satisfy unused-import lint pessimism in case tree-shaking drops these
void IndianRupee;
void Sparkles;
