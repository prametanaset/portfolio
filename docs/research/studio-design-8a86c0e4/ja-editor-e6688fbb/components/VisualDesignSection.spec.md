# VisualDesignSection Specification

## Overview
- **Source:** https://studio.design/ja/editor · section selector `main > .sd-133` (`div.box.sd-133`) · DOM order 6 of 13
- **Target file:** `components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/VisualDesignSection.tsx`
- **Screenshots:** `docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/` → `visual-design-1440.png` + `-1440-b.png` · `visual-design-768.png` + `-768-b.png` · `visual-design-390.png` + `-390-b.png` + `-390-c.png` · `visual-design-1440-sticky-mid.png` (scrollY 6100, rail pinned at viewport top 104) · `visual-design-1440-motion-hover.png` (`.sd-161` hovered 1500 ms, animation settled). All are viewport tiles at dpr 1 taken by scrolling, so the fixed `#header` overlays each tile — crop it out when diffing.
- **Interaction model:** mixed(scroll + hover + click) — CSS `position: sticky` rail, 19 IntersectionObserver `appear` reveals, one `:hover`-driven MOTION panel, one autoplay-loop video with a click play/pause button.
- **Client component:** yes (the 19 `appear` reveals need an IntersectionObserver and the play/pause button needs `is-playing` state; the sticky rail and the hover panel are pure CSS)
- **Root rect @1440:** x 0, y 5361.84, w 1440, h 1798.11 · **@768:** 0, 6157.77, 768, 1366.17 · **@390:** 0, 5867.14, 390, 2426.56
- **Sub-components:** `Appear` ×19 from `shared/appear.tsx`; `MaterialIcon` ×2 from `shared/icons.tsx`; `SdVideo` ×1 from `shared/video.tsx` inside a local `sd-video-player` wrapper (see States). 91 nodes — split `li.sd-156` (the MOTION panel, `sd-156`…`sd-193`) into `VisualDesignMotionCard.tsx` if the file grows past 150 lines.
- **Non-DOM content:** 1 `<video>` (`sd-210`), `autoplay loop muted playsinline`, no poster, no native controls, duration 19.966667 s, intrinsic 3456×1080 — see QA Exclusions.
- **CSS slice command:** `node docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/tools/slice-css.mjs sd-133..215 --out app/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/visual-design.css` — token **`sd-133..215`** only (173 rules, 39820 bytes), no `foo*` wildcard needed. Verified against `page.html`: every element carries exactly one `sd-NN` class in 133…215. The remaining classes — `box`, `text`, `img`, `icon`, `material-icons`, `video`, `image`, `image--vertical`, `image__bg-container`, `appear`, `theme-cb8ba68c`, `theme-969c5ae1`, `theme-c1a9a55a`, `theme-a3931427`, `theme-f799e4ef`, plus the `sd-video` / `sd-video-player` element rules — are already in `app/studio-base.css`. Keep origin class names verbatim.

