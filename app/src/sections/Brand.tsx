import { Fragment } from "react";
import { A, Count, GlowCard, Label, Rv, Section, TEL_JEJU, TEL_MAIN } from "../lib/ui";

/* ══ ③ CHAPTER 01 · 브랜드 — 소개서 3·4p ════════════════════════ */
export function Brand() {
  return (
    <Section id="brand" bg="paper">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Rv>
          <Label>CHAPTER 01 · 브랜드</Label>
          <h2 className="t-h2 text-[1.9rem] md:text-[2.5rem]">
            1971년, 제주 최남단에서
            <br />
            시작된 <span className="text-brand">55년</span>
          </h2>
          <p className="t-body mt-7 max-w-lg text-[15.5px]">
            창업주 <strong className="font-bold text-ink">김정일 대표</strong>에서 2대{" "}
            <strong className="font-bold text-ink">김형섭 대표</strong>로 이어진 가족경영. 그리고 2019년
            4월부터 서울에서 그 맛을 펼치고 있습니다.
          </p>
          <p className="t-body mt-5 max-w-lg text-[14.5px]">
            쌀이 귀하던 시절 제주의 밀가루 음식 문화 위에서, 부산식과는 전혀 다른 ‘제주식 밀냉면’을 만들어
            냈습니다. 관광객에게는 ‘제주 여행의 필수 코스’, 도민에게는 ‘언제든 믿고 찾는 식당’. 성수기엔
            오픈런과 웨이팅이 일상인, 줄 서서 먹는 로컬 맛집입니다.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-line pt-8 sm:grid-cols-4">
            {[
              { v: <>1971</>, k: "대정읍 하모리(모슬포)에서 시작" },
              { v: <><Count to={55} />년</>, k: "반세기 이상 지켜온 손맛" },
              { v: <><Count to={2} />대</>, k: "이어온 가업" },
              { v: <>100년</>, k: "식당을 바라보며" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-[24px] font-extrabold tracking-[-0.03em] text-brand md:text-[28px]">
                  {s.v}
                </div>
                <div className="mt-1 text-[12px] leading-snug text-muted">{s.k}</div>
              </div>
            ))}
          </div>
        </Rv>

        <Rv d={120}>
          <figure className="m-0">
            <img
              src={`${A}/store-main-blue.webp`}
              alt="모슬포 본점 — 멀리서도 한눈에 들어오는 파란 건물"
              width={1000}
              height={660}
              loading="lazy"
              decoding="async"
              className="aspect-[3/2] w-full rounded-[24px] object-cover"
            />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <img
                src={`${A}/jeju-scenery.webp`}
                alt="산방산과 유채밭 — 제주 서귀포"
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[24px] object-cover"
              />
              <img
                src={`${A}/founder.webp`}
                alt="창업주 김정일 명예회장"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[24px] object-cover"
              />
            </div>
            <figcaption className="mt-4 text-[12.5px] leading-relaxed text-muted">
              위 — 모슬포 본점, 멀리서도 한눈에 들어오는 파란 건물. 아래 왼쪽 — 산방산과 유채밭. 아래 오른쪽
              — 창업주 김정일 명예회장.
            </figcaption>
          </figure>
        </Rv>
      </div>
    </Section>
  );
}

/* ══ ④ 부산식 vs 제주식 ═════════════════════════════════════════
   3열 표는 좌우가 대등해 보여서 우리 쪽이 부각되지 않는다.
   상세페이지 비교 레이아웃처럼 좌(일반)는 회색으로 눌러 두고,
   우(산방식당)는 사진 + 그림자로 띄워 올린다. 가운데는 라벨 레일.
     · 두 헤더의 높이가 다르다 — 우리 쪽만 위로 솟는다(-mt)
     · 행은 같은 min-height 를 써서 세 열이 정확히 맞물린다
   ⚠️ "돼지뼈·사골"은 부산식을 설명하는 문맥이라 정상이다.
      산방 육수를 사골이라 쓰면 안 된다. → 08_금지선
   ──────────────────────────────────────────────────────────── */
