import { useEffect, useRef, useState } from "react";
import { Rv, Section, TITLE_GRADIENT } from "../lib/ui";

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
    <section id="solution" className="bg-dawn px-5 py-20 md:px-8 md:py-[120px]">
      <div className="mx-auto w-full max-w-[900px] text-center">
        <Rv>
          {/* 제목 질감은 다른 섹션과 같은 그라디언트. 단독 문장 섹션이라
              일반 섹션(최대 3.1rem)보다는 크게, 문패(4.8rem)보다는 작게 잡는다.
              ⚠️ ‘무기’에 걸려 있던 text-brand span 은 뺐다 — 그라디언트가 글자
                 전체에 걸리는데 거기만 단색이면 그 부분만 색이 튄다. */}
          <h2
            className="mx-auto max-w-[14em] font-extrabold"
            style={{
              ...TITLE_GRADIENT,
              fontSize: "clamp(2rem, 4.6vw, 3.6rem)",
              lineHeight: 1.16,
              letterSpacing: "-0.045em",
            }}
          >
            간판이 아니라
            <br />
            ‘무기’를 드립니다.
          </h2>
          {/* ⚠️ "가맹이 아닌" 같은 단정은 쓰지 않는다 (공정위 등록 가맹본부).
              사실 서술 — 간판을 안 준다 — 로 말한다. → 08_금지선 · 09_가맹구조 */}
          <p
            className="mx-auto mt-8 max-w-[620px] text-body"
            style={{ fontSize: "clamp(16px, 1.7vw, 19px)", lineHeight: 1.72 }}
          >
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
   레퍼런스: `랜딩페이지_기획안/디자인프롬프트/모션사이트차용.md`

   이전 버전은 카드마다 글이 정가운데 떠 있는 '빈 상자' 였다. 여섯 개가
   똑같이 그러니 화면 전체가 밋밋했다. 레퍼런스가 지적한 그대로다.
   → 에디토리얼 배치로 바꾼다. 번호를 크게 좌상단, 아이콘을 우상단,
     제목·설명은 카드 바닥으로 밀어 내린다(mt-auto). 시선이 위→아래로
     흐르면서 카드마다 '읽는 순서'가 생긴다.

   레퍼런스와 다르게 간 것 (의도된 선택):
     · Framer Motion → CSS.  `motion` 은 package.json 에 있지만 어디서도
       import 하지 않아 번들에 없다. 여기서 부르면 첫 화면이 30~50KB
       무거워진다. 순차 등장은 Rv 의 transition-delay 로 충분하다.
     · Lucide React → 인라인 SVG.  아이콘 5개 때문에 의존성을 늘리지 않는다.
     · 팔레트 → 우리 토큰 유지.  레퍼런스 액센트(#E8872F)와 우리 brand
       (#cf5a1c)는 사실상 같은 계열이고, 토큰을 쓰면 다른 섹션과 어긋나지 않는다.
     · 섹션 눈썹 라벨("이런 상황이라면") → 삭제.  레퍼런스는 넣으라고
       하지만 사용자 지시(2026-07-29): 작은 라벨이 'AI 티'가 난다. 제목을
       키우면 어차피 군더더기다.
   ──────────────────────────────────────────────────────────── */

/* 카드 우상단 아이콘. lucide 를 설치하지 않고 같은 문법(24 뷰박스·1.6 스트로크)
   으로 직접 그린다. 장식이므로 전부 aria-hidden. */
const ICONS: Record<string, React.ReactNode> = {
  flask: <path d="M9 3h6M10 3v6.2a2 2 0 0 1-.3 1L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3l-4.9-7.8a2 2 0 0 1-.3-1V3M7.5 15h9" />,
  store: (
    <>
      <path d="M3 9.5 4.5 4h15L21 9.5M3 9.5V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9.5" />
      <path d="M3 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M9 21v-6h6v6" />
    </>
  ),
  repeat: <path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" />,
  spark: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="1.8" />
    </>
  ),
};

const PROBLEMS = [
  {
    n: "01",
    icon: "flask",
    t: "메뉴 개발의 한계",
    d: "시판 소스로는 차별화가 안 되고, 신메뉴 R&D는 막막합니다.",
    hint: "검증된 베이스부터 드립니다",
  },
  {
    n: "02",
    icon: "store",
    t: "개인 창업 지향",
    d: "프랜차이즈 말고, 내 간판으로 내 사업을 하고 싶습니다.",
    hint: "간판은 사장님 것 그대로",
  },
  {
    n: "03",
    icon: "repeat",
    t: "일관성의 문제",
    d: "주방 인력이 바뀌어도 완벽하게 일관된 ‘핵심 맛’을 지키고 싶습니다.",
    hint: "핵심 맛 90%는 저희가 책임집니다",
  },
  {
    n: "04",
    icon: "spark",
    t: "두 번째 시그니처",
    d: "점심·저녁 손님을 잡을 ‘검증된 두 번째 메뉴’가 간절합니다.",
    hint: "확장 메뉴 8종에서 고르시면 됩니다",
  },
  {
    n: "05",
    icon: "target",
    t: "킬러 레시피",
    d: "수많은 식당 사이에서 살아남을 ‘필살기 메뉴’가 막막합니다.",
    hint: "55년 줄 서던 그 맛입니다",
  },
];

/* 카드 공통 높이 — 여섯 칸이 한 판처럼 보이려면 답 카드도 같은 값을 쓴다.
   ⚠️ 모바일에서는 최소 높이를 두지 않는다. 예전엔 320px 를 강제해서 글이
      짧은 카드에 빈 공간이 남았고, 여섯 장이 세로로 쌓이니 스크롤이 끝없이
      길어졌다(사용자 지적 — "보다가 나갈 것 같다").
      데스크톱은 3열이라 높이를 맞춰야 판처럼 보이므로 md 부터만 건다. */
const CARD_H = "min-h-0 md:min-h-[clamp(300px,27vw,352px)]";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function ProblemCard({ p }: { p: (typeof PROBLEMS)[number] }) {
  const [on, setOn] = useState(false);
  return (
    <article
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      className={`relative flex h-full cursor-default flex-col overflow-hidden rounded-[32px] border bg-paper p-6 md:p-9 ${CARD_H}`}
      style={{
        transition: `transform 350ms ${EASE}, border-color 350ms ${EASE}, box-shadow 350ms ${EASE}`,
        transform: on ? "translateY(-8px)" : "translateY(0)",
        borderColor: on
          ? "color-mix(in srgb, var(--color-brand) 45%, transparent)"
          : "var(--color-line)",
        boxShadow: on ? "0 24px 60px rgba(51, 35, 23, 0.10)" : "0 0 0 rgba(0,0,0,0)",
      }}
    >
      {/* 장식 — 육수에 번지는 파문. 삽화를 쓰지 않고 원 세 개로만 만든다.
          호버하면 아주 천천히 돌면서 살짝 커진다. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 h-[230px] w-[230px]"
        style={{
          transition: `transform 900ms ${EASE}, opacity 350ms ${EASE}`,
          transform: on ? "rotate(8deg) scale(1.06)" : "rotate(0deg) scale(1)",
          opacity: on ? 0.5 : 0.32,
        }}
      >
        <div className="absolute inset-0 rounded-full border border-brand/25" />
        <div className="absolute inset-[16%] rounded-full border border-brand/20" />
        <div className="absolute inset-[34%] rounded-full border border-brand/15" />
      </div>

      {/* 위 — 번호(좌) · 아이콘(우) */}
      <div className="relative flex items-start justify-between">
        <span
          className="font-extrabold"
          style={{
            fontSize: "clamp(2.4rem, 4.6vw, 5.2rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.06em",
            color: "color-mix(in srgb, var(--color-brand) 42%, transparent)",
          }}
        >
          {p.n}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="mt-1.5 h-6 w-6 shrink-0 text-ink"
          style={{ transition: `opacity 350ms ${EASE}`, opacity: on ? 0.75 : 0.3 }}
        >
          {ICONS[p.icon]}
        </svg>
      </div>

      {/* 아래 — 제목·설명을 바닥으로 밀어 내린다 */}
      <div className="relative mt-auto pt-6 md:pt-8">
        <h3
          className="font-extrabold tracking-[-0.035em]"
          style={{
            fontSize: "clamp(1.35rem, 1.9vw, 1.85rem)",
            lineHeight: 1.28,
            transition: `color 350ms ${EASE}`,
            color: on ? "var(--color-brand)" : "var(--color-ink)",
          }}
        >
          {p.t}
        </h3>
        <p className="t-body mt-3.5 max-w-[94%] text-[15px] leading-[1.7] md:text-[15.5px]">{p.d}</p>

        {/* 호버할 때만 열리는 한 줄 — 답을 미리 한 조각 보여 준다 */}
        <div
          className="overflow-hidden"
          style={{
            transition: `max-height 350ms ${EASE}, opacity 350ms ${EASE}`,
            maxHeight: on ? 56 : 0,
            opacity: on ? 1 : 0,
          }}
        >
          <div className="mt-4 border-t border-brand/20 pt-3.5 text-[13.5px] font-bold text-brand">
            {p.hint}
          </div>
        </div>
      </div>
    </article>
  );
}

/* 답 카드 — 고민 다섯 개를 받아 내는 여섯 번째 칸.
   같은 크기의 칸이지만 어두운 면·글로우·큰 카피로 무게를 다르게 준다. */
function AnswerCard() {
  const [on, setOn] = useState(false);
  return (
    <article
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      className={`relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[32px] border p-6 md:gap-0 md:p-9 ${CARD_H}`}
      style={{
        background: "var(--color-ink)",
        transition: `transform 350ms ${EASE}, border-color 350ms ${EASE}`,
        transform: on ? "scale(1.015)" : "scale(1)",
        borderColor: on
          ? "color-mix(in srgb, var(--color-brand) 40%, transparent)"
          : "rgba(255,255,255,0.08)",
      }}
    >
      {/* 따뜻한 글로우 — 호버하면 조금 더 밝아진다 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          transition: `opacity 350ms ${EASE}`,
          opacity: on ? 1 : 0.72,
          background:
            "radial-gradient(circle at 75% 18%, rgba(232,135,47,0.22), transparent 42%)",
        }}
      />
      {/* 위에서 내려다본 그릇 / 제주 돌 — 원과 그라디언트만으로 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-20 h-[280px] w-[280px] rounded-full"
        style={{
          transition: `transform 900ms ${EASE}`,
          transform: on ? "rotate(6deg)" : "rotate(0deg)",
          border: "1px solid rgba(237,164,39,0.30)",
          background: "radial-gradient(circle at 40% 35%, rgba(237,164,39,0.16), transparent 62%)",
        }}
      />

      <div className="relative">
        <span className="text-[13px] font-bold tracking-[0.12em] text-gold">산방식당의 답</span>
        <p
          className="mt-5 font-extrabold text-paper"
          style={{
            fontSize: "clamp(1.7rem, 2.5vw, 2.4rem)",
            lineHeight: 1.16,
            letterSpacing: "-0.045em",
          }}
        >
          {/* 밑줄은 텍스트 그라디언트 대신 얇은 선으로 — 레퍼런스 지시 */}
          <span
            style={{
              boxShadow: "inset 0 -0.28em 0 0 color-mix(in srgb, var(--color-brand) 42%, transparent)",
            }}
          >
            ‘검증된 맛’
          </span>
          <br />그 하나면 됩니다
        </p>
        <p className="mt-5 max-w-[430px] text-[15.5px] leading-[1.7] text-paper/60 md:text-[16.5px]">
          55년간 줄 서던 육수 · 비빔장 · 생면을 그대로.
        </p>
      </div>

      <div className="relative">
        <span className="inline-flex rounded-full border border-paper/20 px-4 py-1.5 text-[11.5px] font-medium tracking-[0.15em] text-paper/70">
          SINCE 1971 · JEJU
        </span>
      </div>
    </article>
  );
}

/* 배경에 아주 크게 깔리는 '1971'. 스크롤에 따라 세로로 ±40px 흐른다.
   opacity 를 0.06 아래로 유지해 글 읽기를 방해하지 않는다.
   ⚠️ 스크롤을 잠그지 않는다 — 히어로와 같은 원칙. 조작권은 사용자에게. */
function useScrollShift(ref: React.RefObject<HTMLElement | null>, range = 40) {
  const [y, setY] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // 섹션이 화면을 통과하는 동안 0 → 1
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      setY((Math.min(1, Math.max(0, p)) - 0.5) * 2 * range);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, range]);
  return y;
}

