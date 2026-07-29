import { useEffect, useRef, useState } from "react";
import { A, Cta, Rv, TEL_INQUIRY, track } from "../lib/ui";

/* ══ 히어로 앰비언스 ════════════════════════════════════════════
   격자가 커서를 따라 아주 살짝 흐르고, 따뜻한 글로우가 뒤따른다.

   ⚠️ 스크롤을 잠그는 연출(2씬 스크롤락)은 쓰지 않는다. 이 페이지는
      55년 사실·확장메뉴·조건·폼까지 실어야 하고, 광고 유입은 대부분
      모바일이라 마우스 인터랙션에 기댈 수 없다. 스크롤 하이재킹은
      리드를 깎는다. '느낌'만 가져오고 조작권은 사용자에게 둔다.

   · 포인터가 없는 기기에서는 리스너를 아예 붙이지 않는다
   · prefers-reduced-motion 이면 전부 끈다
   · rAF 로 커서를 감속시켜 따라간다 (smooth += (target - smooth) * 0.08)
   ──────────────────────────────────────────────────────────── */
function HeroAmbience() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    const host = glowRef.current?.parentElement;
    if (!host) return;

    // target = 실제 커서, smooth = 화면에 그리는 값
    const t = { x: 0.5, y: 0.4 };
    const s = { x: 0.5, y: 0.4 };
    let raf = 0;
    let on = false;

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      t.x = (e.clientX - r.left) / r.width;
      t.y = (e.clientY - r.top) / r.height;
      if (!on) {
        on = true;
        glowRef.current?.classList.add("is-on");
      }
    };
    const onLeave = () => {
      on = false;
      glowRef.current?.classList.remove("is-on");
    };

    const tick = () => {
      s.x += (t.x - s.x) * 0.08;
      s.y += (t.y - s.y) * 0.08;
      const g = glowRef.current;
      if (g) {
        g.style.setProperty("--gx", `${(s.x * 100).toFixed(2)}%`);
        g.style.setProperty("--gy", `${(s.y * 100).toFixed(2)}%`);
      }
      // 격자는 커서 반대로 ±16px 만 흐른다
      setGrid({ x: (s.x - 0.5) * -16, y: (s.y - 0.5) * -16 });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <svg className="hero-grid" aria-hidden>
        <defs>
          <pattern
            id="heroGrid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            x={grid.x}
            y={grid.y}
          >
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroGrid)" />
      </svg>
      <div ref={glowRef} className="hero-glow" aria-hidden />
    </>
  );
}

/* ══ NAV ═══════════════════════════════════════════════════════
   항상 불투명. 미디어를 덮지 않는다. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-line bg-paper/95 backdrop-blur-xl" : "border-transparent bg-paper"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 md:h-[70px] md:px-8">
        {/* 로고 — 좌측에 확실히 보이게 (투명 배경 원본) */}
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src={`${A}/logo.webp`}
            alt="제주산방식당"
            width={48}
            height={48}
            className="h-10 w-auto md:h-11"
          />
          <span className="text-[15px] font-extrabold tracking-[-0.02em] text-ink md:text-[16px]">
            제주산방식당
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-[14px] font-medium tracking-[-0.01em] text-body lg:flex">
          {[
            ["#brand", "브랜드"],
            ["#solution", "메뉴솔루션"],
            ["#items", "공급 품목"],
            ["#extend", "확장 메뉴"],
            /* 뺀 메뉴 (2026-07-29 · 해당 섹션이 사라져 주소가 없다)
                 · '겨울 사이드'(#side) — 돈까스를 공급 품목 05번으로 편입
                 · '브랜드 파트너'(#partner) — 프리미엄 트랙 섹션 삭제 */
          ].map(([h, t]) => (
            <a key={h} href={h} className="transition-colors duration-150 hover:text-brand">
              {t}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* 번호는 보여 주되 누르면 걸리지 않는다 — 사용자 지시 2026-07-29.
              연락은 문의 폼 한 곳으로만 받는다. 그래서 <a> 가 아니라 <span> 이고
              호버 반응도 없다(눌러도 반응 없는 링크는 고장으로 읽힌다). */}
          <span className="hidden text-[14px] font-bold tracking-[-0.01em] text-ink md:block">
            {TEL_INQUIRY}
          </span>
          <a
            href="#contact"
            onClick={() => track("nav")}
            className="rounded-full bg-brand px-4 py-2 text-[13.5px] font-bold tracking-[-0.01em] text-white transition-colors duration-150 hover:bg-brand-2 md:px-5 md:py-2.5"
          >
            도입 문의
          </a>
        </div>
      </div>
    </header>
  );
}

