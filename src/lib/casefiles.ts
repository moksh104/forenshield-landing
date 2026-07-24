// Case file database for ForenShield investigation system.
// Self-contained data — used by /investigate and /casefiles routes.

export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
type Difficulty = "Rookie" | "Analyst" | "Detective" | "Specialist";

type EvidenceType =
  | "email"
  | "message"
  | "callLog"
  | "website"
  | "screenshot"
  | "document"
  | "transaction"
  | "social";

export type Evidence = {
  id: string;
  type: EvidenceType;
  label: string;
  source: string;
  timestamp: string;
  // The investigator must spot these clues during analysis.
  clues: string[];
  // Plain-text body shown in the evidence viewer.
  body: string;
};

type TimelineNode = {
  id: string;
  label: string;
  // ids of evidence supporting this node
  evidenceIds: string[];
};

export type CaseFile = {
  id: string; // e.g. FS-005
  title: string;
  category: string;
  severity: Severity;
  difficulty: Difficulty;
  victim: { name: string; profile: string };
  incident: string;
  briefing: string;
  objectives: string[];
  evidence: Evidence[];
  // Canonical attack chain — investigator rebuilds this.
  chain: TimelineNode[];
  // Multiple-choice forensic verdict.
  verdictOptions: string[];
  correctVerdict: string;
  threatClassification: string;
  recommendations: string[];
  xp: number;
};

