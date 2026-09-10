# FooterAccordionNav Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `footer.symbol-3 > div.box.symbol-3__sd-192` · sub-component of `SiteFooter` (DOM order 13 of 13)
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/FooterAccordionNav.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/site-footer-390-b.png` (all closed), `site-footer-390-open-{1..5}.png`, `site-footer-390-open-multi.png` (two open at once)
- **Interaction model:** click-driven (verified — hover does nothing, Escape does nothing, outside click does nothing)
- **Client component:** yes — 5 independent disclosures, each with its own 800 ms closing timer
- **Root rect @1440:** not rendered — `display: none` · **@768:** not rendered — `display: none` · **@390:** x 16, y 14633.41 page / 256.87 relative to the footer top, w 358, h 591.95
- **Sub-components:** none. **Non-DOM content:** none.
- **CSS slice command:** covered by the parent's slice (`symbol-3*`). Classes rendered here: `symbol-3__sd-192` … `symbol-3__sd-433`, plus base-layer `box text icon toggle appear material-symbols-outlined`.

## DOM Structure
```
div.box.symbol-3__sd-192                       display:none >480 · flex-wrap wrap · justify-content center · width 358
  sd-toggle.toggle.symbol-3__sd-193            border-bottom 1px solid #eaeaeaff · flex column · h 59.20     ×5: 193 / 240 / 288 / 304 / 382
    button.box.symbol-3__sd-194  data-toggle-trigger aria-expanded="false" type="button"
      span.text.symbol-3__sd-195.appear        the label
      div.box.symbol-3__sd-196                 15×1.5 plus-sign box, scale 0.9
        div.box.symbol-3__sd-197               horizontal bar, 15×1.5, #707070ff
        div.box.symbol-3__sd-198               vertical bar, absolute left 0 top 0, 15×1.5, #707070ff, rotate 0deg opacity 0 by default
    div.box.symbol-3__sd-199  data-toggle-content aria-hidden="true" inert    overflow hidden, height driven inline
      div.box.symbol-3__sd-200                 panel body, row-gap 16, padding-bottom 16
        group = p.text (label) + div.box holding a.box > div.box > p.text  (some links add the 2-glyph arrow chip)
  a.box.symbol-3__sd-413 > div.sd-414 > span.text.sd-415.appear             料金プラン           (same 59.20 row, z-index 2)
  a.box.symbol-3__sd-416 > div.sd-417 > span.sd-418.appear + div.sd-419 (16×16 clip) > span ×2   運営会社 ↗
  a.box.symbol-3__sd-422 > div.sd-423 > span.sd-424.appear + div.sd-425 (16×16 clip) > span ×2   採用情報 ↗
  a.box.symbol-3__sd-428 > div.sd-429 > span.sd-430.appear                  利用規約
  a.box.symbol-3__sd-431 > div.sd-432 > span.sd-433.appear                  ユーザーガイドライン
