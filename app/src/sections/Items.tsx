import { A, Label, Rv, Section } from "../lib/ui";

/* ══ ⑨~⑫ 메뉴솔루션 공급 품목 4종 — 소개서 12~16p ═══════════════
   소개서 순서 그대로: ① 생밀면 → ② 산방육수 → ③ 산방비빔장 → ④ 산방만두
   ──────────────────────────────────────────────────────────── */

/** 품목 공통 껍데기 — 사진과 글을 좌우로 번갈아 놓는다 */
function Item({
  no,
  tag,
  title,
  lead,
  img,
  alt,
  flip = false,
  portrait = false,
  anchorBottom = false,
  children,
}: {
  no: string;
  tag: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  img: string;
  alt: string;
  flip?: boolean;
  portrait?: boolean;
  /** 원본 위쪽에 빈 배경이 넓은 컷 — 아래를 기준으로 잘라야 음식이 살아난다 */
  anchorBottom?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Rv className={flip ? "lg:order-2" : undefined}>
        <img
          src={`${A}/${img}.webp`}
          alt={alt}
          width={1000}
          height={portrait ? 1400 : 750}
          loading="lazy"
          decoding="async"
          className={`w-full rounded-[24px] bg-warm object-cover ${
            portrait ? "aspect-[3/4] lg:aspect-[4/5]" : "aspect-[4/3]"
          } ${anchorBottom ? "object-bottom" : ""}`}
        />
      </Rv>

      <Rv d={110} className={flip ? "lg:order-1" : undefined}>
        <div className="t-label mb-4 flex items-center gap-2.5 text-brand">
          <span className="rounded-full bg-brand px-2.5 py-1 text-white">{no}</span>
          {tag}
        </div>
        <h3 className="t-h2 text-[1.55rem] md:text-[2rem]">{title}</h3>
        <p className="t-body mt-5 text-[15px]">{lead}</p>
        {children}
      </Rv>
    </div>
  );
}

