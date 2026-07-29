/**
 * 특정 구간만 찍어보는 확인용.
 *   node _sec.mjs <저장폴더> <CSS선택자> [파일이름] [URL]
 * 예) node _sec.mjs ./shots "#why" why
 * 데스크톱(1440)·모바일(390) 두 장을 그 요소 기준으로 찍는다.
 */
// 2026-07-29: 다른 프로젝트 node_modules 를 절대경로로 빌려 쓰다가 그 폴더가
// 사라져 죽어 있었다. 이 프로젝트에 직접 설치했다.
import puppeteer from "puppeteer-core";

const [OUT, SEL, NAME = "sec", URL = "http://127.0.0.1:5173/"] = process.argv.slice(2);

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
  // 스크롤 리빌을 전부 발동시킨다
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });
  const el = await page.$(SEL);
  if (!el) {
    console.log(`${mode}: '${SEL}' 못 찾음`);
    await page.close();
    continue;
  }
  await el.scrollIntoView();
  await new Promise((r) => setTimeout(r, 900));
  await el.screenshot({ path: `${OUT}/${NAME}-${mode}.png`, captureBeyondViewport: true });
  await page.close();
}
console.log("saved");
await browser.close();
