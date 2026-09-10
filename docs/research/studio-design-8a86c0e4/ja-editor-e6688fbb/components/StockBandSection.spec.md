# StockBandSection Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `main > .sd-331` (`div.box.sd-331`) · DOM order 12 of 13, the last thing before `footer.symbol-3`
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/StockBandSection.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/` → `stock-band-1440.png` (scrollY 12206, whole section fits one 1440×900 tile) · `stock-band-768.png` (12748) · `stock-band-390.png` (14025) · hover states `stock-band-1440-hover.png`, `stock-band-768-hover.png`. All are scrolled viewport tiles at dpr 1, so the fixed `#header` pill overlays the top 96 px of each tile (64 px at 390) — crop that band when diffing.
- **Interaction model:** hover-driven — one CSS `:hover` on the single `<a>` that wraps the whole card. No scroll behaviour, no reveal, no toggle, no click state, no timer, no carousel, no video, no sticky.
- **Client component:** no. Everything is declarative CSS; the component can be a server component.
- **Root rect @1440:** x 0, y 12206.18, w 1440, h 600.28 · **@768:** 0, 12747.86, 768, 398.19 · **@390:** 0, 14024.49, 390, 351.59
- **Sub-components:** `MaterialSymbol` ×1 from `components/sites/studio-design-8a86c0e4/shared/icons.tsx`. 26 nodes, one flat file — no split. `Appear`, `SdToggle`, `SdCarousel`, `SdVideo` are **not** needed.
- **Non-DOM content:** the card's photo is **not** an `<img>` — it is the Studio `image` / `image__bg-container` custom-property background (see Assets). No video, no canvas, no Lottie, no iframe, no `<noscript>`.
- **REVEAL VERDICT — refuted:** `querySelectorAll('.appear,[data-appear-manual],.appear-active,[data-appear],[data-inited-appear]')` inside the section returned **0** at 1440, 768 and 390. There is no `data-*` attribute anywhere in the section. `__cloneSnap.animations('main > .sd-331')` returned `{count: 0}`; no `@keyframes` exist on the page. The only inline `style` attribute is the four-URL `--img-*` block on `div.sd-333`, which must be reproduced verbatim.
- **TOGGLE VERDICT — refuted:** 0 hits for `[data-toggle-trigger],[data-toggle-content],sd-toggle,button,[aria-expanded]`.
- **CSS slice command:** `node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs sd-331..353 --out app/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/stock-band.css` — token **`sd-331..353`** only (46 rules, 10085 bytes), no wildcard. The numeric-range form is required, not a prefix: `symbol-1__sd-331`, `symbol-1__sd-353` and `symbol-3__sd-331` exist in `css/main.css` for the header and footer and must **not** be pulled in; the range token matches bare `.sd-NNN` only (verified — the emitted file contains none of them, and none of `.sd-354`, the `display:none` scroll widget). Verified by a live class census at all three widths (`extract/stock-band.states.json` → `classCensus`): the complete rendered class set is `box`, `text`, `img`, `icon`, `material-symbols-outlined`, `image`, `image--horizontal`, `image__bg-container` and `sd-331`…`sd-353`. **No `theme-*` class is rendered anywhere in this section** — every font is declared directly on an `.sd-NN` rule, so there is no theme-vs-`.sd-NN` specificity contest here at all. The non-`sd-NN` classes are already in `app/studio-base.css` (`.image__bg-container` at 493, its `::before` at 507, the `image--horizontal` container queries at 535/710). Custom properties the slice references — `--s-font-a28a97b6` `'IBM Plex Mono'`, `--s-font-5489e031` `Inter,'Noto Sans JP'` — are defined at `app/studio-base.css:43`. Keep origin class names verbatim.

