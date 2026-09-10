# PAGE TOPOLOGY — ai.timetorefokus.com @1440×900 (dpr 1)

Single fixed viewport app. Root: `body > #main.c-main` (fixed, z1000) > `#main-window.c-main_window`
(1408×868, inset 16px, rounded). Siblings of `#main` in `body`: `#ambient-music` (canvas layer, fixed),
`.c-refokus-logo.w-embed` (fixed), `.c-enable-sound-wrapper` (fixed, z 2147483647).

| # | Section | Selector | Rect @1440 | Layer | Interaction model | Non-DOM | Component |
|---|---|---|---|---|---|---|---|
| 1 | Loading screen | `#loading` | 1408×868 @16 | z50, inside window | auto timeline, then hands off to intro | `final-bg.mp4` | `LoadingScreen` |
| 2 | Intro / hero | `#intro-section` | 1408×868 @16 | fixed z100 | default state; fades+blurs out on start | `final-bg.mp4` | `IntroSection` |
| 3 | Chat state shell | `#chat` | 1408×868 @16 | absolute, z-1 → z200 | click `#speaking-ball` | — | `ChatSection` (wrapper) |
| 3a | Chat left aside | `#slider-aside` + `#home-btn` + `#slider-back` | 170×868 @56,16 | in `#chat` | static + BACK btn (opacity 0 until article) | — | `ChatAside` |
| 3b | Article carousel | `#root` (`.c-chat_slider-wrapper`) | 915×868 @16,16 | in `#chat` | WebGL, auto-scroll + drag/click card | **canvas + gltf** | `ArticleCarousel` |
| 3c | Chat conversation | `#chat-main` > `#chat-top`/`#chat-messages` | 709×508 @675,16 | in `#chat` | greeting message; mock replies | inline base64 audio | `ChatMessages` |
| 3d | Chat composer | `#chat-sender` (`.c-chat_form-block w-form`) | 709×360 @675,524 | in `#chat` | textarea + submit, success/error blocks | — | `ChatComposer` |
| 3e | Article panel | `#chat-article` (`.c-article-wrapper`) | 0×0 until opened | in `#chat-main` | shown after card select | — | `ArticlePanel` |
| 4 | Action bar | `#bar` | 1408×100 @784 | absolute z300 | hover states on pill/orb/logo | lottie 8k, `speaking-ball.mp4` | `ActionBar` (+ `SpeakingBall`, `HypeButton`, `BarLogo`) |
| 5 | Sound toggle | `#sound-btn` (+ `#lottie-trigger-on/off`) | 23×16 @66 | fixed z500 | click toggles audio, hover reveals label | lottie | `SoundToggle` |
| 6 | Hype video overlay | `#full-video` | full window, `display:none` | z 9999999 | open via `#hype-btn`, close via `#full-video-back` | video (**source dead upstream → MISSING**) | `HypeVideoOverlay` |
| 7 | Ambient visualiser | `#ambient-music` | 1440×900 @0 | fixed, body-level | audio-reactive canvas | **canvas** | `AmbientMusicCanvas` |
| 8 | Enable-sound pill | `body > div:nth-of-type(3)` (`.c-enable-sound-wrapper`) | 0×0 (text pill) @246 | fixed, max z | shown until first interaction | — | `EnableSoundPill` |

## Build order (extract → build)
1. `ActionBar` (+ sub: `BarLogo`, `HypeButton`, `SpeakingBall`, corner masks) — persistent chrome, needed by every state
2. `IntroSection`
3. `LoadingScreen`
4. `ChatAside` · `ChatMessages` · `ChatComposer` (parallel builders) → `ChatSection` wrapper after they merge
5. `ArticleCarousel` (three.js + downloaded `carousel_fixed.gltf`)
6. `SoundToggle` · `EnableSoundPill` · `HypeVideoOverlay` · `AmbientMusicCanvas`
7. `ArticlePanel` (needs a card-open extraction pass)
8. Page shell / state machine in `app/page.tsx`

## Design tokens (from cross-origin CSS)
`--primary #7443ff` · `--secondary #ebe6ff` · `--white white` · `--primary-variant #523aa9` ·
`--tertiary #7ed8ff` · `--dark #161618`. Body bg `rgb(22,22,24)`. Font: `Satoshi variable` 300–900
(single woff2, `display: swap`); `Saol` is declared in the sheet but unused on this page.

## Breakpoints seen in the sheet
`(min-width:992px)`, `screen and (max-width:767px)`, `screen and (min-width:992px)`,
`screen and (min-width:1440px)`, `screen and (min-width:1600px)`.
