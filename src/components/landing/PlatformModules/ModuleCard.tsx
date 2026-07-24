import { useRef, MouseEvent, ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export interface ModuleCardProps {
  title: string;
  desc: string;
  icon: LucideIcon;
  art: ReactNode;
  onPreview: () => void;
}

export function ModuleCard({
  title,
  desc,
  icon: Icon,
  art,
  onPreview,
}: ModuleCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${-y * 3}deg`);
    el.style.setProperty("--ry", `${x * 4}deg`);
    el.style.setProperty("--glow-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--glow-y", `${e.clientY - r.top}px`);
  };
  
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onClick={onPreview}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative snap-start shrink-0 w-[340px] sm:w-[400px] rounded-[20px] overflow-hidden border border-primary/15 bg-white/[0.02] shadow-[inset_0_1px_0_oklch(1_0_0/0.04)] cursor-pointer transition-all duration-[250ms] ease-out will-change-transform hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_8px_30px_-10px_oklch(0.55_0.22_260/0.4)]"
      style={{
        transform: "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
      }}
    >
      {/* Cursor glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(300px circle at var(--glow-x,50%) var(--glow-y,50%), oklch(0.55 0.22 260 / 0.18), transparent 60%)",
        }}
      />
      {/* Art */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[oklch(0.14_0.03_260)] via-[oklch(0.18_0.04_260)] to-[oklch(0.12_0.03_260)] border-b border-white/5">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">{art}</div>
        <span className="absolute top-3 left-3 h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="p-4">
        <div className="text-white font-display font-semibold text-lg">{title}</div>
        <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
      </div>
      {/* Animated border */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "linear-gradient(120deg, transparent, oklch(0.55 0.22 260 / 0.5), transparent) border-box",
          WebkitMask:
            "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
    </div>
  );
}
