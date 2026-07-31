import { useState, useRef, useEffect } from "react";
import { GraduationCap, Play, FlaskConical, Clock, Trophy, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { FadeContent } from "@/components/animations/FadeContent";
import { ModuleCard } from "./ModuleCard";
import { ModulePreviewModal } from "./ModulePreviewModal";
import { MODULE_DETAILS } from "./data";
import { IllusNetwork, IllusPlay, IllusHacker, IllusDashboard, IllusReports } from "@/components/landing/illustrations";

export function PlatformModules() {
  const [previewModule, setPreviewModule] = useState<string | null>(null);

  const modules = [
    {
      title: "Cyber Academy",
      desc: "5 structured courses from networking basics to advanced forensics",
      icon: GraduationCap,
      art: <IllusNetwork />,
    },
    {
      title: "Simulation Lab",
      desc: "4 live attack simulations with branching decision paths",
      icon: Play,
      art: <IllusPlay />,
    },
    {
      title: "Investigation Lab",
      desc: "Analyze PCAP files, disk images, and device memory",
      icon: FlaskConical,
      art: <IllusHacker />,
    },
    {
      title: "Timeline View",
      desc: "Reconstruct attack sequences with timestamped event correlation",
      icon: Clock,
      art: <IllusDashboard />,
    },
    {
      title: "Mission Control",
      desc: "Track XP, rank progression, and case completion across all modules",
      icon: Trophy,
      art: <IllusReports />,
    },
  ];

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const hoverRef = useRef(false);
  const scroll = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  // Keyboard nav
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (!el.matches(":hover") && document.activeElement !== el) return;
      if (e.key === "ArrowRight") { e.preventDefault(); scroll(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); scroll(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auto-advance, pauses on hover
  useEffect(() => {
    const id = setInterval(() => {
      const el = scrollerRef.current;
      if (!el || hoverRef.current) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: el.clientWidth * 0.5, behavior: "smooth" });
      }
    }, 4500);
    return () => clearInterval(id);
  }, []);

  // Mouse-drag
  const dragState = useRef<{ x: number; scroll: number; active: boolean }>({ x: 0, scroll: 0, active: false });
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = { x: e.clientX, scroll: el.scrollLeft, active: true };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  };
  const onMoveDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragState.current;
    const el = scrollerRef.current;
    if (!s.active || !el) return;
    el.scrollLeft = s.scroll - (e.clientX - s.x);
  };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragState.current.active = false;
    const el = scrollerRef.current;
    if (el) el.style.cursor = "";
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  };

  return (
    <section id="platform" className="relative px-4 sm:px-8 py-8 sm:py-12 scroll-mt-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-mono mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="tracking-[0.24em] uppercase text-primary">
                Platform Capabilities
              </span>
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="font-display font-bold tracking-tight text-foreground text-2xl sm:text-3xl text-center">
              5 Integrated Modules, One Platform
            </h2>
          </Reveal>
        </div>

        <div
          className="relative mt-8"
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => (hoverRef.current = false)}
        >
          <button
            onClick={() => scroll(-1)}
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-card border border-border text-foreground shadow-sm hover:bg-muted hover:border-primary/40 transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 stroke-[2.5]" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-card border border-border text-foreground shadow-sm hover:bg-muted hover:border-primary/40 transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 stroke-[2.5]" />
          </button>
          <div
            ref={scrollerRef}
            tabIndex={0}
            onPointerDown={onDown}
            onPointerMove={onMoveDrag}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide cursor-grab select-none outline-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-xl"
            style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }}
          >
            {modules.map((m, i) => (
              <div key={i} className="snap-start shrink-0 flex">
                <FadeContent delay={0.1 + i * 0.1} amount={0.2}>
                  <ModuleCard {...m} onPreview={() => setPreviewModule(m.title)} />
                </FadeContent>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModulePreviewModal
        open={previewModule !== null}
        onOpenChange={(v) => { if (!v) setPreviewModule(null); }}
        title={previewModule || ""}
        icon={modules.find((m) => m.title === previewModule)?.icon || FlaskConical}
        desc={modules.find((m) => m.title === previewModule)?.desc || ""}
        art={modules.find((m) => m.title === previewModule)?.art}
        details={MODULE_DETAILS[previewModule || ""] || { overview: "", features: [], skills: [] }}
      />
    </section>
  );
}
