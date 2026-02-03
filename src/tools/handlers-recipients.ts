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

export const createRecipientsHandlers = (client: OneMoneyClient) =>
  ({
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
  }) satisfies Partial<Record<ToolName, ToolHandler>>;
