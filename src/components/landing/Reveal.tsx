import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  staggerChildren = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: any;
  staggerChildren?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], // Custom ease-out
        delay: prefersReducedMotion ? 0 : delay / 1000,
        ...(staggerChildren && !prefersReducedMotion ? { staggerChildren: 0.1 } : {}),
      },
    },
  };

  const MotionComponent = (motion as any)[as] || motion.div;

  return (
    <MotionComponent
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
