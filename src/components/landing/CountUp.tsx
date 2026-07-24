import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

export function CountUp({
  end,
  duration = 2,
  delay = 0,
  className = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  delay?: number;
  className?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const prefersReducedMotion = useReducedMotion();
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  
  const springValue = useSpring(count, {
    duration: duration * 1000,
    bounce: 0,
  });
  const springRounded = useTransform(springValue, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (isInView) {
      if (prefersReducedMotion) {
        count.set(end);
      } else {
        setTimeout(() => {
          springValue.set(end);
        }, delay * 1000);
      }
    }
  }, [isInView, end, prefersReducedMotion, delay, count, springValue]);

  if (prefersReducedMotion) {
    return (
      <span ref={ref} className={className}>
        {end.toLocaleString()}{suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      <motion.span>{springRounded}</motion.span>
      {suffix}
    </span>
  );
}
