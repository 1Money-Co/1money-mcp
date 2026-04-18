const legacyKept = [
  "customer.sign_tos_agreement",
  "echo.get",
  "echo.post",
];

const renamed = {
  "simulations.simulate_deposit": "simulations.simulate_transaction",
};

const groupedToolNames = new Map([
  ["GET /v1/customers", "customer.list"],
  ["POST /v1/customers", "customer.create"],
  ["GET /v1/customers/{customer_id}", "customer.get"],
  ["PUT /v1/customers/{customer_id}", "customer.update"],
  ["GET /v1/customers/{customer_id}/associated_persons", "customer.associated_persons.list"],
  ["POST /v1/customers/{customer_id}/associated_persons", "customer.associated_persons.create"],
  ["GET /v1/customers/{customer_id}/associated_persons/{associated_person_id}", "customer.associated_persons.get"],
  ["PUT /v1/customers/{customer_id}/associated_persons/{associated_person_id}", "customer.associated_persons.update"],
  ["DELETE /v1/customers/{customer_id}/associated_persons/{associated_person_id}", "customer.associated_persons.delete"],
  ["GET /v1/customers/{customer_id}/intermediaries", "customer.intermediaries.list"],
  ["POST /v1/customers/{customer_id}/intermediaries", "customer.intermediaries.create"],
  ["GET /v1/customers/{customer_id}/intermediaries/{intermediary_id}", "customer.intermediaries.get"],
  ["PUT /v1/customers/{customer_id}/intermediaries/{intermediary_id}", "customer.intermediaries.update"],
  ["DELETE /v1/customers/{customer_id}/intermediaries/{intermediary_id}", "customer.intermediaries.delete"],
  ["POST /v1/customers/tos_links", "customer.create_tos_link"],
  ["GET /v1/customers/lightweight", "customer.lightweight.get_by_idempotency_key"],
  ["POST /v1/customers/lightweight", "customer.lightweight.create"],
  ["POST /v1/customers/{customer_id}/onboarding_links", "customer.onboarding_links.create"],
  ["GET /v1/customers/hosted/{customer_id}", "customer.lightweight.get"],
  ["POST /v1/customers/onboarding/grants", "customer.onboarding_grants.create"],
  ["GET /v1/customers/{customer_id}/assets", "assets.list"],
  ["GET /v1/customers/{customer_id}/external-accounts/list", "external_accounts.list"],
  ["GET /v1/customers/{customer_id}/external-accounts/{external_account_id}", "external_accounts.get"],
  ["DELETE /v1/customers/{customer_id}/external-accounts/{external_account_id}", "external_accounts.remove"],
  ["GET /v1/customers/{customer_id}/external-accounts", "external_accounts.get_by_idempotency_key"],
  ["POST /v1/customers/{customer_id}/external-accounts", "external_accounts.create"],
  ["GET /v1/customers/{customer_id}/deposit_instructions", "instructions.get_deposit_instruction"],
  ["GET /v1/customers/{customer_id}/all_deposit_instructions", "instructions.crypto.list"],
  ["GET /v1/customers/{customer_id}/deposit_instruction", "instructions.crypto.get_by_idempotency_key"],
  ["POST /v1/customers/{customer_id}/deposit_instruction", "instructions.crypto.create"],
  ["GET /v1/customers/{customer_id}/deposit_instruction/{deposit_instruction_id}", "instructions.crypto.get"],
  ["GET /v1/customers/{customer_id}/auto-conversion-rules/list", "auto_conversion_rules.list"],
  ["GET /v1/customers/{customer_id}/auto-conversion-rules/{auto_conversion_rule_id}", "auto_conversion_rules.get"],
  ["DELETE /v1/customers/{customer_id}/auto-conversion-rules/{auto_conversion_rule_id}", "auto_conversion_rules.delete"],
  ["GET /v1/customers/{customer_id}/auto-conversion-rules", "auto_conversion_rules.get_by_idempotency_key"],
  ["POST /v1/customers/{customer_id}/auto-conversion-rules", "auto_conversion_rules.create"],
  ["GET /v1/customers/{customer_id}/auto-conversion-rules/{auto_conversion_rule_id}/orders", "auto_conversion_rules.list_orders"],
  ["GET /v1/customers/{customer_id}/auto-conversion-rules/{auto_conversion_rule_id}/orders/{order_id}", "auto_conversion_rules.get_order"],
  ["GET /v1/customers/{customer_id}/withdrawals/{transaction_id}", "withdrawals.get"],
  ["GET /v1/customers/{customer_id}/withdrawals", "withdrawals.get_by_idempotency_key"],
  ["POST /v1/customers/{customer_id}/withdrawals", "withdrawals.create"],
  ["POST /v1/customers/{customer_id}/conversions/quote", "conversions.create_quote"],
  ["POST /v1/customers/{customer_id}/conversions/hedge", "conversions.create_hedge"],
  ["GET /v1/customers/{customer_id}/conversions/order", "conversions.get_order"],
  ["GET /v1/customers/{customer_id}/transactions", "transactions.list"],
  ["GET /v1/customers/{customer_id}/transactions/{transaction_id}", "transactions.get"],
  ["GET /v1/customers/{customer_id}/transfers/{transaction_id}", "transfers.get"],
  ["GET /v1/customers/{customer_id}/transfers", "transfers.get_by_idempotency_key"],
  ["POST /v1/customers/{customer_id}/transfers", "transfers.create"],
  ["POST /v1/customers/{customer_id}/fees/estimate", "fees.estimate"],
  ["POST /v1/customers/{customer_id}/simulate-transactions", "simulations.simulate_transaction"],
  ["GET /v1/customers/{customer_id}/recipients", "recipients.get_by_idempotency_key"],
  ["POST /v1/customers/{customer_id}/recipients", "recipients.create"],
  ["GET /v1/customers/{customer_id}/recipients/list", "recipients.list"],
  ["GET /v1/customers/{customer_id}/recipients/{recipient_id}", "recipients.get"],
  ["PUT /v1/customers/{customer_id}/recipients/{recipient_id}", "recipients.update"],
  ["DELETE /v1/customers/{customer_id}/recipients/{recipient_id}", "recipients.delete"],
  ["GET /v1/customers/{customer_id}/recipients/by-external-account/{external_account_id}", "recipients.get_by_external_account"],
  ["GET /v1/customers/{customer_id}/recipients/{recipient_id}/bank_accounts", "recipients.bank_accounts.get_by_idempotency_key"],
  ["POST /v1/customers/{customer_id}/recipients/{recipient_id}/bank_accounts", "recipients.bank_accounts.create"],
  ["GET /v1/customers/{customer_id}/recipients/{recipient_id}/bank_accounts/list", "recipients.bank_accounts.list"],
  ["PUT /v1/customers/{customer_id}/recipients/{recipient_id}/bank_accounts/{bank_account_id}", "recipients.bank_accounts.update"],
  ["DELETE /v1/customers/{customer_id}/recipients/{recipient_id}/bank_accounts/{bank_account_id}", "recipients.bank_accounts.delete"],
]);

