"use client";

// Local port of the `<sd-carousel class="box sd-244">` inside studio.design/ja/editor's
// `main > .sd-236`. The shared `SdCarousel` is deliberately NOT used: it wraps the slides in an
// extra track div (the origin's slides are direct flex children of the custom element), rotates
// `style.order` instead of translating, renders `slides.length` nodes instead of the origin's
// `data-max-length="7"`, never emits `data-animatingNext` / `data-animatingPrev`, and hides its
// play-toggle — see FeaturedCreatorsSection.spec.md "Shared components".
//
// Motion model (extract/featured-creators.states.json → carouselRuntime):
//   rest     — 7 slides, `transform: none`, inline `transition-duration: 0s`
//   stepping — every slide gets `data-animatingNext` + inline `transition-duration: 1000ms`; the
//              sliced rule `.sd-root [data-animatingNext].sd-244__content { transform:
//              translateX(-100%) }` supplies the distance, and `.sd-244__content`'s
//              `cubic-bezier(0.25, 0.1, 0.1, 1)` the easing. No px value lives in JS.
//   settle   — the array rotates one position, the attribute goes away and the duration returns
//              to 0s, so `transform` snaps back to `none` in the same frame with no visible jump.
//
// Unlike `.sd-20`, this carousel has NO `data-hover-stop`: parking the pointer on a card for 11 s
// still advanced it 2 steps on the origin, so there is no mouseenter/mouseleave handling here.

import { useCallback, useEffect, useState } from "react";

import { MaterialIcon } from "@/components/sites/studio-design-8a86c0e4/shared/icons";

const IMAGES = "/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images";

/** data-animate-duration on the origin element. */
const ANIMATE_MS = 1000;
/** data-interval-duration on the origin element. */
const INTERVAL_MS = 4500;
/** data-max-length on the origin element: 5 uniques rendered as 7 nodes. */
const RENDERED = 7;

type Slide = {
  href: string;
  cover: string;
  /** `Cover image for "<title>"`. */
  coverAlt: string;
  logo: string;
  logoAlt: string;
  title: string;
  tag: string;
};

