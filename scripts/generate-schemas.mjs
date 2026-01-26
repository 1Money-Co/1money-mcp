import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { jsonSchemaToZod } from "json-schema-to-zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const schemaPath = path.join(rootDir, "schemas", "tools.json");
const responseSchemaPath = path.join(rootDir, "schemas", "tool-responses.json");
const outputPath = path.join(rootDir, "src", "schemas", "zod.ts");

const raw = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const responseRaw = fs.existsSync(responseSchemaPath)
  ? JSON.parse(fs.readFileSync(responseSchemaPath, "utf8"))
  : {};

const toSchemaName = (toolName, suffix = "") =>
  toolName
    .split(".")
    .map((part) => part.replace(/[^a-zA-Z0-9]/g, " "))
    .map((part) =>
      part
        .split(" ")
        .filter(Boolean)
        .map((chunk) => chunk[0].toUpperCase() + chunk.slice(1))
        .join("")
    )
    .join("") +
  suffix +
  "Schema";

let output = "import { z } from \"zod\";\n\n";
output += "export const toolSchemas = {} as Record<string, z.ZodTypeAny>;\n\n";
output += "export const toolResponseSchemas = {} as Record<string, z.ZodTypeAny>;\n\n";

for (const [toolName, schema] of Object.entries(raw)) {
  const schemaName = toSchemaName(toolName);
  const zodCode = jsonSchemaToZod(schema, { name: schemaName });
  const normalized = zodCode
    .replace(/z\.record\(z\.any\(\)\)/g, "z.record(z.string(), z.any())")
    .replace(/z\.record\(z\.unknown\(\)\)/g, "z.record(z.string(), z.unknown())")
    .replace(
      /path: ctx\.path,\n\s*code: "invalid_union",\n\s*unionErrors: errors,\n\s*message: "Invalid input: Should pass single schema",/g,
      'code: "custom",\n        message: "Invalid input: Should pass single schema",',
    );
  output += `${normalized}\n`;
  output += `toolSchemas[${JSON.stringify(toolName)}] = ${schemaName};\n\n`;
}

for (const [toolName, schema] of Object.entries(responseRaw)) {
  const schemaName = toSchemaName(toolName, "Response");
  const zodCode = jsonSchemaToZod(schema, { name: schemaName });
  const normalized = zodCode
    .replace(/z\.record\(z\.any\(\)\)/g, "z.record(z.string(), z.any())")
    .replace(/z\.record\(z\.unknown\(\)\)/g, "z.record(z.string(), z.unknown())")
    .replace(
      /path: ctx\.path,\n\s*code: "invalid_union",\n\s*unionErrors: errors,\n\s*message: "Invalid input: Should pass single schema",/g,
      'code: "custom",\n        message: "Invalid input: Should pass single schema",',
    );
  output += `${normalized}\n`;
  output += `toolResponseSchemas[${JSON.stringify(toolName)}] = ${schemaName};\n\n`;
}

output += "export type ToolName = keyof typeof toolSchemas;\n";
output += "export type ToolResponseName = keyof typeof toolResponseSchemas;\n";

fs.writeFileSync(outputPath, output, "utf8");
console.log(`Wrote ${outputPath}`);