export const CASE_FILES: CaseFile[] = [
  {
    id: "FS-001",
    title: "UPI Fraud Investigation",
    category: "Financial Forensics",
    severity: "CRITICAL",
    difficulty: "Detective",
    xp: 850,
    victim: {
      name: "Riya Sharma",
      profile: "22 · University student · Tier-2 city",
    },
    incident:
      "Victim received a refund call from a self-proclaimed support agent. ₹47,800 drained across four UPI transactions in 11 minutes.",
    briefing:
      "A university student reports unauthorized UPI debits following a refund call from a 'customer support agent'. Determine the social engineering vector, recover the attacker's pivot points, and classify the fraud pattern.",
    objectives: [
      "Identify the initial social engineering vector",
      "Map the transaction flow across mule accounts",
      "Classify the fraud under NCRP taxonomy",
    ],
    evidence: [
      {
        id: "E1",
        type: "callLog",
        label: "Incoming call · +91 73XX XX1190",
        source: "Victim handset",
        timestamp: "14:02 IST",
        clues: ["spoofed CLI", "non-bank prefix", "call duration 11m"],
        body:
          "Caller claimed to be from 'UPI Refund Cell'. Asked victim to install AnyDesk to 'verify the refund'. Provided a 9-digit code over the call.",
      },
      {
        id: "E2",
        type: "screenshot",
        label: "AnyDesk session screenshot",
        source: "Victim handset",
        timestamp: "14:06 IST",
        clues: ["remote access tool", "screen mirroring", "session id 845 192 736"],
        body:
          "AnyDesk session active with remote operator. Victim's UPI app open with PIN field visible.",
      },
      {
        id: "E3",
        type: "transaction",
        label: "4× UPI debits to rotating VPAs",
        source: "Bank statement",
        timestamp: "14:09–14:20 IST",
        clues: ["mule accounts", "amounts just below ₹15k threshold", "rotating VPAs"],
        body:
          "₹14,900 → bharatpe.merchant82@ybl\n₹14,800 → q83hd@paytm\n₹13,200 → rohit.shaw99@oksbi\n₹4,900  → kk_traders@axl",
      },
      {
        id: "E4",
        type: "message",
        label: "SMS — 'Refund initiated'",
        source: "Victim inbox",
        timestamp: "13:58 IST",
        clues: ["look-alike sender id", "short link", "urgency cue"],
        body:
          "VK-UPIREF: Your refund of ₹2,499 is pending. Confirm within 10 min: hxxps://upi-refund[.]link/r/8273",
      },
    ],
    chain: [
      { id: "T1", label: "Spoofed refund SMS", evidenceIds: ["E4"] },
      { id: "T2", label: "Vishing call + AnyDesk install", evidenceIds: ["E1", "E2"] },
      { id: "T3", label: "PIN harvested via screen share", evidenceIds: ["E2"] },
      { id: "T4", label: "Funds routed to mule VPAs", evidenceIds: ["E3"] },
    ],
    verdictOptions: [
      "Card skimming at POS terminal",
      "Vishing + Remote Access Tool abuse",
      "SIM swap attack",
      "QR code tampering",
    ],
    correctVerdict: "Vishing + Remote Access Tool abuse",
    threatClassification: "Social Engineering → Remote Access Abuse → Financial Fraud",
    recommendations: [
      "Never install screen-share apps on request from unknown callers",
      "Banks do not ask for UPI PIN — treat any such request as fraud",
      "Enable per-transaction biometric for UPI above ₹5,000",
      "Report within 1 hour on cybercrime.gov.in (golden hour rule)",
    ],
  },
  {
    id: "FS-005",
    title: "Phishing Attack — Spoofed Invoice",
    category: "Email Forensics",
    severity: "HIGH",
    difficulty: "Analyst",
    xp: 620,
    victim: {
      name: "Arjun Mehta",
      profile: "Finance Associate · Mid-size firm",
    },
    incident:
      "Finance associate opened a vendor invoice that triggered credential harvesting. SSO session token exfiltrated.",
    briefing:
      "A finance associate clicked a link in what appeared to be a routine vendor invoice. Determine how the lure bypassed filters and whether credentials were harvested.",
    objectives: [
      "Analyze the email header for spoofing indicators",
      "Inspect the landing URL for impersonation cues",
      "Determine the payload and exfiltration channel",
    ],
    evidence: [
      {
        id: "E1",
        type: "email",
        label: "Invoice email · accounts@vend0r-billing.com",
        source: "Outlook · Inbox",
        timestamp: "09:14 IST",
        clues: ["look-alike domain (0 vs o)", "SPF=fail", "Reply-To differs from From"],
        body:
          "From: Vendor Billing <accounts@vend0r-billing.com>\nReply-To: refunds@mailgrid.cc\nSubject: Invoice #INV-2025-0817 — action required\n\nPlease review attached invoice within 24h.",
      },
      {
        id: "E2",
        type: "website",
        label: "Landing page · login.microsft-365[.]com",
        source: "Browser history",
        timestamp: "09:16 IST",
        clues: ["typosquat domain", "no HSTS", "Let's Encrypt cert issued 2h prior"],
        body:
          "Microsoft 365 login replica. Form posts credentials to /api/collect on an attacker-controlled origin.",
      },
      {
        id: "E3",
        type: "document",
        label: "Email headers (raw)",
        source: "Exported .eml",
        timestamp: "09:14 IST",
        clues: ["Received-SPF: fail", "DKIM=none", "Return-Path mismatch"],
        body:
          "Received-SPF: fail (microsoft.com: domain of vend0r-billing.com does not designate 198.51.100.42)\nAuthentication-Results: dkim=none; dmarc=fail",
      },
    ],
    chain: [
      { id: "T1", label: "Spoofed invoice delivered", evidenceIds: ["E1", "E3"] },
      { id: "T2", label: "User clicks typosquat link", evidenceIds: ["E2"] },
      { id: "T3", label: "Credential harvest via fake SSO", evidenceIds: ["E2"] },
      { id: "T4", label: "Session token exfiltrated", evidenceIds: ["E2"] },
    ],
    verdictOptions: [
      "Watering-hole attack",
      "Credential phishing via typosquat",
      "Insider data leak",
      "Supply-chain compromise",
    ],
    correctVerdict: "Credential phishing via typosquat",
    threatClassification: "Phishing → Credential Harvesting → Session Hijack",
    recommendations: [
      "Enforce conditional access with device compliance",
      "Quarantine emails failing SPF/DKIM/DMARC alignment",
      "Deploy phishing-resistant MFA (FIDO2)",
      "User awareness drill on look-alike domains",
    ],
  },
  {
    id: "FS-003",
    title: "WhatsApp OTP Scam",
    category: "Account Takeover",
    severity: "HIGH",
    difficulty: "Rookie",
    xp: 420,
    victim: {
      name: "Neha Iyer",
      profile: "28 · Marketing professional",
    },
    incident:
      "Victim shared a 6-digit code with a 'friend' over WhatsApp. Account hijacked within 90 seconds.",
    briefing:
      "Victim's WhatsApp was hijacked after she shared a code she 'received by mistake'. Reconstruct the attacker's playbook.",
    objectives: [
      "Identify the pretext used by the attacker",
      "Determine which code was actually shared",
      "Recommend recovery and prevention steps",
    ],
    evidence: [
      {
        id: "E1",
        type: "message",
        label: "Chat with 'Cousin Aditi'",
        source: "WhatsApp backup",
        timestamp: "21:44 IST",
        clues: ["urgency framing", "trusted-contact pretext", "asks for 6-digit code"],
        body:
          "Aditi: hey I sent my login code to your number by mistake, can you forward it? bank issue, urgent 🙏",
      },
      {
        id: "E2",
        type: "message",
        label: "SMS · 'WhatsApp code: 472-913'",
        source: "Victim inbox",
        timestamp: "21:43 IST",
        clues: ["WhatsApp registration code", "do-not-share warning ignored"],
        body:
          "Your WhatsApp code: 472-913. Don't share this code with others.",
      },
      {
        id: "E3",
        type: "social",
        label: "Aditi's real account",
        source: "Cross-check",
        timestamp: "—",
        clues: ["Aditi's number unchanged", "no recent activity from her"],
        body:
          "Confirmed: Aditi never sent a message. The attacker impersonated her using a profile photo scraped from Instagram.",
      },
    ],
    chain: [
      { id: "T1", label: "Attacker triggers WhatsApp registration on victim's number", evidenceIds: ["E2"] },
      { id: "T2", label: "Impersonates trusted contact to request OTP", evidenceIds: ["E1", "E3"] },
      { id: "T3", label: "Account hijacked using shared OTP", evidenceIds: ["E2"] },
    ],
    verdictOptions: [
      "SIM swap",
      "OTP social engineering / impersonation",
      "Malware on device",
      "Insider at telco",
    ],
    correctVerdict: "OTP social engineering / impersonation",
    threatClassification: "Social Engineering → OTP Theft → Account Takeover",
    recommendations: [
      "Enable WhatsApp two-step verification (PIN)",
      "Never share registration codes — even with known contacts",
      "Verify identity over a secondary channel before acting",
    ],
  },
  {
    id: "FS-007",
    title: "Fake Job Recruitment Scam",
    category: "Social Engineering",
    severity: "MEDIUM",
    difficulty: "Analyst",
    xp: 540,
    victim: {
      name: "Karan Patel",
      profile: "Recent graduate · Job-seeker",
    },
    incident:
      "Victim paid ₹6,500 in 'onboarding fees' for an offer that never existed. Documents submitted now circulate on dark web.",
    briefing:
      "A graduate received an offer letter from a Fortune-500-styled portal. Determine the operator's tradecraft and the downstream identity risk.",
    objectives: [
      "Spot the impersonation cues in the offer letter",
      "Trace the payment beneficiary",
      "Assess identity theft exposure",
    ],
    evidence: [
      {
        id: "E1",
        type: "document",
        label: "Offer letter PDF",
        source: "Email attachment",
        timestamp: "—",
        clues: ["mismatched logo resolution", "wrong CIN format", "Gmail HR contact"],
        body:
          "Offer for 'Junior Analyst' at 'Accen-ture Global Services'. Joining fee ₹6,500 refundable on day-1. HR: hr.accenture.recruit@gmail.com",
      },
      {
        id: "E2",
        type: "transaction",
        label: "Onboarding fee payment",
        source: "UPI history",
        timestamp: "—",
        clues: ["beneficiary is individual not company", "no GST invoice"],
        body: "₹6,500 → onboarding.fees@upi (Beneficiary: 'R. Kumar')",
      },
      {
        id: "E3",
        type: "document",
        label: "KYC docs submitted",
        source: "Victim",
        timestamp: "—",
        clues: ["Aadhaar + PAN + cancelled cheque shared", "no masking"],
        body: "Full unmasked Aadhaar, PAN, bank cheque image, signature sample.",
      },
    ],
    chain: [
      { id: "T1", label: "Fake recruiter outreach", evidenceIds: ["E1"] },
      { id: "T2", label: "Forged offer + onboarding fee", evidenceIds: ["E1", "E2"] },
      { id: "T3", label: "KYC documents harvested", evidenceIds: ["E3"] },
      { id: "T4", label: "Identity resale risk", evidenceIds: ["E3"] },
    ],
    verdictOptions: [
      "Advance-fee + identity harvesting scam",
      "Insider recruiter fraud",
      "Tax evasion scheme",
      "Cryptocurrency Ponzi",
    ],
    correctVerdict: "Advance-fee + identity harvesting scam",
    threatClassification: "Recruitment Fraud → Advance Fee → Identity Theft",
    recommendations: [
      "Legitimate employers never charge onboarding fees",
      "Always use masked Aadhaar for KYC",
      "Verify employer via official career portal, not email",
      "Freeze CIBIL and monitor for fraudulent loans",
    ],
  },
];



export const RANKS = [
  { name: "Cyber Rookie", xp: 0 },
  { name: "Threat Hunter", xp: 1000 },
  { name: "Digital Detective", xp: 2500 },
  { name: "Forensics Analyst", xp: 5000 },
  { name: "Cyber Investigator", xp: 8500 },
  { name: "Threat Intelligence Specialist", xp: 13000 },
  { name: "Cyber Guardian", xp: 20000 },
] as const;
