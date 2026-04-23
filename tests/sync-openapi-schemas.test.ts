import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");

const findRequestProperty = (schema, propertyName) => {
  if (!schema || typeof schema !== "object") {
    return undefined;
  }

  if (schema.properties?.[propertyName]) {
    return schema.properties[propertyName];
  }

  if (Array.isArray(schema.allOf)) {
    for (const part of schema.allOf) {
      const match = findRequestProperty(part, propertyName);
      if (match) {
        return match;
      }
    }
  }

  return undefined;
};

const hasRequiredRequestProperty = (schema, propertyName) => {
  if (!schema || typeof schema !== "object") {
    return false;
  }

  if (Array.isArray(schema.required) && schema.required.includes(propertyName)) {
    return true;
  }

  if (Array.isArray(schema.allOf)) {
    return schema.allOf.some((part) => hasRequiredRequestProperty(part, propertyName));
  }

  return false;
};

const assertPaginationConstraints = (toolSchemas, toolName) => {
  const paramsSchema = toolSchemas[toolName].properties.params;
  assert.equal(paramsSchema.properties.page.minimum, 1, `${toolName} page minimum`);
  assert.equal(paramsSchema.properties.size.minimum, 1, `${toolName} size minimum`);
  assert.equal(paramsSchema.properties.size.maximum, 100, `${toolName} size maximum`);
};

test("sync-openapi-schemas rewrites key MCP input contracts from the supplied OAS", (t) => {
  const suppliedOasPath = process.env.OPENAPI_PATH;
  if (!suppliedOasPath) {
    t.skip("Set OPENAPI_PATH to run this test.");
    return;
  }

  if (!fs.existsSync(suppliedOasPath)) {
    t.skip(`OPENAPI_PATH does not exist: ${suppliedOasPath}`);
    return;
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "1money-mcp-sync-"));
  const toolsOut = path.join(tempDir, "tools.json");
  const responsesOut = path.join(tempDir, "tool-responses.json");

  const result = spawnSync(
    process.execPath,
    [
      "scripts/sync-openapi-schemas.mjs",
      suppliedOasPath,
      "--tools-out",
      toolsOut,
      "--responses-out",
      responsesOut,
    ],
    {
      cwd: repoRoot,
      encoding: "utf8",
    },
  );

  assert.equal(result.status, 0, result.stderr || result.stdout);

  const toolSchemas = JSON.parse(fs.readFileSync(toolsOut, "utf8"));
  const responseSchemas = JSON.parse(fs.readFileSync(responsesOut, "utf8"));

  assert.ok(toolSchemas["simulations.simulate_transaction"]);
  assert.equal(toolSchemas["simulations.simulate_deposit"], undefined);
  assert.ok(toolSchemas["customer.sign_tos_agreement"]);
  assert.ok(toolSchemas["echo.get"]);
  assert.ok(toolSchemas["echo.post"]);

  assert.deepEqual(toolSchemas["withdrawals.get"].required, [
    "customer_id",
    "transaction_id",
  ]);
  assert.equal(toolSchemas["withdrawals.get"].properties.withdrawal_id, undefined);

  assert.deepEqual(toolSchemas["auto_conversion_rules.get"].required, [
    "customer_id",
    "auto_conversion_rule_id",
  ]);
  assert.equal(toolSchemas["auto_conversion_rules.get"].properties.rule_id, undefined);

  assert.deepEqual(toolSchemas["conversions.get_order"].required, [
    "customer_id",
    "transaction_id",
  ]);

  assert.equal(
    findRequestProperty(toolSchemas["external_accounts.create"].properties.request, "idempotency_key")
      ?.type,
    "string",
  );
  assert.equal(
    findRequestProperty(
      toolSchemas["auto_conversion_rules.create"].properties.request,
      "idempotency_key",
    )?.type,
    "string",
  );
  assert.equal(
    findRequestProperty(toolSchemas["withdrawals.create"].properties.request, "idempotency_key")
      ?.type,
    "string",
  );
  assert.equal(
    findRequestProperty(toolSchemas["recipients.create"].properties.request, "idempotency_key")
      ?.type,
    "string",
  );
  assert.equal(
    findRequestProperty(
      toolSchemas["recipients.bank_accounts.create"].properties.request,
      "idempotency_key",
    )?.type,
    "string",
  );
  assert.ok(hasRequiredRequestProperty(toolSchemas["recipients.create"].properties.request, "idempotency_key"));
  assert.ok(
    hasRequiredRequestProperty(
      toolSchemas["recipients.bank_accounts.create"].properties.request,
      "idempotency_key",
    ),
  );

  assert.deepEqual(toolSchemas["customer.lightweight.get_by_idempotency_key"].required, [
    "idempotency_key",
  ]);
  assert.equal(
    toolSchemas["customer.lightweight.get_by_idempotency_key"].properties.params,
    undefined,
  );

  assert.ok(toolSchemas["instructions.crypto.get"]);
  assert.ok(toolSchemas["transfers.create"]);
  assert.ok(toolSchemas["fees.estimate"]);
  assert.ok(responseSchemas["simulations.simulate_transaction"]);

  assertPaginationConstraints(toolSchemas, "customer.list");
  assert.equal(toolSchemas["customer.list"].properties.params.properties.page_num.minimum, 0);
  assert.equal(toolSchemas["customer.list"].properties.params.properties.page_size.minimum, 0);
  assertPaginationConstraints(toolSchemas, "instructions.crypto.list");
  assertPaginationConstraints(toolSchemas, "auto_conversion_rules.list");
  assertPaginationConstraints(toolSchemas, "auto_conversion_rules.list_orders");
  assertPaginationConstraints(toolSchemas, "transactions.list");
  assertPaginationConstraints(toolSchemas, "recipients.list");
});
