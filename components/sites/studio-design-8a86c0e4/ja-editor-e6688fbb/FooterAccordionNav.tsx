"use client";

// Port of the studio.design/ja/editor footer's mobile navigation (`div.box.symbol-3__sd-192`).
// `display: none` above 480px, so every behavior below is reachable only at (max-width: 480px).
//
// The shared `SdToggle` is deliberately NOT used, for the same three reasons the SiteHeader spec
// records: it renders `<div class="toggle">` instead of `<sd-toggle>`, it adds an `aria-controls`
// the origin does not have, and it closes on Escape, which this origin does not. On top of that
// these five disclosures differ from the header's: they have no coordinator (several may be open
// at once), no `close-outside`, and their closing phase is 800 ms, not 300.
//
// Markup, class names, hrefs and Japanese copy are verbatim from the origin
// (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `symbol-3__sd-192`).
// Note the mobile hrefs deliberately differ from the desktop grid's in four places
// (`/ja/experts/`, `community-ja…/feed`, `luma.com`, the label `公式YouTube`) — both are verbatim.

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { MaterialSymbol } from "@/components/sites/studio-design-8a86c0e4/shared/icons";

/** `.symbol-3__sd-199` transition-duration, and the `:not([open])` / `[data-toggle-closing]` rules. */
const TOGGLE_MS = 800;

/**
 * The origin reveals each label by removing its `appear` class from a per-element
 * IntersectionObserver; the sliced CSS then wipes the white curtain
 * (`--g-position-0/1` 0% → 100%) over 800 ms after a 100 ms delay. The shared `Appear`
 * is not used because it wraps the node in its own element factory and can add
 * `appear-active`, a class `symbol-3` never defines.
 */
function useAppear<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

/** `span.text.symbol-3__sd-N.appear` — one of the 10 reveal targets. */
function AppearLabel({ id, children }: { id: number; children: ReactNode }) {
  const { ref, shown } = useAppear<HTMLSpanElement>();
  return (
    <span ref={ref} className={`text symbol-3__sd-${id}${shown ? "" : " appear"}`}>
      {children}
    </span>
  );
}

/** `closed` → `open` → `closing` → `closed`; the origin keeps `open` for the whole closing phase. */
type Phase = "closed" | "open" | "closing";

/**
 * One `<sd-toggle>` row. Child ids are contiguous from the root's:
 * trigger +1, label +2, plus-sign box +3, horizontal bar +4, vertical bar +5,
 * content clipper +6, panel body +7.
 */
