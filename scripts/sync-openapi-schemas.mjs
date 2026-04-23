import fs from "node:fs";
import path from "node:path";
import {
  buildMappingReport,
  legacyKept,
  resolveSchemaRefs,
  stripSchemaMetadata,
} from "./openapi-tooling.mjs";

const parseArgs = (argv) => {
  const args = [...argv];
  const options = {
    toolsOut: path.resolve("schemas/tools.json"),
    responsesOut: path.resolve("schemas/tool-responses.json"),
    currentTools: path.resolve("schemas/tools.json"),
    currentResponses: path.resolve("schemas/tool-responses.json"),
  };

  let oasPath;

  while (args.length > 0) {
    const arg = args.shift();
    if (!arg) {
      continue;
    }
    if (!arg.startsWith("--")) {
      oasPath = path.resolve(arg);
      continue;
    }

    const value = args.shift();
    if (!value) {
      throw new Error(`Missing value for ${arg}`);
    }

    switch (arg) {
      case "--tools-out":
        options.toolsOut = path.resolve(value);
        break;
      case "--responses-out":
        options.responsesOut = path.resolve(value);
        break;
      case "--current-tools":
        options.currentTools = path.resolve(value);
        break;
      case "--current-responses":
        options.currentResponses = path.resolve(value);
        break;
      default:
        throw new Error(`Unknown option: ${arg}`);
    }
  }

  if (!oasPath) {
    throw new Error(
      "Usage: node scripts/sync-openapi-schemas.mjs <oas-path> [--tools-out path] [--responses-out path] [--current-tools path] [--current-responses path]",
    );
  }

  return { oasPath, ...options };
};

const loadJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));

const isTopLevelQueryParam = (toolName, parameterName) =>
  (parameterName === "idempotency_key" && toolName.endsWith(".get_by_idempotency_key")) ||
  (toolName === "conversions.get_order" && parameterName === "transaction_id");

// Manual overrides for endpoints whose swagger is missing the Idempotency-Key header.
const requestCompatibilityFields = {
  "recipients.bank_accounts.create": {
    idempotency_key: { schema: { type: "string" }, required: true },
  },
};

const applyPaginationFieldCompatibilityOverrides = (fieldName, schema) => {
  if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
    return schema;
  }

  if (fieldName === "page") {
    return {
      ...schema,
      minimum: 1,
    };
  }

  if (fieldName === "size") {
    return {
      ...schema,
      minimum: 1,
      maximum: 100,
    };
  }

  return schema;
};

const applyQueryParameterCompatibilityOverrides = (parameter, schema) => {
  if (parameter.in !== "query") {
    return schema;
  }

  return applyPaginationFieldCompatibilityOverrides(parameter.name, schema);
};

const applyRequestCompatibilityOverrides = (toolName, requestSchema) => {
  const fields = requestCompatibilityFields[toolName];
  if (!fields || !requestSchema) {
    return requestSchema;
  }

  const nextSchema = {
    ...requestSchema,
    properties: { ...(requestSchema.properties || {}) },
  };
  const required = new Set(nextSchema.required || []);
  for (const [name, config] of Object.entries(fields)) {
    nextSchema.properties[name] = config.schema;
    if (config.required) {
      required.add(name);
    }
  }
  if (required.size > 0) {
    nextSchema.required = [...required];
  }
  return nextSchema;
};

const normalizeSchema = (schema, root) =>
  stripSchemaMetadata(resolveSchemaRefs(schema, root));

const ensureStrictObject = (schema) => {
  if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
    return schema;
  }

  if (schema.type === "object" && schema.additionalProperties === undefined) {
    return { ...schema, additionalProperties: false };
  }

  return schema;
};

const injectIdempotencyField = (toolName, requestSchema, parameters) => {
  const headerParam = (parameters || []).find(
    (p) => p.name === "Idempotency-Key" && p.in === "header",
  );
  if (!headerParam || !requestSchema) {
    return requestSchema;
  }

  const isRequired = headerParam.required === true;
  const field = { type: "string" };

  if (requestSchema.type === "object" || requestSchema.properties) {
    const nextSchema = {
      ...requestSchema,
      properties: { ...(requestSchema.properties || {}), idempotency_key: field },
    };
    const required = new Set(nextSchema.required || []);
    if (isRequired) {
      required.add("idempotency_key");
    }
    if (required.size > 0) {
      nextSchema.required = [...required];
    }
    return nextSchema;
  }

  if (Array.isArray(requestSchema.allOf)) {
    const extra = { type: "object", properties: { idempotency_key: field } };
    if (isRequired) {
      extra.required = ["idempotency_key"];
    }
    return { ...requestSchema, allOf: [...requestSchema.allOf, extra] };
  }

  return requestSchema;
};

