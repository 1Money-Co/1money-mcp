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

export const createRecipientsBankAccountsHandlers = (client: OneMoneyClient) =>
  ({
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
  }) satisfies Partial<Record<ToolName, ToolHandler>>;
