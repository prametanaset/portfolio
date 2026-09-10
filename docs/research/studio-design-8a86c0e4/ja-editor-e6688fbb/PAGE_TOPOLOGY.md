# PAGE_TOPOLOGY — studio.design/ja/editor

Live DOM: `body > div.go3670563033` (toast root, empty) · `body > div.box.sd-1` (the whole page:
`header#header` + `main.sd-2` + `div.sd-354`[display:none] + `footer.symbol-3`) ·
`body > dialog.modal-ja_menu` (mobile menu) + tracking nodes.

Geometry = `top/height`, px, dpr 1. `.sd-354` is `display:none` at every width → **out of scope**.

| # | selector | component | @1440 | @390 | z / position | media | interactions |
|---|---|---|---|---|---|---|---|
| 1 | `#header` | `SiteHeader` | 32/64 | 12/52 | fixed, z 5 | 1 img (logo svg) | 5 click dropdowns (`data-toggle-trigger`, `aria-expanded`), pill child bg rgba(255,255,255,.8)+blur(2px) |
| 1b | `dialog.modal-ja_menu` (`.modal-ja_menu__sd-7`) | `MobileMenuDialog` | overlay | overlay | fixed, z 2 | 10 img | 5 toggles, 24 appear, bg #222, scrollable |
| 2 | `main > .sd-3` | `HeroDesignEditor` | 0/1300 | 0/642 | relative | 1 img | children `.sd-4` (1300) + `.sd-12` (400, white top-fade gradient overlay) |
| 3 | `main > .sd-13` | `NextCreationSection` | 1300/747 | 642/681 | relative, bg #fff | 11 img | **carousel `.sd-20`** (600ms anim / 3000ms interval / hoverStop / autoplay), 7 appear |
| 4 | `main > .sd-45` | `FreeLayoutSection` | 2047/1272 | 1322/2228 | relative, bg #fff | 3 img, **2 video** | sticky `.sd-47` top 104 inside `.sd-46` |
| 5 | `main > .sd-79` | `EditorAiSection` | 3319/1997 | 3550/2317 | relative, **bg #1a1a1a** | 4 img | dark zone |
| 6 | `main > .sd-133` | `VisualDesignSection` | 5316/1798 | 5867/2427 | relative, bg #fff | 7 img, **1 video** | sticky `.sd-135` top 104 inside `.sd-134` |
| 7 | `main > .sd-216` | `CreativeAssetsSection` | 7114/822 | 8294/912 | relative, **bg #000** | 2 img | Studio.Stock band |
| 8 | `main > .sd-236` | `FeaturedCreatorsSection` | 7936/1012 | 9206/948 | relative, bg #fff | 14 img | **carousel `.sd-244`** (1000ms anim / 4500ms interval / autoplay, no hoverStop), 21 appear |
| 9 | `main > .sd-271` | `CollaborationSection` | 8948/1268 | 10153/1665 | relative, bg #f7f7f7 | 8 img | sticky `.sd-273` top 104 inside `.sd-272` |
| 10 | `main > .sd-303` | `DataSection` | 10216/1265 | 11818/1673 | relative, bg #f7f7f7 | 4 img | sticky `.sd-305` top 104 inside `.sd-304` |
| 11 | `main > .symbol-2` | `StartCtaSection` | 11481/680 | 13491/533 | relative, overflow hidden | 1 img | CTA |
| 12 | `main > .sd-331` | `StockBandSection` | 12161/600 | 14025/352 | relative, overflow hidden | 2 img | `arrow_forward` ligatures, link out to stock.studio.design |
| 13 | `footer.symbol-3` | `SiteFooter` | 12761/1135 | 14377/1047 | relative, z 4, bg #fff | 37 img | 5 toggles (mobile accordions), 10 appear |

Build order = table order. Split rule: #1 → `SiteHeader` + `MobileMenuDialog` (separate builders);
#3 and #8 → carousel sub-component builder first, then the wrapper; #4/#6 keep the sticky rail in the
wrapper and give the video card its own sub-component if the spec exceeds ~150 lines.

QA exclusions to carry into every spec: the 3 `<video>` rects (`.sd-45` two, `.sd-133` one) — they are
`autoplay loop`, so frames never match; mask them in visual-diff.