## DOM Structure
```
div.box.sd-331                                     section, bg rgb(255,255,255), padding 0 0 104px, row, justify center, align flex-start, overflow hidden
  a.box.sd-332[href target=_blank]                 THE CARD — the whole thing is one link. bg #121212, radius 4, padding 16, margin 0 24, w 1920 / max-width calc(100% - 48px), column, overflow hidden
    div.box.image.image--horizontal.sd-333         ABSOLUTE inset top/left 0, 100%×100%, z-index 0, scale 1.02, transition-duration 600ms; carries the inline --img-origin/small/middle/regular URLs
      span.image__bg-container[aria-hidden]        z-index −2; its ::before paints background-image var(--img-current), cover, 50% 50%
    div.box.sd-334                                 ABSOLUTE bottom 24 right 24, 40×40, z-index 1, justify flex-end, overflow hidden — the arrow mask
      span.icon.sd-335[aria-hidden]                "arrow_forward", 40px, rotate −45deg, translate 0 40px
      span.icon.sd-336[aria-label role=img]        "arrow_forward", 40px, rotate −45deg
    div.box.sd-337                                 top meta row, w 1920 / max-width 100%, row, gap 24, align center
      div.box.sd-338 > img.img.sd-339              10×10 sparkle SVG (alt "")
      div.box.sd-340 > p.text.sd-341               "Curated Inspiration"
      div.box.sd-342 > p.text.sd-343               "For You"
      div.box.sd-344 > p.text.sd-345               "STOCK.STUDIO.DESIGN" + trailing <br>, justify flex-end
    div.box.sd-346                                 hero row, w 100%, row, gap 0 24, padding 198px 0 210px, align center
      div.box.sd-347                               EMPTY spacer, w 196, h 10, flex none
      div.box.sd-348                               flex 1, row, gap 0 24, align center
        h2.box.sd-349 > img.img.sd-350             Studio.Stock wordmark SVG, height 40
        div.box.sd-351 > p.text.sd-352             two lines via one <br>
      div.box.sd-353                               EMPTY spacer, w 196, h 10, flex none
```
`.sd-347` and `.sd-353` are genuinely empty `<div>`s used as grid rails — render them, they hold the 196 px columns that keep `.sd-348` centred. There are no `<noscript>` blocks in this section.

