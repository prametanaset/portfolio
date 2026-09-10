"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * studio.design reveals elements by shipping them with the class `appear` (the hidden state:
 * opacity 0 plus a translate/rotate defined per element in the sliced CSS) and removing it once
 * an IntersectionObserver fires; `appear-active` stays on for the transition's timing function.
 * Elements marked `data-appear-manual` are revealed by their parent (carousel slides), not here.
 */
export function Appear({
  as: Tag = "div",
  className,
  children,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0,
  once = true,
  activeClass = false,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
  /** Some origin elements also carry `appear-active` (it only ever sets a timing function).
   *  Off by default: adding it where the origin does not would be a class the CSS never defines. */
  activeClass?: boolean;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin, threshold]);

  return (
    <Tag ref={ref} className={cn(className, activeClass && "appear-active", !shown && "appear")} {...rest}>
      {children}
    </Tag>
  );
}
