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
    <section
      id="solution"
      className="px-5 py-24 md:px-8 md:py-[120px]"
      style={{
        background: "radial-gradient(120% 90% at 50% 0%, #fbe9cd 0%, #fdf3e2 45%, #fffdf8 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-[900px] text-center">
        <Rv>
          <div className="t-label mb-6 text-brand">CHAPTER 03 · 메뉴솔루션 파트너</div>
          <h2 className="t-h2 text-[2.1rem] md:text-[3rem]">
            간판이 아니라
            <br />
            <span className="text-brand">‘무기’</span>를 드립니다.
          </h2>
          <p className="t-body mx-auto mt-8 max-w-xl text-[16px]">
            가맹이 아닌, <strong className="font-bold text-ink">‘검증된 맛’</strong>을{" "}
            <strong className="font-bold text-ink">‘우리 매장’</strong>에 도입하는 방식입니다.
          </p>
        </Rv>
      </div>
    </section>
  );
}

/* ══ ⑧ 이런 고민 중이십니까 — 소개서 11p ════════════════════════ */
const PROBLEMS = [
  { n: "01", t: "메뉴 개발의 한계", d: "시판 소스로는 차별화가 안 되고, 신메뉴 R&D는 막막합니다." },
  { n: "02", t: "개인 창업 지향", d: "프랜차이즈 말고, 내 간판으로 내 사업을 하고 싶습니다." },
  { n: "03", t: "일관성의 문제", d: "주방 인력이 바뀌어도 완벽하게 일관된 ‘핵심 맛’을 지키고 싶습니다." },
  { n: "04", t: "두 번째 시그니처", d: "점심·저녁 손님을 잡을 ‘검증된 두 번째 메뉴’가 간절합니다." },
  { n: "05", t: "킬러 레시피", d: "수많은 식당 사이에서 살아남을 ‘필살기 메뉴’가 막막합니다." },
];

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

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROBLEMS.map((p, i) => (
          <Rv key={p.n} d={(i % 3) * 90}>
            <div className="h-full rounded-[24px] border border-line bg-warm p-8 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_12px_32px_rgba(23,18,15,0.08)]">
              <div className="t-label mb-6 text-brand/60">{p.n}</div>
              <h3 className="t-h3 mb-3 text-[18px]">{p.t}</h3>
              <p className="t-body text-[14.5px]">{p.d}</p>
            </div>
          </Rv>
        ))}

        <Rv d={180}>
          <div className="flex h-full flex-col justify-center rounded-[24px] bg-ink p-8 text-center">
            <div className="t-label mb-4 text-gold">산방식당의 답</div>
            <p className="text-[24px] font-extrabold leading-tight tracking-[-0.03em] text-paper md:text-[27px]">
              ‘검증된 맛’
              <br />그 하나면 됩니다
            </p>
          </div>
        </Rv>
      </div>
    </Section>
  );
}
