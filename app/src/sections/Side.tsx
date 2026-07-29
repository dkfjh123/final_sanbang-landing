import { GlowCard, Rv, Section, TITLE_GRADIENT } from "../lib/ui";

/* ══ 신규 섹션 3종 (2026-07-28) ═════════════════════════════════
   기획: 랜딩페이지_기획안/03·04·05

   ⚠️ 문구 금지선 (08_금지선.md)
     · 우리 공급품을 '원팩'이라 부르지 않는다 → "90%"로 말한다.
       앞 섹션에서 원팩을 비판하므로 자기모순이 된다.
     · 생산 파트너 업체명은 쓰지 않는다 → "브랜드육 전문"
     · 브랜드육 실명(도드람·선진 등)은 협의 전까지 쓰지 않는다
       → "국내 대형 브랜드육"
     · 원가·마진 수치는 랜딩에 절대 넣지 않는다 (1:1 영업자료 전용)
     · 돈까스 공급 형태(염지육/냉동/반조리/완조리)는 미확정이므로
       형태를 특정하지 않는다. 대신 '샘플 시식'을 오퍼로 쓴다.
   ──────────────────────────────────────────────────────────── */

/* ══ 90 : 10 — 공급 구조 ════════════════════════════════════════ */
const NINE = [
  "오래 끓인 육수",
  "고운 고춧가루 비빔장",
  "가수율 45%+ 생면",
  "레시피 · 현장 조리 교육",
];
const TEN = ["불 조절과 타이밍", "담음새 · 고명", "곁들임 구성", "이 가게만의 변주"];

/* 카드 한 장 — 숫자를 카드의 얼굴로 세운다.
   이 섹션의 주인공은 90 과 10 두 숫자인데, 예전엔 11px 라벨("산방식당이 90%")
   안에 묻혀 있어서 정작 안 읽혔다. 숫자를 카드 맨 위에 크게 놓고 그 아래로
   설명이 흐르게 바꿨다. 카드 생김새도 다른 섹션 카드(라운드 32px)에 맞췄다. */
