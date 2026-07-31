import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedGridProps {
  opacity?: number;
  animationDuration?: number;
  className?: string;
}

export function AnimatedGrid({
  opacity = 0.05,
  animationDuration = 20,
  className = "",
}: AnimatedGridProps) {
  const id = useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* 
        To avoid complex loops, we use an SVG pattern and animate its y offset 
        to simulate continuous scrolling of a grid background.
      */}
      <motion.svg
        className="absolute inset-0 h-[200%] w-full"
        style={{
          y: shouldReduceMotion ? 0 : "-50%",
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: ["0%", "-50%"],
              }
        }
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: animationDuration,
        }}
      >
        <defs>
          <pattern
            id={`grid-${id}`}
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
      </motion.svg>
      
      {/* Soft overlay mask to fade grid at edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
    </div>
  );
}
