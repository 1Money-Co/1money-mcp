import assert from "node:assert/strict";
import test from "node:test";

import { createHandlers } from "../src/tools/handlers.ts";

const MAX_BINARY_UPLOAD_BYTES = 4 * 1024 * 1024;

const callUploadHandler = async (request: Record<string, unknown>) => {
  let upload:
    | {
        path: string;
        rawBody: Buffer;
        headers?: Record<string, string>;
      }
    | undefined;

  const client = {
    putRaw: async (path: string, rawBody: Buffer, headers?: Record<string, string>) => {
      upload = { path, rawBody, headers };
      return { uploaded: true };
    },
  };
  const handlers = createHandlers(client as never);

  const result = await handlers["business_onboarding.documents.upload"]({
    account_id: "BZ-TEST",
    id: "business-123",
    document_type: "CERT_OF_INC",
    request,
  });

  return { result, upload };
};

test("document upload decodes validated base64 and builds raw upload headers", async () => {
  const { result, upload } = await callUploadHandler({
    content_base64: Buffer.from("hello", "utf8").toString("base64"),
    content_type: "text/plain",
    filename: "hello\"world\n.txt",
  });

  assert.equal(upload?.path, "/v2/accounts/BZ-TEST/businesses/business-123/documents/CERT_OF_INC");
  assert.equal(upload?.rawBody.toString("utf8"), "hello");
  assert.deepEqual(upload?.headers, {
    "Content-Type": "text/plain",
    "Content-Disposition": "attachment; filename=\"hello_world_.txt\"",
  });
  assert.equal(JSON.parse(result.content[0].text as string).uploaded, true);
});

test("document upload requires filename even when content_disposition is provided", async () => {
  await assert.rejects(
    () =>
      callUploadHandler({
        content_base64: Buffer.from("hello", "utf8").toString("base64"),
        content_type: "text/plain",
        content_disposition: "attachment; filename=\"hello.txt\"",
      }),
    /request\.filename is required for document upload\./,
  );
});

test("document upload rejects malformed base64 before raw upload", async () => {
  await assert.rejects(
    () =>
      callUploadHandler({
        content_base64: "!!!!",
        content_type: "text/plain",
        filename: "hello.txt",
      }),
    /request\.content_base64 must be valid base64 for document upload\./,
  );
});

test("document upload rejects payloads larger than the decoded size limit", async () => {
  const oversizedBase64 = "A".repeat(Math.ceil((MAX_BINARY_UPLOAD_BYTES + 1) / 3) * 4);

  await assert.rejects(
    () =>
      callUploadHandler({
        content_base64: oversizedBase64,
        content_type: "application/pdf",
        filename: "large.pdf",
      }),
    /request\.content_base64 must decode to 4 MB or less for document upload\./,
  );
});
