import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────────
   제주산방식당 B2B 랜딩

   타깃 (2026-07-26 레드팀 검증 후 확정)
     주력 — 기존 식당 운영자 (메뉴솔루션)
     부력 — 급식·단체 B2B (문의 유도가 아니라 '실사 통과'용 스펙 블록)
     제외 — 개인창업 예정자 (SPOT 랜딩 + 메타광고로 분리)

   구조 — Sabri Suby 17단계: 멈추게 → 공감 → 믿게 → 사게
   디자인 — gowid 디자인랭귀지(타입 스케일·라운드·트랜지션) + 산방 색

   ⚠️ 레이아웃 원칙: 텍스트를 영상·이미지 위에 겹치지 않는다.
      미디어는 미디어 자리에, 글은 글 자리에. 캡션도 이미지 아래로.

   ⚠️ 문구 금지선 (sanbang-brand-facts §7 / b2b-email-playbook §0)
     · "가맹 아님 / 가맹비 없음" 단정 금지 — 공정위상 등록 프랜차이즈
       → "간판 그대로, 인테리어·로열티 부담 없이" 로만 표현
     · "백년가게" 금지 → "100년 가는 식당을 향해"
     · "코릿 TOP10" 금지 → "2016 코릿(KOREAT) 제주 선정"
     · "돼지 사골/뼈 육수" 금지 → 멸치 베이스
     · 가수율 45% / 다선 30년 / 육수 10년 개발 = 미검증, 수치 단정 금지
     · 매출 보장·효과 단정 금지
   ──────────────────────────────────────────────────────────────── */

const A = "/assets/web";
const MAIL = "contact@jejusanbang.com";
const TALLY = "https://tally.so/r/WOOLLv";

/* GA4 — 측정 ID를 넣으면 자동 활성화. 빈 값이면 아무것도 로드하지 않는다. */
const GA4_ID = "";