export function Items() {
  return (
    <Section id="items" bg="warm">
      <Rv>
        <Label>메뉴솔루션 공급 품목</Label>
        <h2 className="t-h2 max-w-3xl text-[1.9rem] md:text-[2.5rem]">
          네 가지 <span className="text-brand">‘베이스’</span>를 드립니다
        </h2>
        <p className="t-body mt-7 max-w-2xl text-[15.5px]">
          전 품목을 받으실 필요 없습니다. 매장에 맞는 것만 고르시면 됩니다.
        </p>
      </Rv>

      <div className="mt-16 space-y-24 md:space-y-32">
        {/* ── ① 생밀면 ───────────────────────────────────────── */}
        {/* ⚠️ 파트너가 받는 것은 전문 제조 생면이다.
            "매일 뽑는 / 직접 뽑은" 처럼 매장 제면으로 읽히는 표현을 쓰지 말 것.
            스펙(가수율·자연숙성)으로 말한다. */}
        <Item
          no="01"
          tag="생밀면"
          img="noodle-fresh"
          portrait
          alt="산방식당 생밀면 — 가수율 45% 이상의 다가수 생면"
          title={
            <>
              끝까지 쫄깃한 이유,
              <br />
              <span className="text-brand">“다가수면”</span>
            </>
          }
          lead={
            <>
              “왜 산방식당 면은 안 퍼지고, 끝까지 쫄깃할까요?” 비밀은 반죽의{" "}
              <strong className="font-bold text-ink">‘가수율’</strong>입니다. 물을 많이 넣어 반죽할수록 면은
              더 촉촉해지고, 뜨거운 국물 속에서도 쉽게 붇지 않습니다.
            </>
          }
        >
          {/* 가수율 비교 — 소개서 12p */}
          <div className="mt-9 rounded-[24px] border border-line bg-paper p-7">
            <div className="t-label mb-6 text-muted">가수율 비교 · 반죽 시 면이 머금는 수분 함량</div>

            {[
              { n: "일반 생면", v: "30–35%", w: "35%", tone: "bg-muted/35" },
              { n: "산방식당 생밀면", v: "45%+", w: "100%", tone: "bg-brand" },
            ].map((b) => (
              <div key={b.n} className="mb-5 last:mb-0">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-[13.5px] font-semibold text-ink">{b.n}</span>
                  <span className="text-[15px] font-extrabold tracking-[-0.02em] text-ink">{b.v}</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-line">
                  <div className={`h-full rounded-full ${b.tone}`} style={{ width: b.w }} />
                </div>
              </div>
            ))}

            <p className="mt-6 text-[13px] leading-relaxed text-body">
              일반 면보다 약 <strong className="font-bold text-ink">1.3배 이상 많은 수분</strong> — 어디서든
              끝까지 쫄깃합니다.
            </p>
          </div>

          {/* 30년 4원칙 — 소개서 13p */}
          <div className="mt-6">
            <p className="t-body mb-5 text-[14.5px]">
              쫄깃함은 우연이 아닙니다.{" "}
              <strong className="font-bold text-ink">30년간 오직 생면만 연구해 온 제조 노하우</strong>가, 면
              한 가닥의 탄력과 끝맛까지 결정합니다.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["자연 숙성", "일정한 시간 자연 숙성을 거쳐 반죽을 안정시킨 뒤 생산합니다."],
                ["최적 배합", "면 농도에 맞춘 최적의 배합비로 언제나 일관된 품질을 만듭니다."],
                ["정제수 사용", "자체 기술 기준으로 정제한 물만 사용해, 잡미 없는 깨끗한 면을 뽑습니다."],
                ["HACCP 인증", "식품안전관리인증기준을 적용한 시설에서 위생적으로 생산합니다."],
              ].map(([t, d], i) => (
                <div key={t} className="rounded-[18px] border border-line bg-paper px-5 py-4">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="text-[11px] font-bold text-brand">0{i + 1}</span>
                    <span className="text-[14px] font-bold tracking-[-0.02em] text-ink">{t}</span>
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-body">{d}</p>
                </div>
              ))}
            </div>
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
          portrait
          anchorBottom
          title={
            <>
              <span className="text-brand">국내산 멸치</span>를
              <br />
              오래 끓인 육수
            </>
          }
          lead={
            <>
              <strong className="font-bold text-ink">멸치와 생강</strong>을 오래 끓여 냅니다. 짜지 않고
              담백한데, 은근한 단맛과 적당한 산미가 도는 시원한 국물. 부산식 돼지뼈 육수와는 처음부터 다른
              길이었고, 55년 동안 그 기준을 바꾸지 않았습니다.
            </>
          }
        >
          <div className="mt-9 space-y-3">
            {[
              ["은근한 단맛", "자극적이지 않게, 은근하게 올라오는 깊은 단맛."],
              ["담백한 시원함", "짜지 않고 담백해, 끝까지 개운하게 떨어지는 육수."],
              ["적당한 산미", "은은한 산미로 입안을 정리하는 깔끔한 마무리."],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-4 rounded-[18px] border border-line bg-paper px-6 py-4">
                <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <div>
                  <div className="text-[14.5px] font-bold tracking-[-0.02em] text-ink">{t}</div>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-body">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </Item>

        {/* ── ③ 산방비빔장 ───────────────────────────────────── */}
        <Item
          no="03"
          tag="산방비빔장"
          img="action-gomyeong"
          alt="산방식당 비빔밀냉면에 오이 고명을 올리는 장면"
          title={
            <>
              찍고, 비비고, 풀고 —
              <br />
              <span className="text-brand">산방식당만의 비빔전용장</span>
            </>
          }
          lead={
            <>
              수육에는 새우젓 대신, 밀면 다대기 비슷한 이 비빔전용장과 겨자를 냅니다. 달지도 짜지도, 과하게
              상큼하지도 않은데 입에 착 붙는 —{" "}
              <strong className="font-bold text-ink">고운 고춧가루로 맵지 않게 잡은 감칠맛</strong>입니다.
            </>
          }
        >
          <div className="mt-9">
            <div className="t-label mb-5 text-muted">한 가지 장, 세 가지 활용</div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["수육에 찍어", "새우젓 대신, 고기 맛을 살려 주는 특제 찍장."],
                ["비빔면에 비벼", "새콤달콤, 비빔밀면을 완성하는 핵심 양념."],
                ["물밀면에 풀어", "육수에 풀면 또 다른 한 그릇이 됩니다."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-[18px] border border-line bg-paper px-5 py-5">
                  <div className="mb-1.5 text-[14px] font-bold tracking-[-0.02em] text-brand">{t}</div>
                  <p className="text-[12.5px] leading-relaxed text-body">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </Item>

        {/* ── ④ 산방만두 ─────────────────────────────────────── */}
        <Item
          no="04"
          tag="산방만두"
          img="item-mandu"
          alt="산방만두 — 국내산 냉장육 100% 왕만두"
          flip
          title={
            <>
              냉동만두의 편견을 깨는,
              <br />
              <span className="text-brand">산방만두</span>
            </>
          }
          lead={
            <>
              냉동만두지만, <strong className="font-bold text-ink">냉장육 100%.</strong> 국내산 냉장육만
              사용해 해동 없이 육즙을 그대로 담고, 고기와 야채 1:1 황금비율로 한 알이 든든합니다.
            </>
          }
        >
          <div className="mt-9 flex items-center gap-6 rounded-[24px] border border-brand/25 bg-gradient-to-br from-warm-2 via-warm to-paper px-7 py-6">
            <div>
              <div className="text-[34px] font-extrabold leading-none tracking-[-0.04em] text-brand">
                32.27%
              </div>
              <div className="mt-1.5 text-[12.5px] text-body">
                돼지고기 함량 <span className="text-muted">(+ 돼지갈비살 2.23%)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["국내산 냉장육 100%", "퍽퍽함 → 촉촉한 육즙", "냉동만두의 편견을 깨다"],
              ["고기 32.27%", "속 부족 → 고기 가득", "이게 진짜 고기 만두"],
              ["특제 피 기술", "잘 터짐 → 안 터짐", "끝까지 완벽한 비주얼"],
              ["왕 사이즈", "양 부족 → 든든한 포만감", "한 알의 압도적 존재감"],
            ].map(([t, ba, q], i) => (
              <div key={t} className="rounded-[18px] border border-line bg-paper px-5 py-4">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-[11px] font-bold text-brand">0{i + 1}</span>
                  <span className="text-[14px] font-bold tracking-[-0.02em] text-ink">{t}</span>
                </div>
                <p className="text-[12.5px] text-body">{ba}</p>
                <p className="mt-1 text-[12.5px] font-semibold text-brand">“{q}”</p>
              </div>
            ))}
          </div>
        </Item>
      </div>
    </Section>
  );
}
