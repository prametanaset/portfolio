# MobileMenuDialog Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `dialog.modal-ja_menu#sd-modal-b5c877c2c8794404` (direct child of `<body>`, after `div.box.sd-1`) · DOM order 1b of 13
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/MobileMenuDialog.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/mobile-menu-390-closed.png`, `-390-opening.png`, `-390-open.png`, `-390-open-p{1..5}.png`, `-390-hover-pricing.png`, `-390-hover-close.png`, `-390-closing.png`, `-768-closed.png`, `-768-opening.png`, `-768-open.png`, `-1440-forced-open.png`
- **Interaction model:** click-driven
- **Client component:** yes (native `<dialog>` open/close state, 5 disclosure toggles with an 800 ms closing timer, and an IntersectionObserver reveal that must re-arm on every open)
- **Root rect @390:** x 0, y 0, w 390, h 844 (viewport-fixed; the extract JSON records page coords y 12673 because the page was scrolled) · **@768:** 0, 0, 768, 1024 · **@1440:** 0, 0, 1440, 900 (forced open — see Responsive)
- **Sub-components:** none — one file. The 5 accordions are 5 instances of the same local markup. **Non-DOM content:** none (no canvas, video, Lottie or carousel).
- **CSS slice command:** `node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs 'modal-ja_menu*' theme-87bf3e6d theme-b6b0338f theme-e3b73cd0 theme-feb2fadc --out app/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/mobile-menu.css` (476 rules). Live class census = `modal-ja_menu`, `modal-ja_menu__backdrop`, `modal-ja_menu__container`, `modal-ja_menu__sd-1`…`modal-ja_menu__sd-290`, the 4 `theme-*` tokens, the base-layer `box text img icon toggle appear material-symbols-outlined`, and the runtime-only `modal-backdrop` / `modal-container` / `modal-ready` (see the next bullet). Tags used: `div a img button sd-toggle span p br`.
- **MISSING FROM `app/studio-base.css`:** the origin's modal base layer lives in a second inline `<style>` in `page.html`, not in `css/main.css`, so `slice-css.mjs` cannot emit it. Add these verbatim, scoped under `.sd-root`: `.modal-container{box-sizing:border-box;position:relative;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;z-index:1}` · `.modal-container>*{pointer-events:auto}` · `.modal-backdrop{position:absolute;inset:0;pointer-events:none;z-index:0}` · `dialog[open][data-modal-transition-base]:not(.modal-ready) .modal-container *{transition:none!important}` · `dialog[open][data-modal-transition-base]>.modal-container{opacity:0}` · `dialog[open][data-modal-transition-base]>.modal-backdrop{opacity:0}` · `dialog[open][data-modal-transition-base].modal-ready>.modal-container{opacity:1;transform:none;transition:opacity 400ms cubic-bezier(.4,.4,0,1),transform 400ms cubic-bezier(.4,.4,0,1)}` · `dialog[open][data-modal-transition-base].modal-ready>.modal-backdrop{opacity:1;transition:opacity 400ms cubic-bezier(.4,.4,0,1)}` · `dialog[data-modal-transition-base].modal-closing>.modal-container{opacity:0;transition:opacity 400ms cubic-bezier(.4,.4,0,1),transform 400ms cubic-bezier(.4,.4,0,1)}` · `dialog[data-modal-transition-base].modal-closing>.modal-backdrop{opacity:0;transition:opacity 400ms cubic-bezier(.4,.4,0,1)}` plus the `@media (prefers-reduced-motion: reduce)` block that pins both to `opacity:1;transition:none`. `.sd-root dialog{…}` and `::backdrop{background:transparent}` already ship in `app/studio-base.css`.

## DOM Structure
```
dialog.modal-ja_menu#sd-modal-b5c877c2c8794404  autofocus  data-modal-transition-base='{"opacity":0,"transform":"none"}'
  div.modal-backdrop.modal-ja_menu__backdrop                     transparent, absolute inset 0, z 0
  div.modal-container.modal-ja_menu__container                   relative, 100%×100%, z 1, pointer-events none
    div.box.modal-ja_menu__sd-1.appear                           FIXED top bar, z 2, padding 12px 0 (390)
      div.box.sd-2  > a.box.sd-3.appear[href="/ja"] > img.img.sd-4 (462×101 svg, alt "Studio")
                    + button.box.sd-5.appear[aria-label="Menuを閉じる"][data-action="modal-close"] > img.img.sd-6.appear (22×22 svg, alt "")
    div.box.modal-ja_menu__sd-7.appear                           the #222 panel, height 100vh, overflow hidden auto, padding 128px 0
      sd-toggle.toggle.sd-8.appear[close-outside]   ×5  (sd-8 / 75 / 123 / 141 / 229)
        button.box.sd-9[data-toggle-trigger][aria-expanded="false"]
          span.text.sd-10.appear.theme-87bf3e6d                  label
          div.box.sd-11 > div.box.sd-12 + div.box.sd-13          the ＋ / − (two 15×1.5 bars, sd-13 absolute)
        div.box.sd-14[data-toggle-content][aria-hidden="true"][inert]
          div.box.sd-15 > group div ×N: p.text heading + div > a.box link ×M
      a.box.sd-264.appear[href="/ja/pricing"] > div.sd-265 > span.text.sd-266.appear.theme-87bf3e6d
      a.box.sd-267 / sd-273 / sd-279 / sd-282                    display:none at EVERY width — keep in markup
      div.box.sd-285.appear > div.sd-286 (a.text.sd-287.appear + a.text.sd-288.appear) + div.sd-289.appear > a.text.sd-290
