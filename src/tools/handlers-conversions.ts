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
import { buildCustomerPath, runTool, type RequestInput, type ToolHandler } from "./handlers-shared.js";

export const createConversionsHandlers = (client: OneMoneyClient) =>
  ({
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
  }) satisfies Partial<Record<ToolName, ToolHandler>>;
