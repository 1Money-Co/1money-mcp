/*
 * Copyright 2026 1Money Co.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { OneMoneyClient } from "../client.js";
import { ApiError } from "../errors.js";
import type { ToolName } from "../schemas/zod.js";

/**
 * MCP tool handler signature.
 */
export type ToolHandler = (input: unknown) => Promise<CallToolResult>;

type RequestInput = {
  request?: Record<string, unknown>;
  params?: Record<string, string | number | boolean | undefined>;
  customer_id?: string;
  recipient_id?: string;
  bank_account_id?: string;
  session_token?: string;
  associated_person_id?: string;
  external_account_id?: string;
  idempotency_key?: string;
  rule_id?: string;
  order_id?: string;
  withdrawal_id?: string;
  transaction_id?: string;
};

const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;

const withApiError = async <T>(toolName: string, action: () => Promise<T>) => {
  try {
    return await action();
  } catch (error) {
    if (isApiError(error)) {
      const details = [
        `status=${error.statusCode}`,
        error.code ? `code=${error.code}` : undefined,
        error.instance ? `instance=${error.instance}` : undefined,
      ]
        .filter(Boolean)
        .join(", ");
      const message = details
        ? `${toolName} failed: ${error.message} (${details})`
        : `${toolName} failed: ${error.message}`;
      throw new Error(message);
    }

    throw error;
  }
};

const toToolResult = (data: unknown): CallToolResult => ({
  content: [
    {
      type: "text",
      text: JSON.stringify(data ?? null, null, 2),
    },
  ],
});

const runTool = async (toolName: string, action: () => Promise<unknown>) => {
  const data = await withApiError(toolName, action);
  return toToolResult(data);
};

const extractIdempotency = (request?: Record<string, unknown>) => {
  if (!request || typeof request !== "object") {
    return { body: request, headers: undefined as Record<string, string> | undefined };
  }

  const { idempotency_key, ...body } = request;
  const headers = idempotency_key
    ? { "Idempotency-Key": String(idempotency_key) }
    : undefined;
  return { body, headers };
};

const buildCustomerPath = (customerId: string) => `/v1/customers/${customerId}`;

/**
 * Builds the MCP tool handler map backed by the 1money client.
 */