```
Panel trigger/content ids: P1 `8/9/14` · P2 `75/76/81` · P3 `123/124/129` · P4 `141/142/147` · P5 `229/230/235`. Link shapes inside the panels: **icon link** `a.sd-19` = `img` 20×20 + `div.sd-21` (`p` title + `p` sub) — P1 only, 10 of them; **plain link** `a.sd-87` = one `p` — P2 only, 15 of them; **arrow link** `a.sd-152` = `div` > (`div` > `p` + `div.sd-156` 16×16 clip > 2 `span.icon.material-symbols-outlined` `arrow_forward`) + `p` sub — P4/P5, 10 of them; **plain title+sub link** `a.sd-132` = `div` > `p` + `p` — P3/P4/P5.

## Computed Styles (exact, getComputedStyle @390 dpr 1; full dump in `extract/mobile-menu.390.json`, 106 style buckets)
### `dialog.modal-ja_menu` / `.modal-ja_menu__container` / `.modal-ja_menu__backdrop`
- width: 390px · height: 844px · position: fixed · display: flex · background-color: rgba(0, 0, 0, 0) — dialog
- background: rgba(0, 0, 0, 0) · border-radius: 0px — backdrop (`.modal-ja_menu__backdrop`; the UA `::backdrop` is transparent too)
- height: 100% · width: 100% · opacity: 1 · padding: 0px · align-items: flex-start · flex-direction: column · justify-content: flex-start — container
### `.modal-ja_menu__sd-1` (fixed top bar) — rect [0,0,390,64]
- top: 0px · left: 0px · padding: 12px 0px · width: 100% · zIndex: 2 · position: fixed · flexDirection: column · alignItems: center
- transitionDuration: 0.8s · transitionTimingFunction: cubic-bezier(0, 1, 1, 1) · transitionDelay: 0.1s
### `.modal-ja_menu__sd-2` / `sd-4` / `sd-5` / `sd-6`
- sd-2: margin: 0px 16px · maxWidth: calc(100% - 32px) · flexDirection: row · justifyContent: space-between · rect [16,12,358,40]
- sd-4 (wordmark): height: 16px · width: 73.1875px · aspectRatio: auto 462 / 101 · objectFit: fill
- sd-5 (close): 40×40 · borderRadius: 96px · border: 1px solid rgb(83, 83, 83) · background: rgba(0, 0, 0, 0) · transitionTimingFunction: cubic-bezier(0.2, 1, 1, 1) · rect [318,12,40,40]
- sd-6 (× glyph): width: 20px · height: 20px · aspectRatio: auto 22 / 22 · transitionDuration: 0.8s · transitionDelay: 0.7s · transitionTimingFunction: cubic-bezier(0.2, 1, 1, 1)
### `.modal-ja_menu__sd-7` (the panel) — rect [0,0,390,844]
- backgroundColor: rgb(34, 34, 34) (`--s-color-99a91143` = #222222ff) · height: 100vh · width: 100% · padding: 96px 0px 128px (≤768) / 128px 0px (>768)
- padding: 96px 0px 128px · overflowX: hidden · overflowY: auto · flexDirection: column · alignItems: center · justifyContent: flex-start
- transitionDuration: 0.8s · transitionTimingFunction: cubic-bezier(0, 1, 1, 1)
### Accordion `.modal-ja_menu__sd-8` / `sd-9` / `sd-10` / `sd-11` / `sd-12` / `sd-13` / `sd-14`
- sd-8: borderBottom: 1px solid #535353 · width: 1440px · maxWidth: 100% · transitionDelay: 0.1s · transitionDuration: 0.8s · transitionTimingFunction: cubic-bezier(0.5, 0, 0, 1) · rect [0,96,390,69.80]
- sd-9 (trigger): padding: 24px · justifyContent: space-between · flexDirection: row · gap: 0px · transitionDuration: 0.8s · height: 68.7969px
- sd-10 (label, `theme-87bf3e6d`): fontFamily: Inter, "Noto Sans JP" · fontSize: 16px · fontWeight: 600 · lineHeight: 20.8px · letterSpacing: 0.16px · color: rgb(247, 247, 247) · fontFeatureSettings: "palt" · transitionDelay: 0.1s · transitionTimingFunction: cubic-bezier(0.5, 0, 0, 1)
- sd-11: 15×1.5 row, justifyContent: center · sd-12: background: rgb(238, 238, 238) · height: 1.5px · width: 15px
- sd-13: background: rgb(238, 238, 238) · height: 1.5px · width: 15px · position: absolute · left: 0px · top: 0px · opacity: 0 · rotate: 0deg (open) — closed state adds opacity: 1; rotate: 90deg; transitionDuration: 0.8s
- sd-14 (content): width: 100% · overflow: hidden · transitionDuration: 0.8s · transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1) · height: auto open / 0px closed
### Panel content
- rowGap: 20px · padding: 0px 0px 24px · height: 799.953px · alignItems: flex-start — `sd-15` (P1 open)
- sd-17 / sd-40 / sd-58 / sd-150 / sd-177 (`theme-feb2fadc` group headings): fontSize: 14px · fontWeight: 700 · lineHeight: 19.6px · letterSpacing: 0.28px · color: rgb(172, 172, 172) · margin: 0px 24px · height: 24px
- padding: 12px 24px · columnGap: 12px · height: 65.1953px · flexDirection: row · alignItems: flex-start — `sd-19` (icon link, ×10)
- sd-20 (icon box): 20×20 · margin: 2px 0px 0px · overflow: hidden · sd-21: flex: 1 · rowGap: 4px
- fontSize: 16px · fontWeight: 600 · lineHeight: 20.8px · letterSpacing: 0.16px · color: rgb(247, 247, 247) — `sd-22` (title, `theme-87bf3e6d`)
- fontSize: 11px · fontWeight: 500 · lineHeight: 13.2px · color: rgb(172, 172, 172) — `sd-23` (sub, `theme-e3b73cd0`, `--s-color-80b83c36`)
- fontSize: 12px · fontWeight: 500 · letterSpacing: -0.48px · lineHeight: 1.1 — `sd-46` / `sd-51` / `sd-56` … (`theme-b6b0338f` subs)
- fontSize: 14px · fontWeight: 600 · lineHeight: 18.2px · letterSpacing: 0.14px · opacity: 0.75 · padding: 8px 24px — `sd-86` / `sd-94` / `sd-106` / `sd-114` (P2 headings, no theme)
- sd-87 (P2 plain link): padding: 12px 24px · height: 44.7969px · its `p` = 16px/600/20.8px/0.16px rgb(247,247,247)
- sd-156 (arrow clip, ×10): 16×16 · overflow: hidden · justifyContent: flex-end · sd-157: fontFamily: "Material Symbols Outlined" · fontSize: 16px · color: rgb(247, 247, 247) · rotate: -45deg · translate: 0px 16px · sd-158: same, translate: none
### Footer rows
- sd-264 / sd-265 (料金プラン): sd-265 padding: 24px · borderBottom: 1px solid #535353 · justifyContent: space-between · rect [0,444.98,390,69.80]; sd-266 = same type as sd-10
- sd-285: margin: 48px 24px 0px (≤480 flex none) · flexDirection: row · rect [16,562.78,358,23.23] · sd-286 columnGap: 16px (≤480) / 32px (≤768)
- fontSize: 14px · fontWeight: 500 · lineHeight: 23.24px · letterSpacing: 1.4px · color: rgb(247, 247, 247) · fontFeatureSettings: "palt" — `sd-287` / `sd-288`
- fontSize: 14px · fontWeight: 400 · lineHeight: 23.24px · letterSpacing: 0.7px · opacity: 0.7 · color: rgb(247, 247, 247) — `sd-290` (English)

## States & Behaviors
### Open (native `<dialog>`)
- **Trigger:** click on `button.symbol-1__sd-370[data-modal="sd-modal-b5c877c2c8794404"]` in `SiteHeader`; the origin's inline handler is `showModal('sd-modal-b5c877c2c8794404', this)`. **The origin uses the native modal API** — `dialog.matches(':modal')` returned `true` while open.
- **State A (closed):** no `open` attribute; `getComputedStyle(dialog).display` = `none`; all 29 reveal targets carry `appear`; all 5 toggles are `aria-expanded="false"` with `inert` + `aria-hidden="true"` content.
- **State B (open):** `open` attribute; dialog class `modal-ja_menu modal-ready`; `document.activeElement` is the dialog itself (its `autofocus`); container + backdrop at opacity 1.
- **Transition (measured @390, t = click):** 71 ms `showModal()` (dialog briefly gets inline `display:flex` then `visibility:hidden`, both cleared) → 73 ms class `modal-ready` + container/backdrop opacity 0 → 1 over **400 ms cubic-bezier(0.4, 0.4, 0, 1)** → 86 ms the reveal starts (below) → 477 ms the runtime's inline container/backdrop styles are dropped.
- **Reveal choreography:** for each target the runtime writes an inline `transition: <duration> <easing> <delay>, --g-angle, --g-color-0, …` shorthand and swaps `appear` → `appear-active`, removes `appear-active` 2 ms (1 frame) later, and removes the inline style at `delay + duration`. Batches (IntersectionObserver callbacks, not timers): **86 ms** sd-1, 5, 6, 7, 8, 75, 123, 141, 229, 264, 285, 287, 288, 289 · **362 ms** sd-3 · **445 ms** sd-10, 266 · **461 ms** sd-77, 125, 231 · **469 ms** sd-143. The stagger is emergent: sd-3 lives inside sd-1 (`translate:-160px 0`) and the labels live inside toggles with the same translate, so they only intersect once their ancestor has slid in.
- **Per-target hidden state (from `.appear` rules):** sd-1 / sd-8 / 75 / 123 / 141 / 229 / 264 / 267 / 273 / 279 / 282 `opacity:0; translate:-160px 0` · sd-7 `opacity:0; translate:-96px 0` · sd-6 `opacity:0; rotate:-45deg` (delay 700 ms, 800 ms, cubic-bezier(0.2,1,1,1)) · sd-3 `opacity:0` delay 400 ms · sd-5 `opacity:0` delay 300 ms / 800 ms · sd-285 delay 600 ms · sd-287 delay 725 ms · sd-288 delay 800 ms · sd-289 delay 900 ms (at `(max-width:360px)` these four become 200 / 325 / 400 / 500 ms) · the 10 label spans (sd-10, 77, 125, 143, 231, 266, 269, 275, 281, 284) wipe with `background: linear-gradient(90deg, rgba(255,255,255,0) var(--g-position-0), rgb(255,255,255) var(--g-position-1))`, `--g-position-0/1` **0% while `.appear` → 100% at rest**, 800 ms cubic-bezier(0.5, 0, 0, 1) delay 100 ms.
- **`appear-active` is still inert here.** `.modal-ja_menu__sd-7.appear-active{transition-timing-function:cubic-bezier(0, 1.01, 1, 1)}` is the page's only `appear-active` rule, but the runtime writes `transition: 0.8s cubic-bezier(0, 1, 1, 1), …` **inline** on sd-7 in the same tick, and an inline declaration outranks the class rule — so cubic-bezier(0, 1, 1, 1) is what runs. Do not add `appear-active` in the clone.
- **Implementation approach:** render the real `<dialog>` and call `el.showModal()` / `el.close()`. Reveal = one IntersectionObserver per target that removes `appear` when the target intersects, re-armed (all 29 classes restored) every time the dialog closes. The shared `Appear` from `shared/appear.tsx` does **not** fit: it is `once: true` and never re-arms, and it renders its own wrapper tag — hand-roll the observer inside `MobileMenuDialog.tsx` with `rootMargin: '0px'`, `threshold: 0`.
### Close
- **Trigger:** click `button.modal-ja_menu__sd-5` (`data-action="modal-close"`, origin handler `hideCurrentModal(this)`) **or** Escape — both take the identical path.
- **Transition:** +10…46 ms class `modal-ready` → `modal-closing`, container and backdrop go to opacity 0 over 400 ms cubic-bezier(0.4, 0.4, 0, 1) → **+443 ms (Escape) / +491 ms (button)** `dialog.close()`: `open` removed, class back to `modal-ja_menu`, `appear` re-added to all 29 targets, all 5 toggles reset to `aria-expanded="false"` + `inert` + `aria-hidden="true"`.
- **Focus:** returns to `button.symbol-1__sd-370`. **Focus trap:** native top-layer only; no JS trap. **Scroll lock:** yes and it is free — `window.scrollTo(0, 300)` while open left `scrollY` at 12672.5; `html` and `body` computed `overflow` stay `visible` and no class or inline style is added to either.
### Accordions (5, inside the dialog)
- **Trigger:** click on `button[data-toggle-trigger]`. **One at a time** (`close-outside` on every `sd-toggle`): opening P2 while P1 was open removed `open` from P1 at +1 ms. Clicking empty dialog chrome closes the open panel and leaves the dialog open. This matches `SiteHeader`, not `SiteFooter`.
- **State A (closed):** no `open` on `sd-toggle`; `aria-expanded="false"`; content `inert` + `aria-hidden="true"`; content height 0px; sd-13 opacity 1, rotate 90deg (a ＋).
- **State B (open):** `sd-toggle[open]`; `aria-expanded="true"`; `inert`/`aria-hidden` removed; content height auto; sd-13 opacity 0, rotate 0deg (a −).
- **Closing phase:** `sd-toggle` keeps `open` and gains `data-toggle-closing` for **806 ms** (added t=1503, removed with `open` at t=2309) — the origin's 800 ms timer, **not** the header's 300 ms.
- **Transition:** all / 0.8s / cubic-bezier(0.4, 0.4, 0, 1) on the content; 0.8s cubic-bezier(0.4, 0.4, 0, 1) on sd-13.
- **Open heights @390:** P1 799.95 · P2 892.73 · P3 156.39 · P4 859.95 · P5 288.78; `.sd-7` scrollHeight 844 (all closed) / 1514 / 1607 / 870 / 1574 / 1003 — the panel scrolls itself (`overflow-y:auto`), the page behind never does.
- **Implementation approach:** do **not** use the shared `SdToggle` — it renders `<div class="toggle">` instead of `<sd-toggle>`, adds an `aria-controls` the origin lacks, closes on Escape (which here must close the whole dialog, not one panel), and defaults to a 300 ms closing timer. Hand-roll it with `closeDurationMs = 800` and a parent-level one-open coordinator, exactly as `SiteHeader` does.
### Hover / focus states
- **`a.modal-ja_menu__sd-264` (料金プラン):** rule is `{transition-timing-function: cubic-bezier(0, 1, 0.5, 1); --ha: 1}` only. Measured before/after a 600 ms hover: opacity 1, translate 0px, rotate none, background rgba(0,0,0,0), color rgb(51,51,51), text-decoration none — **no visual change**; `--ha` is never read anywhere in `css/main.css`.
- **`a.sd-267 / sd-273 / sd-279 / sd-282`:** carry the same rule plus arrow slides (`rotate:-45deg; translate:16px 0px` / `16px -16px`), but all four are `display:none` at every width, so the hover is unreachable.
- **Everything else — the close button, the 5 triggers, all 40 panel links, the arrow chips, X（Twitter）/ YouTube / English:** no `:hover` rule exists (grep of the sliced 476 rules found exactly 9 `:hover` rules, all listed in `extract/mobile-menu.states.json` → `hoverRules`). Measured on `button.sd-5`: background rgba(0,0,0,0), border-top-color rgb(83,83,83), glyph rotate none, identical before and after hover.
### Page-level wiring contract (for the assembler)
1. Render `<MobileMenuDialog />` as a sibling of the page root `div.sd-1`, inside `.sd-root`, **not** inside `SiteHeader`.
2. `SiteHeader`'s `onOpenMenu` must call the dialog's imperative `showModal()`. The header button keeps `aria-label="メニューを開く"` and `data-modal="sd-modal-b5c877c2c8794404"`; the origin sets **no** `aria-expanded`, `aria-controls` or `aria-haspopup` on it — do not add any.
3. The dialog element keeps `id="sd-modal-b5c877c2c8794404"`, `autofocus`, and `data-modal-transition-base='{"opacity":0,"transform":"none"}'` (the base CSS above keys off that attribute).
4. The clone must add/remove the classes `modal-ready` (one frame after `showModal()`) and `modal-closing` (on close request, removed by `close()` 400 ms later) on the dialog itself, and reset all 29 `appear` classes plus the 5 toggles inside `close()`.
5. No scroll lock, backdrop element, or focus trap of its own: the native modal supplies all three. Escape must run the same 400 ms `modal-closing` fade — call `preventDefault()` on the dialog's `cancel` event and close on the timer.

## Per-State Content
Six states: all-closed plus one per panel. Screenshots `mobile-menu-390-open.png` and `mobile-menu-390-open-p{1..5}.png`; measured heights above; verbatim strings below.

## Assets
All 12 `<img>` URLs resolve through `assets.manifest.json` to files already on disk in `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/images/`. **MISSING: none** (`extract/mobile-menu.assets.json` carries an empty missing list).
- `images/s-462x101_4fd187ae-1783-4644-ba51-6f318d811c8b.svg` — wordmark `img.sd-4`, rendered 73.19×16 at every width, objectFit fill, alt `Studio`.
- `images/s-22x22_bc1616b1-e492-4349-b07a-821291ac7c22.svg` — close glyph `img.sd-6`, rendered 20×20, alt `""`.
- Panel-1 row icons, 20×20 each, alt `""`, in DOM order: `images/s-20x20_2dd3ba64-f3f1-44c3-8e22-764ab4a4e0b5.svg` (デザインエディタ) · `…_80a11e2e-5e59-4582-9d63-ba1b1c165863.svg` (CMS) · `…_aadbed33-84be-4643-b288-e59e96651c83.svg` (フォーム) · `…_811fb59b-498b-4bea-9963-c12d075243e6.svg` (SEO) · `…_362adb5c-e83c-4b2d-8e60-1dade276f6ef.svg` (サイト運用) · `…_c4c5842e-2c38-41c2-ad5e-969f36c47c56.svg` (セキュリティ) · `…_9d0092c5-a24f-4750-b551-87f8244ce764.svg` (Figma to Studio) · `…_8c82bee6-201f-4890-a4b5-49686d9c25fa.svg` (Lottie) · `…_30d24730-fc13-416d-882b-23639177b88d.svg` (アクセシビリティ).
- `images/s-72x72_webp_fdacd97f-6a14-4875-9c83-3cb3300488d5.webp` — ワークスペース row icon `img.sd-53`, authored `width="72" height="72" loading="lazy"`, rendered 20×20.
- Icons: 20 `arrow_forward` Material Symbols Outlined ligature spans (10 chips × 2) — use `MaterialSymbol` from `components/sites/studio-design-8a86c0e4/shared/icons.tsx`, fontSize 16px in a 16×16 `overflow:hidden` chip; the first span is `aria-hidden="true"`, the second `aria-label="新規タブで開く" role="img"`.
- Layered composition: inside each chip the two glyphs sit in a `justify-content:flex-end` row, both pre-rotated `-45deg`, the first pushed out of view by `translate: 0px 16px`; only one is visible and nothing moves (no hover rule). The ＋/− is `div.sd-13` absolutely stacked on `div.sd-12`.

## Text Content (verbatim)
- Logo `a.sd-3` href `/ja`, `img.sd-4` alt `Studio`. Close `button.sd-5` aria-label `Menuを閉じる`.
- Triggers: `プロダクト` (sd-10) · `活用方法` (sd-77) · `導入事例` (sd-125) · `リソース` (sd-143) · `サポート` (sd-231).
- **P1 プロダクト** — 構築: `デザインエディタ` + `コードを書かずにデザイン自体を自在に` → `/ja/editor` (`data-current`) · `CMS` + `柔軟なコンテンツ管理システム` → `/ja/cms` · `フォーム` + `フォーム設置もノーコードで完結` → `/ja/form` · `SEO` + `検索エンジン向けの設定項目も充実` → `/ja/seo`; 運用: `サイト運用` + `安心のバックアップや権限管理` → `/ja/hosting` · `セキュリティ` + `サイトの安全を守る取組み` → `/ja/lp/security` · `ワークスペース` + `複数プロジェクトを一括管理` → `/ja/workspace`; より自在に: `Figma to Studio` + `デザインを一瞬でWebサイトに` → `/ja/figma-to-studio` · `Lottie` + `より豊かなアニメーション表現` → `/ja/lottie` · `アクセシビリティ` + `Webサイトをすべての人に` → `/ja/accessibility`.
- **P2 活用方法** — サイト種別から探す: `コーポレートサイト` → `/ja/solutions/site-types/corporate` · `採用サイト` → `…/recruit` · `サービスサイト` → `…/service`; 業種から探す: `宿泊・レジャー<br>` → `/ja/solutions/industries/leisure` · `エンタメ` → `…/entertainment` · `自治体` → `…/local-government` · `飲食店` → `/ja/lp/solution/restaurant-homepage` · `小売・EC` → `/ja/lp/solution/ec-homepage`; 課題から探す: `マーケターでのLP運用` → `/ja/solutions/usecases/landingpage` · `WordPressからの移行` → `…/wordpress-migration` · `サイト導線の変更` → `…/site-improvement`; 企業タイプから探す: `大企業・エンタープライズ` → `/ja/lp/enterprise` · `制作会社・クリエイター` → `/ja/creators` · `広告代理店・コンサル` → `/ja/lp/solution/marketing-agency` · `スタートアップ` → `/ja/lp/startup`.
- **P3 導入事例** — `事例インタビュー` + `お客様からの声をご紹介` → `/ja/customer-story` · `導入企業` + `様々な規模・業種の企業が採用` → `/ja/customer`.
- **P4 リソース** — つくる・依頼する: `Studio Store` + `テンプレートから始める` → `https://studio.design/ja/store` (_blank, arrow) · `Studio Experts` + `制作をプロに相談する` → `https://studio.design/ja/experts/` (_blank, arrow) · `Studio Showcase` + `制作事例からヒントを探す` → `https://showcase.studio.design/ja` (_blank, arrow); 学ぶ: `Studio Academy` + `公式動画で使い方を学ぶ` → `https://www.youtube.com/channel/UCh4_wCvICgiHg0utNFziOoQ` (_blank, arrow) · `お役立ち資料` + `導入・運用に役立つ資料` → `/ja/resources` (_blank, no arrow); つながる: `Studio Community` + `ユーザー同士で知見を共有する` → `https://community-ja.studio.design/feed` (_blank, arrow) · `全国ワークショップ` + `基本操作を実践的に学ぶ` → `/ja/lp/ambassador` · `セミナー` + `開催中のイベントを探す` → `https://luma.com/studiodesign?k=c` (_blank, arrow); 読む: `最新情報` + `Studioのアップデートやお知らせ` → `/ja/whats-new` · `Studio Blog` + `制作・運用に役立つ記事を読む` → `https://studio.design/ja/blog` (_blank, arrow).
- **P5 サポート** — `総合窓口` + `目的に沿ったサポートコンテンツを探す` → `/ja/support` · `よくある質問` + `導入にあたってよくある質問を探す` → `/ja/faq` · `ヘルプセンター` + `操作や機能に関するマニュアルを探す` → `https://help.studio.design/ja/` (_blank, arrow) · `システムステータス` + `不具合・障害情報を確認する` → `https://status.studio.design/` (_blank, arrow).
- Footer rows: `料金プラン` → `/ja/pricing` · hidden-but-present `運営会社` → `https://studio.inc/` (_blank, arrow) · `採用情報` → `https://studio.inc/career` (_blank, arrow) · `利用規約・プライバシーポリシー` → `/ja/terms` · `ユーザーガイドライン` → `/ja/guidelines` · `X（Twitter）` → `https://x.com/StudioDesign` (_blank) · `YouTube` → `https://www.youtube.com/channel/UCh4_wCvICgiHg0utNFziOoQ` (_blank) · `English` → `https://studio.design/`.
- Every arrow chip: first `span` `aria-hidden="true"`, second `span` `aria-label="新規タブで開く" role="img"`, both with the literal ligature text `arrow_forward`.