```
Toggle ids — root / trigger / content / panel body: `193 / 194 / 199 / 200` · `240 / 241 / 246 / 247` · `288 / 289 / 294 / 295` · `304 / 305 / 310 / 311` · `382 / 383 / 388 / 389`.

## Computed Styles (exact, getComputedStyle @390 dpr 1; y relative to the footer top)
### `.symbol-3__sd-192` (S27 in `site-footer.390.json`) — rect [16, 257, 358, 591.95]
- display: flex · flexWrap: wrap · justifyContent: center · alignItems: center · width: 358px · maxWidth: 100% · margin: 0px
### `.symbol-3__sd-193` (S28, ×5) — rect [16, 257, 358, 59.20]
- display: flex · flexDirection: column · alignItems: flex-start · width: 358px · height: 59.1953px
- borderBottom: 1px solid #eaeaeaff · borderRadius: 0px · background: rgba(0, 0, 0, 0)
### `.symbol-3__sd-194` (S29, trigger button) — rect [16, 257, 358, 58.20]
- display: flex · flexDirection: row · justifyContent: space-between · alignItems: center · gap: 0px
- padding: 20px 4px · width: 100% · cursor: pointer · transitionDuration: 800ms
### `.symbol-3__sd-195` (S30, label; ×5 with 242 / 290 / 306 / 384) — rect [20, 277, 64.78, 18.20]
- fontFamily: Inter, "Noto Sans JP" · fontSize: 14px · fontWeight: 500 · lineHeight: 18.2px · letterSpacing: 0.42px
- color: rgb(34, 34, 34) · textAlign: center · fontFeatureSettings: "palt"
- backgroundImage: linear-gradient(90deg, rgba(255,255,255,0) 100%, rgb(255,255,255) 100%) — the reveal curtain, see States
### `.symbol-3__sd-196` / `197` / `198` (plus sign) — rect [356, 285, 15, 1.5]
- gap: 0px · padding: 0px · scale: 0.9 0.9 · display: flex · justifyContent: center · alignItems: center — `div.sd-196`
- background: #707070ff · width: 15px · height: 1.5px · flex: none — `div.sd-197`
- background: #707070ff · width: 15px · height: 1.5px · position: absolute · left: 0 · top: 0 · margin: 0 · rotate: 0deg · opacity: 0 — `div.sd-198`
### `.symbol-3__sd-199` (S34, content clipper) — rect [16, 315, 358, 0] closed
- display: flex · flexDirection: column · alignItems: center · width: 100% · overflow: hidden · opacity: 1
- height: auto when open, forced by `.symbol-3__sd-193:not([open]) .symbol-3__sd-199 { flex: none; height: 0px; transition-duration: 800ms }`
- transitionDuration: 0.8s · transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1) · transitionDelay: 0s
### `.symbol-3__sd-200` (S35, panel body) — rect [16, 315, 358, 452] when open
- flexDirection: column · alignItems: flex-start · rowGap: 16px · paddingBottom: 16px · width: 358px
### Panel group label `p.symbol-3__sd-202` (and 217 / 229 / 251 / 259 / 271 / 279 / 313 / 337 / 350 / 370)
- fontSize: 11px (0.6875rem) · fontWeight: 600 · lineHeight: 1.2 · color: #707070ff · height: 24px · margin: 0px 4px · width: calc(100% - 8px)
- Inside toggle 2 (`sd-251` and siblings) an `@media` override applies: fontSize: 12px · opacity: 0.75 · padding: 6px 4px
### Panel link `a.symbol-3__sd-204` / label `p.symbol-3__sd-206` (pattern repeats for every panel link)
- gap: 12px · padding: 4px · width: 100% · flexDirection: row · alignItems: flex-start — the `<a>`
- fontSize: 14px (0.875rem) · fontWeight: 500 · lineHeight: 1.30 · letterSpacing: 0.03em · color: #222222ff · height: 24px · width: 100% · fontFeatureSettings: 'palt' 1 — the `<p>`
### Flat rows `a.symbol-3__sd-413 / 416 / 422 / 428 / 431` (S49 / S52) — rect [16, 553, 358, 59.20] for 413
- width: 358px · height: 59.1953px · zIndex: 2 · overflow: hidden · display: flex · flexDirection: column · alignItems: center
- borderBottom: 1px solid #eaeaeaff · cursor: pointer
- padding: 20px 4px · justifyContent: space-between — inner `div.sd-414 / 417 / 423 / 429 / 432`
- arrow chip `div.symbol-3__sd-419` / `425`: 16×16 · overflow: hidden · justifyContent: flex-end; both glyphs are Material Symbols Outlined ligature `arrow_forward`

## States & Behaviors
### Disclosure open / close (×5, independent)
- **Trigger:** `click` on `button.symbol-3__sd-194` (and 241 / 289 / 305 / 383). Hover does **not** open.
- **State A (closed):** `sd-toggle` carries no attribute besides `class`; `aria-expanded="false"`; content has `data-toggle-content aria-hidden="true" inert`; content height 0px; `.sd-198` opacity 1, rotate 90deg (rule `.symbol-3__sd-193:not([open]) .symbol-3__sd-198, .symbol-3__sd-193[data-toggle-closing] .symbol-3__sd-198 { opacity:1; rotate:90deg; transition-duration:800ms }`) so the glyph reads as **＋**; toggle row height 59.20.
- **State B (open):** `sd-toggle[open]`; `aria-expanded="true"`; `aria-hidden` and `inert` **removed** from the content; the runtime writes `style="height: <target>px"` for the duration of the transition and then clears the height declaration (leaving an empty `style` attribute) so the panel is `height: auto`; `.sd-198` opacity 0, rotate 0deg so the glyph reads as **−**.
- **Closing phase:** the runtime writes `style="height: 0px"`, keeps `open` **and** adds `data-toggle-closing` to the `sd-toggle`, keeps `aria-expanded="true"`, then after the transition removes `open` + `data-toggle-closing` and restores `inert` + `aria-hidden="true"`. Measured on toggle 1: 452 → 411.51px at 60 ms, → 67.28px at 320 ms, → 0 and attributes cleaned by 1020 ms. **Closing duration = 800 ms.**
- **Transition:** `height` (and the bar's `opacity`/`rotate`) / **0.8s** / `cubic-bezier(0.4, 0.4, 0, 1)` / delay 0s — read off `.symbol-3__sd-199` computed style, and declared explicitly as `transition-duration: 800ms` in the `:not([open])` / `[data-toggle-closing]` rules.
- **Multiple open at once: YES.** Opening toggle 2 while toggle 1 is open left both `open` with heights 452 and 687.3 (`site-footer-390-open-multi.png`). There is **no** "only one open" coordinator here — unlike `SiteHeader`.
- **Close on outside click: NO.** The origin markup has no `close-outside` attribute on these five `<sd-toggle>` elements (`SiteHeader`'s five do). Clicking at (5, 500) with toggle 2 open left it open.
- **Escape: NO.** Pressing Escape with toggle 1 open left `open`, `aria-expanded="true"` and height 452 unchanged.
- **Measured open heights of `[data-toggle-content]`:** 1 プロダクト **452** · 2 活用方法 **687.3** · 3 導入事例 **80** · 4 リソース **496** · 5 サポート **132.39**.
- **Evidence:** full attribute + height trace for all five, at closed / +60 ms / settled / closing +60 ms / +320 ms / settled, plus the Escape, outside-click and two-open probes, is in `extract/site-footer.states.json` → `toggles390`.
- **Implementation approach:** do **not** use the shared `SdToggle` from `components/sites/studio-design-8a86c0e4/shared/toggle.tsx` — the same three mismatches the `SiteHeader` spec records apply here: it renders `<div class="toggle">` instead of `<sd-toggle>`, it adds an `aria-controls` the origin does not have, and it closes on Escape, which this origin does not. Hand-roll the disclosure inside `FooterAccordionNav`: five fully independent `open` flags (no coordinator), a per-panel 800 ms closing timer that keeps `open` + sets `data-toggle-closing`, `height: <scrollHeight>px` written for the transition then cleared to auto on open, `height: 0px` written on close, and `inert` + `aria-hidden="true"` restored only after the timer fires. No document-level click or key listener.
### Reveal (`appear`, 10 targets — every label in this component)
- Targets `.symbol-3__sd-195 / 242 / 290 / 306 / 384 / 415 / 418 / 424 / 430 / 433`.
- Base rule paints the label's own background as `linear-gradient(90deg, rgba(255,255,255,0) 100%, rgb(255,255,255) 100%)`; `.appear` overrides both stops to `0%`, i.e. a full white curtain over the text. Removing `appear` animates both stops 0% → 100%, wiping the curtain left→right.
- transition-delay **100ms** · transition-duration **800ms** · transition-timing-function **cubic-bezier(0.5, 0, 0, 1)** — identical on all 10, and there is no `.appear-active` rule for `symbol-3`.
- Trigger is a per-element IntersectionObserver that removes the `appear` class on entry. Fresh-load evidence @390: all 10 had `appear`; after one scroll to `footerTop - 400` the first 4 had lost it (one caught mid-flight at gradient stop 78.4162%) while the 6 still below the fold kept it.
### Hover / focus states
- `.symbol-3__sd-413:hover`, `416`, `422`, `428`, `431` declare only `transition-timing-function: cubic-bezier(0, 1, 0.5, 1)` — no visual property changes.
- `.symbol-3__sd-416:hover .symbol-3__sd-420 { rotate: -45deg; translate: 16px }` and `.symbol-3__sd-416:hover .symbol-3__sd-421 { rotate: -45deg; translate: 16px -16px }`; identical pair on `.symbol-3__sd-422` for glyphs 426 / 427. Both glyphs already sit at `rotate: -45deg` at rest, so the hover slides them 16px inside the 16×16 `overflow:hidden` chip.
- The 5 trigger buttons and every panel link have **no** `:hover` rule — `__cloneSnap.rules('footer.symbol-3')` returned zero hits for `.symbol-3__sd-194|241|289|305|383` and for the `sd-2xx`/`sd-3xx` panel links.
- These rules were read from the CSSOM only: at 390 the block is below the fold of a touch-sized viewport and at 1440/768 it is `display:none`, so no live hover diff was taken for them. **NOT CAPTURED: live before/after values for the five flat-row hovers — the block is `display:none` at every width where a pointer probe is meaningful.**

## Per-State Content
- **1 プロダクト** (`sd-195`) — 構築: `デザインエディタ` `https://studio.design/ja/editor` · `CMS` `…/ja/cms` · `フォーム` `…/ja/form` · `SEO` `…/ja/seo`; 運用: `サイト運用` `…/ja/hosting` · `セキュリティ` `…/ja/lp/security` · `ワークスペース` `…/ja/workspace`; より自在に: `Figma to Studio` `…/ja/figma-to-studio` · `Lottie for Studio` `…/ja/lottie` · `アクセシビリティ` `…/ja/accessibility`. Open height 452.
- **2 活用方法** (`sd-242`) — サイト種別から探す: `コーポレートサイト` `/ja/solutions/site-types/corporate` · `採用サイト` `…/recruit` · `サービスサイト` `…/service`; 業種から探す: `宿泊・レジャー` `/ja/solutions/industries/leisure` · `エンタメ` `…/entertainment` · `自治体` `…/local-government` · `飲食店` `/ja/lp/solution/restaurant-homepage` · `小売・EC` `/ja/lp/solution/ec-homepage`; 課題から探す: `マーケターでのLP運用` `/ja/solutions/usecases/landingpage` · `WordPressからの移行` `…/wordpress-migration` · `サイト導線の変更` `…/site-improvement`; 企業タイプ: `エンタープライズ` `https://studio.design/ja/lp/enterprise` · `制作会社・クリエイター` `/ja/creators` · `広告代理店・コンサル` `/ja/lp/solution/marketing-agency` · `スタートアップ` `https://studio.design/ja/lp/startup`. Open height 687.3.
- **3 導入事例** (`sd-290`) — `事例インタビュー` `https://studio.design/ja/customer-story` · `導入企業一覧` `https://studio.design/ja/customer`. Open height 80.
- **4 リソース** (`sd-306`) — つくる・依頼する: `Studio Store` `https://studio.design/ja/store` ↗ · `Studio Experts` `https://studio.design/ja/experts/` ↗ · `Studio Showcase` `https://showcase.studio.design/ja` ↗; 学ぶ: `公式YouTube` `https://www.youtube.com/channel/UCh4_wCvICgiHg0utNFziOoQ` ↗ · `お役立ち資料` `/ja/resources`; つながる: `Studio Community` `https://community-ja.studio.design/feed` ↗ · `全国ワークショップ` `https://studio.design/ja/lp/ambassador` · `セミナー` `https://luma.com/studiodesign?k=c` ↗; 読む: `Studio Blog` `https://studio.design/ja/blog` ↗ · `最新情報` `https://studio.design/ja/whats-new`. Open height 496.
- **5 サポート** (`sd-384`) — `総合窓口` `https://studio.design/ja/support` · `よくある質問` `https://studio.design/ja/faq` · `ヘルプセンター` `https://help.studio.design/ja/` ↗ · `システムステータス` `https://status.studio.design/` ↗. Open height 132.39.
- **Flat rows:** `料金プラン` `https://studio.design/ja/pricing` · `運営会社` `https://studio.inc/` ↗ · `採用情報` `https://studio.inc/career` ↗ · `利用規約` `https://studio.design/ja/terms` · `ユーザーガイドライン` `https://studio.design/ja/guidelines`.
- ↗ marks `target="_blank"` links whose row carries the 2-glyph `arrow_forward` chip; the first glyph is `aria-hidden="true"`, the second `aria-label="新規タブで開く" role="img"`. Note these hrefs are **absolute** and in four places differ from the desktop grid (`/ja/experts/` vs `experts.studio.design`, `community-ja…/feed` vs `/home`, `luma.com` vs `lu.ma`, label `公式YouTube` vs `Studio Academy`) — keep both variants verbatim.

