import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────────
   공용 UI 조각 — 섹션 파일들이 공유한다.
   페이지 구조/카피는 sections/ 안에만 있고, 여기엔 장치만 둔다.
   ──────────────────────────────────────────────────────────────── */

export const A = "/assets/web";

/* ── 연락 창구 ────────────────────────────────────────────────
   문의 수신처와 화면 표기용을 분리한다.
   방문자는 문의가 어디로 접수되는지 알 필요가 없다.        */
export const MAIL_INQUIRY = "dkfjh1234@gmail.com"; // 폼 수신 — 화면에 띄우지 않는다
export const MAIL_OFFICIAL = "contact@jejusanbang.com"; // 표기용 공식 창구(푸터)
export const TEL_INQUIRY = "070-8121-5880"; // 도입 문의 — 폼 대신 바로 거는 사람용
/* 매장 번호 — 2026-07-29 이후 화면에서는 쓰지 않는다(사용자 지시).
   도입 문의가 매장으로 걸려 오는 걸 막는 게 070 창구를 판 이유다.
   지우지 않고 남겨 두는 이유: index.html 의 구조화 데이터(JSON-LD)가
   본점 번호를 싣고 있어서, 값을 한곳에서 확인할 수 있어야 한다. */
export const TEL_MAIN = "064-794-2165"; // 모슬포 본점
export const TEL_JEJU = "064-722-2165"; // 제주점
export const INSTA = "https://www.instagram.com/sanbang_official/";

/** 전화번호를 tel: 링크로 (010-1234-5678 → +821012345678) */
export const tel = (n: string) => `tel:+82${n.replace(/^0/, "").replace(/-/g, "")}`;

/* ── 측정·전송 설정 ────────────────────────────────────────────
   셋 다 비어 있으면 해당 기능만 조용히 꺼진다. 페이지는 정상 동작한다.
   발급 절차 → 랜딩페이지_기획안/12_기술준비-가이드.md

   GA4_ID          … GA4 속성 만들고 받은 `G-XXXXXXXXXX`
                     ※ 배포 후 `generate_lead`를 '주요 이벤트'로 표시해야 전환으로 잡힌다
   META_PIXEL_ID   … 메타 이벤트 관리자에서 만든 픽셀 ID (숫자)
                     ※ 픽셀만 만들지 말고 **도메인 인증**까지 해야 광고 최적화가 걸린다
   WEB3FORMS_KEY   … https://web3forms.com 에서 MAIL_INQUIRY 로 발급받는 무료 키.
                     ⚠️ 비어 있으면 메일 앱 폴백이 뜨면서 수신 주소가 화면에 노출된다.
   ──────────────────────────────────────────────────────────── */
/* GA4 — 속성 '산방식당 랜딩'. 2026-07-29 발급.
   ⚠️ 슈퍼보바(G-Z0RXJY3LPV)와 다른 속성이다. 섞지 말 것.
   ⚠️ 배포 후 GA4 관리 > 데이터 표시 > 이벤트에서 `generate_lead` 를
      '주요 이벤트'로 표시해야 보고서에 전환으로 잡힌다. 폼을 한 번
      제출해야 목록에 뜬다. */
export const GA4_ID = "G-1C5SGFFWEP";
/* 메타 픽셀(데이터 세트) — '산방식당 랜딩'. 2026-07-29 발급.
   비즈니스 포트폴리오 '제주산방식당' 소속.
   ⚠️ 픽셀만 만들면 반쪽이다. sanbangjeju.com 도메인 인증(Cloudflare TXT)까지
      해야 iOS 사용자에게도 광고 최적화가 걸린다.
      → 히스토리/20260729_배포후_필수작업.md 3번 */
export const META_PIXEL_ID = "2201863730547524";
/* Web3Forms — 계정(dkfjh1234@gmail.com) 안의 `SANBANG_B2B` 폼 키.
   2026-07-29 발급. 슈퍼보바(SUPERBOBA_B2B)와 같은 계정이지만 폼이 달라
   문의 건수가 따로 집계된다.
   ⚠️ 무료 플랜의 월 250건 한도는 폼별이 아니라 계정 전체 합산이다. */
export const WEB3FORMS_KEY = "033b8d1a-7387-4c24-9790-f395fac54424";

/** 리드 클릭 이벤트. 측정 도구가 없으면 조용히 무시된다. */
export function track(where: string) {
  const w = window as unknown as Record<string, unknown>;
  const g = w.gtag;
  if (typeof g === "function") (g as (...a: unknown[]) => void)("event", "lead_click", { where });
}

/** 실제 리드 발생(폼 제출). GA4 · 메타 픽셀에 동시에 쏜다. */
export function fireLead() {
  const w = window as unknown as Record<string, unknown>;
  const g = w.gtag;
  if (typeof g === "function")
    (g as (...a: unknown[]) => void)("event", "generate_lead", { transport_type: "beacon" });
  const f = w.fbq;
  if (typeof f === "function") (f as (...a: unknown[]) => void)("track", "Lead");
}

