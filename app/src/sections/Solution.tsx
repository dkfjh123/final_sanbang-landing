import { useState } from "react";
import { Label, Rv, Section } from "../lib/ui";

/* ══ ⑥ CHAPTER 02 · 파트너십 철학 — 소개서 8·9p ═════════════════ */
const VALUES = [
  { t: "도민에게", d: "언제나 그 자리에 있는, 믿고 찾는 우리 지역의 든든한 식당." },
  { t: "관광객에게", d: "한 끼가 아니라 ‘제주 로컬의 맛을 경험하는’ 여행의 한 장면." },
  { t: "브랜드 파트너에게", d: "긴 세월 쌓아 온 산방식당의 노하우와 브랜드를 함께 나눕니다." },
  { t: "메뉴솔루션 파트너에게", d: "사장님의 브랜드를 빛나게 할 강력한 ‘무기’가 되어 드립니다." },
];

export function Philosophy() {
  return (
    <Section bg="warm">
      <Rv>
        <Label>CHAPTER 02 · 파트너십 철학</Label>
        <h2 className="t-h2 max-w-3xl text-[1.9rem] md:text-[2.5rem]">
          만나는 분들마다
          <br />
          <span className="text-brand">다른 가치</span>를 드립니다
        </h2>
        <p className="t-body mt-7 max-w-2xl text-[15.5px]">
          55년간 지켜온 단 하나의 원칙 — <strong className="font-bold text-ink">“가치와 기억을 드리는 것.”</strong>
        </p>
      </Rv>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {VALUES.map((v, i) => (
          <Rv key={v.t} d={(i % 2) * 90}>
            <div
              className={`h-full rounded-[24px] border p-8 transition-[border-color,box-shadow] duration-200 ${
                i === 3
                  ? "border-brand bg-gradient-to-br from-warm-2 via-warm to-paper"
                  : "border-line bg-paper"
              }`}
            >
              <h3 className={`t-h3 mb-3 text-[18px] ${i === 3 ? "text-brand" : ""}`}>{v.t}</h3>
              <p className="t-body text-[14.5px]">{v.d}</p>
            </div>
          </Rv>
        ))}
      </div>

      <Rv d={120}>
        <p className="mt-12 text-center text-[17px] font-bold tracking-[-0.02em] text-ink md:text-[21px]">
          브랜드 이름보다 <span className="text-brand">‘검증된 맛’</span>에 집중합니다.
        </p>
      </Rv>
    </Section>
  );
}

/* ══ ⑦ CHAPTER 03 · 메뉴솔루션 — 소개서 10p ═════════════════════ */
export function Weapon() {
  return (
    <section id="solution" className="bg-dawn px-5 py-24 md:px-8 md:py-[120px]">
      <div className="mx-auto w-full max-w-[900px] text-center">
        <Rv>
          <div className="t-label mb-6 text-brand">CHAPTER 03 · 메뉴솔루션 파트너</div>
          <h2 className="t-h2 text-[2.1rem] md:text-[3rem]">
            간판이 아니라
            <br />
            <span className="text-brand">‘무기’</span>를 드립니다.
          </h2>
          {/* ⚠️ "가맹이 아닌" 같은 단정은 쓰지 않는다 (공정위 등록 가맹본부).
              사실 서술 — 간판을 안 준다 — 로 말한다. → 08_금지선 · 09_가맹구조 */}
          <p className="t-body mx-auto mt-8 max-w-xl text-[16px]">
            간판은 사장님 것 그대로 두고,{" "}
            <strong className="font-bold text-ink">‘검증된 맛’</strong>만{" "}
            <strong className="font-bold text-ink">‘우리 매장’</strong>에 도입하는 방식입니다.
          </p>
        </Rv>
      </div>
    </section>
  );
}

/* ══ ⑧ 이런 고민 중이십니까 ═════════════════════════════════════
   균일한 3열 박스 그리드는 '기본값' 티가 난다. 카드가 스스로 설계된
   물건으로 보이도록 구조를 바꿨다:
     · 내용을 카드 아래로 밀어붙이고(spacer) 위에는 배지만 남긴다
     · 호버하면 아래에서 따뜻한 면이 차오르고, 글이 8px 뜨고,
       숨어 있던 한 줄이 max-height 로 열린다 (500ms)
     · 간격을 12px 로 좁혀 카드끼리 판처럼 붙는다
     · 배지 아이콘은 링 → 점이 커지는 진행형 — 고민이 깊어지는 순서
   ──────────────────────────────────────────────────────────── */

