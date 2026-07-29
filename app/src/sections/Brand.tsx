import { Fragment, useCallback, useRef } from "react";
import { A, Count, GlowCard, LazyVideo, Rv, Section, TITLE_GRADIENT, useScrollProgress } from "../lib/ui";

/* ══ ③ 브랜드 소개 — 소개서 3·4p ════════════════════════════════
   레퍼런스: `랜딩페이지_기획안/디자인프롬프트/모션사이트_산방식당소개.md`

   원본은 우주톤 럭셔리 부동산 페이지다. 색(#020319 계열)·폰트(Inter Tight)·
   이미지 URL 을 그대로 가져오면 산방식당이 아니게 된다. 그래서 '기법'만 뽑았다:

     ① 패럴랙스 레이어 — 배경(제주 풍경)과 앞판(본점 사진)이 서로 다른 속도로
        움직여 깊이가 생긴다. 원본의 하늘/빌딩/산 3겹 구조를 2겹으로 줄였다.
     ② 스크롤에 따라 글자가 차오르는 문단 — 흐린 상태로 시작해 스크롤하면
        글자가 하나씩 진해진다. 원본 Section 5 그대로.
     ③ 대형 숫자 통계 — 24px 였던 것을 레퍼런스 스케일(최대 64px)로 키우고
        구분선과 순차 등장을 넣었다.
     ④ 그라디언트 대형 타이틀.

   버린 것: 다크 우주 팔레트, Inter Tight, Framer Motion, 외부 이미지 URL,
   내비바/히어로(이미 있다), 로고 마퀴(메뉴 밴드가 그 역할을 한다).
   ──────────────────────────────────────────────────────────── */

/* 스크롤에 따라 차오르는 문단.
   글자마다 자기 시작 지점(--s)을 갖고, 부모의 진행도(--p)와 비교해 스스로
   진해진다. 계산을 CSS 에 맡기므로 스크롤 중 DOM 쓰기는 --p 한 줄뿐이다.
   ⚠️ 화면엔 글자가 쪼개져 있으므로 aria-label 로 문장 전체를 읽히게 한다. */
function FillText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const onProgress = useCallback((p: number) => {
    ref.current?.style.setProperty("--p", String(p));
  }, []);
  useScrollProgress(ref, onProgress);

  const words = text.split(" ");
  let n = 0;
  const total = text.length;

  return (
    <p ref={ref} className={className} style={{ ...style, ["--p" as string]: 0 }} aria-label={text}>
      <span aria-hidden>
        {words.map((w, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {[...w].map((ch, ci) => (
              <span
                key={ci}
                className="inline-block"
                style={{
                  ["--s" as string]: (n++ / total).toFixed(4),
                  // 진행도가 자기 지점을 지나면 0.2 → 1 로 진해진다.
                  // (…)*7 은 겹치는 구간 — 글자들이 뚝뚝 끊기지 않고 물결처럼 넘어온다
                  opacity: "calc(0.2 + 0.8 * clamp(0, (var(--p) - var(--s)) * 7, 1))",
                }}
              >
                {ch}
              </span>
            ))}
            {wi < words.length - 1 && <span className="inline-block w-[0.28em]" />}
          </span>
        ))}
      </span>
    </p>
  );
}

const STATS = [
  { v: <>1971</>, k: "대정읍 하모리(모슬포)에서 시작" },
  { v: <><Count to={55} /><span className="text-brand">년</span></>, k: "반세기 이상 지켜온 손맛" },
  { v: <><Count to={2} /><span className="text-brand">대</span></>, k: "이어온 가업" },
  { v: <><Count to={3} /><span className="text-brand">개</span></>, k: "직영점 · 제주와 서울에서" },
];

