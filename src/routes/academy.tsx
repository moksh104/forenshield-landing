import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ShieldCheck,
  Fish,
  KeyRound,
  Users,
  Smartphone,
  IndianRupee,
  QrCode,
  Fingerprint,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  Target,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "Cyber Academy — ForenShield" },
      {
        name: "description",
        content:
          "Interactive cybersecurity lessons covering phishing, password security, social engineering, OTP fraud, UPI scams, QR code fraud, identity theft, and digital privacy.",
      },
      { property: "og:title", content: "Cyber Academy — ForenShield" },
      {
        property: "og:description",
        content:
          "Learn cybersecurity through interactive visual lessons, not static notes.",
      },
    ],
  }),
  component: AcademyPage,
});

// ─────────────────────────────────────────────────────────────────────────────
// Curriculum
// ─────────────────────────────────────────────────────────────────────────────

type Lesson = {
  id: string;
  code: string;
  title: string;
  blurb: string;
  Icon: LucideIcon;
  difficulty: "Foundational" | "Intermediate" | "Advanced";
  minutes: number;
  xp: number;
  modules: {
    title: string;
    body: string;
    callout?: { label: string; text: string };
  }[];
  quiz: {
    q: string;
    options: string[];
    answer: number; // index
    explain: string;
  }[];
};

