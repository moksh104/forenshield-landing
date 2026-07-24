import { useState } from "react";
import { BookOpenCheck, Crosshair, ScanSearch, FileCheck2, Award } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";

/* =============================================================
   HOW IT WORKS
   ============================================================= */
export function HowItWorks() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const steps = [
    { icon: BookOpenCheck, title: "Learn Concepts", desc: "Master cyber defense in Academy" },
    { icon: Crosshair, title: "Practice Live", desc: "Face real-world simulations" },
    { icon: ScanSearch, title: "Investigate Cases", desc: "Analyze digital forensics evidence" },
    { icon: FileCheck2, title: "Generate Reports", desc: "File verdicts and export findings" },
    { icon: Award, title: "Earn Rank & XP", desc: "Level up your mission control" },
  ];

  const transitionClass = "transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <section 
      id="features" 
      className="relative px-4 sm:px-8 py-16 sm:py-24 scroll-mt-24 group/timeline"
      onMouseLeave={() => setHoveredIndex(0)}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
          <Reveal>
            <h2 className="relative font-display font-bold tracking-tight text-white text-2xl sm:text-3xl text-center">
              HOW <span className="text-primary">FORENSHIELD</span> WORKS
            </h2>
          </Reveal>

          <div className="relative mt-10 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-2">
            
            {/* CONTINUOUS LINE BACKGROUND (HIDDEN ON MOBILE) */}
            <div className="hidden md:block absolute top-9 left-[10%] right-[10%] h-[2px] bg-primary/10 z-0 overflow-hidden rounded-full">
              {/* FILLED PROGRESS LINE */}
              <div 
                className={`h-full bg-primary origin-left ${transitionClass}`}
                style={{ 
                  transform: `scaleX(${hoveredIndex / (steps.length - 1)})` 
                }}
              />
            </div>

            {steps.map((s, i) => {
              const Icon = s.icon;
              const isHovered = hoveredIndex === i;
              const isPast = i <= hoveredIndex;

              return (
                <Reveal key={i} delay={i * 120}>
                  <div 
                    className="relative flex flex-col items-center text-center cursor-pointer outline-none"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onFocus={() => setHoveredIndex(i)}
                    tabIndex={0}
                  >
                    {/* NODE */}
                    <div 
                      className={`relative h-18 w-18 z-10 flex items-center justify-center ${transitionClass} ${
                        isHovered ? 'scale-[1.08] -translate-y-1' : 'scale-100 translate-y-0'
                      }`}
                    >
                      {/* RADAR PULSE */}
                      <div 
                        className={`absolute inset-0 rounded-full border border-primary ${transitionClass} ${
                          isHovered ? 'opacity-100 animate-radar-ring' : 'opacity-0'
                        }`} 
                      />
                      
                      {/* BACKGROUND / GLOW */}
                      <div 
                        className={`absolute inset-0 rounded-full border ${transitionClass} ${
                          isHovered 
                            ? 'border-primary bg-primary/20' 
                            : isPast 
                              ? 'border-primary/50 bg-primary/10'
                              : 'border-white/10 bg-white/[0.02]'
                        }`}
                        style={{
                          boxShadow: isHovered 
                            ? '0 0 20px var(--primary)' 
                            : isPast 
                              ? '0 0 8px var(--primary)' 
                              : 'none'
                        }}
                      />
                      
                      <div className="relative z-10 h-full w-full rounded-full flex items-center justify-center overflow-hidden">
                        <Icon className={`h-7 w-7 ${transitionClass} ${
                          isHovered 
                            ? 'text-white' 
                            : isPast 
                              ? 'text-primary' 
                              : 'text-primary/40'
                        }`} 
                        style={isHovered ? { filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' } : undefined}
                        />
                      </div>
                    </div>
                    
                    {/* BADGE AND TEXT */}
                    <div className="mt-6 flex items-center justify-center gap-2 relative z-10">
                      <span className={`h-5 w-5 rounded-full ${transitionClass} flex items-center justify-center font-mono text-[10px] font-bold ${
                        isHovered 
                          ? 'bg-primary text-white' 
                          : isPast 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-white/5 text-white/40'
                      }`}
                      style={isHovered ? { boxShadow: '0 0 8px var(--primary)' } : undefined}
                      >
                        0{i + 1}
                      </span>
                      <span className={`text-base font-semibold ${transitionClass} ${
                        isHovered ? 'text-white' : isPast ? 'text-white/80' : 'text-white/40'
                      }`}>
                        {s.title}
                      </span>
                    </div>
                    <div className={`mt-2 text-sm max-w-[12rem] mx-auto relative z-10 ${transitionClass} ${
                      isHovered ? 'opacity-100 -translate-y-1 text-white/90' : 'opacity-60 translate-y-0 text-muted-foreground'
                    }`}>
                      {s.desc}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