function SplitCard({
  n,
  who,
  lead,
  items,
  own,
}: {
  n: string;
  who: string;
  lead: React.ReactNode;
  items: string[];
  /** 산방식당 몫이면 true — 색과 마크가 달라진다 */
  own: boolean;
}) {
  return (
    <div
      className={`h-full rounded-[32px] border p-8 md:p-10 ${
        own
          ? "border-brand/35 bg-gradient-to-br from-warm-2 via-warm to-paper"
          : "border-line bg-paper"
      }`}
    >
      <div
        className={`font-extrabold ${own ? "text-brand" : "text-ink/35"}`}
        style={{ fontSize: "clamp(3.2rem, 6.5vw, 5.2rem)", lineHeight: 0.9, letterSpacing: "-0.06em" }}
      >
        {n}
      </div>
      <div
        className={`mt-3 font-extrabold tracking-[-0.03em] ${own ? "text-ink" : "text-body"}`}
        style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.4rem)" }}
      >
        {who}
      </div>

      <p className="mt-4 text-body" style={{ fontSize: "clamp(14.5px, 1.5vw, 16.5px)", lineHeight: 1.72 }}>
        {lead}
      </p>

      <ul className="mt-8 space-y-3.5">
        {items.map((t) => (
          <li
            key={t}
            className="flex items-start gap-3 font-semibold text-ink"
            style={{ fontSize: "clamp(15px, 1.6vw, 17px)" }}
          >
            <span
              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                own ? "bg-brand text-white" : "border border-line bg-warm text-body"
              }`}
            >
              {own ? "✓" : "·"}
            </span>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NineTen() {
  return (
    <Section bg="warm">
      <Rv>
        {/* ⚠️ 90%·10% 에 걸려 있던 text-brand span 은 뺐다 — 제목에 그라디언트가
            걸리면 그 부분만 색이 튄다. 두 숫자의 강조는 아래 카드가 맡는다. */}
        <h2
          className="mx-auto max-w-[16em] text-center font-extrabold"
          style={{
            ...TITLE_GRADIENT,
            fontSize: "clamp(1.85rem, 4vw, 3.1rem)",
            lineHeight: 1.18,
            letterSpacing: "-0.04em",
          }}
        >
          완제품을 드리지 않습니다.
          <br />
          90%를 드리고, 마지막 10%는 남깁니다.
        </h2>
        <p
          className="mx-auto mt-6 max-w-[680px] text-center text-body"
          style={{ fontSize: "clamp(15.5px, 1.6vw, 18px)", lineHeight: 1.7 }}
        >
          데우기만 하면 끝나는 완제품은 편합니다. 그런데 그 편리함이{" "}
          <strong className="font-bold text-ink">어디서 먹어도 같은 맛</strong>을 만듭니다.
        </p>
      </Rv>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <Rv>
          <SplitCard
            n="90%"
            who="산방식당이 책임집니다"
            lead={
              <>
                누가 만들어도 흔들리지 않는 <strong className="font-bold text-ink">‘핵심 맛’</strong>.
              </>
            }
            items={NINE}
            own
          />
        </Rv>

        <Rv d={110}>
          <SplitCard
            n="10%"
            who="사장님 손에 남깁니다"
            lead={
              <>
                이 마지막 10% 때문에 <strong className="font-bold text-ink">‘이 가게 맛’</strong>이 됩니다.
              </>
            }
            items={TEN}
            own={false}
          />
        </Rv>
      </div>

      <Rv d={160}>
        <p
          className="mx-auto mt-14 max-w-[900px] text-center font-extrabold tracking-[-0.035em] text-ink"
          style={{ fontSize: "clamp(1.2rem, 2.6vw, 2rem)", lineHeight: 1.45 }}
        >
          산방식당 맛을 파는 게 아니라, <br className="sm:hidden" />
          산방식당 베이스로 만든 <span className="text-brand">사장님 가게 맛</span>을 파시는 겁니다.
        </p>
      </Rv>
    </Section>
  );
}

/* 샘플 오퍼 블록(“말로 설명하지 않겠습니다 / 샘플을 보내드립니다” + 샘플
   요청 CTA + katsu-frying 사진)은 2026-07-29 사용자 지시로 삭제했다.
   원래 `#side` 다크 섹션의 마지막 블록이었다.
   ⚠️ 이 페이지에서 '샘플 시식'을 오퍼로 쓰던 유일한 자리였다
      (기획 05_초격차사이드). 되살릴 일이 있으면 git 이력에서 꺼낼 것. */

/* ══ 브랜드육 ═══════════════════════════════════════════════════ */
const MEAT: [string, string, string][] = [
  ["이력", "원산지만, 뭉뚱그려짐", "어느 농장·어떤 사육인지 추적 가능"],
  ["품질 편차", "들어오는 로트마다 다름", "등급·규격이 관리됨"],
  ["이름", "없음", "국내 대형 브랜드육 — 이름이 있다"],
  ["손님에게", "설명할 게 없음", "메뉴판에 쓸 수 있는 근거가 된다"],
];

const EDGE = [
  {
    t: "고르는 게 아니라 만듭니다",
    d: "공장이 만든 것 중에서 고르지 않습니다. 부위 · 두께 · 염지 · 빵가루를 지정해서 만듭니다.",
    g: "linear-gradient(137deg, #b03a24 0%, #cf5a1c 48%, #f6c775 100%)",
    icon: (
      <>
        <path d="M4 7h16M4 12h16M4 17h10" />
        <circle cx="18" cy="17" r="3" />
      </>
    ),
  },
  {
    t: "이 매장에 맞춥니다",
    d: "전 매장 동일 스펙이 아닙니다. 주방 동선과 객단가를 보고 그 매장에 맞춰 조정합니다.",
    g: "linear-gradient(137deg, #eda427 0%, #f6c775 48%, #fff6e4 100%)",
    icon: (
      <>
        <path d="M3 20V9l9-6 9 6v11" />
        <path d="M9 20v-6h6v6" />
      </>
    ),
  },
  {
    t: "만드는 대표가 직접 옵니다",
    d: "슈퍼바이저가 아니라 결정권자가 매장을 봅니다. 스펙 변경을 그 자리에서 말할 수 있습니다.",
    g: "linear-gradient(137deg, #1d7b86 0%, #7fc4c9 48%, #eaf3f2 100%)",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
      </>
    ),
  },
];

export function BrandMeat() {
  return (
    <Section bg="paper">
      <Rv>
        <h2
          className="mx-auto max-w-[16em] text-center font-extrabold"
          style={{
            ...TITLE_GRADIENT,
            fontSize: "clamp(1.85rem, 4vw, 3.1rem)",
            lineHeight: 1.18,
            letterSpacing: "-0.04em",
          }}
        >
          그래서 고기부터
          <br />
          다시 봤습니다.
        </h2>
        {/* ⚠️ 두 가지를 지킨다.
            ① 주어를 업체로 넘기지 않는다 — "○○사는 …" 이 아니라 "저희가
               지정합니다". 넘기는 순간 '협력업체 소개'가 된다(사용자 우려).
            ② 부정형("직접 만들지 않습니다")을 쓰지 않는다 — 변명처럼 읽힌다.
               '함께 준비해 온 파트너'라는 긍정형으로 같은 사실을 말한다.
            업체명(민들레푸드)은 끝까지 쓰지 않는다 → 08_금지선 */}
        <p
          className="mx-auto mt-6 max-w-[680px] text-center text-body"
          style={{ fontSize: "clamp(15.5px, 1.6vw, 18px)", lineHeight: 1.7 }}
        >
          2019년부터 같은 방향을 준비해 온 파트너사와 함께,{" "}
          <strong className="font-bold text-ink">부위 · 두께 · 염지 · 빵가루까지 지정</strong>해 만듭니다.
          고기는 사장님이 가장 알기 어려운 영역이고, 그래서 가장 크게 벌어지는 곳입니다.
        </p>
      </Rv>

      {/* 비교표 — 오른쪽(브랜드육) 열의 글씨를 키워 체급을 벌린다.
          비교 섹션(부산 vs 제주)에서 쓴 것과 같은 방식이라 페이지 안에서 일관된다. */}
      <Rv d={110}>
        <div className="mt-12 overflow-hidden rounded-[24px] border border-line">
          <div className="grid grid-cols-[0.7fr_1fr_1.3fr] bg-warm text-[12.5px] font-bold tracking-[0.02em] text-muted md:text-[13.5px]">
            <div className="px-4 py-4 md:px-7">구분</div>
            <div className="px-4 py-4 md:px-7">일반 돈육</div>
            <div className="bg-brand/8 px-4 py-4 text-brand md:px-7">브랜드육</div>
          </div>
          {MEAT.map(([k, a, b], i) => (
            <div
              key={k}
              className={`grid grid-cols-[0.7fr_1fr_1.3fr] items-center ${i ? "border-t border-line" : ""}`}
            >
              <div className="px-4 py-5 text-[13px] font-bold text-ink md:px-7 md:text-[14px]">{k}</div>
              <div className="px-4 py-5 text-[12.5px] text-muted md:px-7 md:text-[13.5px]">{a}</div>
              <div
                className="bg-brand/8 px-4 py-5 font-bold text-ink md:px-7"
                style={{ fontSize: "clamp(14px, 1.8vw, 18px)", letterSpacing: "-0.025em" }}
              >
                {b}
              </div>
            </div>
          ))}
        </div>
      </Rv>

      {/* 카드 세로를 줄였다(272 → 200). 글이 짧은 카드라 높이가 남으면
          위쪽에 빈 공간만 생겨 '덜 채운 카드'로 보인다. */}
      <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-5">
        {EDGE.map((c, i) => (
          <Rv key={c.t} d={i * 110}>
            <GlowCard g={c.g} icon={c.icon} title={c.t} body={c.d} minH={200} />
          </Rv>
        ))}
      </div>

      <Rv d={160}>
        <p
          className="mx-auto mt-12 max-w-[760px] text-center text-body"
          style={{ fontSize: "clamp(15px, 1.6vw, 17.5px)", lineHeight: 1.7 }}
        >
          밀면과 세트로 구성하면 여름·겨울이 서로를 받쳐 줍니다. 어떤 조합이 맞을지는 매장을 보고
          제안드립니다.
        </p>
      </Rv>
    </Section>
  );
}

/* ══ 제주 제외 ══════════════════════════════════════════════════
   담백하게, 변명 없이. 길게 설명할수록 약해진다. */
export function JejuOnly() {
  // '제주'를 말하는 섹션 — 노을(bg-dusk)을 조금 더 보여 준다
  return (
    <section className="bg-dusk px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[900px] text-center">
        <Rv>
          {/* 눈썹 라벨('단 하나의 조건')은 걷어냈다 — 페이지 전체에서 작은
              라벨을 없애기로 했다(사용자 지시 2026-07-29).
              ⚠️ '진행하지 않습니다'에 걸려 있던 text-brand span 도 뺐다.
                 제목 전체에 그라디언트가 걸리므로 거기만 단색이면 색이 튄다. */}
          <h2
            className="mx-auto max-w-[15em] font-extrabold"
            style={{
              ...TITLE_GRADIENT,
              fontSize: "clamp(1.7rem, 3.8vw, 2.9rem)",
              lineHeight: 1.32,
              letterSpacing: "-0.04em",
            }}
          >
            제주에서는 진행하지 않습니다.
            <br />
            제주의 가치는 제주에서 지킵니다.
          </h2>
          <p
            className="mx-auto mt-7 max-w-[620px] text-body"
            style={{ fontSize: "clamp(15px, 1.6vw, 17.5px)", lineHeight: 1.75 }}
          >
            이미 자리를 지키고 계신 제주 매장들의 상권을 지키기 위한 원칙입니다.
            <br className="hidden sm:block" />
            <strong className="font-bold text-ink">
              이름을 아끼는 이유가, 맛의 가치를 지키는 이유입니다.
            </strong>
          </p>
        </Rv>
      </div>
    </section>
  );
}
