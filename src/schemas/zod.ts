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
import { z } from "zod";

export const toolSchemas = {} as Record<string, z.ZodTypeAny>;

const AssetsListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "asset": z.string().optional(), "network": z.string().optional(), "sort_order": z.string().optional() }).strict().optional() }).strict()
toolSchemas["assets.list"] = AssetsListSchema;

const CustomerCreateTosLinkSchema = z.object({ "request": z.object({ "redirect_url": z.string().optional() }).strict().optional() }).strict()
toolSchemas["customer.create_tos_link"] = CustomerCreateTosLinkSchema;

const CustomerSignTosAgreementSchema = z.object({ "session_token": z.string() }).strict()
toolSchemas["customer.sign_tos_agreement"] = CustomerSignTosAgreementSchema;

const CustomerCreateSchema = z.object({ "request": z.record(z.string(), z.any()) }).strict()
toolSchemas["customer.create"] = CustomerCreateSchema;

const CustomerListSchema = z.object({ "params": z.object({ "page_size": z.number().int().gte(1).optional(), "page_num": z.number().int().gte(0).optional(), "kyb_status": z.string().optional() }).strict().optional() }).strict()
toolSchemas["customer.list"] = CustomerListSchema;

const CustomerGetSchema = z.object({ "customer_id": z.string() }).strict()
toolSchemas["customer.get"] = CustomerGetSchema;

const CustomerUpdateSchema = z.object({ "customer_id": z.string(), "request": z.record(z.string(), z.any()) }).strict()
toolSchemas["customer.update"] = CustomerUpdateSchema;

const CustomerAssociatedPersonsCreateSchema = z.object({ "customer_id": z.string(), "request": z.record(z.string(), z.any()) }).strict()
toolSchemas["customer.associated_persons.create"] = CustomerAssociatedPersonsCreateSchema;

const CustomerAssociatedPersonsListSchema = z.object({ "customer_id": z.string() }).strict()
toolSchemas["customer.associated_persons.list"] = CustomerAssociatedPersonsListSchema;

const CustomerAssociatedPersonsGetSchema = z.object({ "customer_id": z.string(), "associated_person_id": z.string() }).strict()
toolSchemas["customer.associated_persons.get"] = CustomerAssociatedPersonsGetSchema;

const CustomerAssociatedPersonsUpdateSchema = z.object({ "customer_id": z.string(), "associated_person_id": z.string(), "request": z.record(z.string(), z.any()) }).strict()
toolSchemas["customer.associated_persons.update"] = CustomerAssociatedPersonsUpdateSchema;

const CustomerAssociatedPersonsDeleteSchema = z.object({ "customer_id": z.string(), "associated_person_id": z.string() }).strict()
toolSchemas["customer.associated_persons.delete"] = CustomerAssociatedPersonsDeleteSchema;

const ExternalAccountsCreateSchema = z.object({ "customer_id": z.string(), "request": z.record(z.string(), z.any()) }).strict()
toolSchemas["external_accounts.create"] = ExternalAccountsCreateSchema;

const ExternalAccountsGetSchema = z.object({ "customer_id": z.string(), "external_account_id": z.string() }).strict()
toolSchemas["external_accounts.get"] = ExternalAccountsGetSchema;

const ExternalAccountsGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["external_accounts.get_by_idempotency_key"] = ExternalAccountsGetByIdempotencyKeySchema;

const ExternalAccountsListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "currency": z.string().optional(), "network": z.string().optional() }).strict().optional() }).strict()
toolSchemas["external_accounts.list"] = ExternalAccountsListSchema;

const ExternalAccountsRemoveSchema = z.object({ "customer_id": z.string(), "external_account_id": z.string() }).strict()
toolSchemas["external_accounts.remove"] = ExternalAccountsRemoveSchema;

const InstructionsGetDepositInstructionSchema = z.object({ "customer_id": z.string(), "params": z.object({ "asset": z.string(), "network": z.string() }).strict() }).strict()
toolSchemas["instructions.get_deposit_instruction"] = InstructionsGetDepositInstructionSchema;

