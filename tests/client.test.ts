import assert from "node:assert/strict";
import test from "node:test";

import { OneMoneyClient } from "../src/client.ts";

test("OneMoneyClient percent-encodes query parameters", async () => {
  const originalFetch = globalThis.fetch;
  let requestedUrl = "";

  globalThis.fetch = (async (input: string | URL | Request) => {
    requestedUrl = String(input);
    return new Response("{}", { status: 200 });
  }) as typeof fetch;

  try {
    const client = new OneMoneyClient({
      accessKey: "test_access_key",
      baseUrl: "https://api.example.com",
      sandbox: true,
      profile: "default",
      timeoutMs: 1000,
    });

    await client.get("/v1/customers", {
      cursor: "next page",
      filter: "status=active&asset=USD",
    });

    assert.equal(
      requestedUrl,
      "https://api.example.com/v1/customers?cursor=next+page&filter=status%3Dactive%26asset%3DUSD",
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
