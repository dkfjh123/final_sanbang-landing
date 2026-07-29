/**
 * 슬라이드 밴드용 축소본 만들기 —  node _slide.mjs
 *
 *  왜 필요한가:
 *    Statement 아래 흐르는 메뉴 밴드는 화면에 높이 320px 이하로 뜬다.
 *    그런데 원본 웹에셋은 1400~2100px 짜리라 9장 합쳐 1.16MB 였다.
 *    보이지도 않는 해상도를 받는 셈이라, 밴드 전용 축소본을 따로 둔다.
 *
 *  레티나(2배)까지 감안해 높이 640px 로 맞춘다. 가로는 비율대로 —
 *    밴드가 '높이 고정 · 너비 자유' 라 세로 사진은 좁게, 가로 사진은
 *    넓게 흘러간다. 억지로 같은 비율로 자르면 음식이 잘린다.
 *
 *  ⚠️ 원본(assets/web/*.webp)은 다른 섹션에서 그대로 쓰고 있다. 건드리지 말 것.
 *     이 스크립트는 assets/web/slide/ 에만 쓴다.
 */
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";

const SRC = "app/public/assets/web";
const OUT = `${SRC}/slide`;

// 순서 = 화면에 흐르는 순서 (사용자 지정, 2026-07-29)
const FILES = [
  "item-broth",
  "item-bibim",
  "item-noodle",
  "item-mandu",
  "katsu-hero",
  "menu-bibim-oh",
  "menu-mandu-oh",
  "menu-mandu",
  "set-milmyeon-mandu",
];

await mkdir(OUT, { recursive: true });

let before = 0;
let after = 0;
for (const f of FILES) {
  const src = `${SRC}/${f}.webp`;
  const out = `${OUT}/${f}.webp`;
  await sharp(src).resize({ height: 640, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);

  const b = (await stat(src)).size;
  const a = (await stat(out)).size;
  before += b;
  after += a;
  const m = await sharp(out).metadata();
  console.log(
    `${f.padEnd(20)} ${String(Math.round(b / 1024)).padStart(4)}KB → ` +
      `${String(Math.round(a / 1024)).padStart(3)}KB   ${m.width}x${m.height}`
  );
}
console.log(
  `\n합계  ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB ` +
    `(${(100 - (after / before) * 100).toFixed(0)}% 감소)`
);
