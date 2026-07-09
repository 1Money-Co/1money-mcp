const legacyKept = [
  "customer.associated_persons.create",
  "customer.associated_persons.delete",
  "customer.associated_persons.get",
  "customer.associated_persons.list",
  "customer.associated_persons.update",
  "customer.create",
  "customer.create_tos_link",
  "customer.get",
  "customer.intermediaries.create",
  "customer.intermediaries.delete",
  "customer.intermediaries.get",
  "customer.intermediaries.list",
  "customer.intermediaries.update",
  "customer.lightweight.create",
  "customer.lightweight.get",
  "customer.lightweight.get_by_idempotency_key",
  "customer.list",
  "customer.onboarding_grants.create",
  "customer.onboarding_links.create",
  "customer.sign_tos_agreement",
  "customer.update",
  "echo.get",
  "echo.post",
];

const renamed = {
  "simulations.simulate_deposit": "simulations.simulate_transaction",
};

const groupedToolNames = new Map([
  ["GET /v2/accounts/{account_id}/businesses", "business_onboarding.list"],
  ["POST /v2/accounts/{account_id}/businesses", "business_onboarding.create"],
  ["GET /v2/accounts/{account_id}/businesses/{id}", "business_onboarding.get"],
  ["PATCH /v2/accounts/{account_id}/businesses/{id}", "business_onboarding.update"],
  [
    "POST /v2/accounts/{account_id}/businesses/onboarding-sessions",
    "business_onboarding.onboarding_sessions.create",
  ],
  [
    "PUT /v2/accounts/{account_id}/businesses/{id}/documents/{document_type}",
    "business_onboarding.documents.upload",
  ],
  [
    "PUT /v2/accounts/{account_id}/businesses/{id}/controllers/{controller_id}/documents/{document_type}",
    "business_onboarding.controllers.documents.upload",
  ],
  ["POST /v2/accounts/{account_id}/businesses/{id}/submit", "business_onboarding.submit"],
  [
    "POST /v2/accounts/{account_id}/businesses/{id}/sandbox/status",
    "business_onboarding.sandbox.set_status",
  ],
  ["POST /v2/terms/{type}/signatures", "terms.signatures.create"],
  ["GET /v2/accounts/{account_id}/individuals", "individual_onboarding.list"],
  ["POST /v2/accounts/{account_id}/individuals", "individual_onboarding.create"],
  ["GET /v2/accounts/{account_id}/individuals/{id}", "individual_onboarding.get"],
  ["PATCH /v2/accounts/{account_id}/individuals/{id}", "individual_onboarding.update"],
  [
    "PUT /v2/accounts/{account_id}/individuals/{id}/documents/{document_type}",
    "individual_onboarding.documents.upload",
  ],
  ["POST /v2/accounts/{account_id}/individuals/{id}/submit", "individual_onboarding.submit"],
  [
    "GET /v2/accounts/{account_id}/individuals/{id}/limits",
    "individual_onboarding.limits.get",
  ],
  [
    "POST /v2/accounts/{account_id}/individuals/{id}/review-limits",
    "individual_onboarding.limits.review",
  ],
  [
    "POST /v2/accounts/{account_id}/individuals/{id}/sandbox/status",
    "individual_onboarding.sandbox.set_status",
  ],
  ["GET /v1/individuals/applications", "individual_applications.list"],
  ["POST /v1/individuals/applications", "individual_applications.create"],
  [
    "PUT /v1/individuals/applications/{customer_id}/documents",
    "individual_applications.documents.upload",
  ],
  ["POST /v1/individuals/applications/{customer_id}/submit", "individual_applications.submit"],
  ["GET /v1/individuals/applications/{customer_id}", "individual_applications.get"],
  ["PATCH /v1/individuals/applications/{customer_id}", "individual_applications.update"],
  ["POST /v1/individuals/applications/{customer_id}/upgrade", "individual_applications.upgrade"],
  ["GET /v1/accounts/{customer_id}", "individual_accounts.get"],
  ["GET /v1/accounts/{customer_id}/limits", "individual_accounts.get_limits"],
  ["POST /v1/individuals/tos/sessions", "individual_tos_sessions.create"],
  [
    "POST /v1/individuals/tos/sessions/{session_token}/sign",
    "individual_tos_sessions.sign",
  ],
  ["GET /v1/accounts/{account_id}/partner-fees", "partner_fees.list"],
  ["POST /v1/accounts/{account_id}/partner-fees", "partner_fees.create"],
  ["GET /v1/accounts/{account_id}/partner-fees/{fee_id}", "partner_fees.get"],
  ["DELETE /v1/accounts/{account_id}/partner-fees/{fee_id}", "partner_fees.delete"],
  ["PATCH /v1/accounts/{account_id}/partner-fees/{fee_id}", "partner_fees.update"],
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

const operationMethods = new Set(["get", "post", "put", "patch", "delete"]);
const schemaMetadataKeys = new Set([
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
    .map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~"))
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