const LESSONS: Lesson[] = [
  {
    id: "phishing",
    code: "AC-01",
    title: "Phishing & Spoofed Domains",
    blurb:
      "Recognize lookalike senders, malicious URLs, and the psychological levers attackers pull.",
    Icon: Fish,
    difficulty: "Foundational",
    minutes: 6,
    xp: 120,
    modules: [
      {
        title: "What phishing really is",
        body: "Phishing is the deliberate use of disguise — a sender, a domain, a tone of voice — to make you act before you think. The technical surface is small; the psychological surface is everything.",
      },
      {
        title: "Reading a sender like a forensic analyst",
        body: "Always inspect three things: the From domain (character by character), the Reply-To (often where attackers route real replies), and authentication results (SPF, DKIM, DMARC) in the raw header.",
        callout: {
          label: "Field tip",
          text: "vend0r-billing.com vs vendor-billing.com — the zero is the entire attack.",
        },
      },
      {
        title: "URL anatomy",
        body: "Read URLs right-to-left. The registrable domain is the last two labels before the path. login.microsft-365.com is owned by microsft-365.com — not Microsoft.",
      },
    ],
    quiz: [
      {
        q: "An email From: 'accounts@vend0r-billing.com' with Reply-To: refunds@mailgrid.cc and Received-SPF: fail. What is the strongest single indicator of phishing?",
        options: [
          "The Reply-To domain alone",
          "The combination of typosquat From + Reply-To mismatch + SPF fail",
          "The presence of the word 'invoice'",
          "The send time outside business hours",
        ],
        answer: 1,
        explain:
          "No single signal is conclusive. Forensic confidence comes from converging indicators — typosquat, Reply-To divergence, and authentication failure together.",
      },
      {
        q: "Which URL is owned by Microsoft?",
        options: [
          "login.microsft-365.com",
          "microsoft.login-secure.net",
          "login.microsoftonline.com",
          "microsoft.com.account-verify.io",
        ],
        answer: 2,
        explain:
          "Read right-to-left to the registrable domain. Only microsoftonline.com is a real Microsoft property.",
      },
    ],
  },
  {
    id: "passwords",
    code: "AC-02",
    title: "Password Security & MFA",
    blurb:
      "Entropy, reuse, password managers, and why FIDO2 ends most phishing campaigns.",
    Icon: KeyRound,
    difficulty: "Foundational",
    minutes: 5,
    xp: 100,
    modules: [
      {
        title: "Entropy is the only thing that matters",
        body: "A 16-character random string from a password manager beats any human-memorable phrase. Length dominates complexity — every additional character multiplies the attacker's work.",
      },
      {
        title: "Reuse is the silent breach multiplier",
        body: "Credential stuffing tools replay leaked username/password pairs across 200+ services per second. One reused password compromises your entire identity graph.",
      },
      {
        title: "MFA is not all equal",
        body: "SMS OTP is phishable. TOTP apps are better. FIDO2 hardware keys are phishing-resistant by design — the browser binds the credential to the origin so the attacker's lookalike domain receives nothing.",
        callout: {
          label: "Defender rule",
          text: "If a workflow can be phished by a convincing lookalike, your MFA isn't doing its job.",
        },
      },
    ],
    quiz: [
      {
        q: "Why does a FIDO2 security key defeat a phishing site that perfectly mimics the real login?",
        options: [
          "The key is physically harder to clone",
          "The browser binds the credential to the origin — the fake domain gets nothing",
          "FIDO2 keys require biometric confirmation",
          "Phishing sites can't load JavaScript",
        ],
        answer: 1,
        explain:
          "Origin binding is the core defense. The browser refuses to release the credential to any origin that doesn't match.",
      },
    ],
  },
  {
    id: "social-engineering",
    code: "AC-03",
    title: "Social Engineering",
    blurb:
      "Authority, urgency, scarcity, reciprocity — the six levers behind every con.",
    Icon: Users,
    difficulty: "Intermediate",
    minutes: 7,
    xp: 150,
    modules: [
      {
        title: "The attacker's playbook is not technical",
        body: "Pretexting builds a story. Authority borrows uniforms (bank, police, IT). Urgency collapses your verification window. Reciprocity ('I sent you a code by mistake') exploits politeness.",
      },
      {
        title: "The verify-out-of-band rule",
        body: "If a contact you trust asks for anything sensitive — money, codes, documents — confirm via a separate channel you initiate. Never the channel the request came through.",
      },
    ],
    quiz: [
      {
        q: "A cousin messages on WhatsApp: 'I sent my 6-digit code to your number by mistake, can you forward it?' What is the correct response?",
        options: [
          "Forward the code — it's just a cousin",
          "Refuse and call her on her known phone number to verify",
          "Forward only half the code",
          "Ask her to send the code from her end first",
        ],
        answer: 1,
        explain:
          "OTP forwarding is a hijack playbook. Verify the request on a channel you initiate to a known number.",
      },
    ],
  },
  {
    id: "otp-fraud",
    code: "AC-04",
    title: "OTP Fraud",
    blurb:
      "WhatsApp hijacks, banking OTP theft, and why no legitimate party ever needs your code.",
    Icon: Smartphone,
    difficulty: "Foundational",
    minutes: 4,
    xp: 90,
    modules: [
      {
        title: "The OTP is the credential",
        body: "An OTP is not a confirmation of your action — it is the action. Sharing it is exactly equivalent to handing over your account.",
      },
      {
        title: "Common OTP theft patterns",
        body: "1) Impersonation of a trusted contact. 2) Fake bank/support call asking you to 'read out the code for verification'. 3) Phishing pages that capture both password and OTP simultaneously and replay them.",
      },
    ],
    quiz: [
      {
        q: "Your bank calls and asks you to read the OTP they 'just sent for verification'. What is true?",
        options: [
          "Real banks ask for OTPs to confirm calls",
          "No legitimate bank or service ever asks for your OTP",
          "It's safe if they know your account number",
          "Only share if you initiated the call",
        ],
        answer: 1,
        explain:
          "No legitimate party — bank, telco, government, employer — ever needs your OTP. The OTP exists to keep them out of your account.",
      },
    ],
  },
  {
    id: "upi-scams",
    code: "AC-05",
    title: "UPI Scams",
    blurb:
      "Collect requests, fake refund flows, and remote-access tools used to drain wallets.",
    Icon: IndianRupee,
    difficulty: "Intermediate",
    minutes: 6,
    xp: 130,
    modules: [
      {
        title: "Pay vs collect — the asymmetry",
        body: "UPI 'pay' moves money out. UPI 'collect' is a request for money — but visually similar in many apps. Approving a collect request debits your account.",
      },
      {
        title: "The refund scam pattern",
        body: "Attacker claims you are owed a refund, asks you to enter your UPI PIN to 'receive' it. UPI PIN is only ever required to send money — never to receive it.",
      },
      {
        title: "Remote-access tool abuse",
        body: "AnyDesk, TeamViewer, or QuickSupport installed 'to help you' lets the attacker watch your screen, read OTPs, and approve transactions while you watch.",
        callout: {
          label: "Hard rule",
          text: "PIN to receive money = scam. Always. No exceptions.",
        },
      },
    ],
    quiz: [
      {
        q: "A support agent asks you to install AnyDesk so they can 'process your refund'. What is the real outcome?",
        options: [
          "They process the refund faster",
          "They watch your screen, capture your PIN, and drain your account",
          "Nothing — AnyDesk is read-only",
          "It speeds up the bank's verification",
        ],
        answer: 1,
        explain:
          "Screen-share gives the attacker full visibility into PINs, OTPs, and balances — and lets them coach you through transactions that empty your account.",
      },
    ],
  },
  {
    id: "qr-fraud",
    code: "AC-06",
    title: "QR Code Fraud",
    blurb:
      "QR codes are opaque URLs. Scan with the assumption you don't know what you'll get.",
    Icon: QrCode,
    difficulty: "Foundational",
    minutes: 4,
    xp: 80,
    modules: [
      {
        title: "QR is just an encoded URL",
        body: "You cannot read a QR code with your eyes. Scanning is a blind click — and the destination might be a phishing site, a malicious payment request, or an app install prompt.",
      },
      {
        title: "Where QR scams thrive",
        body: "Parking meters, charity posters, restaurant menus, refund flyers — anywhere the original QR can be overlaid with a sticker. Always preview the URL your scanner shows before tapping through.",
      },
    ],
    quiz: [
      {
        q: "You scan a QR at a coffee shop to pay — your app shows the URL is `pay.upi-secure.in/verify`. Domain you expected: `*.npci.org.in`. What now?",
        options: [
          "Proceed — the URL looks UPI-like",
          "Abort. The domain is unrelated to NPCI infrastructure",
          "Enter a smaller test amount first",
          "Trust your scanner app to filter scams",
        ],
        answer: 1,
        explain:
          "Lookalike domains are the entire attack. NPCI's legitimate infrastructure does not live on .in marketing domains.",
      },
    ],
  },
  {
    id: "identity-theft",
    code: "AC-07",
    title: "Identity Theft",
    blurb:
      "How Aadhaar, PAN, and cheque copies become loans, SIMs, and shadow accounts.",
    Icon: Fingerprint,
    difficulty: "Intermediate",
    minutes: 6,
    xp: 140,
    modules: [
      {
        title: "Your KYC is a long-lived credential",
        body: "Unlike a password, you cannot rotate your Aadhaar or PAN. Once a clear image circulates, it can be replayed for years across loan apps, SIM issuance, and shadow KYC.",
      },
      {
        title: "Masking is non-negotiable",
        body: "Use masked Aadhaar (first 8 digits hidden) for any non-government KYC. Watermark documents you must share with the purpose and date — it shrinks the resale value to zero.",
      },
    ],
    quiz: [
      {
        q: "A 'recruiter' on Gmail asks for unmasked Aadhaar, PAN, and a cancelled cheque to 'onboard you'. What's the right move?",
        options: [
          "Send it — they need to verify you",
          "Refuse. Legitimate employers use HR portals and accept masked Aadhaar",
          "Send only the PAN",
          "Send with the documents blurred slightly",
        ],
        answer: 1,
        explain:
          "Recruiter fraud harvests KYC for resale. Real onboarding happens through corporate HR systems — never personal Gmail.",
      },
    ],
  },
  {
    id: "digital-privacy",
    code: "AC-08",
    title: "Digital Privacy",
    blurb:
      "App permissions, metadata leaks, and reducing your attackable surface.",
    Icon: Lock,
    difficulty: "Intermediate",
    minutes: 5,
    xp: 110,
    modules: [
      {
        title: "Permissions are credentials",
        body: "An app with SMS, contacts, and accessibility permissions can read your OTPs, exfiltrate your social graph, and click on your behalf. Audit permissions quarterly.",
      },
      {
        title: "Metadata is the leak",
        body: "Photos carry GPS. Documents carry author and edit history. Screenshots of chats reveal usernames. Strip metadata before sharing anything outside trusted circles.",
      },
    ],
    quiz: [
      {
        q: "Which app permission is the highest-risk to grant to an unverified utility app?",
        options: [
          "Camera",
          "Notifications",
          "Accessibility services",
          "Storage (read-only)",
        ],
        answer: 2,
        explain:
          "Accessibility allows the app to read screen content and perform taps — effectively full remote control. Reserve it for trusted apps only.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

function AcademyPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const active = useMemo(
    () => LESSONS.find((l) => l.id === activeId) ?? null,
    [activeId],
  );

  const totalXp = useMemo(
    () => LESSONS.filter((l) => completed.has(l.id)).reduce((s, l) => s + l.xp, 0),
    [completed],
  );

  return (
    <div className="min-h-svh bg-[#050816] text-foreground">
      <BackgroundField />
      <TopBar completedCount={completed.size} totalCount={LESSONS.length} totalXp={totalXp} />

      <main className="relative mx-auto max-w-6xl px-5 pb-24 pt-6">
        {active ? (
          <LessonView
            lesson={active}
            isComplete={completed.has(active.id)}
            onBack={() => setActiveId(null)}
            onComplete={() => {
              setCompleted((prev) => new Set(prev).add(active.id));
              setActiveId(null);
            }}
          />
        ) : (
          <CurriculumGrid
            completed={completed}
            onOpen={(id) => setActiveId(id)}
          />
        )}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Top bar
// ─────────────────────────────────────────────────────────────────────────────

function TopBar({
  completedCount,
  totalCount,
  totalXp,
}: {
  completedCount: number;
  totalCount: number;
  totalXp: number;
}) {
  const pct = Math.round((completedCount / totalCount) * 100);
  return (
    <header className="sticky top-0 z-20 border-b border-cyan-400/10 bg-[#050816]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link
          to="/app"
          className="flex items-center gap-2 text-xs text-cyan-200/70 transition hover:text-cyan-200"
        >
          <ArrowLeft className="size-4" />
          Mission Control
        </Link>
        <div className="flex items-center gap-2">
          <BookOpen className="size-4 text-cyan-400" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300/80">
            Cyber Academy
          </span>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-200/50">
              Progress
            </div>
            <div className="font-mono text-xs text-cyan-100">
              {completedCount}/{totalCount} · {totalXp} XP
            </div>
          </div>
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-cyan-400/10">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-cyan-200 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Curriculum grid
// ─────────────────────────────────────────────────────────────────────────────

function CurriculumGrid({
  completed,
  onOpen,
}: {
  completed: Set<string>;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent p-6 sm:p-8">
        <div className="absolute -right-12 -top-12 size-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300/80">
          / curriculum
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Learn cybersecurity by reading the threat,{" "}
          <span className="text-cyan-300">not the textbook.</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300/80">
          Eight short, scenario-driven lessons that translate real attacker tradecraft into
          defender intuition. Finish each module to bank XP and unlock advanced investigations.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Pill icon={Target} label="Practical · No fluff" />
          <Pill icon={Sparkles} label="XP unlocks new cases" />
          <Pill icon={ShieldCheck} label="Defender mindset" />
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LESSONS.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            done={completed.has(lesson.id)}
            onOpen={() => onOpen(lesson.id)}
          />
        ))}
      </div>
    </div>
  );
}

function LessonCard({
  lesson,
  done,
  onOpen,
}: {
  lesson: Lesson;
  done: boolean;
  onOpen: () => void;
}) {
  const { Icon } = lesson;
  return (
    <button
      onClick={onOpen}
      className="group relative overflow-hidden rounded-2xl border border-cyan-400/10 bg-slate-950/40 p-5 text-left transition hover:border-cyan-300/40 hover:bg-slate-900/60"
    >
      <div className="flex items-start justify-between">
        <div className="flex size-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 transition group-hover:border-cyan-300/60 group-hover:text-cyan-200">
          <Icon className="size-5" />
        </div>
        {done ? (
          <span className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
            <CheckCircle2 className="size-3" /> Complete
          </span>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-200/50">
            {lesson.code}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">{lesson.title}</h3>
      <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-400">
        {lesson.blurb}
      </p>
      <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-cyan-200/60">
        <span>{lesson.difficulty}</span>
        <span>
          {lesson.minutes} min · +{lesson.xp} XP
        </span>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lesson view (modules + quiz)
// ─────────────────────────────────────────────────────────────────────────────

function LessonView({
  lesson,
  isComplete,
  onBack,
  onComplete,
}: {
  lesson: Lesson;
  isComplete: boolean;
  onBack: () => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const totalSteps = lesson.modules.length + lesson.quiz.length;
  const isQuizStep = step >= lesson.modules.length;
  const quizIdx = step - lesson.modules.length;

  const allAnsweredCorrect =
    Object.keys(answers).length === lesson.quiz.length &&
    lesson.quiz.every((q, i) => answers[i] === q.answer);

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-cyan-200/70 hover:text-cyan-200"
      >
        <ArrowLeft className="size-3.5" /> Back to curriculum
      </button>

      <div className="rounded-2xl border border-cyan-400/15 bg-slate-950/40 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/70">
          <span>{lesson.code}</span>
          <span className="text-cyan-200/30">·</span>
          <span>{lesson.difficulty}</span>
          <span className="text-cyan-200/30">·</span>
          <span>+{lesson.xp} XP</span>
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          {lesson.title}
        </h2>

        {/* Progress dots */}
        <div className="mt-5 flex items-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all ${
                i <= step ? "bg-cyan-400" : "bg-cyan-400/15"
              }`}
            />
          ))}
        </div>

        <div className="mt-6 min-h-[260px]">
          {!isQuizStep ? (
            <ModuleBlock module={lesson.modules[step]} />
          ) : (
            <QuizBlock
                quiz={lesson.quiz[quizIdx]}
                index={quizIdx}
                chosen={answers[quizIdx]}
                onChoose={(opt) =>
                  setAnswers((prev) => ({ ...prev, [quizIdx]: opt }))
                }
              />
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="rounded-md border border-cyan-400/20 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-cyan-200/80 transition hover:border-cyan-300/50 disabled:opacity-30"
          >
            Previous
          </button>

          {step < totalSteps - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={isQuizStep && answers[quizIdx] === undefined}
              className="rounded-md bg-cyan-400 px-5 py-2 font-mono text-[11px] uppercase tracking-widest text-slate-950 transition hover:bg-cyan-300 disabled:opacity-40"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={onComplete}
              disabled={!allAnsweredCorrect}
              className="rounded-md bg-emerald-400 px-5 py-2 font-mono text-[11px] uppercase tracking-widest text-slate-950 transition hover:bg-emerald-300 disabled:opacity-40"
            >
              {isComplete ? "Already complete" : "Bank XP & finish"}
            </button>
          )}
        </div>

        {isQuizStep && answers[quizIdx] !== undefined && (
          <div
            className={`mt-4 rounded-lg border p-3 text-xs ${
              answers[quizIdx] === lesson.quiz[quizIdx].answer
                ? "border-emerald-400/30 bg-emerald-400/5 text-emerald-200"
                : "border-rose-400/30 bg-rose-400/5 text-rose-200"
            }`}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest">
              {answers[quizIdx] === lesson.quiz[quizIdx].answer ? "Correct" : "Reconsider"}
              {" · "}
            </span>
            {lesson.quiz[quizIdx].explain}
          </div>
        )}
      </div>
    </div>
  );
}

function ModuleBlock({ module: m }: { module: Lesson["modules"][number] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">{m.title}</h3>
      <p className="text-sm leading-relaxed text-slate-300/90">{m.body}</p>
      {m.callout && (
        <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">
            {m.callout.label}
          </div>
          <div className="mt-1 text-xs text-cyan-100/90">{m.callout.text}</div>
        </div>
      )}
    </div>
  );
}

function QuizBlock({
  quiz,
  index,
  chosen,
  onChoose,
}: {
  quiz: Lesson["quiz"][number];
  index: number;
  chosen: number | undefined;
  onChoose: (i: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-300/80">
        Knowledge check · Q{index + 1}
      </div>
      <h3 className="text-base font-semibold text-white">{quiz.q}</h3>
      <div className="grid gap-2">
        {quiz.options.map((opt, i) => {
          const isChosen = chosen === i;
          const isCorrect = i === quiz.answer;
          const showResult = chosen !== undefined;
          return (
            <button
              key={i}
              onClick={() => chosen === undefined && onChoose(i)}
              disabled={chosen !== undefined}
              className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${
                !showResult
                  ? "border-cyan-400/15 bg-slate-950/40 text-slate-200 hover:border-cyan-300/40"
                  : isCorrect
                    ? "border-emerald-400/40 bg-emerald-400/5 text-emerald-100"
                    : isChosen
                      ? "border-rose-400/40 bg-rose-400/5 text-rose-100"
                      : "border-cyan-400/10 bg-slate-950/20 text-slate-400/70"
              }`}
            >
              {showResult ? (
                isCorrect ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                ) : (
                  <Circle className="mt-0.5 size-4 shrink-0" />
                )
              ) : (
                <Circle className="mt-0.5 size-4 shrink-0 text-cyan-300/50" />
              )}
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Pill({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan-200/90">
      <Icon className="size-3" />
      {label}
    </span>
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
