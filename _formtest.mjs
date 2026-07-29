/**
 * 문의 폼 실제 제출 테스트 —  node _formtest.mjs [URL]
 *
 *   node _formtest.mjs                        # 개발 서버(localhost:5173)
 *   node _formtest.mjs https://sanbangjeju.com/   # 배포본
 *
 *  왜 브라우저로 하나:
 *    Web3Forms 무료 플랜은 서버에서 직접 쏘는 요청(curl 등)을 거부한다
 *    ("Use our API in client side"). 그래서 진짜 브라우저를 띄워 칸을 채우고
 *    버튼을 누른다. 사람이 하는 것과 똑같은 경로라 검증으로서도 이쪽이 정확하다.
 *
 *  ⚠️ 돌릴 때마다 사장님 메일함으로 문의 1건이 실제로 발송되고,
 *     Web3Forms 월 250건 한도도 1건 소모된다. 필요할 때만 돌릴 것.
 */
import puppeteer from "puppeteer-core";

const URL = process.argv[2] || "http://localhost:5173/";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Web3Forms 응답을 그대로 들여다본다
let apiResult = null;
const diag = [];
page.on("response", async (r) => {
  if (r.url().includes("web3forms")) {
    try {
      apiResult = { status: r.status(), body: await r.text() };
    } catch {
      apiResult = { status: r.status(), body: "(본문 읽기 실패)" };
    }
  }
});
page.on("request", (r) => {
  if (r.url().includes("web3forms")) diag.push(`요청 → ${r.method()} ${r.url()}`);
});
page.on("requestfailed", (r) => {
  if (r.url().includes("web3forms")) diag.push(`실패 → ${r.url()} : ${r.failure()?.errorText}`);
});
page.on("console", (m) => {
  if (m.type() === "error") diag.push(`콘솔 → ${m.text()}`);
});
page.on("pageerror", (e) => diag.push(`페이지오류 → ${e.message}`));

await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
await page.evaluate(() => document.querySelector("#contact")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 800));

const fill = async (sel, val) => {
  await page.waitForSelector(sel, { timeout: 15000 });
  await page.type(sel, val, { delay: 8 });
};

await fill("#f-store", "연동 테스트 (실제 문의 아님)");
await fill("#f-name", "테스트");
await fill("#f-tel", "010-0000-0000");
await fill("#f-area", "경기 수원시");
await page.select("#f-interest", "기존 매장에 시그니처 메뉴 도입");
await fill("#f-msg", "폼 연동 확인용 테스트입니다. 한글이 깨지지 않는지도 봅니다. 확인 후 삭제하셔도 됩니다.");
await page.click('input[name="개인정보동의"]');

await page.click('button[type="submit"]');
await new Promise((r) => setTimeout(r, 6000));

const done = await page.evaluate(() => document.body.innerText.includes("상담 신청이 접수되었습니다"));
const err = await page.evaluate(() => {
  const m = document.body.innerText.match(/전송이 원활하지 않아[^\n]*/);
  return m ? m[0] : null;
});

console.log("─".repeat(58));
console.log("대상 :", URL);
console.log("응답 :", apiResult ? `${apiResult.status} ${apiResult.body}` : "(api.web3forms.com 호출 없음)");
console.log("완료 화면 :", done ? "✅ 표시됨" : "❌ 안 뜸");
if (err) console.log("에러 문구 :", err);
if (diag.length) {
  console.log("진단 :");
  [...new Set(diag)].forEach((d) => console.log("   ", d));
}
console.log("─".repeat(58));

await browser.close();