const PROBLEMS = [
  {
    n: "01",
    t: "메뉴 개발의 한계",
    d: "시판 소스로는 차별화가 안 되고, 신메뉴 R&D는 막막합니다.",
    hint: "검증된 베이스부터 드립니다",
  },
  {
    n: "02",
    t: "개인 창업 지향",
    d: "프랜차이즈 말고, 내 간판으로 내 사업을 하고 싶습니다.",
    hint: "간판은 사장님 것 그대로",
  },
  {
    n: "03",
    t: "일관성의 문제",
    d: "주방 인력이 바뀌어도 완벽하게 일관된 ‘핵심 맛’을 지키고 싶습니다.",
    hint: "핵심 맛 90%는 저희가 책임집니다",
  },
  {
    n: "04",
    t: "두 번째 시그니처",
    d: "점심·저녁 손님을 잡을 ‘검증된 두 번째 메뉴’가 간절합니다.",
    hint: "확장 메뉴 8종에서 고르시면 됩니다",
  },
  {
    n: "05",
    t: "킬러 레시피",
    d: "수많은 식당 사이에서 살아남을 ‘필살기 메뉴’가 막막합니다.",
    hint: "55년 줄 서던 그 맛입니다",
  },
];

function ProblemCard({ p, i }: { p: (typeof PROBLEMS)[number]; i: number }) {
  const [on, setOn] = useState(false);
  return (
    <div
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      className="relative flex cursor-default flex-col items-center justify-center overflow-hidden rounded-[28px] border border-line bg-warm px-7 text-center transition-colors duration-500 md:px-9"
      style={{
        height: "clamp(260px, 26vw, 330px)",
        borderColor: on ? "color-mix(in srgb, var(--color-brand) 32%, transparent)" : undefined,
      }}
    >
      {/* 아래에서 차오르는 면 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 transition-all duration-500"
        style={{
          height: "78%",
          background: "linear-gradient(to top, var(--color-warm-2) 45%, transparent)",
          transform: on ? "translateY(0)" : "translateY(100%)",
          opacity: on ? 1 : 0,
        }}
      />

      {/* 번호 — 알약도 아이콘도 없이 숫자 하나 */}
      <span
        className="relative mb-5 font-extrabold leading-none tracking-[-0.02em] transition-all duration-500"
        style={{
          fontSize: "17px",
          color: "var(--color-brand)",
          opacity: on ? 1 : 0.45,
          transform: on ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {i + 1}
      </span>

      {/* 제목 — 크게, 가운데. 호버하면 살짝 커지며 색이 든다 */}
      <h3
        className="relative font-extrabold tracking-[-0.035em] transition-all duration-500"
        style={{
          fontSize: "clamp(21px, 2.1vw, 27px)",
          lineHeight: 1.32,
          color: on ? "var(--color-brand)" : "var(--color-ink)",
          transform: on ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
        }}
      >
        {p.t}
      </h3>

      <p
        className="t-body relative mt-4 text-[14.5px] transition-all duration-500"
        style={{ transform: on ? "translateY(-6px)" : "translateY(0)" }}
      >
        {p.d}
      </p>

      {/* 호버할 때만 열리는 한 줄 */}
      <div
        className="relative w-full overflow-hidden transition-all duration-500"
        style={{
          maxHeight: on ? 60 : 0,
          opacity: on ? 1 : 0,
          transform: on ? "translateY(0)" : "translateY(14px)",
        }}
      >
        <div className="mt-5 border-t border-brand/20 pt-4 text-[13.5px] font-bold text-brand">
          {p.hint}
        </div>
      </div>
    </div>
  );
}

export function Problems() {
  return (
    <Section bg="paper">
      <Rv>
        <Label>이런 상황이라면</Label>
        <h2 className="t-h2 max-w-3xl text-[1.9rem] md:text-[2.5rem]">혹시, 이런 고민 중이십니까?</h2>
        <p className="t-body mt-7 max-w-2xl text-[15.5px]">
          <strong className="font-bold text-ink">‘원팩’</strong>의 편리함이 무너뜨린 맛의 기준 — 다시
          세웁니다.
        </p>
      </Rv>

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PROBLEMS.map((p, i) => (
          <Rv key={p.n} d={(i % 3) * 80}>
            <ProblemCard p={p} i={i} />
          </Rv>
        ))}

        {/* 답 — 마지막 칸. 고민 카드와 같은 리듬으로 가운데 정렬 */}
        <Rv d={160}>
          <div
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-[28px] bg-ink px-7 text-center md:px-9"
            style={{ height: "clamp(260px, 26vw, 330px)" }}
          >
            <span className="mb-5 text-[13px] font-bold tracking-[0.14em] text-gold">
              산방식당의 답
            </span>
            <p
              className="font-extrabold tracking-[-0.035em] text-paper"
              style={{ fontSize: "clamp(23px, 2.3vw, 30px)", lineHeight: 1.32 }}
            >
              ‘검증된 맛’
              <br />그 하나면 됩니다
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-paper/55">
              55년간 줄 서던 육수 · 비빔장 · 생면을 그대로.
            </p>
          </div>
        </Rv>
      </div>
    </Section>
  );
}