/* ⚠️ JSX 는 태그 앞뒤 공백을 삼킨다. {" "} 를 반드시 남겨야
      "국내산멸치" 처럼 붙어 버리지 않는다. */
const COMPARE: [string, string, React.ReactNode][] = [
  [
    "첫인상",
    "진하고 묵직한 구수함",
    <>
      맑고 시원한{" "}
      <b className="font-extrabold">새콤달콤</b>
    </>,
  ],
  [
    "육수",
    "돼지뼈 · 사골",
    <>
      국내산{" "}
      <b className="font-extrabold">멸치 · 생강</b>을 오래
    </>,
  ],
  [
    "면",
    "가는 소면",
    <>
      <b className="font-extrabold">도톰한 중면</b> 생면
    </>,
  ],
  [
    "수육 소스",
    "새우젓 · 된장",
    <>
      겨자 +{" "}
      <b className="font-extrabold">특제 고추장</b>
    </>,
  ],
];

/** 세 열이 맞물리도록 모든 행이 같은 높이를 쓴다.
    ⚠️ 셀은 flex 라서 자식 사이의 공백 텍스트 노드가 사라진다
       ("국내산" + <b>멸치</b> → "국내산멸치").
       내용은 반드시 <span> 하나로 감싸 인라인 흐름을 되살릴 것. */
const ROW = "flex items-center justify-center px-3 text-center md:px-5";
const ROW_H = "min-h-[76px] md:min-h-[84px]";

/* ══ 3대 재료 카드 ══════════════════════════════════════════════
   테두리를 그라디언트로 칠하는 방법:
     background: <카드색> padding-box, <그라디언트> border-box
     + border: Npx solid transparent
   테두리 자리에만 그라디언트가 보인다. 뒤에는 같은 그라디언트를
   크게 blur 해서 깔아 은은한 발광을 만든다.
   원본 레퍼런스는 다크 배경 + 8px 네온이지만, 우리 배경은 밝아서
   그대로 쓰면 촌스럽다 → 테두리 3px, 글로우 opacity 를 낮춘다. */
const PILLARS = [
  {
    t: "국내산 멸치 육수",
    d: "멸치와 생강을 오래 끓여 냅니다. 짜지 않고 은근한 단맛과 적당한 산미가 도는, 맑고 시원한 국물.",
    g: "linear-gradient(137deg, #1d7b86 0%, #7fc4c9 48%, #eaf3f2 100%)",
    icon: (
      <>
        <path d="M3 9c2.2-2.4 4.5-2.4 6.7 0S14.4 11.4 16.6 9 21 6.6 23.2 9" />
        <path d="M3 16c2.2-2.4 4.5-2.4 6.7 0s4.7 2.4 6.9 0 4.4-2.4 6.6 0" />
      </>
    ),
  },
  {
    t: "도톰한 중면 · 생면",
    d: "건면도 냉동면도 아닌 생면. 가수율 45% 이상이라 국물 속에서도 끝까지 잘 붇지 않습니다.",
    g: "linear-gradient(137deg, #eda427 0%, #f6c775 48%, #fff6e4 100%)",
    icon: (
      <>
        <path d="M5 3v18M11 3v18M17 3v18" />
        <path d="M2 12h20" />
      </>
    ),
  },
  {
    t: "55년, 원조의 깊이",
    d: "‘제주 밀냉면의 원조이자 종가집’. 여름이면 오픈런이 일상인, 도민도 관광객도 줄 서는 집입니다.",
    g: "linear-gradient(137deg, #b03a24 0%, #cf5a1c 48%, #f6c775 100%)",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5.5l3.5 2" />
      </>
    ),
  },
];

/* 카드 본체는 lib/ui.tsx 의 GlowCard 가 담당한다 (Side 섹션과 공용) */

