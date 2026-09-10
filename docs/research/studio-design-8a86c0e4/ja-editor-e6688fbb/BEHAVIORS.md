# BEHAVIORS — studio.design/ja/editor (measured @1440 dpr1, Playwright)

## Interaction model
No JS library on the page (recon `libs` all false: no gsap/lenis/swiper/embla/framer/three/lottie).
Everything is Studio's own runtime driving `data-*` attributes. Rebuild the behavior, not the runtime.

## Global
- `html { scroll-behavior: smooth }`, `scroll-snap-type: none`, body bg `#f7f7f7`.
- Page height: 13942 @1440 · 17807 @768 · 15423 @390 (widths 1440/768/390 all fluid — **zero
  width media queries**; responsive comes from %/flex/aspect-ratio, only `@media` present are
  `min-resolution`/`max-resolution` (3×18 rules) and `prefers-reduced-motion: reduce`).
- 427 pseudo-class rules live in `css/parsed.json` (hover/focus/active) — source of truth for hovers.

## Header (`#header`, fixed)
- `position: fixed; top: 32px; z-index: 5`, itself transparent; the visible pill is the FIRST CHILD:
  `background: rgba(255,255,255,0.8)`, `backdrop-filter: blur(2px)`,
  `box-shadow: rgba(14,31,53,0.08) 0 1px 4px`, height 64 (1440) / 56 (768) / 52 (390).
- **No scroll-state change**: computed style at scrollY 0 and 800 identical.
- 5 nav dropdowns = `<button data-toggle-trigger aria-expanded>` + `[data-toggle-content]`:
  プロダクト / 活用方法 / 導入事例 / リソース / サポート. **Click-triggered, not hover**
  (hover for 700 ms left height 0; click opened 869×376 panel at viewport top 76).
- Transition on toggles: `0.3s cubic-bezier(0.4, 0.4, 0, 1)` (Studio's standard easing, used site-wide).
- Mobile menu is a real `<dialog class="modal-ja_menu">` (body child) with its own 5 toggles
  (`.modal-ja_menu__sd-7`, bg `#222`, `overflow: hidden auto`, 24 `appear` targets).

## Sticky sub-headers (4)
`top: 104px` in all four; each is the section's title block scrolling within its parent:
| sticky | h | parent | parent h |
|---|---|---|---|
| `.sd-47` | 94 | `.sd-46` (in `.sd-45` Free Layout) | 1176 |
| `.sd-135` | 134 | `.sd-134` (in `.sd-133` Visual Design) | 1798 |
| `.sd-273` | 94 | `.sd-272` (in `.sd-271` Collaboration) | 1268 |
| `.sd-305` | 94 | `.sd-304` (in `.sd-303` Data) | 1265 |

## Carousels (2, autoplay, infinite)
Read from `[data-sd-carousel-runtime-id]` dataset:
- `.sd-20` (in `.sd-13` Next Creation): `animateDuration 600`, `intervalDuration 3000`,
  `hoverStop` present, `autoplay`, `maxLength 7`.
- `.sd-244` (in `.sd-236` Featured Creators): `animateDuration 1000`, `intervalDuration 4500`,
  `autoplay`, `maxLength 7`, **no** hoverStop.
- Slides are `.sd-carousel__slide`; the runtime translates each slide
  (`transition: transform cubic-bezier(0.58, 0.21, 0.41, 0.96)`, duration applied inline per step)
  and rotates DOM nodes, i.e. seamless infinite loop, not a scroll container (`scrollLeft` stays 0).

## Video
3 `<video>` all `autoplay loop muted playsinline`, no poster, `src` ends `#t=0.01`:
- `.sd-45` Free Layout: 2 (rendered 644×448 and 448×448)
- `.sd-133` Visual Design: 1 (rendered 497×155)
Some have `data-video-state` / `data-playing-label` / `data-paused-label` play-pause controls in markup.

## Reveal (`appear`)
`.appear` / `[data-appear-manual]` counts per unit: `.sd-13` 7 · `.sd-236` 21 · footer 10 ·
menu dialog 24 + 3. IntersectionObserver-driven, class flip + the 0.3s Studio easing.
No CSS `@keyframes` exist anywhere (parse-css keyframes = 0) — all motion is transition-based.

## Icons / fonts
- Material Symbols Outlined used as **ligature text** (`arrow_forward` etc, 171 elements).
- Font stack tokens: `--s-font-5489e031` & `--s-font-68aa87c4` = `Inter,'Noto Sans JP'`,
  `--s-font-b18a84da` = `'Instrument Serif'`, `--s-font-a28a97b6` = `'IBM Plex Mono'`.
- `Material Icons` + `Font Awesome 6 Free/Brands` @font-face are declared by the Studio runtime but
  no page glyph uses them (Material **Symbols** is the one in use).

## Not present
No Lottie (RECON `lottie:false`, no `.json` animation over the wire), no canvas, no WebGL,
no scroll-snap, no smooth-scroll library, no theme toggle, 1 iframe (self-referential "archetype").
`.sd-354` ("旧エディタを見る") exists in the HTML but is `display:none` at every viewport → out of scope.
