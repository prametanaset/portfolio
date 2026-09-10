// `li.sd-156` of the VisualDesign section (`sd-156`…`sd-193`) — the "アニメーション" card and its
// MOTION panel, carved out of VisualDesignSection.tsx because it is the bulk of the section.
// Structure, class names and copy are verbatim from the origin markup
// (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `box sd-156`).
//
// Two behaviors live here and BOTH are declarative:
//   * the 13 `appear` reveals (the card itself, `.sd-160` and the twelve staggered letters of the
//     two front rows) — timings 690…990ms delay / 930…1110ms duration are in the sliced CSS;
//   * the `.sd-161:hover` treatment (bg #fff→#000, `.sd-162` #000→#fff, the four letter rows
//     skewing and translating −200px over 1000ms cubic-bezier(0.13, 1, 0.3, 1), `.sd-181`…`.sd-193`
//     black→white) — 34 sliced `.sd-161:hover*` rules do all of it. No hover JavaScript here.
// `.sd-160` is an absolute inset-0 layer painted `#eeeeee00` at z −1 (z 2 while `.appear`);
// it is visually inert but kept so the DOM matches.
// No "use client": `Appear` carries its own client boundary.

import { Appear } from "@/components/sites/studio-design-8a86c0e4/shared/appear";

export function VisualDesignMotionCard() {
  return (
    <Appear as="li" className="box sd-156" rootMargin="0px" threshold={0} activeClass={false}>
      <div className="box sd-157">
        <h3 className="text sd-158 theme-c1a9a55a">アニメーション</h3>
        <p className="text sd-159 theme-a3931427">
          スクロールやホバーなどの動きを、直感的な操作で追加。
          <br />
          デザインに奥行きとリズムを生み出し、より魅力的な表現を実現します。
        </p>
      </div>
      <Appear className="box sd-160" rootMargin="0px" threshold={0} activeClass={false} />
      <div className="box sd-161">
        <div className="box sd-162">
          <div className="box sd-163">
            <div className="box sd-164">
              <Appear as="span" className="text sd-165" rootMargin="0px" threshold={0} activeClass={false}>
                M
              </Appear>
              <Appear as="span" className="text sd-166" rootMargin="0px" threshold={0} activeClass={false}>
                O<br />
                {"\n"}
              </Appear>
              <Appear as="span" className="text sd-167" rootMargin="0px" threshold={0} activeClass={false}>
                T
              </Appear>
              <Appear as="span" className="text sd-168" rootMargin="0px" threshold={0} activeClass={false}>
                I
              </Appear>
              <Appear as="span" className="text sd-169" rootMargin="0px" threshold={0} activeClass={false}>
                O
              </Appear>
              <Appear as="span" className="text sd-170" rootMargin="0px" threshold={0} activeClass={false}>
                N
              </Appear>
            </div>
            <div className="box sd-171">
              <span className="text sd-172">M</span>
              <span className="text sd-173">O</span>
              <span className="text sd-174">T</span>
              <span className="text sd-175">I</span>
              <span className="text sd-176">O</span>
              <span className="text sd-177">N</span>
            </div>
          </div>
        </div>
        <div className="box sd-178">
          <div className="box sd-179">
            <div className="box sd-180">
              <Appear as="span" className="text sd-181" rootMargin="0px" threshold={0} activeClass={false}>
                M
              </Appear>
              <Appear as="span" className="text sd-182" rootMargin="0px" threshold={0} activeClass={false}>
                O<br />
                {"\n"}
              </Appear>
              <Appear as="span" className="text sd-183" rootMargin="0px" threshold={0} activeClass={false}>
                T
              </Appear>
              <Appear as="span" className="text sd-184" rootMargin="0px" threshold={0} activeClass={false}>
                I
              </Appear>
              <Appear as="span" className="text sd-185" rootMargin="0px" threshold={0} activeClass={false}>
                O
              </Appear>
              <Appear as="span" className="text sd-186" rootMargin="0px" threshold={0} activeClass={false}>
                N
              </Appear>
            </div>
            <div className="box sd-187">
              <span className="text sd-188">M</span>
              <span className="text sd-189">O</span>
              <span className="text sd-190">T</span>
              <span className="text sd-191">I</span>
              <span className="text sd-192">O</span>
              <span className="text sd-193">N</span>
            </div>
          </div>
        </div>
      </div>
    </Appear>
  );
}
