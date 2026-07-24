import { useRef } from "react";
import { Layers, Target, Zap, Cpu } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { motion } from "framer-motion";
import { CountUp } from "@/components/landing/CountUp";

export function HighlightsRow() {
  const highlights = [
    {
      number: "01",
      icon: Layers,
      value: 5,
      suffix: "",
      title: "Core Modules",
      desc: "Mission Control, Cyber Academy, Investigation Lab, Simulation Lab, and Reports working together as one platform.",
      tone: "primary",
    },
    {
      number: "02",
      icon: Target,
      value: 20,
      suffix: "+",
      title: "Planned Investigations",
      desc: "Real-world cybersecurity scenarios covering phishing, malware, ransomware, digital forensics, and incident response.",
      tone: "success",
    },
    {
      number: "03",
      icon: Zap,
      title: "Interactive Learning",
      desc: "Hands-on simulations, guided investigations, and practical cybersecurity exercises instead of theory-only learning.",
      tone: "warning",
    },
    {
      number: "04",
      icon: Cpu,
      title: "Cross-Platform Architecture",
      desc: "Designed for Flutter Mobile, Web Dashboard, REST API, PostgreSQL, Unity simulations, and Cloud-based services.",
      tone: "danger",
    },
  ] as const;

  return (
    <section className="relative px-4 sm:px-8 pb-4">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 h-px origin-left bg-gradient-to-r from-primary via-primary/20 to-transparent"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <Reveal
              key={index}
              delay={index * 80}
              className="flex h-full w-full"
            >
              <HighlightCard {...item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightCard({
  icon: Icon,
  number,
  value,
  suffix,
  title,
  desc,
  tone,
}: {
  icon: any;
  number: string;
  value?: number;
  suffix?: string;
  title: string;
  desc: string;
  tone: "primary" | "success" | "warning" | "danger";
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    cardRef.current.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`
    );

    cardRef.current.style.setProperty(
      "--mouse-y",
      `${e.clientY - rect.top}px`
    );
  };

  const accent = {
    primary: {
      text: "text-[#2F81F7]",
      border: "group-hover:border-[#2F81F7]/50",
      glow: "rgba(47,129,247,.08)",
    },

    success: {
      text: "text-[#2EA043]",
      border: "group-hover:border-[#2EA043]/50",
      glow: "rgba(46,160,67,.08)",
    },

    warning: {
      text: "text-[#D29922]",
      border: "group-hover:border-[#D29922]/50",
      glow: "rgba(210,153,34,.08)",
    },

    danger: {
      text: "text-[#DA3633]",
      border: "group-hover:border-[#DA3633]/50",
      glow: "rgba(218,54,51,.08)",
    },
  }[tone];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative flex h-full w-full cursor-default flex-col overflow-hidden rounded-2xl border border-[#30363D] bg-[#161B22] p-6 shadow-none transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#1C2128] hover:shadow-[0_14px_36px_rgba(0,0,0,.28)] ${accent.border}`}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
        style={{
          background: `
            radial-gradient(
              180px circle at var(--mouse-x) var(--mouse-y),
              ${accent.glow} 0%,
              transparent 75%
            )
          `,
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl border border-current/20 bg-current/10 ${accent.text}`}
        >
          <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
        </span>

        <span className="font-mono text-[11px] font-semibold tracking-widest text-[#8B949E] transition-colors duration-300 group-hover:text-[#F0F6FC]">
          {number}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-8 flex flex-grow flex-col">
        <div className="flex flex-wrap items-baseline gap-1.5 font-display font-bold tracking-tight text-[#F0F6FC]">
          {value !== undefined && (
            <div className="flex items-baseline gap-0.5 text-3xl sm:text-4xl">
              <CountUp end={value} duration={1.5} />
              <span className={accent.text}>{suffix}</span>
            </div>
          )}

          <span
            className={
              value === undefined
                ? "text-xl sm:text-2xl"
                : "text-lg text-[#F0F6FC]/90 sm:text-xl"
            }
          >
            {title}
          </span>
        </div>

        <p className="mt-3 text-[14px] leading-relaxed text-[#8B949E] transition-colors duration-300 group-hover:text-[#F0F6FC]/80">
          {desc}
        </p>
      </div>
    </div>
  );
}