# CollaborationSection Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `main > .sd-271` (`div.box.sd-271`) · DOM order 9 of 13
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/CollaborationSection.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/` → `collaboration-1440.png` + `-1440-b.png` · `collaboration-768.png` + `-768-b.png` · `collaboration-390.png` + `-390-b.png` · `collaboration-1440-sticky-mid.png` (scrollY 9600, rail pinned at viewport top 104) · `collaboration-768-hover-sd298.png` (cursor at 382,322 over `.sd-298` — pixel-identical to `-768-b`). All are viewport tiles at dpr 1 taken by scrolling, so the fixed `#header` overlays the top of each tile — crop it out when diffing.
- **Interaction model:** scroll-driven — CSS `position: sticky` rail + 9 IntersectionObserver `appear` reveals. **No hover effect, no click, no timer, no carousel, no toggle, no video.**
- **Client component:** yes (only because the 9 `appear` reveals need an IntersectionObserver; the sticky rail is declarative CSS)
- **Root rect @1440:** x 0, y 8993.68, w 1440, h 1267.95 · **@768:** 0, 10013.77, 768, 1118.03 · **@390:** 0, 10153.43, 390, 1664.59
- **Sub-components:** `Appear` ×9 from `components/sites/studio-design-8a86c0e4/shared/appear.tsx`. No further split — the section is 35 elements and one flat `<ul>`.
- **Non-DOM content:** none. No `<video>`, no canvas, no Lottie, no iframe. No element uses the `image` / `image__bg-container` custom-property background machinery — every picture is a plain `<img>`.
- **CSS slice command:** `node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs sd-271..302 --out app/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/collaboration.css` — token **`sd-271..302`** only (70 rules, 14384 bytes). Verified by a live class census of every element in the section (`extract/collaboration.states.json` → `classCensus`): the complete rendered class set is `box`, `text`, `img`, `sd-271`…`sd-302`, `theme-969c5ae1`, `theme-a3931427`, `theme-c1a9a55a`, `theme-cb8ba68c`. All four `theme-*` classes and `box`/`text`/`img` are already in `app/studio-base.css`; **no `list-*` or other out-of-range token appears here.** The custom properties the slice references (`--s-color-56baa902` `#f7f7f7`, `--s-color-a99509da` `#e0e0e0ff`, `--s-color-36ba82f0` `#555555ff`, `--s-color-99a91143` `#222222ff`, `--s-color-39850792` `#eaeaeaff`, `--s-color-06b63738` `rgb(255,255,255)`, `--s-color-f0be55c6` `#707070ff`, `--s-font-5489e031`) are all defined in `app/studio-base.css`. Keep origin class names verbatim.

## DOM Structure
```
div.box.sd-271                                    section, bg #f7f7f7, padding 0, centred column
  div.box.sd-272                                  border-top 1px #e0e0e0, margin 0 24px, padding 96px 0, row, wrap, gap 24
    div.box.sd-273                                STICKY rail, top 104px, z 1, w 215, gap 8
      h2.text.sd-274.theme-cb8ba68c               "Collaboration"
      p.text.sd-275.theme-969c5ae1                2 lines split by <br>
    div.box.sd-276                                flex:1, column, gap 24
      ul.box.sd-277                               row, wrap, gap 24 (16 ≤1280)
        li.box.sd-278.appear   60% wide · bg #222222 (dark card) · radius 4 · overflow hidden · padding 40 40 0 · gap 40
          div.box.sd-279 > h3.sd-280 + p.sd-281(<br>)
          img.img.sd-282                          radius 4px 0 0 0, margin-right -40, w calc(100% + 40px)
          + <noscript> duplicate (never painted)
        li.box.sd-283.appear   40% wide · bg #ffffff
          div.box.sd-284 > h3.sd-285 + p.sd-286
          img.img.sd-287 + <noscript>
        li.box.sd-288.appear   40% wide · bg #0d68db (blue card)
          div.box.sd-289 > h3.sd-290 + p.sd-291
          img.img.sd-292 + <noscript>
        li.box.sd-293.appear   60% wide · bg #ffffff
          div.box.sd-294 > h3.sd-295 + p.sd-296(<br>)
          div.box.sd-297                          row, gap 0, margin 0 -40px -168px 0, w calc(100% + 40px)
            img.img.sd-298.appear   z 4, margin-top 72, margin-right -324   + <noscript>
            img.img.sd-299.appear   z 3, margin-top 54, margin-right -324   + <noscript>
            img.img.sd-300.appear   z 2, margin-top 36, margin-right -324   + <noscript>
            img.img.sd-301.appear   z 1, margin-top 18, margin-right -324   + <noscript>
            img.img.sd-302.appear   z auto, margin-top 0, margin-right -324 + <noscript>
```
The eight `<noscript>` blocks are inert with JS enabled — do not render them. `.sd-297` is a plain in-flow row whose five children overlap through `margin-right: -324px`; the stack reads left→right with `sd-298` on top (z 4) and `sd-302` at the bottom of the paint order, and `li.sd-293`'s `overflow: hidden` clips the right overflow.

