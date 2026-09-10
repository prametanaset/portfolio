# EditorAiSection Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `main > .sd-79` (`div.box.sd-79` with **`id="ai"`** — keep the id, it is the page's `#ai` anchor target) · DOM order 5 of 13
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/EditorAiSection.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/` → `editor-ai-1440.png` + `-1440-b` + `-1440-c` (scrollY 3319 / 4219 / 4462) · `editor-ai-768.png` + `-768-b` + `-768-c` + `-768-d` (2737 / 3637 / 4537 / 5258) · `editor-ai-390.png` + `-390-b` + `-390-c` (3550 / 4394 / 5023). All are scrolled viewport tiles at dpr 1, so the fixed `#header` overlays each tile — crop it out when diffing.
- **Interaction model:** scroll-driven — 4 IntersectionObserver `appear` reveals and nothing else. **No hover, no focus, no click, no timer, no carousel, no toggle, no sticky, no video, no `image__bg-container`.**
- **Client component:** yes (only for the 4 `appear` observers)
- **Root rect @1440:** x 0, y 3319.37, w 1440, h 2042.47 · **@768:** 0, 2737.36, 768, 3420.41 · **@390:** 0, 3549.87, 390, 2317.27. (`PAGE_TOPOLOGY.md` lists 1997 @1440 from the pre-webfont recon pass; 2042.47 is the settled measurement with Inter / Noto Sans JP / Instrument Serif loaded.)
- **Sub-components:** `Appear` ×4 from `components/sites/studio-design-8a86c0e4/shared/appear.tsx`. No further split — the section is 69 elements and one file.
- **Non-DOM content:** none. 4 `<img>`, zero canvas / video / Lottie / SVG.
- **CSS slice command:** `node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs sd-79..132 --out app/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/editor-ai.css` — token **`sd-79..132`** only (103 rules, 22342 bytes). Verified against the live DOM: the complete class set of the section is `sd-79`…`sd-132` plus `box`, `text`, `img`, `richText`, `appear`, `theme-b6b0338f`, `theme-57a9da79` — the last six already ship in `app/studio-base.css`. Keep origin class names verbatim.

## DOM Structure
```
div.box.sd-79#ai                              section, bg #1a1a1a, padding 96px 0, column, align center
  div.box.sd-80                               border-top 1px #333, margin 0 24px, padding 24px 0 96px, row, gap 24
    h2.box.sd-81                              flex 1, row, gap 24, justify space-between
      span.text.sd-82.theme-b6b0338f          eyebrow "Editor AI", width 212
      span.text.sd-83.theme-57a9da79          flex 1, 2 lines split by <br>
    div.box.sd-84 > div.richText.sd-85        width 448, one <p> with an inline <strong>
  ul.box.sd-86                                margin 0 24px, row, wrap, gap 64px 24px, justify center
    li.box.sd-87.appear    50%  · CARD-A      bg #1e1e1e, 1px #f7f7f70d border, radius 4, overflow hidden, justify space-between
      div.box.sd-88                           padding 24, column, gap 56
        div.box.sd-89 > p.text.sd-90          "01"
        div.box.sd-91                         row, gap 56px 48px, padding 0 40
          h3.box.sd-92 > span.sd-93 + span.sd-94
          p.text.sd-95                        flex 1, margin-top 104
      div.box.sd-96                           position relative (base `.box` rule), column, gap 16
        img.img.sd-97                         + <noscript> duplicate (never painted)
        div.box.sd-98                         ABSOLUTE top fade, inset 0 0 auto 0, h 200, z 1
    li.box.sd-99.appear    50%  · CARD-A      same card style, justify center
      div.box.sd-100 > div.box.sd-101 > p.sd-102 "02" ; div.box.sd-103 > h3.sd-104(span.sd-105 + span.sd-106) + p.sd-107
      div.box.sd-108 > img.img.sd-109 (+noscript) + div.box.sd-110   same top fade
    li.box.sd-111          100% · ROW-B       border-top 1px #333, padding 24px 0 0, row, gap 24, justify space-between
      div.box.sd-112                          flex 1, row, gap 24
        div.box.sd-113 > p.text.sd-114        "03", width 212
        div.box.sd-115                        width 448, column, gap 24, justify space-between
          h3.box.sd-116 > span.sd-117 + span.sd-118
          div.richText.sd-119                 one <p> with <br>
      div.box.sd-120.appear                   flex 1, CARD-A chrome, overflow hidden
        img.img.sd-121                        + <noscript> duplicate
    li.box.sd-122          100% · ROW-B       "04": div.sd-123 > div.sd-124 > p.sd-125 ; div.sd-126 > h3.sd-127(span.sd-128 + span.sd-129) + div.richText.sd-130
      div.box.sd-131.appear > img.img.sd-132  (+noscript)
```
The four `<noscript>` blocks are inert with JS enabled — do not render them. `li.sd-111` and `li.sd-122` carry no `appear`; only their image wrappers `.sd-120` / `.sd-131` do.

