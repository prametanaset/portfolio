"use client";

// Port of the studio.design/ja/editor footer marquee (`sd-loop-box.box.symbol-3__sd-2`,
// `speed="80"`). The origin ships only the authored `<ul class="box list-2">`; its runtime then
// wraps that ul in a hidden `div.loop-sizer` (the height spacer) and builds a second, absolutely
// positioned `div.loop-track` carrying a copy of the ul plus a third copy inside `div.loop-clone`.
// None of `loop-sizer` / `loop-track` / `loop-clone` has a CSS rule anywhere in the origin
// stylesheet — the runtime writes their styles inline, so this component does too (the inline
// declarations below are transcribed verbatim from `extract/site-footer.states.json` → `loopBox`).
//
// Motion is a Web Animation on the track, not a CSS keyframe animation (the origin stylesheet has
// no `@keyframes` at all): translateX(0) → -(trackW + 16)px, linear, infinite, with
// `duration = (trackW + 16) * 1000` ms and `playbackRate = 80`, i.e. a constant 80 px/s leftwards
// at every viewport. It runs from load: no hover stop, no IntersectionObserver gate.

import { useEffect, useRef, useState } from "react";

/** The `speed` attribute on the origin's `<sd-loop-box>` — px per second. */
const SPEED_PX_PER_SECOND = 80;
/** `--gap-h` inherited from `.symbol-3__sd-2 > *`; the track travels one copy plus this gap. */
const TRACK_GAP_PX = 16;

type MarqueeItem = { src: string; alt: string };

/** The 12 authored `<li class="box list-2__item">`, in origin DOM order. */
const ITEMS: readonly MarqueeItem[] = [
  {
    src: "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1440x790_v-fms_webp_4e2b3a41-40d5-42b3-8905-327b8d2e54af.webp",
    alt: "poporpop | สตูดิโอคอนเทนต์ที่สร้างงานป๊อปล้ำกว่าจินตนาการ",
  },
  {
    src: "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1440x790_v-fms_webp_773373a5-098d-4561-9bd2-89da8bca7092.webp",
    alt: "PROS | บริษัทออกแบบ UX และ UI ที่สร้างมาเพื่องาน B2B",
  },
  {
    src: "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1440x790_v-fms_webp_4d1f7529-b8e8-41cf-afc0-94c8c9c4b761.webp",
    alt: "ANATOMICA | เว็บไซต์ทางการ",
  },
  {
    src: "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1440x790_v-fms_webp_9c778003-1574-4fc7-a9a1-029f8dee95af.webp",
    alt: "doda PRESENTS: คู่มือสมัครงานสโมสรแปซิฟิกลีก 2025",
  },
  {
    src: "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1440x790_v-fms_webp_e5539cec-bede-4b8b-b1c6-01ff4475524e.webp",
    alt: "การ์ดเชิญงานแต่งงาน | 2025.10.12",
  },
  {
    src: "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1440x790_v-fms_webp_94bb0a25-e722-46bb-94ac-a60d74becbb3.webp",
    alt: "หน้าเทคโนโลยีของ Spacemarket",
  },
  {
    src: "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1440x790_v-fms_webp_057d7f8b-9721-49fd-b8c4-b8f63454cb5c.webp",
    alt: "Next 10 Chairs",
  },
  {
    src: "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1440x790_v-fms_webp_84785f8a-3ea7-477d-bdef-7e303ec884a9.webp",
    alt: "Randy’s Donuts | ร้านโดนัทขวัญใจชาวแอลเอเปิดสาขาในญี่ปุ่น",
  },
  {
    src: "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1440x790_v-fms_webp_19349c0a-e2df-422c-9d8a-5e3389a11701.webp",
    alt: "Sanaburi Lemon ",
  },
  {
    src: "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1440x790_v-fms_webp_034943b5-1a91-41dc-a6cc-c0e3aa344283.webp",
    alt: "เว็บไซต์รับสมัครงานของ Coalition Group",
  },
  {
    src: "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1440x790_v-fms_webp_291f6395-5ba1-44b1-ae07-e43ec6a1cb6b.webp",
    alt: "KURATECA | บริษัท Kurashiki Kako จำกัด",
  },
  {
    src: "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1440x790_v-fms_webp_b054ee16-f3e6-4cb9-855e-148eb61ab0e8.webp",
    alt: "WoodSpirits",
  },];

