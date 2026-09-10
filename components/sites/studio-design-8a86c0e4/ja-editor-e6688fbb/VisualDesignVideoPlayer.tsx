"use client";

// The origin's `<sd-video-player>` custom element for `.sd-209`: the only stateful node in the
// VisualDesign section. Clicking `.sd-211` toggles the `is-playing` attribute (and the runtime's
// "Pause"/"Play" aria-label) and plays/pauses the underlying <video>. The glyph swap itself is
// pure CSS — `app/studio-base.css` hides `[slot=pause]` while not playing and `[slot=play]` while
// playing — so both icons stay in the DOM at all times.

import { useRef, useState } from "react";

import { MaterialIcon } from "@/components/sites/studio-design-8a86c0e4/shared/icons";
import { SdVideo } from "@/components/sites/studio-design-8a86c0e4/shared/video";

export function VisualDesignVideoPlayer({ src }: { src: string }) {
  const rootRef = useRef<HTMLElement>(null);
  // The origin ships the player already playing (autoplay + `is-playing` set by its runtime).
  const [isPlaying, setIsPlaying] = useState(true);

  function toggle() {
    const video = rootRef.current?.querySelector("video");
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  // `is-playing` is a bare boolean attribute on the custom element, not a React prop.
  const playingAttr: Record<string, string | undefined> = {
    "is-playing": isPlaying ? "" : undefined,
  };

  return (
    <sd-video-player ref={rootRef} className="box sd-209" {...playingAttr}>
      <SdVideo className="sd-210" src={src} />
      <button className="box sd-211" aria-label={isPlaying ? "Pause" : "Play"} onClick={toggle}>
        <div className="box sd-212" slot="play">
          <MaterialIcon name="play_arrow" className="sd-213" />
        </div>
        <div className="box sd-214" slot="pause">
          <MaterialIcon name="pause" className="sd-215" />
        </div>
      </button>
    </sd-video-player>
  );
}
