import { MouseEvent } from "react";
import { AlertTriangle, CheckCircle2, Clock, Eye, FileSearch, FileText, FolderOpen, Mail, Search, Shield, X, Rocket, ArrowRight } from "lucide-react";

export function CasePreviewModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  if (!open) return null;

  const handleDownload = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onOpenChange(false);
    const target = document.querySelector("#download");
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={() => onOpenChange(false)}
        style={{ animation: "fade-up 0.3s ease" }}
      />
      {/* Modal */}
      <div
        className="relative w-[min(96vw,680px)] max-h-[92vh] overflow-hidden rounded-2xl border border-white/10 shadow-elevated"
        style={{
          background: "rgba(11,18,32,0.95)",
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
          animation: "fade-up 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Close */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-30 h-9 w-9 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/40 transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="overflow-y-auto max-h-[92vh] custom-scrollbar">
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.22em]">
              <span className="inline-flex items-center gap-1 rounded-full bg-danger/15 border border-danger/30 px-2 py-0.5 text-danger">
                <Eye className="h-2.5 w-2.5" /> FEATURED INVESTIGATION
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-danger/40 bg-danger/10 px-1.5 py-0.5 text-danger">
                <AlertTriangle className="h-2.5 w-2.5" /> MEDIUM
              </span>
            </div>
            <h3 className="mt-3 font-display font-bold text-white text-2xl tracking-tight">
              UPI Fraud Investigation
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-lg">
              A user lost ₹25,000 in a UPI scam. Trace the transaction trail,
              identify the mule account, and recover lost funds.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="rounded-md bg-primary/15 border border-primary/30 px-2 py-0.5 text-[10px] font-medium text-primary">Financial Forensics</span>
              <span className="rounded-md bg-primary/15 border border-primary/30 px-2 py-0.5 text-[10px] font-medium text-primary">4 Evidence Files</span>
              <span className="rounded-md bg-danger/15 border border-danger/30 px-2 py-0.5 text-[10px] font-medium text-danger">+250 XP</span>
            </div>
          </div>

          {/* Content sections */}
          <div className="px-6 py-5 space-y-5">
            {/* Investigation Overview */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <FileSearch className="h-3.5 w-3.5 text-primary" /> Investigation Overview
              </div>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                Investigate a real-world UPI payment fraud case. You'll analyze transaction metadata,
                trace the flow of funds across multiple wallets, identify mule accounts used for
                laundering, and build a forensic report for law enforcement.
              </p>
            </div>

            {/* Evidence Preview */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <FolderOpen className="h-3.5 w-3.5 text-primary" /> Evidence Preview
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  { name: "Transaction Logs", count: "4 files", icon: FileText },
                  { name: "UPI Payment Metadata", count: "2 files", icon: Search },
                  { name: "KYC Verification Records", count: "1 file", icon: Shield },
                  { name: "Communication Logs", count: "3 files", icon: Mail },
                ].map((e, i) => {
                  const EIcon = e.icon;
                  return (
                    <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 flex items-center gap-2.5">
                      <span className="h-7 w-7 shrink-0 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                        <EIcon className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[11px] text-white font-medium truncate">{e.name}</div>
                        <div className="text-[9px] text-muted-foreground font-mono">{e.count}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline Preview */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <Clock className="h-3.5 w-3.5 text-primary" /> Timeline Preview
              </div>
              <div className="mt-2 relative pl-4 space-y-3 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-primary/50 before:via-warning/50 before:to-danger/50">
                {[
                  { time: "Day 1", label: "Initial Report Filed", tone: "text-primary" },
                  { time: "Day 1–2", label: "Evidence Collection & Preservation", tone: "text-primary" },
                  { time: "Day 2–3", label: "Transaction Analysis & Tracing", tone: "text-danger" },
                  { time: "Day 3–4", label: "Suspect Identification & Reporting", tone: "text-danger" },
                ].map((t, i) => (
                  <div key={i} className="relative">
                    <span className={`absolute -left-[13px] top-1 h-2.5 w-2.5 rounded-full border-2 border-background ${
                      i >= 2 ? "bg-danger" : "bg-primary"
                    }`} />
                    <div className="text-[9px] font-mono text-muted-foreground">{t.time}</div>
                    <div className={`text-[12px] font-medium ${t.tone}`}>{t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Threat Summary */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <AlertTriangle className="h-3.5 w-3.5 text-danger" /> Threat Summary
              </div>
              <div className="mt-2 rounded-lg border border-danger/20 bg-danger/[0.04] px-4 py-3">
                <div className="text-sm text-white/90 font-medium">Financial fraud via UPI credential theft</div>
                <div className="mt-1 flex flex-wrap gap-3 text-[10px] font-mono text-muted-foreground">
                  <span>Severity: <span className="text-danger">Medium</span></span>
                  <span>Category: <span className="text-white/80">Financial Crime</span></span>
                  <span>Vector: <span className="text-white/80">Social Engineering</span></span>
                </div>
              </div>
            </div>

            {/* Expected Outcome */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" /> Expected Outcome
              </div>
              <div className="mt-2 rounded-lg border border-success/20 bg-success/[0.04] px-4 py-3">
                <ul className="space-y-1 text-sm text-white/80">
                  <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> Identify the mule account used for fund transfer</li>
                  <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> Trace the complete transaction trail</li>
                  <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> Recover digital evidence for prosecution</li>
                  <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> Generate a forensic investigation report</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Blur overlay + Download CTA */}
          <div className="relative">
            {/* Blurred faux-content */}
            <div className="h-16 overflow-hidden" style={{ filter: "blur(8px)", opacity: 0.3 }}>
              <div className="px-6 space-y-2">
                <div className="h-3 rounded bg-white/10 w-3/4" />
                <div className="h-3 rounded bg-white/10 w-1/2" />
                <div className="h-3 rounded bg-white/10 w-2/3" />
              </div>
            </div>
            {/* CTA section */}
            <div className="relative px-6 pt-2 pb-8 text-center border-t border-white/5 bg-gradient-to-t from-[oklch(0.10_0.02_260)] to-transparent">
              <p className="text-sm text-white/90 font-medium">
                This is a preview.
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Download ForenShield to access the complete investigation,
                interactive evidence analysis, and professional case reports.
              </p>
              <a
                href="#download"
                onClick={handleDownload}
                className="relative mt-5 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-primary transition-[transform,box-shadow] duration-300 hover:shadow-[0_10px_40px_-8px_oklch(0.55_0.22_260/0.75)]"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <span className="relative inline-flex items-center gap-2">
                  <Rocket className="h-4 w-4" />
                  Get ForenShield
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
