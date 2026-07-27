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
export const TEL_MAIN = "064-794-2165"; // 모슬포 본점 — 매장 안내용
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
export const GA4_ID = "";
export const META_PIXEL_ID = "";
export const WEB3FORMS_KEY = "";

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

/** 섹션 위 작은 라벨 (— CHAPTER 01 형태) */
export function Label({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "sea" }) {
  const c = tone === "sea" ? "text-sea" : "text-brand";
  const b = tone === "sea" ? "bg-sea/45" : "bg-brand/45";
  return (
    <div className={`t-label mb-5 flex items-center gap-2.5 ${c}`}>
      <span className={`h-px w-6 ${b}`} />
      {children}
    </div>
  );
}

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
  return (
    <section id={id} className={`${bgc} px-5 py-24 md:px-8 md:py-[120px] ${className}`}>
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
      <div
        className="relative z-10 flex h-full flex-col justify-between rounded-[32px] p-7 md:p-8"
        style={{
          minHeight: minH,
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
