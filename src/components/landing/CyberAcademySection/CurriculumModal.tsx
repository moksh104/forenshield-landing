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
        className="absolute inset-0 bg-slate-900/40 dark:bg-[#0D1117]/80 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange(false)}
      />
      {/* Modal */}
      <div
        className="relative w-[min(96vw,580px)] max-h-[92vh] overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl dark:border-[#30363D] dark:bg-[#161B22] shadow-2xl dark:shadow-none flex flex-col transition-colors duration-200"
      >
        {/* Close */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-30 h-9 w-9 rounded-xl border border-slate-200/80 bg-slate-100/80 hover:bg-slate-200/80 text-slate-500 hover:text-slate-900 dark:border-[#30363D] dark:bg-[#0D1117] dark:hover:bg-[#1C2128] dark:text-[#8B949E] dark:hover:text-[#F0F6FC] transition-all flex items-center justify-center shadow-xs"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-slate-100 dark:border-[#30363D] shrink-0">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="h-5 w-5 text-blue-600 dark:text-[#2F81F7]" />
            <h3 className="font-display font-bold text-slate-900 dark:text-[#F0F6FC] text-2xl tracking-tight">
              Cyber Academy Curriculum
            </h3>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:bg-[#1C2128] dark:border-[#30363D] dark:text-[#D29922] px-2.5 py-0.5 text-[10px] font-mono font-medium shadow-xs">
              <BookOpen className="h-2.5 w-2.5" /> 8 MODULES
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-[#8B949E] leading-relaxed max-w-lg">
            Master the fundamentals of Cyber Defense. Below is the complete learning path required to unlock advanced simulations.
          </p>
        </div>

        {/* Scrollable list */}
        <div className="overflow-y-auto max-h-[52vh] custom-scrollbar p-6 space-y-3">
          {ALL_COURSES.map((c, i) => {
            const Icon = c.icon;
            const iconBg =
              c.tone === "success"
                ? "bg-emerald-50 text-emerald-600 border-emerald-200/80 dark:bg-[#2EA043]/15 dark:text-[#2EA043] dark:border-[#2EA043]/30"
                : c.tone === "warning"
                ? "bg-amber-50 text-amber-600 border-amber-200/80 dark:bg-[#D29922]/15 dark:text-[#D29922] dark:border-[#D29922]/30"
                : c.tone === "danger"
                ? "bg-rose-50 text-rose-600 border-rose-200/80 dark:bg-[#DA3633]/15 dark:text-[#DA3633] dark:border-[#DA3633]/30"
                : "bg-blue-50 text-blue-600 border-blue-200/80 dark:bg-[#2F81F7]/15 dark:text-[#2F81F7] dark:border-[#2F81F7]/30";
            const barBg =
              c.tone === "success"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 dark:bg-[#2EA043] dark:bg-none"
                : c.tone === "warning"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 dark:bg-[#D29922] dark:bg-none"
                : c.tone === "danger"
                ? "bg-gradient-to-r from-rose-500 to-red-500 dark:bg-[#DA3633] dark:bg-none"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 dark:bg-[#2F81F7] dark:bg-none";
            return (
              <div
                key={i}
                className="rounded-xl border border-slate-200/80 bg-slate-50/80 hover:bg-white hover:border-slate-300 dark:border-[#30363D] dark:bg-[#0D1117] dark:hover:bg-[#1C2128] p-3.5 shadow-xs hover:shadow-md transition-all duration-200 cursor-default"
              >
                <div className="flex items-center gap-3.5">
                  <span className={`h-10 w-10 shrink-0 rounded-lg border flex items-center justify-center shadow-2xs ${iconBg}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-[13px] text-slate-900 dark:text-[#F0F6FC] font-semibold truncate">{c.name}</div>
                      <span className="text-[10px] font-mono text-amber-600 dark:text-[#D29922] font-bold">+{c.xp} XP</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 dark:text-[#8B949E] font-mono">
                      <span>{c.modules} Modules</span>
                      <span className="text-slate-900 dark:text-[#F0F6FC] font-bold">{c.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2.5 h-1.5 rounded-full bg-slate-200/80 dark:bg-[#161B22] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barBg}`}
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 dark:border-[#30363D] dark:bg-[#0D1117] shrink-0">
          <button
            onClick={handleDownload}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 active:scale-[0.99] dark:bg-[#2F81F7] dark:hover:bg-[#4EA1FF] dark:shadow-none dark:bg-none transition-all"
          >
            <GraduationCap className="h-4 w-4" />
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
}
