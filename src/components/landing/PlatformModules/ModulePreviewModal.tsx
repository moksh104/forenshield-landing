import { MouseEvent, ReactNode } from "react";
import { X, Layers, Target, GraduationCap, Rocket, ArrowRight, LucideIcon } from "lucide-react";
import { ModuleDetail } from "./data";

export interface ModulePreviewModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  icon: LucideIcon;
  desc: string;
  art?: ReactNode;
  details: ModuleDetail;
}

export function ModulePreviewModal({
  open,
  onOpenChange,
  title,
  icon: Icon,
  desc,
  art,
  details,
}: ModulePreviewModalProps) {
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
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={() => onOpenChange(false)}
        style={{ animation: "fade-up 0.3s ease" }}
      />
      <div
        className="relative w-[min(96vw,640px)] max-h-[92vh] overflow-hidden rounded-2xl border border-white/10 shadow-elevated"
        style={{
          background: "rgba(11,18,32,0.95)",
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
          animation: "fade-up 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-30 h-9 w-9 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/40 transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="overflow-y-auto max-h-[92vh]">
          {/* Art preview */}
          <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[oklch(0.14_0.03_260)] via-[oklch(0.18_0.04_260)] to-[oklch(0.12_0.03_260)] border-b border-white/5">
            {art && <div className="absolute inset-0">{art}</div>}
            <span className="absolute top-4 left-4 h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
              <Icon className="h-5 w-5" />
            </span>
          </div>

          {/* Header */}
          <div className="px-6 pt-5 pb-4 border-b border-white/5">
            <h3 className="font-display font-bold text-white text-2xl tracking-tight">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-5">
            {/* Overview */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <Layers className="h-3.5 w-3.5 text-primary" /> Module Overview
              </div>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">{details.overview}</p>
            </div>

            {/* Key Features */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <Target className="h-3.5 w-3.5 text-primary" /> Key Features
              </div>
              <ul className="mt-2 space-y-1.5">
                {details.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="text-primary mt-0.5 shrink-0">→</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] text-muted-foreground uppercase">
                <GraduationCap className="h-3.5 w-3.5 text-primary" /> Skills You'll Learn
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {details.skills.map((s, i) => (
                  <span key={i} className="rounded-md bg-primary/10 border border-primary/25 px-2.5 py-1 text-[11px] font-medium text-primary">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="px-6 pb-6 pt-2 border-t border-white/5 text-center">
            <p className="text-sm text-muted-foreground">
              Access {title} and all platform modules in the ForenShield app.
            </p>
            <a
              href="#download"
              onClick={handleDownload}
              className="relative mt-4 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-primary transition-[transform,box-shadow] duration-300 hover:shadow-[0_10px_40px_-8px_oklch(0.55_0.22_260/0.75)]"
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
  );
}
