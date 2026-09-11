// Port of studio.design/ja/editor `main > .sd-13` (DOM order 3 of 13) — the "Next Creation"
// showcase: a static header row plus the `<sd-carousel class="box sd-20">` track.
// Structure and class names are verbatim from the origin markup; the copy is the Thai translation
// (docs/research/studio-design-8a86c0e4/ja-editor-e6688fbb/page.html, `box sd-13`).
// The `theme-*` classes stay on the text nodes: `.sd-root .text.theme-XXXX` is specificity (0,3,0)
// and beats `.sd-root .sd-NN` for font-size / line-height.
// No `appear` reveal here — the 7 `[data-appear-manual]` slides carry no `appear` class.

import { NextCreationCarousel } from "./NextCreationCarousel";
import "./next-creation-section.css";

export function NextCreationSection() {
  return (
    <div className="box sd-13">
      <div className="box sd-14">
        <h2 className="box sd-15">
          <span className="text sd-16 theme-b6b0338f">ผลงานชิ้นต่อไป</span>
          <span className="text sd-17 theme-57a9da79">
            ทุกรายละเอียดเป็นไปดั่งที่ตั้งใจ
            <br />
            คือวิธีสร้างงานแบบใหม่
          </span>
        </h2>
        <div className="box sd-18">
          <p className="text sd-19 theme-a3931427">
            ตั้งแต่เลย์เอาต์ ตัวอักษร ไปจนถึงแอนิเมชัน
            <br />
            เครื่องมือออกแบบที่ให้อิสระและความลื่นไหลอย่างที่ครีเอเตอร์ต้องการ
          </p>
        </div>
      </div>
      <NextCreationCarousel />
    </div>
  );
}
