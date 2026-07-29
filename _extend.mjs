/**
 * 확장 메뉴 밴드용 이미지 만들기 —  node _extend.mjs
 *
 *  원본은 G드라이브 브랜드 에셋(장당 0.6~28MB, 13장 합 152MB)이다.
 *  devnew 헌법 1번: 원본은 클라우드에 두고 프로젝트엔 웹용 사본만 둔다.
 *
 *  밴드는 4:5 세로 칸으로 통일해 흐르므로, 그 비율로 **미리 잘라서** 굽는다.
 *  (object-cover 로 화면에서 자르면 안 보이는 픽셀까지 내려받게 된다)
 *  화면 표시 최대 256×320 → 레티나 2배인 512×640.
 *
 *  자르는 위치는 sharp 의 `attention` — 사진에서 시선이 가는 영역을 찾아
 *  그쪽을 남긴다. 음식 사진은 가운데 자르기보다 이쪽이 안전하다.
 *  ⚠️ 그래도 잘린 결과는 눈으로 확인할 것. 이상하면 그 장만 position 을
 *     'center' 나 'north' 로 바꾼다.
 */
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";

const SRC = "G:/내 드라이브/2. Areas (G-Drive)/2. Brand_assets_산방식당/산방식당 사진";
const OUT = "app/public/assets/web/extend";

// [출력 파일명, 원본 경로(SRC 기준), 자르는 기준(선택)]
//   기준을 안 주면 attention(시선이 가는 영역). 글자가 박힌 컷은 그 기준이
//   음식 쪽으로 끌려가 제목을 잘라먹으므로 'top' 등으로 직접 지정한다.
// 순서 = 화면에 흐르는 순서(사용자 지정)
const JOBS = [
  ["milnaengmyeon", "제주산방_밀냉면이미지 (2).png"],
  ["bibim", "산방식당_사진공유/매장메뉴 사진_산방식당/비빔밀면 (1).jpg"],
  ["mandu", "만두 (8).jpg"],
  ["suyuk", "수육 (2).jpg"],
  ["manduonmyeon", "만두온면 (7).jpg"],
  ["mandutguk", "만둣국 (7).jpg"],
  ["manduonmyeon2", "만두온면 광고 .jpg"], // ⚠️ 파일명 끝에 공백이 있다
  ["gogiguksu", "고기국수 사진3 (2).jpg"],
  ["kimchimandu", "산방만두-김치5개 (3) (1).jpg"],
  ["kimchijjigae", "김치찌개 (2).JPG"],
  ["suyukgukbap", "KakaoTalk_20230130_132617572.jpg"],
  ["gogideopbap", "제주산방_005.JPG"], // 2026-07-29 교체 (앞서 쓰던 카톡 사진은 다른 메뉴였다)
  // 제목이 세로로 쓰인 컷이다. attention 으로 자르면 위가 날아가 '산'이 잘린다
  ["jeyukdeopbap", "산방제육덮밥.jpg", "top"],
  ["nakjibibimbap", "제주산방_001.jpg"],
];

await mkdir(OUT, { recursive: true });

let before = 0;
let after = 0;
for (const [name, rel, pos] of JOBS) {
  const src = `${SRC}/${rel}`;
  const out = `${OUT}/${name}.webp`;
  await sharp(src)
    .rotate() // EXIF 회전 정보 반영 (휴대폰 촬영본이 눕는 걸 막는다)
    .resize(512, 640, { fit: "cover", position: pos ?? sharp.strategy.attention })
    .webp({ quality: 78 })
    .toFile(out);

  const b = (await stat(src)).size;
  const a = (await stat(out)).size;
  before += b;
  after += a;
  console.log(
    `${name.padEnd(16)} ${String(Math.round(b / 1024)).padStart(6)}KB → ${String(
      Math.round(a / 1024)
    ).padStart(3)}KB`
  );
}
console.log(
  `\n합계  ${(before / 1024 / 1024).toFixed(1)}MB → ${Math.round(after / 1024)}KB ` +
    `(${(100 - (after / before) * 100).toFixed(1)}% 감소)`
);
