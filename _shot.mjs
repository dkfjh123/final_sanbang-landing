/**
 * 랜딩 검증 스크린샷
 * fullPage 캡처는 긴 페이지에서 신뢰할 수 없어서, 실제 사용자가 보는 방식대로
 * 스크롤 위치별 뷰포트 캡처를 순서대로 찍는다.
 */
// 2026-07-29: 다른 프로젝트 node_modules 를 절대경로로 빌려 쓰고 있었는데
// 그 폴더가 사라지면서 스크립트가 통째로 죽었다. 이 프로젝트에 직접 설치했다.
// (puppeteer-core 는 브라우저를 내려받지 않는다 — 아래 executablePath 의 크롬을 쓴다)
import puppeteer from "puppeteer-core";

const OUT = process.argv[2];
const URL = process.argv[3] || "http://127.0.0.1:4173/";
const MODE = process.argv[4] || "desk";

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
page.on("requestfailed", (r) => errors.push("REQFAIL: " + r.url()));

await page.setViewport(VP);
await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });

// 전체를 훑어 모든 리빌을 발동시킨다
await page.evaluate(async () => {
  const H = document.body.scrollHeight;
  for (let y = 0; y < H; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
});
await new Promise((r) => setTimeout(r, 900));

const H = await page.evaluate(() => document.body.scrollHeight);
const step = Math.round(VP.height * 0.94);
const shots = Math.ceil(H / step);
console.log(`${MODE} — 높이 ${H}px, ${shots}컷`);

for (let i = 0; i < shots; i++) {
  const y = Math.min(i * step, H - VP.height);
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 320));
  await page.screenshot({ path: `${OUT}/${MODE}-${String(i).padStart(2, "0")}.png` });
}

const hidden = await page.evaluate(
  () => document.querySelectorAll("[data-rv]:not(.is-in)").length
);
console.log(hidden ? `⚠️ 미노출 ${hidden}개` : "✅ 리빌 전부 노출");
console.log(errors.length ? "⚠️ " + [...new Set(errors)].join("\n") : "✅ 콘솔 오류 없음");
await browser.close();
