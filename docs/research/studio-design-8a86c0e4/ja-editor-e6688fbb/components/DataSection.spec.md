# DataSection Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `main > .sd-303` (`div.box.sd-303`) · DOM order 10 of 13
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/DataSection.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/` → `data-1440.png` (scrollY 10262) + `data-1440-b.png` (scrollY 10627) · `data-768.png` (11132) + `data-768-b.png` (11288) · `data-390.png` (11818) + `data-390-b.png` (12591) · `data-1440-sticky-mid.png` (scrollY 10800, rail pinned at viewport top 104). All are viewport tiles at dpr 1 taken by scrolling, so the fixed `#header` pill overlays the top of each tile — crop that band when diffing. No hover/click state screenshot exists because there is no hover or click state (see States & Behaviors).
- **Interaction model:** scroll-driven — CSS `position: sticky` rail + 4 IntersectionObserver `appear` reveals. **No toggle, no hover effect, no click effect, no timer, no carousel, no video.**
- **Client component:** yes (only because the 4 `appear` reveals need an IntersectionObserver; the sticky rail is declarative CSS)
- **Root rect @1440:** x 0, y 10261.63, w 1440, h 1265.02 · **@768:** 0, 11131.80, 768, 1055.60 · **@390:** 0, 11818.02, 390, 1673.43
- **Sub-components:** `Appear` ×4 from `components/sites/studio-design-8a86c0e4/shared/appear.tsx`. No further split — 21 elements, one flat `<ul>` of 4 cards.
- **Non-DOM content:** none. No `<video>`, no canvas, no Lottie, no iframe. No element uses the `image` / `image__bg-container` custom-property background machinery — all four pictures are plain `<img>`; the only custom-property background in the section is `.sd-320`'s `--g-*` gradient (see below).
- **TOGGLE VERDICT — refuted:** `document.querySelector('main > .sd-303').querySelectorAll('[data-toggle-trigger]').length === 0` at 1440, 768 and 390 (`extract/data.states.json` → `toggles`). The `page.html` markup for this section contains no `data-toggle-trigger`, no `data-toggle-content`, no `aria-expanded` and no `<button>`. The page-wide count of 15 is fully accounted for by header (5) + `dialog.modal-ja_menu` (5) + footer (5). **`SdToggle` is NOT needed here.**
- **CSS slice command:** `node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs sd-303..330 --out app/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/data.css` — token **`sd-303..330`** only (55 rules, 10727 bytes). Verified by a live class census at all three viewports (`extract/data.states.json` → `classCensus`): the complete rendered class set is `box`, `text`, `img`, `sd-303`…`sd-330`, `theme-969c5ae1`, `theme-a3931427`, `theme-c1a9a55a`, `theme-cb8ba68c`, `theme-f799e4ef`. `box`/`text`/`img` and all five `theme-*` classes are already in `app/studio-base.css`; **no `list-*` or other out-of-range token is rendered here.** Custom properties the slice references — `--s-color-56baa902` `#f7f7f7`, `--s-color-a99509da` `#e0e0e0ff`, `--s-color-36ba82f0` `#555555ff`, `--s-color-99a91143` `#222222ff`, `--s-color-06b63738` `rgb(255,255,255)`, `--s-color-f0be55c6` `#707070ff`, `--s-font-5489e031` `Inter,'Noto Sans JP'` — are all defined in `app/studio-base.css`. Keep origin class names verbatim.

