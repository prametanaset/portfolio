"use client";

import { cn } from "@/lib/utils";

/**
 * Port of studio.design's `<sd-video>`: the custom element carries the layout class and the
 * origin's `src` (always suffixed `#t=0.01` so a first frame paints before playback) and injects
 * a plain `<video muted loop autoplay playsinline>` child, which is what
 * `app/studio-base.css` (`sd-video > video`) styles.
 */
export function SdVideo({
  className,
  src,
  poster,
}: {
  className?: string;
  /** Path under /public, without the origin's `#t=0.01` suffix. */
  src: string;
  poster?: string;
}) {
  return (
    <sd-video className={cn("video", className)}>
      <video src={`${src}#t=0.01`} poster={poster} muted loop autoPlay playsInline />
    </sd-video>
  );
}