## Computed Styles (from getComputedStyle @1440 dpr 1, exact)
### `.sd-79` — rect [0, 3319.37, 1440, 2042.47]
- backgroundColor: rgb(26, 26, 26) · padding: 96px 0px · display: flex · flexDirection: column · alignItems: center · justifyContent: flex-start · position: relative · rowGap: normal · transitionDuration: 0.3s · transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1)
### `.sd-80` — rect [24, 3415.37, 1392, 211]
- borderTop: 1px solid rgb(51, 51, 51) (other three 0px) · margin: 0px 24px · padding: 24px 0px 96px · columnGap: 24px · rowGap: 24px · flexDirection: row · width: 1392px (declared 1920px, maxWidth calc(100% - 48px))
### `.sd-82` "Editor AI" (theme-b6b0338f) — rect [24, 3440.37, 212, 14.25]
- fontFamily: Inter, "Noto Sans JP" · fontSize: 12.96px · lineHeight: 14.256px · fontWeight: 500 · letterSpacing: -0.5184px · color: rgb(247, 247, 247) · width: 212px · overflow: hidden
- `.sd-82` declares no font-size; `.sd-root .text.theme-b6b0338f { font-size: 0.81rem }` in `app/studio-base.css` supplies it. Do not inline a size on `.sd-82`.
### `.sd-83` (theme-57a9da79) — rect [260, 3440.37, 684, 90]
- fontSize: 36px · lineHeight: 45px · fontWeight: 600 · letterSpacing: normal · color: rgb(247, 247, 247) · fontFeatureSettings: "palt" · flex: 1
- Same specificity note: the 36px comes from `.text.theme-57a9da79 { font-size: 2.25rem }`, not from `.sd-83`.
### `.sd-84` / `.sd-85` (richText) — rect [968, 3440.37, 448, 76.69]
- `.sd-84`: width 448px, column, rowGap 8px, padding 0
- `.sd-85`: fontSize 15.04px · lineHeight 25.568px · fontWeight 400 · color rgb(172, 172, 172) · fontFeatureSettings "palt" · `> p { margin: 0 }`
- `.sd-85 strong`: color rgb(247, 247, 247) · fontWeight 500 · fontSize 15.04px (inherited at 1440)
### `.sd-86` (`<ul>`) — rect [24, 3626.37, 1392, 1639.47]
- columnGap: 24px · rowGap: 64px · flexWrap: wrap · justifyContent: center · alignItems: stretch · margin: 0px 24px · background: transparent · `> * { --gap-h: 24px; --gap-v: 64px }`
### Card chrome `.sd-87` / `.sd-99` / `.sd-120` / `.sd-131` (style CARD-A)
- backgroundColor: rgb(30, 30, 30) · border: 1px solid rgba(247, 247, 247, 0.05) on all four sides · borderRadius: 4px · overflow: hidden · flexDirection: column · rowGap: 16px · padding: 0px
- `.sd-87` / `.sd-99`: width `calc(50% - (var(--gap-h) * 0.5))` = 684px, height 689.094px; `.sd-87` justifyContent space-between, `.sd-99` justifyContent center
- `.sd-120` / `.sd-131`: flex 1 1 0%, width auto → 685px, height 386.19px, justifyContent space-between
### `.sd-88` / `.sd-100` — padding: 24px · rowGap: 56px · width: 682px · background: transparent · column
### `.sd-89` / `.sd-101` — column, rowGap 56px, width 100%, padding 0
### `.sd-90` / `.sd-102` / `.sd-114` / `.sd-125` (the 01–04 numerals)
- fontFamily: Inter, "Noto Sans JP" · fontSize: 12px · lineHeight: 13.2px · fontWeight: 400 · letterSpacing: -0.24px · color: rgb(247, 247, 247) · overflow: hidden
### `.sd-91` / `.sd-103` — flexDirection: row · columnGap: 48px · rowGap: 56px · padding: 0px 40px · justifyContent: center · width: 100%
### `.sd-93` / `.sd-105` (card serif titles) — rect `.sd-93` [89, 3720.56, 219.8, 93.59]
- fontFamily: "Instrument Serif" · fontSize: 78px · lineHeight: 93.6px · fontWeight: 400 · letterSpacing: -1.56px · color: rgb(247, 247, 247)
### `.sd-94` / `.sd-106` — fontSize: 17px · lineHeight: 23.8px · fontWeight: 500 · letterSpacing: -0.34px · color: rgb(172, 172, 172) · width **155px on `.sd-94`, 116px on `.sd-106`**
### `.sd-95` / `.sd-107` — fontSize: 14px · lineHeight: 23.8px · fontWeight: 400 · letterSpacing: -0.28px · color: rgb(172, 172, 172) · margin: 104px 0px 0px
- **`.sd-95` is `flex: 1 1 0%`, `.sd-107` is `flex: 0 0 auto`** — the only asymmetry between card 01 and card 02. Rect `.sd-95` [356.8, 3824.56, 286.2, 71.39].
### `.sd-96` / `.sd-108` — position: relative · column · rowGap: 16px · justifyContent: space-between · width 682px · height 378.508px
### `.sd-97` / `.sd-109` — aspectRatio: auto 5472 / 3040 · objectFit: fill · width: 100% (682px) · height: auto (378.508px) · borderRadius: 0px
### `.sd-98` / `.sd-110` (top fade over the card image) — rect `.sd-98` [25, 3935.95, 682, 200]
- background: linear-gradient(rgb(30, 30, 30) 0%, rgba(30, 30, 30, 0) 100%) · height: 200px · position: absolute · top: 0px · left: 0px · right: 0px · bottom: auto · zIndex: 1 · width: 100%
- Authored with Studio's gradient custom properties `--g-color-0: #1e1e1eff; --g-position-0: 0%; --g-color-1: #1e1e1e00; --g-position-1: 100%` (plus unused `--g-color-2..11`). The sliced CSS carries them; do not flatten the gradient.
### `.sd-111` / `.sd-122` (full-width rows) — rect `.sd-111` [24, 4379.46, 1392, 411.19]
- borderTop: 1px solid rgb(51, 51, 51) (other three 0px) · padding: 24px 0px 0px · columnGap: 24px · flexDirection: row · justifyContent: space-between · alignItems: stretch · margin: 0px · width: 100%
### `.sd-112` / `.sd-123` — flex: 1 · row · columnGap: 24px · justifyContent: space-between · minWidth: 0
### `.sd-113` / `.sd-124` — width: 212px · flexDirection: row · gap 0 · padding 0
### `.sd-115` / `.sd-126` — width: 448px · column · rowGap: 24px · justifyContent: space-between · minWidth: 0
### `.sd-117` / `.sd-128` — fontFamily: "Instrument Serif" · fontSize: 58px · lineHeight: 69.6px · fontWeight: 400 · letterSpacing: -1.16px · color: rgb(247, 247, 247)
### `.sd-118` / `.sd-129` — fontSize: 17px · lineHeight: 23.8px · fontWeight: 500 · letterSpacing: -0.02em · color: rgb(172, 172, 172)
### `.sd-119` / `.sd-130` (richText) — fontSize: 14px · lineHeight: 23.8px · fontWeight: 400 · color: rgb(172, 172, 172) · fontFeatureSettings: "palt" · `> p { margin: 0 }` · `strong { color: #f7f7f7ff; font-weight: 500 }` (no `<strong>` is authored inside either)
### `.sd-121` / `.sd-132` — aspectRatio: auto 5472 / 3080 · objectFit: fill · width: 100% (683px) · height auto (384.19px), so it fits its 386.19px wrapper at 1440 with no crop

