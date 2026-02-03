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

export const createCustomerAssociatedPersonsHandlers = (client: OneMoneyClient) =>
  ({
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
  }) satisfies Partial<Record<ToolName, ToolHandler>>;