## DOM Structure
```
div.box.sd-303                                     section, bg #f7f7f7, padding 0, centred column
  div.box.sd-304                                   border-top 1px #e0e0e0, margin 0 24px, padding 96px 0, row, wrap, gap 24
    div.box.sd-305                                 STICKY rail, top 104px, z 1, w 212, gap 8
      h2.text.sd-306.theme-cb8ba68c                "Data"
      p.text.sd-307.theme-969c5ae1                 2 lines split by <br>
    div.box.sd-308                                 flex:1, column, gap 24
      ul.box.sd-309                                row, wrap, gap 24 (16 ≤1280)
        li.box.sd-310.appear   60% wide · bg #ffffff · radius 4 · overflow hidden · padding 40 40 0 · gap 40
          div.box.sd-311 > h3.sd-312(theme-f799e4ef) + p.sd-313(<br>)
          img.img.sd-314                           radius 4px 0 0 0, margin-right -40, w calc(100% + 40px)
          + <noscript> duplicate (never painted)
        li.box.sd-315.appear   40% wide · bg #ffffff
          div.box.sd-316 > h3.sd-317 + p.sd-318 (no <br>)
          img.img.sd-319 + <noscript>
          div.box.sd-320                           ABSOLUTE overlay, inset left/right 0, bottom 0, h 104, z 1, white→transparent gradient
        li.box.sd-321.appear   50% wide · bg #ffffff
          div.box.sd-322 > h3.sd-323 + p.sd-324(<br>)
          img.img.sd-325 + <noscript>
        li.box.sd-326.appear   50% wide · bg #ffffff
          div.box.sd-327 > h3.sd-328 + p.sd-329(<br>)
          img.img.sd-330 + <noscript>
```
The four `<noscript>` blocks are inert with JS enabled — do not render them. `.sd-320` is the only absolutely-positioned element; it is the last child of `li.sd-315` and fades the bottom 104px of the フィルタリング screenshot to white. All four cards are white — unlike CollaborationSection there is no dark or blue card here.

## Computed Styles (from getComputedStyle @1440 dpr 1, exact)
### `.sd-303` (S1)
- display: flex · position: relative · width: 1440px · height: 1265.02px · maxWidth: 100% · flexDirection: column · alignItems: center · justifyContent: center · padding: 0px · backgroundColor: rgb(247, 247, 247) · transitionDuration: 0.3s · transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1)
### `.sd-304` (S2)
- width: 1392px (declared 1920px, maxWidth calc(100% - 48px)) · height: 1265.02px · rowGap: 24px · columnGap: 24px · margin: 0px 24px · padding: 96px 0px · flexDirection: row · flexWrap: wrap · alignItems: flex-start · borderTop: 1px solid rgb(224, 224, 224) · other three borders 0px
### `.sd-305` (sticky rail, S3) — rect [24, 97, 212, 93.59] section-relative
- position: sticky · top: 104px · zIndex: 1 · width: 212px · height: 93.5938px · rowGap: 8px · padding: 0px · flexDirection: column · alignItems: flex-start · backgroundColor: rgba(0, 0, 0, 0)
### `.sd-306` "Data" (S4, theme-cb8ba68c)
- fontFamily: Inter, "Noto Sans JP" · fontSize: 34px · lineHeight: 40.8px · fontWeight: 600 · letterSpacing: -1.36px · color: rgb(34, 34, 34) · fontFeatureSettings: normal · rect 70.33×40.8
### `.sd-307` (S5, theme-969c5ae1)
- fontSize: 16px · lineHeight: 22.4px · fontWeight: 400 · letterSpacing: normal · color: rgb(85, 85, 85) · fontFeatureSettings: "palt" · rect 206.91×44.8
### `.sd-308` / `.sd-309`
- both width: 1156px · height: 1072.02px · rowGap: 24px · columnGap: 24px · flexBasis: 0% (flex:1) · `.sd-308` flexDirection column, `.sd-309` is the `<ul>`: row + wrap, alignItems stretch, minWidth 0 · `.sd-309 > *` sets `--gap-h: 24px` / `--gap-v: 24px`
### Cards `.sd-310` / `.sd-315` / `.sd-321` / `.sd-326` (style S-card)
- rowGap: 40px · columnGap: 40px · padding: 40px 40px 0px · borderRadius: 4px · flex: none · flexDirection: column · alignItems: flex-start · overflow: hidden · backgroundColor: **rgb(255, 255, 255) for all four**
- widths: `.sd-310` `calc(60% - (var(--gap-h) * 0.4))` = 684px · `.sd-315` `calc(40% - (var(--gap-h) * 0.6))` = 448px · `.sd-321` and `.sd-326` `calc(50% - (var(--gap-h) * 0.5))` = 566px
- heights: `.sd-310` / `.sd-315` 522.891px · `.sd-321` / `.sd-326` 525.133px
- rects: [260, 97, 684, 522.89] · [968, 97, 448, 522.89] · [260, 644, 566, 525.13] · [850, 644, 566, 525.13]
### Copy blocks `.sd-311` / `.sd-316` / `.sd-322` / `.sd-327`
- rowGap: 16px · columnGap: 16px · padding: 0px · flexDirection: column · flexBasis: 0% (flex:1) · minWidth: 0
- widths 372.68 / 368 / 301.891 / 486 · heights 103.188 / 104.938 / 105.867 / 127.781
### Heading `.sd-312` (theme-**f799e4ef** — the one heading that differs)
- fontSize: 30px · lineHeight: 36px · fontWeight: 600 · letterSpacing: -1.2px · fontFeatureSettings: normal · color: rgb(34, 34, 34) · width 100% of the copy block
### Headings `.sd-317` / `.sd-323` / `.sd-328` (theme-c1a9a55a)
- fontSize: 28px · lineHeight: 35px · fontWeight: 600 · letterSpacing: normal · fontFeatureSettings: "palt" · color: rgb(34, 34, 34) · width 100%
### Body copy `.sd-313` / `.sd-318` / `.sd-324` / `.sd-329` (theme-a3931427)
- fontSize: 16px · lineHeight: 25.6px · fontWeight: 400 · fontFeatureSettings: "palt" · color: rgb(112, 112, 112) · heights 51.19 / 51.19 / 51.19 / 76.78
### Card images `.sd-314` / `.sd-319` / `.sd-325` / `.sd-330`
- borderRadius: 4px 0px 0px 0px · height: auto · objectFit: fill · margin: 0px -40px 0px 0px · declared width 1288px with maxWidth calc(100% + 40px) · overflowX: clip
- aspectRatio / rect: `.sd-314` `auto 1932 / 1020` → [300, 280, 644, 339.70] · `.sd-319` `auto 816 / 676` → [1008, 282, 408, 337.95] · `.sd-325` `auto 1578 / 1020` → [300, 830, 526, 339.27] · `.sd-330` `auto 2104 / 1272` → [890, 852, 526, 317.35]
### `.sd-320` (gradient overlay, S15) — rect [968, 516, 448, 104] section-relative
- position: absolute · left: 0px · right: 0px · bottom: 0px · width: 448px · height: 104px · zIndex: 1 · flexDirection: column · alignItems: center
- backgroundImage: `linear-gradient(0deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)` — built from `--g-angle: 0deg`, `--g-color-0: #ffffffff`, `--g-position-0: 0%`, `--g-color-1: #ffffff00`, `--g-position-1: 100%`
- The origin rule also declares `top: NaNpx`, an invalid value the parser drops; the used `top` computes to 418.891px from `bottom: 0` + `height: 104px`. Reproduce with `bottom: 0`, never with a literal top.