## States & Behaviors
### Reveal `appear` ×4 (`.sd-87`, `.sd-99`, `.sd-120`, `.sd-131`)
- **Trigger:** IntersectionObserver in the Studio runtime, root = viewport, threshold 0, **no rootMargin** — the class is removed in the step where the element's top crosses below the viewport bottom. Measured @1440/900 after `history.scrollRestoration='manual'` + reload + `scrollTo(0,0)`, sampling every 50px: `.sd-87` flips between viewportTop 942 (still `appear`) and 892 (fired); `.sd-120` between 920 and 870. Fires once; scrolling back up never re-adds the class.
- **State A (armed):** opacity: 0; translate: 0px 16px. **State B (revealed):** opacity: 1; translate: none.
- **Transition:** transition-property `all` (plus the 25 `--g-*` gradient customs); transition-delay 400ms; transition-duration 800ms; transition-timing-function cubic-bezier(0.2, 1, 1, 1) — declared on the `.sd-NN.appear` rule itself, so it applies while the class is present. **All four carry the same 400ms delay — there is no stagger.**
- **After reveal** the runtime removes `appear` and leaves the empty attributes `data-appear`, `data-inited-appear` and an empty `style` on all four.
- **Evidence:** `extract/editor-ai.states.json` → `appear.triggerProbe1440.samples` (5 recorded steps) and `appear.armedComputed`; the rules `.sd-root .sd-87.appear { opacity:0; transition-delay:400ms; transition-duration:800ms; transition-timing-function:cubic-bezier(0.2,1,1,1); translate:0px 16px }` (identical for sd-99 / sd-120 / sd-131) in `css/main.css`.
- **Implementation approach:** `Appear` from `shared/appear.tsx` — `as="li"` for `.sd-87` / `.sd-99`, `as="div"` for `.sd-120` / `.sd-131`; `activeClass={false}` (the origin never uses `appear-active` here); `once`.
### Hover / focus states
N/A — verified three ways: `__cloneSnap.rules('main > .sd-79')` returned `{hits: [], total: 0}`; `mouse.move` onto the `.sd-87` copy block, the `.sd-97` image and card `.sd-99` at scrollY 3800 each changed **0** of 69 nodes across backgroundColor / color / opacity / transform / borderColor / boxShadow / filter / scale; `__cloneSnap.animations('main > .sd-79')` returned `{count: 0}`. The section contains 0 `<a>`, 0 `<button>`, 0 form controls, 0 `[data-toggle-*]`.
### Dark-zone edges
`.sd-45` (white, bottom 3319.37) and `.sd-133` (white, top 5361.84) butt directly against `.sd-79` with zero overlap and zero gradient bleed — the dark band is exactly the `.sd-79` border box, and its own `padding: 96px 0` (64px 0 at ≤480) is the only breathing room. No neighbour paints into it.