## DOM Structure
```
div.box.sd-133                              section, bg #fff, padding 0
  div.box.sd-134                            border 0px #d7d7d7 (nothing painted), margin 0 24px, padding 96px 0, row, wrap, gap 24
    div.box.sd-135                          STICKY rail, top 104px, z 1, w 212, gap 8, h 134.39
      h2.sd-136.theme-cb8ba68c ("Visual<br>Design") + p.sd-137.theme-969c5ae1 (<br>)
    div.box.sd-138 > ul.box.sd-139          flex:1, column / row+wrap, gap 24 (16 ≤1280)
      li.box.sd-140.appear   40%  column-REVERSE (image above copy), bg #f7f7f7 > div.sd-141 > h3.sd-142 + p.sd-143(2×<br>) · img.img.sd-144 + <noscript>
      li.box.sd-145.appear   60%  bg #f7f7f7 > div.sd-146 > h3.sd-147 + div.sd-148 > p.sd-149 + p.sd-150
        div.box.sd-151                    white logo panel, radius 4, padding 64, row+wrap, gap 40
          img.sd-152 (Google Fonts) · img.sd-153 (TypeSquare) · img.sd-154 (FontPlus, display:none) · img.sd-155 (CustomFonts), each + <noscript>
      li.box.sd-156.appear  100%  bg #f7f7f7, padding 40 40 0 > div.sd-157 > h3.sd-158 + p.sd-159(<br>)
        div.box.sd-160.appear             ABSOLUTE inset 0, z −1 (z 2 while .appear), bg #eeeeee00 — visually inert
        div.box.sd-161                    MOTION panel, hover target, bg #fff, radius 4 0 0, margin-right −40, overflow hidden, h 400
          div.box.sd-162                  black band h 200 > div.box.sd-163 (mask, overflow hidden)
            div.box.sd-164 > span.sd-165…sd-170.appear (M O<br> T I O N, white) · div.box.sd-171 > span.sd-172…sd-177 (black, skewY(−6deg), translate 0 128px)
          div.box.sd-178                  transparent band h 200, justify flex-end > div.box.sd-179 (mask, align flex-end)
            div.box.sd-180 > span.sd-181…sd-186.appear (black) · div.box.sd-187 > span.sd-188…sd-193 (black, skewY(−6deg), translate 0 128px)
      li.box.sd-194.appear 33.33% bg #f7f7f7, padding 40 40 64 > div.sd-195 > h3.sd-196 + p.sd-197(trailing <br>) · img.img.sd-198 (direct .svg src, no <noscript>)
      li.box.image.image--vertical.sd-199.appear 33.33% bg image via CSS vars
        span.image__bg-container[aria-hidden] · div.sd-200 > h3.sd-201 + p.sd-202 · img.img.sd-203 + <noscript>
      li.box.sd-204.appear 33.33% bg #f7f7f7 > div.sd-205 > h3.sd-206 + p.sd-207
        div.box.sd-208                    margin 0 −40, padding-bottom 104, overflow hidden, gap 4
          sd-video-player.box.sd-209[is-playing] > sd-video.video.sd-210 > video   (margin 0 −64px, w calc(100% + 128px))
            button.box.sd-211[aria-label]          ABSOLUTE bottom −38, right 12, radius 999, border 1px #000
              div.box.sd-212[slot=play] > span.icon.sd-213.material-icons "play_arrow" · div.box.sd-214[slot=pause] > span.icon.sd-215.material-icons "pause"
```
The six `<noscript>` blocks are inert with JS enabled — do not render them.