## States & Behaviors
### Sticky rail `.sd-305` (desktop only, > 1280px)
- **Trigger:** native CSS `position: sticky; top: 104px` inside `.sd-304`. No JS, no class flip, no scroll listener.
- **Thresholds @1440 (page coords):** rail rests at page top 10358.63; **sticks at scrollY 10255** (last unstuck sample 10254 → viewport top 104.63; 10255 → 104.00); **releases at scrollY 11234** (11233 → viewport top 104.00; 11234 → 103.06), after which it parks at page top 11337.06 = `.sd-304` content bottom 11430.66 − rail height 93.59.
- **State A (before/after stick) and State B (while stuck) are identical:** backgroundColor rgba(0, 0, 0, 0); opacity 1; boxShadow none; width 212px; zIndex 1; position sticky; top 104px. **Nothing changes visually while stuck** — 19 scroll samples spanning scrollY 9862→11662 produced exactly one distinct style tuple.
- **Transition:** none applies — no animatable property changes.
- **Evidence:** `extract/data.states.json` → `sticky.1440` (19 instant-scroll samples, 21 one-pixel stick-boundary probes, 7 release probes, `computedWhileStuck_uniqueTuples` length 1). Screenshot `data-1440-sticky-mid.png`.
- **Implementation approach:** CSS only — the sliced `.sd-root .sd-305 { position: sticky; top: 104px }` already does it. Do not add a scroll handler.
### Reveal `appear` ×4 (`.sd-310`, `.sd-315`, `.sd-321`, `.sd-326`)
- **Trigger:** IntersectionObserver in the Studio runtime, one observer per element; they fire per row (measured: `sd-310` + `sd-315` together at t=5910 ms, `sd-321` + `sd-326` together at t=6511 ms of the same scroll run). The runtime adds `appear-active` for **one frame (6.6 ms measured on `sd-310`, 7.0 on `sd-315`, 6.3 on `sd-321`, 6.5 on `sd-326`)** and then removes both `appear` and `appear-active`, leaving the empty attributes `data-appear` and `data-inited-appear`. **`appear-active` is inert here** — the only `.appear-active` rule in `css/main.css` is `.modal-ja_menu__sd-7.appear-active` (line 2143), which belongs to the mobile menu.
- **State A (hidden):** opacity: 0; translate: 0px 16px. **State B (shown):** opacity: 1; translate: none.
- **Transition:** transition-delay 400ms; transition-duration 800ms; transition-timing-function cubic-bezier(0.2, 1, 1, 1). **Identical for all four — no per-card stagger.** Source rules: `css/main.css` lines 3212 / 3222 / 3233 / 3243.
- **Post-reveal the elements fall back to the site-wide base transition:** transitionDuration 0.3s; transitionDelay 0s; transitionTimingFunction cubic-bezier(0.4, 0.4, 0, 1).
- **Evidence:** a MutationObserver on `class` inside the section recorded all 12 class flips with `element.getAnimations()` at the moment of each flip — `extract/data.states.json` → `reveal.1440.measured` (and `reveal.768.measured`, 12 identical entries), e.g. `{"k":"sd-310","cls":"box sd-310 appear-active","anims":[{"tn":"opacity","dur":800,"del":400,"ease":"cubic-bezier(0.2, 1, 1, 1)"},{"tn":"translate","dur":800,"del":400,"ease":"cubic-bezier(0.2, 1, 1, 1)"}]}`. Pre-reveal computed styles for all four are in `reveal.1440.preRevealComputed`. The `@media` blocks only override `--gap-v` on `.sd-3NN.appear > *` (32px ≤768, 24px ≤480); opacity, translate, duration, delay and easing are never overridden.
- **Implementation approach:** `Appear` from `shared/appear.tsx` with `as="li"`, `activeClass={false}`, `once` default.
### Hover / focus / click states
**N/A — no hover, focus or click effect anywhere in this section.**
- `__cloneSnap.rules('main > .sd-303')` returned **0 hits, total 0** — no `:hover`, `:focus` or `:active` rule in the whole origin stylesheet targets any class this section renders (confirmed by grep over `css/main.css`: zero matches for `.sd-30x`…`.sd-330` followed by a pseudo-class).
- @1440, after a 2500 ms settle: 14 hover probes and 14 click probes at scrollY 10562 plus 7 + 7 at scrollY 10962 (`.sd-305` `.sd-306` `.sd-307` `.sd-310` `.sd-311` `.sd-312` `.sd-313` `.sd-314` `.sd-315` `.sd-317` `.sd-319` `.sd-320` `.sd-321` `.sd-323` `.sd-325` `.sd-326` `.sd-328` `.sd-330`, cursor driven with `mouse.move`/`mouse.click` to explicit coordinates) changed **0 properties** across all 21 elements.
- @768: 18 hover probes → 0 changes. @390: 12 hover probes → 0 changes. All in `extract/data.states.json` → `hoverClickProbes`.
- A first, discarded 1440 run reported 448 "changes"; inspection showed every probe reporting the identical pair `opacity 0.980896 → 1` and `translate 0px 0.305668px → none` on `.sd-310`/`.sd-315` — the reveal transition still settling when the baseline was captured, not a hover response. Hence the 2500 ms settle in the recorded run.
- `__cloneSnap.animations('main > .sd-303')` returned `{"count": 0, "items": []}`. No `@keyframes` exist on the page.
- **No `theme-*` rule beats an `.sd-NN` rule here.** The five `theme-*` classes supply only font-family / font-size / weight / line-height / letter-spacing / font-feature-settings; the `.sd-NN` rules supply only colour, width, height, text-align and layout. They never collide. The effective heading sizes come from the theme classes: `.text.theme-f799e4ef { font-size: 1.875rem }` = 30px (`.sd-312`), `.text.theme-c1a9a55a { font-size: 1.75rem }` = 28px, `.text.theme-cb8ba68c { font-size: 2.125rem }` = 34px, `.text.theme-a3931427` and `.text.theme-969c5ae1` `{ font-size: 1rem }` = 16px.
- No element carries a non-empty inline `style` attribute after reveal (the four reveal targets keep an empty `style=""`; every other element has none).