## Per-State Content
N/A — single state.

## Assets
- `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/s-5472x3040_v-frms_webp_3f01b21f-daf6-487a-8507-22cfa2acd455_middle.webp` — `.sd-97` (card 01), objectFit fill, rendered 682×378.51 @1440 · 718×398.48 @768
- `public/sites/.../images/s-5472x3040_v-frms_webp_e605ad0a-fa6b-4594-8a45-3d852ebf534e_middle.webp` — `.sd-109` (card 02), same rendered sizes
- `public/sites/.../images/s-5472x3080_v-frms_webp_addb103c-efd7-4e76-99dd-f31208bede0a_middle.webp` — `.sd-121` (row 03), rendered 683×384.19 @1440 · 718×403.88 @768
- `public/sites/.../images/s-5472x3080_v-frms_webp_a3dd9297-5346-4589-962c-c34cc8830429_middle.webp` — `.sd-132` (row 04), same rendered sizes
- Icons: none. Layered composition: `.sd-98` / `.sd-110` are absolute 200px `#1e1e1e → transparent` top fades at z 1 over `.sd-97` / `.sd-109`; nothing else stacks.
- MISSING: the `_small.webp` variant of all four, which the runtime swaps in at 390 (`img.currentSrc` measured). Listed url → path in `extract/editor-ai.assets.json` for the orchestrator to fetch. The builder should ship both variants and select by width the way the origin does; if only `_middle` is available, use it at all three widths and record it as a known deviation.

