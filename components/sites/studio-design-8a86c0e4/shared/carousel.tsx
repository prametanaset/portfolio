"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Port of studio.design's `<sd-carousel>`: an infinite, autoplaying track. The origin's runtime
 * reads `data-animate-duration` / `data-interval-duration` / `data-hover-stop` / `data-autoplay`
 * off the element, then per step writes `transform` on every descendant tagged
 * `data-sd-carousel-transform="<id>"` and `transition-duration` on every
 * `data-sd-carousel-duration="<id>"`, rotating slide order so the loop never rewinds.
 *
 * Measured on /ja/editor: `.sd-20` = 600 ms / 3000 ms / hoverStop, `.sd-244` = 1000 ms / 4500 ms.
 */
export function SdCarousel({
  id,
  slides,
  className,
  trackClassName,
  slideClassName,
  animateDurationMs,
  intervalMs,
  hoverStop = false,
  autoplay = true,
  controls,
}: {
  /** Matches the origin's data-sd-carousel-runtime-id, e.g. "sd-20". */
  id: string;
  slides: ReactNode[];
  className?: string;
  trackClassName?: string;
  slideClassName?: string;
  animateDurationMs: number;
  intervalMs: number;
  hoverStop?: boolean;
  autoplay?: boolean;
  controls?: ReactNode;
}) {
  const count = slides.length;
  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(!autoplay);
  const [hovered, setHovered] = useState(false);
  const timer = useRef<number | null>(null);

  const order = useMemo(
    () => Array.from({ length: count }, (_, i) => (i + offset) % count),
    [count, offset],
  );

  const advance = useCallback(
    (dir: 1 | -1) => {
      setAnimating(true);
      window.setTimeout(() => {
        setOffset((o) => (o + dir + count) % count);
        setAnimating(false);
      }, animateDurationMs);
    },
    [animateDurationMs, count],
  );

  useEffect(() => {
    if (paused || (hoverStop && hovered) || count < 2) return;
    timer.current = window.setInterval(() => advance(1), intervalMs);
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
    };
  }, [advance, count, hovered, hoverStop, intervalMs, paused]);

  return (
    <sd-carousel
      className={cn("box", className)}
      data-type="carousel"
      data-animate-duration={String(animateDurationMs)}
      data-interval-duration={String(intervalMs)}
      data-sd-carousel-runtime-id={id}
      {...(hoverStop ? { "data-hover-stop": "" } : {})}
      {...(autoplay ? { "data-autoplay": "" } : {})}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {controls}
      <div className={cn("box", trackClassName)}>
        {order.map((slideIndex, position) => (
          <div
            key={slideIndex}
            className={cn("sd-carousel__slide", "box", slideClassName)}
            data-sd-carousel-transform={id}
            data-sd-carousel-duration={id}
            style={{
              order: position,
              transitionDuration: animating ? `${animateDurationMs}ms` : "0ms",
            }}
          >
            {slides[slideIndex]}
          </div>
        ))}
      </div>
      <button
        type="button"
        hidden
        slot="play-toggle"
        aria-label={paused ? "Play automatic slide show" : "Stop automatic slide show"}
        onClick={() => setPaused((p) => !p)}
      />
    </sd-carousel>
  );
}
