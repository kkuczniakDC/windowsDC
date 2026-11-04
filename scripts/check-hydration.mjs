import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage();

await page.emulateMedia({ reducedMotion: "no-preference" });
await page.setViewportSize({ width: 1280, height: 900 });

const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") {
    consoleErrors.push(msg.text());
  }
});
page.on("pageerror", (err) => consoleErrors.push(err.message));

await page.goto(`${baseUrl}/`, { waitUntil: "networkidle", timeout: 60_000 });
await page.waitForTimeout(2500);

const hydrationErrors = consoleErrors.filter((text) =>
  /hydrat/i.test(text),
);

console.log(
  JSON.stringify(
    {
      url: `${baseUrl}/`,
      scrollSmoother: await page.evaluate(
        () => document.documentElement.dataset.scrollSmoother ?? null,
      ),
      hydrationErrorCount: hydrationErrors.length,
      hydrationErrors: hydrationErrors.map((t) => t.slice(0, 500)),
      otherErrorCount: consoleErrors.length - hydrationErrors.length,
    },
    null,
    2,
  ),
);

await browser.close();
process.exit(hydrationErrors.length > 0 ? 1 : 0);