const operationMethods = new Set(["get", "post", "put", "delete"]);
const schemaMetadataKeys = new Set([
  "description",
  "title",
  "examples",
  "example",
  "summary",
  "deprecated",
  "externalDocs",
  "xml",
  "readOnly",
  "writeOnly",
  "discriminator",
]);

const clone = (value) => JSON.parse(JSON.stringify(value));

const mergeSchemas = (base, override) => {
  if (!base || typeof base !== "object" || Array.isArray(base)) {
    return clone(override);
  }
  if (!override || typeof override !== "object" || Array.isArray(override)) {
    return clone(override);
  }

  const merged = clone(base);
  for (const [key, value] of Object.entries(override)) {
    if (key === "required" && Array.isArray(value) && Array.isArray(merged.required)) {
      merged.required = [...new Set([...merged.required, ...value])];
      continue;
    }
    if (
      merged[key] &&
      typeof merged[key] === "object" &&
      !Array.isArray(merged[key]) &&
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      merged[key] = mergeSchemas(merged[key], value);
      continue;
    }
    merged[key] = clone(value);
  }
  return merged;
};

const getRefValue = (root, ref) => {
  if (!ref.startsWith("#/")) {
    throw new Error(`Unsupported $ref: ${ref}`);
  }

  return ref
    .slice(2)
    .split("/")
    .reduce((current, part) => current?.[part], root);
};

