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
import type { OneMoneyClient } from "../client.js";
import type { ToolName } from "../schemas/zod.js";
import {
  buildCustomerPath,
  extractIdempotency,
  runTool,
  type RequestInput,
  type ToolHandler,
} from "./handlers-shared.js";

export const createAutoConversionRulesHandlers = (client: OneMoneyClient) =>
  ({
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
  }) satisfies Partial<Record<ToolName, ToolHandler>>;