export const createHandlers = (client: OneMoneyClient): Record<ToolName, ToolHandler> => ({
  "assets.list": (input) =>
    runTool("assets.list", async () => {
      const { customer_id, params } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/assets`, params);
    }),
  "customer.create_tos_link": (input) =>
    runTool("customer.create_tos_link", async () => {
      const { request } = input as RequestInput;
      return client.post("/v1/customers/tos_links", request ?? {});
    }),
  "customer.sign_tos_agreement": (input) =>
    runTool("customer.sign_tos_agreement", async () => {
      const { session_token } = input as RequestInput;
      return client.post(`/v1/customers/tos_links/${session_token}/sign`, null);
    }),
  "customer.create": (input) =>
    runTool("customer.create", async () => {
      const { request } = input as RequestInput;
      return client.post("/v1/customers", request);
    }),
  "customer.list": (input) =>
    runTool("customer.list", async () => {
      const { params } = input as RequestInput;
      return client.get("/v1/customers", params);
    }),
  "customer.get": (input) =>
    runTool("customer.get", async () => {
      const { customer_id } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}`);
    }),
  "customer.update": (input) =>
    runTool("customer.update", async () => {
      const { customer_id, request } = input as RequestInput;
      return client.put(`${buildCustomerPath(customer_id!)}`, request);
    }),
  "customer.associated_persons.create": (input) =>
    runTool("customer.associated_persons.create", async () => {
      const { customer_id, request } = input as RequestInput;
      return client.post(`${buildCustomerPath(customer_id!)}/associated_persons`, request);
    }),
  "customer.associated_persons.list": (input) =>
    runTool("customer.associated_persons.list", async () => {
      const { customer_id } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/associated_persons`);
    }),
  "customer.associated_persons.get": (input) =>
    runTool("customer.associated_persons.get", async () => {
      const { customer_id, associated_person_id } = input as RequestInput;
      return client.get(
        `${buildCustomerPath(customer_id!)}/associated_persons/${associated_person_id}`,
      );
    }),
  "customer.associated_persons.update": (input) =>
    runTool("customer.associated_persons.update", async () => {
      const { customer_id, associated_person_id, request } = input as RequestInput;
      return client.put(
        `${buildCustomerPath(customer_id!)}/associated_persons/${associated_person_id}`,
        request,
      );
    }),
  "customer.associated_persons.delete": (input) =>
    runTool("customer.associated_persons.delete", async () => {
      const { customer_id, associated_person_id } = input as RequestInput;
      return client.delete(
        `${buildCustomerPath(customer_id!)}/associated_persons/${associated_person_id}`,
      );
    }),
  "external_accounts.create": (input) =>
    runTool("external_accounts.create", async () => {
      const { customer_id, request } = input as RequestInput;
      const { body, headers } = extractIdempotency(request);
      return client.post(`${buildCustomerPath(customer_id!)}/external-accounts`, body, headers);
    }),
  "external_accounts.get": (input) =>
    runTool("external_accounts.get", async () => {
      const { customer_id, external_account_id } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/external-accounts/${external_account_id}`);
    }),
  "external_accounts.get_by_idempotency_key": (input) =>
    runTool("external_accounts.get_by_idempotency_key", async () => {
      const { customer_id, idempotency_key } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/external-accounts`, {
        idempotency_key,
      });
    }),
  "external_accounts.list": (input) =>
    runTool("external_accounts.list", async () => {
      const { customer_id, params } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/external-accounts/list`, params);
    }),
  "external_accounts.remove": (input) =>
    runTool("external_accounts.remove", async () => {
      const { customer_id, external_account_id } = input as RequestInput;
      return client.delete(
        `${buildCustomerPath(customer_id!)}/external-accounts/${external_account_id}`,
      );
    }),
  "recipients.create": (input) =>
    runTool("recipients.create", async () => {
      const { customer_id, request } = input as RequestInput;
      const { body, headers } = extractIdempotency(request);
      return client.post(`${buildCustomerPath(customer_id!)}/recipients`, body, headers);
    }),
  "recipients.list": (input) =>
    runTool("recipients.list", async () => {
      const { customer_id, params } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/recipients/list`, params);
    }),
  "recipients.get": (input) =>
    runTool("recipients.get", async () => {
      const { customer_id, recipient_id } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/recipients/${recipient_id}`);
    }),
  "recipients.delete": (input) =>
    runTool("recipients.delete", async () => {
      const { customer_id, recipient_id } = input as RequestInput;
      return client.delete(`${buildCustomerPath(customer_id!)}/recipients/${recipient_id}`);
    }),
  "recipients.get_by_idempotency_key": (input) =>
    runTool("recipients.get_by_idempotency_key", async () => {
      const { customer_id, idempotency_key } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/recipients`, { idempotency_key });
    }),
  "recipients.bank_accounts.get_by_idempotency_key": (input) =>
    runTool("recipients.bank_accounts.get_by_idempotency_key", async () => {
      const { customer_id, recipient_id, idempotency_key } = input as RequestInput;
      return client.get(
        `${buildCustomerPath(customer_id!)}/recipients/${recipient_id}/bank_accounts`,
        { idempotency_key },
      );
    }),
  "recipients.bank_accounts.create": (input) =>
    runTool("recipients.bank_accounts.create", async () => {
      const { customer_id, recipient_id, request } = input as RequestInput;
      const { body, headers } = extractIdempotency(request);
      return client.post(
        `${buildCustomerPath(customer_id!)}/recipients/${recipient_id}/bank_accounts`,
        body,
        headers,
      );
    }),
  "recipients.bank_accounts.list": (input) =>
    runTool("recipients.bank_accounts.list", async () => {
      const { customer_id, recipient_id, params } = input as RequestInput;
      return client.get(
        `${buildCustomerPath(customer_id!)}/recipients/${recipient_id}/bank_accounts/list`,
        params,
      );
    }),
  "recipients.bank_accounts.delete": (input) =>
    runTool("recipients.bank_accounts.delete", async () => {
      const { customer_id, recipient_id, bank_account_id } = input as RequestInput;
      return client.delete(
        `${buildCustomerPath(customer_id!)}/recipients/${recipient_id}/bank_accounts/${bank_account_id}`,
      );
    }),
  "instructions.get_deposit_instruction": (input) =>
    runTool("instructions.get_deposit_instruction", async () => {
      const { customer_id, params } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/deposit_instructions`, params);
    }),
  "conversions.create_quote": (input) =>
    runTool("conversions.create_quote", async () => {
      const { customer_id, request } = input as RequestInput;
      return client.post(`${buildCustomerPath(customer_id!)}/conversions/quote`, request);
    }),
  "conversions.create_hedge": (input) =>
    runTool("conversions.create_hedge", async () => {
      const { customer_id, request } = input as RequestInput;
      return client.post(`${buildCustomerPath(customer_id!)}/conversions/hedge`, request);
    }),
  "conversions.get_order": (input) =>
    runTool("conversions.get_order", async () => {
      const { customer_id, order_id } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/conversions/order`, {
        order_id,
      });
    }),
  "auto_conversion_rules.create": (input) =>
    runTool("auto_conversion_rules.create", async () => {
      const { customer_id, request } = input as RequestInput;
      const { body, headers } = extractIdempotency(request);
      return client.post(`${buildCustomerPath(customer_id!)}/auto-conversion-rules`, body, headers);
    }),
  "auto_conversion_rules.get": (input) =>
    runTool("auto_conversion_rules.get", async () => {
      const { customer_id, rule_id } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/auto-conversion-rules/${rule_id}`);
    }),
  "auto_conversion_rules.get_by_idempotency_key": (input) =>
    runTool("auto_conversion_rules.get_by_idempotency_key", async () => {
      const { customer_id, idempotency_key } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/auto-conversion-rules`, {
        idempotency_key,
      });
    }),
  "auto_conversion_rules.list": (input) =>
    runTool("auto_conversion_rules.list", async () => {
      const { customer_id, params } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/auto-conversion-rules/list`, params);
    }),
  "auto_conversion_rules.delete": (input) =>
    runTool("auto_conversion_rules.delete", async () => {
      const { customer_id, rule_id } = input as RequestInput;
      return client.delete(`${buildCustomerPath(customer_id!)}/auto-conversion-rules/${rule_id}`);
    }),
  "auto_conversion_rules.list_orders": (input) =>
    runTool("auto_conversion_rules.list_orders", async () => {
      const { customer_id, rule_id, params } = input as RequestInput;
      const query = params
        ? {
            status: params.status as string | undefined,
            "pagination[page]": params.page,
            "pagination[size]": params.size,
          }
        : undefined;
      return client.get(
        `${buildCustomerPath(customer_id!)}/auto-conversion-rules/${rule_id}/orders`,
        query,
      );
    }),
  "auto_conversion_rules.get_order": (input) =>
    runTool("auto_conversion_rules.get_order", async () => {
      const { customer_id, rule_id, order_id } = input as RequestInput;
      return client.get(
        `${buildCustomerPath(customer_id!)}/auto-conversion-rules/${rule_id}/orders/${order_id}`,
      );
    }),
  "withdrawals.create": (input) =>
    runTool("withdrawals.create", async () => {
      const { customer_id, request } = input as RequestInput;
      const walletAddress = request?.wallet_address;
      const externalAccountId = request?.external_account_id;
      const hasWallet = typeof walletAddress === "string" && walletAddress.length > 0;
      const hasExternal = typeof externalAccountId === "string" && externalAccountId.length > 0;
      if (hasWallet && hasExternal) {
        throw new Error("Provide either wallet_address or external_account_id, not both.");
      }
      const { body, headers } = extractIdempotency(request);
      return client.post(`${buildCustomerPath(customer_id!)}/withdrawals`, body, headers);
    }),
  "withdrawals.get": (input) =>
    runTool("withdrawals.get", async () => {
      const { customer_id, withdrawal_id } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/withdrawals/${withdrawal_id}`);
    }),
  "withdrawals.get_by_idempotency_key": (input) =>
    runTool("withdrawals.get_by_idempotency_key", async () => {
      const { customer_id, idempotency_key } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/withdrawals`, {
        idempotency_key,
      });
    }),
  "transactions.list": (input) =>
    runTool("transactions.list", async () => {
      const { customer_id, params } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/transactions`, params);
    }),
  "transactions.get": (input) =>
    runTool("transactions.get", async () => {
      const { customer_id, transaction_id } = input as RequestInput;
      return client.get(`${buildCustomerPath(customer_id!)}/transactions/${transaction_id}`);
    }),
  "simulations.simulate_deposit": (input) =>
    runTool("simulations.simulate_deposit", async () => {
      const { customer_id, request } = input as RequestInput;
      return client.post(`${buildCustomerPath(customer_id!)}/simulate-transactions`, request);
    }),
  "echo.get": () => runTool("echo.get", async () => client.get("/echo")),
  "echo.post": (input) =>
    runTool("echo.post", async () => {
      const { request } = input as RequestInput;
      return client.post("/echo", request);
    }),
});