function FooterDisclosure({ id, label, children }: { id: number; label: string; children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("closed");
  // The runtime writes an inline height for the duration of the transition only, then clears the
  // declaration so an open panel ends up at `height: auto`.
  const [height, setHeight] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onClick = useCallback(() => {
    const content = contentRef.current;
    setPhase((current) => {
      if (current === "open") {
        // Pin the current height so the collapse has something to transition from.
        if (content) setHeight(`${content.getBoundingClientRect().height}px`);
        return "closing";
      }
      // Opening (also from mid-close): animate 0 → the panel body's natural height.
      if (content) setHeight(`${content.scrollHeight}px`);
      return "open";
    });
  }, []);

  useEffect(() => {
    if (phase !== "open") return;
    const timer = window.setTimeout(() => setHeight(null), TOGGLE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "closing") return;
    let timer: number | undefined;
    // One frame after the pinned height lands, collapse it; `open` and `aria-expanded` stay put
    // and `inert` / `aria-hidden` come back only when the 800 ms transition has finished.
    const frame = window.requestAnimationFrame(() => {
      setHeight("0px");
      timer = window.setTimeout(() => {
        setPhase("closed");
        setHeight(null);
      }, TOGGLE_MS);
    });
    return () => {
      window.cancelAnimationFrame(frame);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [phase]);

  const isOpen = phase !== "closed";

  return (
    <sd-toggle
      className={`toggle symbol-3__sd-${id}`}
      {...(isOpen ? { open: true } : {})}
      {...(phase === "closing" ? { "data-toggle-closing": "" } : {})}
    >
      <button
        className={`box symbol-3__sd-${id + 1}`}
        data-toggle-trigger=""
        aria-expanded={isOpen}
        type="button"
        onClick={onClick}
      >
        <AppearLabel id={id + 2}>{label}</AppearLabel>
        <div className={`box symbol-3__sd-${id + 3}`}>
          <div className={`box symbol-3__sd-${id + 4}`} />
          <div className={`box symbol-3__sd-${id + 5}`} />
        </div>
      </button>
      <div
        className={`box symbol-3__sd-${id + 6}`}
        data-toggle-content=""
        {...(isOpen ? {} : { "aria-hidden": true, inert: true })}
        style={height === null ? undefined : { height }}
        ref={contentRef}
      >
        <div className={`box symbol-3__sd-${id + 7}`}>{children}</div>
      </div>
    </sd-toggle>
  );
}

export function FooterAccordionNav() {
  return (
    <div className="box symbol-3__sd-192">
      <FooterDisclosure id={193} label="プロダクト">
        <div className="box symbol-3__sd-201">
          <p className="text symbol-3__sd-202">構築</p>
          <div className="box symbol-3__sd-203">
            <a className="box symbol-3__sd-204" href="https://studio.design/ja/editor">
              <div className="box symbol-3__sd-205">
                <p className="text symbol-3__sd-206">デザインエディタ</p>
              </div>
            </a>
            <a className="box symbol-3__sd-207" href="https://studio.design/ja/cms">
              <div className="box symbol-3__sd-208">
                <p className="text symbol-3__sd-209">CMS</p>
              </div>
            </a>
            <a className="box symbol-3__sd-210" href="https://studio.design/ja/form">
              <div className="box symbol-3__sd-211">
                <p className="text symbol-3__sd-212">フォーム</p>
              </div>
            </a>
            <a className="box symbol-3__sd-213" href="https://studio.design/ja/seo">
              <div className="box symbol-3__sd-214">
                <p className="text symbol-3__sd-215">SEO</p>
              </div>
            </a>
          </div>
        </div>
        <div className="box symbol-3__sd-216">
          <p className="text symbol-3__sd-217">運用</p>
          <div className="box symbol-3__sd-218">
            <a className="box symbol-3__sd-219" href="https://studio.design/ja/hosting">
              <div className="box symbol-3__sd-220">
                <p className="text symbol-3__sd-221">サイト運用</p>
              </div>
            </a>
            <a className="box symbol-3__sd-222" href="https://studio.design/ja/lp/security">
              <div className="box symbol-3__sd-223">
                <p className="text symbol-3__sd-224">セキュリティ</p>
              </div>
            </a>
            <a className="box symbol-3__sd-225" href="https://studio.design/ja/workspace">
              <div className="box symbol-3__sd-226">
                <p className="text symbol-3__sd-227">ワークスペース</p>
              </div>
            </a>
          </div>
        </div>
        <div className="box symbol-3__sd-228">
          <p className="text symbol-3__sd-229">より自在に</p>
          <div className="box symbol-3__sd-230">
            <a className="box symbol-3__sd-231" href="https://studio.design/ja/figma-to-studio">
              <div className="box symbol-3__sd-232">
                <p className="text symbol-3__sd-233">Figma to Studio</p>
              </div>
            </a>
            <a className="box symbol-3__sd-234" href="https://studio.design/ja/lottie">
              <div className="box symbol-3__sd-235">
                <p className="text symbol-3__sd-236">Lottie for Studio</p>
              </div>
            </a>
            <a className="box symbol-3__sd-237" href="https://studio.design/ja/accessibility">
              <div className="box symbol-3__sd-238">
                <p className="text symbol-3__sd-239">アクセシビリティ</p>
              </div>
            </a>
          </div>
        </div>
      </FooterDisclosure>
      <FooterDisclosure id={240} label="活用方法">
        <div className="box symbol-3__sd-248">
          <div className="box symbol-3__sd-249">
            <div className="box symbol-3__sd-250">
              <p className="text symbol-3__sd-251">サイト種別から探す</p>
              <a className="box symbol-3__sd-252" href="/ja/solutions/site-types/corporate">
                <p className="text symbol-3__sd-253">コーポレートサイト</p>
              </a>
              <a className="box symbol-3__sd-254" href="/ja/solutions/site-types/recruit">
                <p className="text symbol-3__sd-255">採用サイト</p>
              </a>
              <a className="box symbol-3__sd-256" href="/ja/solutions/site-types/service">
                <p className="text symbol-3__sd-257">サービスサイト</p>
              </a>
            </div>
            <div className="box symbol-3__sd-258">
              <p className="text symbol-3__sd-259">業種から探す</p>
              <a className="box symbol-3__sd-260" href="/ja/solutions/industries/leisure">
                <p className="text symbol-3__sd-261">宿泊・レジャー</p>
              </a>
              <a className="box symbol-3__sd-262" href="/ja/solutions/industries/entertainment">
                <p className="text symbol-3__sd-263">エンタメ</p>
              </a>
              <a className="box symbol-3__sd-264" href="/ja/solutions/industries/local-government">
                <p className="text symbol-3__sd-265">自治体</p>
              </a>
              <a className="box symbol-3__sd-266" href="/ja/lp/solution/restaurant-homepage">
                <p className="text symbol-3__sd-267">飲食店</p>
              </a>
              <a className="box symbol-3__sd-268" href="/ja/lp/solution/ec-homepage">
                <p className="text symbol-3__sd-269">小売・EC</p>
              </a>
            </div>
            <div className="box symbol-3__sd-270">
              <p className="text symbol-3__sd-271">課題から探す</p>
              <a className="box symbol-3__sd-272" href="/ja/solutions/usecases/landingpage">
                <p className="text symbol-3__sd-273">マーケターでのLP運用</p>
              </a>
              <a className="box symbol-3__sd-274" href="/ja/solutions/usecases/wordpress-migration">
                <p className="text symbol-3__sd-275">WordPressからの移行</p>
              </a>
              <a className="box symbol-3__sd-276" href="/ja/solutions/usecases/site-improvement">
                <p className="text symbol-3__sd-277">サイト導線の変更</p>
              </a>
            </div>
            <div className="box symbol-3__sd-278">
              <p className="text symbol-3__sd-279">企業タイプ</p>
              <a className="box symbol-3__sd-280" href="https://studio.design/ja/lp/enterprise">
                <p className="text symbol-3__sd-281">エンタープライズ</p>
              </a>
              <a className="box symbol-3__sd-282" href="/ja/creators">
                <p className="text symbol-3__sd-283">制作会社・クリエイター</p>
              </a>
              <a className="box symbol-3__sd-284" href="/ja/lp/solution/marketing-agency">
                <p className="text symbol-3__sd-285">広告代理店・コンサル</p>
              </a>
              <a className="box symbol-3__sd-286" href="https://studio.design/ja/lp/startup">
                <p className="text symbol-3__sd-287">スタートアップ</p>
              </a>
            </div>
          </div>
        </div>
      </FooterDisclosure>
      <FooterDisclosure id={288} label="導入事例">
        <div className="box symbol-3__sd-296">
          <a className="box symbol-3__sd-297" href="https://studio.design/ja/customer-story">
            <div className="box symbol-3__sd-298">
              <p className="text symbol-3__sd-299">事例インタビュー</p>
            </div>
          </a>
          <a className="box symbol-3__sd-300" href="https://studio.design/ja/customer">
            <div className="box symbol-3__sd-301">
              <div className="box symbol-3__sd-302">
                <p className="text symbol-3__sd-303">導入企業一覧</p>
              </div>
            </div>
          </a>
        </div>
      </FooterDisclosure>
      <FooterDisclosure id={304} label="リソース">
        <div className="box symbol-3__sd-312">
          <p className="text symbol-3__sd-313">つくる・依頼する</p>
          <div className="box symbol-3__sd-314">
            <a className="box symbol-3__sd-315" href="https://studio.design/ja/store" target="_blank">
              <div className="box symbol-3__sd-316">
                <div className="box symbol-3__sd-317">
                  <p className="text symbol-3__sd-318">Studio Store</p>
                  <div className="box symbol-3__sd-319">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-320" />
                    <span className="icon symbol-3__sd-321 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </div>
              </div>
            </a>
            <a className="box symbol-3__sd-322" href="https://studio.design/ja/experts/" target="_blank">
              <div className="box symbol-3__sd-323">
                <div className="box symbol-3__sd-324">
                  <p className="text symbol-3__sd-325">Studio Experts</p>
                  <div className="box symbol-3__sd-326">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-327" />
                    <span className="icon symbol-3__sd-328 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </div>
              </div>
            </a>
            <a className="box symbol-3__sd-329" href="https://showcase.studio.design/ja" target="_blank">
              <div className="box symbol-3__sd-330">
                <div className="box symbol-3__sd-331">
                  <p className="text symbol-3__sd-332">Studio Showcase</p>
                  <div className="box symbol-3__sd-333">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-334" />
                    <span className="icon symbol-3__sd-335 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="box symbol-3__sd-336">
          <p className="text symbol-3__sd-337">学ぶ</p>
          <div className="box symbol-3__sd-338">
            <a className="box symbol-3__sd-339" href="https://www.youtube.com/channel/UCh4_wCvICgiHg0utNFziOoQ" target="_blank">
              <div className="box symbol-3__sd-340">
                <div className="box symbol-3__sd-341">
                  <p className="text symbol-3__sd-342">公式YouTube</p>
                  <div className="box symbol-3__sd-343">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-344" />
                    <span className="icon symbol-3__sd-345 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </div>
              </div>
            </a>
            <a className="box symbol-3__sd-346" href="/ja/resources">
              <div className="box symbol-3__sd-347">
                <p className="text symbol-3__sd-348">お役立ち資料</p>
              </div>
            </a>
          </div>
        </div>
        <div className="box symbol-3__sd-349">
          <p className="text symbol-3__sd-350">つながる</p>
          <div className="box symbol-3__sd-351">
            <a className="box symbol-3__sd-352" href="https://community-ja.studio.design/feed" target="_blank">
              <div className="box symbol-3__sd-353">
                <div className="box symbol-3__sd-354">
                  <p className="text symbol-3__sd-355">Studio Community</p>
                  <div className="box symbol-3__sd-356">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-357" />
                    <span className="icon symbol-3__sd-358 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </div>
              </div>
            </a>
            <a className="box symbol-3__sd-359" href="https://studio.design/ja/lp/ambassador">
              <div className="box symbol-3__sd-360">
                <p className="text symbol-3__sd-361">全国ワークショップ</p>
              </div>
            </a>
            <a className="box symbol-3__sd-362" href="https://luma.com/studiodesign?k=c" target="_blank">
              <div className="box symbol-3__sd-363">
                <div className="box symbol-3__sd-364">
                  <p className="text symbol-3__sd-365">セミナー</p>
                  <div className="box symbol-3__sd-366">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-367" />
                    <span className="icon symbol-3__sd-368 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="box symbol-3__sd-369">
          <p className="text symbol-3__sd-370">読む</p>
          <div className="box symbol-3__sd-371">
            <a className="box symbol-3__sd-372" href="https://studio.design/ja/blog" target="_blank">
              <div className="box symbol-3__sd-373">
                <div className="box symbol-3__sd-374">
                  <p className="text symbol-3__sd-375">Studio Blog</p>
                  <div className="box symbol-3__sd-376">
                    <MaterialSymbol name="arrow_forward" className="symbol-3__sd-377" />
                    <span className="icon symbol-3__sd-378 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                  </div>
                </div>
              </div>
            </a>
            <a className="box symbol-3__sd-379" href="https://studio.design/ja/whats-new">
              <div className="box symbol-3__sd-380">
                <p className="text symbol-3__sd-381">最新情報</p>
              </div>
            </a>
          </div>
        </div>
      </FooterDisclosure>
      <FooterDisclosure id={382} label="サポート">
        <div className="box symbol-3__sd-390">
          <a className="box symbol-3__sd-391" href="https://studio.design/ja/support">
            <div className="box symbol-3__sd-392">
              <div className="box symbol-3__sd-393">
                <p className="text symbol-3__sd-394">総合窓口</p>
              </div>
            </div>
          </a>
          <a className="box symbol-3__sd-395" href="https://studio.design/ja/faq">
            <div className="box symbol-3__sd-396">
              <div className="box symbol-3__sd-397">
                <p className="text symbol-3__sd-398">よくある質問</p>
              </div>
            </div>
          </a>
          <a className="box symbol-3__sd-399" href="https://help.studio.design/ja/" target="_blank">
            <div className="box symbol-3__sd-400">
              <div className="box symbol-3__sd-401">
                <p className="text symbol-3__sd-402">ヘルプセンター</p>
                <div className="box symbol-3__sd-403">
                  <MaterialSymbol name="arrow_forward" className="symbol-3__sd-404" />
                  <span className="icon symbol-3__sd-405 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                </div>
              </div>
            </div>
          </a>
          <a className="box symbol-3__sd-406" href="https://status.studio.design/" target="_blank">
            <div className="box symbol-3__sd-407">
              <div className="box symbol-3__sd-408">
                <p className="text symbol-3__sd-409">システムステータス</p>
                <div className="box symbol-3__sd-410">
                  <MaterialSymbol name="arrow_forward" className="symbol-3__sd-411" />
                  <span className="icon symbol-3__sd-412 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </FooterDisclosure>
      <a className="box symbol-3__sd-413" href="https://studio.design/ja/pricing">
        <div className="box symbol-3__sd-414">
          <AppearLabel id={415}>料金プラン</AppearLabel>
        </div>
      </a>
      <a className="box symbol-3__sd-416" href="https://studio.inc/" target="_blank">
        <div className="box symbol-3__sd-417">
          <AppearLabel id={418}>運営会社</AppearLabel>
          <div className="box symbol-3__sd-419">
            <MaterialSymbol name="arrow_forward" className="symbol-3__sd-420" />
            <span className="icon symbol-3__sd-421 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
          </div>
        </div>
      </a>
      <a className="box symbol-3__sd-422" href="https://studio.inc/career" target="_blank">
        <div className="box symbol-3__sd-423">
          <AppearLabel id={424}>採用情報</AppearLabel>
          <div className="box symbol-3__sd-425">
            <MaterialSymbol name="arrow_forward" className="symbol-3__sd-426" />
            <span className="icon symbol-3__sd-427 material-symbols-outlined" aria-label="新規タブで開く" role="img">arrow_forward</span>
          </div>
        </div>
      </a>
      <a className="box symbol-3__sd-428" href="https://studio.design/ja/terms">
        <div className="box symbol-3__sd-429">
          <AppearLabel id={430}>利用規約</AppearLabel>
        </div>
      </a>
      <a className="box symbol-3__sd-431" href="https://studio.design/ja/guidelines">
        <div className="box symbol-3__sd-432">
          <AppearLabel id={433}>ユーザーガイドライン</AppearLabel>
        </div>
      </a>
    </div>
  );
}