export function Compare() {
  return (
    <Section bg="warm">
      <Rv>
        <Label>알고 가셔야 할 것</Label>
        <h2 className="t-h2 max-w-3xl text-[1.9rem] md:text-[2.5rem]">
          부산과 다른, 55년 동안 사랑받은
          <br />
          <span className="text-brand">‘제주식 밀냉면’</span>
        </h2>
        {/* 재료로 말한다. 자극적이지 않다 = 객층이 넓다 = 사장님에겐 매출이다 */}
        <p
          className="mt-8 max-w-3xl font-semibold tracking-[-0.02em] text-body"
          style={{ fontSize: "clamp(17px, 1.7vw, 22px)", lineHeight: 1.65 }}
        >
          <strong className="font-extrabold text-ink">국내산 멸치와 생강</strong>을 오래 끓여 내고,{" "}
          <strong className="font-extrabold text-ink">고운 고춧가루</strong>로 양념을 만듭니다.
          <br className="hidden md:block" />
          짜지 않고 맵지 않은데 끝맛이 깊습니다 —{" "}
          <span className="text-brand">호불호 없이 누구나 좋아하는 맛.</span>
        </p>
        <p className="t-body mt-5 max-w-2xl text-[15px]">
          아이도 어른도 먹습니다. 매장에서는 그게 <strong className="font-bold text-ink">객층이
          넓다</strong>는 뜻입니다.
        </p>
      </Rv>

      <Rv d={120}>
        <div className="mx-auto mt-16 grid max-w-[860px] grid-cols-[1fr_auto_1fr] items-end gap-x-2 md:gap-x-3">
          {/* ── 헤더 ─────────────────────────────────────────── */}
          <div className="flex h-[112px] items-center justify-center rounded-t-[20px] bg-[#dcd8d3] px-3 text-center md:h-[132px]">
            <span className="text-[14px] font-bold text-[#7d766e] md:text-[16px]">일반 밀면</span>
          </div>

          <div aria-hidden />

          {/* 우리 쪽만 위로 솟는다 */}
          <div className="-mt-10 overflow-hidden rounded-t-[20px] bg-brand shadow-[0_18px_44px_rgba(23,18,15,0.16)] md:-mt-12">
            <div className="px-3 pb-3 pt-4 text-center md:pt-5">
              <div className="text-[11px] font-bold tracking-[0.14em] text-white/70">
                SINCE 1971 · 원조
              </div>
              <div className="mt-1 text-[15px] font-extrabold text-white md:text-[17px]">
                제주 산방식당
              </div>
            </div>
            <img
              src={`${A}/menu-mil-oh.webp`}
              alt="산방식당 물밀냉면 — 멸치 육수에 도톰한 중면"
              width={700}
              height={470}
              loading="lazy"
              decoding="async"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>

          {/* ── 행 ───────────────────────────────────────────── */}
          {COMPARE.map(([k, busan, jeju], i) => {
            const last = i === COMPARE.length - 1;
            return (
              <Fragment key={k}>
                <div
                  className={`${ROW} ${ROW_H} bg-[#e6e2dd] text-[13.5px] leading-snug text-[#8b847b] md:text-[15px] ${
                    last ? "rounded-b-[20px]" : ""
                  }`}
                >
                  <span>{busan}</span>
                </div>

                <div className={`${ROW_H} flex items-center`}>
                  <span className="flex h-[46px] w-[62px] items-center justify-center rounded-[12px] bg-brand text-[12.5px] font-bold text-white md:h-[52px] md:w-[80px] md:text-[13.5px]">
                    {k}
                  </span>
                </div>

                <div
                  className={`${ROW} ${ROW_H} bg-paper text-[13.5px] leading-snug text-ink shadow-[0_18px_44px_rgba(23,18,15,0.10)] md:text-[15.5px] ${
                    last ? "rounded-b-[20px]" : ""
                  }`}
                >
                  <span>{jeju}</span>
                </div>
              </Fragment>
            );
          })}
        </div>
      </Rv>

      <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-5">
        {PILLARS.map((c, i) => (
          <Rv key={c.t} d={i * 110}>
            <GlowCard g={c.g} icon={c.icon} title={c.t} body={c.d} minH={280} />
          </Rv>
        ))}
      </div>
    </Section>
  );
}

