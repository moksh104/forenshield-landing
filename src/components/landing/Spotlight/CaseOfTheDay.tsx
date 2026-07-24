import { useState } from "react";
import { Eye, ArrowRight } from "lucide-react";
import { CasePreviewModal } from "./CasePreviewModal";

export function CaseOfTheDay() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="relative h-full rounded-[20px] overflow-hidden border border-primary/15 group transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_8px_30px_-10px_oklch(0.55_0.22_260/0.4)]">
        {/* Moody hero */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Base moody gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 100%, #3B0A0A 0%, #1A0510 35%, #0A0E1A 70%, #05070F 100%)",
            }}
          />
          {/* Red glow behind figure */}
          <div
            className="absolute inset-0 motion-safe:animate-[pulse-glow_4s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(ellipse 60% 45% at 50% 55%, oklch(0.65 0.24 25 / 0.45), transparent 65%)",
            }}
          />
          {/* Grain / noise texture (SVG fractal, tiled) */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-overlay opacity-[0.35] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
              backgroundSize: "160px 160px",
            }}
          />
          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 45%, #000 130%)",
            }}
          />
          {/* Hooded silhouette */}
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
            <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice">
              {/* Body */}
              <path
                d="M100 38 Q66 40 60 82 L52 150 L148 150 L140 82 Q134 40 100 38 Z"
                fill="#000"
                opacity="0.92"
              />
              {/* Inner hood shadow */}
              <path
                d="M78 68 Q100 52 122 68 L120 96 Q100 104 80 96 Z"
                fill="#000"
              />
              {/* Face rim highlight */}
              <path
                d="M76 68 Q100 50 124 68"
                fill="none"
                stroke="oklch(0.55 0.22 25 / 0.7)"
                strokeWidth="1"
              />
              {/* Glowing eyes */}
              <ellipse cx="90" cy="82" rx="3" ry="1.6" fill="#EF4444">
                <animate attributeName="opacity" values="1;0.35;1" dur="2.4s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="110" cy="82" rx="3" ry="1.6" fill="#EF4444">
                <animate attributeName="opacity" values="0.35;1;0.35" dur="2.4s" repeatCount="indefinite" />
              </ellipse>
              {/* Shoulder edge highlight */}
              <path d="M60 100 Q60 130 68 150" fill="none" stroke="oklch(0.55 0.22 25 / 0.5)" strokeWidth="1" />
              <path d="M140 100 Q140 130 132 150" fill="none" stroke="oklch(0.55 0.22 25 / 0.5)" strokeWidth="1" />
            </svg>
          </div>
          {/* Scanline sweep */}
          <div
            aria-hidden
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-danger/60 to-transparent motion-safe:animate-scan"
            style={{ top: 0 }}
          />
          {/* Bottom fade for text legibility */}
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[oklch(0.10_0.02_260)]/95 via-[oklch(0.10_0.02_260)]/75 to-transparent" />
          {/* Badge */}
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-md bg-white/10 border border-white/20 px-2 py-0.5 text-[10px] font-mono tracking-wider text-white backdrop-blur">
            <Eye className="h-3 w-3" /> FEATURED INVESTIGATION
          </span>
          {/* Animated warning indicator */}
          <div className="absolute top-3 right-3 h-8 w-8" aria-label="Warning">
            <span className="absolute inset-0 rounded-full bg-danger/30 motion-safe:animate-[ping-soft_2s_ease-in-out_infinite]" />
            <div className="relative h-8 w-8 rounded-full bg-danger/20 border border-danger/50 flex items-center justify-center shadow-[0_0_16px_oklch(0.65_0.24_25/0.5)] motion-safe:animate-[pulse-glow_2s_ease-in-out_infinite]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path d="M12 3L22 20H2L12 3Z" fill="var(--color-danger)" />
                <path d="M12 9v5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="18" r="1.5" fill="white" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-[oklch(0.16_0.03_260)] to-[oklch(0.10_0.02_260)]">
          <div className="text-white font-display font-bold text-lg leading-tight">
            UPI Fraud Investigation
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            A user lost ₹25,000 in a UPI scam. Trace the transaction trail,
            identify the mule account, and recover lost funds.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-md bg-danger/15 border border-danger/30 px-2 py-0.5 text-[10px] font-medium text-danger">
              Medium
            </span>
            <span className="rounded-md bg-primary/15 border border-primary/30 px-2 py-0.5 text-[10px] font-medium text-primary">
              4 Evidence
            </span>
            <span className="rounded-md bg-danger/15 border border-danger/30 px-2 py-0.5 text-[10px] font-medium text-danger">
              +250 XP
            </span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="relative w-full mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-primary transition-[transform,box-shadow] duration-300 will-change-transform hover:shadow-[0_10px_40px_-8px_oklch(0.55_0.22_260/0.75)]"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <span className="relative inline-flex items-center gap-2">
              View Sample Case
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
      <CasePreviewModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
