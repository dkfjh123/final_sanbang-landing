import { Fragment } from "react";
import { A, Rv, Section, TITLE_GRADIENT } from "../lib/ui";

/* ══ ⑬ 간판은 드리지 않습니다 ═══════════════════════════════════
   ⚠️ "가맹 아님 / 가맹비 없음"으로 단정하지 말 것.
      (주)산방에프앤비는 공정위에 등록된 가맹본부다. 단정하면 사실과 어긋난다.
      → 대신 "간판을 드리지 않는다"는 사실을 먼저 선언하고,
        그래서 로열티가 0원이라는 논리로 잇는다.
        숨기지 않고 앞세우는 편이 법적으로도 마케팅적으로도 유리하다.
      상세 → 랜딩페이지_기획안/09·10
   ──────────────────────────────────────────────────────────── */
/** 비교표 셀 — 세 열이 맞물리도록 모든 행이 같은 높이를 공유한다.
    ⚠️ 셀이 flex 라서 자식 사이의 공백 텍스트 노드가 사라진다.
       내용은 반드시 <span> 하나로 감쌀 것. (Brand.tsx 의 Compare 와 동일) */
const TROW = "flex items-center justify-center px-3 text-center md:px-5";
const TROW_H = "min-h-[84px] md:min-h-[96px]";

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
        {/* 키 센텐스 — 기획 02_핵심메시지의 두 문장을 조합했다(사용자 지시).
              ①"'간판'이 아닌 '무기'를 드립니다"  ②"브랜드가 되세요. 가능성을 팝니다"
            ①은 이미 #solution 섹션의 제목이라 그대로 쓰면 같은 문장이 두 번
            나온다 → ①의 구조(A 대신 B)만 빌리고 무게는 ②에 싣는다.
            "간판은 드리지 않는다"는 사실 서술은 아래 리드로 내렸다 —
            선언은 위에, 사실은 아래.
            ⚠️ 제목엔 색을 따로 준 span 을 두지 않는다(그라디언트가 걸린다) */}
        <h2
          className="mx-auto max-w-[16em] text-center font-extrabold"
          style={{
            ...TITLE_GRADIENT,
            fontSize: "clamp(1.85rem, 4vw, 3.1rem)",
            lineHeight: 1.18,
            letterSpacing: "-0.04em",
          }}
        >
          간판을 빌리는 대신,
          <br />
          브랜드가 되세요.
        </h2>
        <p
          className="mx-auto mt-6 max-w-[700px] text-center text-body"
          style={{ fontSize: "clamp(15.5px, 1.6vw, 18px)", lineHeight: 1.7 }}
        >
          산방식당 간판은 드리지 않습니다. 그래서{" "}
          <strong className="font-bold text-ink">로열티가 0원</strong>입니다. 저희가 파는 건 이름이 아니라{" "}
          <strong className="font-bold text-ink">가능성</strong>입니다.
        </p>
      </Rv>

      {/* 비교표 — 부산 vs 제주 표(Brand.tsx의 Compare)와 같은 구조로 맞췄다.
          3열이 대등하게 늘어서면 어느 쪽이 나은지 눈으로 안 읽힌다.
            · 왼쪽(간판을 받으면)은 회색으로 눌러 둔다
            · 오른쪽(메뉴솔루션)만 헤더가 위로 솟고 그림자로 떠오른다
            · 가운데는 항목 이름을 알약으로 세운 레일
          변형: 원본은 오른쪽 헤더에 음식 사진이 들어가는데 여기는 팔 게
          '조건'이라 사진이 없다 → 사진 자리를 숫자(0원)로 채웠다.
          ⚠️ 세 열이 정확히 맞물리려면 모든 행이 같은 높이를 써야 한다. */}
      <Rv d={110}>
        <div className="mx-auto mt-16 grid max-w-[880px] grid-cols-[1fr_auto_1fr] items-end gap-x-2 md:gap-x-3">
          {/* ── 헤더 ─────────────────────────────────────────── */}
          <div className="flex h-[104px] items-center justify-center rounded-t-[20px] bg-[#dcd8d3] px-3 text-center md:h-[120px]">
            <span className="text-[14px] font-bold text-[#7d766e] md:text-[16px]">간판을 받으면</span>
          </div>

          <div aria-hidden />

          {/* 우리 쪽만 위로 솟는다 */}
          <div className="-mt-12 flex flex-col items-center justify-center rounded-t-[20px] bg-brand px-3 py-6 text-center shadow-[0_18px_44px_rgba(23,18,15,0.16)] md:-mt-14 md:py-7">
            <div
              className="font-extrabold leading-none tracking-[-0.05em] text-white"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.2rem)" }}
            >
              0<span className="text-[0.42em]">원</span>
            </div>
            <div className="mt-2 text-[12px] font-bold text-white/75 md:text-[13.5px]">로열티</div>
            <div className="mt-3 text-[14.5px] font-extrabold text-white md:text-[16.5px]">메뉴솔루션</div>
          </div>

          {/* ── 행 ───────────────────────────────────────────── */}
          {TRADE.map(([k, a, b], i) => {
            const last = i === TRADE.length - 1;
            return (
              <Fragment key={k}>
                <div
                  className={`${TROW} ${TROW_H} bg-[#e6e2dd] text-[12.5px] leading-snug text-[#948d84] md:text-[14px] ${
                    last ? "rounded-b-[20px]" : ""
                  }`}
                >
                  <span>{a}</span>
                </div>

                <div className={`${TROW_H} flex items-center`}>
                  <span className="flex h-[52px] w-[84px] items-center justify-center rounded-[12px] bg-brand px-2 text-center text-[11.5px] font-bold leading-tight text-white md:h-[58px] md:w-[108px] md:text-[13px]">
                    {k}
                  </span>
                </div>

                <div
                  className={`${TROW} ${TROW_H} bg-paper font-bold leading-snug text-ink shadow-[0_18px_44px_rgba(23,18,15,0.10)] ${
                    last ? "rounded-b-[20px]" : ""
                  }`}
                  style={{ fontSize: "clamp(14px, 1.9vw, 19px)", letterSpacing: "-0.025em" }}
                >
                  <span>{b}</span>
                </div>
              </Fragment>
            );
          })}
        </div>
      </Rv>

      <Rv d={140}>
        <div className="mt-12 rounded-[24px] border border-gold/30 bg-gradient-to-br from-warm-2 via-warm to-paper px-8 py-12 text-center md:px-14 md:py-16">
          <p
            className="font-extrabold tracking-[-0.04em] text-ink"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)", lineHeight: 1.45 }}
          >
            이름은 <span className="text-muted">빌리는 것</span>이고,
            <br />
            실력은 <span className="text-brand">갖는 것</span>입니다.
          </p>
          <p
            className="mx-auto mt-6 max-w-[620px] text-body"
            style={{ fontSize: "clamp(15px, 1.6vw, 17.5px)", lineHeight: 1.72 }}
          >
            빌린 간판은 계약이 끝나면 반납해야 하지만, 전수받은 레시피와 조리 기술은 사장님께 남습니다.
          </p>
        </div>
      </Rv>

      {/* 시작 조건 — 교육비·환불.
          작은 대문자 라벨(t-label)은 걷어냈다. 한글에 대문자는 무의미하고,
          이 두 줄은 카드가 무슨 얘긴지 알려주는 제목이라 제목답게 세운다. */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Rv>
          <div className="h-full rounded-[24px] border border-line bg-warm p-8 md:p-10">
            <div className="mb-3 text-[15px] font-extrabold tracking-[-0.02em] text-brand md:text-[16.5px]">
              초기 세팅 교육비
            </div>
            <p
              className="font-extrabold tracking-[-0.04em] text-ink"
              style={{ fontSize: "clamp(2rem, 3.6vw, 2.9rem)", lineHeight: 1.1 }}
            >
              200만 원
            </p>
            <p
              className="mt-5 text-body"
              style={{ fontSize: "clamp(14px, 1.5vw, 15.5px)", lineHeight: 1.72 }}
            >
              창업자 미팅 · 레시피 전수 · 현장 조리 교육 · 매장 맞춤 초기 메뉴 제안까지. 제주점 또는 서울
              직영점에서 진행합니다.
            </p>
          </div>
        </Rv>
        <Rv d={90}>
          <div className="h-full rounded-[24px] border border-brand/30 bg-paper p-8 md:p-10">
            <div className="mb-3 text-[15px] font-extrabold tracking-[-0.02em] text-brand md:text-[16.5px]">
              맞지 않으면
            </div>
            <p
              className="font-extrabold tracking-[-0.04em] text-ink"
              style={{ fontSize: "clamp(2rem, 3.6vw, 2.9rem)", lineHeight: 1.1 }}
            >
              2개월 100% 환불
            </p>
            <p
              className="mt-5 text-body"
              style={{ fontSize: "clamp(14px, 1.5vw, 15.5px)", lineHeight: 1.72 }}
            >
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

/* ══ ⑮ 검증된 베이스 위에, 새로운 조합 — 소개서 19p ══════════════
   2026-07-29: 사진 6장 그리드 + 글자만 있는 칩 3개 → 사진 13장이 흐르는
   밴드로 교체(사용자 지시). 도입 가능한 메뉴가 실제로 몇 가지인지는
   "13가지"라고 쓰는 것보다 눈앞으로 지나가게 하는 편이 빠르다.

   ⚠️ 이미지는 밴드 전용 사본(assets/web/extend/)이다. G드라이브 원본은
      장당 최대 28MB(13장 149MB)라 그대로 못 쓴다. → `node _extend.mjs`
      로 512×640 으로 잘라 구우면 464KB 가 된다.
   ──────────────────────────────────────────────────────────── */
const EXTEND = [
  { f: "milnaengmyeon", t: "밀냉면" },
  { f: "bibim", t: "비빔밀냉면" },
  { f: "mandu", t: "산방만두" },
  { f: "suyuk", t: "산방수육" },
  { f: "manduonmyeon", t: "산방만두온면" },
  { f: "mandutguk", t: "산방만둣국" },
  { f: "manduonmyeon2", t: "산방만두온면" },
  { f: "gogiguksu", t: "산방고기국수" },
  { f: "kimchimandu", t: "산방김치만두" },
  { f: "kimchijjigae", t: "김치찌개" },
  { f: "suyukgukbap", t: "수육국밥" },
  { f: "gogideopbap", t: "고기덮밥" },
  { f: "jeyukdeopbap", t: "산방제육덮밥" },
  { f: "nakjibibimbap", t: "낙지비빔밥" },
];

export function Extensions() {
  return (
    <section id="extend" className="bg-paper py-20 md:py-[120px]">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
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
            검증된 베이스 위에,
            <br />
            새로운 조합
          </h2>
          <p
            className="mx-auto mt-6 max-w-[640px] text-center text-body"
            style={{ fontSize: "clamp(15.5px, 1.6vw, 18px)", lineHeight: 1.7 }}
          >
            산방식당의 육수 · 비빔장 위에 파트너의 영감을 더한 도입 가능 메뉴입니다.
          </p>
        </Rv>
      </div>

      {/* 밴드 — 화면 끝까지 흘러야 하므로 좌우 여백 밖으로 뺀다.
          메뉴 밴드(Statement 아래)와 같은 장치이되 1.2배 빠르다(40s → 33s). */}
      <div className="marquee marquee--pause mt-14">
        <div className="marquee__track marquee__track--rev" style={{ animationDuration: "33s" }}>
          {[0, 1].map((pass) => (
            <ul key={pass} className="flex shrink-0" aria-hidden={pass === 1}>
              {EXTEND.map((m) => (
                /* 간격은 gap 이 아니라 각 칸의 오른쪽 여백으로 — gap 으로 주면
                   두 벌이 만나는 지점만 간격이 절반이 되어 한 바퀴마다 튄다 */
                <li key={m.f} className="mr-4 shrink-0" style={{ width: "clamp(152px, 19.2vw, 256px)" }}>
                  <div className="aspect-[4/5] overflow-hidden rounded-[20px] bg-warm">
                    <img
                      src={`${A}/extend/${m.f}.webp`}
                      alt={pass === 0 ? `산방식당 ${m.t}` : ""}
                      width={512}
                      height={640}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-3 text-center text-[13.5px] font-bold tracking-[-0.02em] text-ink md:text-[15px]">
                    {m.t}
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <Rv d={160}>
          <p
            className="mx-auto mt-16 max-w-[760px] text-center text-body"
            style={{ fontSize: "clamp(15px, 1.6vw, 17.5px)", lineHeight: 1.72 }}
          >
            대표 메뉴 옆에 둘 <strong className="font-bold text-ink">‘두 번째 시그니처’</strong>부터, 점심 ·
            저녁 매출을 잡을 한 그릇까지 — 매장 맞춤으로 제안합니다.
          </p>
          <p className="mx-auto mt-5 max-w-[760px] text-center text-[12.5px] leading-relaxed text-muted">
            ※ 산방식당에서 촬영한 실제 메뉴 이미지입니다. 매장별 최종 구성과 플레이팅은 협의에 따라 달라질 수
            있습니다.
          </p>
        </Rv>
      </div>
    </section>
  );
}

/* 프리미엄 트랙 · 공식 브랜드 파트너 섹션(BrandPartner, id="partner")은
   2026-07-29 사용자 지시로 삭제했다. CJ프레시웨이·아워홈(단체급식)과
   동래정 백탄직화(외식 콜라보) 두 카드가 들어 있던 자리다.
   ⚠️ 이 트랙 자체가 없어진 건 아니다 — 문의 폼의 관심분야에
      "공식 브랜드 파트너 (산방식당 이름 사용)" 선택지가 아직 남아 있다.
      되살릴 일이 있으면 git 이력에서 꺼낼 것. */