## Per-State Content
N/A — single state.

## Assets
All four are plain `<img>` with `objectFit: fill` and no `srcset`; the Studio runtime swaps `data-sd-img-src` into `src`, picking a `_small` / `_middle` variant by rendered width (measured per viewport in `extract/data.states.json` → `imageVariantsByViewport`).
- `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1932x1020_v-frms_webp_c0281a1c-b889-4aca-b73b-ccf52f491bac_middle.webp` — `.sd-314` (CMS), 644×339.70 @1440, natural 1200×633
- `public/sites/.../images/s-816x676_v-fs_webp_a7dbb1fb-f0d5-4a40-abd4-10113626e95e_small.webp` — `.sd-319` (フィルタリング), 408×337.95 @1440, natural 600×497
- `public/sites/.../images/s-1578x1020_v-fms_webp_0b30e50c-53f2-43bc-b03c-b32f3ad32e02_small.webp` — `.sd-325` (API連携), 526×339.27 @1440, natural 600×387
- `public/sites/.../images/s-2104x1272_v-frms_webp_f4b96e9c-542d-4a4c-a8f7-0ee288812458_small.webp` — `.sd-330` (フォーム), 526×317.35 @1440, natural 600×362
- Icons: none. Video: none. Background-image machinery (`image` / `image__bg-container` / `--img-*`): **not used in this section.** The only background-image is `.sd-320`'s `--g-*` linear gradient.
- Layered composition: the only overlap is `.sd-320` over `.sd-319` inside `li.sd-315`; each card's image also bleeds 40px past the card's right padding (`margin-right: -40px`, `max-width: calc(100% + 40px)`) and is clipped by the card's `overflow: hidden`.
- MISSING: the `_small` variant of `.sd-314` — `extract/data.assets.json` lists `images/s-1932x1020_v-frms_webp_c0281a1c-b889-4aca-b73b-ccf52f491bac_small.webp`. Only `_middle` is in `assets.manifest.json`, but at 768 (401.59px) and 390 (318px) the runtime loads `_small`, so the builder needs both files for the responsive diffs to match.