const resolveSchemaRefs = (node, root, activeRefs = new Set()) => {
  if (Array.isArray(node)) {
    return node.map((item) => resolveSchemaRefs(item, root, activeRefs));
  }

  if (!node || typeof node !== "object") {
    return node;
  }

  if (typeof node.$ref === "string") {
    if (activeRefs.has(node.$ref)) {
      throw new Error(`Circular $ref detected: ${node.$ref}`);
    }

    const resolved = getRefValue(root, node.$ref);
    if (!resolved) {
      throw new Error(`Missing $ref target: ${node.$ref}`);
    }

    const siblings = { ...node };
    delete siblings.$ref;

    activeRefs.add(node.$ref);
    const dereferenced = resolveSchemaRefs(resolved, root, activeRefs);
    activeRefs.delete(node.$ref);
    return Object.keys(siblings).length === 0
      ? dereferenced
      : mergeSchemas(dereferenced, resolveSchemaRefs(siblings, root, activeRefs));
  }

  const resolvedEntries = Object.entries(node).map(([key, value]) => [
    key,
    resolveSchemaRefs(value, root, activeRefs),
  ]);
  return Object.fromEntries(resolvedEntries);
};

const stripSchemaMetadata = (node) => {
  if (Array.isArray(node)) {
    return node.map(stripSchemaMetadata);
  }

  if (!node || typeof node !== "object") {
    return node;
  }

  const cleaned = {};
  for (const [key, value] of Object.entries(node)) {
    if (schemaMetadataKeys.has(key)) {
      continue;
    }
    cleaned[key] = stripSchemaMetadata(value);
  }
  return cleaned;
};

const collectOperations = (oas) => {
  const operations = [];
  for (const [routePath, item] of Object.entries(oas.paths || {})) {
    for (const [method, operation] of Object.entries(item || {})) {
      if (!operationMethods.has(method)) {
        continue;
      }

      operations.push({
        key: `${method.toUpperCase()} ${routePath}`,
        method: method.toUpperCase(),
        path: routePath,
        operationId: operation.operationId || "",
        operation,
      });
    }
  }
  return operations;
};

const mapOperation = (operation) => {
  const tool = groupedToolNames.get(operation.key);
  if (!tool) {
    throw new Error(`Missing grouped tool mapping for ${operation.key}`);
  }
  return tool;
};

const buildMappingReport = ({ oas, currentTools }) => {
  const operations = collectOperations(oas);
  const mapping = operations.map((operation) => ({
    ...operation,
    tool: mapOperation(operation),
  }));
  const targetToolNames = mapping.map((operation) => operation.tool);
  const duplicates = targetToolNames.filter(
    (tool, index) => targetToolNames.indexOf(tool) !== index,
  );

  if (duplicates.length > 0) {
    throw new Error(`Duplicate target tools: ${duplicates.join(", ")}`);
  }

  const uniqueTargetToolNames = [...new Set(targetToolNames)];

  return {
    oas_version: oas.info?.version || null,
    operation_count: operations.length,
    target_tool_count: uniqueTargetToolNames.length + legacyKept.length,
    added: uniqueTargetToolNames.filter((tool) => !currentTools.includes(tool)),
    removed: currentTools.filter(
      (tool) => !uniqueTargetToolNames.includes(tool) && !legacyKept.includes(tool),
    ),
    renamed,
    legacy_kept: legacyKept,
    mapping,
  };
};

export {
  buildMappingReport,
  clone,
  collectOperations,
  groupedToolNames,
  legacyKept,
  mapOperation,
  renamed,
  resolveSchemaRefs,
  stripSchemaMetadata,
};
