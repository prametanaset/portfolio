# FreeLayoutSection Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `main > .sd-45` (`div.box.sd-45`) · DOM order 4 of 13
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/FreeLayoutSection.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/` → `free-layout-1440.png` + `-1440-slice2.png` · `free-layout-768.png` + `-768-slice2.png` · `free-layout-390.png` + `-390-slice2.png` + `-390-slice3.png` · `free-layout-1440-sticky-mid.png` (scrollY 2600, rail pinned at viewport top 104). All are viewport tiles at dpr 1 taken by scrolling, so the fixed `#header` overlays the first tile of each width — crop it out when diffing.
- **Interaction model:** mixed(scroll) — CSS `position: sticky` rail + 5 IntersectionObserver `appear` reveals + 2 autoplay-loop videos. **No hover, no click, no timer, no carousel, no toggle.**
- **Client component:** yes (only because the 5 `appear` reveals need an IntersectionObserver; the sticky rail and the videos are declarative)
- **Root rect @1440:** x 0, y 2047, w 1440, h 1272.44 · **@768:** 0, 1593, 768, 1145 · **@390:** 0, 1322, 390, 2228
- **Sub-components:** `SdVideo` ×2 from `components/sites/studio-design-8a86c0e4/shared/video.tsx`; `Appear` ×5 from `shared/appear.tsx`. No further split needed — the section is 34 elements.
- **Non-DOM content:** 2 `<video>` (`sd-56`, `sd-61`), `autoplay loop muted playsinline`, no poster, no controls — see QA Exclusions.
- **CSS slice command:** `node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs sd-45..78 --out app/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/free-layout.css` — token **`sd-45..78`** only (70 rules, 14280 bytes). Verified against `page.html`: every element in the section carries exactly one `sd-NN` class in 45…78. The remaining classes — `box`, `text`, `img`, `video`, `image`, `image--vertical`, `image__bg-container`, `theme-cb8ba68c`, `theme-969c5ae1`, `theme-c1a9a55a`, `theme-a3931427`, `theme-f799e4ef`, and the `sd-video` element rule — are all already in `app/studio-base.css`. Keep origin class names verbatim.

## DOM Structure
```
div.box.sd-45                                     section, bg #fff, padding 0 0 96px, gap 80px
  div.box.sd-46                                   border-top 1px #e0e0e0, margin 0 24px, padding 96px 0 0, row, wrap, gap 24
    div.box.sd-47                                 STICKY rail, top 104px, z 1, w 212, gap 8
      h3.text.sd-48.theme-cb8ba68c                "Free Layout"
      p.text.sd-49.theme-969c5ae1                 2 lines split by <br>
    div.box.sd-50                                 flex:1, column, gap 24
      ul.box.sd-51                                row, wrap, gap 24 (16 ≤1280)
        li.box.sd-52.appear    60% wide  · bg #f7f7f7 · radius 4 · overflow hidden · padding 40 40 0 · gap 40
          div.box.sd-53 > h4.sd-54.theme-c1a9a55a + p.sd-55.theme-a3931427(<br>)
          sd-video.video.sd-56 > video            radius 4px 0 0 0, margin-right -40, w calc(100% + 40px)
        li.box.sd-57.appear    40% wide  · same card style
          div.box.sd-58 > h4.sd-59 + p.sd-60(<br>)
          sd-video.video.sd-61 > video            margin 0 -40px, w calc(100% + 80px)
        li.box.sd-62.appear    33.33%    · bg #222222 (dark card)
          div.box.sd-63 > h4.sd-64 + p.sd-65(<br>)
          img.img.sd-66                           + <noscript> duplicate (never painted)
        li.box.sd-67.appear    33.33%    · bg #f7f7f7
          div.box.sd-68 > h4.sd-69 + p.sd-70
          img.img.sd-71                           + <noscript> duplicate
          div.box.sd-72                           ABSOLUTE bottom fade, inset 0 0 0 auto, h 80, z 1
        li.box.sd-73.appear    33.33%    · bg #222222 (dark card)
          div.box.sd-74 > h4.sd-75.theme-f799e4ef + p.sd-76
          div.box.image.image--vertical.sd-77     ABSOLUTE, inset 0, z -2, background image via ::before
            span.image__bg-container[aria-hidden]
          img.img.sd-78                           + <noscript> duplicate
```
The three `<noscript>` blocks are inert with JS enabled — do not render them.

