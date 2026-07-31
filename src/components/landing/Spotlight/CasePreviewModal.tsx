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
        className="absolute inset-0 bg-slate-900/60 dark:bg-background/80 backdrop-blur-md"
        onClick={() => onOpenChange(false)}
        style={{ animation: "fade-up 0.3s ease" }}
      />
      {/* Modal */}
      <div
        className="relative w-[min(96vw,680px)] max-h-[92vh] overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0D1117] backdrop-blur-xl"
        style={{
          animation: "fade-up 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Close */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-30 h-9 w-9 rounded-full border border-slate-200/90 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20 dark:text-slate-300 dark:hover:text-white transition-all shadow-sm flex items-center justify-center"
          aria-label="Close"
        >
          <X className="h-4.5 w-4.5 stroke-[2.2]" />
        </button>

        <div className="overflow-y-auto max-h-[92vh] custom-scrollbar">
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 border-b border-slate-200/80 dark:border-white/5">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.22em] font-semibold">
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200/80 px-2 py-0.5 text-rose-700 dark:bg-danger/15 dark:border-danger/30 dark:text-danger">
                <Eye className="h-2.5 w-2.5" /> FEATURED INVESTIGATION
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 text-amber-700 dark:bg-amber-500/15 dark:border-amber-500/30 dark:text-amber-400">
                <AlertTriangle className="h-2.5 w-2.5" /> MEDIUM
              </span>
            </div>
            <h3 className="mt-3 font-display font-bold text-slate-900 dark:text-white text-2xl tracking-tight">
              UPI Fraud Investigation
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-muted-foreground leading-relaxed max-w-lg">
              A user lost ₹25,000 in a UPI scam. Trace the transaction trail,
              identify the mule account, and recover lost funds.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 font-medium">
              <span className="rounded-md bg-blue-50 border border-blue-200/80 px-2 py-0.5 text-[10px] text-blue-700 dark:bg-primary/15 dark:border-primary/30 dark:text-primary">Financial Forensics</span>
              <span className="rounded-md bg-blue-50 border border-blue-200/80 px-2 py-0.5 text-[10px] text-blue-700 dark:bg-primary/15 dark:border-primary/30 dark:text-primary">4 Evidence Files</span>
              <span className="rounded-md bg-rose-50 border border-rose-200/80 px-2 py-0.5 text-[10px] text-rose-700 dark:bg-danger/15 dark:border-danger/30 dark:text-danger">+250 XP</span>
            </div>
          </div>

          {/* Content sections */}
          <div className="px-6 py-5 space-y-5">
            {/* Investigation Overview */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-slate-500 dark:text-slate-400 font-bold uppercase">
                <FileSearch className="h-3.5 w-3.5 text-blue-600 dark:text-primary" /> Investigation Overview
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-white/80 leading-relaxed">
                Investigate a real-world UPI payment fraud case. You'll analyze transaction metadata,
                trace the flow of funds across multiple wallets, identify mule accounts used for
                laundering, and build a forensic report for law enforcement.
              </p>
            </div>

            {/* Evidence Preview */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-slate-500 dark:text-slate-400 font-bold uppercase">
                <FolderOpen className="h-3.5 w-3.5 text-blue-600 dark:text-primary" /> Evidence Preview
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
                    <div key={i} className="rounded-lg border border-slate-200/80 bg-slate-50/80 hover:bg-slate-100/80 dark:border-white/5 dark:bg-white/[0.02] px-3 py-2.5 flex items-center gap-2.5 transition-colors">
                      <span className="h-7 w-7 shrink-0 rounded-md bg-blue-100/70 border border-blue-200 flex items-center justify-center text-blue-600 dark:bg-primary/10 dark:border-primary/30 dark:text-primary">
                        <EIcon className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[11px] text-slate-900 dark:text-white font-semibold truncate">{e.name}</div>
                        <div className="text-[9px] text-slate-500 dark:text-muted-foreground font-mono">{e.count}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline Preview */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-slate-500 dark:text-slate-400 font-bold uppercase">
                <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-primary" /> Timeline Preview
              </div>
              <div className="mt-2 relative pl-4 space-y-3 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-px before:bg-slate-300 dark:before:bg-slate-700">
                {[
                  { time: "Day 1", label: "Initial Report Filed", tone: "text-blue-700 dark:text-primary" },
                  { time: "Day 1–2", label: "Evidence Collection & Preservation", tone: "text-blue-700 dark:text-primary" },
                  { time: "Day 2–3", label: "Transaction Analysis & Tracing", tone: "text-rose-700 dark:text-danger" },
                  { time: "Day 3–4", label: "Suspect Identification & Reporting", tone: "text-rose-700 dark:text-danger" },
                ].map((t, i) => (
                  <div key={i} className="relative">
                    <span className={`absolute -left-[13px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-background ${
                      i >= 2 ? "bg-rose-600 dark:bg-danger" : "bg-blue-600 dark:bg-primary"
                    }`} />
                    <div className="text-[9px] font-mono text-slate-500 dark:text-muted-foreground">{t.time}</div>
                    <div className={`text-[12px] font-semibold ${t.tone}`}>{t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Threat Summary */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-slate-500 dark:text-slate-400 font-bold uppercase">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-600 dark:text-danger" /> Threat Summary
              </div>
              <div className="mt-2 rounded-lg border border-rose-200/80 bg-rose-50/60 dark:border-danger/20 dark:bg-danger/[0.04] px-4 py-3">
                <div className="text-sm text-slate-900 dark:text-white/90 font-semibold">Financial fraud via UPI credential theft</div>
                <div className="mt-1 flex flex-wrap gap-3 text-[10px] font-mono text-slate-600 dark:text-muted-foreground">
                  <span>Severity: <span className="text-rose-700 dark:text-danger font-semibold">Medium</span></span>
                  <span>Category: <span className="text-slate-900 dark:text-white/80 font-medium">Financial Crime</span></span>
                  <span>Vector: <span className="text-slate-900 dark:text-white/80 font-medium">Social Engineering</span></span>
                </div>
              </div>
            </div>

            {/* Expected Outcome */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-slate-500 dark:text-slate-400 font-bold uppercase">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-success" /> Expected Outcome
              </div>
              <div className="mt-2 rounded-lg border border-emerald-200/80 bg-emerald-50/60 dark:border-success/20 dark:bg-success/[0.04] px-4 py-3">
                <ul className="space-y-1 text-sm text-slate-700 dark:text-white/80">
                  <li className="flex items-start gap-2"><span className="text-emerald-600 dark:text-success mt-0.5 font-bold">✓</span> Identify the mule account used for fund transfer</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-600 dark:text-success mt-0.5 font-bold">✓</span> Trace the complete transaction trail</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-600 dark:text-success mt-0.5 font-bold">✓</span> Recover digital evidence for prosecution</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-600 dark:text-success mt-0.5 font-bold">✓</span> Generate a forensic investigation report</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Blur overlay + Download CTA */}
          <div className="relative">
            {/* Blurred faux-content */}
            <div className="h-14 overflow-hidden" style={{ filter: "blur(8px)", opacity: 0.25 }}>
              <div className="px-6 space-y-2">
                <div className="h-3 rounded bg-slate-300 dark:bg-white/10 w-3/4" />
                <div className="h-3 rounded bg-slate-300 dark:bg-white/10 w-1/2" />
                <div className="h-3 rounded bg-slate-300 dark:bg-white/10 w-2/3" />
              </div>
            </div>
            {/* CTA section */}
            <div className="relative px-6 pt-3 pb-8 text-center border-t border-slate-200/80 bg-slate-50/90 dark:border-white/5 dark:bg-[#0D1117]">
              <p className="text-sm text-slate-900 dark:text-white/90 font-semibold">
                This is a preview.
              </p>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-muted-foreground max-w-md mx-auto leading-relaxed">
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