/* ── 스크롤 리빌 (IntersectionObserver + 스크롤 폴백) ───────── */
export function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const show = (el: Element) => el.classList.add("is-in");
    const all = () => Array.from(document.querySelectorAll("[data-rv]:not(.is-in)"));

    // 폴백: 화면에 들어온 건 무조건 노출. IO가 놓쳐도 여기서 잡힌다.
    let ticking = false;
    const sweep = () => {
      ticking = false;
      const h = window.innerHeight;
      all().forEach((el) => {
        if (el.getBoundingClientRect().top < h - 60) show(el);
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sweep);
    };

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.02 }
    );
    all().forEach((el) => io.observe(el));

    sweep();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}

/* ── 스크롤 진행도 ───────────────────────────────────────────
   요소가 화면을 지나가는 동안 0 → 1 을 콜백으로 흘려 준다.
   (위가 화면 80% 지점에 닿을 때 0, 아래가 20% 지점을 지날 때 1)

   ⚠️ 값을 useState 로 올리지 않는 이유:
      패럴랙스·글자 차오름은 스크롤 프레임마다 값이 바뀐다. state 로 받으면
      그때마다 리렌더가 돌아 글자 span 수백 개가 다시 그려진다. 콜백 안에서
      style 을 직접 건드리면 DOM 쓰기 한 번으로 끝난다.
   ⚠️ prefers-reduced-motion 이면 1(=최종 상태)을 한 번만 보내고 끝낸다.
      움직임은 없애되 글이 안 보이는 사고는 만들지 않는다.        */
export function useScrollProgress(
  ref: React.RefObject<HTMLElement | null>,
  onProgress: (p: number) => void
) {
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cb.current(1);
      return;
    }
    let raf = 0;
    const measure = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = vh * 0.8; // 요소 위가 여기 닿으면 시작
      const to = vh * 0.2 - r.height; // 요소 아래가 여기 닿으면 끝
      const p = (from - r.top) / (from - to || 1);
      cb.current(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
}

/* ── 화면에 들어올 때만 받는 영상 ─────────────────────────────
   `<video autoplay>` 는 화면 아래에 있어도 브라우저가 파일을 통째로 받아 둔다.
   이 페이지는 영상이 5개인데 그중 4개가 한참 아래에 있어서, 첫 화면 전송량이
   1.1MB 넘게 헛되이 불어나 있었다(2026-07-29 실측 3,101KB → 기준 2,200KB 초과).
   광고 유입은 대부분 모바일이라 이건 그대로 이탈로 이어진다.

   → src 를 처음부터 달지 않는다. 화면 300px 앞까지 왔을 때 비로소 붙이고 재생한다.
     그전까지는 poster 이미지(수십 KB)만 보인다.
   ⚠️ prefers-reduced-motion 이면 아예 붙이지 않는다 — 포스터만 보이고 끝.
      움직임도 줄이고 데이터도 아낀다.
   ──────────────────────────────────────────────────────────── */
