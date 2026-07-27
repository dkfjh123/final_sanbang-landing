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
const PHOTO = `${G}/산방식당 사진`;
const ARCHIVE = "G:/내 드라이브/_ARCHIVE_TEMP";
/* 아워홈 납품용으로 촬영한 고품질 메뉴컷 (2026-04-17 수령) */
const OH = `${G}/아워홈디자인관련_2026년5월/20260417_아워홈에서 보내준 사진_메뉴 촬영컷_산방식당`;
/* 사이드(돈까스) 연출컷 — 2026-07-27 사장님 지정 */
const DL = "C:/Users/dkfjh/Downloads";

/* 브랜드소개서(산방식당_브랜드소개서_202606.pptx)에서 추출한 컷.
   PPTX 안에 묻혀 있어 매번 풀기 번거로우므로 프로젝트에 원본을 둔다(2.4MB).
   원본 덱: G:/…/2. Brand_assets_산방식당/산방식당_브랜드소개서_메뉴솔루션/ */
const DECK = "_deck_src";

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

  // ── 브랜드소개서(2026.06) 공급품목 컷 ─────────────────────
  //  소개서 순서 = 랜딩 순서. 생밀면 → 육수 → 비빔장 → 만두
  [`${DECK}/noodle-hand.jpg`, "item-noodle.webp", 1000, 84], // ① 생밀면 — 손으로 든 생면
  [`${DECK}/item-broth.jpg`, "item-broth.webp", 900, 84], // ② 산방육수 — 물밀냉면(세로)
  [`${DECK}/item-bibim.jpg`, "item-bibim.webp", 900, 84], // ③ 산방비빔장 — 비빔밀냉면(세로)
  [`${DECK}/item-mandu.jpg`, "item-mandu.webp", 1200, 84], // ④ 산방만두 — 찜기 5알
  [`${DECK}/jeju-scenery.jpg`, "jeju-scenery.webp", 1600, 76], // 산방산·유채 (브랜드)
  [`${DECK}/store-main-blue.png`, "store-main-blue.webp", 1000, 80], // 모슬포 본점 파란 건물
  [`${DECK}/menuboard.jpeg`, "menuboard.webp", 1600, 80], // 제주 메뉴판 6종 그래픽

  // ── 확장메뉴 실사 (2026-07-27 사장님 지정) ────────────────
  //  ※ 촬영본에 없던 고기국수·김치찌개를 상위 폴더에서 확보했다.
  //     덮밥 3종(고기·제육·낙지)은 여전히 사진이 없다 → 텍스트로만 노출.
  [`${PHOTO}/고기국수 사진1.jpg`, "ext-gogiguksu.webp", 900, 78], // 고기국수
  [`${PHOTO}/김치찌개 (2).JPG`, "ext-kimchijjigae.webp", 900, 78], // 김치찌개
  [`${PHOTO}/만두온면 광고 .jpg`, "poster-manduonmyeon.webp", 900, 80], // 만두온면 포스터(문구 인쇄됨)
  [`${ARCHIVE}/05.고명 올리는컷 (1).jpg`, "action-gomyeong.webp", 1400, 82], // 비빔 고명 액션컷

  // ── 확장메뉴 그리드 (표시 ~360px) ────────────────────────
  [`${SHOOT}/191025_JSS6224.jpg`, "ext-manduonmyeon.webp", 800, 78], // 만두온면
  [`${SHOOT}/191025_JSS7278.jpg`, "ext-mandutguk.webp", 800, 78],    // 만둣국
  [`${SHOOT}/191025_JSS9427.jpg`, "ext-gukbap.webp", 800, 78],       // 수육국밥 (밥 포함 탑뷰)
  [`${SHOOT}/191025_JSS9413.jpg`, "ext-set.webp", 800, 78],          // 물밀냉면 + 만두
  [`${SHOOT}/191025_JSS9415.jpg`, "ext-bibimset.webp", 800, 78],     // 비빔밀냉면 + 만두
  [`${SHOOT}/191025_JSS9379.jpg`, "ext-hansang.webp", 800, 78],      // 회식·단체 한 상

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

  // ── 로고 (투명 배경 유지 — 네비바 좌측) ──────────────────
  [`${MENU}/제주산방식당_로고_확정본__2_-removebg-preview.png`, "logo.webp", 480, 90],

  // ── 생면 (2026-07-27) ────────────────────────────────────
  //  ※ 제조사 홈페이지 컷. 협력업체라 사용 확인됨. 캡션에 업체명 쓰지 말 것.
  [`${PHOTO}/출처_농업회사 다선 홈페이지2.png`, "noodle-fresh.webp", 1200, 82],

  // ── 아워홈 촬영 고품질 메뉴컷 (2026-07-27) ───────────────
  [`${OH}/[산방식당] 물밀면_1.JPG`, "menu-mil-oh.webp", 1400, 80],
  [`${OH}/[산방식당] 비빔밀면_1.JPG`, "menu-bibim-oh.webp", 1400, 80],
  [`${OH}/[산방식당] 산방만두.JPG`, "menu-mandu-oh.webp", 1200, 80],

  // ── 초격차 사이드 : 돈까스 (2026-07-27) ──────────────────
  [`${DL}/생성된 이미지 1 (5).png`, "katsu-hero.webp", 1200, 82],        // 단면 히어로(검은 배경)
  [`${DL}/생성된 이미지 1 (4).png`, "katsu-frying.webp", 1000, 82],      // 튀김 공정컷
  [`${DL}/생성된 이미지 1 (6).png`, "set-milmyeon-mandu.webp", 1400, 80], // 밀면+만두 세트
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