## Text Content (verbatim)
Verified byte-exactly against the live DOM: **no** U+00A0, no U+2028, no U+200B, no U+FEFF and no character in U+2000–U+20FF anywhere in this section (`extract/data.states.json` → `codepointAudit`). The full-width punctuation used is U+FF1A `：`, U+3001 `、`, U+3002 `。`, U+300C/U+300D `「」`, all CJK-block.
- `h2.sd-306`: `Data`
- `p.sd-307`: `コンテンツを束ね、<br>柔軟に活用できるデータ管理。`
- `h3.sd-312`: `CMS` · `p.sd-313`: `コンテンツを一箇所でまとめて管理。<br>ブログやニュース、制作実績などをCMSで簡単に更新。`
- `h3.sd-317`: `フィルタリング` · `p.sd-318`: `CMSで登録したデータをもとに、カテゴリやタグなどの条件で動的に絞り込み表示ができます。` (no `<br>`)
- `h3.sd-323`: `API連携` · `p.sd-324`: `外部サービスとのデータ連携を可能に。<br>Studioサイトにリアルタイムで反映できます。`
- `h3.sd-328`: `フォーム` · `p.sd-329`: `Studio上で簡単にフォームを作成・管理。<br>問い合わせ、イベント申し込み、資料請求など、目的に合わせて柔軟にカスタマイズできます。`
- `img.sd-314` alt: `サンプル画像：記事一覧画面の上に、記事詳細画面が重なって配置されている。一覧画面には複数の記事が並び、各記事のステータスやタイトルを確認できる。詳細画面には記事のタイトル・本文とその上にオレンジ色と青色の矢印が重なって表示され、編集中であることを示している。`
- `img.sd-319` alt: `サンプル画像：灰色のパネル上で、絞り込み設定を行う様子。上段は「Tags:」の横に選択中のタグ「Branding Dynamic」が横並びで表示されている。その下に「Web Design」「Marketing」「Development」「DX」などのタグが縦積みで並ぶ。`
- `img.sd-325` alt: `サンプル画像：白とグレーの格子柄の背景に、外部ツールを示す複数の正方形が並ぶ。それぞれの正方形の中央にはNotion、Airtableなどのロゴが配置されている。`
- `img.sd-330` alt: `サンプル画像：画面の左側にはフォームを構成する複数のパーツが並ぶ追加パネルが、右側には制作中のフォームが配置されている。中央には青枠で囲まれたパーツ「input」と手のアイコンが重なって表示されており、追加パネルから編集中のフォームへ、項目をドラッグして追加する様子を示している。`
- No links, no buttons, no aria-label, no title, no placeholder, no `<br>` in `.sd-318`.

