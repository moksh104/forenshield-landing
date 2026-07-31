import { useState } from "react";
import { GraduationCap, BookOpen, Zap, ShieldCheck, Wifi, Shield, AlertTriangle, ArrowRight } from "lucide-react";
import { CurriculumModal } from "./CurriculumModal";
import { CountUp } from "@/components/animations/CountUp";

export function AcademyCard() {
  const [modalOpen, setModalOpen] = useState(false);

  const courses = [
    { icon: Wifi, name: "Networking Basics", progress: 75, xp: 1240, tone: "primary" },
    { icon: Shield, name: "Web Security", progress: 60, xp: 980, tone: "success" },
    { icon: AlertTriangle, name: "Linux Essentials", progress: 40, xp: 620, tone: "warning" },
  ];

  return (
    <>
      <div className="relative h-full rounded-2xl overflow-hidden border border-border bg-card p-6 sm:p-8 flex flex-col shadow-sm dark:border-[#30363D] dark:bg-[#161B22]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-[#2F81F7]" />
            <span className="text-foreground font-display font-bold text-lg">Cyber Academy</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-muted border border-border px-2.5 py-0.5 text-[10px] font-mono text-warning dark:bg-[#1C2128] dark:border-[#30363D] dark:text-[#D29922]">
            <BookOpen className="h-2.5 w-2.5" /> <CountUp from={0} to={8} duration={2} delay={0.2} suffix=" MODULES" />
          </span>
        </div>

        {/* XP + certificate row */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-muted/40 p-3 dark:border-[#30363D] dark:bg-[#0D1117]">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
              <Zap className="h-3 w-3 text-primary" /> AVG XP EARNED
            </div>
            <div className="mt-1 font-display font-bold text-xl text-foreground leading-none">
              <CountUp from={0} to={2840} duration={2} delay={0.2} separator="," />
            </div>
            <div className="text-[10px] font-mono text-muted-foreground mt-1">per learner</div>
          </div>
          <div className="rounded-lg border border-border bg-muted/40 p-3 dark:border-[#30363D] dark:bg-[#0D1117]">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
              <ShieldCheck className="h-3 w-3 text-success" /> CERTIFICATES
            </div>
            <div className="mt-1 font-display font-bold text-xl text-foreground leading-none">
              <CountUp from={0} to={8} duration={2} delay={0.2} suffix=" Available" />
            </div>
            <div className="text-[10px] font-mono text-muted-foreground mt-1">Industry-recognized</div>
          </div>
        </div>

        <div className="mt-4 space-y-2.5 flex-1">
          {courses.map((c, i) => {
            const Icon = c.icon;
            const iconBg = c.tone === "success" ? "bg-success/10 text-success border-success/30" : c.tone === "warning" ? "bg-warning/10 text-warning border-warning/30" : "bg-primary/10 text-primary border-primary/30";
            const barBg = c.tone === "success" ? "bg-success" : c.tone === "warning" ? "bg-warning" : "bg-primary";
            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-muted/40 p-3 transition-colors cursor-default dark:border-[#30363D] dark:bg-[#0D1117]"
              >
                <div className="flex items-center gap-3">
                  <span className={`h-8 w-8 rounded-lg border flex items-center justify-center ${iconBg}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-[13px] text-foreground font-semibold truncate">{c.name}</div>
                      <span className="text-[10px] font-mono text-warning font-semibold">+{c.xp} XP</span>
                    </div>
                    <div className="mt-0.5 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                      <span>8 Modules</span>
                      <span className="text-foreground font-medium">{c.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden dark:bg-[#161B22]">
                  <div
                    className={`h-full rounded-full ${barBg}`}
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Skill tree mini */}
        <div className="mt-4 rounded-lg border border-border bg-muted/40 p-3 dark:border-[#30363D] dark:bg-[#0D1117]">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8B949E] uppercase tracking-wider">
            <span>Skill Tree</span>
            <span className="text-[#2F81F7] font-semibold">7 unlocked</span>
          </div>
          <svg viewBox="0 0 200 40" className="w-full h-8 mt-2">
            {[
              { x: 15, y: 20, u: true }, { x: 45, y: 10, u: true }, { x: 45, y: 30, u: true },
              { x: 80, y: 20, u: true }, { x: 115, y: 10, u: true }, { x: 115, y: 30, u: true },
              { x: 150, y: 20, u: true }, { x: 185, y: 20, u: false },
            ].map((n, i, arr) => {
              const prev = arr[i - 1];
              return (
                <g key={i}>
                  {prev && <line x1={prev.x} y1={prev.y} x2={n.x} y2={n.y} stroke={n.u ? "#2F81F7" : "#30363D"} strokeWidth="1" strokeDasharray={n.u ? "0" : "2 2"} />}
                  <circle cx={n.x} cy={n.y} r="3.5" fill={n.u ? "#2F81F7" : "#161B22"} stroke={n.u ? "#4EA1FF" : "#30363D"} strokeWidth="1" />
                </g>
              );
            })}
          </svg>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="mt-4 inline-flex items-center gap-1.5 text-[#2F81F7] text-sm font-medium hover:gap-2.5 transition-all outline-none"
        >
          View Curriculum <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <CurriculumModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