export function LazyVideo({
  src,
  poster,
  label,
  className,
}: {
  /** 확장자 제외 파일명 (assets/web 기준) */
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const s = document.createElement("source");
        s.src = `${A}/${src}.mp4`;
        s.type = "video/mp4";
        el.appendChild(s);
        el.load();
        // 자동재생이 막히는 환경(저전력 모드 등)에서도 포스터는 남는다
        el.play().catch(() => {});
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      poster={`${A}/${poster}.webp`}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}

/** 스크롤 진입 시 서서히 올라오는 래퍼 */
export function Rv({
  children,
  d = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  d?: number;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag data-rv className={className} style={d ? { transitionDelay: `${d}ms` } : undefined}>
      {children}
    </Tag>
  );
}

/** 숫자 카운트업. 관찰에 실패해도 2.5초 뒤 최종값은 반드시 표시한다. */
export function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => {
      if (done.current) return;
      done.current = true;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1000);
        if (p >= 1) setN(to);
        else {
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((e) => e[0]?.isIntersecting && run(), { threshold: 0.3 });
    io.observe(el);
    const t = setTimeout(run, 2500);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* 섹션 눈썹 라벨(`— CHAPTER 01 · 브랜드` 형태)은 걷어냈다.
   사용자 지시(2026-07-29): 작은 대문자 라벨이 페이지마다 붙어 있으면
   'AI가 만든 티'가 난다. 실제로 전부 바로 아래 h2 가 같은 말을 하고 있어
   정보 손실도 없었다. 섹션의 첫인상은 제목 크기로 만든다.
   ※ 카드 안에서 그 카드가 뭔지 알려주는 작은 라벨(`산방식당이 90%`,
     `초기 세팅 교육비` 등)은 성격이 달라 남겨 뒀다 — 지우면 뜻이 무너진다. */

/* 섹션 대제목 공통 질감 — 아래로 갈수록 브랜드 색이 배어 나온다.
   크기(fontSize)는 섹션마다 다르게 주되 질감은 통일해 섹션들이 한 줄기로 읽히게 한다.

   현재 스케일 약속:
     · 브랜드 소개(페이지의 문패)      최대 4.8rem
     · 무기 선언(단독 문장 섹션)        최대 3.6rem
     · 일반 섹션(비교 · 매장)           최대 3.1rem
     · 섹션 안 하위 제목(메뉴판)        최대 2.3rem
   ⚠️ 제목 안에 색을 따로 준 <span>을 두지 말 것. 그라디언트가 글자 전체에
      걸리므로 그 span 만 색이 튀어 보인다. 강조는 크기와 줄바꿈으로 한다. */
export const TITLE_GRADIENT: React.CSSProperties = {
  backgroundImage: "linear-gradient(to bottom, var(--color-ink) 42%, var(--color-brand) 128%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

/** 섹션 컨테이너 — 좌우 여백과 최대폭을 한 곳에서 관리 */
export function Section({
  id,
  bg = "paper",
  children,
  className = "",
}: {
  id?: string;
  bg?: "paper" | "warm" | "sea" | "ink";
  children: React.ReactNode;
  className?: string;
}) {
  const bgc = {
    paper: "bg-paper",
    warm: "bg-warm",
    sea: "bg-sea-soft",
    ink: "bg-ink",
  }[bg];
  /* 모바일 상하 여백을 96px → 80px 로 줄였다. 섹션이 열 개가 넘어서 한 곳에서
     16px 만 줄여도 화면 몇 개 분량이 사라진다. 데스크톱은 그대로 둔다. */
  return (
    <section id={id} className={`${bgc} px-5 py-20 md:px-8 md:py-[120px] ${className}`}>
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  );
}

/** 주 CTA 버튼 */
export function Cta({
  href,
  where,
  children,
  variant = "solid",
  className = "",
  external = false,
}: {
  href: string;
  where: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "dark";
  className?: string;
  external?: boolean;
}) {
  const style = {
    solid: "bg-brand text-white hover:bg-brand-2",
    dark: "bg-ink text-paper hover:bg-brand",
    ghost: "border border-ink/20 bg-paper/70 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  }[variant];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => track(where)}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-bold tracking-[-0.01em] transition-colors duration-150 ${style} ${className}`}
    >
      {children}
      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
    </a>
  );
}

/* ══ 글로우 카드 ════════════════════════════════════════════════
   테두리만 그라디언트로 칠하는 방법:
     background: <카드색> padding-box, <그라디언트> border-box
     + border: Npx solid transparent
   테두리 자리에만 그라디언트가 남는다. 뒤에는 같은 그라디언트를
   크게 blur 해서 깔아 은은한 발광을 만든다.

   레퍼런스는 다크 배경 + 8px 네온이지만, 밝은 면에 그대로 쓰면
   촌스러워진다 → 테두리 3px, 글로우 opacity 를 낮춰 쓴다.
   dark 면에서는 글로우를 조금 더 올린다.
   ──────────────────────────────────────────────────────────── */
export function GlowCard({
  g,
  icon,
  title,
  body,
  dark = false,
  minH = 248,
}: {
  /** 테두리·글로우에 쓸 CSS 그라디언트 */
  g: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
  dark?: boolean;
  minH?: number;
}) {
  const face = dark ? "#221a14" : "var(--color-paper)";
  return (
    <div className="relative mx-auto h-full w-full max-w-[360px] md:max-w-none">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 top-6 h-[76%] rounded-[40px]"
        style={{ background: g, filter: "blur(46px)", opacity: dark ? 0.42 : 0.34 }}
      />
      {/* ⚠️ 최소 높이는 md 부터만 건다. 모바일은 카드가 1열로 쌓이는데 높이를
             강제하면 글이 짧은 카드에 빈 공간이 남고, 그게 몇 장 쌓이면
             스크롤이 하염없이 길어진다(사용자 지적 2026-07-29).
             데스크톱은 여러 장이 나란히 서므로 높이를 맞춰야 판이 고르다. */}
      <div
        className="relative z-10 flex h-full flex-col justify-between gap-7 rounded-[32px] p-6 md:min-h-[var(--glow-h)] md:gap-0 md:p-8"
        style={{
          ["--glow-h" as string]: `${minH}px`,
          border: "3px solid transparent",
          background: `linear-gradient(${face}, ${face}) padding-box, ${g} border-box`,
        }}
      >
        {icon ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-8 w-8 ${dark ? "text-gold" : "text-brand"}`}
            aria-hidden
          >
            {icon}
          </svg>
        ) : (
          <span />
        )}

        <div>
          <h3
            className={`font-extrabold tracking-[-0.035em] ${dark ? "text-paper" : "text-ink"}`}
            style={{ fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.32 }}
          >
            {title}
          </h3>
          <p
            className={`mt-3.5 text-[14.5px] leading-[1.75] md:text-[15.5px] ${
              dark ? "text-paper/65" : "text-body"
            }`}
          >
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