## Responsive Behavior
- **Desktop (1440):** 2 rows inside a 1392px band. Row 1 = `.sd-310` 684px + `.sd-315` 448px (60/40); row 2 = `.sd-321` 566px + `.sd-326` 566px (50/50); gaps 24px. Rail `.sd-305` is 212px wide, sticky at top 104px, left of `.sd-308` (1156px). `.sd-304` padding 96px 0. Section height 1265.02.
- **Tablet (768):** the rail becomes a full-width band above the list — `@media (max-width: 1280px) .sd-305 { position: relative; top: auto; left: auto; right: auto; bottom: auto; width: 100%; max-width: 100% }` (`css/main.css` line 4214) plus `.sd-309 { gap: 16px }` (line 4216); 19 scroll samples confirm `position: relative` and a rail that never pins. Then `@media (max-width: 768px)` (lines 4611–4636): card padding 40px 40px 0 → `24px 24px 0px` and card gap 40 → 32; copy-block gap 16 → 12; all four images margin-right −40 → −24 with maxWidth `calc(100% + 24px)`. The 60/40 and 50/50 splits survive — rail band 720×93.59 at y 97, `.sd-310` 425.59, `.sd-315` 278.40, `.sd-321` 352, `.sd-326` 352. Type drops via the theme classes in the same block: `.text.theme-c1a9a55a` → 1.25rem = 20px/25px (line 1372), `.text.theme-a3931427` → 0.875rem = 14px/22.4px (line 1373), `.text.theme-f799e4ef` → 1.25rem = 20px/24px, letterSpacing −0.8px (line 1374). `.sd-306` stays 34px, `.sd-307` stays 16px. `.sd-320` is 278.40×104. Section top 11131.80, height 1055.60.
- **Mobile (390):** single column — `@media (max-width: 480px)` (lines 5060–5074) sets `flex: none; width: 100%; max-width: 100%` and `gap: 24px` on `.sd-310`, `.sd-315`, `.sd-321`, `.sd-326`, so all four cards are 342px wide and stack; `.sd-304` padding 96px 0 → `64px 0px`; `.sd-320` height 104 → 64. Card padding stays `24px 24px 0px` (inherited from the ≤768 block). `.sd-306` drops to 24px / lineHeight 28.8px / letterSpacing −0.96px (`.text.theme-cb8ba68c { font-size: 1.5rem }`, line 1413); `.sd-307` stays 16px/22.4px. All four images are 318px wide. Rail is a 342×81.59 band at y 65. Section top 11818.02, height 1673.43.
- **Breakpoints used:** `(max-width: 1280px)`, `(max-width: 768px)`, `(max-width: 480px)` — the only width media queries in `css/main.css` that touch this section. The `(max-width: 360px)` block (lines 5410+) contains **no** rule for `.sd-303`…`.sd-330`.

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/data.1440.json` (21 nodes, 20 style buckets)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/data.768.json` (21 nodes) · `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/data.390.json` (21 nodes)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/data.states.json` (sticky samples + stick/release boundary probes at 1440 and relative-position samples at 768/390, reveal MutationObserver logs at 1440 and 768 with per-element timing, hover and click probes at all three widths, CSSOM pseudo rules, animations, toggle count, per-viewport image variants, class census, inline-style and data-attribute inventory, codepoint audit; plus the 1440 styleTable/nodes mirrored from data.1440.json and `textElementComputed` for the eight leaf text elements at all three widths)
- One missing origin file is listed in the section's assets JSON alongside these (url → intended local path); see Assets.
- Note: `__cloneExtract` emits 21 nodes and omits the eight leaf text elements `.sd-312` `.sd-313` `.sd-317` `.sd-318` `.sd-323` `.sd-324` `.sd-328` `.sd-329`; their computed styles at all three widths were measured separately and are folded into this spec's Computed Styles and Responsive sections.

## QA Exclusions
**none.** The section has no video, no canvas, no autoplaying carousel, no live counter and no third-party embed — every pixel is static once the four `appear` reveals have settled. Diff at the default 1.5 percent, after scrolling the section fully into view and waiting ≥ 1200 ms (reveal = 400 ms delay + 800 ms duration). One capture caveat, not an exclusion: the reference tiles were taken by scrolling a 900px viewport, so the fixed `#header` pill overlays the top 110px of each tile — crop that band, not a section rect.