## Computed Styles (from getComputedStyle @1440 dpr 1, exact)
### `.sd-271` (S1)
- display: flex · position: relative · width: 1440px · height: 1267.95px · maxWidth: 100% · flexDirection: column · alignItems: center · justifyContent: center · padding: 0px · backgroundColor: rgb(247, 247, 247) · transitionDuration: 0.3s · transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1)
### `.sd-272` (S2)
- width: 1392px (declared 1920px, maxWidth calc(100% - 48px)) · height: 1267.95px · rowGap: 24px · columnGap: 24px · margin: 0px 24px · padding: 96px 0px · flexDirection: row · flexWrap: wrap · alignItems: flex-start · borderTop: 1px solid rgb(224, 224, 224) · other three borders 0px
### `.sd-273` (sticky rail, S3) — rect [24, 97, 215, 93.59] section-relative
- position: sticky · top: 104px · zIndex: 1 · width: 215px · height: 93.5938px · rowGap: 8px · padding: 0px · flexDirection: column · alignItems: flex-start · backgroundColor: rgba(0, 0, 0, 0)
### `.sd-274` "Collaboration" (S4)
- fontFamily: Inter, "Noto Sans JP" · fontSize: 34px · lineHeight: 40.8px · fontWeight: 600 · letterSpacing: -1.36px · color: rgb(34, 34, 34)
### `.sd-275` (S5)
- fontSize: 16px · lineHeight: 22.4px · fontWeight: 400 · color: rgb(85, 85, 85) · fontFeatureSettings: "palt"
- The slice declares `font-size: 0.94rem` nowhere for this node; `.text.theme-969c5ae1 { font-size: 1rem }` in `app/studio-base.css` is what yields 16px.
### `.sd-276` / `.sd-277`
- both width: 1153px · height: 1074.95px · rowGap: 24px · columnGap: 24px · flexBasis: 0% (flex:1) · sd-276 flexDirection column, sd-277 is the `<ul>`: row + wrap, alignItems stretch, minWidth 0
### Cards `.sd-278` / `.sd-283` / `.sd-288` / `.sd-293` (style S-card)
- rowGap: 40px · columnGap: 40px · padding: 40px 40px 0px · borderRadius: 4px · flex: none · flexDirection: column · alignItems: flex-start · overflow: hidden
- widths: `.sd-278` and `.sd-293` `calc(60% - (var(--gap-h) * 0.4))` = 682.195px · `.sd-283` and `.sd-288` `calc(40% - (var(--gap-h) * 0.6))` = 446.797px
- backgroundColor: `.sd-278` rgb(34, 34, 34) · `.sd-283` rgb(255, 255, 255) · `.sd-288` rgb(13, 104, 219) · `.sd-293` rgb(255, 255, 255)
- heights: sd-278 / sd-283 519.875px · sd-288 / sd-293 531.078px · `--gap-h: 24px` / `--gap-v: 24px` set on `.sd-277 > *`
### Copy blocks `.sd-279` / `.sd-284` / `.sd-289` / `.sd-294`
- rowGap: 16px · columnGap: 16px · padding: 0px · flexDirection: column · flexBasis: 0% (flex:1) · minWidth: 0 · heights 102.188px (279/284/294) and 114.117px (289)
### Headings `.sd-280` / `.sd-285` / `.sd-290` / `.sd-295` (theme-c1a9a55a)
- fontSize: 28px · lineHeight: 35px · fontWeight: 600 · width: 100% of the copy block · fontFeatureSettings: "palt"
- color: `.sd-280` rgb(247, 247, 247) · `.sd-285` rgb(34, 34, 34) · `.sd-290` rgb(255, 255, 255) · `.sd-295` rgb(34, 34, 34)
### Body copy `.sd-281` / `.sd-286` / `.sd-291` / `.sd-296` (theme-a3931427)
- fontSize: 16px · lineHeight: 25.6px · fontWeight: 400 · fontFeatureSettings: "palt"
- color: `.sd-281` rgb(234, 234, 234) · `.sd-286` rgb(112, 112, 112) · `.sd-291` rgb(247, 247, 247) · `.sd-296` rgb(112, 112, 112)
### Card images `.sd-282` / `.sd-287` / `.sd-292`
- borderRadius: 4px 0px 0px 0px · height: auto · objectFit: fill · margin: 0px -40px 0px 0px · width: 1288px with maxWidth calc(100% + 40px)
- `.sd-282` aspectRatio auto 1288 / 678 → rect [303, 279, 642.195, 337.688] · `.sd-287` aspectRatio auto 1632 / 1356 → rect [1009, 279, 406.797, 337.641] · `.sd-292` aspectRatio auto 816 / 676 → rect [303, 835, 406.797, 336.961]
### `.sd-297` (image rail, S30) — rect [774, 823, 642.195, 516.891]
- flexDirection: row · gap: 0px · alignItems: flex-start · margin: 0px -40px -168px 0px · width: calc(100% + 40px) · backgroundColor: rgba(0, 0, 0, 0)
### `.sd-298` … `.sd-302` (stacked screenshots)
- width / maxWidth `calc(20% + 324px - (var(--gap-h) * 0.8))` = 452.438px · marginRight: -324px · objectFit: fill · scale: 1 · height auto
- marginTop: 72px / 54px / 36px / 18px / 0px · zIndex: 4 / 3 / 2 / 1 / auto
- **base transition (not the reveal one): transitionDuration 0.8s · transitionTimingFunction cubic-bezier(0, 1, 0.56, 1) · transitionDelay 0ms** — declared on `.sd-298`…`.sd-302` themselves and overriding the site-wide `all .3s cubic-bezier(.4,.4,0,1)`
- aspectRatio: `auto 865 / 852` (298, 299, 301) · `auto 864 / 851` (300) · `auto 764 / 802` (302) → heights 444.891px ×4 and 475.414px
- rects: [774, 895, 452.44, 444.89] / [902.23, 877, …] / [1030.67, 859, …] / [1159.11, 841, …] / [1287.55, 823, 452.44, 475.41]

