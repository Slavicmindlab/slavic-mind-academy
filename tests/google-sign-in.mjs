import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = process.env.AUTH_TEST_BASE_URL ?? "http://127.0.0.1:4173";
const broker = "https://slavicmind-app.lovable.app/~oauth/initiate";
const browser = await chromium.launch({ headless: true, channel: "chromium" });

try {
  for (const width of [1280, 393]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    try {
      // Never send a real OAuth request or touch production users/data.
      await context.route("https://**/*", (route) =>
        route.fulfill({ status: 200, contentType: "text/plain", body: "OAuth intercepted" }),
      );
      const page = await context.newPage();
      for (const next of ["", "/word-lab", "//untrusted.example", "https://untrusted.example"]) {
        await page.goto(`${base}/auth?${new URLSearchParams({ next })}`);
        const requestPromise = page.waitForRequest(
          (request) => request.isNavigationRequest() && request.url().startsWith("https://"),
        );
        await page.getByRole("button", { name: "Continue with Google" }).click();
        const request = await requestPromise;
        const url = new URL(request.url());
        assert.equal(`${url.origin}${url.pathname}`, broker);
        assert.equal(url.searchParams.get("provider"), "google");
        const expected = new URL("/auth", base);
        if (next === "/word-lab") expected.searchParams.set("next", next);
        assert.equal(url.searchParams.get("redirect_uri"), expected.toString());
        assert.ok(url.searchParams.get("state"), "OAuth state must be present");
      }
    } finally {
      await context.close();
    }
  }
  console.log("Google sign-in broker navigation passed on desktop and mobile.");
} finally {
  await browser.close();
}
