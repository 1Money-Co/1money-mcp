import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");

test("build-openapi-tool-map groups a fixture OAS into MCP tool names", () => {
  const fixturePath = path.join(os.tmpdir(), "1money-mcp-openapi-fixture.json");
  const fixture = {
    openapi: "3.1.0",
    info: { title: "fixture", version: "fixture-v1" },
    paths: {
      "/v1/customers": {
        get: { operationId: "list_customers" },
        post: { operationId: "create_customer" },
      },
      "/v1/customers/{customer_id}/simulate-transactions": {
        post: { operationId: "simulate_transaction" },
      },
      "/v1/customers/{customer_id}/fees/estimate": {
        post: { operationId: "estimate_fee" },
      },
    },
  };

  fs.writeFileSync(fixturePath, JSON.stringify(fixture), "utf8");

  const result = spawnSync(
    process.execPath,
    ["scripts/build-openapi-tool-map.mjs", fixturePath],
    {
      cwd: repoRoot,
      encoding: "utf8",
    },
  );

  assert.equal(result.status, 0, result.stderr || result.stdout);

  const report = JSON.parse(result.stdout);
  assert.equal(report.operation_count, 4);
  assert.equal(report.oas_version, "fixture-v1");
  assert.deepEqual(
    report.mapping.map((entry: { tool: string }) => entry.tool),
    [
      "customer.list",
      "customer.create",
      "simulations.simulate_transaction",
      "fees.estimate",
    ],
  );
  assert.deepEqual(report.legacy_kept, [
    "customer.sign_tos_agreement",
    "echo.get",
    "echo.post",
  ]);
});

test("build-openapi-tool-map reports the full supplied OAS shape when present", () => {
  const suppliedOasPath = "/Users/ethan/Desktop/swagger-new.json";
  if (!fs.existsSync(suppliedOasPath)) {
    return;
  }

  const result = spawnSync(
    process.execPath,
    ["scripts/build-openapi-tool-map.mjs", suppliedOasPath],
    {
      cwd: repoRoot,
      encoding: "utf8",
    },
  );

  assert.equal(result.status, 0, result.stderr || result.stdout);

  const report = JSON.parse(result.stdout);
  assert.equal(report.operation_count, 63);
  assert.equal(report.target_tool_count, 66);
  assert.equal(
    report.renamed["simulations.simulate_deposit"],
    "simulations.simulate_transaction",
  );
  assert.deepEqual(report.legacy_kept, [
    "customer.sign_tos_agreement",
    "echo.get",
    "echo.post",
  ]);
});
