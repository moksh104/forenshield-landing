import React, { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface SplitTextProps {
  /** The text string to animate. */
  text?: string;
  /** HTML tag to render: "h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div". */
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | (string & {});
  /** Additional class names to style the element. */
  className?: string;
  /** Delay between animations for each letter/word in milliseconds. */
  delay?: number;
  /** Duration of each letter/word animation in seconds. */
  duration?: number;
  /** GSAP easing function name. */
  ease?: string;
  /** Split type: "chars", "words", or "lines". */
  splitType?: "chars" | "words" | "lines" | "words, chars";
  /** Initial GSAP properties for each letter/word. */
  from?: gsap.TweenVars;
  /** Target GSAP properties for each letter/word. */
  to?: gsap.TweenVars;
  /** Intersection threshold to trigger animation (0–1). */
  threshold?: number;
  /** Root margin for ScrollTrigger. */
  rootMargin?: string;
  /** Text alignment CSS value. */
  textAlign?: "left" | "center" | "right" | "justify" | "inherit";
  /** Callback function when all animations complete. */
  onLetterAnimationComplete?: () => void;
  /** Children fallback if text is not provided directly. */
  children?: React.ReactNode;
}

/**
 * SplitText — React Bits component that animates text letter by letter or word by word using GSAP & ScrollTrigger.
 * Includes word-wrapping protection so characters in "chars" mode never break across lines.
 */
export function SplitText({
  text = "",
  tag: Tag = "h2",
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
  children,
}: SplitTextProps) {
  const contentText = text || (typeof children === "string" ? children : "");
  const containerRef = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts) {
      if (document.fonts.status === "loaded") {
        setFontsLoaded(true);
      } else {
        document.fonts.ready.then(() => setFontsLoaded(true));
      }
    } else {
      setFontsLoaded(true);
    }
  }, []);

  const isWordMode = splitType === "words";

  // Group characters into words so individual letters never break mid-word
  const fragments = useMemo(() => {
    if (!contentText) return [];
    if (isWordMode) {
      return contentText.split(/\s+/).map((word, i, arr) => ({
        id: i,
        word: word + (i < arr.length - 1 ? "\u00A0" : ""),
        chars: [],
      }));
    }

    // Default "chars" mode with word-grouping protection
    const words = contentText.split(" ");
    let globalCharIndex = 0;
    return words.map((word, wordIndex) => {
      const chars = word.split("").map((char) => ({
        id: globalCharIndex++,
        text: char,
      }));
      return {
        id: wordIndex,
        word,
        chars,
        isLastWord: wordIndex === words.length - 1,
      };
    });
  }, [contentText, isWordMode]);

  useGSAP(
    () => {
      if (!containerRef.current || !contentText || !fontsLoaded || animatedRef.current) return;

      const elements = containerRef.current.querySelectorAll<HTMLSpanElement>(".split-item");
      if (!elements.length) return;

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      gsap.fromTo(
        elements,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            once: true,
            fastScrollEnd: true,
          },
          onComplete: () => {
            animatedRef.current = true;
            onCompleteRef.current?.();
          },
          willChange: "transform, opacity",
          force3D: true,
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === containerRef.current) st.kill();
        });
      };
    },
    {
      dependencies: [contentText, delay, duration, ease, splitType, threshold, rootMargin, fontsLoaded],
      scope: containerRef,
    }
  );

  const Element = Tag as React.ElementType;

  if (isWordMode) {
    return (
      <Element
        ref={containerRef}
        className={`split-parent ${className}`}
        style={{
          textAlign,
          display: "inline-block",
          whiteSpace: "normal",
          willChange: "transform, opacity",
        }}
      >
        {fragments.map((frag: any) => (
          <span
            key={frag.id}
            className="split-item inline-block"
            style={{
              display: "inline-block",
              opacity: 0,
            }}
            aria-hidden="true"
          >
            {frag.word}
          </span>
        ))}
        <span className="sr-only">{contentText}</span>
      </Element>
    );
  }

  return (
    <Element
      ref={containerRef}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        display: "inline-block",
        whiteSpace: "normal",
        willChange: "transform, opacity",
      }}
    >
      {fragments.map((frag: any) => (
        <span
          key={frag.id}
          className="inline-block whitespace-nowrap"
          aria-hidden="true"
        >
          {frag.chars.map((c: any) => (
            <span
              key={c.id}
              className="split-item inline-block"
              style={{
                display: "inline-block",
                opacity: 0,
              }}
            >
              {c.text}
            </span>
          ))}
          {!frag.isLastWord && <span>&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{contentText}</span>
    </Element>
  );
}

export default SplitText;