## States & Behaviors
### Sticky rail `.sd-273` (desktop only)
- **Trigger:** native CSS `position: sticky; top: 104px` inside `.sd-272`. No JS, no class flip, no scroll listener.
- **Thresholds @1440 (page coords):** rail rests at page top 9090.68; sticks at **scrollY 8986.68**; releases at **scrollY 9968.04**, after which it parks at page top 10072.04 (= `.sd-272` content bottom 10165.63 − rail height 93.59).
- **State A (before/after stick) and State B (while stuck) are identical:** backgroundColor rgba(0, 0, 0, 0); opacity 1; boxShadow none; width 215px; zIndex 1. **Nothing changes visually while stuck.**
- **Transition:** none applies — no animatable property changes.
- **Evidence:** 23 instant-scroll samples in `extract/collaboration.states.json` → `sticky.sample1440` + `sticky.boundary1440` (scrollY 8985 → railViewportTop 105.68 · 8986 → 104.68 · 8987 → 104 · 9600 → 104 · 9968 → 104 · 9969 → 103.04 · 10400 → −327.96).
- **Implementation approach:** CSS only — the sliced `.sd-root .sd-273 { position: sticky; top: 104px }` already does it. Do not add a scroll handler.
### Reveal `appear` ×9 (`.sd-278`, `.sd-283`, `.sd-288`, `.sd-293`, `.sd-298`…`.sd-302`)
- **Trigger:** IntersectionObserver in the Studio runtime, one observer per element (they fire independently — measured order 278+283 → 288+293+301+302 → 300 → 298+299). The runtime adds `appear-active` for **one frame (6 ms measured)** and then removes both `appear` and `appear-active`, leaving the empty attributes `data-appear` and `data-inited-appear`. **`appear-active` is inert here** — the only `.appear-active` rule in `css/main.css` is `.modal-ja_menu__sd-7.appear-active` (line 2143), which belongs to the mobile menu.
- **Cards `.sd-278` / `.sd-283` / `.sd-288` / `.sd-293`** — State A (hidden): opacity: 0; translate: 0px 16px. State B (shown): opacity: 1; translate: none. Transition: transition-delay 400ms; transition-duration 800ms; transition-timing-function cubic-bezier(0.2, 1, 1, 1).
- **Images `.sd-298`…`.sd-302`** — State A (hidden): opacity: 0; translate: 0px 32px; scale: 1. State B (shown): opacity: 1; translate: none; scale: 1. Transition: transition-duration 1000ms; transition-timing-function cubic-bezier(0, 1, 0.56, 1); transition-delay **700ms (sd-298) / 600ms (sd-299) / 500ms (sd-300) / 400ms (sd-301) / 300ms (sd-302)** — the rightmost card lands first and the stack cascades right→left.
- **Evidence:** a MutationObserver on `class` inside the section recorded every flip with `element.getAnimations()` at the moment of the flip — 18 entries in `extract/collaboration.states.json` → `reveal.measured`, e.g. `{"k":"sd-298","cls":"img sd-298 appear-active","anims":[{"tn":"opacity","dur":1000,"del":700,"ease":"cubic-bezier(0, 1, 0.56, 1)"},{"tn":"translate","dur":1000,"del":700,"ease":"cubic-bezier(0, 1, 0.56, 1)"}]}`. Pre-reveal computed styles for all nine are in `reveal.preRevealComputed`. Source rules: `css/main.css` lines 3146 / 3156 / 3166 / 3176 (cards) and 3186 / 3189 / 3192 / 3195 / 3198 (images).
- **Implementation approach:** `Appear` from `shared/appear.tsx` with `as="li"` for the four cards and `as="img"` for the five images, `activeClass={false}`, `once` default.
### Hover / focus states
**N/A — no visual hover anywhere in this section.**
- `__cloneSnap.rules('main > .sd-271')` returned exactly 5 hits, all identical no-ops: `.sd-298:hover`, `.sd-299:hover`, `.sd-300:hover`, `.sd-301:hover`, `.sd-302:hover` → `scale: 1; translate: 0px; --ha: 1;`. They live in the origin's `<style media="(max-width: 768px)">` block (`css/main.css` lines 4597 / 4600 / 4603 / 4606 / 4609 inside `@media (max-width: 768px)`).
- @1440, 12 live hover probes (`.sd-273`, `.sd-274`, `.sd-275`, `.sd-278`, `.sd-280`, `.sd-282`, `.sd-283`, `.sd-287`, `.sd-288`, `.sd-293`, `.sd-298`…`.sd-302`) changed **0 properties** across all 35 elements — the media block does not apply.
- @768, 7 probes: the only diff is `translate: none → 0px` on whichever stacked image is topmost under the cursor (`sd-298` for the first three probes, `sd-299`, then `sd-300`), which renders identically; `scale` already computes to `1`. Cards `.sd-288` / `.sd-293` changed 0 properties. Screenshot `collaboration-768-hover-sd298.png` matches `collaboration-768-b.png`.
- `__cloneSnap.animations('main > .sd-271')` returned `{"count": 0, "items": []}`. No `@keyframes` exist on the page.
- No `theme-*` rule beats an `.sd-NN` rule anywhere here: the four `theme-*` classes only supply font-family / font-size / weight / line-height, and the `.sd-NN` rules only supply colour, width and layout — they never collide. (`.text.theme-c1a9a55a { font-size: 1.75rem }` = 28px and `.text.theme-cb8ba68c { font-size: 2.125rem }` = 34px are the effective heading sizes because no `.sd-NN` rule sets font-size.)
- No element in the section carries a non-empty inline `style` attribute after reveal (verified live: the 9 reveal targets keep an empty `style=""`).

