"use client";

// Local port of the `<sd-carousel class="box sd-20">` inside studio.design/ja/editor's
// `main > .sd-13`. The shared `SdCarousel` is deliberately NOT used: it wraps the slides in an
// extra track div (the origin's slides are direct flex children of the custom element), rotates
// `style.order` instead of translating, renders `slides.length` nodes instead of the origin's
// `data-max-length="7"`, never emits `data-animatingNext` / `data-animatingPrev`, and hides its
// play-toggle — see NextCreationSection.spec.md "Shared components".
//
// Motion model (extract/next-creation.states.json → carouselRuntime):
//   rest     — 7 slides, `transform: none`, inline `transition-duration: 0s`
//   stepping — every slide gets `data-animatingNext` + inline `transition-duration: 0.6s`; the
//              sliced rule `.sd-root [data-animatingNext].sd-20__content { transform:
//              translateX(-100%) }` supplies the distance and easing. No px value lives in JS.
//   settle   — the array rotates one position, the attribute goes away and the duration returns
//              to 0s, so `transform` snaps back to `none` in the same frame with no visible jump.

import { useCallback, useEffect, useState } from "react";

import { MaterialIcon, MaterialSymbol } from "@/components/sites/studio-design-8a86c0e4/shared/icons";

const IMAGES = "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images";

/** data-animate-duration on the origin element. */
const ANIMATE_MS = 600;
/** data-interval-duration on the origin element. */
const INTERVAL_MS = 3000;

type Maker =
  | { kind: "logo"; src: string; alt: string }
  | { kind: "text"; label: string };

type Slide = {
  /** The cover link href, which is also the visible URL label. */
  href: string;
  cover: string;
  alt: string;
  makerHref: string;
  maker: Maker;
};

/** The 6 authored slides, in `page.html` `<template class="sd-carousel__template">` order. */
const SLIDES: Slide[] = [
  {
    href: "https://www.ryden.co.jp/",
    cover: `${IMAGES}/s-2160x1185_v-frms_webp_517b4553-7517-43e4-af28-4665974f4952_small.webp`,
    alt: "「ブランディングとデザインをつなげる | 株式会社ライデン」のカバー画像",
    makerHref: "https://www.ryden.co.jp/",
    maker: {
      kind: "logo",
      src: `${IMAGES}/s-848x320_v-fs_webp_6b04161c-f78f-4182-a719-99c86befbadc_small.webp`,
      alt: "株式会社ライデン",
    },
  },
  {
    href: "https://hlt.pref.ibaraki.jp/",
    cover: `${IMAGES}/s-2160x1185_v-frms_webp_07257143-79e6-498b-b446-068ca6b688a9_small.webp`,
    alt: "「タイムトリップしよう、常陸国ロングトレイルで。｜茨城県のサイト」のカバー画像",
    makerHref: "https://www.re-d.jp/",
    maker: {
      kind: "logo",
      src: `${IMAGES}/s-848x320_v-fs_webp_e7f74aca-074d-4b9b-861a-f4157a59f054_small.webp`,
      alt: "株式会社アールイーデザイン",
    },
  },
  {
    href: "https://portport.jp/",
    cover: `${IMAGES}/s-2160x1185_v-frms_webp_ca321b68-f854-4fd0-9d93-2d9b1c7c2ad4_small.webp`,
    alt: "「PortPort Inc.」のカバー画像",
    makerHref: "https://shhh.jp/",
    maker: { kind: "text", label: "株式会社Shhh" },
  },
  {
    href: "https://design.toyota-finance.co.jp/",
    cover: `${IMAGES}/s-2160x1185_v-frms_webp_0e5e06a9-3388-4e6d-9397-41803ecdd8c6_small.webp`,
    alt: "「TOYOTA FINANCE Design」のカバー画像",
    makerHref: "https://www.details.co.jp/",
    maker: {
      kind: "logo",
      src: `${IMAGES}/s-848x320_v-fs_webp_e62d5284-53c7-4c98-982c-636d5acf45d1_small.webp`,
      alt: "株式会社スタジオディテイルズ",
    },
  },
  {
    href: "https://recruit.coalition-group.jp/",
    cover: `${IMAGES}/s-2160x1185_v-frms_webp_8021dda9-ac8c-4b79-b6be-e929eeceb7d9_small.webp`,
    alt: "「Coalition Group Recruit Site」のカバー画像",
    makerHref: "https://www.funtech.inc/ja",
    maker: {
      kind: "logo",
      src: `${IMAGES}/s-848x320_v-fs_webp_ad6a68bc-bc19-4baa-9ffb-93a5f6574964_small.webp`,
      alt: "FunTech株式会社",
    },
  },
  {
    href: "https://huuuu.jp/",
    cover: `${IMAGES}/s-2160x1185_v-frms_webp_4c43e256-3dce-4e23-aa02-21c4f5631a23_small.webp`,
    alt: "「Huuuu｜編集の力で、今に風穴を」のカバー画像",
    makerHref: "https://eat-play-sleep.org/",
    maker: { kind: "text", label: "株式会社Eat, Play, Sleep" },
  },
];