## Computed Styles (from getComputedStyle @1440 dpr 1, exact; rects are `[page-x, section-relative-y, w, h]`)
### `.sd-331` (S1) — rect [0, 0, 1440, 600]
- display: flex
- flexDirection: row
- flexWrap: nowrap
- justifyContent: center
- alignItems: flex-start
- width: 1440px
- height: 600.281px
- maxWidth: 100%
- padding: 0px 0px 104px
- position: relative
- backgroundColor: rgb(255, 255, 255)
- overflow: hidden hidden
- transitionDuration: 0.3s
- transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1)
### `.sd-332` (S2, the link/card) — rect [24, 0, 1392, 496.28]
- width: 1392px (declared 1920px, maxWidth calc(100% - 48px)) · height: 496.281px · margin: 0px 24px · padding: 16px · borderRadius: 4px · backgroundColor: rgb(18, 18, 18) · flexDirection: column · alignItems: center · gap: 0px · overflow: hidden · position: relative · cursor: pointer · color: rgb(51, 51, 51)
### `.sd-333` (S3) [10, −5, 1420, 506 — the scaled box] and `span.image__bg-container` (S4) [same]
- sd-333: position: absolute · top: 0px · left: 0px · width: 1392px · height: 496.281px · zIndex: 0 · **scale: 1.02** · transitionDuration: **600ms** · transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1) · flexDirection: column · alignItems: center
- bg-container: position: absolute · width: 1392px · height: 496.281px · zIndex: −2 · display: block · boxSizing: content-box · transitionDuration: 600ms · borderRadius: inherit · pointerEvents: none · containerType: size / containerName: image-container
- `::before`: backgroundImage `url(".../s-11136x4000_v-frms_webp_aac6934b-3d26-4ddb-9617-27db10104869_regular.webp")` · backgroundSize: cover · backgroundPosition: 50% 50% · filter: none · transitionDuration: 600ms (inherited)
### `.sd-334` (S5) [1352, 432, 40, 40] · `.sd-335` (S6) [1304, 464, 57, 57] · `.sd-336` (S7) [1344, 424, 57, 57]
- sd-334: position: absolute · top: 432.281px · right: 24px · bottom: 24px · left: 1328px · width: 40px · height: 40px · zIndex: 1 · justifyContent: flex-end · alignItems: center · gap: 0px · padding: 0px · overflow: hidden
- sd-335 / sd-336: fontFamily "Material Symbols Outlined" · fontSize: 40px · lineHeight: 40px · width/height 40px (the 57 px rect is the rotated bounding box) · color: rgb(247, 247, 247) · fontVariationSettings `"FILL" 0, "wght" 400` · fontFeatureSettings `"liga"` · rotate: -45deg on both · translate: **0px 40px on sd-335**, `0px` on sd-336 · transitionDuration: **600ms** · transformOrigin: 20px 20px
- `.sd-334` is 40 px wide with 40+40 px of content, so sd-335 is clipped out below-left at rest and only sd-336 shows.
### `.sd-337` (S8) [40, 16, 1360, 12.09] and its four cells
- sd-337: width: 1920px → 1360px · rowGap/columnGap: 24px · justifyContent: flex-start · alignItems: center · margin: 0px · padding: 0px · flexWrap: nowrap
- `.sd-338` / `.sd-347` / `.sd-353` (S9): width: 196px · height: 10px · flex: none · justifyContent: flex-start · alignItems: flex-start · minWidth: 0
- `.sd-339` (S10): width: 10px · height: 10px · aspectRatio `auto 10 / 10` · overflow: clip
- `.sd-340` / `.sd-342` (S11): width: 448px · flexBasis: 0% (flex:1) · alignItems: flex-start
- `.sd-341` / `.sd-343` (S12): fontFamily "IBM Plex Mono" · fontSize: 11px (0.6875rem) · lineHeight: 12.1px (1.1) · letterSpacing: -0.44px (-0.04em) · fontWeight: 500 · color: rgb(247, 247, 247) · textAlign: left · overflow: hidden · flexBasis: 0%
- `.sd-344` (S13): width: 196px · height: 11px · display: flex · justifyContent: flex-end · alignItems: center
- `.sd-345` (S14): fontFamily "IBM Plex Mono" · fontSize: 10px (0.625rem) · lineHeight: 11px · letterSpacing: -0.4px · fontWeight: 500 · color: rgb(172, 172, 172) (`#acacacff`) · width: 106.406px · overflow: hidden
### `.sd-346` (S16) [40, 28, 1360, 452.19] and the hero row
- sd-346: width: 100% · padding: 198px 0px 210px · columnGap: 24px · rowGap: 0px · justifyContent: flex-start · alignItems: center · flexWrap: nowrap
- `.sd-348` (S17) [260, 226, 920, 44.19]: flexBasis: 0% (flex:1) · columnGap: 24px · alignItems: center
- `.sd-349` (S18) [260, 228, 448, 40]: flexBasis: 0% · columnGap: 24px · alignItems: center · (an `<h2>` carrying `box`, not `text`)
- `.sd-350` (S19) [260, 228, 321.95, 40]: height: 40px · width: 321.945px (auto from aspectRatio `auto 330 / 41`) · overflow: clip · objectFit: fill
- `.sd-351` (S20) [732, 226, 448, 44.19]: flexBasis: 0% · columnGap: 24px · alignItems: center
- `.sd-352` (S21) [732, 226, 179.52, 44.19]: fontFamily Inter, "Noto Sans JP" · fontSize: 17px (1.0625rem) · lineHeight: 22.1px (1.30) · letterSpacing: -0.68px (-0.04em) · fontWeight: 500 · color: rgb(247, 247, 247) · textAlign: left · flex: none · overflow: hidden
- Every node except `.sd-333`, its `::before`, `.sd-335` and `.sd-336` carries the site-wide `transitionDuration: 0.3s` / `cubic-bezier(0.4, 0.4, 0, 1)` / delay 0s.

