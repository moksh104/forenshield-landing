import { useRef, useEffect } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Reveal } from "@/components/landing/Reveal";
import { MagneticButton } from "@/components/common/MagneticButton";
import { ArrowRight, Github, ShieldCheck, Activity, Sparkles } from "lucide-react";
import SplitText from "@/components/animations/SplitText";
import { CountUp } from "@/components/animations/CountUp";
import { AnimatedGrid } from "@/components/animations/AnimatedGrid/AnimatedGrid";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const floatX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const floatY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 bg-background transition-colors duration-300 overflow-hidden"
    >
      <AnimatedGrid opacity={0.05} animationDuration={20} className="text-primary" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT — Main Headline & CTAs */}
          <div className="lg:col-span-6 relative z-10">
            <Reveal delay={60}>
              <h1
                className="mt-6 flex flex-col items-start font-display font-bold text-foreground tracking-tight max-w-full"
                style={{
                  fontSize: "clamp(2.15rem, 3.8vw, 3.75rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.03em",
                }}
              >
                <SplitText
                  text="Stop Reading Theory."
                  tag="span"
                  splitType="chars"
                  delay={35}
                  duration={0.7}
                  className="block"
                  textAlign="left"
                />
                <SplitText
                  text="Start Solving Incidents."
                  tag="span"
                  splitType="chars"
                  delay={35}
                  duration={0.7}
                  className="text-primary mt-1 sm:mt-2 block"
                  textAlign="left"
                />
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-6 max-w-[46ch] text-[18px] text-muted-foreground leading-[1.6]">
                Analyze real packet captures, disk images, and memory dumps across 20+ investigation scenarios — the same evidence formats used in actual SOC workflows.
              </p>
            </Reveal>

            {/* Action Triggers */}
            <Reveal delay={260}>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <MagneticButton href="#download" className="!px-7 !py-4 !h-[54px] !text-[16px] flex items-center gap-2">
                  Start Investigating — Free
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                <a
                  href="https://github.com/moksh104/Website-ForenShield-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 h-[54px] text-[15px] font-semibold text-foreground bg-card border border-border hover:bg-muted hover:border-primary/40 shadow-sm transition-all duration-300"
                >
                  <Github className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  View Source on GitHub
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — Option A Enhanced Interactive Brand Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-start lg:-ml-2 relative z-0 perspective-[1000px]">
            <Reveal delay={200} className="w-full">
              <motion.div
                style={
                  shouldReduceMotion
                    ? {}
                    : {
                      rotateX,
                      rotateY,
                      x: floatX,
                      y: floatY,
                    }
                }
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative w-full flex items-center justify-center select-none pt-10 pb-10"
              >
                {/* FLOATING MICRO-CARD 1 (Top Left Incident Alert - positioned clear of URL bar) */}
                <motion.div
                  style={shouldReduceMotion ? {} : { x: useTransform(mouseX, [-0.5, 0.5], [15, -15]) }}
                  className="absolute -top-3 -left-6 lg:-top-6 lg:-left-10 z-30 hidden sm:flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-md"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inset-0 rounded-full bg-danger animate-ping" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-danger" />
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-foreground">
                      <Activity className="h-3 w-3 text-primary" />
                      <span>LIVE INCIDENT STREAM</span>
                    </div>
                    <div className="text-[11px] font-medium text-muted-foreground mt-0.5">
                      UPI Fraud · Mule Account Flagged
                    </div>
                  </div>
                </motion.div>

                {/* FLOATING MICRO-CARD 2 (Bottom Right Investigation Metric) */}
                <motion.div
                  style={shouldReduceMotion ? {} : { x: useTransform(mouseX, [-0.5, 0.5], [-20, 20]) }}
                  className="absolute -bottom-3 -right-6 lg:-bottom-6 lg:-right-10 z-30 hidden sm:flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-md"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-primary shrink-0">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-mono text-[10px] font-bold text-foreground flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-primary" />
                      <span>INVESTIGATION ENGINE</span>
                    </div>
                    <div className="text-[11px] font-semibold text-primary mt-0.5">
                      <CountUp from={0} to={20} duration={2} suffix="+ Case Scenarios" />
                    </div>
                  </div>
                </motion.div>

                {/* Browser Chrome Frame */}
                <div className="relative w-full bg-card rounded-xl border border-border shadow-md overflow-hidden transition-all duration-300">
                  {/* Browser top bar */}
                  <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-border bg-muted/50">
                    {/* Traffic light dots */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                    </div>
                    {/* URL bar centered */}
                    <div className="flex-1 flex justify-center max-w-xs mx-auto">
                      <div className="flex items-center gap-2 rounded-md bg-background border border-border px-3 py-1 text-xs font-mono text-muted-foreground w-full justify-center">
                        <svg className="h-3 w-3 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <span className="truncate">forenshield.app/investigate</span>
                      </div>
                    </div>
                    {/* Spacer for symmetry */}
                    <div className="w-10 shrink-0 hidden sm:block" />
                  </div>
                  {/* Video viewport */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full pointer-events-none object-cover"
                    >
                      <source src="/videos/hero-video.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