## Responsive Behavior
- **Reachability:** `button.symbol-1__sd-370` is `display:none` in the base rule and `display:flex` only under `@media (max-width: 1280px)` (and again at 768 / 480 / 360). So the dialog is user-reachable at **768 and 390 only**; the `mobile-menu.1440.json` extract and `mobile-menu-1440-forced-open.png` were produced by calling the origin's own `showModal('sd-modal-b5c877c2c8794404', btn)` from the console and are reference-only.
- **Desktop (1440, forced):** dialog 1440×900; sd-1 1440×88, padding 24px 0; sd-2 [24,24,1392,40]; sd-5 [1376,24,40,40]; sd-7 padding 128px 0; sd-8 [0,128,1440,69.80]; sd-285 [24,594.78,1392,23.23].
- **Tablet (768):** dialog 768×1024; sd-1 768×72, padding 16px 0 (`@media (max-width:768px)`); `.modal-ja_menu__container` padding 0px; sd-2 [24,16,720,40], `flex:none; height:auto`; sd-7 padding **96px 0px 128px**; sd-5 [704,16,40,40]; sd-8 [0,96,768,69.80]; sd-264 [0,444.98,768,69.80]; sd-285 [24,562.78,720,23.23] with sd-286 gap 32px; the 10 arrow chips drop to 16×16 / fontSize 16px.
- **Mobile (390):** dialog 390×844; sd-1 390×64, padding **12px 0** (`@media (max-width:480px)`); sd-2 margin 0px 16px, maxWidth calc(100% - 32px) → [16,12,358,40]; sd-5 [318,12,40,40]; sd-8 [0,96,390,69.80]; sd-264 [0,444.98,390,69.80] with `overflow:hidden`; sd-285 [16,562.78,358,23.23], sd-286 gap 16px; `theme-e3b73cd0` 0.81rem → 0.6875rem (11px) and `theme-b6b0338f` 0.81rem → 0.75rem (12px).
- **Breakpoints used:** `(max-width: 1280px)`, `(max-width: 768px)`, `(max-width: 480px)`, `(max-width: 360px)` — the only width queries in `css/main.css`; the slice carries all four. At 360 and below the four social/legal delays shorten (see States) and sd-267/273/279/282 stay `display:none`.

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/mobile-menu.390.json` (294 nodes, 106 style buckets, rootRect [0,12673,390,844])
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/mobile-menu.768.json` (294 nodes)
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/mobile-menu.1440.json` (294 nodes, forced open)
- Behaviour evidence and the missing-asset list live beside them in the same `extract/` directory as `mobile-menu.states.json` (open and close timelines to the millisecond, the appear batch trace and per-target hidden states, the 5-toggle state machine with open heights, the 9 pseudo-class rules plus 2 measured hover passes, scroll-lock and focus evidence, geometry at all three widths)
  geometry at all three widths) and `mobile-menu.assets.json` (missing list empty).

## QA Exclusions
none — the dialog holds no video, canvas, counter or autoplaying element, and every reveal settles within 1.8 s of opening. Diff the full viewport in the open state after a 2500 ms settle (`0,0,390,844` @390 · `0,0,768,1024` @768) at the default 1.5 percent. Do not diff mid-open or mid-close: the reveal cascade is IntersectionObserver-timed and its batch boundaries are not frame-stable.
