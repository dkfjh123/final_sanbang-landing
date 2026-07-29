import { A, LazyVideo, Rv, Section, TITLE_GRADIENT } from "../lib/ui";

/* ══ ⑨~⑫ 메뉴솔루션 공급 품목 4종 — 소개서 12~16p ═══════════════
   소개서 순서 그대로: ① 생밀면 → ② 산방육수 → ③ 산방비빔장 → ④ 산방만두

   2026-07-29 대폭 축약(사용자 지시): "부연설명이 너무 많다. 랜딩에 들어온
   사람이 핵심만 파악할 수 있게."
     · 품목마다 리드 문장을 두세 줄 → 한 줄로
     · 생면의 '30년 4원칙' 카드 4장 → 칩 한 줄 (자연숙성·최적배합·정제수·HACCP)
     · 육수 3가지 특징 카드 → 칩 한 줄
     · 만두 4대 강점 카드에 붙어 있던 따옴표 카피("이게 진짜 고기 만두" 등) 삭제
   근거가 되는 수치(가수율 45%·고기 32.27%)는 남긴다 — 이건 부연이 아니라
   이 페이지가 파는 것 자체다.
   ──────────────────────────────────────────────────────────── */

/** 품목 공통 껍데기 — 사진(또는 영상)과 글을 좌우로 번갈아 놓는다 */
function Item({
  no,
  tag,
  title,
  lead,
  img,
  video,
  poster,
  alt,
  flip = false,
  aspect = "aspect-[4/3]",
  anchorBottom = false,
  children,
}: {
  no: string;
  tag: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  /** 사진을 쓸 때의 파일명(확장자 제외). video 를 주면 무시된다 */
  img?: string;
  /** 영상을 쓸 때의 파일명(확장자 제외) */
  video?: string;
  poster?: string;
  alt: string;
  flip?: boolean;
  aspect?: string;
  /** 원본 위쪽에 빈 배경이 넓은 컷 — 아래를 기준으로 잘라야 음식이 살아난다 */
  anchorBottom?: boolean;
  children?: React.ReactNode;
}) {
  const media = `w-full rounded-[24px] bg-warm object-cover ${aspect} ${
    anchorBottom ? "object-bottom" : ""
  }`;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Rv className={flip ? "lg:order-2" : undefined}>
        {video ? (
          /* 화면에 들어올 때만 내려받는다 — 이 섹션은 한참 아래에 있다 */
          <LazyVideo src={video} poster={poster ?? ""} label={alt} className={media} />
        ) : (
          <img
            src={`${A}/${img}.webp`}
            alt={alt}
            width={1000}
            height={750}
            loading="lazy"
            decoding="async"
            className={media}
          />
        )}
      </Rv>

      {/* 모바일은 가운데 정렬(사용자 지시 2026-07-29). 좁은 화면에서 사진은
          꽉 차는데 글만 왼쪽으로 몰리면 축이 어긋나 보인다.
          데스크톱은 사진과 글이 좌우로 나뉘므로 왼쪽 정렬을 유지한다. */}
      <Rv d={110} className={`text-center lg:text-left ${flip ? "lg:order-1" : ""}`}>
        {/* 품목 이름은 사실상 이 블록의 첫 제목이다. 11px 라벨로 두면 그냥
            꼬리표로 읽히고 넘어간다 → 실제 제목 급으로 키웠다.
            다만 아래 h3(최대 2.2rem)보다는 확실히 작게 잡아 서열을 지킨다.
            ⚠️ t-label(대문자·자간 0.14em)은 걷어냈다 — 한글에 대문자는 무의미하고,
               넓은 자간을 큰 글씨에 그대로 쓰면 글자가 흩어져 보인다. */}
        <div className="mb-3 flex items-center justify-center gap-3 lg:justify-start">
          <span className="rounded-full bg-brand px-3 py-1 text-[12.5px] font-extrabold tracking-[0.04em] text-white md:text-[13.5px]">
            {no}
          </span>
          <span
            className="font-extrabold text-brand"
            style={{ fontSize: "clamp(1.15rem, 2vw, 1.65rem)", lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            {tag}
          </span>
        </div>
        <h3
          className="font-extrabold"
          style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)", lineHeight: 1.24, letterSpacing: "-0.04em" }}
        >
          {title}
        </h3>
        <p
          className="mt-5 text-body"
          style={{ fontSize: "clamp(15px, 1.6vw, 17.5px)", lineHeight: 1.72 }}
        >
          {lead}
        </p>
        {children}
      </Rv>
    </div>
  );
}