## Computed Styles (from getComputedStyle @1440 dpr 1, exact)
### `.sd-133` (S1) / `.sd-134` (S2) / `.sd-138`+`.sd-139` (S8/S9)
- width: 1440px / 1392px (declared 1920px, maxWidth calc(100% - 48px)) / 1156px on both · height: 1798.11px / 1798.11px / 1606.11px
- padding: 0px / 96px 0px / 0px · margin: 0px / 0px 24px / 0px · rowGap: 0px / 24px / 24px · columnGap: same
- backgroundColor: rgb(255, 255, 255) on sd-133; transparent on the rest · transitionDuration: 0.3s · transitionTimingFunction: cubic-bezier(0.4, 0.4, 0, 1)
- flexDirection: column / row (wrap) / column on sd-138 and row-wrap on sd-139 · justifyContent: center / flex-start · alignItems: center / flex-start · flex: 1 on sd-138 and sd-139
### `.sd-135` (sticky rail, S3) — section-relative rect [24, 96, 212, 134.39]
- position: sticky · top: 104px · zIndex: 1 · width: 212px · height: 134.391px · rowGap: 8px · padding: 0px · flexDirection: column · alignItems: flex-start · backgroundColor: rgba(0, 0, 0, 0)
### Text — `.sd-136` (theme-cb8ba68c) · `.sd-137` (theme-969c5ae1) · `.sd-142`/`.sd-147`/`.sd-158`/`.sd-196` (theme-c1a9a55a) · `.sd-201`/`.sd-206` (theme-f799e4ef) · `.sd-143`/`.sd-150`/`.sd-159`/`.sd-197`/`.sd-202`/`.sd-207` (theme-a3931427) · `.sd-149` (no theme)
- fontFamily: Inter, "Noto Sans JP" on every one of them (`--s-font-5489e031`)
- fontSize: 34px / 16px / 28px / 30px / 16px / 16px · lineHeight: 40.8px / 22.4px / 35px / 36px / 25.6px / 27.2px · fontWeight: 600 / 400 / 600 / 600 / 400 / 600
- letterSpacing: -1.36px on sd-136, -1.2px on sd-201 and sd-206, normal on the rest · fontFeatureSettings: "palt" 1 everywhere except sd-136, sd-201, sd-206
- color: rgb(34, 34, 34) on sd-136, sd-142, sd-147, sd-158, sd-196, sd-206 · rgb(85, 85, 85) on sd-137 · rgb(112, 112, 112) on sd-143, sd-150, sd-159, sd-197, sd-207 · rgb(247, 247, 247) on sd-201, sd-202 · rgb(13, 104, 219) on sd-149
- All typography above comes from the `theme-*` rules in `app/studio-base.css:947-951`; the `.sd-NN` rules declare only color / width / text-align, so **no `theme-*` rule overrides an `.sd-NN` declaration in this section** (checked every `.sd-133`…`.sd-215` rule for `font-size` — only sd-149, sd-165…sd-193, sd-213 and sd-215 declare one, and none of those carries a theme class).
### Cards `.sd-140` / `.sd-145` / `.sd-156` / `.sd-194` / `.sd-199` / `.sd-204`
- rowGap: 40px · columnGap: 40px · borderRadius: 4px · flex: none · alignItems: flex-start · overflow: hidden · backgroundColor: rgb(247, 247, 247) on all six
- flexDirection: column-reverse on sd-140, column on the other five
- padding: 0px 40px 40px / 40px / 40px 40px 0px / 40px 40px 64px / 40px 40px 0px / 40px 40px 0px
- width: calc(40% - (var(--gap-h) * 0.6)) = 448px · calc(60% - (var(--gap-h) * 0.4)) = 684px · 100% = 1156px · calc(33.33% - (var(--gap-h) * 0.67)) = 369.211px ×3. `--gap-h`/`--gap-v` = 24px, set on `.sd-139 > *`.
- Copy blocks `.sd-141`/`.sd-146`/`.sd-157`/`.sd-195`/`.sd-200`/`.sd-205`: rowGap: 16px · padding: 0px · flexDirection: column · flex: 1 · minWidth: 0 (sd-146 width 100%)
### Images
- `.sd-144`: width: 448px (calc(100% + 80px)) · margin: 0px -40px · aspectRatio: auto 896 / 438 · objectFit: fill → rect [260, 96, 448, 218.77]
- `.sd-152`/`.sd-153`/`.sd-155`: width: calc(50% - (var(--gap-h) * 0.5)) = 218px · aspectRatio: auto 708 / 112, 1112 / 162, 708 / 112 → 218×34.15, 218×31.61, 218×34.15. **`.sd-154` is display: none at every viewport** (base rule + a repeat in all four media blocks), rect 0×0, never fetched.
- `.sd-198`: width: 289.211px · margin: 0px · aspectRatio: auto 272 / 165 → rect [300, 1463, 289.21, 175.44] · `.sd-203`: width: 369.211px (calc(100% + 80px)) · margin: 0px -40px · aspectRatio: auto 1476 / 1164 → rect [653, 1411, 369.21, 291.06]
- `.sd-151` (white logo panel): width: 604px · height: 236.297px · padding: 64px · borderRadius: 4px · flexWrap: wrap · justifyContent: center · alignItems: flex-end · rowGap: 40px · columnGap: 40px · overflow: hidden · backgroundColor: rgb(255, 255, 255)
### MOTION panel `.sd-160` / `.sd-161` / `.sd-162`+`.sd-178` / `.sd-163`+`.sd-179` / `.sd-164`+`.sd-180` / `.sd-171`+`.sd-187`
- sd-160: position: absolute · inset: 0px · zIndex: -1 · width: 1156px · height: 582.188px · backgroundColor: rgba(238, 238, 238, 0) · transitionDelay: 2s · transitionDuration: 0ms
- sd-161: width: 1116px (calc(100% + 40px)) · height: 400px · margin: 0px -40px 0px 0px · borderRadius: 4px 0px 0px · flexDirection: column · justifyContent: center · alignItems: center · overflow: hidden · backgroundColor: rgb(255, 255, 255)
- sd-162 / sd-178: width: 1116px · height: 200px · flex: none · overflow: hidden · backgroundColor: rgb(0, 0, 0) on sd-162, transparent on sd-178 · justifyContent: flex-start / flex-end
- sd-163 / sd-179 (letter masks): width: 767.094px · height: 200px · flexDirection: column · overflow: hidden · alignItems: flex-start / flex-end
- sd-164 / sd-180: width: 767.094px · height: 200px · justifyContent: flex-end · alignItems: center · transformOrigin: bottom left · transform: none · translate: none · transitionDuration: 1s · transitionTimingFunction: cubic-bezier(0.13, 1, 0.3, 1)
- sd-171 / sd-187: same box plus transform: matrix(1, -0.105104, 0, 1, 0, 0) (= skew(0deg, -6deg)) · translate: 0px 128px
- Letters `.sd-165`…`.sd-193`: fontSize: 200px · lineHeight: 200px · fontWeight: 600 · letterSpacing: -8px (-0.04em) · widths M 176.461px, O 145.703px, T 124.055px, I 47.352px, N 144.297px · color: rgb(255, 255, 255) on sd-165…sd-170, rgb(0, 0, 0) on sd-172…sd-193 · marginLeft: -16px on sd-167 / sd-174 / sd-183 / sd-190
### Video card `.sd-208` / `.sd-209` / `.sd-210` / `.sd-211` / `.sd-212`+`.sd-214` / `.sd-213`+`.sd-215`
- sd-208: width: 369.211px (calc(100% + 80px)) · margin: 0px -40px · padding: 0px 0px 104px · rowGap: 4px · overflow: hidden · sd-209: width: 369.211px · height: 155.375px · flexDirection: column · alignItems: flex-end
- sd-210: rect [982.42, 1443, 497.21, 155.38] · display: block · width: calc(100% + 128px) · margin: 0px -64px · aspectRatio: 3456 / 1080 · objectFit: cover · overflow: hidden · child `video { width:100%; height:100% }`
- sd-211: rect [1353.63, 1612.11, 50, 24] · position: absolute · inset: 169.375px 12px -38px 307.211px · border: 1px solid #000000ff · borderRadius: 999px · justifyContent: center · overflow: hidden · background: transparent · zIndex: 1
- sd-212 / sd-214: padding: 3px 16px · flexDirection: column · alignItems: center · backgroundColor: rgb(34, 34, 34) on sd-212 (display: none while playing), transparent 48×22 on sd-214
- sd-213 / sd-215: fontFamily: "Material Icons" · fontSize: 16px · width: 16px · height: 16px · textRendering: optimizelegibility · color: rgb(247, 247, 247) / rgb(34, 34, 34)
### `.sd-199` background (the only `image` / `image__bg-container` user in the section)
- `li` zIndex: 0; painted by `span.image__bg-container::before`: content "" · position: absolute · inset: 0px · backgroundSize: cover · backgroundPosition: 50% 50% · backgroundImage: the `--img-small` variant at dpr 1 (identical at 1440, 768 and 390) · span rect 369.21×474.24

