import { useEffect, useRef, useState } from "react";
import { A } from "../lib/ui";

/* ══ ⑧-2 선언 한 문장 ═══════════════════════════════════════════
   고민 카드 여섯 장을 지난 직후, 숨 한 번 쉬고 결론을 던지는 자리.
   여기엔 설명도 버튼도 두지 않는다. 문장 하나만 있어야 세게 읽힌다.

   글자가 하나씩 빠르게 나타난다(26ms 간격). 타자기처럼 커서를 깜빡이는
   방식은 쓰지 않았다 — 20자를 한 자씩 기다리게 하면 광고로 들어온 사람이
   기다리지 않는다. 전체가 0.9초 안에 끝나게 잡았다.

   ⚠️ 접근성·안정성
     · prefers-reduced-motion 이면 애니메이션 없이 즉시 보인다
     · 관찰이 실패해도 1.6초 뒤 무조건 보인다(글이 영영 안 뜨는 사고 방지)
     · 화면에는 글자 조각으로 쪼개져 있지만 aria-label 로 문장 전체를
       읽히게 해서 스크린리더에는 한 문장으로 들린다
   ──────────────────────────────────────────────────────────── */

const SENTENCE = "좋은 메뉴 하나가 우리 매장의 미래를 바꿉니다.";

/* 줄 → 단어 → 글자. 단어를 통째로 묶어야 줄바꿈이 단어 중간에서 일어나지 않는다.
   (글자마다 span 을 만들면 브라우저가 아무 데서나 줄을 끊는다) */
const LINES: { w: string; accent?: boolean }[][] = [
  [{ w: "좋은" }, { w: "메뉴" }, { w: "하나가" }],
  [{ w: "우리" }, { w: "매장의" }, { w: "미래를", accent: true }, { w: "바꿉니다." }],
];

const STEP = 26; // 글자 사이 간격(ms)
const DUR = 380; // 글자 하나가 올라오는 시간(ms)

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    // 폴백 — 관찰이 안 걸려도 글은 반드시 보여야 한다
    const t = setTimeout(() => setOn(true), 1600);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  let n = 0; // 문장 전체를 통틀어 몇 번째 글자인지 (줄이 넘어가도 이어진다)

  return (
    <section
      ref={ref}
      aria-label={SENTENCE}
      className="relative overflow-hidden bg-paper px-5 pb-16 pt-20 md:px-8 md:pb-24 md:pt-[168px]"
    >
      <p
        aria-hidden
        className="mx-auto max-w-[1100px] text-center font-extrabold text-ink"
        style={{
          fontSize: "clamp(2.05rem, 6.2vw, 5rem)",
          lineHeight: 1.2,
          letterSpacing: "-0.045em",
        }}
      >
        {LINES.map((line, li) => (
          <span key={li} className="block">
            {line.map((word, wi) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {[...word.w].map((ch, ci) => {
                  const d = n++ * STEP;
                  return (
                    <span
                      key={ci}
                      className="inline-block"
                      style={{
                        color: word.accent ? "var(--color-brand)" : undefined,
                        opacity: on ? 1 : 0,
                        transform: on ? "translateY(0)" : "translateY(0.42em)",
                        transition: `opacity ${DUR}ms cubic-bezier(0.22,1,0.36,1) ${d}ms, transform ${DUR}ms cubic-bezier(0.22,1,0.36,1) ${d}ms`,
                      }}
                    >
                      {ch}
                    </span>
                  );
                })}
                {/* 단어 사이 공백 — inline-block 사이에서는 그냥 띄어쓰기가 먹지 않는다 */}
                {wi < line.length - 1 && <span className="inline-block w-[0.3em]" />}
              </span>
            ))}
          </span>
        ))}
      </p>

      {/* 문장 아래 짧은 선 하나 — 글자가 다 나타난 뒤 가로로 열린다 */}
      <span
        aria-hidden
        className="mx-auto mt-12 block h-px bg-brand/45"
        style={{
          width: on ? 72 : 0,
          transition: `width 520ms cubic-bezier(0.22,1,0.36,1) ${n * STEP + 120}ms`,
        }}
      />
    </section>
  );
}

/* ══ ⑧-3 메뉴 밴드 ═════════════════════════════════════════════
   선언 문장 바로 아래에서 메뉴 사진이 좌 → 우 로 천천히 흘러간다.
   "좋은 메뉴 하나가…" 라고 말한 직후에 그 '좋은 메뉴'를 실제로 보여 준다.

   칸 크기는 전부 같다(4:5). 원본이 세로 0.62~0.75, 가로 1.50 으로 섞여
   있어 비율대로 두면 폭이 들쭉날쭉해 밴드가 어수선했다 → object-cover 로
   가운데를 잘라 맞춘다. 가로 컷 3장(item-mandu · menu-mandu ·
   set-milmyeon-mandu)은 좌우가 잘리므로 가운데에 음식이 있어야 한다.

   ⚠️ 사진은 밴드 전용 축소본(assets/web/slide/)을 쓴다. 원본은 1400~2100px
      라 9장에 1.16MB 였는데, 화면엔 320px 남짓으로 뜬다. → `node _slide.mjs`
      로 640px 본을 만들어 430KB 로 줄였다. 원본은 다른 섹션이 그대로 쓴다.
   ──────────────────────────────────────────────────────────── */

/* 순서는 사용자 지정 (2026-07-29) */
const STRIP = [
  { f: "item-broth", alt: "국내산 멸치를 오래 끓인 산방식당 육수" },
  { f: "item-bibim", alt: "산방식당 비빔전용장을 얹은 비빔밀냉면" },
  { f: "item-noodle", alt: "가수율 45% 이상의 산방식당 생밀면" },
  { f: "item-mandu", alt: "산방식당 손만두" },
  { f: "katsu-hero", alt: "초격차 사이드 — 돈까스" },
  { f: "menu-bibim-oh", alt: "비빔밀냉면 한 그릇" },
  { f: "menu-mandu-oh", alt: "만두 한 접시" },
  { f: "menu-mandu", alt: "갓 쪄낸 만두" },
  { f: "set-milmyeon-mandu", alt: "밀냉면과 만두 세트 한상" },
];

export function MenuStrip() {
  return (
    <section
      aria-label="산방식당 메뉴"
      className="marquee marquee--pause bg-paper pb-20 md:pb-[120px]"
    >
      {/* 목록을 두 벌 — 이음매를 없애기 위한 것이라 두 번째 벌은 화면에만 있고
          스크린리더에는 중복으로 읽히지 않게 감춘다 */}
      <div className="marquee__track marquee__track--rev" style={{ animationDuration: "40s" }}>
        {[0, 1].map((pass) => (
          <ul key={pass} className="flex shrink-0" aria-hidden={pass === 1}>
            {STRIP.map((s) => (
              /* 간격을 gap 이 아니라 각 칸의 오른쪽 여백으로 준다.
                 gap 으로 주면 두 벌이 만나는 지점에만 간격이 절반이 되어
                 (-50% 지점이 어긋난다) 한 바퀴마다 화면이 한 번 튄다. */
              <li key={s.f} className="mr-4 shrink-0">
                <div
                  className="aspect-[4/5] overflow-hidden rounded-[20px]"
                  style={{ height: "clamp(190px, 24vw, 320px)" }}
                >
                  <img
                    src={`${A}/slide/${s.f}.webp`}
                    alt={pass === 0 ? s.alt : ""}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
