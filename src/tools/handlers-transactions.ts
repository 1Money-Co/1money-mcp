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

export const createTransactionsHandlers = (client: OneMoneyClient) =>
  ({
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
  }) satisfies Partial<Record<ToolName, ToolHandler>>;
