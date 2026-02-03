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

export const createCustomerHandlers = (client: OneMoneyClient) =>
  ({
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
  }) satisfies Partial<Record<ToolName, ToolHandler>>;
