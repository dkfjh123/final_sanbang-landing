/**
 * 산방식당 랜딩 — 에셋 웹최적화
 * 원본(G드라이브 브랜드 에셋) → assets/web/*.webp
 *
 * 원본은 장당 6~76MB의 촬영 원본이므로 절대 그대로 쓰지 않는다.
 * 표시 크기의 2배(레티나) 정도까지만 리사이즈하고 WebP로 변환한다.
 */
import sharp from "sharp";
import { mkdirSync, existsSync, statSync } from "fs";

const G = "G:/내 드라이브/2. Areas (G-Drive)/2. Brand_assets_산방식당";
const SHOOT = `${G}/산방식당 사진/191107 산방식당 이미지 보정본 (3)`;
const MENU = `${G}/산방식당 사진/산방식당_사진공유/매장메뉴 사진_산방식당`;
const KIT = `${G}/산방식당 사진/산방식당_사진공유/밀키트관련 사진`;
const OUT = "app/public/assets/web";

mkdirSync(OUT, { recursive: true });

// [원본경로, 출력파일명, 최대폭, 품질]
const jobs = [
  // ── 대표 메뉴컷 (섹션 히어로급, 표시 ~600px) ──────────────
  [`${SHOOT}/191025_JSS9377 1.jpg`, "lineup-top.webp", 1600, 80],   // 전체 상차림 탑뷰 = 라인업 대표
  [`${SHOOT}/191025_JSS5147.jpg`, "menu-mil.webp", 1200, 80],        // 밀냉면(물)
  [`${SHOOT}/191025_JSS5155.jpg`, "menu-bibim.webp", 1200, 80],      // 비빔밀냉면
  [`${SHOOT}/191025_JSS8306.jpg`, "menu-suyuk.webp", 1200, 80],      // 수육
  [`${SHOOT}/191025_JSS8317.jpg`, "menu-mandu.webp", 1200, 80],      // 산방만두(찜기)

  // ── 확장메뉴 그리드 (표시 ~360px) ────────────────────────
  [`${SHOOT}/191025_JSS6224.jpg`, "ext-manduonmyeon.webp", 800, 78], // 만두온면
  [`${SHOOT}/191025_JSS7278.jpg`, "ext-mandutguk.webp", 800, 78],    // 만둣국
  [`${SHOOT}/191025_JSS9425.jpg`, "ext-gukbap.webp", 800, 78],       // 수육국밥
  [`${SHOOT}/191025_JSS9423.jpg`, "ext-onmyeon-top.webp", 800, 78],  // 만두온면 탑뷰
  [`${SHOOT}/191025_JSS9370.jpg`, "ext-suyuk-top.webp", 800, 78],    // 수육 탑뷰
  [`${SHOOT}/191025_JSS9413.jpg`, "ext-set.webp", 800, 78],          // 밀면+만두 조합

  // ── 분위기/디테일 ────────────────────────────────────────
  [`${SHOOT}/191025_JSS5136.jpg`, "mood-mil-dark.webp", 1200, 78],
  [`${SHOOT}/191025_JSS5174.jpg`, "mood-bibim-dark.webp", 1200, 78],

  // ── 매장 ────────────────────────────────────────────────
  [`${MENU}/산방식당 본점 (1) - 복사본.JPG`, "store-main.webp", 1400, 76],
  [`${MENU}/산방식당 본점(드론) (1).JPG`, "store-drone.webp", 1400, 76],
  [`${MENU}/산방식당 제주점 (3) - 복사본.JPG`, "store-jeju.webp", 1400, 76],

  // ── 브랜드/HMR ──────────────────────────────────────────
  [`${KIT}/명예회장님 사진.jpg`, "founder.webp", 800, 80],
  [`${KIT}/단품 정면이미지_제주산방식당 비빔밀냉면 806g 2인분.png`, "hmr-front.webp", 800, 82],
  [`${KIT}/구성품 이미지_제주산방식당 비빔밀냉면 806g_2인분.jpg`, "hmr-parts.webp", 1200, 80],

  // ── 로고 (투명 배경 유지) ────────────────────────────────
  [`${MENU}/제주산방식당_로고_확정본__2_-removebg-preview.png`, "logo.webp", 480, 90],
];

let total = 0;
let srcTotal = 0;
const missing = [];

for (const [src, name, w, q] of jobs) {
  if (!existsSync(src)) {
    missing.push(src);
    continue;
  }
  srcTotal += statSync(src).size;
  const info = await sharp(src)
    .rotate()
    .resize({ width: w, withoutEnlargement: true })
    .webp({ quality: q })
    .toFile(`${OUT}/${name}`);
  total += info.size;
  console.log(
    `${String(Math.round(info.size / 1024)).padStart(5)} KB  ${String(info.width).padStart(4)}px  ${name}`
  );
}

console.log("─".repeat(52));
console.log(`원본 합계 : ${(srcTotal / 1024 / 1024).toFixed(1)} MB`);
console.log(`최적화 후 : ${(total / 1024 / 1024).toFixed(2)} MB`);
console.log(`감소율    : ${(100 - (total / srcTotal) * 100).toFixed(1)}%`);
if (missing.length) {
  console.log("\n⚠️ 원본을 찾지 못함:");
  missing.forEach((m) => console.log("   " + m));
}
