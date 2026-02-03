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
import { ApiError } from "../errors.js";

/**
 * MCP tool handler signature.
 */
export type ToolHandler = (input: unknown) => Promise<CallToolResult>;

export type RequestInput = {
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

export const runTool = async (toolName: string, action: () => Promise<unknown>) => {
  const data = await withApiError(toolName, action);
  return toToolResult(data);
};

export const extractIdempotency = (request?: Record<string, unknown>) => {
  if (!request || typeof request !== "object") {
    return { body: request, headers: undefined as Record<string, string> | undefined };
  }

  const { idempotency_key, ...body } = request;
  const headers = idempotency_key
    ? { "Idempotency-Key": String(idempotency_key) }
    : undefined;
  return { body, headers };
};

export const buildCustomerPath = (customerId: string) => `/v1/customers/${customerId}`;