## States & Behaviors
### Hover — `a.sd-332` (the whole card; the only interactive element in the section)
- **Trigger:** CSS `:hover` on the link, pointer only. Measured with `page.mouse.move` to the card centre and a 1200 ms settle, after a 2600 ms settle on the baseline.
- **A → B, re-measured live at all three widths:**
  - `.sd-333` scale **1.02 → 1** (rect [10, 12201, 1420, 506] → [24, 12206, 1392, 496] @1440) — the photo un-zooms to exactly fill the card.
  - `.sd-333 > .image__bg-container::before` filter **none → brightness(0.7)** (declared `brightness(70%)`).
  - `.sd-335` translate **`0px 40px` → `40px`** (rect [1304, 12670] → [1344, 12630]) · `.sd-336` translate **`0px` → `44px -40px`** (rect [1344, 12630] → [1388, 12590]) @1440. At **768 and 390** the ≤768 block re-declares the pair: `.sd-335` `0px 24px` → `24px`, `.sd-336` `0px` → `28px -28px`. `rotate: -45deg` is restated in every hover rule and never changes.
  - **Unchanged:** `.sd-332` backgroundColor stays rgb(18, 18, 18) and opacity stays 1 (`.sd-332:hover` declares only `opacity: 1` — already 1 — and `--ha: 1`); every text colour, the arrow colour rgb(247, 247, 247), the radius and the padding are all untouched.
- **Transition:** `.sd-333`, its `::before`, `.sd-335` and `.sd-336` all carry `transition-duration: 600ms`, delay 0s, timing function cubic-bezier(0.4, 0.4, 0, 1) — the four hovering properties animate over 600 ms while the rest of the page uses 300 ms. The `::before` inherits duration/timing/delay from `.image__bg-container` (`app/studio-base.css:518-520`) and lists `filter` first in its explicit `transition-property` list.
- **Restore:** moving the pointer off the card returned every measured property to its baseline — the re-read diff was empty.
- **Evidence:** `__cloneSnap.rules('main > .sd-331')` → **9 hits, all `.sd-332:hover*`** (`extract/stock-band.states.json` → `cssRuleHits`, including the ≤768 duplicates of the two glyph rules); live before/after per viewport in `hover`; screenshots `stock-band-1440-hover.png`, `stock-band-768-hover.png`.
- **Implementation approach:** CSS only — the sliced `.sd-root .sd-332:hover …` rules do all of it. Add no React state and no JS.
### Focus / active / click / scroll
**N/A — none exist.** All 9 CSSOM pseudo-class hits are `:hover`; there is no `:focus`, `:focus-visible` or `:active` rule in `css/main.css` for these classes. The card is a plain navigation to `stock.studio.design` with no click handler. Nothing responds to scroll: no `appear` target, no `position: sticky`, no IntersectionObserver attribute.
### Section edges (page-level assembly)
Butt joins on both sides, no margin, no border, no negative offset, no overlap. `main > .symbol-2` (StartCtaSection, bg `rgb(255,255,255)`) bottom = `.sd-331` top = **12206.18**; `.sd-331` bottom = `footer.symbol-3` top = **12806.46** @1440 · 12747.86 / 13146.05 @768 · 14024.49 / 14376.08 @390. `.sd-331` has **zero top padding**, so the black card's rounded top edge sits flush on the seam with the CTA's white — the two white backgrounds are continuous and only the card marks the join. Below the card, `padding-bottom: 104px` (unchanged at every width) is the white run-out before the footer, which is also `rgb(255,255,255)`.

## Per-State Content
N/A — single state; the hover changes no text.

