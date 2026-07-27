import { useEffect } from "react";
import { GA4_ID, META_PIXEL_ID, useReveal } from "./lib/ui";
import { Hero, Intro, Nav } from "./sections/Hero";
import { Brand, Compare, Stores } from "./sections/Brand";
import { Philosophy, Problems, Weapon } from "./sections/Solution";
import { Story } from "./sections/Story";
import { Items } from "./sections/Items";
import { BrandPartner, Extensions, NotFranchise, RealPower } from "./sections/Partnership";
import { Contact, Footer } from "./sections/Contact";

/* ────────────────────────────────────────────────────────────────
   제주산방식당 · 메뉴솔루션 랜딩

   ▸ 구조의 기준 = 공식 브랜드소개서
     `G:/…/2. Brand_assets_산방식당/산방식당_브랜드소개서_메뉴솔루션/
      산방식당_브랜드소개서_202606.pptx` (21p)
     섹션 순서·카피·소구 포인트를 이 덱에서 그대로 가져왔다.
     덱을 고치면 이 페이지도 같이 고쳐야 한다.

   ▸ 덱 ↔ 섹션 매핑
       1p  표지            → Hero
       2p  목차            → Intro
       3·4p 브랜드          → Brand
       5p  부산 vs 제주     → Compare
       5·6·7p 매장/메뉴판   → Stores
       8·9p 파트너십 철학   → Philosophy
       10p 무기            → Weapon
       11p 고민 5개(원팩)   → Problems
       12~16p 공급품목 4종  → Items
       17p 가맹 아님        → NotFranchise
       18p 진짜 힘          → RealPower
       19p 확장 조합        → Extensions
       20p 브랜드 파트너    → BrandPartner
       21p 문의            → Contact

   ▸ 문구 주의 (반드시 지킬 것)
     · "가맹점이 아닙니다"는 소개서 원문대로 **"육지에서"** 한정어를
       붙인 채로만 쓴다. (주)산방에프앤비는 공정위 등록 가맹본부다.
     · 가수율 45%+ / 30년 생면 / 육수 10년 / 고기 32.27% 는 모두
       소개서에 실린 공식 수치다. 소개서와 다르게 쓰지 않는다.
     · 산방 육수는 멸치 베이스다. "사골·돼지뼈"는 부산식 설명에만 쓴다.
     · 매출 보장·효과 단정은 금지.

   ▸ 레이아웃 원칙
     텍스트를 영상·이미지 위에 겹치지 않는다(히어로 데스크톱 제외).
     미디어는 미디어 자리에, 글은 글 자리에. 캡션은 이미지 아래로.
   ──────────────────────────────────────────────────────────── */

export default function App() {
  useReveal();

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

  /* 메타 픽셀 — ID를 넣으면 자동 활성화.
     폼 제출 시 Lead 이벤트는 sections/Contact.tsx 의 fireLead()가 쏜다. */
  useEffect(() => {
    if (!META_PIXEL_ID) return;
    const w = window as unknown as Record<string, unknown> & { fbq?: unknown; _fbq?: unknown };
    if (w.fbq) return;
    const n: unknown = function (...args: unknown[]) {
      const f = n as { callMethod?: (...a: unknown[]) => void; queue: unknown[] };
      if (f.callMethod) f.callMethod(...args);
      else f.queue.push(args);
    };
    Object.assign(n as object, { push: n, loaded: true, version: "2.0", queue: [] });
    w.fbq = n;
    w._fbq = n;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    (w.fbq as (...a: unknown[]) => void)("init", META_PIXEL_ID);
    (w.fbq as (...a: unknown[]) => void)("track", "PageView");
  }, []);

  return (
    <div className="antialiased">
      <Nav />

      {/* ── 표지 · 목차 ─────────────────────────────────── */}
      <Hero />
      <Intro />

      {/* ── CHAPTER 01 · 브랜드 ─────────────────────────── */}
      <Brand />
      <Compare />
      <Stores />

      {/* ── CHAPTER 02 · 파트너십 철학 ───────────────────── */}
      <Philosophy />

      {/* ── CHAPTER 03 · 메뉴솔루션 파트너 ───────────────── */}
      <Weapon />
      <Problems />
      {/* 고민 5개로 문제를 짚은 직후, 공급 품목을 펼치기 직전.
          서사의 정점이자 페이지에서 유일한 어두운 화면 = 챕터 전환점 */}
      <Story />
      <Items />
      <NotFranchise />
      <RealPower />
      <Extensions />

      {/* ── CHAPTER 04 · 브랜드 파트너 ───────────────────── */}
      <BrandPartner />

      {/* ── 문의 ────────────────────────────────────────── */}
      <Contact />
      <Footer />
    </div>
  );
}
