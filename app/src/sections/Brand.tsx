import { A, Count, Label, Rv, Section, TEL_JEJU, TEL_MAIN } from "../lib/ui";

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

/* ══ ④ 부산식 vs 제주식 — 소개서 5p ═════════════════════════════ */
const COMPARE: [string, string, string][] = [
  ["첫인상", "구수함 — 진하고 묵직", "맑고 시원 · 새콤달콤"],
  ["육수", "돼지뼈 · 사골 육수", "멸치 육수 — 짜지 않고 은은한 단맛·산미"],
  ["면", "가는 소면", "소면이 아닌 도톰한 중면"],
];

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
        <p className="t-body mt-7 max-w-2xl text-[15.5px]">
          고기 육수가 아닌 <strong className="font-bold text-ink">멸치 육수</strong> — 맑고 시원한
          새콤달콤함이 정체성입니다.
        </p>
      </Rv>

      <Rv d={120}>
        <div className="mt-12 overflow-hidden rounded-[24px] border border-line bg-paper">
          <div className="grid grid-cols-[72px_1fr_1fr] text-[12px] font-bold tracking-[0.04em] text-muted sm:grid-cols-[110px_1fr_1fr]">
            <div className="px-4 py-4 md:px-7">구분</div>
            <div className="px-4 py-4 md:px-7">부산 밀면</div>
            <div className="bg-brand px-4 py-4 text-white md:px-7">제주 산방식당 밀냉면</div>
          </div>
          {COMPARE.map(([k, busan, jeju], i) => (
            <div
              key={k}
              className={`grid grid-cols-[72px_1fr_1fr] border-t border-line text-[13px] sm:grid-cols-[110px_1fr_1fr] md:text-[15px] ${
                i % 2 ? "bg-warm/50" : ""
              }`}
            >
              <div className="px-4 py-5 font-bold text-ink md:px-7">{k}</div>
              <div className="px-4 py-5 text-muted md:px-7">{busan}</div>
              <div className="bg-brand/8 px-4 py-5 font-semibold text-ink md:px-7">{jeju}</div>
            </div>
          ))}
        </div>
      </Rv>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {[
          {
            t: "멸치 육수",
            d: "국내산 멸치와 생강을 오래 끓인 시원하고 깔끔한 육수",
          },
          {
            t: "중면 · 자가제면",
            d: "생면만을 고집하여, 중면으로 그 쫄깃함이 남다른 생면",
          },
          {
            t: "원조의 깊이",
            d: "‘제주 밀냉면의 원조이자 종가집’으로 불리는 55년",
          },
        ].map((c, i) => (
          <Rv key={c.t} d={i * 90}>
            <div className="h-full rounded-[24px] border border-line bg-paper p-7">
              <h3 className="t-h3 mb-2.5 text-[17px] text-brand">{c.t}</h3>
              <p className="t-body text-[14px]">{c.d}</p>
            </div>
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
