import { A, Label, Rv, Section } from "../lib/ui";

/* ══ ⑬ 간판은 드리지 않습니다 ═══════════════════════════════════
   ⚠️ "가맹 아님 / 가맹비 없음"으로 단정하지 말 것.
      (주)산방에프앤비는 공정위에 등록된 가맹본부다. 단정하면 사실과 어긋난다.
      → 대신 "간판을 드리지 않는다"는 사실을 먼저 선언하고,
        그래서 로열티가 0원이라는 논리로 잇는다.
        숨기지 않고 앞세우는 편이 법적으로도 마케팅적으로도 유리하다.
      상세 → 랜딩페이지_기획안/09·10
   ──────────────────────────────────────────────────────────── */
const TRADE: [string, string, string][] = [
  ["로열티", "매달 매출의 일부", "0원"],
  ["계약 기간", "수년 구속 · 위약금", "없음 — 언제든 중단"],
  ["간판 · 상호", "본사 지정", "사장님 것 그대로"],
  ["인테리어", "본사 지정 업체", "자율"],
  ["메뉴 · 가격", "본사 승인 · 통제", "자율"],
  ["다른 지점 이슈", "내 매장까지 영향", "내 평판만 내 것"],
];

export function NotFranchise() {
  return (
    <Section bg="paper">
      <Rv>
        <Label>도입 조건</Label>
        <h2 className="t-h2 text-[1.9rem] md:text-[2.5rem]">
          산방식당 간판은 <span className="text-brand">드리지 않습니다.</span>
        </h2>
        <p className="t-body mt-7 max-w-3xl text-[15.5px]">
          그래서 <strong className="font-bold text-ink">로열티가 0원</strong>입니다. 빌려드린 이름이
          없으니, 이름값을 받을 이유도 없습니다. 사장님 간판 그대로, 검증된 맛만 더합니다.
        </p>
      </Rv>

      <Rv d={110}>
        <div className="mt-12 overflow-hidden rounded-[24px] border border-line">
          <div className="grid grid-cols-[0.9fr_1fr_1fr] bg-warm text-[12.5px] font-bold tracking-[0.02em] text-muted">
            <div className="px-4 py-4 md:px-7">항목</div>
            <div className="px-4 py-4 md:px-7">간판을 받으면</div>
            <div className="bg-brand/8 px-4 py-4 text-brand md:px-7">메뉴솔루션</div>
          </div>
          {TRADE.map(([k, a, b], i) => (
            <div
              key={k}
              className={`grid grid-cols-[0.9fr_1fr_1fr] text-[13.5px] md:text-[14.5px] ${
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

      <Rv d={140}>
        <div className="mt-12 rounded-[24px] border border-gold/30 bg-gradient-to-br from-warm-2 via-warm to-paper px-8 py-10 text-center md:px-14 md:py-12">
          <p className="text-[20px] font-extrabold leading-[1.5] tracking-[-0.03em] text-ink md:text-[26px]">
            이름은 <span className="text-muted">빌리는 것</span>이고,
            <br />
            실력은 <span className="text-brand">갖는 것</span>입니다.
          </p>
          <p className="t-body mx-auto mt-5 max-w-xl text-[15px]">
            빌린 간판은 계약이 끝나면 반납해야 하지만, 전수받은 레시피와 조리 기술은 사장님께 남습니다.
            그래서 ‘간판’이 아니라 <strong className="font-bold text-ink">‘무기’</strong>를 드립니다.
          </p>
        </div>
      </Rv>

      {/* 시작 조건 — 교육비·환불 */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Rv>
          <div className="h-full rounded-[24px] border border-line bg-warm p-8">
            <div className="t-label mb-4 text-brand">초기 세팅 교육비</div>
            <p className="text-[26px] font-extrabold tracking-[-0.03em] text-ink">200만 원</p>
            <p className="t-body mt-4 text-[14px]">
              창업자 미팅 · 레시피 전수 · 현장 조리 교육 · 매장 맞춤 초기 메뉴 제안까지. 제주점 또는 서울
              직영점에서 진행합니다.
            </p>
          </div>
        </Rv>
        <Rv d={90}>
          <div className="h-full rounded-[24px] border border-brand/30 bg-paper p-8">
            <div className="t-label mb-4 text-brand">맞지 않으면</div>
            <p className="text-[26px] font-extrabold tracking-[-0.03em] text-ink">2개월 100% 환불</p>
            <p className="t-body mt-4 text-[14px]">
              도입 후 2개월 이내에 매장과 맞지 않다고 판단하시면, 실비(출장비 등)를 제외하고 전액
              돌려드립니다.
            </p>
          </div>
        </Rv>
      </div>
    </Section>
  );
}

/* ══ ⑭ 진짜 힘은 육수와 비빔장 — 소개서 18p ═════════════════════ */
export function RealPower() {
  return (
    <Section bg="warm">
      <Rv>
        <Label>2019, 육지에서 깨달은 것</Label>
        <h2 className="t-h2 max-w-4xl text-[1.9rem] md:text-[2.5rem]">
          산방식당의 진짜 힘은,
          <br />
          <span className="text-brand">메뉴가 아니었습니다</span>
        </h2>
        <p className="t-body mt-7 max-w-3xl text-[15.5px]">
          제주 본점에서 수십 년을 지켜 온 밀냉면과 수육, 그 정체성만으로 충분했습니다. 그런데 다양한 입맛을
          맞춰야 했던 육지에서 깨달았습니다. 산방식당의 진짜 힘은 특정 메뉴가 아니라, 오래 정성껏 끓여 낸{" "}
          <strong className="font-bold text-ink">‘육수’</strong>와 감칠맛 가득한{" "}
          <strong className="font-bold text-ink">‘비빔장’</strong>이라는 것을.
        </p>
      </Rv>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {[
          {
            t: "오랜 세월 끓여 낸 육수",
            d: "국내산 멸치와 생강을 오래 끓여 만든, 짜지 않고 담백한 시원함. 은근한 단맛과 적당한 산미가 도는",
            tag: "제주식의 정체성",
            img: "item-broth",
          },
          {
            t: "감칠맛 가득한 비빔장",
            d: "고운 고춧가루로 만든 특제 양념. 과하지 않게 매콤하고 새콤달콤해",
            tag: "맵지 않아 누구나 즐기는 맛",
            img: "item-bibim",
          },
        ].map((c, i) => (
          <Rv key={c.t} d={i * 110}>
            <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-paper">
              <img
                src={`${A}/${c.img}.webp`}
                alt={c.t}
                width={900}
                height={600}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover object-bottom"
              />
              <div className="flex-1 p-8">
                <h3 className="t-h3 mb-3 text-[19px]">{c.t}</h3>
                <p className="t-body text-[14.5px]">
                  {c.d} <strong className="font-bold text-brand">{c.tag}</strong>입니다.
                </p>
              </div>
            </article>
          </Rv>
        ))}
      </div>

      <Rv d={160}>
        <p className="mt-12 text-center text-[16px] font-bold tracking-[-0.02em] text-ink md:text-[20px]">
          이 검증된 <span className="text-brand">‘기본’</span> 위에 파트너의 영감이 더해질 때 —<br />
          산방식당은 강력한 조력자가 됩니다.
        </p>
      </Rv>
    </Section>
  );
}

/* ══ ⑮ 검증된 베이스 위에, 새로운 조합 — 소개서 19p ══════════════ */
const EXT_WITH_PHOTO = [
  { t: "산방만두", img: "item-mandu", d: "국내산 냉장육 100% 왕만두" },
  { t: "만두온면", img: "ext-manduonmyeon", d: "따뜻한 육수에 만두를 얹은 한 그릇" },
  { t: "산방고기국수", img: "ext-gogiguksu", d: "제주 전통 고기국수" },
  { t: "김치찌개", img: "ext-kimchijjigae", d: "점심·저녁 매출을 받쳐 주는 한 상" },
  { t: "수육국밥", img: "ext-gukbap", d: "국물과 밥, 점심 단품으로" },
  { t: "만둣국", img: "ext-mandutguk", d: "겨울 매출을 받쳐 주는 한 그릇" },
];

const EXT_TEXT_ONLY = ["제육덮밥", "낙지비빔밥", "산방고기덮밥"];

export function Extensions() {
  return (
    <Section id="extend" bg="paper">
      <Rv>
        <Label>확장 메뉴</Label>
        <h2 className="t-h2 max-w-3xl text-[1.9rem] md:text-[2.5rem]">
          검증된 베이스 위에,
          <br />
          <span className="text-brand">새로운 조합</span>
        </h2>
        <p className="t-body mt-7 max-w-2xl text-[15.5px]">
          산방식당의 육수·비빔장 위에 파트너의 영감을 더한 도입 가능 메뉴입니다.
        </p>
      </Rv>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {EXT_WITH_PHOTO.map((m, i) => (
          <Rv key={m.t} d={(i % 3) * 80}>
            <figure className="group m-0 overflow-hidden rounded-[24px] border border-line bg-warm transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(23,18,15,0.1)]">
              <img
                src={`${A}/${m.img}.webp`}
                alt={m.t}
                width={900}
                height={675}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <figcaption className="px-6 py-5">
                <div className="text-[16px] font-bold tracking-[-0.02em] text-ink">{m.t}</div>
                <div className="mt-0.5 text-[13px] text-muted">{m.d}</div>
              </figcaption>
            </figure>
          </Rv>
        ))}
      </div>

      <Rv d={120}>
        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[24px] border border-line bg-warm px-7 py-6">
          <span className="text-[13px] font-bold text-body">이 외에도</span>
          {EXT_TEXT_ONLY.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line bg-paper px-4 py-1.5 text-[13.5px] font-semibold text-ink"
            >
              {t}
            </span>
          ))}
        </div>
      </Rv>

      <Rv d={160}>
        <p className="t-body mt-8 max-w-3xl text-[15px]">
          대표 메뉴 옆에 둘 <strong className="font-bold text-ink">‘두 번째 시그니처’</strong>부터, 점심·저녁
          매출을 잡을 한 그릇까지 — 매장 맞춤으로 제안합니다.
        </p>
        <p className="mt-5 text-[12.5px] leading-relaxed text-muted">
          ※ 산방식당에서 촬영한 실제 메뉴 이미지입니다. 매장별 최종 구성과 플레이팅은 협의에 따라 달라질 수
          있습니다.
        </p>
      </Rv>
    </Section>
  );
}

/* ══ ⑯ 프리미엄 트랙 · 공식 브랜드 파트너 — 소개서 20p ═══════════ */
export function BrandPartner() {
  return (
    <Section id="partner" bg="sea">
      <Rv>
        <Label tone="sea">OFFICIAL BRAND PARTNER</Label>
        <h2 className="t-h2 max-w-3xl text-[1.9rem] md:text-[2.5rem]">
          프리미엄 트랙 · 공식 브랜드 파트너
        </h2>
        <p className="t-body mt-7 max-w-3xl text-[15.5px]">
          ‘산방식당’ 이름을 전면에 내건 공식 콜라보 — 브랜드와 IP를 함께 나눕니다.
        </p>
      </Rv>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Rv>
          <div className="flex h-full flex-col rounded-[24px] border border-sea/20 bg-paper p-8 md:p-11">
            <div className="t-label mb-5 text-sea">단체급식</div>
            <h3 className="t-h2 text-[1.35rem] md:text-[1.6rem]">CJ프레시웨이 · 아워홈</h3>
            <p className="t-body mt-5 flex-1 text-[14.5px]">
              전국 학교·기업 급식 유통망을 통해 산방식당의 ‘제주 밀면’ 맛을 더 넓은 식탁으로 전달합니다.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["학교 급식", "기업 급식", "HACCP 인증 시설 제조"].map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-sea/20 bg-sea-soft px-3.5 py-1.5 text-[12.5px] font-medium text-sea"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </Rv>

        <Rv d={110}>
          <div className="flex h-full flex-col rounded-[24px] border border-sea/20 bg-paper p-8 md:p-11">
            <div className="t-label mb-5 text-sea">외식 브랜드 콜라보</div>
            <h3 className="t-h2 text-[1.35rem] md:text-[1.6rem]">동래정 백탄직화</h3>
            <p className="t-body mt-5 flex-1 text-[14.5px]">
              가브리살 1등 브랜드와 산방식당 물밀면·비빔밀면의 콜라보. 운영 환경에 맞춘 메뉴 구성과 조리
              프로세스를 함께 설계합니다.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["가브리살 1등", "산방 밀면 콜라보"].map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-sea/20 bg-sea-soft px-3.5 py-1.5 text-[12.5px] font-medium text-sea"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </Rv>
      </div>

      <Rv d={160}>
        <p className="mt-12 text-center text-[15px] font-semibold tracking-[-0.02em] text-ink md:text-[18px]">
          강력한 브랜드를 원하는 파트너에게는 —<br className="sm:hidden" /> ‘산방식당’이라는 이름과 노하우의
          가치를 함께 나눕니다.
        </p>
      </Rv>
    </Section>
  );
}