## Text Content (verbatim)
- `span.sd-82`: `Editor AI` · `span.sd-83`: `AIが伴走する、<br>最速の制作体験。`
- `div.richText.sd-85` (one `<p>`): `Editor AIは、クリエイターに全く新しい制作体験を提供します。<br>ドラフト文章の作成はもちろん、直感的な画像編集、<strong>面倒だった作業も自動で代行。</strong>すべての作業が、これまでにない速さに。`
- `p.sd-90`: `01` · `span.sd-93`: `Image AI` · `span.sd-94`: `画像を「探す」から 「編集する」へ` (U+2028 LINE SEPARATOR (corrected after review: it is not a space) between `から` and `「編集`) · `p.sd-95`: `指示を出すだけで、<br>画像素材を自在に編集可能に。<br>素材探しのストレスから、自由になろう。`
- `p.sd-102`: `02` · `span.sd-105`: `Text&nbsp;AI` (**U+00A0 no-break space** between `Text` and `AI` — write it as `{'Text AI'}`) · `span.sd-106`: `あなた専属のコピーライター` · `p.sd-107`: `プロンプトひとつで、<br>あなたの意図に沿った文章を自動生成。<br>他言語翻訳なども、もっと簡単に。`
- `p.sd-114`: `03` · `span.sd-117`: `Auto Layer Rename` · `span.sd-118`: `自動でリネーム、自動で整理` · `div.richText.sd-119` (one `<p>`): `煩雑なレイヤーの整理もStudioにお任せ。<br>各レイヤーを自動で命名、サイト構造がよりわかりやすく。`
- `p.sd-125`: `04` · `span.sd-128`: `Auto Responsive` · `span.sd-129`: `あっという間に、レスポンシブ対応` · `div.richText.sd-130` (one `<p>`): `1つのデザインで、すべてのデバイスに対応。<br>制作したレイアウトを、自動でレスポンシブ対応します。`
- `img.sd-97` alt: `サンプル画像：黒い背景の上に複数の画像が浮かび上がるように並んでいる。赤みがかったオレンジ色の背景に横向きの人物シルエットが映された画像が中央手前に配置され、その奥で同じ構成・異なる色味の写真が放射状に並んでいる。`
- `img.sd-109` alt: `サンプル画像：暗い背景に韓国語・日本語・英語など複数言語のテキストが記載されたカードが並んでいる。中央の英語カードのみ発光しているようなピンク色のエフェクトと赤い円形アイコンが追加され、他のカードより強調されている。`
- `img.sd-121` alt: `サンプル画像：デザインエディタ画面の切り取り。左側にレイヤーパネル、右側に人物写真が並ぶ。レイヤーパネルの中には階層構造を示すレイヤー名が縦に並んでおり、リネーム中のレイヤーはピンク色のテキストと細長い線で強調して表示されている。`
- `img.sd-132` alt: `サンプル画像：黒い画面の中央にWebサイトのデザインが配置され、その背景に赤いガイドラインやレスポンシブ時のレイアウト例が薄く表示されている。Webサイトはオレンジ色基調の人物写真や英文で構成されている。`
- No links, no buttons, no aria-label, no placeholder anywhere in this section.

