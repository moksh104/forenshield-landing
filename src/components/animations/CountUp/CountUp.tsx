import { useRef, useEffect, useState, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CountUpProps {
  /** Target number to count up to. */
  to: number;
  /** Starting number (default 0). */
  from?: number;
  /** Duration of the animation in seconds or milliseconds (default 2). */
  duration?: number;
  /** Delay before starting the count animation in seconds (default 0.2). */
  delay?: number;
  /** Separator for thousands (e.g. "," or ""). */
  separator?: string;
  /** Number of decimal places. */
  decimals?: number;
  /** Prefix string (e.g. "$"). */
  prefix?: string;
  /** Suffix string (e.g. "%", "+"). */
  suffix?: string;
  /** CSS class on the wrapper element. */
  className?: string;
  /** Only animate once when entering viewport (default true). */
  once?: boolean;
  /** IntersectionObserver threshold (0–1). */
  threshold?: number;
  /** Optional inline styles. */
  style?: CSSProperties;
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function formatNumber(value: number, decimals: number, separator: string): string {
  const fixed = value.toFixed(decimals);
  if (!separator) return fixed;

  const [intPart, decPart] = fixed.split(".");
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return decPart !== undefined ? `${formatted}.${decPart}` : formatted;
}

/**
 * CountUp — Animates a numerical value smoothly using requestAnimationFrame and easeOutQuart.
 */
export function CountUp({
  to,
  from = 0,
  duration = 2,
  delay = 0.2,
  separator = ",",
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  once = true,
  threshold = 0.2,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const shouldReduceMotion = useReducedMotion();

  // Convert duration to ms if passed in seconds (e.g. 2 -> 2000)
  const durationMs = duration < 50 ? duration * 1000 : duration;
  const delayMs = delay < 50 ? delay * 1000 : delay;

  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? to : from);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(to);
      return;
    }

    if (!isInView) return;
    if (once && hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number | null = null;
    let frameId: number;
    let delayTimeoutId: NodeJS.Timeout;

    delayTimeoutId = setTimeout(() => {
      function tick(timestamp: number) {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const easedProgress = easeOutQuart(progress);
        const current = from + (to - from) * easedProgress;

        setDisplayValue(current);

        if (progress < 1) {
          frameId = requestAnimationFrame(tick);
        }
      }

      frameId = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      clearTimeout(delayTimeoutId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isInView, from, to, durationMs, delayMs, once, shouldReduceMotion]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)} style={style}>
      {prefix}
      {formatNumber(displayValue, decimals, separator)}
      {suffix}
    </span>
  );
}

export default CountUp;
