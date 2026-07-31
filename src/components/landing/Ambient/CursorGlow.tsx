import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "light") return;

    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let scale = 1, targetScale = 1;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onDown = () => {
      targetScale = 0.85;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onUp = () => {
      targetScale = 1;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      scale += (targetScale - scale) * 0.2;
      el.style.transform = `translate3d(${cx - 150}px, ${cy - 150}px, 0) scale(${scale})`;
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5 || Math.abs(targetScale - scale) > 0.01) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [theme]);

  if (theme === "light") return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[1] h-[300px] w-[300px] rounded-full opacity-40 hidden md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(47, 129, 247, 0.07) 0%, rgba(47, 129, 247, 0.02) 40%, transparent 70%)",
      }}
    />
  );
}
