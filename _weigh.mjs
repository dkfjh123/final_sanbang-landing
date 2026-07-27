/** 실제 전송량 측정 — 첫 화면 / 전체 스크롤 */
import puppeteer from "file:///C:/Users/dkfjh/devnew/projects/nip_landing/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";

const URL = process.argv[2] || "http://127.0.0.1:4173/";
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.setCacheEnabled(false);

let bytes = 0;
const byType = {};
page.on("response", async (res) => {
  try {
    const h = res.headers();
    const len = Number(h["content-length"] || 0);
    const n = len || (await res.buffer().catch(() => Buffer.alloc(0))).length;
    bytes += n;
    const t = (res.url().split(".").pop() || "?").split("?")[0].slice(0, 5);
    byType[t] = (byType[t] || 0) + n;
  } catch {}
});

await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));
const first = bytes;
console.log(`첫 화면 (스크롤 전) : ${(first / 1024).toFixed(0)} KB`);

await page.evaluate(async () => {
  const H = document.body.scrollHeight;
  for (let y = 0; y < H; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
});
await new Promise((r) => setTimeout(r, 2500));
console.log(`전체 스크롤 후      : ${(bytes / 1024 / 1024).toFixed(2)} MB`);
console.log("\n유형별:");
Object.entries(byType)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 8)
  .forEach(([t, n]) => console.log(`  ${t.padEnd(6)} ${(n / 1024).toFixed(0).padStart(6)} KB`));

await browser.close();
