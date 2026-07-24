import { useState } from "react";
import { GraduationCap, BookOpen, Zap, ShieldCheck, Wifi, Shield, AlertTriangle, ArrowRight } from "lucide-react";
import { CurriculumModal } from "./CurriculumModal";

export function AcademyCard() {
  const [modalOpen, setModalOpen] = useState(false);
  
  const courses = [
    { icon: Wifi, name: "Networking Basics", progress: 75, xp: 1240, tone: "primary" },
    { icon: Shield, name: "Web Security", progress: 60, xp: 980, tone: "success" },
    { icon: AlertTriangle, name: "Linux Essentials", progress: 40, xp: 620, tone: "warning" },
  ];

  return (
    <>
      <div className="relative h-full rounded-2xl overflow-hidden border border-[#30363D] bg-[#161B22] p-6 sm:p-8 flex flex-col shadow-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-[#2F81F7]" />
            <span className="text-[#F0F6FC] font-display font-bold text-lg">Cyber Academy</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#1C2128] border border-[#30363D] px-2.5 py-0.5 text-[10px] font-mono text-[#D29922]">
            <BookOpen className="h-2.5 w-2.5" /> 8 MODULES
          </span>
        </div>

        {/* XP + certificate row */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-[#30363D] bg-[#0D1117] p-3">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8B949E]">
              <Zap className="h-3 w-3 text-[#2F81F7]" /> AVG XP EARNED
            </div>
            <div className="mt-1 font-display font-bold text-xl text-[#F0F6FC] leading-none">2,840</div>
            <div className="text-[10px] font-mono text-[#8B949E] mt-1">per learner</div>
          </div>
          <div className="rounded-lg border border-[#30363D] bg-[#0D1117] p-3">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8B949E]">
              <ShieldCheck className="h-3 w-3 text-[#2EA043]" /> CERTIFICATES
            </div>
            <div className="mt-1 font-display font-bold text-xl text-[#F0F6FC] leading-none">8 Available</div>
            <div className="text-[10px] font-mono text-[#8B949E] mt-1">Industry-recognized</div>
          </div>
        </div>

        <div className="mt-4 space-y-2.5 flex-1">
          {courses.map((c, i) => {
            const Icon = c.icon;
            const iconBg = c.tone === "success" ? "bg-[#2EA043]/15 text-[#2EA043] border-[#2EA043]/30" : c.tone === "warning" ? "bg-[#D29922]/15 text-[#D29922] border-[#D29922]/30" : "bg-[#2F81F7]/15 text-[#2F81F7] border-[#2F81F7]/30";
            const barBg = c.tone === "success" ? "bg-[#2EA043]" : c.tone === "warning" ? "bg-[#D29922]" : "bg-[#2F81F7]";
            return (
              <div
                key={i}
                className="rounded-xl border border-[#30363D] bg-[#0D1117] p-3 transition-colors cursor-default"
              >
                <div className="flex items-center gap-3">
                  <span className={`h-8 w-8 rounded-lg border flex items-center justify-center ${iconBg}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-[13px] text-[#F0F6FC] font-semibold truncate">{c.name}</div>
                      <span className="text-[10px] font-mono text-[#D29922]">+{c.xp} XP</span>
                    </div>
                    <div className="mt-0.5 flex items-center justify-between text-[10px] text-[#8B949E] font-mono">
                      <span>8 Modules</span>
                      <span className="text-[#F0F6FC]">{c.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-[#161B22] overflow-hidden">
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
        <div className="mt-4 rounded-lg border border-[#30363D] bg-[#0D1117] p-3">
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
