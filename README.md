# 1Money MCP
<img src="./public/logo.png" alt="1Money Logo" width="200"/>


MCP (stdio) for the 1Money API, aligned to the current OpenAPI surface and exposed as grouped MCP tools.

## What This MCP Server Does

- Exposes 1Money API operations as MCP tools (assets, customers, conversions, withdrawals, transactions, and more).
- Standardizes request inputs so MCP clients can call tools without SDK-specific glue code.
- Handles auth and sandbox configuration via environment variables or `~/.onemoney/credentials`.
- Ships a JSON Schema (`schemas/tools.json`) for tool discovery, validation, and client generation.

## Integration

### Cursor (one-click install)

One-click install: Add MCP to Cursor.

After installation, add your credentials to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "1money": {
      "command": "npx",
      "args": ["-y", "@1money/mcp"],
      "env": {
        "ONEMONEY_ACCESS_KEY": "your-access-key",
        "ONEMONEY_SECRET_KEY": "your-secret-key",
        "ONEMONEY_SANDBOX": "1"
      }
    }
  }
}
```

Note: `ONEMONEY_SECRET_KEY` is required for non-sandbox use. When `ONEMONEY_SANDBOX=1`, the access key is sufficient.

### Claude Code

Run the following command in your terminal:

```bash
claude mcp add --transport stdio 1money --env ONEMONEY_ACCESS_KEY=your-access-key --env ONEMONEY_SECRET_KEY=your-secret-key --env ONEMONEY_SANDBOX=1 -- npx -y @1money/mcp
```

### Claude Desktop

Add to your Claude Desktop configuration file:

macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
Windows: `%APPDATA%\\Claude\\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "1money": {
      "command": "npx",
      "args": ["-y", "@1money/mcp"],
      "env": {
        "ONEMONEY_ACCESS_KEY": "your-access-key",
        "ONEMONEY_SECRET_KEY": "your-secret-key",
        "ONEMONEY_SANDBOX": "1"
      }
    }
  }
}
```

### Codex

Add the MCP server to your Codex config file, then restart Codex:

```toml
[mcp_servers.1money]
command = "npx"
args = ["-y", "@1money/mcp"]
env = { ONEMONEY_ACCESS_KEY = "your-access-key", ONEMONEY_SECRET_KEY = "your-secret-key", ONEMONEY_SANDBOX = "1" }
```

### Local command

- Production: `node dist/index.js`
- Development: `npm run dev`

Pass credentials via environment variables (see below).


Note: `ONEMONEY_SECRET_KEY` is required for non-sandbox use. When `ONEMONEY_SANDBOX=1`, the access key is sufficient.

## Environment variables

- `ONEMONEY_ACCESS_KEY`: access key (required)
- `ONEMONEY_SECRET_KEY`: secret key (required for non-sandbox)
- `ONEMONEY_BASE_URL`: API base URL (default `https://api.sandbox.1money.com`)
- `ONEMONEY_SANDBOX`: sandbox mode (`1` or `true`)
- `ONEMONEY_PROFILE`: credentials file profile (default `default`)
- `ONEMONEY_TIMEOUT_MS`: request timeout in ms (default 30000)

The server also reads `~/.onemoney/credentials` with lower priority than env vars.

## Example prompts

### assets
- "List USD assets for customer cus_123 on US_ACH."

### customer
- "Create a TOS link for customer cus_123 and return the session token."
- "Sign the TOS agreement for customer cus_123 using session token tok_123."
- "Create a customer named Jane Doe with email jane@example.com."
- "List the first 20 customers."
- "Get customer cus_123."
- "Update customer cus_123 with phone +1-415-555-0100."

### customer.associated_persons
- "Create an associated person for customer cus_123 named John Doe."
- "List associated persons for customer cus_123."
- "Get associated person ap_123 for customer cus_123."
- "Update associated person ap_123 for customer cus_123 with phone +1-415-555-0100."
- "Delete associated person ap_123 for customer cus_123."

### customer.intermediaries
- "List intermediaries for customer cus_123."
- "Create an intermediary for customer cus_123 named Global Holdings Ltd."
- "Update intermediary int_123 for customer cus_123."

### customer.lightweight
- "Create a lightweight individual customer for alice@example.com."
- "Get the lightweight customer created with idempotency key lw-001."
- "Get hosted customer cus_123."
- "Create an onboarding link for customer cus_123."
- "Create an onboarding grant for customer cus_123."

### external_accounts
- "Create an external account for customer cus_123 on US_ACH."
- "Get external account ext_123 for customer cus_123."
- "Get an external account by idempotency key extacct-001 for customer cus_123."
- "List external accounts for customer cus_123."
- "Remove external account ext_123 for customer cus_123."

### instructions
- "Get deposit instructions for customer cus_123 for USDC on ETHEREUM."
- "Create a crypto deposit instruction for customer cus_123 on ETHEREUM."
- "List all crypto deposit instructions for customer cus_123."
- "Get a crypto deposit instruction by idempotency key depinst-001."

