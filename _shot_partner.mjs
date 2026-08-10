/** 파트너 페이지 검증 — 높이/CTA 위치/이미지·폰트 로드 확인 + 스크롤 캡처
 *  사용: node _shot_partner.mjs <출력폴더> [mob|desk]
 *  (미리보기 서버가 127.0.0.1:4199 에 떠 있어야 한다) */
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const URL = "http://127.0.0.1:4199/partner/";
const OUT = process.argv[2];
const MODE = process.argv[3] || "mob";
fs.mkdirSync(OUT, { recursive: true });

const VP =
  MODE === "mob"
    ? { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true }
    : { width: 1440, height: 900, deviceScaleFactor: 1 };

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

const errors = [];
const page = await browser.newPage();
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
page.on("requestfailed", (r) => {
  // GA4 collect 는 로컬에서 늘 실패한다 — 노이즈라 뺀다
  if (!/google-analytics|googletagmanager|facebook/.test(r.url())) errors.push("REQFAIL: " + r.url());
});

await page.setViewport(VP);
await page.goto(URL, { waitUntil: "networkidle2", timeout: 30000 });
await new Promise((r) => setTimeout(r, 1200));

// 지연 로딩 이미지까지 다 받도록 한 번 훑는다
await page.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const t = setInterval(() => {
      window.scrollBy(0, 700);
      y += 700;
      if (y > document.body.scrollHeight) { clearInterval(t); res(); }
    }, 60);
  });
});
await new Promise((r) => setTimeout(r, 1200));

const info = await page.evaluate(async () => {
  const imgs = [...document.images].map((i) => ({
    src: (i.currentSrc || i.src).split("/").pop(),
    ok: i.naturalWidth > 0,
  }));
  let font = "?";
  try {
    await document.fonts.ready;
    font = document.fonts.check('500 40px "Pretendard Partner"') ? "로드됨" : "안 됨";
  } catch (e) { font = "확인불가"; }
  const hero = document.querySelector(".hero");
  const cta = document.querySelector('[data-cta="hero"]');
  return {
    height: document.body.scrollHeight,
    heroH: hero?.getBoundingClientRect().height,
    ctaTop: cta ? cta.getBoundingClientRect().top + scrollY : null,
    imgs, font,
    h1: document.querySelector("h1")?.innerText,
  };
});

console.log(`── 파트너 페이지 검증 (${MODE} ${VP.width}×${VP.height}) ──────────`);
console.log("전체 높이     :", info.height, "px   (기존 랜딩 22,319px)");
console.log("히어로 높이   :", Math.round(info.heroH), "px");
console.log("히어로 CTA    :", Math.round(info.ctaTop), "px  ← 첫 화면", VP.height, "px 안이어야 함");
console.log("Pretendard    :", info.font);
console.log("\n이미지:");
info.imgs.forEach((i) => console.log(" ", i.ok ? "OK  " : "FAIL", i.src));
console.log("\nh1:\n" + info.h1);
console.log("\n에러:", errors.length ? errors : "없음");

await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 500));

const H = VP.height;
const n = Math.min(Math.ceil(info.height / H), 10);
for (let i = 0; i < n; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * H);
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: `${OUT}/${MODE}${String(i + 1).padStart(2, "0")}.png` });
}
console.log(`\n캡처 ${n}장 → ${OUT}`);

await browser.close();