/** The 5 authored slides, in `page.html` `<template class="sd-carousel__template">` order. */
const SLIDES: Slide[] = [
  {
    href: "https://studio.design/ja/interview/randysdonuts",
    cover: `${IMAGES}/s-1800x2400_v-frms_webp_763a3d0a-a1bb-4777-9374-bb8cfded6c18_small.webp`,
    coverAlt: "ภาพปกของ “เบื้องหลังเว็บไซต์ที่พา Randy’s Donuts จากแอลเอมาถึงญี่ปุ่น”",
    logo: `${IMAGES}/s-435x198_92b31fb9-259d-479c-8982-de52d3dc4389.svg`,
    logoAlt: "IT Plus Inc.",
    title: "Behind the site that brought LA's Randy's Donuts to Japan",
    tag: "#SMB",
  },
  {
    href: "https://studio.design/ja/interview/baigie",
    cover: `${IMAGES}/s-1800x2400_v-frms_webp_aa92a579-a13d-42a8-b1a1-80728c51e38e_small.webp`,
    coverAlt: "ภาพปกของ “งานออกแบบไม่ใช่แค่เรื่องความสวย: Chikara Sogaya กับทิศทางของเว็บดีไซน์”",
    logo: `${IMAGES}/s-435x198_e2cbe5d4-5552-4a42-82d4-6d203601ad00.svg`,
    logoAlt: "Baigie Inc.",
    title: "Design isn't about looking good: Chikara Sogaya on where web design is headed",
    tag: "#Agency",
  },
  {
    href: "https://studio.design/ja/interview/cockdoodoodoo",
    cover: `${IMAGES}/s-1800x2400_v-frms_webp_b79c8f44-1526-4a9f-a085-3b98cda1fcf2_small.webp`,
    coverAlt: "ภาพปกของ “ปล่อยให้ความรู้สึกนำทางสู่พื้นที่ระหว่างจินตนาการกับความจริง: งานออกแบบชวนดื่มด่ำของ Erina Ohashi”",
    logo: `${IMAGES}/s-435x198_93410cb5-a5a4-463a-a351-6aa6c4321fd2.svg`,
    logoAlt: "Cook Doodle Doo",
    title: "Led by sensibility, into the space between fantasy and reality: Erina Ohashi's immersive design",
    tag: "#Freelance",
  },
  {
    href: "https://studio.design/ja/interview/maruigroup",
    cover: `${IMAGES}/s-1800x2400_v-frms_webp_9439ed80-0673-4ea0-8d70-bb5896116af0_small.webp`,
    coverAlt: "ภาพปกของ “ไม่ใช่แค่ถูกและเร็ว: การทำงานด้วยทีมในองค์กรมีความหมายอย่างไรต่อ DX ของ Marui Group”",
    logo: `${IMAGES}/s-435x198_7289a2af-6478-4af0-9946-d338f53889aa.svg`,
    logoAlt: "Marui United Inc.",
    title: "Not just cheap and fast: what in-housing really means for Marui Group's DX",
    tag: "#Enterprise",
  },
  {
    href: "https://studio.design/ja/blog/wosh-design",
    cover: `${IMAGES}/s-1800x2400_v-frms_webp_fc249913-5eed-41d5-84f4-2b148a64ec2f_small.webp`,
    coverAlt: "ภาพปกของ “ครอบครัว เพื่อน และแมวหนึ่งตัว: มุมมองที่กว้างขึ้นกับงานออกแบบที่เบ่งบาน”",
    logo: `${IMAGES}/s-435x198_8f40e704-c2b9-4ce3-9ef6-242bd31d5071.svg`,
    logoAlt: "WOSH design Inc.",
    title: "Family, friends and a cat: a widening view and a design in bloom",
    tag: "#Agency",
  },
];

const COUNT = SLIDES.length;

/**
 * `rest` renders `items[(offset + i) % 5]` for i in 0..6 — the origin's `data-max-length="7"`, so
 * 2 of the 5 uniques appear twice per frame.
 *
 * `next` keeps that node list and stamps `data-animatingNext` (translateX(-100%)) for 1000 ms.
 *
 * A prev step cannot reuse `data-animatingPrev` verbatim: pulling the previous item in means
 * prepending a node, which pushes every other slide one slot to the right, so the step has to
 * start from a compensating translateX(-100%) and animate back to `transform: none`. Hence the two
 * phases `prevArmed` (new list, `data-animatingNext`, duration 0s — pixel-identical to rest) and
 * `prevRunning` (attribute dropped, duration 1000 ms — the whole line slides one width right).
 * The distance and easing still come from the sliced CSS.
 */
type Phase = "rest" | "next" | "prevArmed" | "prevRunning";

