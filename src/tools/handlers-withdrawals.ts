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

export const createWithdrawalsHandlers = (client: OneMoneyClient) =>
  ({
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
  }) satisfies Partial<Record<ToolName, ToolHandler>>;
