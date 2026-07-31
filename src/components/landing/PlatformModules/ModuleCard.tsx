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
      className="group relative snap-start shrink-0 w-[340px] sm:w-[400px] rounded-2xl overflow-hidden border border-border bg-card cursor-pointer transition-all duration-200 will-change-transform hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40"
      style={{
        transform: "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
      }}
    >
      {/* Art */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted border-b border-border">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">{art}</div>
        <span className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-primary">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="p-4">
        <div className="text-foreground font-display font-semibold text-lg">{title}</div>
        <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}