/* ── 스크롤 리빌 (IntersectionObserver + 스크롤 폴백) ───────── */
function useReveal() {
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

function Rv({
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

/* ── 숫자 카운트업 ───────────────────────────────────────── */
function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => {
      if (done.current) return;
      done.current = true;
      const dur = 1000;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        if (p >= 1) setN(to);
        else {
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (e) => e[0]?.isIntersecting && run(),
      { threshold: 0.3 }
    );
    io.observe(el);
    const t = setTimeout(run, 2500); // 관찰 실패해도 최종값은 반드시 표시
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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="t-label mb-5 flex items-center gap-2.5 text-brand">
      <span className="h-px w-6 bg-brand/45" />
      {children}
    </div>
  );
}

const EXT_MENUS = [
  "만두온면", "만둣국", "고기국수", "수육국밥",
  "고기덮밥", "제육덮밥", "낙지덮밥", "김치찌개",
];

/* ══════════════════════════════════════════════════════════ */

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!GA4_ID) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(s);
    const w = window as unknown as Record<string, unknown>;
    w.dataLayer = (w.dataLayer as unknown[]) || [];
    w.gtag = function gtag() {
      (w.dataLayer as unknown[]).push(arguments);
    };
    (w.gtag as (...a: unknown[]) => void)("js", new Date());
    (w.gtag as (...a: unknown[]) => void)("config", GA4_ID);
  }, []);

  const lead = (where: string) => {
    const g = (window as unknown as Record<string, unknown>).gtag;
    if (typeof g === "function") (g as (...a: unknown[]) => void)("event", "lead_click", { where });
  };

  return (
    <div className="antialiased">
      {/* ══ NAV — 항상 불투명. 미디어를 덮지 않는다 ══════════ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
          scrolled ? "border-line bg-paper/95 backdrop-blur-xl" : "border-ink/60 bg-ink"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 md:h-[70px] md:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <img
              src={`${A}/logo.webp`}
              alt=""
              width={36}
              height={36}
              className={`h-8 w-auto transition-[filter] duration-300 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
            />
            <span
              className={`text-[15px] font-extrabold tracking-[-0.02em] transition-colors duration-300 ${
                scrolled ? "text-ink" : "text-paper"
              }`}
            >
              제주산방식당
            </span>
          </a>

          <nav
            className={`hidden items-center gap-8 text-[14px] font-medium tracking-[-0.01em] transition-colors duration-300 lg:flex ${
              scrolled ? "text-body" : "text-paper/70"
            }`}
          >
            {[
              ["#why", "왜 산방인가"],
              ["#supply", "공급 품목"],
              ["#menu", "확장 메뉴"],
              ["#track", "도입 방식"],
              ["#foodservice", "급식·단체"],
            ].map(([h, t]) => (
              <a key={h} href={h} className="transition-colors duration-150 hover:text-brand">
                {t}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={() => lead("nav")}
            className={`rounded-full px-4 py-2 text-[13.5px] font-bold tracking-[-0.01em] transition-colors duration-150 md:px-5 md:py-2.5 ${
              scrolled
                ? "bg-ink text-paper hover:bg-brand"
                : "bg-paper text-ink hover:bg-gold hover:text-ink"
            }`}
          >
            샘플 문의
          </a>
        </div>
      </header>

      {/* ══ HERO — 좌: 글 / 우: 영상. 겹치지 않는다 ═══════════ */}
      <section id="top" className="bg-ink pt-16 md:pt-[70px]">
        <div className="grid lg:min-h-[calc(100svh-70px)] lg:grid-cols-[minmax(0,47%)_1fr]">
          {/* 영상 — 모바일에선 위로 */}
          <div className="relative order-1 lg:order-2 lg:h-full">
            <div className="grain relative h-full">
              <video
                className="aspect-[4/3] h-full w-full object-cover sm:aspect-[16/9] lg:aspect-auto lg:min-h-[560px]"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={`${A}/hero-poster.webp`}
                aria-label="제주 바다와 산방식당 육수·밀냉면 조리 장면"
              >
                <source src={`${A}/hero-loop.mp4`} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* 글 */}
          <div className="order-2 flex flex-col justify-center px-5 py-14 md:px-8 md:py-20 lg:order-1 lg:py-24 lg:pl-[max(2rem,calc((100vw-1200px)/2+2rem))] lg:pr-14">
            <Rv>
              <p className="mb-6 text-[13.5px] font-semibold leading-relaxed tracking-[-0.01em] text-gold md:text-[14.5px]">
                시판 소스로는 차별화가 안 되고,<br />
                그렇다고 프랜차이즈로 묶이긴 싫은 사장님께
              </p>
            </Rv>

            <Rv d={90}>
              <h1 className="t-hero text-[2.4rem] text-paper sm:text-[3.1rem] lg:text-[3.4rem]">
                간판은 그대로 두고,<br />
                <span className="text-gold">검증된 맛</span>만<br className="hidden sm:block lg:hidden" />
                {" "}들여오세요
              </h1>
            </Rv>

            <Rv d={180}>
              <p className="mt-7 max-w-[30rem] text-[15px] leading-[1.85] tracking-[-0.01em] text-paper/62 md:text-[16px]">
                1971년 제주 모슬포에서 시작한 55년 제주식 밀냉면.
                멸치 육수와 비빔전용장, 생밀면을 사장님 매장에 그대로 얹습니다.
                인테리어 지정도, 원하지 않는 품목도 없습니다.
              </p>
            </Rv>

            <Rv d={260}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  onClick={() => lead("hero")}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-[15px] font-bold tracking-[-0.01em] text-white transition-colors duration-150 hover:bg-brand-2"
                >
                  샘플 먼저 받아보기
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#why"
                  className="inline-flex items-center justify-center rounded-full border border-paper/25 px-7 py-4 text-[15px] font-semibold tracking-[-0.01em] text-paper/85 transition-colors duration-150 hover:border-paper/60 hover:bg-paper/8"
                >
                  뭐가 다른지 보기
                </a>
              </div>
            </Rv>
          </div>
        </div>

        {/* 신뢰 스트립 */}
        <div className="border-t border-paper/12">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-y-6 px-5 py-8 md:grid-cols-4 md:px-8">
            {[
              ["Since 1971", "제주 모슬포 창업"],
              ["2대 가족경영", "김정일 → 김형섭"],
              ["직영 3개점", "본점 · 제주 · 서울"],
              ["급식 유통", "CJ프레시웨이 · 아워홈"],
            ].map(([k, v], i) => (
              <Rv key={k} d={i * 60}>
                <div className="text-[14.5px] font-bold tracking-[-0.02em] text-paper">{k}</div>
                <div className="mt-0.5 text-[12.5px] text-paper/45">{v}</div>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 공감 — 고통 ═══════════════════════════════════════ */}
      <section className="bg-warm px-5 py-24 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1200px]">
          <Rv>
            <Label>이런 상황이라면</Label>
            <h2 className="t-h2 max-w-3xl text-[1.9rem] md:text-[2.5rem]">
              메뉴를 하나 더 늘리는 게 아니라,<br />
              <span className="text-brand">베이스를 바꾸는</span> 이야기입니다
            </h2>
          </Rv>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "“어디서 먹어본 맛”이라는 말",
                d: "시판 소스는 누구나 살 수 있습니다. 옆 가게도 같은 걸 씁니다. 그래서 아무리 잘 만들어도 ‘여기서만’이 안 생깁니다.",
              },
              {
                n: "02",
                t: "사람이 바뀌면 맛이 흔들린다",
                d: "주방 인력이 바뀔 때마다 간이 달라집니다. 레시피를 적어둬도 손맛까지는 넘어가지 않습니다. 단골이 먼저 알아챕니다.",
              },
              {
                n: "03",
                t: "비는 시간대, 비는 계절",
                d: "점심은 도는데 저녁이 빕니다. 여름은 되는데 겨울이 빕니다. 한 그릇으로 그 구멍을 메우면 매장이 편해집니다.",
              },
            ].map((c, i) => (
              <Rv key={c.n} d={i * 90}>
                <div className="h-full rounded-[24px] border border-line bg-paper p-8 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_12px_32px_rgba(23,18,15,0.08)]">
                  <div className="t-label mb-6 text-brand/60">{c.n}</div>
                  <h3 className="t-h3 mb-3 text-[19px]">{c.t}</h3>
                  <p className="t-body text-[14.5px]">{c.d}</p>
                </div>
              </Rv>
            ))}
          </div>

          <Rv d={120}>
            <div className="mt-14 rounded-[24px] bg-ink px-8 py-10 md:px-14 md:py-14">
              <p className="max-w-3xl text-[17px] leading-[1.75] tracking-[-0.02em] text-paper md:text-[21px]">
                산방식당이 드리는 건 간판이 아니라 <strong className="text-gold">무기</strong>입니다.
                육수·비빔장·생밀면이라는 <strong className="text-gold">베이스</strong>만 검증된 것으로
                바꾸면, 그 위에 올릴 메뉴는 사장님이 정하시면 됩니다.
              </p>
            </div>
          </Rv>
        </div>
      </section>

      {/* ══ 권위 ══════════════════════════════════════════════ */}
      <section id="why" className="bg-paper px-5 py-24 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <Rv>
              <Label>왜 산방인가</Label>
              <h2 className="t-h2 text-[1.9rem] md:text-[2.5rem]">
                제주 최남단 모슬포에서<br />
                <Count to={55} suffix="년" />째 같은 한 그릇
              </h2>
              <p className="t-body mt-7 max-w-lg text-[15.5px]">
                1971년 3월, 제주 서귀포 대정읍 모슬포에서 문을 열었습니다.
                창업주 김정일 명예회장이 시작한 가게를 아들 김형섭 대표가 이어받아
                2대째 운영하고 있습니다. 목표는 3대째 이어지는{" "}
                <strong className="font-bold text-ink">100년 가는 식당</strong>입니다.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
                {[
                  { k: "창업", v: "1971년" },
                  { k: "직영점", v: <><Count to={3} />개</> },
                  { k: "가업", v: <><Count to={2} />대째</> },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="text-[26px] font-extrabold tracking-[-0.03em] text-brand md:text-[30px]">
                      {s.v}
                    </div>
                    <div className="mt-1 text-[12.5px] font-medium text-muted">{s.k}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {["2016 코릿(KOREAT) 제주 선정", "KBS 배틀트립 방영", "HACCP 인증 시설 제조"].map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-line bg-warm px-3.5 py-1.5 text-[12.5px] font-medium text-body"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </Rv>

            <Rv d={120}>
              <figure className="m-0">
                <div className="grid grid-cols-2 gap-3">
                  <img
                    src={`${A}/store-drone.webp`}
                    alt="제주 모슬포 산방식당 본점 전경"
                    width={1400}
                    height={933}
                    loading="lazy"
                    decoding="async"
                    className="col-span-2 aspect-[16/10] w-full rounded-[24px] object-cover"
                  />
                  <img
                    src={`${A}/store-jeju.webp`}
                    alt="산방식당 제주점 외관"
                    width={1400}
                    height={933}
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
                  위 — 모슬포 본점. 아래 왼쪽 — 제주점. 아래 오른쪽 — 창업주 김정일 명예회장.
                </figcaption>
              </figure>
            </Rv>
          </div>

          {/* 줄 서는 맛집 — 캡션은 영상 아래 */}
          <div className="mt-24">
            <Rv>
              <div className="mb-10 h-px w-full bg-line" />
              <h3 className="t-h2 text-[1.5rem] md:text-[1.9rem]">손님이 이미 증명하고 있습니다</h3>
              <p className="t-body mt-3 max-w-xl text-[15px]">
                여름이면 대기 줄이 서는 매장입니다. 도민과 관광객이 같이 찾습니다.
              </p>
            </Rv>

            <div className="mt-9 grid gap-6 sm:grid-cols-2">
              {[
                { src: `${A}/queue-1.mp4`, label: "제주점", sub: "제주시 이도2동 · 2012년 직영 개점" },
                { src: `${A}/queue-2.mp4`, label: "서울 대한상공회의소점", sub: "2019년 개점 · 육지 1호 직영점" },
              ].map((v, i) => (
                <Rv key={v.label} d={i * 100}>
                  <figure className="m-0">
                    <video
                      className="aspect-video w-full rounded-[24px] bg-ink object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={`${A}/hero-poster.webp`}
                    >
                      <source src={v.src} type="video/mp4" />
                    </video>
                    <figcaption className="mt-4">
                      <div className="text-[15px] font-bold tracking-[-0.02em] text-ink">{v.label}</div>
                      <div className="mt-0.5 text-[13px] text-muted">{v.sub}</div>
                    </figcaption>
                  </figure>
                </Rv>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 교육 — 부산식 vs 제주식 ═══════════════════════════ */}
      <section className="bg-ink px-5 py-24 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1200px]">
          <Rv>
            <Label>알고 가셔야 할 것</Label>
            <h2 className="t-h2 max-w-3xl text-[1.9rem] text-paper md:text-[2.5rem]">
              같은 ‘밀면’이라는 이름을 쓰지만,<br />
              <span className="text-gold">부산식과 제주식은 다른 음식</span>입니다
            </h2>
            <p className="mt-7 max-w-2xl text-[15.5px] leading-[1.8] tracking-[-0.01em] text-paper/55">
              이 차이를 모르고 도입하면 손님에게 설명을 못 합니다.
              반대로 알고 도입하면, 그 자체가 메뉴판의 이야기가 됩니다.
            </p>
          </Rv>

          <Rv d={120}>
            <div className="mt-12 overflow-hidden rounded-[24px] border border-paper/12">
              <div className="grid grid-cols-[76px_1fr_1fr] text-[12px] font-bold tracking-[0.06em] text-paper/45 sm:grid-cols-[110px_1fr_1fr]">
                <div className="px-4 py-4 md:px-7">구분</div>
                <div className="px-4 py-4 md:px-7">부산 밀면</div>
                <div className="bg-brand/20 px-4 py-4 text-gold md:px-7">산방식당 · 제주식</div>
              </div>
              {[
                ["육수", "돼지뼈 · 사골 베이스", "멸치 베이스 — 맑고 시원한 산미"],
                ["면", "소면", "중면 · 자가제면 생면"],
                ["맛", "구수함이 중심", "새콤달콤 · 개운함이 중심"],
                ["곁들임", "매장마다 다름", "겨자 + 특제 고추장 (수육)"],
              ].map(([k, busan, jeju], i) => (
                <div
                  key={k}
                  className={`grid grid-cols-[76px_1fr_1fr] border-t border-paper/8 text-[13px] sm:grid-cols-[110px_1fr_1fr] md:text-[15px] ${
                    i % 2 ? "bg-paper/[0.02]" : ""
                  }`}
                >
                  <div className="px-4 py-5 font-bold text-paper/75 md:px-7">{k}</div>
                  <div className="px-4 py-5 text-paper/40 md:px-7">{busan}</div>
                  <div className="bg-brand/10 px-4 py-5 font-semibold text-paper md:px-7">{jeju}</div>
                </div>
              ))}
            </div>
          </Rv>

          <Rv d={200}>
            <p className="mt-8 max-w-3xl text-[14.5px] leading-[1.85] text-paper/50">
              국내산 멸치와 생강을 오래 끓여 맑고 시원한 육수를 냅니다. 면은 소면이 아닌 중면
              생면이라 끝까지 잘 붇지 않습니다. 설명보다 한 번 삶아보시면 바로 아십니다.
            </p>
          </Rv>
        </div>
      </section>

      {/* ══ 공급 품목 ═════════════════════════════════════════ */}
      <section id="supply" className="bg-paper px-5 py-24 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1200px]">
          <Rv>
            <Label>공급 품목</Label>
            <h2 className="t-h2 text-[1.9rem] md:text-[2.5rem]">네 가지면 됩니다</h2>
            <p className="t-body mt-5 max-w-xl text-[15.5px]">
              전 품목을 받으실 필요 없습니다. 매장에 맞는 것만 고르시면 됩니다.
            </p>
          </Rv>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {[
              {
                img: "menu-mil",
                tag: "산방 육수",
                t: "국내산 멸치를 오래 끓인 베이스",
                d: "맑고 시원하면서 은근한 단맛이 있습니다. 물밀냉면은 물론 온면·국밥·만둣국까지 이 하나로 확장됩니다.",
              },
              {
                img: "menu-bibim",
                tag: "비빔전용장",
                t: "한 장으로 세 가지 쓰임",
                d: "고운 고춧가루로 맵지 않고 새콤달콤합니다. 비벼 먹고, 육수에 풀어 먹고, 고기에 찍어 먹습니다.",
              },
              {
                img: "menu-suyuk",
                tag: "산방 수육",
                t: "제주 돼지 뒷다리, 겨자와 특제 고추장",
                d: "된장도 새우젓도 아닙니다. 이 조합이 산방식당의 방식이고, 밀냉면과 붙었을 때 객단가가 올라갑니다.",
              },
              {
                img: "menu-mandu",
                tag: "산방 만두",
                t: "국내산 냉장육 100%",
                d: "냉동육이 아닌 냉장육을 씁니다. 끓여도 잘 터지지 않아 만둣국·온면으로 바로 확장할 수 있습니다.",
              },
            ].map((p, i) => (
              <Rv key={p.tag} d={(i % 2) * 90}>
                <article className="group h-full overflow-hidden rounded-[24px] border border-line bg-warm transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(23,18,15,0.1)]">
                  <div className="overflow-hidden">
                    <img
                      src={`${A}/${p.img}.webp`}
                      alt={p.tag}
                      width={1200}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-8">
                    <div className="t-label mb-3 text-brand">{p.tag}</div>
                    <h3 className="t-h3 mb-3 text-[19px]">{p.t}</h3>
                    <p className="t-body text-[14.5px]">{p.d}</p>
                  </div>
                </article>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 확장 메뉴 ═════════════════════════════════════════ */}
      <section id="menu" className="bg-warm px-5 py-24 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1200px]">
          <Rv>
            <Label>확장 메뉴</Label>
            <h2 className="t-h2 max-w-3xl text-[1.9rem] md:text-[2.5rem]">
              육수와 비빔장 하나로<br />이만큼 나옵니다
            </h2>
            <p className="t-body mt-5 max-w-xl text-[15.5px]">
              매장 상황에 맞는 조합은 함께 짜드립니다.
            </p>
          </Rv>
        </div>

        {/* 마퀴 — 이미지 위가 아니라 독립 띠 */}
        <Rv d={80}>
          <div className="marquee my-12 border-y border-line py-5">
            <div className="marquee__track">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
                  {EXT_MENUS.map((m) => (
                    <span
                      key={m}
                      className="whitespace-nowrap px-7 text-[19px] font-extrabold tracking-[-0.03em] text-ink/22 md:text-[24px]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Rv>

        <div className="mx-auto w-full max-w-[1200px]">
          <Rv>
            <figure className="m-0">
              <img
                src={`${A}/lineup-top.webp`}
                alt="산방식당 메뉴 라인업 — 밀냉면, 비빔밀냉면, 수육, 만두 상차림"
                width={1600}
                height={1067}
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full rounded-[24px] object-cover"
              />
              <figcaption className="mt-4 text-[12.5px] text-muted">
                밀냉면 · 비빔밀냉면 · 수육 · 만두를 한 상에 올린 구성
              </figcaption>
            </figure>
          </Rv>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { img: "ext-manduonmyeon", t: "만두온면", d: "따뜻한 멸치 육수에 만두" },
              { img: "ext-mandutguk", t: "만둣국", d: "겨울 매출을 받쳐주는 한 그릇" },
              { img: "ext-gukbap", t: "수육국밥", d: "수육과 육수를 한 번에" },
              { img: "ext-onmyeon-top", t: "고기국수", d: "제주 향토식 구성" },
              { img: "ext-suyuk-top", t: "고기덮밥 · 제육덮밥", d: "점심 회전율용 단품" },
              { img: "ext-set", t: "밀면 + 만두 세트", d: "객단가를 올리는 조합" },
            ].map((m, i) => (
              <Rv key={m.t} d={(i % 3) * 80}>
                <figure className="group m-0 overflow-hidden rounded-[24px] bg-paper transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(23,18,15,0.1)]">
                  <img
                    src={`${A}/${m.img}.webp`}
                    alt={m.t}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <figcaption className="px-6 py-5">
                    <div className="text-[15.5px] font-bold tracking-[-0.02em] text-ink">{m.t}</div>
                    <div className="mt-0.5 text-[13px] text-muted">{m.d}</div>
                  </figcaption>
                </figure>
              </Rv>
            ))}
          </div>

          <Rv>
            <p className="mt-8 text-[12.5px] leading-relaxed text-muted">
              ※ 산방식당에서 촬영한 실제 메뉴 이미지입니다. 매장별 최종 구성과 플레이팅은 협의에 따라
              달라질 수 있습니다.
            </p>
          </Rv>
        </div>
      </section>

      {/* ══ 도입 방식 ═════════════════════════════════════════ */}
      <section id="track" className="bg-paper px-5 py-24 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1200px]">
          <Rv>
            <Label>도입 방식</Label>
            <h2 className="t-h2 text-[1.9rem] md:text-[2.5rem]">두 가지 길이 있습니다</h2>
          </Rv>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Rv>
              <div className="flex h-full flex-col rounded-[24px] border-2 border-brand bg-warm p-8 md:p-11">
                <span className="mb-6 w-fit rounded-full bg-brand px-3.5 py-1.5 text-[11.5px] font-bold tracking-[-0.01em] text-white">
                  가장 많이 선택하십니다
                </span>
                <h3 className="t-h2 text-[1.45rem] md:text-[1.7rem]">메뉴솔루션</h3>
                <p className="t-body mt-4 text-[15px]">
                  사장님 간판과 매장은 그대로. 검증된 베이스만 도입해 우리 가게의 두 번째
                  시그니처를 만듭니다.
                </p>
                <ul className="mt-8 space-y-3.5 text-[14.5px] leading-relaxed text-ink/80">
                  {[
                    "내 간판, 내 상호 그대로 운영",
                    "인테리어 지정·로열티 부담 없음",
                    "원하는 품목만 선택 — 전 품목 강제 없음",
                    "육수·비빔장·생밀면 공급 + 조리 교육",
                    "매장에 맞는 메뉴 구성 함께 설계",
                  ].map((li) => (
                    <li key={li} className="flex gap-3">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {li}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  onClick={() => lead("track-menu")}
                  className="mt-9 inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-[14.5px] font-bold text-paper transition-colors duration-150 hover:bg-brand"
                >
                  샘플 먼저 받아보기
                </a>
              </div>
            </Rv>

            <Rv d={110}>
              <div className="flex h-full flex-col rounded-[24px] border border-line bg-paper p-8 md:p-11">
                <span className="mb-6 w-fit rounded-full border border-line px-3.5 py-1.5 text-[11.5px] font-bold text-muted">
                  중대형 브랜드 · 프리미엄
                </span>
                <h3 className="t-h2 text-[1.45rem] md:text-[1.7rem]">공식 브랜드 콜라보</h3>
                <p className="t-body mt-4 text-[15px]">
                  ‘산방식당’ 이름과 IP를 전면에 내걸고 함께 갑니다. 브랜드 사용 범위는 건별로
                  협의합니다.
                </p>
                <ul className="mt-8 space-y-3.5 text-[14.5px] leading-relaxed text-ink/80">
                  {[
                    "산방식당 브랜드·IP를 활용한 협업",
                    "귀사 운영 환경에 맞춘 메뉴·조리 프로세스 설계",
                    "물류·공급 단위 별도 협의",
                    "레퍼런스: 동래정 백탄직화 밀면 콜라보",
                  ].map((li) => (
                    <li key={li} className="flex gap-3">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                      {li}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  onClick={() => lead("track-collab")}
                  className="mt-9 inline-flex w-full items-center justify-center rounded-full border border-ink/20 px-6 py-3.5 text-[14.5px] font-bold text-ink transition-colors duration-150 hover:bg-ink hover:text-paper"
                >
                  협업 문의하기
                </a>
              </div>
            </Rv>
          </div>

          {/* 프로세스 */}
          <div className="mt-20">
            <Rv>
              <div className="mb-10 h-px w-full bg-line" />
              <h3 className="t-h2 mb-10 text-[1.35rem] md:text-[1.6rem]">도입까지 이렇게 갑니다</h3>
            </Rv>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { n: "01", t: "문의", d: "폼 또는 메일로 매장 상황만 알려주세요" },
                { n: "02", t: "15분 통화", d: "지금 메뉴 구성과 고민을 듣습니다" },
                { n: "03", t: "샘플 발송", d: "육수·비빔장·생밀면을 직접 삶아보십니다" },
                { n: "04", t: "도입 · 교육", d: "조리 방법과 메뉴 구성을 함께 세팅합니다" },
              ].map((s, i) => (
                <Rv key={s.n} d={i * 80}>
                  <div className="h-full rounded-[24px] bg-warm p-7">
                    <div className="t-label mb-4 text-brand/60">{s.n}</div>
                    <h4 className="t-h3 mb-2 text-[17px]">{s.t}</h4>
                    <p className="t-body text-[13.5px]">{s.d}</p>
                  </div>
                </Rv>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 급식 · 단체 ═══════════════════════════════════════ */}
      <section id="foodservice" className="bg-ink px-5 py-24 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
            <Rv>
              <Label>급식 · 단체급식 · 대량 공급</Label>
              <h2 className="t-h2 text-[1.9rem] text-paper md:text-[2.4rem]">
                팔레트 단위로<br />이미 나가고 있습니다
              </h2>
              <p className="mt-7 max-w-lg text-[15.5px] leading-[1.85] text-paper/55">
                단체급식·물류·관광시설 등 대량 공급 실적이 있습니다. 규격서와 단가표는 요청하시면
                보내드립니다.
              </p>

              <div className="mt-10 space-y-0">
                {[
                  { k: "급식 유통", v: "CJ프레시웨이 · 아워홈 납품" },
                  { k: "제조", v: "HACCP 인증 시설" },
                  { k: "물류 단위", v: "박스 · 팔레트 (60box = 1팔레트)" },
                  { k: "배송", v: "수도권 물류센터 경유 · 제주 배차 운영" },
                ].map((r) => (
                  <div key={r.k} className="flex gap-6 border-b border-paper/10 py-4">
                    <div className="w-[86px] shrink-0 text-[12.5px] font-bold text-gold">{r.k}</div>
                    <div className="text-[14.5px] text-paper/80">{r.v}</div>
                  </div>
                ))}
              </div>
            </Rv>

            <Rv d={120}>
              <div className="overflow-hidden rounded-[24px] border border-paper/12">
                <div className="border-b border-paper/10 bg-paper/[0.06] px-7 py-4 text-[12.5px] font-bold tracking-[0.04em] text-paper/70">
                  공급 품목 · 규격
                </div>
                <div className="divide-y divide-paper/8">
                  {[
                    ["생밀면", "1.4kg × 8봉 / 박스"],
                    ["비빔전용장", "2kg × 5EA / 박스"],
                    ["육수간장 원액", "4kg × 3EA / 박스"],
                    ["왕만두", "1.2kg × 6EA / 박스"],
                    ["아삭한 김치왕만두", "1.4kg × 6EA / 박스"],
                  ].map(([n, spec]) => (
                    <div key={n} className="flex items-center justify-between gap-4 px-7 py-4">
                      <span className="text-[14.5px] font-semibold text-paper/90">{n}</span>
                      <span className="text-right text-[13px] text-paper/45">{spec}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-paper/10 bg-paper/[0.03] px-7 py-6">
                  <a
                    href={`mailto:${MAIL}?subject=${encodeURIComponent("[급식·단체] 공급 규격·단가 자료 요청")}`}
                    onClick={() => lead("foodservice")}
                    className="inline-flex items-center gap-2 text-[14.5px] font-bold text-gold transition-colors duration-150 hover:text-paper"
                  >
                    공급 규격 · 단가 자료 요청 →
                  </a>
                  <p className="mt-2 text-[12.5px] text-paper/40">
                    회사명 · 담당자 · 예상 물량만 적어주시면 됩니다.
                  </p>
                </div>
              </div>
            </Rv>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════ */}
      <section className="bg-paper px-5 py-24 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[860px]">
          <Rv>
            <Label>자주 묻는 질문</Label>
            <h2 className="t-h2 text-[1.9rem] md:text-[2.4rem]">먼저 궁금해하시는 것들</h2>
          </Rv>

          <div className="mt-12 border-t border-line">
            {[
              {
                q: "가맹점이 되는 건가요?",
                a: "메뉴솔루션은 사장님 매장의 간판과 운영을 그대로 두고, 검증된 베이스(육수·비빔장·생밀면·만두)를 공급하는 B2B 상품 공급 방식입니다. 인테리어를 지정하지 않고, 원하시는 품목만 받으실 수 있습니다. ‘산방식당’ 상호와 브랜드를 전면에 사용하는 형태는 별도의 공식 브랜드 콜라보로, 이 경우 사용 범위와 조건을 건별로 협의합니다.",
              },
              {
                q: "조리가 어렵지는 않나요?",
                a: "육수와 비빔장은 완성된 상태로 나가고, 생밀면은 삶아서 헹구는 과정이 전부입니다. 도입 시 조리 교육을 함께 진행하고, 매장 동선에 맞춘 조리 순서도 같이 정리해 드립니다.",
              },
              {
                q: "최소 주문 물량이 있나요?",
                a: "품목과 배송 지역에 따라 다릅니다. 매장 규모와 예상 사용량을 알려주시면 현실적인 단위로 안내드립니다. 처음부터 큰 물량을 잡으실 필요는 없습니다.",
              },
              {
                q: "샘플을 먼저 받아볼 수 있나요?",
                a: "네, 그게 가장 빠릅니다. 설명을 아무리 드려도 직접 삶아보시는 것보다 못합니다. 받으실 주소만 알려주시면 육수·비빔장·생밀면을 보내드립니다.",
              },
              {
                q: "제주 외 지역도 공급되나요?",
                a: "가능합니다. 수도권 물류센터를 경유하는 배송 체계를 운영하고 있습니다. 지역과 희망 배송 주기를 알려주시면 확인해 드립니다.",
              },
            ].map((f, i) => (
              <Rv key={f.q} d={i * 50}>
                <details className="group border-b border-line">
                  <summary className="flex cursor-pointer items-start justify-between gap-6 py-6">
                    <span className="t-h3 text-[16.5px] md:text-[18px]">{f.q}</span>
                    <span className="mt-0.5 shrink-0 text-[22px] leading-none text-brand transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="t-body pb-7 pr-10 text-[14.5px]">{f.a}</p>
                </details>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA — 배경 이미지 없음. 글만 ══════════════════════ */}
      <section id="contact" className="bg-ink-2 px-5 py-24 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[720px] text-center">
          <Rv>
            <h2 className="t-h2 text-[2rem] text-paper md:text-[2.7rem]">설명보다 맛이 빠릅니다</h2>
            <p className="mx-auto mt-6 max-w-lg text-[15.5px] leading-[1.85] text-paper/60">
              매장 상황만 알려주시면 됩니다. 15분 통화로 지금 구성에 맞는지 먼저 보고,
              맞겠다 싶으면 샘플을 보내드립니다.
            </p>
          </Rv>

          <Rv d={110}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={TALLY}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => lead("contact-form")}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-[15px] font-bold text-white transition-colors duration-150 hover:bg-brand-2 sm:w-auto"
              >
                샘플 신청 · 상담 문의
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <a
                href={`mailto:${MAIL}?subject=${encodeURIComponent("[메뉴솔루션] 문의드립니다")}`}
                onClick={() => lead("contact-mail")}
                className="inline-flex w-full items-center justify-center rounded-full border border-paper/25 px-8 py-4 text-[15px] font-semibold text-paper/90 transition-colors duration-150 hover:border-paper/60 hover:bg-paper/8 sm:w-auto"
              >
                메일로 문의
              </a>
            </div>
          </Rv>

          <Rv d={200}>
            <div className="mt-10 flex flex-col items-center gap-1.5 text-[13.5px] text-paper/45">
              <a href={`mailto:${MAIL}`} className="font-semibold text-paper/75 hover:text-gold">
                {MAIL}
              </a>
              <a href="tel:+82647942165" className="hover:text-gold">
                본점 064-794-2165
              </a>
            </div>
          </Rv>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════ */}
      <footer className="bg-ink px-5 py-14 text-paper/45 md:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <img
                src={`${A}/logo.webp`}
                alt="제주산방식당"
                width={40}
                height={40}
                loading="lazy"
                className="mb-4 h-9 w-auto"
              />
              <p className="text-[13px] leading-[1.9]">
                주식회사 산방에프앤비 · 대표 김형섭
                <br />
                사업자등록번호 788-87-01449
                <br />
                제주특별자치도 서귀포시 대정읍 하모이삼로 62
              </p>
            </div>
            <div className="flex flex-col gap-2 text-[13px] md:items-end">
              <a
                href="https://www.instagram.com/sanbang_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                Instagram @sanbang_official
              </a>
              <a href={`mailto:${MAIL}`} className="hover:text-gold">{MAIL}</a>
              <a href="tel:+82647942165" className="hover:text-gold">064-794-2165</a>
            </div>
          </div>
          <p className="mt-12 text-[12px] text-paper/25">
            © {new Date().getFullYear()} SANBANG F&B Co., Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