export function Problems() {
  const ref = useRef<HTMLElement>(null);
  const shift = useScrollShift(ref);

  return (
    <section ref={ref} className="bg-stone relative px-5 py-20 md:px-8 md:py-[120px]" style={{ overflowX: "clip" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[38%] select-none text-center font-extrabold leading-none"
        style={{
          transform: `translateY(${shift}px)`,
          fontSize: "clamp(9rem, 26vw, 26rem)",
          letterSpacing: "-0.06em",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(36,26,19,0.06)",
        }}
      >
        1971
      </div>

      <div className="relative mx-auto w-full max-w-[1200px]">
        <Rv>
          {/* 눈썹 라벨은 뺐다 — 작은 라벨이 'AI 티'가 난다(사용자 지시).
              대신 제목을 에디토리얼 스케일로 키워 첫 인상을 여기서 만든다. */}
          {/* 모바일은 가운데 정렬 — 좁은 화면에서 왼쪽으로 몰린 글은 여백이
              한쪽에만 남아 어수선하다(사용자 지시 2026-07-29). 데스크톱은
              에디토리얼 배치를 유지한다. */}
          <h2
            className="mx-auto max-w-[900px] text-center font-extrabold lg:mx-0 lg:text-left"
            style={{
              ...TITLE_GRADIENT,
              fontSize: "clamp(2.1rem, 5.2vw, 4.2rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.045em",
            }}
          >
            혹시, 이런 고민
            <br />
            중이십니까?
          </h2>
          {/* 리드 문장("‘원팩’의 편리함이 무너뜨린 맛의 기준 — 다시 세웁니다")은
              뺐다(사용자 지시 2026-07-29). 모바일에서 제목 아래 작은 글씨 한 줄이
              힘없이 붙어 보였고, 어차피 고민 카드 여섯 장이 곧바로 그 말을 한다.
              제목 → 카드로 바로 넘어가는 편이 세다. */}
        </Rv>

        {/* 순차 등장 — 레퍼런스의 0 / 0.08 / 0.16 … 를 Rv 지연으로 옮겼다 */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Rv key={p.n} d={i * 80} className="h-full">
              <ProblemCard p={p} />
            </Rv>
          ))}
          <Rv d={400} className="h-full">
            <AnswerCard />
          </Rv>
        </div>
      </div>
    </section>
  );
}