/** One copy of the authored list. Rendered three times: sizer, track, clone. */
function MarqueeList() {
  return (
    <ul className="box list-2">
      {ITEMS.map((item) => (
        <li className="box list-2__item" key={item.src}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="img list-2__item__sd-1" alt={item.alt} src={item.src} />
        </li>
      ))}
    </ul>
  );
}

/** Verbatim from the runtime record's `sizerInlineStyle`. */
const SIZER_STYLE = {
  display: "flex",
  flexDirection: "row",
  minWidth: "100%",
  visibility: "hidden",
  columnGap: "var(--gap-h, 0px)",
  rowGap: "var(--gap-v, 0px)",
  justifyContent: "flex-start",
  alignItems: "center",
} as const;

/** Verbatim from the runtime record's `trackInlineStyle`, minus the measured `width`. */
const TRACK_STYLE = {
  position: "absolute",
  left: "0px",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  minWidth: "100%",
  transition: "none",
  columnGap: "var(--gap-h, 0px)",
  rowGap: "var(--gap-v, 0px)",
  justifyContent: "flex-start",
  alignItems: "center",
} as const;

export function FooterLoopBox() {
  const sizerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // The track width is the authored list's own width — 4456 @1440, 17632 @768, 2816 @390 — not the
  // sizer's box, which `min-width: 100%` collapses to the viewport. Never hard-coded: the ≤768 rule
  // `width: calc(32% - var(--gap-h) * 0.68)` is cyclic inside an intrinsically-sized parent and falls
  // back to each thumbnail's intrinsic width, which only the browser can settle.
  const [trackWidth, setTrackWidth] = useState<number | null>(null);

  useEffect(() => {
    const sizer = sizerRef.current;
    const list = sizer?.firstElementChild;
    if (!sizer || !list) return;
    // The origin's runtime measures the list at its content width and then writes that width back
    // as an inline px value (`width: 4456px` @1440, 2816 @390). Reading the rect or scrollWidth is
    // not enough: inside the sizer the list is a flex item that shrinks its cards below their
    // authored width, so ask for `max-content` first, then pin the result exactly as Studio does.
    const measure = () => {
      const el = list as HTMLElement;
      // `.list-2` ships `max-width: 100%`, which would clamp the measurement to the viewport; the
      // origin's runtime lifts width/max-width the same way while it measures, then pins the result.
      el.style.maxWidth = "none";
      el.style.width = "max-content";
      const width = el.getBoundingClientRect().width;
      el.style.width = `${width}px`;
      setTrackWidth(width);
    };
    measure();
    // Fires on viewport changes and again once the 12 thumbnails have decoded.
    const observer = new ResizeObserver(measure);
    observer.observe(sizer);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || trackWidth === null || trackWidth <= 0) return;
    const distance = trackWidth + TRACK_GAP_PX;
    const animation = track.animate(
      [{ transform: "translateX(0px)" }, { transform: `translateX(-${distance}px)` }],
      { duration: distance * 1000, easing: "linear", iterations: Infinity },
    );
    animation.playbackRate = SPEED_PX_PER_SECOND;
    return () => animation.cancel();
  }, [trackWidth]);

  return (
    <div className="box symbol-3__sd-1">
      <sd-loop-box className="box symbol-3__sd-2" {...{ speed: "80" }}>
        <div className="loop-sizer" style={SIZER_STYLE} ref={sizerRef}>
          <MarqueeList />
        </div>
        <div
          className="loop-track"
          style={trackWidth === null ? TRACK_STYLE : { ...TRACK_STYLE, width: `${trackWidth}px` }}
          ref={trackRef}
        >
          <MarqueeList />
          <div className="loop-clone">
            <MarqueeList />
          </div>
        </div>
      </sd-loop-box>
    </div>
  );
}
