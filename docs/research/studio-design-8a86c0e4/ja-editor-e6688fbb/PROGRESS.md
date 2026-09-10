# PROGRESS — studio-design-8a86c0e4 / ja-editor-e6688fbb

## Facts
- url: https://studio.design/ja/editor
- site-key: studio-design-8a86c0e4 · page-key: ja-editor-e6688fbb
- pm: pnpm 11.3.0 · src root: `.` (no src/) · alias `@/* -> ./*`
- Next 16.3.4 · React 19.2.8 · Tailwind 4.3.3 · shadcn style base-nova (@base-ui/react, lucide)
- next docs: node_modules/next/dist/docs/ (01-app …) — builders must read
- route (APPROVED REPLACEMENT): app/page.tsx  (prev TTR placeholder discarded)
- wrapper class: .sd-root
- commits on main: APPROVED
- media scope: FULL (real mp4, lottie, carousels, toggles, appear-on-scroll)
- artifact root: docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/
- shots root: docs/design-references/studio-design-8a86c0e4/ja-editor-e6688fbb/
- components: components/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/ (+ ../shared)
- assets: public/sites/studio-design-8a86c0e4/ja-editor-e6688fbb/{images,video,lottie}
- browser: Playwright MCP, innerWidth 1440, dpr 1, page height 13942@1440 / 17807@768 / 15423@390

## Steps
- [x] pre-flight 0: docs/ restored (git checkout), namespace dirs created, baseline `pnpm run build` PASS
- [x] phase 1 recon — RECON.json, css/main.css (+media-wrapped), css/parsed.json, BEHAVIORS.md, PAGE_TOPOLOGY.md, network.txt, page.html, full-page shots @1440/768/390
- [x] phase 2 foundation — fonts via origin Google link, app/studio-base.css (generated, scoped), globals block, 74 assets downloaded, shared components (icons/appear/toggle/carousel/video), placeholder route
- [ ] phase 3 loop
- [ ] phase 4 assembly
- [ ] phase 5 QA

## Sections (status: pending | extracted | validated | dispatched | merged | reviewed | qa-pass)
| # | selector | component | status | notes |
|---|---|---|---|---|
| 1 | header#header.symbol-1 | SiteHeader | pending | + MenuModals (modal-ja_menu__sd-1 / sd-7) |
| 2 | main > .sd-3 | HeroDesignEditor | pending | mp4 + appear |
| 3 | .sd-13 | NextCreationSection | pending | |
| 4 | .sd-45 | FreeLayoutSection | pending | carousel sd-20 (6) |
| 5 | .sd-79 | EditorAiSection | pending | |
| 6 | .sd-133 | VisualDesignSection | pending | |
| 7 | .sd-216 | CreativeAssetsSection | pending | |
| 8 | .sd-236 | FeaturedCreatorsSection | pending | carousel sd-244 (5) |
| 9 | .sd-271 | CollaborationSection | pending | |
| 10 | .sd-303 | DataSection | pending | toggles |
| 11 | .symbol-2 | StartCtaSection | pending | |
| 12 | .sd-331 | StockBandSection | pending | |
| 13 | footer.symbol-3 | SiteFooter | pending | appear reveals |
| 1b | dialog.modal-ja_menu | MobileMenuDialog | pending | 5 toggles, 24 appear |

## Open issues
- net-all.txt untracked, not ours — leave alone
- TTR clone leftovers kept (fonts/tokens/assets), unused

## Tooling built in foundation
- `tools/slice-css.mjs <class-prefix...> --out <file>` — pulls a section's original rules
  (incl. the `<style media=...>` breakpoints 1280/768/480/360) out of `css/main.css`, scoped to
  `.sd-root`. Extractors point builders at this; builders run it for their section.
- `tools/gen-base-css.mjs <out>` — regenerates `app/studio-base.css` (Studio's base layer).
- Shared runtime ports: `components/sites/studio-design-8a86c0e4/shared/`
  `icons.tsx` (MaterialSymbol / MaterialIcon ligatures), `appear.tsx` (`<Appear>`),
  `toggle.tsx` (`<SdToggle>`), `carousel.tsx` (`<SdCarousel>`), `video.tsx` (`<SdVideo>`),
  `studio-elements.d.ts` (JSX types for the sd-* custom elements).
- `.sd-354` dropped from the queue: `display:none` at every viewport.
