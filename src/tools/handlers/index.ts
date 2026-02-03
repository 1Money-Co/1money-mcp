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
import type { OneMoneyClient } from "../../client.js";
import type { ToolName } from "../../schemas/zod.js";
import { createAssetsHandlers } from "./assets.js";
import { createAutoConversionRulesHandlers } from "./auto-conversion-rules.js";
import { createConversionsHandlers } from "./conversions.js";
import { createCustomerAssociatedPersonsHandlers } from "./customer-associated-persons.js";
import { createCustomerHandlers } from "./customer.js";
import { createEchoHandlers } from "./echo.js";
import { createExternalAccountsHandlers } from "./external-accounts.js";
import { createInstructionsHandlers } from "./instructions.js";
import { createRecipientsBankAccountsHandlers } from "./recipients-bank-accounts.js";
import { createRecipientsHandlers } from "./recipients.js";
import { createSimulationsHandlers } from "./simulations.js";
import { createTransactionsHandlers } from "./transactions.js";
import type { ToolHandler } from "./shared.js";
import { createWithdrawalsHandlers } from "./withdrawals.js";

export type { ToolHandler } from "./shared.js";

/**
 * Builds the MCP tool handler map backed by the 1money client.
 */
export const createHandlers = (client: OneMoneyClient): Record<ToolName, ToolHandler> => ({
  ...createAssetsHandlers(client),
  ...createCustomerHandlers(client),
  ...createCustomerAssociatedPersonsHandlers(client),
  ...createExternalAccountsHandlers(client),
  ...createRecipientsHandlers(client),
  ...createRecipientsBankAccountsHandlers(client),
  ...createInstructionsHandlers(client),
  ...createConversionsHandlers(client),
  ...createAutoConversionRulesHandlers(client),
  ...createWithdrawalsHandlers(client),
  ...createTransactionsHandlers(client),
  ...createSimulationsHandlers(client),
  ...createEchoHandlers(client),
});