## Assets
No `<img>` and no local files. Icons: 6 `arrow_forward` Material Symbols Outlined ligature spans (sd-320/321, 327/328, 334/335, 344/345, 357/358, 367/368, 404/405, 411/412, 420/421, 426/427) — use `MaterialSymbol` from `components/sites/studio-design-8a86c0e4/shared/icons.tsx` at fontSize 16px in a 16×16 box. The ＋ / − glyph is **not** an icon font: it is two 15×1.5 `<div>` bars (`sd-197` / `sd-198`) in a `scale(0.9)` box. **MISSING: none.**

## Text Content (verbatim)
Every label and href is listed under **Per-State Content** above, in DOM order. Trigger labels: `プロダクト` (sd-195) · `活用方法` (sd-242) · `導入事例` (sd-290) · `リソース` (sd-306) · `サポート` (sd-384). Group labels: `構築` `運用` `より自在に` · `サイト種別から探す` `業種から探す` `課題から探す` `企業タイプ` · `つくる・依頼する` `学ぶ` `つながる` `読む`. Flat-row labels: `料金プラン` `運営会社` `採用情報` `利用規約` `ユーザーガイドライン`. No `<br>` occurs anywhere in this block, unlike the desktop grid. The triggers carry no `aria-label`.

## Responsive Behavior
- **Desktop (1440):** `display: none` (base rule `.sd-root .symbol-3__sd-192 { display: none }`). Not rendered, not focusable, zero-size rects.
- **Tablet (768):** still `display: none` — restated by `@media (max-width: 1280px)` and by `@media (max-width: 768px) .sd-root .symbol-3__sd-192 { display:none; flex-direction:row; flex-wrap:wrap; justify-content:center }`.
- **Mobile (390):** `@media (max-width: 480px) .sd-root .symbol-3__sd-192 { display: flex; flex: none }` (restated at `(max-width: 360px)`) → rendered 358×591.95 at footer-relative y 256.87, all five toggles closed on load. The sibling `.symbol-3__sd-7` (the desktop link grid) is `display: none` at the same breakpoint, so exactly one of the two navigations is ever visible.
- **Breakpoints used:** `(max-width: 1280px)`, `(max-width: 768px)`, `(max-width: 480px)`, `(max-width: 360px)`.

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/site-footer.390.json` (176 nodes — the only viewport where this block is measurable)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/site-footer.1440.json` (176 nodes; this block collapses to zero-size entries)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/site-footer.768.json` (176 nodes)
- Evidence for every state above is in `site-footer.states.json` beside those files → `toggles390` (full state machine trace), `appear390` (reveal trace), `rules` (120 pseudo-class rules)

## QA Exclusions
none — this block contains no video, canvas, counter, marquee or autoplaying element, and every reveal settles 900 ms after the labels enter the viewport. Diff the whole block (16, 256.87, 358, 591.95 relative to the footer top @390) at the default 1.5 percent, after waiting for the reveals. Not rendered at 1440 / 768, so nothing to diff there.