## Responsive Behavior
- **Desktop (1440):** header row `.sd-80` is one row — `h2.sd-81` (920 wide: eyebrow 212 + headline 684) then `.sd-84` (448). `ul.sd-86` = row 1 of two 684px cards (`.sd-87`, `.sd-99`) at rowGap 64, then two full-width rows `.sd-111` / `.sd-122`, each 212px numeral column + 448px copy column + a flex-1 image card. Section padding 96px 0.
- **Tablet (768):** `@media (max-width: 1280px)` turns `.sd-81` into a column (`flex-direction: column; min-width: auto`, gap 24) so the eyebrow sits above the headline, drops `.sd-95` / `.sd-107` margin-top 104 → 0, stacks `.sd-91` / `.sd-103` into a column at rowGap 40 with padding 0, and turns `.sd-112` / `.sd-123` into columns. `@media (max-width: 768px)` then sets `.sd-80 { padding: 24px 0 64px }`, `.sd-85 { font-size: 0.81rem }` (→ 12.96px / lineHeight 22.032px) with `.sd-85 strong { font-size: 13px }`, `.sd-86 { gap: 24px 24px }` (rowGap 64 → 24), `.sd-87 / .sd-99 / .sd-120 / .sd-131 { width: 100%; max-width: 100% }`, `.sd-84 { flex: none; margin: 0; width: 100% }`, and `.sd-111 / .sd-122 { flex-direction: column }` with `.sd-113 / .sd-115 / .sd-124 / .sd-126 { flex: none }`. Everything is one 720px-wide column. Section top 2737.36, height 3420.41. Key rects: `.sd-87` 720×770.46, `.sd-97` 718×398.48, `.sd-120` 720×309.03. **`.sd-121` is 718×403.88 inside a 309.03px-tall `.sd-120`** — `overflow: hidden` crops 94.85px off the bottom of the image; reproduce it, it is visible in `editor-ai-768-c.png`.
- **Mobile (390):** `@media (max-width: 480px)` sets `.sd-79 { padding: 64px 0 }`, `.sd-80 { padding: 24px 0 48px }`, `.sd-87 / .sd-99 { gap: 0 }`, `.sd-88 / .sd-100 { gap: 32px 0 }`, `.sd-93 / .sd-105 { font-size: 3.5rem }` (→ 56px / lineHeight 67.2px), `.sd-94 / .sd-106 / .sd-118 / .sd-129 { font-size: 0.875rem }` (→ 14px), `.sd-98 / .sd-110 { height: 100px }`, `.sd-116 / .sd-127 { gap: 4px 0 }`, `.sd-117 / .sd-128 { font-size: 2.5rem }` (→ 40px / lineHeight 48px), and `.sd-111 { align-items: flex-start; justify-content: flex-start }`. In `app/studio-base.css` the same query drops `.text.theme-b6b0338f` to 0.75rem (`.sd-82` → 12px / 13.2px / -0.48px) and `.text.theme-57a9da79` to 1.75rem (`.sd-83` → 28px / 35px). Section top 3549.87, height 2317.27. Key rects: `.sd-87` 342×490.07, `.sd-97` 340×188.70, `.sd-120` 342×187.67 with `.sd-121` 340×190.96 (3.29px bottom crop). The 4 images swap to their `_small.webp` variant here.
- **Breakpoints used:** `(max-width: 1280px)`, `(max-width: 768px)`, `(max-width: 480px)` — all three appear in this section's slice. There is no `(max-width: 360px)` rule for `sd-79..132`.

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/editor-ai.1440.json` (50 nodes, rootRect [0, 3319, 1440, 2042])
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/editor-ai.768.json` (50 nodes, rootRect [0, 2737, 768, 3420])
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/editor-ai.390.json` (50 nodes, rootRect [0, 3550, 390, 2317])
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/editor-ai.states.json` (50 nodes + styleTable mirrored from the 1440 pass, plus rules, animations, texts, hover diffs, appear trigger probe, dark-zone edges, per-width rect + style tables)
- The 4 missing `_small.webp` url → path entries live in the assets JSON named in the **Assets** section above.

## QA Exclusions
none — the section has no video, no canvas, no live counter, no autoplaying carousel and no third-party embed; every pixel is static once the reveals have run. Two diffing preconditions instead of rects: (1) scroll the whole page and wait ≥1200ms so all 4 `appear` reveals have completed (opacity 1, translate none) before capturing, otherwise the four cards diff at opacity 0; (2) the reference tiles are scrolled viewport captures, so mask the fixed `#header` band — `x 0, y 0, w 1440, h 128` @1440 · `w 768, h 108` @768 · `w 390, h 76` @390, in tile coordinates, on whichever tile it lands on.