## Per-State Content
N/A — single state.

## Assets
All eight are plain `<img>` with `objectFit: fill` and no `srcset`; the Studio runtime swaps `data-sd-img-src` into `src` picking a `_small` / `_middle` variant by rendered width.
- `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-1288x678_v-fms_webp_5c0329b7-8f53-4dfb-a80a-d0dead2ab901_middle.webp` — `.sd-282`, 642.20×337.69 @1440 (natural 1200×631)
- `public/sites/.../images/s-1632x1356_v-fms_webp_1afb3be4-7c11-4d0b-af78-c374a27ba654_small.webp` — `.sd-287`, 406.80×337.64 @1440
- `public/sites/.../images/s-816x676_v-fs_webp_c7f1e56c-b94a-48df-b889-9798e2ffd1cc_small.webp` — `.sd-292`, 406.80×336.96 @1440
- `public/sites/.../images/s-865x852_v-fs_webp_48214724-a010-43fa-aa45-d681a6d391b6_small.webp` — `.sd-298`, 452.44×444.89 @1440
- `public/sites/.../images/s-865x852_v-fs_webp_ad3da2af-a173-44c3-8dff-b271ef0baf82_small.webp` — `.sd-299`, 452.44×444.89 @1440
- `public/sites/.../images/s-864x851_v-fs_webp_76ee5ccd-fa6a-4ce9-8c93-a4d28efc3b00_small.webp` — `.sd-300`, 452.44×444.89 @1440
- `public/sites/.../images/s-865x852_v-fs_webp_46e1a776-8667-4242-8ced-ce57aa8610ee_small.webp` — `.sd-301`, 452.44×444.89 @1440
- `public/sites/.../images/s-764x802_v-fs_webp_3f824ef8-03d9-4c09-bb14-2a595539ac64_small.webp` — `.sd-302`, 452.44×475.41 @1440
- Icons: none. Video: none. Background-image machinery (`image` / `image__bg-container` / `--img-*`): **not used in this section.**
- Layered composition inside `li.sd-293`: `.sd-297` is an in-flow row; its five `<img>` overlap by `margin-right: -324px` (−256px @768, −176px @390) and stair-step upward by `margin-top` 72/54/36/18/0; paint order is set by `z-index` 4/3/2/1/auto so `.sd-298` is on top. `.sd-297`'s `margin-bottom: -168px` (−160px @390) pulls the card bottom up under the images, and `li.sd-293 { overflow: hidden }` clips the right and bottom overflow.
- MISSING: the `_small` variant of `.sd-282` — `extract/collaboration.assets.json` lists `images/s-1288x678_v-fms_webp_5c0329b7-8f53-4dfb-a80a-d0dead2ab901_small.webp`. Only `_middle` is in `assets.manifest.json`, but at 768 (401.59px) and 390 (318px) the runtime loads `_small`, so the builder needs both files for the responsive diffs to match.

