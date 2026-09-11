// Port of studio.design/ja/editor `main > .sd-3` (DOM order 2 of 13) — the "Design Editor" hero.
// Structure and class names are verbatim from the origin markup; the copy is a generic
// portfolio intro (part 1) replacing the origin's product copy — see HERO_COPY below.
// Deviation from the origin: the still `.sd-11` image is replaced with an autoplaying,
// muted, looping ascii-bg.mp4 video — it keeps the same class so the sliced aspect-ratio/
// radius rules in hero-design-editor.css still apply. The only other behavior is the
// one-shot `appear` reveal on `.sd-6`, `.sd-9` and `.sd-11`; its opacity/translate/duration/delay/
// easing all live in the sliced CSS, so nothing is re-declared here.

import { Appear } from "@/components/sites/studio-design-8a86c0e4/shared/appear";
import "./hero-design-editor.css";

const HERO_VIDEO = "/ascii-bg.mp4";

export function HeroDesignEditor() {
  return (
    <div className="box sd-3">
      <div className="box sd-4">
        <div className="box sd-5">
          <Appear as="h1" className="box sd-6">
            <span className="text sd-7">ผลงาน</span>
            <span className="text sd-8">งานออกแบบที่เล่าเรื่องราวของทุกแบรนด์ให้ชัดเจน</span>
          </Appear>
          <Appear as="p" className="text sd-9">
            รวมผลงานออกแบบและพัฒนาที่ผ่านมา ตั้งแต่แนวคิดแรกจนถึงชิ้นงานที่ใช้งานจริง
            <br />
            ใส่ใจทุกรายละเอียด ทั้งภาพลักษณ์แบรนด์ ประสบการณ์ผู้ใช้ และแอนิเมชันที่มีชีวิต{" "}
            <br />
            เพื่อให้ทุกโปรเจกต์ออกมาเฉียบคมและใช้งานได้จริง
          </Appear>
        </div>
        <div className="box sd-10">
          {/* Plain <video> so the sliced `.sd-11` rules (aspect-ratio, border-radius) apply
              unchanged. Autoplay requires muted + playsInline for browser autoplay policies. */}
          <Appear
            as="video"
            className="img sd-11"
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
      <div className="box sd-12" />
    </div>
  );
}
