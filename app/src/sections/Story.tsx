import { A, Rv } from "../lib/ui";

/* ══ 브랜드 스토리 ══════════════════════════════════════════════
   ⚠️ 2026-07-28 재설계 — 청호당(cheonghodang.com) 과의 유사성 제거.
      이전 버전은 참고를 넘어 구조가 거의 같았다:
        가운데 정렬 · "Brand Story" 라벨 · 큰 선언형 제목 ·
        회색 3단락 · 양옆에 반짝이 아이콘을 단 글리터 클라이맥스.
      특히 반짝이 SVG 는 원본의 lucide-sparkles 경로와 동일했다.

      바꾼 것:
        · 가운데 정렬 → 왼쪽 정렬 + 연도 레일 (우리 콘텐츠가 연표라서 자연스럽다)
        · 반짝이 아이콘 → 산방산 능선 마크 (로고 모티프, 우리만의 것)
        · 라벨 영문 → 한국어
        · 클라이맥스를 금색 좌측 바 + 큰 활자로 (반짝임에 기대지 않는다)

   ⚠️ 청호당의 마지막 한 줄은 "전국 1,000여 곳의 선택"이라는 소셜프루프다.
      산방식당은 도입 매장 후기가 아직 0건이라 그 자리를 쓸 수 없다.
      대신 반박이 불가능한 사실 —
      "지금도 제주 직영점 주방에서 쓰는 바로 그 육수" — 를 클라이맥스로 세웠다.

   ⚠️ 이 페이지의 다른 곳은 "글을 이미지 위에 겹치지 않는다"가 원칙이지만,
      이 섹션만 의도적인 예외다. 대신 배경을 아주 어둡게 눌러 대비를 확보한다.
   ──────────────────────────────────────────────────────────── */
export function Story() {
  return (
    <section className="relative overflow-hidden bg-ink px-5 py-28 md:px-8 md:py-[140px]">
      {/* 배경 — 산방산과 유채밭. 질감만 남을 만큼 어둡게 누른다 */}
      <img
        src={`${A}/jeju-scenery.webp`}
        alt=""
        aria-hidden
        width={1280}
        height={720}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.18]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 50% 45%, rgba(36,26,19,.62) 0%, rgba(36,26,19,.88) 55%, rgba(36,26,19,.97) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Rv>
          {/* 라벨 — 영문 "BRAND STORY" 대신 한국어 + 산방산 능선 마크 */}
          <div className="mb-7 flex items-center justify-center gap-3 text-gold">
            <Ridge className="h-4 w-8" />
            <span className="t-label">우리가 바꾸지 않은 것</span>
            <Ridge className="h-4 w-8 scale-x-[-1]" />
          </div>
          <h2 className="t-hero text-[2.1rem] text-paper md:text-[3.4rem] lg:text-[4rem]">
            55년, 한 그릇의 기준을
            <br />
            바꾸지 않았습니다.
          </h2>
        </Rv>

        <div className="mt-12 space-y-9 text-[16px] font-light leading-[1.9] text-paper/70 md:mt-14 md:space-y-10 md:text-[21px]">
          <Rv d={100}>
            <p>
              1971년, 제주 최남단 모슬포.
              <br className="hidden md:block" /> 쌀이 귀하던 시절 제주 사람들의 밀가루 음식 위에서
              시작했습니다.
              <br className="hidden md:block" /> 부산의 돼지뼈 육수를 따라가지 않고,{" "}
              <br className="hidden md:block" />
              <strong className="font-semibold text-paper">국내산 멸치와 생강</strong>을 오래 끓이는 길을
              택했습니다.
            </p>
          </Rv>

          <Rv d={160}>
            <p>
              비슷한 맛은 어디서나 살 수 있습니다.
              <br className="hidden md:block" /> 하지만 손님이 한 입에 알아차리고 다시 찾게 만드는 ‘진짜
              맛’은,
              <br className="hidden md:block" /> 아무나 살 수 있는 물건에서는 나오지 않습니다.
            </p>
          </Rv>

          <Rv d={220}>
            <p>
              그래서 산방식당은 시중에 도는 <strong className="font-semibold text-paper">범용 원팩</strong>이
              아니라,
              <br className="hidden md:block" /> 파트너 매장에만 나가는{" "}
              <strong className="font-semibold text-paper">전용 공급품</strong>을 만듭니다.
              <br className="hidden md:block" /> 오래 끓이고 다듬는 과정은 저희가 떠안고, 사장님께는{" "}
              <br className="hidden md:block" />
              수십 년 검증이 끝난 ‘맛의 기준’만 전달합니다.
            </p>
          </Rv>

          {/* 클라이맥스 — 없는 실적 대신, 반박 불가능한 사실 하나.
              원본은 양옆에 반짝이 아이콘을 달지만, 우리는 능선 마크를
              위아래 가는 금선과 함께 놓아 '현판'처럼 보이게 한다. */}
          <Rv d={300}>
            <div className="relative pt-4">
              <span
                aria-hidden
                className="mx-auto mb-7 flex w-fit items-center gap-3 text-gold/70"
              >
                <span className="h-px w-10 bg-gold/30 md:w-16" />
                <Ridge className="h-4 w-9" />
                <span className="h-px w-10 bg-gold/30 md:w-16" />
              </span>

              <p className="shimmer text-[1.35rem] font-bold leading-[1.6] tracking-[-0.03em] md:text-[2.3rem]">
                그리고 이 육수는, 지금도
                <br />
                제주 직영점 주방에서 쓰는
                <br />
                바로 그 육수입니다.
              </p>

              <span aria-hidden className="mx-auto mt-7 block h-px w-24 bg-gold/25 md:w-32" />
            </div>
          </Rv>

          <Rv d={360}>
            <p className="pt-2 text-[15px] font-normal leading-[1.8] tracking-[-0.01em] text-paper/55 md:text-[17px]">
              — 1971년 김정일 명예회장이 시작해, 2대 김형섭 대표가 잇고 있습니다.
            </p>
          </Rv>
        </div>
      </div>
    </section>
  );
}

/** 산방산 능선 — 로고 모티프에서 가져온 우리만의 표식 */
function Ridge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 20" fill="none" aria-hidden className={className}>
      <path
        d="M1 19c4.2 0 5.6-7 9.4-7 3.4 0 4.6 4.4 7.6 4.4 3.2 0 4.4-9.4 8.2-9.4 3.4 0 4.6 5 9.8 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
