import assert from "node:assert/strict";
import crypto from "node:crypto";
import test from "node:test";

import {
  ALGORITHM,
  buildAuthorizationHeader,
  constructStringToSign,
  getOmDateTimestamp,
  hashBody,
} from "../src/auth.ts";

const accessKey = "test_access_key";
const secretText = "test-secret-key-material";
const secretKey = Buffer.from(secretText, "utf8").toString("base64url");

test("constructStringToSign matches scp-sign canonical order", () => {
  const result = constructStringToSign(
    accessKey,
    "20250930T120000Z",
    "POST",
    "/v1/customers",
    "abc123",
  );

  assert.equal(
    result,
    "test_access_key\n20250930T120000Z\nPOST\n/v1/customers\nabc123",
  );
});

test("buildAuthorizationHeader generates scp-core compatible hmac header", () => {
  const method = "POST";
  const requestPath = "/v1/customers/test/withdrawals";
  const requestBody = Buffer.from('{"asset":"USD","amount":"100.00"}', "utf8");
  const timestamp = "20250930T120000Z";
  const bodyHash = crypto.createHash("sha256").update(requestBody).digest("hex");
  const stringToSign = [
    accessKey,
    timestamp,
    method,
    requestPath,
    bodyHash,
  ].join("\n");
  const expectedSignature = crypto
    .createHmac("sha256", Buffer.from(secretKey, "base64url"))
    .update(stringToSign)
    .digest("hex");

  const result = buildAuthorizationHeader({
    accessKey,
    secretKey,
    method,
    requestPath,
    requestBody,
    timestamp,
    sandbox: false,
  });

  assert.equal(
    result,
    `${ALGORITHM} ${accessKey}:${timestamp}:${expectedSignature}`,
  );
});

test("buildAuthorizationHeader falls back to bearer only when sandbox secret is absent", () => {
  const result = buildAuthorizationHeader({
    accessKey,
    method: "GET",
    requestPath: "/v1/customers",
    requestBody: Buffer.alloc(0),
    timestamp: "20250930T120000Z",
    sandbox: true,
  });

  assert.equal(result, `Bearer ${accessKey}`);
});

test("hashBody returns sha256 hex digest", () => {
  assert.equal(
    hashBody(Buffer.from("hello", "utf8")),
    "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
  );
});

test("getOmDateTimestamp returns OM-DATE timestamp format", () => {
  assert.match(getOmDateTimestamp(new Date("2025-09-30T12:00:00.000Z")), /^\d{8}T\d{6}Z$/);
});