## Computed Styles (from getComputedStyle @1440 dpr 1, exact)
### `.sd-45` (S1)
- width: 1440px · height: 1272.44px · maxWidth: 100% · display: flex · flexDirection: column · alignItems: center · justifyContent: center · position: relative
- padding: 0px 0px 96px · rowGap: 80px · columnGap: 80px · backgroundColor: rgb(255, 255, 255) · transitionDuration: 0.3s · transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1)
### `.sd-46` (S2)
- width: 1392px (declared 1920px, maxWidth calc(100% - 48px)) · height: 1176.44px · rowGap: 24px · columnGap: 24px
- margin: 0px 24px · padding: 96px 0px 0px · flexDirection: row · flexWrap: wrap · alignItems: flex-start · borderTop: 1px solid #e0e0e0ff (var(--s-color-a99509da)) · other three borders 0px
### `.sd-47` (sticky rail, S3) — rect [24, 97, 212, 93.59] section-relative
- top: 104px · width: 212px · height: auto (93.59px measured) · rowGap: 8px · padding: 0px · position: sticky · zIndex: 1 · flexDirection: column · alignItems: flex-start · background: transparent
### `.sd-48` "Free Layout"
- fontFamily: Inter, "Noto Sans JP" · fontSize: 34px · lineHeight: 40.8px · fontWeight: 600 · letterSpacing: -1.36px · color: rgb(34, 34, 34)
### `.sd-49`
- fontSize: 16px · lineHeight: 22.4px · fontWeight: 400 · color: rgb(85, 85, 85) · fontFeatureSettings: 'palt' 1
- The slice declares `font-size: 0.94rem` but `.sd-root .text.theme-969c5ae1 { font-size: 1rem }` has higher specificity and wins → 16px. Keep both rules; do not "fix" the slice.
### `.sd-50` / `.sd-51`
- width: 1156px on both · rowGap: 24px · columnGap: 24px · flex: 1 on both
- sd-50 flexDirection: column, minWidth auto · sd-51 is the `<ul>`: flexDirection row, flexWrap wrap, alignItems stretch, minWidth 0
### Card `.sd-52` / `.sd-57` / `.sd-62` / `.sd-67` / `.sd-73` (style S-card)
- rowGap: 40px · padding: 40px 40px 0px · borderRadius: 4px · flex: none · flexDirection: column · alignItems: flex-start · overflow: hidden
- widths: sd-52 `calc(60% - (var(--gap-h) * 0.4))` = 684px · sd-57 `calc(40% - (var(--gap-h) * 0.6))` = 448px · sd-62/67/73 `calc(33.33% - (var(--gap-h) * 0.67))` = 369.211px
- backgroundColor: sd-52 / sd-57 / sd-67 = rgb(247, 247, 247); sd-62 / sd-73 = rgb(34, 34, 34)
- `--gap-h: 24px` / `--gap-v: 24px` are set on `.sd-51 > *`
### Card copy blocks `.sd-53` / `.sd-58` / `.sd-63` / `.sd-68` / `.sd-74`
- rowGap: 16px · padding: 0px · flexDirection: column · sd-53 flex: none, sd-58 flex: none, sd-63/68/74 flex: 1 minWidth: 0
- margin: 0px -20px 0px 0px · maxWidth: calc(100% + 20px) — on sd-63 and sd-74 only
### Headings `.sd-54` / `.sd-59` / `.sd-64` / `.sd-69` (theme-c1a9a55a)
- fontSize: 28px · lineHeight: 35px · fontWeight: 600 · width: 100% · color: rgb(34, 34, 34) on sd-54 / sd-59 / sd-69 · rgb(247, 247, 247) on sd-64
### `.sd-75` (theme-f799e4ef) — fontSize: 30px · lineHeight: 36px · fontWeight: 600 · letterSpacing: -1.2px · color: rgb(247, 247, 247)
### Body copy `.sd-55` / `.sd-60` / `.sd-65` / `.sd-70` / `.sd-76` (theme-a3931427)
- fontSize: 16px · lineHeight: 25.6px · fontWeight: 400 · fontFeatureSettings: 'palt' 1 · color: rgb(85, 85, 85) on sd-55 / sd-60 / sd-70 · rgb(247, 247, 247) on sd-65 / sd-76
### `.sd-56` (video, S14) — rect [300, 279, 644, 448]
- flex: 1 · objectFit: cover · aspectRatio: 2672 / 1856 · borderRadius: 4px 0px 0px 0px · margin: 0px -40px 0px 0px · width: calc(100% + 40px) · child `video { width:100%; height:100% }`
### `.sd-61` (video, S20) — rect [968, 279, 448, 448]
- flex: 1 · objectFit: cover · aspectRatio: 2160 / 2160 · borderRadius: 0px · margin: 0px -40px · width: calc(100% + 80px) · child `video { width:100%; height:100% }`
### `.sd-66` / `.sd-71` / `.sd-78` (images)
- borderRadius: 0px · height: auto · objectFit: fill
- sd-66: width 896px, maxWidth calc(100% + 80px), margin 0px -40px, aspectRatio auto 1476 / 920 → rect [260, 947, 369.21, 229.52]
- sd-71: width 896px, maxWidth calc(100% + 80px), margin -8px -40px 0px, aspectRatio auto 739 / 503 → rect [653, 925, 369.21, 251.06]
- sd-78: flex none, width calc(100% + 80px), margin 0px -40px, aspectRatio auto 1478 / 996 → rect [1046, 928, 369.21, 248.60]
### `.sd-72` (bottom fade over `.sd-67`) — rect [653, 1096, 369.21, 80]
- height: 80px · background: linear-gradient(0deg, #EEEEEE 0%, #eeeeee00 100%) · position: absolute · left 0 · right 0 · bottom 0 · top auto · zIndex: 1
### `.sd-77` (card 5 background) + `span.image__bg-container`
- top: 0px · left: 0px · width: 100% · height: 100% · zIndex: -2 · margin: 0px · position: absolute · flex: none. Painted by `.image__bg-container::before`: content "" · position absolute · inset 0px · backgroundSize: cover · backgroundPosition: 50% 50% · backgroundImage: the `--img-small` variant at dpr 1

## States & Behaviors
### Sticky rail `.sd-47` (desktop only)
- **Trigger:** native CSS `position: sticky; top: 104px` inside `.sd-46`. No JS, no class flip, no scroll listener.
- **Thresholds @1440 (page coords):** rail rests at page top 2143.93; sticks at **scrollY 2039.93**; releases at **scrollY 3025.77**, after which it parks at page top 3129.77 (= `.sd-46` bottom 3223.37 − rail height 93.59).
- **State A (before/after stick) and State B (while stuck) are identical:** backgroundColor rgba(0, 0, 0, 0); opacity 1; boxShadow none; width 212px. **Nothing changes visually while stuck.**
- **Transition:** none applies (the base `all 0.3s cubic-bezier(0.4, 0.4, 0, 1)` never fires because no animatable property changes).
- **Evidence:** 9 instant-scroll samples in `extract/free-layout.states.json` → `sticky.samples1440` (scrollY 1900/2035/2045/2400/3000/3020/3040/3200/3400 → railViewportTop 243.93/108.93/104/104/104/104/89.77/−70.23/−270.23).
- **Implementation approach:** CSS only — the sliced `.sd-root .sd-47 { position: sticky; top: 104px }` already does it. Do not add a scroll handler.
### Reveal `appear` ×5 (`.sd-52`, `.sd-57`, `.sd-62`, `.sd-67`, `.sd-73`)
- **Trigger:** IntersectionObserver in the Studio runtime. After reveal the runtime removes `appear` and leaves the empty attributes `data-appear` and `data-inited-appear` on all 5 `<li>`.
- **State A (hidden):** opacity: 0; translate: 0px 16px. **State B (shown):** opacity: 1; translate: none.
- **Transition:** transition-delay 400ms; transition-duration 800ms; transition-timing-function cubic-bezier(0.2, 1, 1, 1) — declared on the `.appear` rule itself, so it applies while the class is present.
- **Evidence:** `.sd-52.appear { opacity:0; transition-delay:400ms; transition-duration:800ms; transition-timing-function:cubic-bezier(0.2,1,1,1); translate:0px 16px }` in `css/main.css` line 2699 (identical for sd-57/62/67/73); after scrolling the whole page, `querySelectorAll('.appear,[data-appear-manual],.appear-active')` inside `.sd-45` returned 0.
- **Implementation approach:** `Appear` from `shared/appear.tsx` with `as="li"`, `activeClass={false}` (the origin never uses `appear-active` here), `once` default.
### Videos ×2
- **Trigger:** `autoplay` attribute; both report `paused: false`, `muted: true`, `loop: true`, `playsInline: true`, `controls: false`, `poster: ""`. `.sd-56` intrinsic 2672×1856, duration 6.533333s · `.sd-61` intrinsic 2160×2160, duration 10.266667s.
- The runtime injects `<video loop autoplay playsinline src>` and sets `muted` as a **property** (no `muted` attribute in the DOM). `SdVideo` uses React's `muted` prop, which also sets the property — **`SdVideo` fits as-is**; pass `className="sd-56"` / `"sd-61"` and the local `src` without the `#t=0.01` suffix (the component appends it).
- **No play/pause control:** `[data-video-state], [data-playing-label], [data-paused-label]` matches only `BUTTON.box.sd-38` (`.sd-13` NextCreationSection) and `BUTTON.box.sd-259` (`.sd-236` FeaturedCreatorsSection) — neither is inside `.sd-45`.
### Hover / focus states
N/A — verified: `__cloneSnap.rules('main > .sd-45')` returned `{hits: [], total: 0}`; hovering `.sd-52` and `.sd-73` and diffing changed **0 style properties** (the 3 reported nodes are only `__rect` deltas from Playwright's own auto-scroll, scrollY 2202 → 2144 / 2324); `__cloneSnap.animations('main > .sd-45')` returned `{count: 0}`.

## Per-State Content
N/A — single state.

## Assets
- `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/video/s-2672x1856_cd6091a9-5173-4219-9604-470d08abbfb4.mp4` — `.sd-56`, autoplay/loop/muted/playsinline, no poster, objectFit cover, rendered 644×448 @1440 · 418×355 @768 · 334×232 @390.
- `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/video/s-2160x2160_b9fe14c4-85dd-46a0-a114-f34348472441.mp4` — `.sd-61`, same flags, objectFit cover, rendered 448×448 @1440 · 310×310 @768 · 374×374 @390.
- `public/sites/.../images/s-1476x920_v-fms_webp_15cde8d8-0d0e-498d-92c2-09770d1ed83f_small.webp` — `.sd-66`, objectFit fill, 369.21×229.52 @1440.
- `public/sites/.../images/s-739x503_v-fs_webp_03a514fa-203a-4936-a7cd-e7f4cb58a083_small.webp` — `.sd-71`, objectFit fill, 369.21×251.06 @1440.
- `public/sites/.../images/s-1478x996_v-fms_webp_21bca91a-9f5c-40dd-bd60-c179ce3709df_small.webp` — `.sd-78`, objectFit fill, 369.21×248.60 @1440.
- Icons: none in this section.
- Layered composition inside `li.sd-73`: `.sd-77` (absolute, z −2, background-image cover) sits behind `.sd-74` copy and `.sd-78` image; the `<li>` has `overflow: hidden`, which clips `.sd-78`'s −40px side margins. Inside `li.sd-67`, `.sd-72` is an absolute 80px #EEEEEE→transparent bottom fade at z 1 over `.sd-71`.
- MISSING: the `.sd-77` background image — 3 variants listed in `extract/free-layout.assets.json` (`s-1478x1600_v-fms_webp_1228027a-e582-45f7-a17f-976623568666{_small,_middle,}.webp`). The `_small.webp` is the one painted at dpr 1 at all three viewports; the origin also fetched `_middle` and the full-size for higher-dpr rules in `app/studio-base.css`. The builder must set all four CSS vars (`--img-origin`, `--img-small`, `--img-middle`, `--img-regular`) on `.sd-77` as inline style, pointing at the local files.

## Text Content (verbatim)
- `h3.sd-48`: `Free Layout`
- `p.sd-49`: `スマートなレイアウトと、<br>直感的な編集体験。`
- `h4.sd-54`: `ボックスレイアウト` · `p.sd-55`: `ボックスレイアウトやスナップ機能で、複雑な配置も直感的に。<br>美しい構造を一瞬で作成できます。`
- `h4.sd-59`: `レスポンシブ` · `p.sd-60`: `各デバイスサイズに合わせて、デザインを最適化。<br>レイアウトの変更も自由自在に可能です。`
- `h4.sd-64`: `コンポーネント` · `p.sd-65`: `共通パーツをまとめて、効率的な制作を。<br>一度作れば、複数ページで使い回しも簡単。`
- `h4.sd-69`: `プリセットパーツ` · `p.sd-70`: `用意されたセクション・パーツで最初の一歩が、ぐっと簡単に。` (no `<br>`)
- `h4.sd-75`: `Figma to Studio` · `p.sd-76`: `Figmaデータを簡単にStudioサイトに変換。` (no `<br>`)
- `img.sd-66` alt: `サンプル画像：コンポーネントの例。上段に2種類の見出しブロック、下段に2種類のカードが配置されている。それぞれ、紫色の枠で囲まれ、左上にはコンポーネント名である「Heading01」、「Heading02」、「Card01」、「Card02」の文字が表示されている。`
- `img.sd-71` alt: `サンプル画像：白と黒を基調にしたセクション・パーツの例。矢印などのアイコン付きのボタン、円形のメニューを開く/閉じるボタン、画像付きの横長ボタン、余白を広く取ったカード型のボタンなどが並​んでいる。` (contains a U+200B ZERO WIDTH SPACE between `並` and `んでいる` — preserve it)
- `img.sd-78` alt: `サンプル画像：同一のWebデザインのFigmaデータの上に、Studioサイトへ変換されたデータが重なっているイメージ。Webデザインは指紋の画像と白文字「General Lab©」が配置された青基調のデザイン。右下には「Figma → Studio」のロゴが配置されている。`
- `span.image__bg-container` carries `aria-hidden="true"`. No links, no buttons, no aria-label anywhere in this section.

## Responsive Behavior
- **Desktop (1440):** 2 rows. Row 1 = `.sd-52` 684px + `.sd-57` 448px; row 2 = `.sd-62` / `.sd-67` / `.sd-73` at 369.211px each; gaps 24px. Rail `.sd-47` is 212px wide, sticky at top 104px, sitting left of `.sd-50` (1156px). Section padding-bottom 96px, section gap 80px, `.sd-46` padding-top 96px.
- **Tablet (768):** the rail becomes a full-width band above the list — `@media (max-width: 1280px) .sd-47 { position: relative; top: auto; left: auto; right: auto; bottom: auto; width: 100%; max-width: 100% }`. `.sd-51` gap drops to 16px (`@media (max-width: 1280px)` and again `@media (max-width: 768px) .sd-51 { gap: 16px }`). Card padding 40px 40px 0 → `24px 24px 0px` and card gap 40 → 32 (`@media (max-width: 768px)`), copy-block gap 16 → 12, `.sd-63`/`.sd-74` lose their −20px right margin, image side margins −40 → −24, `.sd-78` width `calc(100% + 48px)`. Section top 1593, height 1145. Rects: `.sd-52` 426×493, `.sd-57` 278×493, `.sd-62`/`.sd-67`/`.sd-73` 229×325.
- **Mobile (390):** single column — `@media (max-width: 480px)` sets `flex: none; width: 100%; max-width: 100%` on `.sd-52`, `.sd-57`, `.sd-62`, `.sd-67`, `.sd-73`, so all 5 cards are 342px wide and stack. Section gap 80 → 48 and padding-bottom 96 → 64; `.sd-46` padding-top 96 → 64; `.sd-72` height 80 → 64. Card gap becomes 24px on sd-52/62/67/73 and stays 32px on sd-57. `.sd-48` drops to 24px / lineHeight 28.8px / letterSpacing −0.96px (`@media (max-width: 480px) .text.theme-cb8ba68c { font-size: 1.5rem }` in `app/studio-base.css`). Section top 1322, height 2228.
- **Breakpoints used:** `(max-width: 1280px)`, `(max-width: 768px)`, `(max-width: 480px)`, `(max-width: 360px)` — the only width media queries in `css/main.css`. The 360px block only restates the two `sd-video` aspect ratios.

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/free-layout.1440.json` (41 nodes, 39 style buckets) · `.states.json` below mirrors the same nodes + styleTable
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/free-layout.768.json` (41 nodes) · `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/free-layout.390.json` (41 nodes)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/free-layout.states.json` (sticky samples, hover diffs, rules, animations, video/image/background measurements)
## QA Exclusions
Two autoplaying videos — frames can never match. Rects are section-relative (subtract the section page top before diffing).
- @1440: `.sd-56` = `x 300, y 279, w 644, h 448` · `.sd-61` = `x 968, y 279, w 448, h 448`. Everything else in the section is static and must match at the default 1.5 percent.
- @768: `.sd-56` = `x 48, y 352, w 418, h 355` · `.sd-61` = `x 466, y 397, w 278, h 310` (the element is 310 wide at x 450 but `li.sd-57` clips it with `overflow: hidden`)
- @390: `.sd-56` = `x 48, y 323, w 334, h 232` · `.sd-61` = `x 24, y 709, w 342, h 374` (the element is 374 wide at x 8, clipped by `li.sd-57`)