## States & Behaviors
### Sticky rail `.sd-135` (desktop only)
- **Trigger:** native CSS `position: sticky; top: 104px` inside `.sd-134`. No JS, no class flip, no scroll listener.
- **Thresholds @1440 (page coords):** rail rests at page top 5457.84; sticks at **scrollY 5353.84**; releases at **scrollY 6825.55**, then parks at page top 6929.55 (= `.sd-134` content bottom 7063.95 − rail height 134.39).
- **State A (before/after stick) and State B (while stuck) are identical:** backgroundColor rgba(0, 0, 0, 0); opacity 1; boxShadow none; width 212px; height 134.391px; transform none; translate none; padding 0px. **Nothing changes visually while stuck** — the 134px height (vs 94px on the other three rails) is only the two-line `Visual/Design` h2 (81.59px) + 8px gap + 44.80px paragraph.
- **Evidence:** 12 instant-scroll samples in `extract/visual-design.states.json` → `sticky.samples1440` (scrollY 5274/5350/5354/5360/5500/6000/6800/6825/6826/6830/6900/7000 → railViewportTop 183.84/107.84/104/104/104/104/104/104/103.55/99.55/29.55/−70.45). **Implementation approach:** CSS only — the sliced `.sd-root .sd-135 { position: sticky; top: 104px }` already does it; do not add a scroll handler.
### Reveal `appear` ×19
- **Trigger:** IntersectionObserver in the Studio runtime. After reveal it removes `appear` and leaves the empty attributes `data-appear` and `data-inited-appear` on all 19 elements. `appear-active` is never used here.
- **Cards** `.sd-140` `.sd-145` `.sd-156` `.sd-194` `.sd-199` `.sd-204`: State A opacity 0, translate 0px 16px → State B opacity 1, translate none. transition-delay 400ms; transition-duration 800ms; transition-timing-function cubic-bezier(0.2, 1, 1, 1).
- **MOTION letters** `.sd-165`…`.sd-170` and `.sd-181`…`.sd-186`: State A translate 0px 180px (no opacity change) → State B translate none, sliding up out of the `overflow: hidden` masks `.sd-163` / `.sd-179`. timing-function cubic-bezier(0.02, 0.92, 0.1, 1); staggered delay/duration per letter — 690/1110, 740/1060, 800/1000, 870/930, 930/930, 990/930 ms for letters 1…6 of both rows. Translate is 120px ≤1280, 84px ≤768, 54px ≤480, 48px ≤360.
- **`.sd-160`:** `.sd-160.appear { z-index: 2 }` is the whole rule; base `position:absolute; inset:0; background:#eeeeee00; z-index:-1; transition-duration:0ms; transition-delay:2000ms`. No animatable property changes and the background is fully transparent in both states — **visually inert**; render it, animate nothing.
- **Evidence:** those `.appear` rules are in `css/main.css` and in the `sd-133..215` slice; after scrolling the whole page, `querySelectorAll('.appear,[data-appear-manual],.appear-active')` inside `main > .sd-133` returned 0/0/0 and `[data-inited-appear]` returned exactly the 19 elements listed in `extract/visual-design.states.json` → `appear.inited`. **Implementation approach:** `Appear` from `shared/appear.tsx`, `as="li"` for the six cards, `as="span"` for the twelve letters, plain `div` for `.sd-160`, `activeClass={false}`, `once` default.
### MOTION panel hover `.sd-161` — the one hover in the section
- **Trigger:** CSS `:hover` on `.sd-161` (1116×400 at 1440); pointer only, no click and no touch equivalent. **State A → State B** (measured live, `page.hover('.sd-161')` + 1400 ms settle): `.sd-161` backgroundColor rgb(255, 255, 255) → rgb(0, 0, 0) · `.sd-162` rgb(0, 0, 0) → rgb(255, 255, 255) · `.sd-164` and `.sd-180` transform none → matrix(1, -0.105104, 0, 1, 0, 0) and translate none → 0px -200px · `.sd-171` and `.sd-187` transform matrix(1, -0.105104, 0, 1, 0, 0) → matrix(1, 0, 0, 1, 0, 0) and translate 0px 128px → 0px -200px · `.sd-181`…`.sd-193` color rgb(0, 0, 0) → rgb(255, 255, 255) (sd-188 sampled; the rule is identical for all thirteen). `.sd-165`…`.sd-170` also carry `:hover { color:#fff }` but are already white, so it is a no-op. Net effect: the two bands invert.
- **Transition:** the four rows use transition-duration 1000ms, transition-timing-function cubic-bezier(0.13, 1, 0.3, 1), transform-origin bottom left; the colour swaps use the base `all 0.3s cubic-bezier(0.4, 0.4, 0, 1)`. Hover translate is −200px at 1440/1280/768, −88px (sd-164/sd-180) and −64px (sd-171/sd-187) ≤480, −64px and −48px ≤360.
- **Evidence:** `__cloneSnap.rules('main > .sd-133')` → 38 hits, 34 of them `.sd-161:hover*` (`extract/visual-design.states.json` → `cssRuleHits`); live diff in `states.hoverMotionPanel.measuredDiff`; screenshot `visual-design-1440-motion-hover.png`.
- **Implementation approach:** CSS only — the sliced `.sd-root .sd-161:hover …` rules do the whole thing; do not add React state.
### Video play/pause `.sd-211`
- **Trigger:** click. Measured: initially `is-playing` present / aria-label "Pause" / `video.paused` false / `.sd-212` display none / `.sd-214` display flex → after one click `is-playing` removed / aria-label "Play" / paused true / `.sd-212` flex / `.sd-214` none → a second click restores the first state.
- The glyph swap is done entirely by `app/studio-base.css:1068-1069` (`sd-video-player:not([is-playing]) [slot=pause]` and `sd-video-player[is-playing] [slot=play]` → `display:none !important`). Keep the `slot="play"` / `slot="pause"` attributes and toggle only `is-playing` on `<sd-video-player>` plus the `aria-label`.
- `SdVideo` fits the inner `<sd-video>` as-is (pass `className="sd-210"` and the local src without `#t=0.01`; the component appends it). Wrap it in a small local client `<sd-video-player className="box sd-209">` that owns `is-playing` and calls `video.play()` / `video.pause()`; `sd-video-player` is already declared in `shared/studio-elements.d.ts`. **Button hover:** `.sd-211:hover { background: #000000ff }` and `.sd-211:hover .sd-213 / .sd-215 { color: rgb(255, 255, 255) }`.
### Hover / focus states elsewhere — N/A, verified: the 38 `rules()` hits are only `.sd-161:hover*` and `.sd-211:hover*`; no `:focus`, no `:active`, no `@keyframes`; `__cloneSnap.animations('main > .sd-133')` returned `{count: 0}`.