/* ══ ① 히어로 ═══════════════════════════════════════════════════
   가운데 정렬 텍스트 → 그 아래 영상. (Wise 형식)

   왜 겹치지 않나:
     · 광고·SNS로 들어온 사람은 산방식당을 모른다. 메시지가 먼저 꽂혀야 한다.
     · 영상 위에 글을 얹으면 스크림으로 가려야 하고, 그만큼 영상도 글도 죽는다.
     · 아래로 걸친 영상이 스크롤을 유도한다.
   ──────────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section id="top" className="bg-dawn relative overflow-hidden px-5 pt-16 md:px-8 md:pt-[70px]">
      <HeroAmbience />
      <div className="relative mx-auto w-full max-w-[1100px] pb-16 pt-14 text-center md:pb-24 md:pt-20">
        {/* 광고로 들어온 사람에게 "이게 뭔지"를 한국어로 즉시 말한다.
            제주한라산체로 크게 — 첫 줄에서 '제주'를 글자 질감으로 먼저 전한다.
            "SINCE 1971"은 뺐다. 바로 아래 배지 줄에 이미 있고, 한 줄이 길어지면
            모바일에서 어정쩡하게 두 줄로 접힌다. (h1도 '반세기'로 받는다)
            ⚠️ 이 문구를 바꾸면 `bash _font.sh` 를 다시 돌릴 것 */}
        <Rv>
          <div className="t-jeju text-brand text-[clamp(22px,5.2vw,36px)]">
            식당 사장님을 위한 메뉴솔루션
          </div>
        </Rv>

        <Rv d={80}>
          <h1 className="t-hero mx-auto mt-5 max-w-[13em] text-[2.4rem] sm:text-[3.2rem] lg:text-[4.1rem]">
            제주의 반세기,
            <br />
            이제 <span className="text-brand">당신의 매장</span>으로.
          </h1>
        </Rv>

        <Rv d={160}>
          <p className="t-body mx-auto mt-7 max-w-[34em] text-[15.5px] md:text-[17px]">
            {/* ⚠️ 줄바꿈 태그가 모바일에서 숨겨지면 그 자리의 공백까지 사라진다.
                {" "}를 반드시 남겨야 "산방식당.55년간"처럼 붙지 않는다.
                ⚠️ "가맹 아님"으로 단정하지 말 것 → 09 문서. 사실 서술로 쓴다. */}
            1971년 제주 최남단 모슬포에서 시작된 산방식당.{" "}
            <br className="hidden sm:block" />
            55년간 줄 서서 먹던 <strong className="font-bold text-ink">육수 · 비빔장 · 생면</strong>을{" "}
            <strong className="font-bold text-ink">사장님 간판 그대로, 로열티 없이</strong> 도입합니다.
          </p>
        </Rv>

        <Rv d={240}>
          {/* 히어로의 전화번호는 뺐다(사용자 지시 2026-07-29). 전화가 안 걸리게
              된 마당에 첫 화면에 번호를 크게 두면 누르게 되고, 그때 아무 일도
              일어나지 않는다. 첫 화면의 행동은 '도입 상담 신청' 하나로 모은다. */}
          <div className="mt-10 flex justify-center">
            <Cta href="#contact" where="hero-primary">
              도입 상담 신청
            </Cta>
          </div>
        </Rv>

        {/* 신뢰 배지 — 크기만 키우고 서체는 기본(Pretendard)으로 둔다.
            제주 서체는 눈썹 한 줄에만 써서 그 줄에 시선이 가게 한다.
            위아래 둘 다 거친 서체면 악센트가 악센트로 안 읽힌다.

            네 개에서 두 개로 줄였다. 나머지 둘은 페이지 안에 이미 제자리가 있다
            (직영 3개점 → Brand의 매장 섹션 / HACCP → Items·Partnership).
            배지가 길어지면 모바일에서 두 줄로 접히며 구분선이 줄 맨 앞에 남는다. */}
        <Rv d={320}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[clamp(16px,3.4vw,22px)] font-medium text-body">
            {["Since 1971", "2대 가족경영"].map((b, i) => (
              <span key={b} className="flex items-center gap-6">
                {i > 0 && <span className="h-4 w-px bg-line" />}
                {b}
              </span>
            ))}
          </div>
        </Rv>

        {/* 영상 — 글 아래. 아래가 살짝 잘려 보이며 스크롤을 부른다 */}
        <Rv d={400}>
          <div className="grain relative mt-14 overflow-hidden rounded-[24px] shadow-[0_24px_64px_rgba(23,18,15,0.14)] md:mt-16 md:rounded-[32px]">
            <video
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/9] lg:aspect-[21/9]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={`${A}/hero-poster.webp`}
              aria-label="산방식당 — 밀냉면에 멸치 육수를 붓는 장면, 모슬포 본점 전경, 손님으로 찬 매장"
            >
              <source src={`${A}/hero-loop.mp4`} type="video/mp4" />
            </video>
          </div>
        </Rv>
      </div>
    </section>
  );
}

/* ══ ② 한 줄 ════════════════════════════════════════════════════
   히어로 직후 한 박자. 목차 카드 3개는 뺐다 —
   광고로 들어온 사람에게 목차는 읽을거리가 아니라 이탈 지점이다. */
export function Intro() {
  return (
    <section className="border-y border-line bg-warm px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto w-full max-w-[1200px]">
        <Rv>
          <p className="t-h2 mx-auto max-w-4xl text-center text-[1.5rem] leading-[1.5] md:text-[2.15rem]">
            우리 매장 <span className="text-brand">간판 그대로</span>,<br className="sm:hidden" />{" "}
            산방식당의 <span className="text-brand">검증된 맛</span>만 도입합니다.
          </p>
        </Rv>
      </div>
    </section>
  );
}
