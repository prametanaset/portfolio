# BEHAVIORS — ai.timetorefokus.com

**Interaction model: NOT a scrolling page.** `document.scrollHeight === innerHeight` (900 @1440).
`#main` is `position: fixed; z-index: 1000` and the whole experience is a **state machine driven by clicks**,
plus GSAP timelines. No scroll, no scroll-snap, no ScrollTrigger firing on the document (ScrollTrigger is loaded
but the page does not scroll).

## States (verified)
1. **loading** — `#loading` (`.c-loading-screen`, z50) visible: progress bar `#loading-bar` + `#loading-fill`
   (247×4 px, centered), `#loading-video-wrapper` (full-bleed `final-bg.mp4`), `#video-overlay`,
   `#loading-number`/`#loading-percentage` (display:none at 1440 — percentage text is used on mobile;
   the "0%" seen in page text comes from this node). Auto-advances to intro.
2. **intro** (default after load) — `#intro-section` (`.c-intro`, fixed z100): giant `TIME TO REFOKUS` (two lines,
   Satoshi ~150px, white), right-aligned tagline block "Redefining the creative world with design, technology, and
   deep innovation.", background `final-bg.mp4` (purple sphere, autoplay/loop/muted/playsInline) inside the
   rounded 1408×868 window inset 16px. Action bar visible.
3. **chat** — click `#speaking-ball` (the orb, also labelled `#push-to-start` "PUSH TO START"):
   `#chat` goes `opacity 0 → 1`, `z-index -1 → 200`, `pointer-events: all`, `filter: blur(N) → blur(0)`;
   `#intro-section` fades/blurs out; background darkens to near-black gradient.
   Chat layout: left column `#slider-aside` (small `TIME TO REFOKUS` home button `#home-btn`, blurb
   "We used Artificial Intelligence to provide a cool experience to navigate Refokus' thoughts and ideas (also known
   as blog)", underlined link "Explore all Articles"), centre `#root` = **WebGL carousel** (see below),
   right `#chat-main` (`#chat-messages` greeting + `#chat-sender` textarea/form).
   A `#slider-back` "BACK" button exists (opacity 0 until an article is opened).
4. **article** — selecting a carousel card reveals `#chat-article` (`.c-article-wrapper`): date `October 26, 2022`,
   read time, `h2.c-title-2`, two CTAs. Zero-size in the states captured; extractor must open a card to measure.
5. **hype video** — click `#hype-btn` ("HYPE VIDEO / PLAY"): `#full-video` (z 9999999) `display: none → block`,
   plays `#hype-video`. **The upstream video file is dead (HTTP 400/404 from Supabase)** — on the real site the
   overlay opens with `readyState 0` and nothing plays. `#full-video-back` ("BACK" + arrow) closes it back to `display:none`.
6. **sound on/off** — `#sound-btn` (fixed, top-left area, `opacity .5`, `lottie-player#sound-lottie` 23×16) toggles
   ambient audio (`bg.mp3` from the carousel app + `#chat-audio` inline base64 mp3 for chat SFX).
   `#lottie-trigger-on` / `#lottie-trigger-off` are 0×0 hover/click proxies.
   A fixed pill "Click to enable sound" (`.c-enable-sound-wrapper`, z 2147483647, centered ~y246) is shown until
   the user interacts (browser autoplay gate).

## Persistent chrome
- `#bar` (`.c-action-bar`, absolute z300, 1408×100 at bottom of the window): a `lottie-player#bottom-bar-lottie`
  (liquid_bar_8k.json, 1408×100) paints the animated liquid notch; `a#bar-logo` (Refokus mark, logo_lottie.json),
  `#push-to-start` caption, `section#hype-btn` pill, `#speaking-ball` (80×80 orb = `speaking-ball.mp4` in a circular
  mask, sits half-outside the bar), plus two 20×20 inline-SVG corner masks (`.c-action-bar_border`, one `cc-right`)
  that fake the concave joint between window and bar.
- `#ambient-music` (fixed, full viewport, own `<canvas>`) — audio-reactive visualiser layer, invisible when muted.

## Non-DOM content (QA exclusions)
- `#root` centre column = **`<canvas>` 915×868**, a React+three.js app (`carousel-sigma.vercel.app/assets/index.js`)
  loading `carousel_fixed.gltf` (8.9 MB, textures baked into the model). Vertical auto-scrolling stack of article
  cards with curvature/parallax; card art is *not* available as separate images. Article slugs come from a hidden
  Webflow collection (`.c-collection-hidden`, 10 items, see `collection-items.json`).
- `#ambient-music` canvas (audio visualiser).
- `final-bg.mp4` / `speaking-ball.mp4` — video, frame-timed; must be masked in pixel diff.

## Responsive (verified 768 / 390)
- Carousel column is hidden; only the chat column renders (full width, 24px gutters).
- `TIME TO REFOKUS` home button stays top-left, smaller; greeting text ~18px; textarea full width.
- Action bar collapses: logo left, `PLAY` pill right, orb centered with "PUSH TO START" under it.
- `.c-mobile-top-bar` and `.c-intro-btn cc-mobile` are the mobile-only wrappers.

## Libraries in use (from recon)
Webflow + jQuery 3.5.1, GSAP 3.11.4 + ScrollTrigger + CustomEase 3.11.5, SplitType 0.3.4,
`@lottiefiles/lottie-player` 1.5.7, three.js (inside the carousel bundle), two external React bundles
(carousel, chat). Minified sources saved to `js/` for timing/easing reference (git-ignored).
