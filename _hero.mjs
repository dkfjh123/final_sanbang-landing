/**
 * 히어로(첫 화면)만 빠르게 확인용.
 *   node _hero.mjs <저장폴더> [URL]
 * 데스크톱 1440·모바일 390 두 장을 첫 화면 그대로 찍는다.
 */
import puppeteer from "file:///C:/Users/dkfjh/devnew/projects/nip_landing/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";

const OUT = process.argv[2];
const URL = process.argv[3] || "http://127.0.0.1:5173/";
const AT = Number(process.argv[4] ?? 1.2); // 확인할 영상 시점(초)

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
});

for (const [mode, vp] of [
  ["desk", { width: 1440, height: 900, deviceScaleFactor: 1 }],
  ["mob", { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true }],
]) {
  const page = await browser.newPage();
  await page.setViewport(vp);
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
  // 영상이 실제 프레임을 그릴 때까지 기다린다 (포스터가 아니라 재생 화면을 본다)
  await page.evaluate(
    (at) =>
      new Promise((r) => {
        const v = document.querySelector("video");
        if (!v) return r();
        v.pause();
        v.currentTime = at;
        setTimeout(r, 1200);
      }),
    AT
  );
  await page.screenshot({ path: `${OUT}/hero-${mode}-${AT}.png` });
  await page.close();
}
console.log("saved");
await browser.close();