## Per-State Content
N/A — single state (the play/pause button swaps glyphs only; both are in the DOM at all times).

## Assets
- `public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/video/s-3456x1080_462cefa8-05a9-4f79-8632-62d4e1647f5c.mp4` — `.sd-210`, autoplay/loop/muted/playsinline, no poster, objectFit cover, rendered 497.21×155.38 @1440 · 357×112 @768 · 470×147 @390.
- `public/sites/.../images/s-896x438_v-fs_webp_977a7850-4c23-4d9f-9272-f71e6805ca8c_small.webp` — `.sd-144`, 448×218.77 @1440.
- `public/sites/.../images/s-708x112_v-fs_webp_85f38531-a365-44a6-990e-22d439d9a165_small.webp` — `.sd-152` "Google Fonts", 218×34.15 · `.../images/s-1112x162_v-fs_webp_96c1b19d-dda8-419d-acbd-dc94b14976bb_small.webp` — `.sd-153` "TypeSquare", 218×31.61 · `.../images/s-708x112_v-fs_webp_dcc890a8-eb4f-4f01-88b1-a03577f30cce_small.webp` — `.sd-155` "CustomFonts", 218×34.15 (all @1440)
- `public/sites/.../images/s-272x165_db94a6c4-7da1-4ae6-94da-1da1013385f1.svg` — `.sd-198`, 289.21×175.44 @1440 · `.../images/s-1476x1164_v-fms_webp_d7f44742-e650-44e9-8060-f2092732599c_small.webp` — `.sd-203`, 369.21×291.06 @1440.
- Icons: `MaterialIcon name="play_arrow"` (`.sd-213`) and `MaterialIcon name="pause"` (`.sd-215`) from `components/sites/studio-design-8a86c0e4/shared/icons.tsx` — ligature text in the "Material Icons" face, 16×16, `aria-hidden="true"`.
- Layered composition: `li.sd-199` is the only element on the custom-property background machinery — `class="box image image--vertical sd-199"` plus an inline `style` setting `--img-origin`, `--img-small`, `--img-middle`, `--img-regular`; `span.image__bg-container::before` (`app/studio-base.css:493-544`) paints it cover / 50% 50% behind `.sd-200` and `.sd-203`. Set all four vars inline pointing at the local files. Inside `li.sd-156`, `.sd-160` is an absolute inset-0 layer at z −1 under `.sd-157` and `.sd-161`; inside `li.sd-204`, `.sd-211` sits absolute at bottom −38 / right 12 within `.sd-208` (padding-bottom 104, overflow hidden), floating 38px below the video.
- MISSING: the `.sd-199` background image — 3 variants listed in `extract/visual-design.assets.json` (`s-1480x1600_v-fms_webp_4f1aaa92-4838-4893-9e98-0a0cf5568af6{_small,_middle,}.webp`); the `_small.webp` is the one painted at dpr 1 at all three viewports. `img.sd-154` ("FontPlus") needs no asset — it is `display: none` at every viewport, so keep the inline data: URI SVG placeholder the origin ships.

