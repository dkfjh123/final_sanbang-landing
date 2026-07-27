import puppeteer from "file:///C:/Users/dkfjh/devnew/projects/nip_landing/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle2" });

const before = await page.evaluate(() => ({
  js: document.documentElement.classList.contains("js"),
  total: document.querySelectorAll("[data-rv]").length,
  shown: document.querySelectorAll("[data-rv].is-in").length,
}));
console.log("초기:", JSON.stringify(before));

await page.evaluate(async () => {
  const H = document.body.scrollHeight;
  for (let y = 0; y < H; y += 500) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
});
await new Promise((r) => setTimeout(r, 1200));

const after = await page.evaluate(() => {
  const miss = [...document.querySelectorAll("[data-rv]:not(.is-in)")].map((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      txt: (el.textContent || "").trim().slice(0, 26),
      top: Math.round(r.top + window.scrollY),
      h: Math.round(r.height),
      op: cs.opacity,
    };
  });
  return {
    total: document.querySelectorAll("[data-rv]").length,
    shown: document.querySelectorAll("[data-rv].is-in").length,
    scrollY: window.scrollY,
    docH: document.body.scrollHeight,
    miss,
  };
});
console.log("스크롤 후:", after.shown + "/" + after.total, "노출  scrollY=" + after.scrollY, "docH=" + after.docH);
if (after.miss.length) {
  console.log("\n미노출 요소:");
  after.miss.forEach((m) => console.log(`  top=${m.top} h=${m.h} op=${m.op}  "${m.txt}"`));
}
await browser.close();