export function Brand() {
  const band = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLImageElement>(null);
  const fgL = useRef<HTMLImageElement>(null);
  const fgR = useRef<HTMLImageElement>(null);

  /* 패럴랙스 — 뒤는 아래로, 앞은 위로. 서로 반대로 움직여야 깊이가 산다.
     translate3d 로 써서 합성 레이어에 올린다(스크롤 중 레이아웃 계산 없음).

     ⚠️ 앞판 두 장을 하나의 래퍼로 묶어 움직이면 안 된다. 래퍼에 transform 이
        걸리는 순간 그 안이 '독립된 합성 그룹'이 되어, 창업주 컷의
        mix-blend-multiply 가 뒤의 배경 사진과 섞이지 못하고 흰 배경이
        그대로 남는다. 그래서 사진마다 각자 움직인다. */
  const onProgress = useCallback((p: number) => {
    const d = (p - 0.5) * 2; // -1 … 1
    const back = `translate3d(0, ${(d * 5).toFixed(2)}%, 0)`;
    const front = `translate3d(0, ${(d * -8).toFixed(2)}%, 0)`;
    if (bg.current) bg.current.style.transform = back;
    if (fgL.current) fgL.current.style.transform = front;
    if (fgR.current) fgR.current.style.transform = front;
  }, []);
  useScrollProgress(band, onProgress);

  return (
    <section id="brand" className="bg-paper px-5 py-20 md:px-8 md:py-[120px]" style={{ overflowX: "clip" }}>
      <div className="mx-auto w-full max-w-[1200px]">
        {/* ① 대형 타이틀 — 아래로 갈수록 브랜드 색이 배어 나온다 */}
        <Rv>
          <h2
            className="mx-auto max-w-[15em] text-center font-extrabold"
            style={{
              ...TITLE_GRADIENT,
              fontSize: "clamp(2.1rem, 6vw, 4.8rem)",
              lineHeight: 1.12,
              letterSpacing: "-0.045em",
            }}
          >
            1971년, 제주 최남단에서
            <br />
            시작된 55년
          </h2>
        </Rv>

        <Rv d={100}>
          <p className="t-body mx-auto mt-8 max-w-[640px] text-center text-[15.5px] md:text-[17px]">
            창업주 <strong className="font-bold text-ink">김정일 대표</strong>에서 2대{" "}
            <strong className="font-bold text-ink">김형섭 대표</strong>로 이어진 가족경영. 그리고 2019년 4월부터
            서울에서 그 맛을 펼치고 있습니다.
          </p>
        </Rv>

        {/* ② 패럴랙스 밴드 — 뒤에 제주 풍경, 위에 본점이 떠 있다 */}
        <Rv d={180}>
          <figure className="m-0">
            <div
              ref={band}
              className="relative mt-14 overflow-hidden rounded-[32px]"
              style={{ height: "clamp(430px, 52vw, 680px)" }}
            >
              <img
                ref={bg}
                src={`${A}/jeju-scenery.webp`}
                alt="산방산과 유채밭 — 제주 서귀포"
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover will-change-transform"
              />
              {/* ⚠️ 예전엔 여기에 화면 전체를 덮는 어두운 막을 깔았는데, 이 사진은
                  아래 2/3 가 통째로 유채밭이라 노란색이 다 죽었다(사용자 지적).
                  → 사진이 실제로 놓이는 아래쪽 모서리에만 남기고 걷어냈다.
                  앞판과 배경의 분리는 사진에 걸어 둔 그림자가 이미 하고 있다. */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(62% 56% at 20% 112%, rgba(36,26,19,0.44) 0%, rgba(36,26,19,0.10) 44%, transparent 70%)",
                }}
              />

              {/* 산방산은 정중앙에 그대로 두고, 좌우 아래 모서리에 하나씩 세운다.
                  높이를 같게 잡는다 — 비율이 달라(본점 1.53 가로, 창업주 0.86 세로)
                  너비를 맞추면 오히려 크기가 달라 보인다. */}
              <img
                ref={fgL}
                src={`${A}/store-main-blue.webp`}
                alt="모슬포 본점 — 멀리서도 한눈에 들어오는 파란 건물"
                width={538}
                height={352}
                loading="lazy"
                decoding="async"
                className="absolute bottom-7 left-4 w-auto rounded-[20px] object-cover shadow-[0_30px_70px_rgba(23,18,15,0.38)] will-change-transform md:bottom-12 md:left-10 md:rounded-[24px]"
                style={{ height: "clamp(120px, 19vw, 250px)", opacity: 0.94 }}
              />

              {/* ⚠️ 창업주 컷은 '흰 배경 위 연필 드로잉'이다. 그냥 얹으면 유채밭
                  한가운데 흰 사각형이 뜬다(사용자 지적). 불투명도만 낮추면 이번엔
                  회색 박스가 된다.
                  → mix-blend-multiply. 흰색은 곱해도 아래가 비쳐 사라지고 연필 선만
                    남는다. 들판 색이 드로잉에 배어들면서 배경에 녹아든다.
                  그래서 카드 취급(라운드·그림자)도 하지 않는다 — 종이가 아니라
                  배경에 그려 넣은 그림처럼 보여야 한다. */}
              <img
                ref={fgR}
                src={`${A}/founder.webp`}
                alt="창업주 김정일 명예회장"
                width={800}
                height={933}
                loading="lazy"
                decoding="async"
                className="absolute bottom-7 right-4 w-auto object-contain mix-blend-multiply will-change-transform md:bottom-12 md:right-10"
                style={{ height: "clamp(128px, 20vw, 268px)", opacity: 0.9 }}
              />
            </div>
            <figcaption className="mt-4 text-center text-[12.5px] leading-relaxed text-muted">
              배경 — 산방산과 유채밭. 왼쪽 — 모슬포 본점, 멀리서도 한눈에 들어오는 파란 건물. 오른쪽 — 창업주
              김정일 명예회장.
            </figcaption>
          </figure>
        </Rv>

        {/* ③ 스크롤에 따라 차오르는 문단 */}
        <FillText
          text="쌀이 귀하던 시절 제주의 밀가루 음식 문화 위에서, 부산식과는 전혀 다른 ‘제주식 밀냉면’을 만들어 냈습니다. 성수기엔 오픈런과 웨이팅이 일상인, 줄 서서 먹는 로컬 맛집입니다."
          className="mx-auto mt-20 max-w-[820px] text-center font-bold text-ink md:mt-28"
          style={{
            fontSize: "clamp(1.15rem, 2.5vw, 2.05rem)",
            lineHeight: 1.55,
            letterSpacing: "-0.035em",
          }}
        />

        {/* ④ 대형 숫자 — 24px 였던 것을 레퍼런스 스케일로 */}
        <div className="mt-20 grid grid-cols-2 gap-y-12 border-t border-line pt-14 md:mt-28 md:flex md:items-start md:justify-between">
          {STATS.map((s, i) => (
            <Fragment key={i}>
              {i > 0 && <span aria-hidden className="mx-8 hidden h-[86px] w-px bg-ink/12 md:block lg:mx-12" />}
              <Rv d={i * 150} className="text-center md:flex-1">
                <div
                  className="font-extrabold tracking-[-0.04em] text-ink"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.05 }}
                >
                  {s.v}
                </div>
                <div className="mx-auto mt-2.5 max-w-[13em] text-[13px] leading-snug text-muted md:text-[14.5px]">
                  {s.k}
                </div>
              </Rv>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
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
/* 산방식당 열의 글씨를 키우면서 행 높이도 같이 올렸다.
   ⚠️ 세 열이 정확히 맞물려야 하므로 높이는 반드시 한 값으로 공유한다. */
const ROW_H = "min-h-[88px] md:min-h-[104px]";

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
        {/* 제목 질감은 앞 섹션(브랜드 소개)과 같은 그라디언트로 맞춘다.
            다만 앞 섹션이 이 페이지의 '문패'이므로 여기는 한 단계 작게 —
            같은 크기로 두면 두 섹션이 서로 first place 를 다툰다. */}
        <h2
          className="mx-auto max-w-[16em] text-center font-extrabold"
          style={{
            ...TITLE_GRADIENT,
            fontSize: "clamp(1.85rem, 4vw, 3.1rem)",
            lineHeight: 1.18,
            letterSpacing: "-0.04em",
          }}
        >
          부산과 다른, 55년 동안 사랑받은
          <br />
          ‘제주식 밀냉면’
        </h2>
        {/* 재료로 말한다. 자극적이지 않다 = 객층이 넓다 = 사장님에겐 매출이다 */}
        <p
          className="mx-auto mt-8 max-w-[780px] text-center font-semibold tracking-[-0.02em] text-body"
          style={{ fontSize: "clamp(16px, 1.6vw, 20px)", lineHeight: 1.65 }}
        >
          <strong className="font-extrabold text-ink">국내산 멸치와 생강</strong>을 오래 끓여 내고,{" "}
          <strong className="font-extrabold text-ink">고운 고춧가루</strong>로 양념을 만듭니다.
          <br className="hidden md:block" />
          짜지 않고 맵지 않은데 끝맛이 깊습니다 —{" "}
          <span className="text-brand">호불호 없이 누구나 좋아하는 맛.</span>
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
                {/* 왼쪽은 한 단계 눌러 둔다 — 오른쪽이 커진 만큼 대비가 벌어져야
                    "다르다"가 눈으로 먼저 읽힌다 */}
                <div
                  className={`${ROW} ${ROW_H} bg-[#e6e2dd] text-[13px] leading-snug text-[#948d84] md:text-[14px] ${
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

                {/* 산방식당 열 — 이 표에서 읽혀야 하는 쪽. 글씨를 키우고 굵기를
                    올려 왼쪽 회색 열과 체급을 벌린다. */}
                <div
                  className={`${ROW} ${ROW_H} bg-paper font-bold leading-snug text-ink shadow-[0_18px_44px_rgba(23,18,15,0.10)] ${
                    last ? "rounded-b-[20px]" : ""
                  }`}
                  style={{ fontSize: "clamp(15.5px, 2.1vw, 22px)", letterSpacing: "-0.025em" }}
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
            <GlowCard g={c.g} icon={c.icon} title={c.t} body={c.d} minH={244} />
          </Rv>
        ))}
      </div>
    </Section>
  );
}

/* ══ ⑤ 직영 매장 + 제주 메뉴판 — 소개서 5·6·7p ══════════════════
   ⚠️ 주소·전화번호는 뺐다(사용자 지시 2026-07-29). 이 페이지는 B2B 도입
      문의를 받는 곳이지 매장을 안내하는 곳이 아니다. 매장 번호를 띄우면
      도입 문의가 매장으로 걸려 온다 — 070 창구를 따로 판 이유가 그것이다.
      매장이 '실재한다'는 증거는 영상과 배지가 이미 하고 있다. */
const STORES = [
  {
    key: "queue-moseulpo",
    name: "본점",
    badge: "원조",
    sub: "모슬포 · SINCE 1971",
    desc: "55년 전통이 시작된 곳 — 줄 서서 먹는 제주 로컬 맛집",
  },
  {
    key: "queue-1",
    name: "제주점",
    badge: "직영",
    sub: "제주시 직영점",
    desc: "넓은 홀로 단체·관광객까지 — 제주 도심의 거점 매장",
  },
  {
    key: "queue-2",
    name: "서울상공회의소점",
    badge: "서울",
    sub: "서울 진출 · 직영",
    desc: "제주를 넘어 서울로 — 검증된 맛을 육지에서도",
  },
];

export function Stores() {
  return (
    <Section id="stores" bg="paper">
      <Rv>
        {/* 제목 질감·크기는 앞의 비교 섹션과 같은 값으로 맞춘다 */}
        <h2
          className="mx-auto max-w-[16em] text-center font-extrabold"
          style={{
            ...TITLE_GRADIENT,
            fontSize: "clamp(1.85rem, 4vw, 3.1rem)",
            lineHeight: 1.18,
            letterSpacing: "-0.04em",
          }}
        >
          직접 만나는 산방식당
        </h2>
        <p
          className="mx-auto mt-6 max-w-[640px] text-center text-body"
          style={{ fontSize: "clamp(15.5px, 1.6vw, 18px)", lineHeight: 1.7 }}
        >
          제주 본점부터 서울까지 — 직영 매장에서 검증된 맛을 확인하세요.
        </p>
      </Rv>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {STORES.map((s, i) => (
          <Rv key={s.key} d={i * 100}>
            <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-warm">
              {/* 매장 영상 3개는 페이지 중반에 있다 → 화면에 들어올 때만 받는다 */}
              <LazyVideo
                src={s.key}
                poster={`${s.key}-poster`}
                label={`${s.name} 홀 — 식사 시간대`}
                className="aspect-video w-full bg-ink object-cover"
              />
              <div className="flex flex-1 flex-col p-7">
                <div className="mb-1.5 flex items-center gap-2.5">
                  <h3
                    className="font-extrabold tracking-[-0.03em] text-ink"
                    style={{ fontSize: "clamp(19px, 2.1vw, 25px)", lineHeight: 1.3 }}
                  >
                    {s.name}
                  </h3>
                  <span className="rounded-full bg-brand px-2.5 py-1 text-[11.5px] font-bold text-white">
                    {s.badge}
                  </span>
                </div>
                <div className="text-[13.5px] text-muted">{s.sub}</div>
                <p
                  className="mt-4 flex-1 text-body"
                  style={{ fontSize: "clamp(14.5px, 1.5vw, 16.5px)", lineHeight: 1.7 }}
                >
                  {s.desc}
                </p>
              </div>
            </article>
          </Rv>
        ))}
      </div>

      <Rv>
        <p className="mt-7 text-center text-[13px] leading-relaxed text-muted">
          ※ 영상은 매장 화면 그대로입니다. 연출하지 않았습니다.
        </p>
      </Rv>

      {/* 제주 메뉴판 — 소개서 6·7p.
          섹션 안의 하위 제목이라 위 h2 보다 한 단계 작게 두되 질감은 같이 간다 */}
      <div className="mt-24">
        <Rv>
          <div className="mb-12 h-px w-full bg-line" />
          <h3
            className="mx-auto max-w-[16em] text-center font-extrabold"
            style={{
              ...TITLE_GRADIENT,
              fontSize: "clamp(1.5rem, 3vw, 2.3rem)",
              lineHeight: 1.22,
              letterSpacing: "-0.04em",
            }}
          >
            제주에서의 메뉴판은 단출합니다
          </h3>
          <p
            className="mx-auto mt-5 max-w-[640px] text-center text-body"
            style={{ fontSize: "clamp(15px, 1.6vw, 17.5px)", lineHeight: 1.7 }}
          >
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