export function Items() {
  return (
    <Section id="items" bg="warm">
      <Rv>
        {/* 리드 문장("전 품목을 받으실 필요 없습니다…")은 삭제했다(사용자 지시).
            제목 질감·크기는 비교·매장 섹션과 같은 값. */}
        <h2
          className="mx-auto max-w-[16em] text-center font-extrabold"
          style={{
            ...TITLE_GRADIENT,
            fontSize: "clamp(1.85rem, 4vw, 3.1rem)",
            lineHeight: 1.18,
            letterSpacing: "-0.04em",
          }}
        >
          산방식당만의 전용상품
        </h2>
      </Rv>

      {/* 품목 사이 간격 — 모바일 96px 는 너무 멀다. 여섯 덩이가 쌓이면
          그것만으로 화면 몇 개가 빈 공간이 된다. */}
      <div className="mt-12 space-y-16 md:mt-16 md:space-y-32">
        {/* ── ① 생밀면 ───────────────────────────────────────── */}
        {/* ⚠️ 파트너가 받는 것은 전문 제조 생면이다.
            "매일 뽑는 / 직접 뽑은" 처럼 매장 제면으로 읽히는 표현을 쓰지 말 것.
            스펙(가수율·자연숙성)으로 말한다. */}
        <Item
          no="01"
          tag="생밀면"
          video="noodle-elastic"
          poster="noodle-elastic-poster"
          aspect="aspect-[3/2]"
          alt="산방식당 생밀면 — 당겨도 끊어지지 않는 면의 탄력"
          title={
            <>
              끝까지 쫄깃한 이유,
              <br />
              “다가수면”
            </>
          }
          lead={
            <>
              물을 많이 넣어 반죽할수록 면은 촉촉해지고,{" "}
              <strong className="font-bold text-ink">뜨거운 국물 속에서도 쉽게 붇지 않습니다.</strong>
            </>
          }
        >
          {/* 가수율 비교 — 소개서 12p. 이 섹션에서 가장 중요한 한 장면이라 남긴다 */}
          <div className="mt-9 rounded-[24px] border border-line bg-paper p-7">
            {[
              { n: "일반 생면", v: "30–35%", w: "35%", tone: "bg-muted/35" },
              { n: "산방식당 생밀면", v: "45%+", w: "100%", tone: "bg-brand" },
            ].map((b) => (
              <div key={b.n} className="mb-5 last:mb-0">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-[14px] font-semibold text-ink md:text-[15px]">{b.n}</span>
                  <span className="text-[17px] font-extrabold tracking-[-0.02em] text-ink md:text-[19px]">
                    {b.v}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-line">
                  <div className={`h-full rounded-full ${b.tone}`} style={{ width: b.w }} />
                </div>
              </div>
            ))}
            <p className="mt-6 text-[13.5px] leading-relaxed text-body">
              반죽이 머금는 수분량. 일반 면보다{" "}
              <strong className="font-bold text-ink">약 1.3배 이상</strong>입니다.
            </p>
          </div>
        </Item>

        {/* ── ② 산방육수 ─────────────────────────────────────── */}
        <Item
          no="02"
          tag="산방육수"
          /* ⚠️ "10년에 걸쳐 완성한 육수"는 공개 출처로 확인되지 않는다.
             (공식 사이트의 '10여 년'은 파트너십 R&D 언급) → 08_금지선
             연수를 주장하지 말고 재료와 공정으로 말한다. */
          img="item-broth"
          alt="산방식당 제주식 물밀냉면 — 멸치 육수 베이스"
          flip
          anchorBottom
          title={
            <>
              국내산 멸치를
              <br />
              오래 끓인 육수
            </>
          }
          lead={
            <>
              <strong className="font-bold text-ink">멸치와 생강</strong>을 오래 끓여 냅니다. 부산식 돼지뼈
              육수와는 처음부터 다른 길이었습니다.
            </>
          }
        />

        {/* ── ③ 산방비빔장 ───────────────────────────────────── */}
        <Item
          no="03"
          tag="산방비빔장"
          img="bibimjang"
          aspect="aspect-[3/2]"
          alt="산방식당 비빔전용장을 면 위에 붓는 장면"
          title={
            <>
              찍고, 비비고, 풀고 —
              <br />
              산방식당만의 비빔전용장
            </>
          }
          lead={
            <>
              <strong className="font-bold text-ink">고운 고춧가루로 맵지 않게 잡은 감칠맛.</strong> 달지도
              짜지도 않은데 입에 착 붙습니다.
            </>
          }
        >
          {/* 한 가지 장으로 세 가지를 한다 — 이건 남긴다. 품목 하나로 메뉴가
              세 개 되는 얘기라, 사장님 입장에서 가장 실리적인 정보다. */}
          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {[
              ["수육에 찍어", "새우젓 대신 특제 찍장"],
              ["비빔면에 비벼", "비빔밀면의 핵심 양념"],
              ["물밀면에 풀어", "육수에 풀면 또 한 그릇"],
            ].map(([t, d]) => (
              <div key={t} className="rounded-[18px] border border-line bg-paper px-5 py-5">
                <div className="mb-1.5 text-[14.5px] font-bold tracking-[-0.02em] text-brand">{t}</div>
                <p className="text-[13px] leading-relaxed text-body">{d}</p>
              </div>
            ))}
          </div>
        </Item>

        {/* ── ④ 산방만두 ─────────────────────────────────────── */}
        {/* ⚠️ '냉동만두' 프레임은 걷어냈다(사용자 지시 2026-07-29). 먼저 냉동을
            꺼내면 방어부터 하는 글이 되고, 사장님이 사는 건 '고기 든 만두'다.
            거짓은 아니다 — 냉동이라는 사실을 주장하지 않을 뿐이다. */}
        <Item
          no="04"
          tag="산방만두"
          img="item-mandu"
          alt="산방만두 — 국내산 냉장육 100% 왕만두"
          flip
          title={
            <>
              고기로 승부하는,
              <br />
              산방만두
            </>
          }
          lead={
            <>
              국내산 <strong className="font-bold text-ink">냉장육 100%</strong>로 육즙을 그대로 담고, 고기와
              야채 1:1 황금비율로 한 알이 든든합니다.
            </>
          }
        >
          <div className="mt-9 rounded-[24px] border border-brand/25 bg-gradient-to-br from-warm-2 via-warm to-paper px-7 py-6">
            <div className="text-[38px] font-extrabold leading-none tracking-[-0.04em] text-brand md:text-[46px]">
              32.27%
            </div>
            <div className="mt-2 text-[13px] text-body md:text-[14px]">
              돼지고기 함량 <span className="text-muted">(+ 돼지갈비살 2.23%)</span>
            </div>
          </div>
        </Item>

        {/* ── 전환 — 서랍을 나눈다 ───────────────────────────────
            01~04 는 산방식당이 55년간 만든 것이고, 05 는 성격이 다르다
            (직접 만들지 않고 전문 제조사와 함께한다). 그동안 이 둘을 한
            서랍에 넣고 아무 말도 안 해서 "브랜드육이 갑자기 나온다"는
            지적을 받았다(사용자).
            → 종류가 다르다고 먼저 말해 버린다. 숨기니까 어색했던 것이고,
              말하고 나면 오히려 정직해 보인다.
            ⚠️ 화법은 '연결해 드립니다'(거래) 가 아니라 '알게 되어 준비했다'
               (서사) 로 간다 — 사용자 지시 2026-07-29. */}
        <Rv>
          <div className="mx-auto max-w-[780px] border-t border-line pt-14 text-center md:pt-16">
            <p
              className="font-extrabold tracking-[-0.04em] text-ink"
              style={{ fontSize: "clamp(1.3rem, 2.7vw, 2.15rem)", lineHeight: 1.42 }}
            >
              여기까지가 55년이 만든 것입니다.
              <br />
              그런데 매장에 필요한 건,{" "}
              <span className="text-brand">이것만이 아니었습니다.</span>
            </p>
            <p
              className="mx-auto mt-6 max-w-[620px] text-body"
              style={{ fontSize: "clamp(15px, 1.6vw, 17.5px)", lineHeight: 1.75 }}
            >
              수년간 사장님들과 매장을 준비하며 알게 된 것입니다. 그래서 이것도 준비했습니다.
            </p>
          </div>
        </Rv>

        {/* ── ⑤ 사이드 돈까스 ────────────────────────────────────
            2026-07-29 편입. 원래는 `#side` 라는 별도 다크 섹션이었는데,
            밀면 얘기가 다 끝난 뒤에 새 챕터처럼 등장해 "산방식당 랜딩에
            안 어울린다"는 지적을 받았다(사용자).

            근본 원인은 자리가 아니라 논리였다. 그 섹션은 계절표(여름 성수기 /
            겨울 급락)로 열면서 돈까스를 **새 매출원**으로 팔고 있었다. 그런데
            실제로 팔려는 건 **이미 쓰고 있는 돈까스의 업그레이드**다. 화법이
            다르니 다른 사업으로 읽혔다.
            → 훅을 "아직도 그냥 쓰고 계신가요?"로 바꾸고 품목 05번으로 내렸다.
              계절 얘기는 리드 한 줄로만 남긴다. 표까지 세울 일이 아니다.
            ⚠️ 공급 형태(염지육/냉동/반조리)는 미확정이므로 특정하지 않는다.
               → 05_초격차사이드 · 08_금지선 */}
        <Item
          no="05"
          tag="사이드 돈까스"
          img="katsu-hero"
          aspect="aspect-[4/5]"
          alt="두툼한 돈까스 단면 — 부위와 두께를 지정해 만든 사이드메뉴"
          title={
            <>
              아직도 일반 냉동 돈까스,
              <br />
              그냥 쓰고 계신가요?
            </>
          }
          /* ⚠️ "저희가 직접 만들지 않습니다" 같은 부정형은 쓰지 않는다(사용자 지시
             2026-07-29). 없는 것을 먼저 말하면 변명처럼 읽힌다. 같은 사실을
             '오래 함께 준비해 온 파트너'라는 긍정형으로 말한다.
             2019년은 서울 진출·육지 확장을 시작한 해라 브랜드 서사와도 맞물린다. */
          lead={
            <>
              차별화된 산방의 맛에{" "}
              <strong className="font-bold text-ink">가장 잘 어울리는 브랜드육 돈까스</strong>.{" "}
              2019년부터 같은 방향을 준비해 온 파트너사와 함께 준비합니다.
            </>
          }
        >
          {/* 3단 비교표(일반냉동/생고기손질/초격차)는 뺐다 — 여기서 길게 설명할
              자리가 아니다. 차이는 '고기' 한 가지로 말하고, 자세한 근거는
              바로 뒤 브랜드육 섹션이 받는다. */}
          <p
            className="mt-8 font-extrabold tracking-[-0.035em] text-ink"
            style={{ fontSize: "clamp(1.3rem, 2.4vw, 1.95rem)", lineHeight: 1.38 }}
          >
            이름 없는 고기 대신,
            <br />
            <span className="text-brand">이름이 있는 브랜드육</span>으로.
          </p>
          <p className="mt-4 text-body" style={{ fontSize: "clamp(14.5px, 1.5vw, 16.5px)", lineHeight: 1.72 }}>
            공장이 만든 것 중에서 고르지 않습니다. 부위 · 두께 · 빵가루까지 지정해서 만듭니다.
          </p>
        </Item>
      </div>
    </Section>
  );
}
