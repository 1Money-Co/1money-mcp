# 1Money MCP
<img src="./public/logo.png" alt="1Money Logo" width="200"/>


MCP (stdio) for the 1Money API, covering all services exposed in the Go SDK.

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

### Local command

- Production: `node dist/index.js`
- Development: `npm run dev`

Pass credentials via environment variables (see below).

## Codex Integration

Add the MCP server to your Codex config file, then restart Codex:

```toml
[mcp_servers.1money]
command = "npx"
args = ["-y", "@1money/mcp"]
env = { ONEMONEY_ACCESS_KEY = "your-access-key", ONEMONEY_SECRET_KEY = "your-secret-key", ONEMONEY_SANDBOX = "1" }
```

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

- "List USD assets for customer cus_123 on US_ACH."
- "Create a TOS link and return the session token."
- "Create an external account and then withdraw $100 to it."
- "List the last 10 transactions for customer cus_123."
- "Simulate a USDC deposit on ETHEREUM for $50."

## API Reference

### Input conventions

- Path params are top-level fields (e.g. `customer_id`, `transaction_id`)
- Query params are placed under `params`
- Request bodies are placed under `request`
- Idempotency is passed as `request.idempotency_key` and converted to `Idempotency-Key`

### Tools

- assets: `assets.list`
- customer: `customer.create_tos_link`, `customer.sign_tos_agreement`, `customer.create`, `customer.list`, `customer.get`, `customer.update`
- customer.associated_persons: `create`, `list`, `get`, `update`, `delete`
- external_accounts: `create`, `get`, `get_by_idempotency_key`, `list`, `remove`
- instructions: `instructions.get_deposit_instruction`
- conversions: `conversions.create_quote`, `conversions.create_hedge`, `conversions.get_order`
- auto_conversion_rules: `create`, `get`, `get_by_idempotency_key`, `list`, `delete`, `list_orders`, `get_order`
- withdrawals: `withdrawals.create`, `withdrawals.get`, `withdrawals.get_by_idempotency_key`
- transactions: `transactions.list`, `transactions.get`
- simulations: `simulations.simulate_deposit`
- echo: `echo.get`, `echo.post`

### Schema

`schemas/tools.json` is the source JSON Schema for all tools.

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

`schemas/tools.json` is the JSON Schema source. Use `json-schema-to-zod` to regenerate `src/schemas/zod.ts`:

```bash
npm run generate-schemas
```