/* ══ ⑤ 직영 매장 + 제주 메뉴판 — 소개서 5·6·7p ══════════════════ */
const STORES = [
  {
    key: "queue-moseulpo",
    name: "본점",
    badge: "원조",
    sub: "모슬포 · SINCE 1971",
    desc: "55년 전통이 시작된 곳 — 줄 서서 먹는 제주 로컬 맛집",
    addr: "제주 서귀포시 대정읍 모슬포",
    tel: TEL_MAIN,
  },
  {
    key: "queue-1",
    name: "제주점",
    badge: "직영",
    sub: "제주시 직영점",
    desc: "넓은 홀로 단체·관광객까지 — 제주 도심의 거점 매장",
    addr: "제주특별자치도 제주시",
    tel: TEL_JEJU,
  },
  {
    key: "queue-2",
    name: "서울상공회의소점",
    badge: "서울",
    sub: "서울 진출 · 직영",
    desc: "제주를 넘어 서울로 — 검증된 맛을 육지에서도",
    addr: "서울 · 대한상공회의소 내",
    tel: null,
  },
];

export function Stores() {
  return (
    <Section id="stores" bg="paper">
      <Rv>
        <Label>OUR LOCATIONS</Label>
        <h2 className="t-h2 text-[1.9rem] md:text-[2.5rem]">직접 만나는 산방식당</h2>
        <p className="t-body mt-5 max-w-2xl text-[15.5px]">
          제주 본점부터 서울까지 — 직영 매장에서 검증된 맛을 확인하세요.
        </p>
      </Rv>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {STORES.map((s, i) => (
          <Rv key={s.key} d={i * 100}>
            <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-warm">
              <video
                className="aspect-video w-full bg-ink object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={`${A}/${s.key}-poster.webp`}
                aria-label={`${s.name} 홀 — 식사 시간대`}
              >
                <source src={`${A}/${s.key}.mp4`} type="video/mp4" />
              </video>
              <div className="flex flex-1 flex-col p-7">
                <div className="mb-1 flex items-center gap-2.5">
                  <h3 className="t-h3 text-[19px]">{s.name}</h3>
                  <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold text-white">
                    {s.badge}
                  </span>
                </div>
                <div className="text-[12.5px] text-muted">{s.sub}</div>
                <p className="t-body mt-4 flex-1 text-[14px]">{s.desc}</p>
                <div className="mt-5 space-y-1 border-t border-line pt-4 text-[13px] text-body">
                  <div>{s.addr}</div>
                  {s.tel ? (
                    <a
                      href={`tel:+82${s.tel.replace(/^0/, "").replace(/-/g, "")}`}
                      className="font-semibold text-ink hover:text-brand"
                    >
                      {s.tel}
                    </a>
                  ) : (
                    <div className="text-muted">대표번호 안내 예정</div>
                  )}
                </div>
              </div>
            </article>
          </Rv>
        ))}
      </div>

      <Rv>
        <p className="mt-6 text-[12.5px] leading-relaxed text-muted">
          ※ 영상은 매장 화면 그대로입니다. 연출하지 않았습니다.
        </p>
      </Rv>

      {/* 제주 메뉴판 — 소개서 6·7p */}
      <div className="mt-24">
        <Rv>
          <div className="mb-10 h-px w-full bg-line" />
          <h3 className="t-h2 text-[1.5rem] md:text-[1.9rem]">제주에서의 메뉴판은 단출합니다</h3>
          <p className="t-body mt-4 max-w-3xl text-[15px]">
            하지만 육지와 파트너 매장에서는, 그 본질인 <strong className="font-bold text-ink">맛</strong>을
            내세워 다양하게 펼치고 있습니다.
          </p>
        </Rv>
        <Rv d={120}>
          <img
            src={`${A}/menuboard.webp`}
            alt="제주 산방식당 메뉴 — 제주식 밀냉면, 제주식 비빔밀냉면, 산방 만두온면, 산방 만둣국, 산방 만두, 산방 수육"
            width={1600}
            height={932}
            loading="lazy"
            decoding="async"
            className="mt-9 w-full rounded-[24px] border border-line object-cover"
          />
        </Rv>
      </div>
    </Section>
  );
}
