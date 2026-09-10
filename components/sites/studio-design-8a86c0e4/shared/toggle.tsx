"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Port of studio.design's `<sd-toggle>`: a click-triggered disclosure (hover does nothing —
 * verified on the origin). Open state is the `open` attribute the origin's CSS keys off
 * (`.toggle[open]`, `.toggle:not([open])`, `[data-show-toggle="open|close"]`), and a closing
 * pass sets `data-toggle-closing` for the length of the transition so the leave styles apply.
 */
export function SdToggle({
  className,
  trigger,
  triggerClassName,
  contentClassName,
  children,
  closeOutside = true,
  closeDurationMs = 300,
  overlay = false,
}: {
  className?: string;
  /** Rendered inside the trigger button. */
  trigger: ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  children: ReactNode;
  closeOutside?: boolean;
  closeDurationMs?: number;
  overlay?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const contentId = useId();

  useEffect(() => {
    if (!open || !closeOutside) return;
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  });

  const close = () => {
    setClosing(true);
    setOpen(false);
    window.setTimeout(() => setClosing(false), closeDurationMs);
  };

  return (
    <div
      ref={root}
      className={cn("toggle", className)}
      {...(open ? { open: "" } : {})}
      {...(closing ? { "data-toggle-closing": "" } : {})}
      {...(overlay ? { "data-toggle-overlay": "" } : {})}
    >
      <button
        type="button"
        className={triggerClassName}
        data-toggle-trigger=""
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => (open ? close() : setOpen(true))}
      >
        {trigger}
      </button>
      <div id={contentId} data-toggle-content="" className={contentClassName}>
        {children}
      </div>
    </div>
  );
}