const ConversionsCreateQuoteSchema = z.object({ "customer_id": z.string(), "request": z.object({ "from_asset": z.record(z.string(), z.any()), "to_asset": z.record(z.string(), z.any()) }).strict() }).strict()
toolSchemas["conversions.create_quote"] = ConversionsCreateQuoteSchema;

const ConversionsCreateHedgeSchema = z.object({ "customer_id": z.string(), "request": z.object({ "quote_id": z.string() }).strict() }).strict()
toolSchemas["conversions.create_hedge"] = ConversionsCreateHedgeSchema;

const ConversionsGetOrderSchema = z.object({ "customer_id": z.string(), "order_id": z.string() }).strict()
toolSchemas["conversions.get_order"] = ConversionsGetOrderSchema;

const AutoConversionRulesCreateSchema = z.object({ "customer_id": z.string(), "request": z.record(z.string(), z.any()) }).strict()
toolSchemas["auto_conversion_rules.create"] = AutoConversionRulesCreateSchema;

const AutoConversionRulesGetSchema = z.object({ "customer_id": z.string(), "rule_id": z.string() }).strict()
toolSchemas["auto_conversion_rules.get"] = AutoConversionRulesGetSchema;

const AutoConversionRulesGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["auto_conversion_rules.get_by_idempotency_key"] = AutoConversionRulesGetByIdempotencyKeySchema;

const AutoConversionRulesListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "page": z.number().int().gte(1).optional(), "size": z.number().int().gte(1).optional() }).strict().optional() }).strict()
toolSchemas["auto_conversion_rules.list"] = AutoConversionRulesListSchema;

const AutoConversionRulesDeleteSchema = z.object({ "customer_id": z.string(), "rule_id": z.string() }).strict()
toolSchemas["auto_conversion_rules.delete"] = AutoConversionRulesDeleteSchema;

const AutoConversionRulesListOrdersSchema = z.object({ "customer_id": z.string(), "rule_id": z.string(), "params": z.object({ "status": z.string().optional(), "page": z.number().int().gte(1).optional(), "size": z.number().int().gte(1).optional() }).strict().optional() }).strict()
toolSchemas["auto_conversion_rules.list_orders"] = AutoConversionRulesListOrdersSchema;

const AutoConversionRulesGetOrderSchema = z.object({ "customer_id": z.string(), "rule_id": z.string(), "order_id": z.string() }).strict()
toolSchemas["auto_conversion_rules.get_order"] = AutoConversionRulesGetOrderSchema;

const WithdrawalsCreateSchema = z.object({ "customer_id": z.string(), "request": z.record(z.string(), z.any()) }).strict()
toolSchemas["withdrawals.create"] = WithdrawalsCreateSchema;

const WithdrawalsGetSchema = z.object({ "customer_id": z.string(), "withdrawal_id": z.string() }).strict()
toolSchemas["withdrawals.get"] = WithdrawalsGetSchema;

const WithdrawalsGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["withdrawals.get_by_idempotency_key"] = WithdrawalsGetByIdempotencyKeySchema;

const TransactionsListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "transaction_id": z.string().optional(), "asset": z.string().optional(), "created_after": z.string().optional(), "created_before": z.string().optional(), "page": z.number().int().gte(1).optional(), "size": z.number().int().gte(1).optional() }).strict().optional() }).strict()
toolSchemas["transactions.list"] = TransactionsListSchema;

const TransactionsGetSchema = z.object({ "customer_id": z.string(), "transaction_id": z.string() }).strict()
toolSchemas["transactions.get"] = TransactionsGetSchema;

const SimulationsSimulateDepositSchema = z.object({ "customer_id": z.string(), "request": z.object({ "asset": z.string(), "network": z.string().optional(), "amount": z.string(), "reference_code": z.string().optional() }).strict() }).strict()
toolSchemas["simulations.simulate_deposit"] = SimulationsSimulateDepositSchema;

const EchoGetSchema = z.object({}).strict()
toolSchemas["echo.get"] = EchoGetSchema;

const EchoPostSchema = z.object({ "request": z.object({ "message": z.string() }).strict() }).strict()
toolSchemas["echo.post"] = EchoPostSchema;

export type ToolName = keyof typeof toolSchemas;
