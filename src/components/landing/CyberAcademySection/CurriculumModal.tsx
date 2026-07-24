import { MouseEvent } from "react";
import { X, GraduationCap, BookOpen, Wifi, Shield, AlertTriangle, Lock, Mail, Bug, Zap, Globe } from "lucide-react";

export const ALL_COURSES = [
  { icon: Wifi, name: "Networking Basics", progress: 75, xp: 1240, tone: "primary", modules: 8 },
  { icon: Shield, name: "Web Security", progress: 60, xp: 980, tone: "success", modules: 6 },
  { icon: AlertTriangle, name: "Linux Essentials", progress: 40, xp: 620, tone: "warning", modules: 5 },
  { icon: Lock, name: "Cryptography Basics", progress: 0, xp: 850, tone: "primary", modules: 4 },
  { icon: Mail, name: "Social Engineering & Phishing", progress: 0, xp: 750, tone: "warning", modules: 5 },
  { icon: Bug, name: "Malware Analysis Fundamentals", progress: 0, xp: 1100, tone: "danger", modules: 7 },
  { icon: Zap, name: "Incident Response", progress: 0, xp: 920, tone: "primary", modules: 6 },
  { icon: Globe, name: "Cloud Security Basics", progress: 0, xp: 1050, tone: "success", modules: 5 },
];

export interface CurriculumModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function CurriculumModal({ open, onOpenChange }: CurriculumModalProps) {
  if (!open) return null;

  const handleDownload = (e: MouseEvent<HTMLButtonElement>) => {
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
        className="absolute inset-0 bg-[#0D1117]/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      {/* Modal */}
      <div
        className="relative w-[min(96vw,580px)] max-h-[92vh] overflow-hidden rounded-2xl border border-[#30363D] bg-[#161B22] shadow-none flex flex-col"
      >
        {/* Close */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-30 h-9 w-9 rounded-lg border border-[#30363D] bg-[#0D1117] flex items-center justify-center text-[#8B949E] hover:text-[#F0F6FC] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-[#30363D] shrink-0">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="h-5 w-5 text-[#2F81F7]" />
            <h3 className="font-display font-bold text-[#F0F6FC] text-2xl tracking-tight">
              Cyber Academy Curriculum
            </h3>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#1C2128] border border-[#30363D] px-2.5 py-0.5 text-[10px] font-mono text-[#D29922]">
              <BookOpen className="h-2.5 w-2.5" /> 8 MODULES
            </span>
          </div>
          <p className="mt-2 text-sm text-[#8B949E] leading-relaxed max-w-lg">
            Master the fundamentals of Cyber Defense. Below is the complete learning path required to unlock advanced simulations.
          </p>
        </div>

        {/* Scrollable list */}
        <div className="overflow-y-auto max-h-[52vh] custom-scrollbar p-6 space-y-3">
          {ALL_COURSES.map((c, i) => {
            const Icon = c.icon;
            const iconBg =
              c.tone === "success"
                ? "bg-[#2EA043]/15 text-[#2EA043] border-[#2EA043]/30"
                : c.tone === "warning"
                ? "bg-[#D29922]/15 text-[#D29922] border-[#D29922]/30"
                : c.tone === "danger"
                ? "bg-[#DA3633]/15 text-[#DA3633] border-[#DA3633]/30"
                : "bg-[#2F81F7]/15 text-[#2F81F7] border-[#2F81F7]/30";
            const barBg =
              c.tone === "success"
                ? "bg-[#2EA043]"
                : c.tone === "warning"
                ? "bg-[#D29922]"
                : c.tone === "danger"
                ? "bg-[#DA3633]"
                : "bg-[#2F81F7]";
            return (
              <div
                key={i}
                className="rounded-xl border border-[#30363D] bg-[#0D1117] p-3.5 hover:bg-[#1C2128] transition-colors cursor-default"
              >
                <div className="flex items-center gap-3.5">
                  <span className={`h-10 w-10 shrink-0 rounded-lg border flex items-center justify-center ${iconBg}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-[13px] text-[#F0F6FC] font-semibold truncate">{c.name}</div>
                      <span className="text-[10px] font-mono text-[#D29922]">+{c.xp} XP</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-[#8B949E] font-mono">
                      <span>{c.modules} Modules</span>
                      <span className="text-[#F0F6FC]">{c.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2.5 h-1.5 rounded-full bg-[#161B22] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barBg}`}
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-4 border-t border-[#30363D] bg-[#0D1117] shrink-0">
          <button
            onClick={handleDownload}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-[#2F81F7] hover:bg-[#4EA1FF] transition-colors shadow-none"
          >
            <GraduationCap className="h-4 w-4" />
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
}
