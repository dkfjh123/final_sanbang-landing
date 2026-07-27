import { useEffect, useState } from "react";
import { A, Cta, Rv, track } from "../lib/ui";

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
        <a href="#top" className="flex items-center gap-2.5">
          <img src={`${A}/logo.webp`} alt="" width={36} height={36} className="h-8 w-auto" />
          <span className="text-[15px] font-extrabold tracking-[-0.02em] text-ink">제주산방식당</span>
        </a>

        <nav className="hidden items-center gap-7 text-[14px] font-medium tracking-[-0.01em] text-body lg:flex">
          {[
            ["#brand", "브랜드"],
            ["#stores", "직영 매장"],
            ["#solution", "메뉴솔루션"],
            ["#items", "공급 품목"],
            ["#extend", "확장 메뉴"],
            ["#partner", "브랜드 파트너"],
          ].map(([h, t]) => (
            <a key={h} href={h} className="transition-colors duration-150 hover:text-brand">
              {t}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={() => track("nav")}
          className="rounded-full bg-brand px-4 py-2 text-[13.5px] font-bold tracking-[-0.01em] text-white transition-colors duration-150 hover:bg-brand-2 md:px-5 md:py-2.5"
        >
          도입 문의
        </a>
      </div>
    </header>
  );
}

/* ══ ① 히어로 — 소개서 표지 ═════════════════════════════════════
   "제주의 반세기, 이제 당신의 매장으로."
   모바일: 영상 띠 → 그 아래 글 (가독성 우선)
   데스크톱: 영상 풀블리드 + 왼쪽 크림 스크림 위에 글 */
export function Hero() {
  return (
    <section
      id="top"
      className="pt-16 md:pt-[70px]"
      style={{
        background: "radial-gradient(120% 90% at 50% 100%, #fbe9cd 0%, #fdf3e2 45%, #fffdf8 100%)",
      }}
    >
      <div className="relative lg:min-h-[calc(100svh-70px)]">
        <div className="lg:absolute lg:inset-0">
          <div className="grain relative h-full">
            <video
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/9] lg:aspect-auto lg:h-full"
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
            <div
              aria-hidden
              className="absolute inset-0 hidden lg:block"
              style={{
                background: [
                  "radial-gradient(108% 104% at 0% 84%, rgba(255,253,248,.97) 0%, rgba(255,253,248,.95) 28%, rgba(253,243,226,.8) 44%, rgba(255,253,248,.4) 60%, rgba(255,253,248,.1) 74%, rgba(255,253,248,0) 88%)",
                  "linear-gradient(180deg,rgba(255,253,248,.7) 0%,rgba(255,253,248,0) 10%,rgba(255,253,248,0) 66%,rgba(255,253,248,.45) 100%)",
                ].join(","),
              }}
            />
          </div>
        </div>

        <div className="hero-text relative z-10 flex flex-col justify-end px-5 py-14 md:px-8 md:py-20 lg:min-h-[calc(100svh-70px)] lg:max-w-[60%] lg:pb-[clamp(3.5rem,9vh,6rem)] lg:pl-[max(2rem,calc((100vw-1200px)/2+2rem))] lg:pr-12 lg:pt-28">
          <Rv>
            <div className="t-label mb-6 text-brand">MENU SOLUTION PARTNERSHIP · SINCE 1971</div>
          </Rv>

          <Rv d={80}>
            <h1 className="t-hero max-w-[14em] text-[2.3rem] sm:text-[2.9rem] lg:text-[3.4rem]">
              제주의 반세기,
              <br />
              이제 <span className="text-brand">당신의 매장</span>으로.
            </h1>
          </Rv>

          <Rv d={160}>
            <p className="t-body mt-7 max-w-xl text-[15.5px] md:text-[16.5px]">
              {/* ⚠️ 줄바꿈 태그가 모바일에서 숨겨지면 그 자리의 공백까지 사라진다.
                  {" "}를 반드시 남겨야 "산방식당.55년간"처럼 붙지 않는다. */}
              1971년 제주 최남단 모슬포에서 시작된 산방식당.{" "}
              <br className="hidden sm:block" />
              55년간 검증된 <strong className="font-bold text-ink">‘육수와 비빔장’</strong>, 그리고 가장
              맛있는 산방만두를{" "}
              <br className="hidden sm:block" />
              <strong className="font-bold text-ink">가맹이 아닌 메뉴솔루션</strong>으로 나눕니다.
            </p>
          </Rv>

          <Rv d={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Cta href="#contact" where="hero-primary">
                도입 상담 신청
              </Cta>
              <a
                href="#solution"
                onClick={() => track("hero-secondary")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 bg-paper/70 px-8 py-4 text-[15px] font-semibold text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-paper"
              >
                메뉴솔루션이 뭔가요?
              </a>
            </div>
          </Rv>

          <Rv d={320}>
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] font-medium text-muted">
              {["Since 1971", "2대 가족경영", "직영 3개점", "HACCP 인증 시설 제조"].map((b, i) => (
                <span key={b} className="flex items-center gap-5">
                  {i > 0 && <span className="h-3 w-px bg-line" />}
                  {b}
                </span>
              ))}
            </div>
          </Rv>
        </div>
      </div>
    </section>
  );
}

/* ══ ② 한 줄 — 소개서 목차 페이지의 결론 문장 ════════════════════ */
export function Intro() {
  return (
    <section className="border-y border-line bg-warm px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[1200px]">
        <Rv>
          <p className="t-h2 mx-auto max-w-4xl text-center text-[1.5rem] leading-[1.5] md:text-[2.15rem]">
            우리 매장 <span className="text-brand">간판 그대로</span>,<br className="sm:hidden" />
            {" "}산방식당의 <span className="text-brand">검증된 맛</span>만 도입합니다.
          </p>
        </Rv>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            {
              n: "01",
              t: "브랜드",
              d: "1971년 모슬포에서 시작된 55년의 맛",
            },
            {
              n: "02",
              t: "파트너십 철학",
              d: "‘가치와 기억’을 드리는 단 하나의 원칙",
            },
            {
              n: "03",
              t: "메뉴솔루션",
              d: "가맹이 아닌 ‘무기’ — 검증된 맛의 도입",
            },
          ].map((c, i) => (
            <Rv key={c.n} d={i * 90}>
              <div className="h-full rounded-[24px] border border-line bg-paper px-7 py-8">
                <div className="t-label mb-4 text-brand/60">{c.n}</div>
                <h3 className="t-h3 mb-2 text-[17px]">{c.t}</h3>
                <p className="t-body text-[14px]">{c.d}</p>
              </div>
            </Rv>
          ))}
        </div>
      </div>
    </section>
  );
}