### conversions
- "Create a conversion quote for customer cus_123 from USD to USDC for 100.00."
- "Create a hedge for conversion quote convq_123."
- "Get conversion order by transaction_id txn_123."

### auto_conversion_rules
- "Create an auto conversion rule for customer cus_123 to convert USD to USDC daily."
- "Get auto conversion rule acr_123."
- "Get auto conversion rule by idempotency key acr-001."
- "List auto conversion rules for customer cus_123."
- "Delete auto conversion rule acr_123."
- "List auto conversion rule orders for rule acr_123."
- "Get auto conversion rule order acro_123."

### withdrawals
- "Create a withdrawal of $100 USD for customer cus_123 to external account ext_123."
- "Get withdrawal txn_123."
- "Get withdrawal by idempotency key withdrawal-001."

### transactions
- "List the last 10 transactions for customer cus_123."
- "Get transaction txn_123."

### transfers
- "Create a transfer of 100 USDC from customer cus_123 to customer cus_456."
- "Get transfer txn_123."
- "Get transfer by idempotency key transfer-001."

### fees
- "Estimate the withdrawal fee for customer cus_123 for 100 USD on US_ACH."

### recipients
- "Update recipient rcp_123 for customer cus_123."
- "Get the recipient attached to external account ext_123 for customer cus_123."
- "Update bank account bank_123 for recipient rcp_123."

### simulations
- "Simulate a USDC deposit on ETHEREUM for $50 for customer cus_123."

### echo
- "Call echo.get and return the response."
- "Call echo.post with {\"hello\": \"world\"}."

## API Reference

### Input conventions

- Path params are top-level fields (e.g. `customer_id`, `transaction_id`)
- Query params are placed under `params`
- Request bodies are placed under `request`
- Create flows that support idempotency pass it as `request.idempotency_key`, which is converted to `Idempotency-Key`
- `*.get_by_idempotency_key` tools keep `idempotency_key` at the top level
- `conversions.get_order` uses top-level `transaction_id`

### Tools

- assets: `assets.list`
- customer: `customer.create_tos_link`, `customer.sign_tos_agreement`, `customer.create`, `customer.list`, `customer.get`, `customer.update`
- customer.associated_persons: `create`, `list`, `get`, `update`, `delete`
- customer.intermediaries: `list`, `create`, `get`, `update`, `delete`
- customer.lightweight: `get_by_idempotency_key`, `create`, `get`
- customer.onboarding_links: `create`
- customer.onboarding_grants: `create`
- external_accounts: `create`, `get`, `get_by_idempotency_key`, `list`, `remove`
- recipients: `recipients.create`, `recipients.list`, `recipients.get`, `recipients.update`, `recipients.delete`, `recipients.get_by_idempotency_key`, `recipients.get_by_external_account`
- recipients.bank_accounts: `get_by_idempotency_key`, `create`, `list`, `update`, `delete`
- instructions: `instructions.get_deposit_instruction`
- instructions.crypto: `list`, `get_by_idempotency_key`, `create`, `get`
- conversions: `conversions.create_quote`, `conversions.create_hedge`, `conversions.get_order`
- auto_conversion_rules: `create`, `get`, `get_by_idempotency_key`, `list`, `delete`, `list_orders`, `get_order`
- withdrawals: `withdrawals.create`, `withdrawals.get`, `withdrawals.get_by_idempotency_key`
- transactions: `transactions.list`, `transactions.get`
- transfers: `transfers.get`, `transfers.get_by_idempotency_key`, `transfers.create`
- fees: `fees.estimate`
- simulations: `simulations.simulate_transaction`
- echo: `echo.get`, `echo.post`

### Schema

- `schemas/tools.json` is the source JSON Schema for tool inputs.
- `schemas/tool-responses.json` is the source JSON Schema for tool responses.

## Examples

```json
{
  "tool": "assets.list",
  "input": {
    "customer_id": "cus_123",
    "params": {
      "asset": "USD",
      "network": "US_ACH"
    }
  }
}
```

```json
{
  "tool": "withdrawals.create",
  "input": {
    "customer_id": "cus_123",
    "request": {
      "idempotency_key": "withdrawal-001",
      "amount": "100.00",
      "asset": "USD",
      "network": "US_ACH",
      "external_account_id": "ext_123"
    }
  }
}
```

## Schema generation

`schemas/tools.json` and `schemas/tool-responses.json` are the JSON Schema sources. Use `json-schema-to-zod` to regenerate `src/schemas/zod.ts`:

```bash
npm run generate-schemas
```

To diff and sync against a fresh OpenAPI file:

```bash
npm run openapi:map -- /path/to/swagger.json
npm run openapi:sync -- /path/to/swagger.json
npm run generate-schemas
npm run build
```