## Text Content (verbatim)
- `h2.sd-136`: `Visual<br>Design` · `p.sd-137`: `ブランドをカタチづくる、<br>スタイルとフォント。`
- `h3.sd-142`: `スタイルパネル` · `p.sd-143`: `色や文字のルールをまとめて管理。<br>ブランドカラーや見出しのスタイルも、<br>全ページで一括適用。`
- `h3.sd-147`: `タイポグラフィ` · `p.sd-149`: `9,200種類以上のフォントが無料で利用可能。` · `p.sd-150`: `モリサワフォント(TypeSquare)、Google Fonts、カスタムフォント、System Fontsに対応。ブランドに合わせた多彩な書体を自由に使えます。` (half-width parentheses, no `<br>`)
- `h3.sd-158`: `アニメーション` · `p.sd-159`: `スクロールやホバーなどの動きを、直感的な操作で追加。<br>デザインに奥行きとリズムを生み出し、より魅力的な表現を実現します。`
- Letters, in DOM order per row: `M` `O<br>` `T` `I` `O` `N` — rows `.sd-165`…`.sd-170`, `.sd-172`…`.sd-177`, `.sd-181`…`.sd-186`, `.sd-188`…`.sd-193`. The second span of every row is exactly `O<br>` (trailing `<br>` inside the span) — preserve it.
- `h3.sd-196`: `色々な形式に対応` · `p.sd-197`: `動画・画像・PDFなど、幅広いファイル形式をアップロードして利用できます。<br>` (trailing `<br>`)
- `h3.sd-201`: `Lottie` · `p.sd-202`: `軽量で滑らかなLottieアニメーションに対応。` · `h3.sd-206`: `iframe` · `p.sd-207`: `外部コンテンツをiframeで自由に埋め込み可能。`
- `span.sd-213`: `play_arrow` · `span.sd-215`: `pause` (ligature text, both `aria-hidden="true"`) · `button.sd-211` `aria-label`: `Pause` while playing, `Play` while paused (runtime-set, absent from the origin HTML).
- `img.sd-144` alt: `サンプル画像：デザインエディタの一部の切り取り。画面左にはカラー設定パネルとテキストスタイルパネルが並んでいる。その下には「Start your story」と記載されたテキストボックスが表示されており、スタイルパネルで選択したスタイルが青い曲線で紐づけられている。`
- `img.sd-198` alt: `サンプル画像：灰色の背景に白い8枚のカードが2段4列で並ぶ。各カードは拡張子を示し、アイコンと「.png」「.svg」「.mp4」などのテキストで構成されている。左上には黒いポインターとそれに追従する緑色の「＋」アイコン、赤い「8」の通知が付いており、複数ファイルの追加する様子を示している。`
- `img.sd-152` alt: `Google Fonts` · `img.sd-153` alt: `TypeSquare` · `img.sd-154` alt: `FontPlus` · `img.sd-155` alt: `CustomFonts` · `img.sd-203` alt: `` (empty). `span.image__bg-container` carries `aria-hidden="true"`. No links anywhere in this section; the only button is `.sd-211`. No U+200B and no U+00A0 in any string (checked).

