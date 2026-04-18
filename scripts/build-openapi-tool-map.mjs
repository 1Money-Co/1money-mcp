import fs from "node:fs";
import path from "node:path";
import { buildMappingReport } from "./openapi-tooling.mjs";

const main = () => {
  const oasPath = process.argv[2];
  if (!oasPath) {
    throw new Error("Usage: node scripts/build-openapi-tool-map.mjs <oas-path>");
  }

  const absoluteOasPath = path.resolve(oasPath);
  const raw = JSON.parse(fs.readFileSync(absoluteOasPath, "utf8"));
  const currentTools = Object.keys(
    JSON.parse(fs.readFileSync(path.resolve("schemas/tools.json"), "utf8")),
  );

  const report = buildMappingReport({ oas: raw, currentTools });

  console.log(JSON.stringify(report, null, 2));
};

main();
