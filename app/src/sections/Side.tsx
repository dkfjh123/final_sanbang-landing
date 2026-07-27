import { A, Cta, GlowCard, Label, Rv, Section } from "../lib/ui";

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

export function NineTen() {
  return (
    <Section bg="warm">
      <Rv>
        <Label>공급 구조</Label>
        <h2 className="t-h2 max-w-3xl text-[1.9rem] md:text-[2.5rem]">
          완제품을 드리지 않습니다.
          <br />
          <span className="text-brand">90%</span>를 드리고, 마지막{" "}
          <span className="text-brand">10%</span>는 남깁니다.
        </h2>
        <p className="t-body mt-7 max-w-2xl text-[15.5px]">
          데우기만 하면 끝나는 완제품은 편합니다. 그런데 그 편리함이{" "}
          <strong className="font-bold text-ink">어디서 먹어도 같은 맛</strong>을 만듭니다.
        </p>
      </Rv>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <Rv>
          <div className="h-full rounded-[24px] border border-brand/30 bg-gradient-to-br from-warm-2 via-warm to-paper p-8 md:p-10">
            <div className="t-label mb-5 text-brand">산방식당이 90%</div>
            <p className="t-body mb-7 text-[14.5px]">
              누가 만들어도 흔들리지 않는 <strong className="font-bold text-ink">‘핵심 맛’</strong>은
              저희가 책임집니다.
            </p>
            <ul className="space-y-3">
              {NINE.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[14.5px] font-semibold text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Rv>

        <Rv d={110}>
          <div className="h-full rounded-[24px] border border-line bg-paper p-8 md:p-10">
            <div className="t-label mb-5 text-muted">사장님이 10%</div>
            <p className="t-body mb-7 text-[14.5px]">
              마지막 10%가 사장님 손에 남기 때문에,{" "}
              <strong className="font-bold text-ink">‘이 가게 맛’</strong>이 됩니다.
            </p>
            <ul className="space-y-3">
              {TEN.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[14.5px] font-semibold text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line bg-warm text-[11px] font-bold text-body">
                    ·
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Rv>
      </div>

      <Rv d={160}>
        <p className="mt-12 text-center text-[17px] font-bold tracking-[-0.02em] text-ink md:text-[21px]">
          산방식당 맛을 파는 게 아니라, <br className="sm:hidden" />
          산방식당 베이스로 만든 <span className="text-brand">사장님 가게 맛</span>을 파시는 겁니다.
        </p>
      </Rv>
    </Section>
  );
}

/* ══ 초격차 사이드 — 겨울 매출 방어선 ═══════════════════════════ */
const SEASON: [string, string, string][] = [
  ["여름", "성수기", "보조"],
  ["겨울", "급락", "매출 방어선"],
];

export function Winter() {
  return (
    <section id="side" className="bg-ink px-5 py-24 md:px-8 md:py-[120px]">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* 앞 섹션(확장 메뉴)에서 자연스럽게 이어받는다.
            "겨울에 어떻게 버티냐"는 위협으로 읽혀 흐름이 끊긴다.
            조합의 제안으로 열고, 계절성은 뒤에서 근거로 붙인다. */}
        <Rv>
          <div className="t-label mb-5 flex items-center gap-2.5 text-gold">
            <span className="h-px w-6 bg-gold/45" />
            한 걸음 더
          </div>
          <h2 className="t-h2 max-w-4xl text-[1.9rem] text-paper md:text-[2.5rem]">
            검증된 밀면에,
            <br />
            <span className="text-gold">브랜드육 돈까스</span>라면?
          </h2>
          <p className="mt-7 max-w-2xl text-[16px] leading-[1.9] text-paper/75 md:text-[17.5px]">
            여름엔 밀면이 끌고, 겨울엔 돈까스가 받칩니다.{" "}
            <strong className="font-semibold text-paper">
              밀면집이 오래전부터 써 온 조합
            </strong>
            이고 — 저희는 그 사이드를 재료부터 다르게 만듭니다.
          </p>
        </Rv>

        {/* 계절 표 */}
        <Rv d={110}>
          <div className="mt-12 overflow-hidden rounded-[24px] border border-paper/15">
            <div className="grid grid-cols-3 bg-paper/10 text-[12.5px] font-bold tracking-[0.02em] text-paper/60">
              <div className="px-4 py-4 md:px-7">계절</div>
              <div className="px-4 py-4 md:px-7">밀면</div>
              <div className="px-4 py-4 md:px-7">사이드</div>
            </div>
            {SEASON.map(([s, m, side], i) => (
              <div
                key={s}
                className={`grid grid-cols-3 text-[14px] md:text-[15px] ${
                  i === 1 ? "bg-gold/10" : ""
                } border-t border-paper/10`}
              >
                <div className="px-4 py-5 font-bold text-paper md:px-7">{s}</div>
                <div className="px-4 py-5 text-paper/55 md:px-7">{m}</div>
                <div
                  className={`px-4 py-5 md:px-7 ${
                    i === 1 ? "font-bold text-gold" : "text-paper/55"
                  }`}
                >
                  {side}
                </div>
              </div>
            ))}
          </div>
        </Rv>

        {/* 돈까스 히어로 + 초격차 정의 */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Rv>
            <img
              src={`${A}/katsu-hero.webp`}
              alt="두툼한 돈까스 단면 — 브랜드육 부위와 두께를 지정해 만든 사이드메뉴"
              width={1000}
              height={1250}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-[24px] object-cover"
            />
          </Rv>

          <Rv d={110}>
            <p className="text-[22px] font-extrabold leading-[1.4] tracking-[-0.03em] text-paper md:text-[28px]">
              “아무 냉동 돈까스나 넣으면
              <br />
              <span className="text-gold">손님이 압니다.”</span>
            </p>

            <div className="mt-9 rounded-[24px] border border-paper/15 bg-paper/5 p-7 md:p-8">
              <div className="t-label mb-4 text-gold">‘초격차’란</div>
              <p className="text-[15px] leading-[1.85] text-paper/80">
                매장에서 <strong className="font-semibold text-paper">재현하기 쉬운 형태</strong>는
                유지하면서, <strong className="font-semibold text-paper">재료와 스펙</strong>으로 격차를
                만든 자리. 지금 시장에서 이 자리는 비어 있습니다.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 text-[13px]">
                {[
                  ["일반 냉동 완제품", "편한데 어디나 같은 맛", false],
                  ["생고기 직접 손질", "손 많이 가고 숙련 필요", false],
                  ["초격차 사이드", "편하면서 여기만의 맛", true],
                ].map(([t, d, on]) => (
                  <div
                    key={t as string}
                    className={`rounded-[16px] border p-4 ${
                      on ? "col-span-2 border-gold/40 bg-gold/10" : "border-paper/12 bg-paper/[0.03]"
                    }`}
                  >
                    <div className={`mb-1 font-bold ${on ? "text-gold" : "text-paper/70"}`}>
                      {t as string}
                    </div>
                    <div className="text-paper/45">{d as string}</div>
                  </div>
                ))}
              </div>
            </div>
          </Rv>
        </div>

        {/* 샘플 오퍼 */}
        <Rv d={140}>
          <div className="mt-14 grid items-center gap-10 rounded-[24px] border border-gold/25 bg-paper/[0.04] p-8 md:grid-cols-[1.1fr_1fr] md:p-12">
            <div>
              <p className="text-[21px] font-extrabold leading-[1.45] tracking-[-0.03em] text-paper md:text-[26px]">
                말로 설명하지 않겠습니다.
                <br />
                <span className="text-gold">샘플을 보내드립니다.</span>
              </p>
              <p className="mt-5 text-[14.5px] leading-[1.9] text-paper/70">
                공급 형태는 매장 주방에 맞춰 정합니다. 직접 튀겨 보시고 판단하시는 게 가장 빠릅니다.
              </p>
              <div className="mt-8">
                <Cta href="#contact" where="side-sample">
                  샘플 요청하기
                </Cta>
              </div>
            </div>
            <img
              src={`${A}/katsu-frying.webp`}
              alt="굵은 빵가루를 입힌 돈까스를 튀기는 공정"
              width={900}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-[20px] object-cover"
            />
          </div>
        </Rv>
      </div>
    </section>
  );
}

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
        <Label>브랜드육</Label>
        <h2 className="t-h2 max-w-3xl text-[1.9rem] md:text-[2.5rem]">
          브랜드육을,
          <br />
          <span className="text-brand">어디보다 경쟁력 있게.</span>
        </h2>
        <p className="t-body mt-7 max-w-2xl text-[15.5px]">
          사이드메뉴는 <strong className="font-bold text-ink">브랜드육 전문</strong> 파트너와 함께
          만듭니다. 고기는 사장님이 가장 알기 어려운 영역이고, 그래서 가장 크게 벌어지는 곳입니다.
        </p>
      </Rv>

      <Rv d={110}>
        <div className="mt-12 overflow-hidden rounded-[24px] border border-line">
          <div className="grid grid-cols-[0.8fr_1fr_1.2fr] bg-warm text-[12.5px] font-bold tracking-[0.02em] text-muted">
            <div className="px-4 py-4 md:px-7">구분</div>
            <div className="px-4 py-4 md:px-7">일반 돈육</div>
            <div className="bg-brand/8 px-4 py-4 text-brand md:px-7">브랜드육</div>
          </div>
          {MEAT.map(([k, a, b], i) => (
            <div
              key={k}
              className={`grid grid-cols-[0.8fr_1fr_1.2fr] text-[13.5px] md:text-[14.5px] ${
                i ? "border-t border-line" : ""
              }`}
            >
              <div className="px-4 py-5 font-bold text-ink md:px-7">{k}</div>
              <div className="px-4 py-5 text-muted md:px-7">{a}</div>
              <div className="bg-brand/8 px-4 py-5 font-semibold text-ink md:px-7">{b}</div>
            </div>
          ))}
        </div>
      </Rv>

      <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-5">
        {EDGE.map((c, i) => (
          <Rv key={c.t} d={i * 110}>
            <GlowCard g={c.g} icon={c.icon} title={c.t} body={c.d} minH={272} />
          </Rv>
        ))}
      </div>

      <Rv d={160}>
        <p className="t-body mt-10 max-w-3xl text-[15px]">
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
          <div className="t-label mb-6 text-brand">단 하나의 조건</div>
          <p className="t-h2 text-[1.7rem] leading-[1.45] md:text-[2.3rem]">
            제주에서는 <span className="text-brand">진행하지 않습니다.</span>
            <br />
            제주의 가치는 제주에서 지킵니다.
          </p>
          <p className="t-body mx-auto mt-8 max-w-lg text-[15px]">
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