export function FeaturedCreatorsCarousel() {
  const [offset, setOffset] = useState(0);
  const [phase, setPhase] = useState<Phase>("rest");
  const [playing, setPlaying] = useState(true);

  // A step is ignored while one is already running; the 4500 ms interval keeps its own cadence
  // regardless (measured settles 4499 ms apart).
  const goNext = useCallback(() => setPhase((p) => (p === "rest" ? "next" : p)), []);
  const goPrev = useCallback(() => setPhase((p) => (p === "rest" ? "prevArmed" : p)), []);

  // Autoplay: a 4500 ms interval that runs only while `is-playing` is on the element. No
  // hover suspension — the origin has no `data-hover-stop` on `.sd-244`.
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(goNext, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [goNext, playing]);

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

  const start = phase === "prevArmed" || phase === "prevRunning" ? offset - 1 : offset;
  const rendered = Array.from(
    { length: RENDERED },
    (_, i) => SLIDES[(start + i + COUNT) % COUNT],
  );

  const animatingNext = phase === "next" || phase === "prevArmed";
  const animated = phase === "next" || phase === "prevRunning";

  return (
    <sd-carousel
      className="box sd-244"
      aria-live="off"
      data-type="carousel"
      data-animate-duration={String(ANIMATE_MS)}
      data-interval-duration={String(INTERVAL_MS)}
      data-autoplay=""
      data-max-length="7"
      data-sd-carousel-runtime-id="sd-244"
      {...(playing ? { "is-playing": "" } : {})}
    >
      {/* `.sd-255` is authored first in page.html and appended by the runtime in the live DOM; it
          is position:absolute, so the order is irrelevant. */}
      <div className="box sd-255 sd-carousel__controls">
        <div className="box sd-256">
          <button className="box sd-257" aria-label="สไลด์ก่อนหน้า" slot="prev" type="button" onClick={goPrev}>
            <MaterialIcon name="keyboard_arrow_left" className="sd-258" />
          </button>
          <button
            className="box sd-259"
            aria-label={playing ? "หยุดเล่นสไลด์อัตโนมัติ" : "เล่นสไลด์อัตโนมัติ"}
            slot="play-toggle"
            type="button"
            data-playing-label="Stop automatic slide show"
            data-paused-label="Play automatic slide show"
            onClick={() => setPlaying((p) => !p)}
          >
            {/* app/studio-base.css:895 swaps these two off `is-playing` on the <sd-carousel>. */}
            <div className="box sd-260" slot="pause">
              <MaterialIcon name="pause" className="sd-261" />
            </div>
            <div className="box sd-262" slot="play">
              <MaterialIcon name="play_arrow" className="sd-263" />
            </div>
          </button>
          <button className="box sd-264" aria-label="สไลด์ถัดไป" slot="next" type="button" onClick={goNext}>
            <MaterialIcon name="keyboard_arrow_right" className="sd-265" />
          </button>
        </div>
      </div>
      {rendered.map((slide, position) => (
        // Keyed by slot, not by item: the settle commit swaps each slot's content while the
        // transform snaps back, exactly like the origin's node rotation.
        <div
          key={position}
          className="sd-carousel__slide box sd-244__content"
          data-sd-carousel-transform="sd-244"
          data-sd-carousel-duration="sd-244"
          data-appear-manual=""
          // The origin writes `data-animatingNext`; HTML attribute selectors are case-insensitive,
          // and React rejects a camelCase custom attribute, so the DOM carries the lowercase form.
          data-animatingnext={animatingNext ? "" : undefined}
          style={{ transitionDuration: animated ? "1000ms" : "0s" }}
        >
          {/* `.appear` is rendered literally: its only declarations here are transition timing —
              no opacity / translate / scale — so the reveal is visually inert (spec: Reveal). */}
          <a className="box sd-244__content__sd-1 appear" href={slide.href} target="_blank">
            <div className="box sd-244__content__sd-2">
              {/* Plain <img> (not next/image) so the sliced `.sd-244__content__sd-3` rules apply
                  unchanged. The origin ships an SVG placeholder + data-sd-img-src and a <noscript>
                  fallback; the clone points straight at the local `_small.webp`. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="img sd-244__content__sd-3" src={slide.cover} alt={slide.coverAlt} />
              <div className="box sd-244__content__sd-4" />
              <div className="box sd-244__content__sd-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="img sd-244__content__sd-6"
                  width={435}
                  height={198}
                  alt={slide.logoAlt}
                  src={slide.logo}
                />
              </div>
            </div>
            <div className="box sd-244__content__sd-7 appear">
              <h4 className="text sd-244__content__sd-8">{slide.title}</h4>
              <div className="box sd-244__content__sd-9">
                <ul className="box list-1">
                  <li className="box list-1__item">
                    <p className="text list-1__item__sd-1">{slide.tag}</p>
                  </li>
                </ul>
              </div>
            </div>
          </a>
        </div>
      ))}
    </sd-carousel>
  );
}