## Text Content (verbatim)
Verified byte-exactly against the live DOM: the only non-ASCII, non-CJK codepoint in the whole section is U+FF1A (FULLWIDTH COLON) in the three non-empty `alt` strings. No U+2028, no U+00A0, no U+200B.
- `h2.sd-274`: `Collaboration`
- `p.sd-275`: `同時編集で進む、<br>チームの制作体験。`
- `h3.sd-280`: `リアルタイムコラボレーション` · `p.sd-281`: `複数人で同時に編集できるリアルタイムコラボレーション。<br>誰がどこを作業しているかを確認しながら、チームでスムーズに制作できます。`
- `h3.sd-285`: `コメント機能` · `p.sd-286`: `Studio上に直接コメントを残せる機能です。` (no `<br>`)
- `h3.sd-290`: `コンテンツ編集モード` · `p.sd-291`: `レイアウトを崩さずに、テキストや画像だけを安全に編集できるモード。` (no `<br>`)
- `h3.sd-295`: `バージョン管理` · `p.sd-296`: `これまでの編集履歴をいつでも確認・復元できるバージョン管理機能。<br>変更前の状態にもワンクリックで戻せます。`
- `img.sd-282` alt: `サンプル画像：複数のテキストボックスと、草原に立つ家の写真で構成されたページを、2人のユーザーが編集している様子。左上のテキストボックスは青色の枠で、右下のテキストボックスはオレンジ色の枠で囲まれ、それぞれ編集中であることを示す矢印とユーザーアイコンが重なって表示されている。`
- `img.sd-287` alt: `サンプル画像：デザインエディタ上でコメントを残している様子。青枠で囲まれた英文テキスの上に、白背景の吹き出しのアイコンとコメントパネルが浮かぶ。コメントパネル内にはユーザーのアイコンやユーザー同士の短いやり取りが表示されている。` (the origin's own typo `英文テキス` — keep it)
- `img.sd-292` alt: `サンプル画像：デザインエディタでテキストの編集を行う様子。ページは複数のテキストと画像で構成され、それ以外の背景部分には編集不可であることを示す薄い青色が重なっている。青い矢印がテキストの一部に重なっており、編集中であることを示している。`
- `img.sd-298` / `.sd-299` / `.sd-300` / `.sd-301` / `.sd-302` alt: `` (empty string, present as an attribute)
- No links, no buttons, no aria-label, no title, no placeholder anywhere in this section.

## Responsive Behavior
- **Desktop (1440):** 2 rows. Row 1 = `.sd-278` 682.195px + `.sd-283` 446.797px; row 2 = `.sd-288` 446.797px + `.sd-293` 682.195px; gaps 24px. Rail `.sd-273` is 215px wide, sticky at top 104px, left of `.sd-276` (1153px). `.sd-272` padding 96px 0. Section height 1267.95.
- **Tablet (768):** the rail becomes a full-width band above the list — `@media (max-width: 1280px) .sd-273 { position: relative; top: auto; left: auto; right: auto; bottom: auto; width: 100%; max-width: 100% }` (`css/main.css` line 4210) plus `.sd-277 { gap: 16px }` (line 4212). Then `@media (max-width: 768px)` (lines 4571–4610): card padding 40px 40px 0 → `24px 24px 0px` and card gap 40 → 32; copy-block gap 16 → 12; `.sd-282` / `.sd-287` / `.sd-292` margin-right −40 → −24 with maxWidth `calc(100% + 24px)`; `.sd-298`…`.sd-301` margin-right −324 → −256 and width `calc(20% + 256px - (var(--gap-h) * 0.8))`; all five images get `flex: none`; the five no-op `:hover` rules appear. The 60/40 split survives — rail band 720×94 at y 97, `.sd-278` 425.59 wide, `.sd-283` 278, `.sd-288` 278, `.sd-293` 425.59. Section top 10013.77, height 1118.03.
- **Mobile (390):** single column — `@media (max-width: 480px)` (lines 5039–5059) sets `flex: none; width: 100%; max-width: 100%` and `gap: 24px` on `.sd-278`, `.sd-283`, `.sd-288`, `.sd-293`, so all four cards are 342px wide and stack. `.sd-272` padding 96px 0 → `64px 0px`; `.sd-297` margin `0 -24px -160px 0` with width `calc(100% + 24px)`; `.sd-298`…`.sd-301` margin-right −176px and fixed `width: 256px`, `.sd-302` `width: 256px`. `.sd-274` drops to 24px / lineHeight 28.8px / letterSpacing −0.96px (`@media (max-width: 480px) .text.theme-cb8ba68c { font-size: 1.5rem }` in `app/studio-base.css`) and `.text.theme-c1a9a55a` to 1.25rem = 20px, `.text.theme-a3931427` to 0.875rem = 14px. Rail is a 342×81.59 band at y 65. Section top 10153.43, height 1664.59.
- **Breakpoints used:** `(max-width: 1280px)`, `(max-width: 768px)`, `(max-width: 480px)`, `(max-width: 360px)` — the only width media queries in `css/main.css`. The 360px block (lines 5486–5490) only restates `flex: none` on `.sd-298`…`.sd-302`.

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/collaboration.1440.json` (35 nodes, 35 style buckets)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/collaboration.768.json` (35 nodes) · `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/collaboration.390.json` (35 nodes)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/collaboration.states.json` (sticky samples + boundary probes, reveal MutationObserver log with per-element timing, hover diffs at 1440 and 768, CSSOM pseudo rules, animations, per-viewport image variants, class census, codepoint audit)

## QA Exclusions
**none.** The section has no video, no canvas, no autoplaying carousel, no live counter and no third-party embed — every pixel is static once the nine `appear` reveals have settled. Diff at the default 1.5 percent, after scrolling the section fully into view and waiting ≥ 1700 ms (longest reveal = 700 ms delay + 1000 ms duration on `.sd-298`). One capture caveat, not an exclusion: the reference tiles were taken by scrolling a 900px viewport, so the fixed `#header` pill overlays the top 110px of each tile — crop that band, not a section rect.