## Assets
- **Card background (the `image` / `image__bg-container` machinery, not an `<img>`):** `div.sd-333` carries `class="box image image--horizontal sd-333"` and an inline `style` declaring four URLs — `--img-origin`, `--img-small`, `--img-middle`, `--img-regular` — all variants of `s-11136x4000_v-frms_webp_aac6934b-3d26-4ddb-9617-27db10104869`. Its `span.image__bg-container` child (empty, `aria-hidden="true"`) paints `background-image: var(--img-current)` from its `::before`. `--img-current` is chosen by `app/studio-base.css` `@media (max-resolution: 1dppx)` plus container queries on `image-container`: base `--img-small`; `(600px <= width) and (aspect-ratio >= 1)` → `--img-middle`; `(1000px <= width) and (aspect-ratio >= 1)` → `--img-regular`. Measured at dpr 1: **1440 → `_regular` (container 1420×506) · 768 → `_middle` (734×300) · 390 → `_small` (381×253)** (`extract/stock-band.states.json` → `imageVariantsByViewport`). Reproduce the inline four-URL style verbatim so the container queries keep working.
- **MISSING — all four of those files.** None is in `assets.manifest.json` and none is on disk. They are listed url → intended local path in `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/stock-band.assets.json` (`images/s-11136x4000_v-frms_webp_aac6934b-…{_small,_middle,_regular,}.webp`). The orchestrator must fetch at least `_small`, `_middle` and `_regular`; without them the card renders as a flat `#121212` rectangle.
- `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-10x10_c3ad64c4-ef55-4c85-aa36-33ce67884f87.svg` — `img.sd-339`, alt `""`, intrinsic 10×10, `width="10" height="10"`, rendered 10 px @1440/@768 and 8 px @390. On disk.
- `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-330x41_96410d1d-48da-4cc2-8a68-d55901385dad.svg` — `img.sd-350`, alt `Studio.Stovk` (the origin's typo — reproduce it), intrinsic 330×41, `width="330" height="41"`, rendered 321.95×40 @1440, 189.48×24 @768, 221×32 @390. On disk.
- Icons: `MaterialSymbol name="arrow_forward"` for `.sd-335` (the component hard-codes `aria-hidden="true"`, matching the origin). `.sd-336` must be a plain `<span className="icon material-symbols-outlined sd-336" aria-label="新規タブで開く" role="img">arrow_forward</span>` — `MaterialSymbol` cannot express `aria-label` + `role`.
- Layered composition, back to front inside `a.sd-332`: `.sd-333` (absolute, z-index 0) with its bg-container at z-index −2 → `.sd-337` and `.sd-346` (static, z-index auto) → `.sd-334` (absolute, z-index 1). No `--g-*` gradient anywhere; the darkening over the photo is `brightness(70%)` on hover only, and the resting contrast is baked into the source image.

## Text Content (verbatim)
Byte-checked against the live DOM: no U+00A0, U+2028, U+2029, U+200B, U+200E, U+200F, U+FEFF, U+3000, U+2060 and no character in U+2000–U+20FF (`extract/stock-band.states.json` → `codepointAudit`).
- `p.sd-341`: `Curated Inspiration` · `p.sd-343`: `For You`
- `p.sd-345`: `STOCK.STUDIO.DESIGN<br>` — the `<br>` is the last child inside the `<p>`, after the text
- `p.sd-352`: `クリエイターのための<br>次世代のフォトストック`
- `span.sd-335`: `arrow_forward` (`aria-hidden="true"`) · `span.sd-336`: `arrow_forward` (`aria-label="新規タブで開く"`, `role="img"`)
- `a.sd-332`: `href="https://stock.studio.design/"`, `target="_blank"`, **no `rel` attribute on the origin** — reproduce verbatim, do not add `rel="noopener"`. It is the only link in the section.
- `img.sd-339` alt: `` (empty string, present) · `img.sd-350` alt: `Studio.Stovk`
- `.sd-347`, `.sd-353` and `span.image__bg-container` hold no text. No title, no placeholder, no other aria attribute.

## Responsive Behavior
- **Desktop (1440):** one 1392 px card. Meta row at the top (10 px sparkle in a 196 px rail, then two flex:1 cells at 448 px each, then a 196 px right-aligned cell), hero row with 198/210 px vertical padding holding a 196 px rail + 920 px centre (wordmark 321.95×40 + tagline 179.52 wide) + 196 px rail, and the 40 px arrow pinned bottom-right. Section height 600.28.
- **Tablet (768):** `@media (max-width: 1280px)` (`css/main.css` 4221–4229) sets `.sd-350 { height: 30px }` and restates flex:1 on `.sd-349`/`.sd-351`. `@media (max-width: 768px)` (4643–4675) then does the real work: `.sd-334 { bottom: 16px; right: 16px; width: 24px; height: 24px }` with `.sd-335`/`.sd-336 { font-size: 24px }` and `.sd-335 { translate: 0px 24px }`; `.sd-337 { flex-wrap: wrap }` with `--gap-v: 24px`; `.sd-338 { flex: 1 }`, `.sd-340`/`.sd-342 { flex: 1.7 }`, `.sd-344 { flex: 1 }`; `.sd-341`/`.sd-343 { font-size: 0.625rem }` = 10px; `.sd-346 { padding: 100px 0px 120px }`; `.sd-347`/`.sd-353 { flex: 1 }`, `.sd-348 { flex: 3.4 }`, `.sd-349`/`.sd-351 { flex: 1.7 }`; `.sd-350 { height: 24px }` (→ 189.48 px wide); `.sd-352 { font-size: 0.75rem }` = 12px / 15.6px. Card is 720×294.19, section height 398.19. Card margin/padding stay 24/16.
- **Mobile (390):** `@media (max-width: 480px)` (5090–5114) sets `.sd-332 { margin: 0px 8px; padding: 12px; max-width: calc(100% - 16px) }`; `.sd-334 { bottom: 12px; right: 12px }` — the same rule also declares `left: NaNpx; top: NaNpx`, invalid values the parser drops, so the used `left` computes to 338px from `right: 12px` + `width: 24px`; **reproduce with right/bottom, never with a literal left/top**; `.sd-337 { gap: 8px 16px; justify-content: space-between }` with `.sd-338`/`.sd-340`/`.sd-342`/`.sd-344 { flex: none; width: auto }`; `.sd-339 { width: 8px }`; `.sd-346 { padding: 80px 0px 64px }`; `.sd-347 { width: 16px }`; `.sd-348 { flex-direction: column; gap: 8px 24px; align-items: flex-start }`; `.sd-350 { flex: none; height: 32px }` (→ 221 px wide); `.sd-352 { color: #e0e0e0ff; font-size: 0.6875rem }` = 11px / 14.3px, letterSpacing −0.44px. Card is 374×247.59, section height 351.59; `padding-bottom: 104px` on `.sd-331` is unchanged.
- **≤360:** `@media (max-width: 360px)` (5497–5500) sets `.sd-344 { display: none }` (the STOCK.STUDIO.DESIGN cell disappears) and `.sd-346 { padding: 64px 0px }`. Not exercised at 390 — listed so the builder keeps the rule in the slice.
- **Breakpoints used:** `(max-width: 1280px)`, `(max-width: 768px)`, `(max-width: 480px)`, `(max-width: 360px)` — the only width media queries in `css/main.css` that touch `sd-331`…`sd-353`. Layout is otherwise fluid (%/flex only); the image variant switch is a `@container` query, not a width query.

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/stock-band.1440.json` (25 nodes, 21 style buckets)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/stock-band.768.json` (25 nodes, 22 buckets) · `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/stock-band.390.json` (25 nodes, 25 buckets — every cell resolves to a distinct width once `.sd-337` goes `space-between`)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/stock-band.states.json` — geometry and butt-join edges at all three widths, the 9 CSSOM pseudo-class hits, live before/after for the card hover at 1440 plus the 768 and 390 re-measurements and the restore check, reveal/toggle/animation refutations, class census, inline-style inventory, per-viewport resolved image variant with container rects, SVG natural/rendered sizes, codepoint audit, verbatim texts, and the 1440 `styleTable`/`nodes` mirrored from `stock-band.1440.json`.
- The four missing origin files are listed url → intended local path in the section's assets JSON alongside these; see Assets.

## QA Exclusions
**none.** No video, no canvas, no carousel, no autoplay, no live counter, no third-party embed, no reveal — the section is pixel-static from first paint once the background webp has decoded. Diff at the default 1.5 percent after scrolling it into view and waiting for the `.sd-333` background image to load. Two capture caveats, not exclusions: (1) the reference tiles were taken by scrolling a 900 px (844 px at 390) viewport, so the fixed `#header` pill overlays the top of each tile — crop that band, not a section rect; (2) until the four `aac6934b` webp variants are fetched the card is a flat `#121212` block and any diff against these references will fail on the photo area for that reason alone.