## Responsive Behavior
- **Desktop (1440):** 3 rows of cards. Row 1 = `.sd-140` 448px + `.sd-145` 684px; row 2 = `.sd-156` 1156px; row 3 = `.sd-194` / `.sd-199` / `.sd-204` at 369.211px each; gaps 24px. Rail `.sd-135` is 212px wide, sticky at top 104px, left of `.sd-138` (1156px). `.sd-134` padding 96px 0. Letters 200px, masks 200px tall.
- **Tablet (768):** the rail becomes a full-width band above the list — `@media (max-width: 1280px) .sd-135 { position: relative; top: auto; left: auto; right: auto; bottom: auto; width: 100%; max-width: 100% }` (measured `position: relative`, width 720). `.sd-139` gap 24 → 16 (`≤1280`, restated `≤768`). `@media (max-width: 768px)`: card padding 40 → 24, card gap 40 → 32, copy-block gap 16 → 12, `.sd-144`/`.sd-203` margins −40 → −24 with width `calc(100% + 48px)`, `.sd-151` padding 64 → 24 and gap 40 → 24, `.sd-149` 16px → 12px, `.sd-161` margin-right −40 → −24, `.sd-208` margin −40 → −24 and padding-bottom 104 → 64. Letters 96px, masks 96px, `.sd-171`/`.sd-187` translate 128 → 80px. Theme sizes drop (`app/studio-base.css:988` block): theme-c1a9a55a 28 → 20px, theme-a3931427 16 → 14px, theme-f799e4ef 30 → 20px. Section top 6157.77, height 1366.17.
- **Mobile (390):** single column — `@media (max-width: 480px)` sets `flex: none; width: 100%; max-width: 100%` on `.sd-140` `.sd-145` `.sd-156` `.sd-194` `.sd-199` `.sd-204`, so all six cards are 342px wide and stack. `.sd-134` padding 96 → 64. `.sd-151` becomes centred with gap 32 24 and the three visible logos go to `calc(90% - (var(--gap-h) * 0.1))` = 219px, one per row. Letters 64px, masks 64px, `.sd-171`/`.sd-187` translate 48px. theme-cb8ba68c 34 → 24px, so the rail is 110.39 tall at page top 5931.14. Section top 5867.14, height 2426.56.
- **Breakpoints used:** `(max-width: 1280px)`, `(max-width: 768px)`, `(max-width: 480px)`, `(max-width: 360px)` — the only width media queries in `css/main.css`. The 360px block drops the letters to 48px, the masks to 48px, `.sd-171`/`.sd-187` translate to 36px, the hover translate to −64/−48px, and restates `.sd-154 { display:none }` plus the `.sd-210` aspect-ratio.

## Extraction Data
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/visual-design.1440.json` · `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/visual-design.768.json` · `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/visual-design.390.json` — 91 nodes / 69 style buckets each, `maxDepth: 9`
- `docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/extract/visual-design.states.json` (sticky samples, hover diff, appear rules, video, background machinery, the 38 CSSOM pseudo-class hits, plus the @1440 nodes + styleTable). Missing-asset list: `visual-design.assets.json` in the same directory.

## QA Exclusions
One autoplaying video — frames can never match. Rects are section-relative (subtract the section page top before diffing). The element is wider than its card and `li.sd-204` clips it with `overflow: hidden`, so mask the **clipped** rect:
- @1440: `.sd-210` visible = `x 1046, y 1443, w 369, h 155` (the element itself is `x 982, w 497`).
- @768: `.sd-210` visible = `x 515, y 1095, w 229, h 112` (element `x 451, w 357`).
- @390: `.sd-210` visible = `x 24, y 2152, w 342, h 147` (element `x -40, w 470`).
Everything else is static and must match at the default 1.5 percent. Diff the MOTION panel in its rest state only — hover changes 20 nodes over 1000 ms.
