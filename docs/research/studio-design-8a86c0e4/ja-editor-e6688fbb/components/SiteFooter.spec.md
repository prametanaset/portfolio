# SiteFooter Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `footer.symbol-3` · DOM order 13 of 13 (last element of `div.box.sd-1`, sibling of `main.sd-2`)
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/SiteFooter.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/site-footer-1440.png` + `-1440-b.png`, `site-footer-768.png` + `-768-b.png` + `-768-c.png`, `site-footer-390.png` + `-390-b.png`, hover states `site-footer-1440-hover-{arrowlink,textlink,heading}.png`, accordion states `site-footer-390-open-{1..5}.png` + `-390-open-multi.png`
- **Interaction model:** mixed (time-driven marquee + hover + click accordions ≤480 only)
- **Client component:** yes — the `sd-loop-box` marquee needs a Web Animation; the 5 accordions need open state (delegated to `FooterAccordionNav`)
- **Root rect @1440:** x 0, y 12760.95, w 1440, h 1135.19 · **@768:** 0, 13146.05, 768, 4661.13 · **@390:** 0, 14376.54, 390, 1046.62
- **Sub-components:** `FooterAccordionNav` (`div.box.symbol-3__sd-192`, mobile-only, own spec `FooterAccordionNav.spec.md`); `FooterMarquee` may stay inline in `SiteFooter.tsx`. **Non-DOM content:** none (no canvas, no video, no Lottie).
- **CSS slice command:** `node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs 'symbol-3*' 'list-2*' theme-87bf3e6d theme-35b9fc8a --out app/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/site-footer.css` (745 rules). Live class census = `symbol-3`, `symbol-3__sd-1`…`symbol-3__sd-451`, `list-2`, `list-2__item`, `list-2__item__sd-1`, `theme-87bf3e6d`, `theme-35b9fc8a`, plus base-layer `box text img icon appear toggle material-symbols-outlined` and the runtime-only `loop-sizer loop-track loop-clone` (no CSS rules anywhere — inline styles only). `sd-loop-box { overflow: hidden !important }` and `sd-loop-box > .img { max-width:100%; height:auto }` already ship in `app/studio-base.css`.

## DOM Structure
```
footer.box.symbol-3                                    relative, z 4, bg #fff, padding 0 24px, flex-wrap wrap, column-gap 24px
  div.box.symbol-3__sd-1                               marquee frame, width 100vw, margin-bottom 64px
    sd-loop-box.box.symbol-3__sd-2  speed="80"         overflow hidden (base CSS); runtime injects:
      div.loop-sizer   [visibility:hidden]  > ul.box.list-2 > li.box.list-2__item ×12 > img.list-2__item__sd-1 (+<noscript> copy)
      div.loop-track   [position:absolute;left:0]      > ul.box.list-2 (copy) + div.loop-clone (copy)  → 36 <li> live
  div.box.symbol-3__sd-3                               desktop link grid, 1392 wide, column-gap 24; display:none at ≤480 for its sd-7 child
    div.symbol-3__sd-4 > a.symbol-3__sd-5[href=https://studio.design/ja] > img.symbol-3__sd-6  width 462 height 100 alt="Studio"
    div.box.symbol-3__sd-7                             4 flex:1 columns, column-gap 24
      div.sd-8   (プロダクト)  rowGap 64 → 3 groups sd-9 / sd-24 / sd-33, each = heading row + link stack
      div.sd-43  (活用方法)   rowGap 20 → 4 groups sd-46+50 / 55+59 / 66+70 / 75+79
      div.sd-84  (リソース)   rowGap 20 → 4 groups sd-87+91 / 108+112 / 121+125 / 139+143  (arrow links)
      div.sd-151 (導入事例 sd-152 · サポート sd-160 · flat list sd-178)
    heading row  = p.text.symbol-3__sd-N + div.sd-(N+1) > div.sd-(N+2)     the 15×1.5 bar, display:none >480
    plain link   = a.text.symbol-3__sd-N                                   (sd-20…23, 30…32, 39, 40, 51…53, 60…64, 71…73, 80…83, 158, 159, 166, 167, 179, 190, 191)
    arrow link   = a.box.symbol-3__sd-N > p.text + div.box (16×16 clip) > span.icon ×2 material-symbols-outlined "arrow_forward"
                   (sd-41/92/97/102/113/118/126/131/133/144/146/168/173/180/185)
  div.box.symbol-3__sd-192                             MOBILE accordion nav — see FooterAccordionNav.spec.md (display:none >480)
  div.box.symbol-3__sd-434                             Follow Us row, margin-top 104
    div.sd-435 > p.text.sd-436 "Follow Us" + div.sd-437 (80×1 rule, #acacac; display:none ≤1280)
    div.sd-438 > a.text.sd-439 X（Twitter） · sd-440 YouTube · sd-441 note · sd-442 Facebook   (441/442 display:none at EVERY width)
  div.box.symbol-3__sd-443                             copyright band, bg #f7f7f7, margin 24px -24px 0, padding 24px 0, full-bleed
    div.sd-444 > p.text.sd-445 © line · div.sd-446 (日本語|区切り|English — display:none at EVERY width) · div.sd-450 > a.text.sd-451 English
```

## Computed Styles (exact, getComputedStyle @1440 dpr 1; y is relative to the footer top)
### `footer.symbol-3` (S1 in `site-footer.1440.json`)
- position: relative · zIndex: 4 · display: flex · flexWrap: wrap · justifyContent: center · alignItems: flex-start
- width: 1440px · height: 1135.19px · padding: 0px 24px · columnGap: 24px · backgroundColor: rgb(255, 255, 255) · borderRadius: 0px
### `.symbol-3__sd-1` / `sd-loop-box.symbol-3__sd-2` — rect [0,0,1440,175.46]
- width: 100vw · maxWidth: 100vw · margin: 0px 0px 64px · flexDirection: column · alignItems: center — `div.sd-1`
- sd-2: flexDirection: row · gap: 16px · width: 100% · overflow: hidden (`sd-loop-box{overflow:hidden!important}`)
### `.list-2` / `.list-2__item` / `.list-2__item__sd-1`
- list-2: display: flex · flexDirection: row · flexWrap: nowrap · justifyContent: center · gap: 24px 56px · width: 4456px (content-driven inside `.loop-track`)
- width: 320px · borderRadius: 2px · flexDirection: column · justifyContent: center · mixBlendMode: normal — `li.list-2__item`
- width: 320px · height: 175.46px · objectFit: fill · overflow: clip · aspect 1440/790 — `img.list-2__item__sd-1`
### `.symbol-3__sd-6` (wordmark img) — rect [24,239.46,112,24.24] · width: 112px · height: auto · aspectRatio: auto 462 / 100 · objectFit: fill · cursor: pointer
### Column heading `p.symbol-3__sd-11` (+ 44 / 85 / 154 / 162; class `theme-87bf3e6d`)
- fontSize: 16px · fontWeight: 600 · lineHeight: 20.8px · letterSpacing: 0.16px · color: rgb(34, 34, 34) · fontFamily: Inter, "Noto Sans JP" · fontFeatureSettings: "palt"
### Sub-heading `p.symbol-3__sd-16` (+ 26 / 35 / 47 / 56 / 67 / 76 / 88 / 109 / 122 / 140)
- fontSize: 13px · fontWeight: 400 · lineHeight: 16.9px · letterSpacing: 0.13px · color: rgb(34, 34, 34) · opacity: 0.75 · fontFeatureSettings: "palt"
### Plain link `a.symbol-3__sd-20` (style S-link, ×30) — rect [260,305.16,106.13,31.37]
- fontSize: 14.08px · fontWeight: 400 · lineHeight: 23.3728px · letterSpacing: 0.704px · color: rgb(34, 34, 34) · padding: 4px 0px · opacity: 1
- transitionDuration: 0.2s · transitionTimingFunction: cubic-bezier(0.2, 1, 1, 1)
### Arrow link `a.symbol-3__sd-92` (style S-arrow, ×15) — rect [850,305.16,146.51,31.37]
- a: flexDirection: row · columnGap: 4px · transitionDuration: 0.8s / cubic-bezier(0.2, 1, 1, 1)
- p (sd-93): same as S-link · div (sd-94): width 16px · height 16px · overflow: hidden · justifyContent: flex-end · gap: 4px
- span sd-95 (aria-hidden): Material Symbols Outlined ligature `arrow_forward` · fontSize: 16px · color: rgb(34,34,34) · rotate: -45deg · translate: 0px 12px
- span sd-96 (aria-label="新規タブで開く" role="img"): identical, rotate: -45deg · translate: none
### Follow Us block
- sd-434: flexDirection: row · columnGap: 24px · margin: 104px 0px 0px · rect [24,1014,1392,26.2]
- fontSize: 10px · fontWeight: 400 · lineHeight: 16.6px · color: rgb(34,34,34) — `p.sd-436`, rect [24,1018.79,46.88,16.59]
- backgroundColor: rgb(172, 172, 172) · width: 80px · height: 1px · margin: 0px 0px 0px 16px — `div.sd-437`
- gap: 32px — `div.sd-438`
- fontSize: 14px · fontWeight: 500 · lineHeight: 18.2px · letterSpacing: 0.42px · padding: 4px 0px — `a.sd-439`, class `theme-35b9fc8a`
### Copyright band
- backgroundColor: rgb(247, 247, 247) · margin: 24px -24px 0px · padding: 24px 0px · width: calc(100% + 48px) — `div.sd-443`, rect [0,1064.19,1440,71]
- sd-444: flexDirection: row · flexWrap: wrap · justifyContent: space-between · margin: 0px 24px · maxWidth: calc(100% - 48px)
- fontSize: 11px · lineHeight: 18.26px · letterSpacing: -0.22px · color: rgb(34,34,34) · fontFeatureSettings: "palt" — `p.sd-445`
- fontSize: 14px · lineHeight: 23.24px · letterSpacing: -0.28px · opacity: 0.7 — `a.sd-451`, rect [1370.23,1088.07,45.77,23.23]
### `theme-*` vs `.sd-NN` precedence
`.sd-root .text.theme-87bf3e6d` / `.theme-35b9fc8a` are specificity (0,3,0) and beat `.sd-root .symbol-3__sd-N` (0,2,0). Verified: none of sd-11/44/85/154/162/179/181/186/190/191/439/440/441/442 declares `font-size|font-weight|letter-spacing|line-height` itself, so the two theme rules are the **only** source of typography for those 14 nodes — the slice must include both tokens.

## States & Behaviors
### Marquee (`sd-loop-box.symbol-3__sd-2`, attribute `speed="80"`)
- **Trigger:** runs from load, unconditionally. **Not** hover-stopped, **not** IntersectionObserver-gated.
- **Runtime DOM:** the authored `<ul class="box list-2">` (12 `<li>`) is left inside `div.loop-sizer` (`visibility:hidden`, `min-width:100%`, inline flex row) as a height spacer; a second copy plus a third `div.loop-clone` copy live inside `div.loop-track` (`position:absolute; left:0; height:100%; transition:none; width:<trackW>px`). 36 `<li>` and 37 `<img>` exist live (12×3 + the wordmark).
- **Animation:** `element.animate` on `.loop-track`, keyframes `translateX(0px)` → `translateX(-(trackW+16)px)`, easing `linear`, `iterations: Infinity`, `playbackRate: 80`, `duration = (trackW+16)*1000 ms` ⇒ a constant **80 px/s leftwards** at every width. Measured: @1440 trackW 4456 / dur 4472000 / end -4472; @768 17632 / 17648000 / -17648; @390 2816 / 2832000 / -2832.
- **Evidence:** `getAnimations()` on `.loop-track` returned exactly this one Animation, `playState: "running"`; currentTime advanced 159351 in 2000 ms of wall clock (79.7 px/s) and kept advancing while the pointer sat on the band. There are no CSS `@keyframes` anywhere in the origin stylesheet.
- **Implementation approach:** one `useEffect` calling `track.animate([...],{duration,easing:'linear',iterations:Infinity})` then `anim.playbackRate = 80`, after measuring `track.scrollWidth`. Re-measure on resize.
### Accordions (5 × `sd-toggle`) — see `FooterAccordionNav.spec.md`
`div.symbol-3__sd-192` is `display:none` at 1440 and 768, so the 5 toggles are completely inert there (zero-size rects, no focus, no click target). They are interactive only at `(max-width: 480px)` and below.
### Reveal (`appear`, 10 targets — all inside `.symbol-3__sd-192`)
- **Targets:** `.symbol-3__sd-195 / 242 / 290 / 306 / 384 / 415 / 418 / 424 / 430 / 433` (the accordion / link labels).
- **Effect:** a white curtain wipe painted as the element's own background — `background: linear-gradient(90deg, rgba(255,255,255,0) <p>, rgb(255,255,255) <p>)` with `--g-position-0/--g-position-1` = **0% while `.appear` is present → 100% once it is removed**.
- **Transition:** transition-delay 100ms · transition-duration 800ms · transition-timing-function `cubic-bezier(0.5, 0, 0, 1)` — identical for all 10; there is no `.appear-active` rule for `symbol-3`.
- **Trigger:** per-element IntersectionObserver, class `appear` removed when the element enters the viewport. **Evidence @390 fresh load:** all 10 carried `appear` before scrolling; after one scroll to `footerTop-400` the first 4 had lost it (gradient stop 78.4% mid-flight → 100%) while the 6 still below the fold kept it. At 1440/768 the 10 never fire because their ancestor is `display:none`.
### Hover states (re-measured live at 1440; header pill excluded from the probe points)
- **Plain link `a.symbol-3__sd-20`** and siblings 21, 22, 23, 30, 31, 32, 39, 40, 51, 52, 53, 60, 61, 62, 63, 64, 71, 72, 73, 80, 81, 82, 83, 166, 167, 185, 190 — opacity: 1 → **0.75**, 0.2s cubic-bezier(0.2, 1, 1, 1).
- **`a.symbol-3__sd-158`, `159`, `179`, `191`, `439`, `440`** — opacity: 1 → **0.7**.
- **Arrow link `a.symbol-3__sd-92`** (and 97, 102, 113, 126, 133, 146, 168, 173, 180): the `<a>` opacity stays 1; its `<p>` → opacity **0.7**; the two glyphs slide inside the 16×16 `overflow:hidden` chip — sd-95 `translate: 0px 12px → 18px` (x 921.76 → 939.76), sd-96 `translate: none → 12px -12px` (x 941.76 → 953.76); `rotate` stays -45deg on both. `:hover > * { --gap-h: 4px }` matches the resting 4px, so the gap does not move.
- **Arrow link without glyphs `a.symbol-3__sd-118`, `131`, `144`, `41`** — the `<a>` stays 1, only the inner `<p>` (119 / 132 / 145 / 42) → opacity **0.7**.
- **`a.symbol-3__sd-451` (English)** — textDecorationLine: none → **underline** (no opacity change).
- **`a.symbol-3__sd-413 / 416 / 422 / 428 / 431`** — `:hover { transition-timing-function: cubic-bezier(0, 1, 0.5, 1) }` only (mobile-only nodes; see the sub-spec).
- **No hover rule and no measured change:** `a.symbol-3__sd-5` + `img.symbol-3__sd-6` (wordmark), `li.list-2__item`, `img.list-2__item__sd-1`, `.symbol-3__sd-447 / 449` (both display:none anyway).
### Scroll
No scroll-linked state: `position: relative`, no sticky child, no scroll listener effect. The marquee is time-driven, not scroll-driven.
### Adjacency with the Stock band above
`main.sd-2` bottom = 12760.95 = `footer.symbol-3` top: the two edges are flush, no gap and no overlap. `StockBandSection` (`.sd-331`) ends on black/`overflow:hidden`; the footer's own `rgb(255,255,255)` starts immediately. The body background `rgb(247,247,247)` is never visible between them. The footer's own `z-index: 4` sits above the Stock band's stacking context.

## Per-State Content
The desktop grid renders one fixed tree (single state). The 5 accordion states are documented in `FooterAccordionNav.spec.md` with their measured open heights and screenshots.

## Assets
All 13 distinct URLs resolve to files already on disk under `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/`. **MISSING: none** (`extract/site-footer.assets.json` is an empty missing-list).
- `images/s-462x100_063f63d1-97e2-47ac-9aa5-31bb671abdfe.svg` — wordmark, `img.symbol-3__sd-6`, rendered 112×24.24 @1440 and @768, 112×24.24 @390, objectFit fill, `width="462" height="100"`, alt `Studio`.
- 12 marquee thumbnails, each `img.list-2__item__sd-1` inside one `li.list-2__item`, each rendered **3×** (sizer + track copy + `.loop-clone`) = 36 `<img>`; rendered 320×175.46 @1440, 5604.16×3074.50 @768, 220×120.63 @390; objectFit fill. In DOM order: `images/s-1440x790_v-fms_webp_4e2b3a41-40d5-42b3-8905-327b8d2e54af_small.webp` (poporpop) · `…_773373a5-098d-4561-9bd2-89da8bca7092_small.webp` (PROS) · `…_4d1f7529-b8e8-41cf-afc0-94c8c9c4b761_small.webp` (ANATOMICA) · `…_9c778003-1574-4fc7-a9a1-029f8dee95af_small.webp` (doda) · `…_e5539cec-bede-4b8b-b1c6-01ff4475524e_small.webp` (Wedding invitation) · `…_94bb0a25-e722-46bb-94ac-a60d74becbb3_small.webp` (スペースマーケット) · `…_057d7f8b-9721-49fd-b8c4-b8f63454cb5c_small.webp` (Next 10 Chairs) · `…_84785f8a-3ea7-477d-bdef-7e303ec884a9_small.webp` (ランディーズドーナツ) · `…_19349c0a-e2df-422c-9d8a-5e3389a11701_small.webp` (早苗饗レモン) · `…_034943b5-1a91-41dc-a6cc-c0e3aa344283_small.webp` (Coalition Group) · `…_291f6395-5ba1-44b1-ae07-e43ec6a1cb6b_small.webp` (KURATECA) · `…_b054ee16-f3e6-4cb9-855e-148eb61ab0e8_small.webp` (WoodSpirits). Full alt strings under **Text Content**.
- The origin ships these as `src="data:image/svg+xml,…"` placeholders + `data-sd-img-src="…png"` (hidden by `img[data-sd-img-src]{display:none}`) and the Studio runtime swaps in the `_small.webp` at DPR 1; the clone should point `src` straight at the local `_small.webp` and drop the `data-sd-img-src` / `<noscript>` pair.
- Icons: 30 `arrow_forward` Material Symbols Outlined ligature spans in the desktop grid (15 links × 2) — use `MaterialSymbol` from `components/sites/studio-design-8a86c0e4/shared/icons.tsx`, fontSize 16px, box 16×16.
- Layered composition: inside each 16×16 `overflow:hidden` chip the two `arrow_forward` spans are laid out in a `justify-content:flex-end` row with 4px gap and pre-rotated `-45deg`; only one is visible at rest, the pair slides on hover.

## Text Content (verbatim)
- Wordmark: `a.sd-5` href `https://studio.design/ja`, `img.sd-6` alt `Studio`.
- **プロダクト** (sd-11): 構築 — `デザインエディタ` `/ja/editor` (`data-current`) · `CMS` `/ja/cms` · `フォーム` `/ja/form` · `SEO` `/ja/seo`; 運用 — `サイト運用<br>` `/ja/hosting` · `セキュリティ<br>` `/ja/lp/security` · `ワークスペース<br>` `/ja/workspace`; より自在に — `Figma to Studio<br>` `/ja/figma-to-studio` · `Lottie for Studio<br>` `/ja/lottie` · `アクセシビリティ` `/ja/accessibility` (this last one is an `a.box` wrapping `p.sd-42`).
- **活用方法** (sd-44): サイト種別から探す — `コーポレートサイト` `/ja/solutions/site-types/corporate` · `採用サイト<br>` `…/recruit` · `サービスサイト<br>` `…/service`; 業種から探す — `宿泊・レジャー` `/ja/solutions/industries/leisure` · `エンタメ` `…/entertainment` · `自治体` `…/local-government` · `飲食店<br>` `/ja/lp/solution/restaurant-homepage` · `小売・EC<br>` `/ja/lp/solution/ec-homepage`; 課題から探す — `マーケターでのLP運用` `/ja/solutions/usecases/landingpage` · `WordPressからの移行` `…/wordpress-migration` · `サイト導線の変更<br>` `…/site-improvement`; 企業タイプから探す — `エンタープライズ<br>` `/ja/lp/enterprise` · `制作会社・クリエイター` `/ja/creators` · `広告代理店・コンサル` `/ja/lp/solution/marketing-agency` · `スタートアップ<br>` `/ja/lp/startup`.
- **リソース** (sd-85): つくる・依頼する — `Studio Store` `https://studio.design/ja/store` (_blank) · `Studio Experts` `https://experts.studio.design/` (_blank) · `Studio Showcase` `https://showcase.studio.design/ja` (_blank); 学ぶ — `Studio Academy` `https://www.youtube.com/channel/UCh4_wCvICgiHg0utNFziOoQ` (_blank) · `お役立ち資料` `/ja/resources`; つながる — `Studio Community` `https://community-ja.studio.design/home` (_blank) · `全国ワークショップ` `/ja/lp/ambassador` · `セミナー` `https://lu.ma/studiodesign?k=c` (_blank); 読む — `最新情報` `/ja/whats-new` · `Studio Blog` `https://studio.design/ja/blog` (_blank).
- **導入事例** (sd-154): `事例インタビュー<br>` `/ja/customer-story` · `導入企業一覧<br>` `/ja/customer`. **サポート** (sd-162): `総合窓口` `https://studio.design/ja/support` · `よくある質問` `https://studio.design/ja/faq` · `ヘルプセンター` `https://help.studio.design/ja/` (_blank) · `システムステータス` `https://status.studio.design/` (_blank).
- **Flat list sd-178:** `料金プラン` `https://studio.design/ja/pricing` · `運営会社` `https://studio.inc/` (_blank) · `採用情報` `https://studio.inc/career` (_blank) · `利用規約・プライバシーポリシー` `https://studio.design/ja/terms` · `ユーザーガイドライン` `https://studio.design/ja/guidelines`.
- **Follow Us:** `Follow Us` (sd-436) · `X（Twitter）` `https://x.com/StudioDesign` · `YouTube` `https://www.youtube.com/channel/UCh4_wCvICgiHg0utNFziOoQ` · `note` `https://note.com/studio_design/` · `Facebook` `https://www.facebook.com/studiodesignapp/` — all `target="_blank"`; note and Facebook are `display:none` at every width but must stay in the markup.
- **Copyright band:** `© Studio Inc. All Rights Reserved.<br>` (sd-445) · hidden pair sd-446: `日本語` `/ja` + `English` `https://studio.design/` · visible sd-451 `English` `https://studio.design/`.
- Every arrow-link second glyph carries `aria-label="新規タブで開く" role="img"`; the first carries `aria-hidden="true"`. Both glyph texts are the literal ligature `arrow_forward`.
- Marquee alts, in DOM order: `poporpop | ｢想像を超えるポップ｣をつくるコンテンツ制作会社` · `PROS(プロス) | BtoB特化のUXデザイン・UIデザイン会社` · `ANATOMICA｜アナトミカ公式サイト` · `doda PRESENTS: パ・リーグ球団 仕事図鑑2025` · `Wedding invitation | 2025.10.12` · `スペースマーケットのテクノロジーページ` · `Next 10 Chairs` · `ランディーズドーナツ | LA発の大人気ドーナツ店が日本初上陸！` · `早苗饗レモン（さなぶりれもん） ` (trailing space is in the origin) · `Coalition Group Recruit Site` · `KURATECA | 倉敷化工株式会社` · `WoodSpirits`.

## Responsive Behavior
- **Desktop (1440):** footer 1440×1135.19, padding 0 24px. Marquee band 1440×175.46 (`list-2` gap 24px 56px, item 320px). Grid `.sd-3` 1392×670.53 at y 239.46: logo column 212 wide, then `.sd-7` (1156) holding 4 flex:1 columns at x 260 / 555 / 850 / 1145, column-gap 24. Follow Us row at y 1014 (row layout, 80×1 rule visible). Copyright band 1440×71 at y 1064.19.
- **Tablet (768):** footer top 13146.05, **height 4661.13** — this is the origin's own layout blow-up, not a capture error: `@media (max-width:768px) .list-2__item { width: calc(32% - (var(--gap-h) * 0.68)) }` resolves the percentage against the shrink-to-fit `.list-2` inside the absolutely-positioned `.loop-track`, so one card measures 5604.16×3074.50, `.loop-track` reaches 17632px and `.symbol-3__sd-1` becomes 3074.5 tall. Recon measured the same page height (17807) independently. Also at ≤768: `.list-2` gap 24px 32px (from `@media (max-width:1280px)`), `.symbol-3__sd-7 { gap: 40px 16px }` and each of sd-8/43/151 becomes `width: calc(50% - (var(--gap-h) * 0.5))` → 2×2 columns; `.symbol-3__sd-434 { flex-direction: column }`; `.symbol-3__sd-437` display:none (from `@media (max-width:1280px)`). Grid `.sd-3` 720×1280.84 at y 3138.5, copyright band 768×71.
- **Mobile (390):** footer 390×1046.62, padding **24px 16px 0px** (`@media (max-width:480px) .symbol-3`). `.list-2` gap 24px 16px, `.list-2__item` width 220px → band 390×120.63 at y 24, `.loop-track` 2816px. `.symbol-3__sd-7 { display:none }` so `.sd-3` shrinks to 358×48.24 (logo only) at y 208.63. `.symbol-3__sd-192 { display:flex }` → the accordion nav 358×591.95 at y 256.87. Follow Us at y 888.83 (margin-top 40, gap 16px 24px). Copyright band 390×59 at y 987.62 (margin 40px -16px 0, padding 24px 0 12px).
- **Breakpoints used:** `(max-width: 1280px)`, `(max-width: 768px)`, `(max-width: 480px)`, `(max-width: 360px)` — the only width queries in `css/main.css`; the slice carries all four. Exact rule text per selector is in `extract/site-footer.states.json`.
- Dead-but-keep rules: sd-8/12/17/43/151/179/190 all gain `display:flex` / `height:72px` / `border-bottom:1px solid rgb(225,225,225)` at ≤480, but their ancestor `.symbol-3__sd-7` is `display:none` there, so they never render at 390 — keep the rules in the slice verbatim and do not "fix" them.

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/site-footer.1440.json` (176 nodes, 98 style buckets, rootRect [0,12761,1440,1135])
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/site-footer.768.json` (176 nodes)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/site-footer.390.json` (176 nodes)
- State/behaviour evidence and the missing-asset list live beside them as `site-footer.states.json` (geometry per viewport, adjacency, 120 pseudo-class rules, 2 hover passes, the 5-toggle state-machine trace, the appear trace, the 37-image inventory, the loop-box runtime record) and `site-footer.assets.json` (missing list empty), in the same `extract/` directory.

## QA Exclusions
The marquee band is the only region that can never match pixel-for-pixel — it translates 80 px/s and has no rest frame. Exclude, relative to the footer top: **@1440 `(0, 0, 1440, 175.46)`** · **@768 `(0, 0, 768, 3074.50)`** · **@390 `(0, 24, 390, 120.63)`**. Everything else is static; diff the remainder at the default 1.5 percent.