const buildParamsSchema = (parameters, toolName, root) => {
  const properties = {};
  const required = [];
  let shouldRequireContainer = false;

  for (const parameter of parameters) {
    const schema = applyQueryParameterCompatibilityOverrides(
      parameter,
      normalizeSchema(parameter.schema, root),
    );

    if (
      parameter.name === "pagination" &&
      schema.type === "object" &&
      schema.properties &&
      typeof schema.properties === "object"
    ) {
      for (const [nestedName, nestedSchema] of Object.entries(schema.properties)) {
        properties[nestedName] = ensureStrictObject(
          applyPaginationFieldCompatibilityOverrides(nestedName, nestedSchema),
        );
      }
      if (Array.isArray(schema.required) && schema.required.length > 0) {
        required.push(...schema.required);
        shouldRequireContainer = true;
      }
      continue;
    }

    if (isTopLevelQueryParam(toolName, parameter.name)) {
      continue;
    }

    properties[parameter.name] = ensureStrictObject(schema);
    if (parameter.required) {
      required.push(parameter.name);
      shouldRequireContainer = true;
    }
  }

  if (Object.keys(properties).length === 0) {
    return null;
  }

  const paramsSchema = {
    type: "object",
    additionalProperties: false,
    properties,
  };

  if (required.length > 0) {
    paramsSchema.required = [...new Set(required)];
  }

  return { schema: paramsSchema, required: shouldRequireContainer };
};

const buildToolInputSchema = (toolName, operation, root) => {
  const topLevelSchema = {
    type: "object",
    additionalProperties: false,
    properties: {},
  };
  const required = [];

  const parameters = (operation.parameters || []).map((parameter) =>
    parameter.$ref ? resolveSchemaRefs(parameter, root) : parameter,
  );

  for (const parameter of parameters.filter((parameter) => parameter.in === "path")) {
    topLevelSchema.properties[parameter.name] = ensureStrictObject(
      normalizeSchema(parameter.schema, root),
    );
    if (parameter.required) {
      required.push(parameter.name);
    }
  }

  for (const parameter of parameters.filter((parameter) => parameter.in === "query")) {
    if (!isTopLevelQueryParam(toolName, parameter.name)) {
      continue;
    }

    topLevelSchema.properties[parameter.name] = ensureStrictObject(
      applyQueryParameterCompatibilityOverrides(
        parameter,
        normalizeSchema(parameter.schema, root),
      ),
    );
    if (parameter.required) {
      required.push(parameter.name);
    }
  }

  const paramsSchema = buildParamsSchema(
    parameters.filter((parameter) => parameter.in === "query"),
    toolName,
    root,
  );
  if (paramsSchema) {
    topLevelSchema.properties.params = paramsSchema.schema;
    if (paramsSchema.required) {
      required.push("params");
    }
  }

  const requestSchema = operation.requestBody?.content?.["application/json"]?.schema;
  if (requestSchema) {
    let resolvedRequest = ensureStrictObject(normalizeSchema(requestSchema, root));
    resolvedRequest = injectIdempotencyField(toolName, resolvedRequest, parameters);
    resolvedRequest = applyRequestCompatibilityOverrides(toolName, resolvedRequest);
    topLevelSchema.properties.request = resolvedRequest;
    if (operation.requestBody.required) {
      required.push("request");
    }
  }

  if (required.length > 0) {
    topLevelSchema.required = [...new Set(required)];
  }

  return topLevelSchema;
};

const emptyResponseSchema = {
  oneOf: [
    { type: "null" },
    { type: "object", additionalProperties: true },
  ],
};

const pickSuccessResponse = (responses = {}) => {
  const codes = Object.keys(responses)
    .filter((statusCode) => /^2\d\d$/.test(statusCode))
    .sort();

  for (const statusCode of codes) {
    const response = responses[statusCode];
    const schema = response?.content?.["application/json"]?.schema;
    if (schema) {
      return { statusCode, schema };
    }
  }

  return null;
};

const buildToolResponseSchema = (toolName, operation, root, currentResponses) => {
  const successfulResponse = pickSuccessResponse(operation.responses);
  if (successfulResponse) {
    return ensureStrictObject(normalizeSchema(successfulResponse.schema, root));
  }

  return currentResponses[toolName] || emptyResponseSchema;
};

const writeJson = (filePath, value) => {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const main = () => {
  const {
    oasPath,
    toolsOut,
    responsesOut,
    currentTools,
    currentResponses,
  } = parseArgs(process.argv.slice(2));

  const oas = loadJson(oasPath);
  const currentToolSchemas = loadJson(currentTools);
  const currentResponseSchemas = loadJson(currentResponses);
  const report = buildMappingReport({
    oas,
    currentTools: Object.keys(currentToolSchemas),
  });

  const toolSchemas = {};
  const responseSchemas = {};

  for (const mappingEntry of report.mapping) {
    toolSchemas[mappingEntry.tool] = buildToolInputSchema(
      mappingEntry.tool,
      mappingEntry.operation,
      oas,
    );
    responseSchemas[mappingEntry.tool] = buildToolResponseSchema(
      mappingEntry.tool,
      mappingEntry.operation,
      oas,
      currentResponseSchemas,
    );
  }

  for (const toolName of legacyKept) {
    const toolSchema = currentToolSchemas[toolName];
    const responseSchema = currentResponseSchemas[toolName];

    if (!toolSchema) {
      throw new Error(`Missing current legacy tool schema: ${toolName}`);
    }
    if (!responseSchema) {
      throw new Error(`Missing current legacy response schema: ${toolName}`);
    }

    toolSchemas[toolName] = toolSchema;
    responseSchemas[toolName] = responseSchema;
  }

  writeJson(toolsOut, toolSchemas);
  writeJson(responsesOut, responseSchemas);

  console.log(
    JSON.stringify(
      {
        ...report,
        tools_out: toolsOut,
        responses_out: responsesOut,
      },
      null,
      2,
    ),
  );
};

main();