const COUNT = SLIDES.length;

/**
 * `rest` renders `[...rotation, rotation[0]]` — the 6 uniques rotated plus a trailing clone of the
 * head, i.e. the origin's `data-max-length="7"`.
 *
 * `next` keeps that node list and stamps `data-animatingNext` (translateX(-100%)) for 600 ms.
 *
 * A prev step cannot reuse `data-animatingPrev` verbatim: pulling the previous item in means
 * prepending a node, which pushes every other slide one slot to the right, so the step has to
 * start from a compensating translateX(-100%) and animate back to `transform: none`. Hence the two
 * phases `prevArmed` (new list, `data-animatingNext`, duration 0s — pixel-identical to rest) and
 * `prevRunning` (attribute dropped, duration 0.6s — the whole line slides one width to the right).
 * The distance and easing still come from the sliced CSS.
 */
type Phase = "rest" | "next" | "prevArmed" | "prevRunning";

export function NextCreationCarousel() {
  const [offset, setOffset] = useState(0);
  const [phase, setPhase] = useState<Phase>("rest");
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  // A step is ignored while one is already running; the origin's 3000 ms interval keeps its own
  // cadence regardless (measured steps land at t ~800 and t ~3800, i.e. exactly 3000 apart).
  const goNext = useCallback(() => setPhase((p) => (p === "rest" ? "next" : p)), []);
  const goPrev = useCallback(() => setPhase((p) => (p === "rest" ? "prevArmed" : p)), []);

  // Autoplay: a 3000 ms interval that runs only while `is-playing` is on the element. Pointer
  // entry (`data-hover-stop`) suspends the timer without touching the play state, and leaving
  // restarts it.
  useEffect(() => {
    if (!playing || hovered) return;
    const id = window.setInterval(goNext, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [goNext, hovered, playing]);

  // Arm → run: let the browser paint the compensated frame before releasing the transform.
  useEffect(() => {
    if (phase !== "prevArmed") return;
    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => setPhase("prevRunning"));
    });
    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
    };
  }, [phase]);

  // Settle: rotate the array, drop the attribute and return the duration to 0s in one commit.
  useEffect(() => {
    if (phase !== "next" && phase !== "prevRunning") return;
    const delta = phase === "next" ? 1 : -1;
    const id = window.setTimeout(() => {
      setOffset((o) => (o + delta + COUNT) % COUNT);
      setPhase("rest");
    }, ANIMATE_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  const rotated = Array.from({ length: COUNT }, (_, i) => SLIDES[(offset + i) % COUNT]);
  const rendered =
    phase === "prevArmed" || phase === "prevRunning"
      ? [SLIDES[(offset - 1 + COUNT) % COUNT], ...rotated.slice(0, COUNT)]
      : [...rotated, rotated[0]];

  const animatingNext = phase === "next" || phase === "prevArmed";
  const animated = phase === "next" || phase === "prevRunning";

  return (
    <sd-carousel
      className="box sd-20"
      aria-live="off"
      data-type="carousel"
      data-animate-duration={String(ANIMATE_MS)}
      data-interval-duration={String(INTERVAL_MS)}
      data-hover-stop=""
      data-autoplay=""
      data-max-length="7"
      data-sd-carousel-runtime-id="sd-20"
      {...(playing ? { "is-playing": "" } : {})}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* `.sd-35` is authored first in page.html and appended by the runtime in the live DOM; it is
          position:absolute, so the order is irrelevant. */}
      <div className="box sd-35 sd-carousel__controls">
        <button className="box sd-36" aria-label="Prev Slide" slot="prev" type="button" onClick={goPrev}>
          <MaterialIcon name="keyboard_arrow_left" className="sd-37" />
        </button>
        <button
          className="box sd-38"
          aria-label={playing ? "Stop automatic slide show" : "Play automatic slide show"}
          slot="play-toggle"
          type="button"
          data-playing-label="Stop automatic slide show"
          data-paused-label="Play automatic slide show"
          onClick={() => setPlaying((p) => !p)}
        >
          {/* app/studio-base.css:895 swaps these two off `is-playing` on the <sd-carousel>. */}
          <div className="box sd-39" slot="pause">
            <MaterialIcon name="pause" className="sd-40" />
          </div>
          <div className="box sd-41" slot="play">
            <MaterialIcon name="play_arrow" className="sd-42" />
          </div>
        </button>
        <button className="box sd-43" aria-label="Next Slide" slot="next" type="button" onClick={goNext}>
          <MaterialIcon name="keyboard_arrow_right" className="sd-44" />
        </button>
      </div>
      {rendered.map((slide, position) => (
        // Keyed by slot, not by item: the settle commit swaps each slot's content while the
        // transform snaps back, exactly like the origin's node rotation.
        <div
          key={position}
          className="sd-carousel__slide box sd-20__content"
          data-sd-carousel-transform="sd-20"
          data-sd-carousel-duration="sd-20"
          data-appear-manual=""
          // The origin writes `data-animatingNext`; HTML attribute selectors are case-insensitive,
          // and React rejects a camelCase custom attribute, so the DOM carries the lowercase form.
          data-animatingnext={animatingNext ? "" : undefined}
          style={{ transitionDuration: animated ? "0.6s" : "0s" }}
        >
          <a className="box sd-20__content__sd-1" href={slide.href} target="_blank">
            {/* Plain <img> (not next/image) so the sliced `.sd-20__content__sd-2` rules apply
                unchanged. The origin ships an SVG placeholder + data-sd-img-src and a <noscript>
                fallback; the clone points straight at the local `_small.webp`. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img sd-20__content__sd-2" src={slide.cover} alt={slide.alt} />
          </a>
          <div className="box sd-20__content__sd-3">
            <a className="box sd-20__content__sd-4" href={slide.href} target="_blank">
              <p className="text sd-20__content__sd-5 theme-b6b0338f">{slide.href}</p>
              <div className="box sd-20__content__sd-6">
                <MaterialSymbol name="arrow_forward" className="sd-20__content__sd-7" />
                {/* Not MaterialSymbol: this second arrow is the labelled one (role=img). */}
                <span
                  className="icon sd-20__content__sd-8 material-symbols-outlined"
                  aria-label="新規タブで開く"
                  role="img"
                >
                  arrow_forward
                </span>
              </div>
            </a>
            <div className="box sd-20__content__sd-9">
              <p className="text sd-20__content__sd-10 theme-b6b0338f">Made by</p>
              <a className="box sd-20__content__sd-11" href={slide.makerHref} target="_blank">
                {slide.maker.kind === "logo" ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    className="img sd-20__content__sd-12"
                    src={slide.maker.src}
                    alt={slide.maker.alt}
                  />
                ) : (
                  <p className="text sd-20__content__sd-13 theme-b6b0338f">{slide.maker.label}</p>
                )}
              </a>
            </div>
          </div>
        </div>
      ))}
    </sd-carousel>
  );
}
