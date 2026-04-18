import { z } from "zod";

export const toolSchemas = {} as Record<string, z.ZodTypeAny>;

export const toolResponseSchemas = {} as Record<string, z.ZodTypeAny>;

const CustomerListSchema = z.object({ "params": z.object({ "page": z.union([z.number().int().gte(1), z.null()]).optional(), "size": z.union([z.number().int().gte(1).lte(100), z.null()]).optional(), "page_num": z.union([z.number().int().gte(0), z.null()]).optional(), "page_size": z.union([z.number().int().gte(0), z.null()]).optional(), "kyb_status": z.union([z.string(), z.null()]).optional() }).strict().optional() }).strict()
toolSchemas["customer.list"] = CustomerListSchema;

const CustomerCreateSchema = z.object({ "request": z.object({ "business_legal_name": z.string(), "business_description": z.string(), "business_registration_number": z.union([z.string(), z.null()]).optional(), "email": z.string(), "business_type": z.enum(["corporation","llc","partnership","sole_proprietorship","investment_fund","societies","trust","government","dao"]), "business_industry": z.string(), "registered_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() }), "date_of_incorporation": z.string(), "physical_address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "signed_agreement_id": z.union([z.string(), z.null()]).optional(), "terms_signed_at": z.union([z.string(), z.null()]).optional(), "associated_persons": z.array(z.object({ "first_name": z.string(), "middle_name": z.union([z.string(), z.null()]).optional(), "last_name": z.string(), "email": z.string(), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() }), "birth_date": z.string(), "primary_nationality": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.union([z.number(), z.null()]).optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "identifying_information": z.array(z.object({ "type": z.enum(["drivers_license","permanent_residency_id","national_id","passport","other"]), "issuing_country": z.string(), "national_identity_number": z.string(), "image_front": z.string(), "image_back": z.string() })), "dual_nationality": z.union([z.string(), z.null()]).optional(), "country_of_tax": z.union([z.string(), z.null()]).optional(), "tax_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","OTHER","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "tax_id": z.union([z.string(), z.null()]).optional(), "poa": z.string(), "poa_type": z.string() })), "intermediaries": z.union([z.array(z.object({ "entity_name": z.string(), "country": z.string(), "ownership": z.number() })), z.null()]).optional(), "account_purpose": z.enum(["charitable_donations","ecommerce_retail_payments","investment_purposes","other","payments_to_friends_or_family_abroad","payroll","personal_or_living_expenses","protect_wealth","purchase_goods_and_services","receive_payments_for_goods_and_services","tax_optimization","third_party_money_transmission","treasury_management"]), "source_of_funds": z.array(z.enum(["business_loans","grants","inter_company_funds","investment_proceeds","legal_settlement","owners_capital","pension_retirement","sale_of_assets","sales_of_goods_and_services","tax_refund","third_party_funds","treasury_reserves"])), "source_of_wealth": z.array(z.enum(["business_dividends_or_profits","investments","asset_sales","client_investor_contributions","gambling","charitable_contributions","inheritance","affiliate_or_royalty_income"])), "documents": z.array(z.object({ "doc_type": z.enum(["aml_comfort_letter","constitutional_document","directors_registry","cert_of_incumbency","e_signature_certificate","evidence_of_good_standing","flow_of_funds","formation_document","marketing_materials","other","ownership_chart","ownership_information","proof_of_account_purpose","proof_of_address","proof_of_entity_name_change","proof_of_nature_of_business","proof_of_nature_of_business_license","proof_of_nature_of_business_aml_policy","proof_of_signatory_authority","proof_of_source_of_funds","proof_of_source_of_wealth","proof_of_tax_identification","registration_document","shareholder_register","evidence_of_directors_and_controllers","tax_exempt_entity_confirmation"]), "file": z.string() })), "primary_website": z.union([z.string(), z.null()]).optional(), "publicly_traded": z.boolean(), "estimated_annual_revenue_usd": z.enum(["0_99999","100000_999999","1000000_9999999","10000000_49999999","50000000_249999999","2500000000_plus"]), "expected_monthly_fiat_deposits": z.enum(["0_99999","100000_999999","1000000_9999999","10000000_49999999","50000000_249999999","2500000000_plus"]), "expected_monthly_fiat_withdrawals": z.enum(["0_99999","100000_999999","1000000_9999999","10000000_49999999","50000000_249999999","2500000000_plus"]), "account_purpose_other": z.union([z.string(), z.null()]).optional(), "high_risk_activities": z.union([z.array(z.enum(["adult_entertainment","gambling","hold_client_funds","investment_services","lending_banking","marijuana_or_related_services","money_services","nicotine_tobacco_or_related_services","operate_foreign_exchange_virtual_currencies_brokerage_otc","pharmaceuticals","precious_metals_precious_stones_jewelry","safe_deposit_box_rentals","third_party_payment_processing","weapons_firearms_and_explosives","none_of_the_above"])), z.null()]).optional(), "high_risk_activities_explanation": z.union([z.string(), z.null()]).optional(), "tax_country": z.string(), "tax_id": z.string(), "tax_type": z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","OTHER","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"]) }).strict() }).strict()
toolSchemas["customer.create"] = CustomerCreateSchema;

const CustomerGetSchema = z.object({ "customer_id": z.string() }).strict()
toolSchemas["customer.get"] = CustomerGetSchema;

const CustomerUpdateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "business_legal_name": z.union([z.string(), z.null()]).optional(), "business_description": z.union([z.string(), z.null()]).optional(), "business_registration_number": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "business_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["corporation","llc","partnership","sole_proprietorship","investment_fund","societies","trust","government","dao"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "business_industry": z.union([z.string(), z.null()]).optional(), "registered_address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "date_of_incorporation": z.union([z.string(), z.null()]).optional(), "physical_address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "signed_agreement_id": z.union([z.string(), z.null()]).optional(), "associated_persons": z.union([z.array(z.object({ "first_name": z.string(), "middle_name": z.union([z.string(), z.null()]).optional(), "last_name": z.string(), "email": z.string(), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() }), "birth_date": z.string(), "primary_nationality": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.union([z.number(), z.null()]).optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "identifying_information": z.array(z.object({ "type": z.enum(["drivers_license","permanent_residency_id","national_id","passport","other"]), "issuing_country": z.string(), "national_identity_number": z.string(), "image_front": z.string(), "image_back": z.string() })), "dual_nationality": z.union([z.string(), z.null()]).optional(), "country_of_tax": z.union([z.string(), z.null()]).optional(), "tax_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","OTHER","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "tax_id": z.union([z.string(), z.null()]).optional(), "poa": z.string(), "poa_type": z.string() })), z.null()]).optional(), "account_purpose": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["charitable_donations","ecommerce_retail_payments","investment_purposes","other","payments_to_friends_or_family_abroad","payroll","personal_or_living_expenses","protect_wealth","purchase_goods_and_services","receive_payments_for_goods_and_services","tax_optimization","third_party_money_transmission","treasury_management"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "source_of_funds": z.union([z.array(z.enum(["business_loans","grants","inter_company_funds","investment_proceeds","legal_settlement","owners_capital","pension_retirement","sale_of_assets","sales_of_goods_and_services","tax_refund","third_party_funds","treasury_reserves"])), z.null()]).optional(), "source_of_wealth": z.union([z.array(z.enum(["business_dividends_or_profits","investments","asset_sales","client_investor_contributions","gambling","charitable_contributions","inheritance","affiliate_or_royalty_income"])), z.null()]).optional(), "documents": z.union([z.array(z.object({ "doc_type": z.enum(["aml_comfort_letter","constitutional_document","directors_registry","cert_of_incumbency","e_signature_certificate","evidence_of_good_standing","flow_of_funds","formation_document","marketing_materials","other","ownership_chart","ownership_information","proof_of_account_purpose","proof_of_address","proof_of_entity_name_change","proof_of_nature_of_business","proof_of_nature_of_business_license","proof_of_nature_of_business_aml_policy","proof_of_signatory_authority","proof_of_source_of_funds","proof_of_source_of_wealth","proof_of_tax_identification","registration_document","shareholder_register","evidence_of_directors_and_controllers","tax_exempt_entity_confirmation"]), "file": z.string() })), z.null()]).optional(), "primary_website": z.union([z.string(), z.null()]).optional(), "publicly_traded": z.union([z.boolean(), z.null()]).optional(), "estimated_annual_revenue_usd": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["0_99999","100000_999999","1000000_9999999","10000000_49999999","50000000_249999999","2500000000_plus"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "expected_monthly_fiat_deposits": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["0_99999","100000_999999","1000000_9999999","10000000_49999999","50000000_249999999","2500000000_plus"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "expected_monthly_fiat_withdrawals": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["0_99999","100000_999999","1000000_9999999","10000000_49999999","50000000_249999999","2500000000_plus"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "account_purpose_other": z.union([z.string(), z.null()]).optional(), "high_risk_activities": z.union([z.array(z.enum(["adult_entertainment","gambling","hold_client_funds","investment_services","lending_banking","marijuana_or_related_services","money_services","nicotine_tobacco_or_related_services","operate_foreign_exchange_virtual_currencies_brokerage_otc","pharmaceuticals","precious_metals_precious_stones_jewelry","safe_deposit_box_rentals","third_party_payment_processing","weapons_firearms_and_explosives","none_of_the_above"])), z.null()]).optional(), "high_risk_activities_explanation": z.union([z.string(), z.null()]).optional(), "tax_country": z.union([z.string(), z.null()]).optional(), "tax_id": z.union([z.string(), z.null()]).optional(), "tax_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","OTHER","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }).strict() }).strict()
toolSchemas["customer.update"] = CustomerUpdateSchema;

const CustomerAssociatedPersonsListSchema = z.object({ "customer_id": z.string() }).strict()
toolSchemas["customer.associated_persons.list"] = CustomerAssociatedPersonsListSchema;

const CustomerAssociatedPersonsCreateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "first_name": z.string(), "middle_name": z.union([z.string(), z.null()]).optional(), "last_name": z.string(), "email": z.string(), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() }), "birth_date": z.string(), "primary_nationality": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.union([z.number(), z.null()]).optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "identifying_information": z.array(z.object({ "type": z.enum(["drivers_license","permanent_residency_id","national_id","passport","other"]), "issuing_country": z.string(), "national_identity_number": z.string(), "image_front": z.string(), "image_back": z.string() })), "dual_nationality": z.union([z.string(), z.null()]).optional(), "country_of_tax": z.union([z.string(), z.null()]).optional(), "tax_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","OTHER","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "tax_id": z.union([z.string(), z.null()]).optional(), "poa": z.string(), "poa_type": z.string() }) }).strict()
toolSchemas["customer.associated_persons.create"] = CustomerAssociatedPersonsCreateSchema;

const CustomerAssociatedPersonsGetSchema = z.object({ "customer_id": z.string(), "associated_person_id": z.string() }).strict()
toolSchemas["customer.associated_persons.get"] = CustomerAssociatedPersonsGetSchema;

const CustomerAssociatedPersonsUpdateSchema = z.object({ "customer_id": z.string(), "associated_person_id": z.string(), "request": z.object({ "first_name": z.union([z.string(), z.null()]).optional(), "middle_name": z.union([z.string(), z.null()]).optional(), "last_name": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "residential_address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "birth_date": z.union([z.string(), z.null()]).optional(), "primary_nationality": z.union([z.string(), z.null()]).optional(), "has_ownership": z.union([z.boolean(), z.null()]).optional(), "ownership_percentage": z.union([z.number(), z.null()]).optional(), "has_control": z.union([z.boolean(), z.null()]).optional(), "is_signer": z.union([z.boolean(), z.null()]).optional(), "is_director": z.union([z.boolean(), z.null()]).optional(), "identifying_information": z.union([z.array(z.object({ "type": z.enum(["drivers_license","permanent_residency_id","national_id","passport","other"]), "issuing_country": z.string(), "national_identity_number": z.string(), "image_front": z.string(), "image_back": z.string() })), z.null()]).optional(), "dual_nationality": z.union([z.string(), z.null()]).optional(), "country_of_tax": z.union([z.string(), z.null()]).optional(), "tax_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","OTHER","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "tax_id": z.union([z.string(), z.null()]).optional(), "poa": z.union([z.string(), z.null()]).optional(), "poa_type": z.union([z.string(), z.null()]).optional() }).strict() }).strict()
toolSchemas["customer.associated_persons.update"] = CustomerAssociatedPersonsUpdateSchema;

const CustomerAssociatedPersonsDeleteSchema = z.object({ "customer_id": z.string(), "associated_person_id": z.string() }).strict()
toolSchemas["customer.associated_persons.delete"] = CustomerAssociatedPersonsDeleteSchema;

const CustomerIntermediariesListSchema = z.object({ "customer_id": z.string() }).strict()
toolSchemas["customer.intermediaries.list"] = CustomerIntermediariesListSchema;

const CustomerIntermediariesCreateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "entity_name": z.string(), "country": z.string(), "ownership": z.number() }).strict() }).strict()
toolSchemas["customer.intermediaries.create"] = CustomerIntermediariesCreateSchema;

const CustomerIntermediariesGetSchema = z.object({ "customer_id": z.string(), "intermediary_id": z.string() }).strict()
toolSchemas["customer.intermediaries.get"] = CustomerIntermediariesGetSchema;

const CustomerIntermediariesUpdateSchema = z.object({ "customer_id": z.string(), "intermediary_id": z.string(), "request": z.object({ "entity_name": z.union([z.string(), z.null()]).optional(), "country": z.union([z.string(), z.null()]).optional(), "ownership": z.union([z.number(), z.null()]).optional() }).strict() }).strict()
toolSchemas["customer.intermediaries.update"] = CustomerIntermediariesUpdateSchema;

const CustomerIntermediariesDeleteSchema = z.object({ "customer_id": z.string(), "intermediary_id": z.string() }).strict()
toolSchemas["customer.intermediaries.delete"] = CustomerIntermediariesDeleteSchema;

const CustomerCreateTosLinkSchema = z.object({ "request": z.object({ "redirect_url": z.string() }).strict() }).strict()
toolSchemas["customer.create_tos_link"] = CustomerCreateTosLinkSchema;

const CustomerLightweightGetByIdempotencyKeySchema = z.object({ "idempotency_key": z.string() }).strict()
toolSchemas["customer.lightweight.get_by_idempotency_key"] = CustomerLightweightGetByIdempotencyKeySchema;

const CustomerLightweightCreateSchema = z.object({ "request": z.object({ "email": z.string(), "first_name": z.string().min(1).max(255), "last_name": z.string().min(1).max(255), "company_name": z.union([z.string().min(1).max(100), z.null()]).optional(), "customer_type": z.enum(["Business","Individual"]) }).strict() }).strict()
toolSchemas["customer.lightweight.create"] = CustomerLightweightCreateSchema;

const CustomerOnboardingLinksCreateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "redirect_url": z.union([z.string(), z.null()]).optional(), "locale": z.union([z.string(), z.null()]).default("en-US") }).strict() }).strict()
toolSchemas["customer.onboarding_links.create"] = CustomerOnboardingLinksCreateSchema;

const CustomerLightweightGetSchema = z.object({ "customer_id": z.string() }).strict()
toolSchemas["customer.lightweight.get"] = CustomerLightweightGetSchema;

const CustomerOnboardingGrantsCreateSchema = z.object({ "request": z.object({ "customer_id": z.string(), "redirect_url": z.union([z.string(), z.null()]).optional(), "locale": z.union([z.string(), z.null()]).default("en-US") }).strict() }).strict()
toolSchemas["customer.onboarding_grants.create"] = CustomerOnboardingGrantsCreateSchema;

const AssetsListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "sort_order": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["ASC","DESC"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }).strict().optional() }).strict()
toolSchemas["assets.list"] = AssetsListSchema;

const ExternalAccountsListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "currency": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "include_recipient": z.boolean().optional() }).strict().optional() }).strict()
toolSchemas["external_accounts.list"] = ExternalAccountsListSchema;

const ExternalAccountsGetSchema = z.object({ "customer_id": z.string(), "external_account_id": z.string() }).strict()
toolSchemas["external_accounts.get"] = ExternalAccountsGetSchema;

const ExternalAccountsRemoveSchema = z.object({ "customer_id": z.string(), "external_account_id": z.string() }).strict()
toolSchemas["external_accounts.remove"] = ExternalAccountsRemoveSchema;

const ExternalAccountsGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["external_accounts.get_by_idempotency_key"] = ExternalAccountsGetByIdempotencyKeySchema;

const ExternalAccountsCreateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "network": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","XKX","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_clearing_code": z.union([z.string(), z.null()]).optional(), "intermediary_bank": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "institution_id": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "idempotency_key": z.string().optional() }).strict() }).strict()
toolSchemas["external_accounts.create"] = ExternalAccountsCreateSchema;

const InstructionsGetDepositInstructionSchema = z.object({ "customer_id": z.string(), "params": z.object({ "asset": z.string(), "network": z.string() }).strict() }).strict()
toolSchemas["instructions.get_deposit_instruction"] = InstructionsGetDepositInstructionSchema;

const InstructionsCryptoListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "page": z.number().int().gte(1).optional(), "size": z.number().int().gte(1).lte(100).optional() }).strict().optional() }).strict()
toolSchemas["instructions.crypto.list"] = InstructionsCryptoListSchema;

const InstructionsCryptoGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["instructions.crypto.get_by_idempotency_key"] = InstructionsCryptoGetByIdempotencyKeySchema;

const InstructionsCryptoCreateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "network": z.string(), "nickname": z.union([z.string(), z.null()]).optional() }).strict() }).strict()
toolSchemas["instructions.crypto.create"] = InstructionsCryptoCreateSchema;

const InstructionsCryptoGetSchema = z.object({ "customer_id": z.string(), "deposit_instruction_id": z.string() }).strict()
toolSchemas["instructions.crypto.get"] = InstructionsCryptoGetSchema;

const AutoConversionRulesListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "page": z.number().int().gte(1).optional(), "size": z.number().int().gte(1).lte(100).optional() }).strict().optional() }).strict()
toolSchemas["auto_conversion_rules.list"] = AutoConversionRulesListSchema;

const AutoConversionRulesGetSchema = z.object({ "customer_id": z.string(), "auto_conversion_rule_id": z.string() }).strict()
toolSchemas["auto_conversion_rules.get"] = AutoConversionRulesGetSchema;

const AutoConversionRulesDeleteSchema = z.object({ "customer_id": z.string(), "auto_conversion_rule_id": z.string() }).strict()
toolSchemas["auto_conversion_rules.delete"] = AutoConversionRulesDeleteSchema;

const AutoConversionRulesGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["auto_conversion_rules.get_by_idempotency_key"] = AutoConversionRulesGetByIdempotencyKeySchema;

const AutoConversionRulesCreateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "source": z.object({ "asset": z.string(), "network": z.string() }), "destination": z.object({ "asset": z.string(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), "idempotency_key": z.string().optional() }).strict() }).strict()
toolSchemas["auto_conversion_rules.create"] = AutoConversionRulesCreateSchema;

const AutoConversionRulesListOrdersSchema = z.object({ "customer_id": z.string(), "auto_conversion_rule_id": z.string(), "params": z.object({ "status": z.string().optional(), "page": z.number().int().gte(1).optional(), "size": z.number().int().gte(1).lte(100).optional() }).strict().optional() }).strict()
toolSchemas["auto_conversion_rules.list_orders"] = AutoConversionRulesListOrdersSchema;

const AutoConversionRulesGetOrderSchema = z.object({ "customer_id": z.string(), "auto_conversion_rule_id": z.string(), "order_id": z.string() }).strict()
toolSchemas["auto_conversion_rules.get_order"] = AutoConversionRulesGetOrderSchema;

const WithdrawalsGetSchema = z.object({ "customer_id": z.string(), "transaction_id": z.string() }).strict()
toolSchemas["withdrawals.get"] = WithdrawalsGetSchema;

const WithdrawalsGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["withdrawals.get_by_idempotency_key"] = WithdrawalsGetByIdempotencyKeySchema;

const WithdrawalsCreateSchema = z.object({ "customer_id": z.string(), "request": z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.intersection(z.object({ "amount": z.string(), "asset": z.string(), "network": z.string(), "code": z.union([z.string(), z.null()]).optional(), "memorandum": z.union([z.string().max(256), z.null()]).optional(), "mode": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.literal("prefunding")];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "on_behalf_of": z.union([z.string(), z.null()]).optional(), "amount_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SEND_AMOUNT","RECEIVE_AMOUNT"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }), z.object({ "idempotency_key": z.string().optional() }))) }).strict()
toolSchemas["withdrawals.create"] = WithdrawalsCreateSchema;

const ConversionsCreateQuoteSchema = z.object({ "customer_id": z.string(), "request": z.object({ "from_asset": z.object({ "amount": z.union([z.string(), z.null()]).optional(), "asset": z.string() }), "to_asset": z.object({ "amount": z.union([z.string(), z.null()]).optional(), "asset": z.string() }) }).strict() }).strict()
toolSchemas["conversions.create_quote"] = ConversionsCreateQuoteSchema;

const ConversionsCreateHedgeSchema = z.object({ "customer_id": z.string(), "request": z.object({ "quote_id": z.string() }).strict() }).strict()
toolSchemas["conversions.create_hedge"] = ConversionsCreateHedgeSchema;

const ConversionsGetOrderSchema = z.object({ "customer_id": z.string(), "transaction_id": z.string() }).strict()
toolSchemas["conversions.get_order"] = ConversionsGetOrderSchema;

const TransactionsListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "transaction_action": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["DEPOSIT","WITHDRAWAL","CONVERSION","AUTO_CONVERSION","TRANSFER"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "transaction_id": z.union([z.string(), z.null()]).optional(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_after": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_before": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "include_subaccounts": z.union([z.boolean(), z.null()]).optional(), "page": z.number().int().gte(1).optional(), "size": z.number().int().gte(1).lte(100).optional() }).strict().optional() }).strict()
toolSchemas["transactions.list"] = TransactionsListSchema;

const TransactionsGetSchema = z.object({ "customer_id": z.string(), "transaction_id": z.string() }).strict()
toolSchemas["transactions.get"] = TransactionsGetSchema;

const TransfersGetSchema = z.object({ "customer_id": z.string(), "transaction_id": z.string() }).strict()
toolSchemas["transfers.get"] = TransfersGetSchema;

const TransfersGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["transfers.get_by_idempotency_key"] = TransfersGetByIdempotencyKeySchema;

const TransfersCreateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "amount": z.string(), "asset": z.string(), "target_customer_id": z.string(), "memorandum": z.union([z.string().max(255), z.null()]).optional() }).strict() }).strict()
toolSchemas["transfers.create"] = TransfersCreateSchema;

const FeesEstimateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "action": z.enum(["DEPOSIT","WITHDRAWAL","CONVERSION","AUTO_CONVERSION","TRANSFER"]), "amount": z.string(), "asset": z.string(), "network": z.string() }).strict() }).strict()
toolSchemas["fees.estimate"] = FeesEstimateSchema;

const SimulationsSimulateTransactionSchema = z.object({ "customer_id": z.string(), "request": z.object({ "asset": z.string(), "network": z.string(), "amount": z.string(), "reference_code": z.union([z.string(), z.null()]).optional(), "simulate_status": z.union([z.string(), z.null()]).optional() }).strict() }).strict()
toolSchemas["simulations.simulate_transaction"] = SimulationsSimulateTransactionSchema;

const RecipientsGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["recipients.get_by_idempotency_key"] = RecipientsGetByIdempotencyKeySchema;

const RecipientsCreateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "business_type": z.string(), "first_name": z.union([z.string(), z.null()]).optional(), "last_name": z.union([z.string(), z.null()]).optional(), "company_name": z.union([z.string(), z.null()]).optional(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "mobile_code": z.union([z.string(), z.null()]).optional(), "mobile_num": z.union([z.string(), z.null()]).optional(), "relationship": z.enum(["EMPLOYEE","CONTRACTOR","VENDOR","SUBSIDIARY","MERCHANT","CUSTOMER","LANDLORD","FAMILY","OTHER","Unknown"]), "address": z.object({ "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","XKX","YEM","MYT","ZAF","ZMB","ZWE"]), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() }), "bank_accounts": z.union([z.array(z.object({ "network": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","XKX","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_clearing_code": z.union([z.string(), z.null()]).optional(), "intermediary_bank": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "institution_id": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() })), z.null()]).optional(), "idempotency_key": z.string() }).strict() }).strict()
toolSchemas["recipients.create"] = RecipientsCreateSchema;

const RecipientsListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "search": z.union([z.string(), z.null()]).optional(), "page": z.number().int().gte(1).optional(), "size": z.number().int().gte(1).lte(100).optional() }).strict().optional() }).strict()
toolSchemas["recipients.list"] = RecipientsListSchema;

const RecipientsGetSchema = z.object({ "customer_id": z.string(), "recipient_id": z.string() }).strict()
toolSchemas["recipients.get"] = RecipientsGetSchema;

const RecipientsUpdateSchema = z.object({ "customer_id": z.string(), "recipient_id": z.string(), "request": z.object({ "first_name": z.union([z.string(), z.null()]).optional(), "last_name": z.union([z.string(), z.null()]).optional(), "company_name": z.union([z.string(), z.null()]).optional(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "mobile_code": z.union([z.string(), z.null()]).optional(), "mobile_num": z.union([z.string(), z.null()]).optional(), "relationship": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["EMPLOYEE","CONTRACTOR","VENDOR","SUBSIDIARY","MERCHANT","CUSTOMER","LANDLORD","FAMILY","OTHER","Unknown"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","XKX","YEM","MYT","ZAF","ZMB","ZWE"]), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }).strict() }).strict()
toolSchemas["recipients.update"] = RecipientsUpdateSchema;

const RecipientsDeleteSchema = z.object({ "customer_id": z.string(), "recipient_id": z.string() }).strict()
toolSchemas["recipients.delete"] = RecipientsDeleteSchema;

const RecipientsGetByExternalAccountSchema = z.object({ "customer_id": z.string(), "external_account_id": z.string() }).strict()
toolSchemas["recipients.get_by_external_account"] = RecipientsGetByExternalAccountSchema;

const RecipientsBankAccountsGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "recipient_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["recipients.bank_accounts.get_by_idempotency_key"] = RecipientsBankAccountsGetByIdempotencyKeySchema;

const RecipientsBankAccountsCreateSchema = z.object({ "customer_id": z.string(), "recipient_id": z.string(), "request": z.object({ "network": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","XKX","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_clearing_code": z.union([z.string(), z.null()]).optional(), "intermediary_bank": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "institution_id": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "idempotency_key": z.string() }).strict() }).strict()
toolSchemas["recipients.bank_accounts.create"] = RecipientsBankAccountsCreateSchema;

const RecipientsBankAccountsListSchema = z.object({ "customer_id": z.string(), "recipient_id": z.string(), "params": z.object({ "currency": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "include_recipient": z.boolean().optional() }).strict().optional() }).strict()
toolSchemas["recipients.bank_accounts.list"] = RecipientsBankAccountsListSchema;

const RecipientsBankAccountsUpdateSchema = z.object({ "customer_id": z.string(), "recipient_id": z.string(), "bank_account_id": z.string(), "request": z.object({ "nickname": z.union([z.string(), z.null()]).optional(), "reference_code": z.union([z.string(), z.null()]).optional() }).strict() }).strict()
toolSchemas["recipients.bank_accounts.update"] = RecipientsBankAccountsUpdateSchema;

const RecipientsBankAccountsDeleteSchema = z.object({ "customer_id": z.string(), "recipient_id": z.string(), "bank_account_id": z.string() }).strict()
toolSchemas["recipients.bank_accounts.delete"] = RecipientsBankAccountsDeleteSchema;

const CustomerSignTosAgreementSchema = z.object({ "session_token": z.string() }).strict()
toolSchemas["customer.sign_tos_agreement"] = CustomerSignTosAgreementSchema;

const EchoGetSchema = z.object({}).strict()
toolSchemas["echo.get"] = EchoGetSchema;

const EchoPostSchema = z.object({ "request": z.object({ "message": z.string() }).strict() }).strict()
toolSchemas["echo.post"] = EchoPostSchema;

const CustomerListResponseSchema = z.object({ "customers": z.array(z.object({ "customer_id": z.string(), "email": z.string(), "business_legal_name": z.string(), "business_description": z.union([z.string(), z.null()]).optional(), "business_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["corporation","llc","partnership","sole_proprietorship","investment_fund","societies","trust","government","dao"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "business_industry": z.union([z.string(), z.null()]).optional(), "business_registration_number": z.union([z.string(), z.null()]).optional(), "date_of_incorporation": z.union([z.string(), z.null()]).optional(), "incorporation_country": z.union([z.string(), z.null()]).optional(), "incorporation_state": z.union([z.string(), z.null()]).optional(), "registered_address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "physical_address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "primary_website": z.union([z.string(), z.null()]).optional(), "publicly_traded": z.union([z.boolean(), z.null()]).optional(), "tax_id": z.union([z.string(), z.null()]).optional(), "tax_type": z.union([z.string(), z.null()]).optional(), "tax_country": z.union([z.string(), z.null()]).optional(), "status": z.enum(["INIT","PENDING_REVIEW","UNDER_REVIEW","PENDING_RESPONSE","ESCALATED","PENDING_APPROVAL","REJECTED","APPROVED","PROVISIONING"]), "review_issues": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "company_issues": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "company_name": z.union([z.string(), z.null()]).optional(), "reject_reason": z.string().optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "associated_person_issues": z.array(z.object({ "associated_person_id": z.string(), "name": z.union([z.string(), z.null()]).optional(), "reject_reason": z.string().optional() })).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "submitted_at": z.union([z.string(), z.null()]).optional(), "created_at": z.string(), "updated_at": z.string(), "associated_persons": z.array(z.object({ "associated_person_id": z.string(), "email": z.string(), "first_name": z.string(), "middle_name": z.union([z.string(), z.null()]).optional(), "last_name": z.string(), "birth_date": z.string(), "primary_nationality": z.string(), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() }), "applicant_type": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.union([z.number(), z.null()]).optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "created_at": z.string(), "updated_at": z.string() })) })), "total": z.number().int().gte(0) }).strict()
toolResponseSchemas["customer.list"] = CustomerListResponseSchema;

const CustomerCreateResponseSchema = z.object({ "customer_id": z.string(), "email": z.string(), "business_legal_name": z.string(), "business_description": z.union([z.string(), z.null()]).optional(), "business_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["corporation","llc","partnership","sole_proprietorship","investment_fund","societies","trust","government","dao"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "business_industry": z.union([z.string(), z.null()]).optional(), "business_registration_number": z.union([z.string(), z.null()]).optional(), "date_of_incorporation": z.union([z.string(), z.null()]).optional(), "incorporation_country": z.union([z.string(), z.null()]).optional(), "incorporation_state": z.union([z.string(), z.null()]).optional(), "registered_address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "physical_address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "primary_website": z.union([z.string(), z.null()]).optional(), "publicly_traded": z.union([z.boolean(), z.null()]).optional(), "tax_id": z.union([z.string(), z.null()]).optional(), "tax_type": z.union([z.string(), z.null()]).optional(), "tax_country": z.union([z.string(), z.null()]).optional(), "status": z.enum(["INIT","PENDING_REVIEW","UNDER_REVIEW","PENDING_RESPONSE","ESCALATED","PENDING_APPROVAL","REJECTED","APPROVED","PROVISIONING"]), "review_issues": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "company_issues": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "company_name": z.union([z.string(), z.null()]).optional(), "reject_reason": z.string().optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "associated_person_issues": z.array(z.object({ "associated_person_id": z.string(), "name": z.union([z.string(), z.null()]).optional(), "reject_reason": z.string().optional() })).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "submitted_at": z.union([z.string(), z.null()]).optional(), "created_at": z.string(), "updated_at": z.string(), "associated_persons": z.array(z.object({ "associated_person_id": z.string(), "email": z.string(), "first_name": z.string(), "middle_name": z.union([z.string(), z.null()]).optional(), "last_name": z.string(), "birth_date": z.string(), "primary_nationality": z.string(), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() }), "applicant_type": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.union([z.number(), z.null()]).optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "created_at": z.string(), "updated_at": z.string() })) }).strict()
toolResponseSchemas["customer.create"] = CustomerCreateResponseSchema;

const CustomerGetResponseSchema = z.object({ "customer_id": z.string(), "email": z.string(), "business_legal_name": z.string(), "business_description": z.union([z.string(), z.null()]).optional(), "business_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["corporation","llc","partnership","sole_proprietorship","investment_fund","societies","trust","government","dao"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "business_industry": z.union([z.string(), z.null()]).optional(), "business_registration_number": z.union([z.string(), z.null()]).optional(), "date_of_incorporation": z.union([z.string(), z.null()]).optional(), "incorporation_country": z.union([z.string(), z.null()]).optional(), "incorporation_state": z.union([z.string(), z.null()]).optional(), "registered_address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "physical_address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "primary_website": z.union([z.string(), z.null()]).optional(), "publicly_traded": z.union([z.boolean(), z.null()]).optional(), "tax_id": z.union([z.string(), z.null()]).optional(), "tax_type": z.union([z.string(), z.null()]).optional(), "tax_country": z.union([z.string(), z.null()]).optional(), "status": z.enum(["INIT","PENDING_REVIEW","UNDER_REVIEW","PENDING_RESPONSE","ESCALATED","PENDING_APPROVAL","REJECTED","APPROVED","PROVISIONING"]), "review_issues": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "company_issues": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "company_name": z.union([z.string(), z.null()]).optional(), "reject_reason": z.string().optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "associated_person_issues": z.array(z.object({ "associated_person_id": z.string(), "name": z.union([z.string(), z.null()]).optional(), "reject_reason": z.string().optional() })).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "submitted_at": z.union([z.string(), z.null()]).optional(), "created_at": z.string(), "updated_at": z.string(), "associated_persons": z.array(z.object({ "associated_person_id": z.string(), "email": z.string(), "first_name": z.string(), "middle_name": z.union([z.string(), z.null()]).optional(), "last_name": z.string(), "birth_date": z.string(), "primary_nationality": z.string(), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() }), "applicant_type": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.union([z.number(), z.null()]).optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "created_at": z.string(), "updated_at": z.string() })) }).strict()
toolResponseSchemas["customer.get"] = CustomerGetResponseSchema;

const CustomerUpdateResponseSchema = z.object({ "customer_id": z.string(), "email": z.string(), "business_legal_name": z.string(), "business_description": z.union([z.string(), z.null()]).optional(), "business_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["corporation","llc","partnership","sole_proprietorship","investment_fund","societies","trust","government","dao"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "business_industry": z.union([z.string(), z.null()]).optional(), "business_registration_number": z.union([z.string(), z.null()]).optional(), "date_of_incorporation": z.union([z.string(), z.null()]).optional(), "incorporation_country": z.union([z.string(), z.null()]).optional(), "incorporation_state": z.union([z.string(), z.null()]).optional(), "registered_address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "physical_address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "primary_website": z.union([z.string(), z.null()]).optional(), "publicly_traded": z.union([z.boolean(), z.null()]).optional(), "tax_id": z.union([z.string(), z.null()]).optional(), "tax_type": z.union([z.string(), z.null()]).optional(), "tax_country": z.union([z.string(), z.null()]).optional(), "status": z.enum(["INIT","PENDING_REVIEW","UNDER_REVIEW","PENDING_RESPONSE","ESCALATED","PENDING_APPROVAL","REJECTED","APPROVED","PROVISIONING"]), "review_issues": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "company_issues": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "company_name": z.union([z.string(), z.null()]).optional(), "reject_reason": z.string().optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "associated_person_issues": z.array(z.object({ "associated_person_id": z.string(), "name": z.union([z.string(), z.null()]).optional(), "reject_reason": z.string().optional() })).optional() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "submitted_at": z.union([z.string(), z.null()]).optional(), "created_at": z.string(), "updated_at": z.string(), "associated_persons": z.array(z.object({ "associated_person_id": z.string(), "email": z.string(), "first_name": z.string(), "middle_name": z.union([z.string(), z.null()]).optional(), "last_name": z.string(), "birth_date": z.string(), "primary_nationality": z.string(), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() }), "applicant_type": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.union([z.number(), z.null()]).optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "created_at": z.string(), "updated_at": z.string() })) }).strict()
toolResponseSchemas["customer.update"] = CustomerUpdateResponseSchema;

const CustomerAssociatedPersonsListResponseSchema = z.array(z.object({ "associated_person_id": z.string(), "email": z.string(), "first_name": z.string(), "middle_name": z.union([z.string(), z.null()]).optional(), "last_name": z.string(), "birth_date": z.string(), "primary_nationality": z.string(), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() }), "applicant_type": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.union([z.number(), z.null()]).optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "created_at": z.string(), "updated_at": z.string() }))
toolResponseSchemas["customer.associated_persons.list"] = CustomerAssociatedPersonsListResponseSchema;

const CustomerAssociatedPersonsCreateResponseSchema = z.object({ "associated_person_id": z.string(), "email": z.string(), "first_name": z.string(), "middle_name": z.union([z.string(), z.null()]).optional(), "last_name": z.string(), "birth_date": z.string(), "primary_nationality": z.string(), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() }), "applicant_type": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.union([z.number(), z.null()]).optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.associated_persons.create"] = CustomerAssociatedPersonsCreateResponseSchema;

const CustomerAssociatedPersonsGetResponseSchema = z.object({ "associated_person_id": z.string(), "email": z.string(), "first_name": z.string(), "middle_name": z.union([z.string(), z.null()]).optional(), "last_name": z.string(), "birth_date": z.string(), "primary_nationality": z.string(), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() }), "applicant_type": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.union([z.number(), z.null()]).optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.associated_persons.get"] = CustomerAssociatedPersonsGetResponseSchema;

const CustomerAssociatedPersonsUpdateResponseSchema = z.object({ "associated_person_id": z.string(), "email": z.string(), "first_name": z.string(), "middle_name": z.union([z.string(), z.null()]).optional(), "last_name": z.string(), "birth_date": z.string(), "primary_nationality": z.string(), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "street_line_2": z.union([z.string(), z.null()]).optional(), "subdivision": z.union([z.string(), z.null()]).optional(), "postal_code": z.union([z.string(), z.null()]).optional() }), "applicant_type": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.union([z.number(), z.null()]).optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.associated_persons.update"] = CustomerAssociatedPersonsUpdateResponseSchema;

const CustomerAssociatedPersonsDeleteResponseSchema = z.union([z.null(), z.record(z.string(), z.any())])
toolResponseSchemas["customer.associated_persons.delete"] = CustomerAssociatedPersonsDeleteResponseSchema;

const CustomerIntermediariesListResponseSchema = z.array(z.object({ "intermediary_id": z.string(), "entity_name": z.string(), "country": z.string(), "ownership": z.number(), "created_at": z.string(), "updated_at": z.string() }))
toolResponseSchemas["customer.intermediaries.list"] = CustomerIntermediariesListResponseSchema;

const CustomerIntermediariesCreateResponseSchema = z.object({ "intermediary_id": z.string(), "entity_name": z.string(), "country": z.string(), "ownership": z.number(), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.intermediaries.create"] = CustomerIntermediariesCreateResponseSchema;

const CustomerIntermediariesGetResponseSchema = z.object({ "intermediary_id": z.string(), "entity_name": z.string(), "country": z.string(), "ownership": z.number(), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.intermediaries.get"] = CustomerIntermediariesGetResponseSchema;

const CustomerIntermediariesUpdateResponseSchema = z.object({ "intermediary_id": z.string(), "entity_name": z.string(), "country": z.string(), "ownership": z.number(), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.intermediaries.update"] = CustomerIntermediariesUpdateResponseSchema;

const CustomerIntermediariesDeleteResponseSchema = z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.record(z.string(), z.any())];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  })
toolResponseSchemas["customer.intermediaries.delete"] = CustomerIntermediariesDeleteResponseSchema;

const CustomerCreateTosLinkResponseSchema = z.object({ "url": z.string(), "session_token": z.string(), "expires_in": z.number().int() }).strict()
toolResponseSchemas["customer.create_tos_link"] = CustomerCreateTosLinkResponseSchema;

const CustomerLightweightGetByIdempotencyKeyResponseSchema = z.object({ "customer_id": z.string(), "email": z.string(), "customer_type": z.enum(["Business","Individual"]), "status": z.enum(["INIT","PENDING_REVIEW","UNDER_REVIEW","PENDING_RESPONSE","ESCALATED","PENDING_APPROVAL","REJECTED","APPROVED","PROVISIONING"]), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.lightweight.get_by_idempotency_key"] = CustomerLightweightGetByIdempotencyKeyResponseSchema;

const CustomerLightweightCreateResponseSchema = z.object({ "customer_id": z.string(), "email": z.string(), "customer_type": z.enum(["Business","Individual"]), "status": z.enum(["INIT","PENDING_REVIEW","UNDER_REVIEW","PENDING_RESPONSE","ESCALATED","PENDING_APPROVAL","REJECTED","APPROVED","PROVISIONING"]), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.lightweight.create"] = CustomerLightweightCreateResponseSchema;

const CustomerOnboardingLinksCreateResponseSchema = z.object({ "grant_token": z.string(), "onboarding_url": z.string(), "expires_at": z.string() }).strict()
toolResponseSchemas["customer.onboarding_links.create"] = CustomerOnboardingLinksCreateResponseSchema;

const CustomerLightweightGetResponseSchema = z.object({ "customer_id": z.string(), "email": z.string(), "customer_type": z.enum(["Business","Individual"]), "status": z.enum(["INIT","PENDING_REVIEW","UNDER_REVIEW","PENDING_RESPONSE","ESCALATED","PENDING_APPROVAL","REJECTED","APPROVED","PROVISIONING"]), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.lightweight.get"] = CustomerLightweightGetResponseSchema;

const CustomerOnboardingGrantsCreateResponseSchema = z.object({ "grant_token": z.string(), "onboarding_url": z.string(), "expires_at": z.string() }).strict()
toolResponseSchemas["customer.onboarding_grants.create"] = CustomerOnboardingGrantsCreateResponseSchema;

const AssetsListResponseSchema = z.array(z.object({ "customer_id": z.string(), "asset": z.string(), "available_amount": z.string(), "unavailable_amount": z.string(), "created_at": z.string(), "modified_at": z.string() }))
toolResponseSchemas["assets.list"] = AssetsListResponseSchema;

const ExternalAccountsListResponseSchema = z.array(z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.enum(["PENDING","APPROVED","FAILED"]), "network": z.string(), "nickname": z.string(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","XKX","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string(), "intermediary_bank": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "institution_id": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "reference_code": z.string(), "created_at": z.string(), "modified_at": z.string(), "recipient": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }))
toolResponseSchemas["external_accounts.list"] = ExternalAccountsListResponseSchema;

const ExternalAccountsGetResponseSchema = z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.enum(["PENDING","APPROVED","FAILED"]), "network": z.string(), "nickname": z.string(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","XKX","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string(), "intermediary_bank": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "institution_id": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "reference_code": z.string(), "created_at": z.string(), "modified_at": z.string(), "recipient": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }).strict()
toolResponseSchemas["external_accounts.get"] = ExternalAccountsGetResponseSchema;

const ExternalAccountsRemoveResponseSchema = z.union([z.null(), z.record(z.string(), z.any())])
toolResponseSchemas["external_accounts.remove"] = ExternalAccountsRemoveResponseSchema;

const ExternalAccountsGetByIdempotencyKeyResponseSchema = z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.enum(["PENDING","APPROVED","FAILED"]), "network": z.string(), "nickname": z.string(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","XKX","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string(), "intermediary_bank": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "institution_id": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "reference_code": z.string(), "created_at": z.string(), "modified_at": z.string(), "recipient": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }).strict()
toolResponseSchemas["external_accounts.get_by_idempotency_key"] = ExternalAccountsGetByIdempotencyKeyResponseSchema;

const ExternalAccountsCreateResponseSchema = z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.enum(["PENDING","APPROVED","FAILED"]), "network": z.string(), "nickname": z.string(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","XKX","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string(), "intermediary_bank": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "institution_id": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "reference_code": z.string(), "created_at": z.string(), "modified_at": z.string(), "recipient": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }).strict()
toolResponseSchemas["external_accounts.create"] = ExternalAccountsCreateResponseSchema;

const InstructionsGetDepositInstructionResponseSchema = z.object({ "asset": z.string(), "network": z.string(), "deposit_instruction_id": z.union([z.string(), z.null()]).optional(), "bank_instruction": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "bank_name": z.string(), "routing_number": z.string(), "account_holder": z.string(), "account_number": z.string(), "bic_code": z.string(), "memorandum": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }) })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "wallet_instruction": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "wallet_address": z.string(), "minimum_deposit": z.string(), "contract_address_url": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "transaction_action": z.literal("DEPOSIT"), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["instructions.get_deposit_instruction"] = InstructionsGetDepositInstructionResponseSchema;

const InstructionsCryptoListResponseSchema = z.object({ "data": z.array(z.object({ "deposit_instruction_id": z.string(), "network": z.string(), "address": z.string(), "is_default": z.boolean(), "nickname": z.string(), "status": z.enum(["PENDING","READY","FAILED"]), "created_at": z.string() })), "total": z.number().int().gte(0), "page": z.number().int().gte(0), "size": z.number().int().gte(0) }).strict()
toolResponseSchemas["instructions.crypto.list"] = InstructionsCryptoListResponseSchema;

const InstructionsCryptoGetByIdempotencyKeyResponseSchema = z.object({ "deposit_instruction_id": z.string(), "network": z.string(), "address": z.string(), "is_default": z.boolean(), "nickname": z.string(), "status": z.enum(["PENDING","READY","FAILED"]), "created_at": z.string() }).strict()
toolResponseSchemas["instructions.crypto.get_by_idempotency_key"] = InstructionsCryptoGetByIdempotencyKeyResponseSchema;

const InstructionsCryptoCreateResponseSchema = z.object({ "deposit_instruction_id": z.string(), "network": z.string(), "address": z.string(), "is_default": z.boolean(), "nickname": z.string(), "status": z.enum(["PENDING","READY","FAILED"]), "created_at": z.string() }).strict()
toolResponseSchemas["instructions.crypto.create"] = InstructionsCryptoCreateResponseSchema;

const InstructionsCryptoGetResponseSchema = z.object({ "deposit_instruction_id": z.string(), "network": z.string(), "address": z.string(), "is_default": z.boolean(), "nickname": z.string(), "status": z.enum(["PENDING","READY","FAILED"]), "created_at": z.string() }).strict()
toolResponseSchemas["instructions.crypto.get"] = InstructionsCryptoGetResponseSchema;

const AutoConversionRulesListResponseSchema = z.object({ "total": z.string(), "items": z.array(z.object({ "auto_conversion_rule_id": z.string(), "idempotency_key": z.string(), "nickname": z.string(), "status": z.string(), "source": z.object({ "asset": z.string(), "network": z.string() }), "destination": z.object({ "asset": z.string(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), "deposit_info_status": z.string().optional(), "source_deposit_info": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.any().superRefine((x, ctx) => {
    const schemas = [z.object({ "network": z.string(), "reference_code": z.string(), "recipient_name": z.string().optional(), "bank_name": z.string().optional(), "routing_number": z.string().optional(), "account_holder_name": z.string().optional(), "account_number": z.string().optional(), "country_code": z.string().optional(), "street": z.string().optional(), "additional": z.union([z.string(), z.null()]).optional(), "city": z.string().optional(), "region": z.string().optional(), "postal_code": z.string().optional(), "bic_code": z.string().optional(), "minimum_deposit_amount": z.string() }), z.object({ "wallet_address": z.string(), "minimum_deposit_amount": z.string(), "contract_address": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string(), "modified_at": z.string() })) }).strict()
toolResponseSchemas["auto_conversion_rules.list"] = AutoConversionRulesListResponseSchema;

const AutoConversionRulesGetResponseSchema = z.object({ "auto_conversion_rule_id": z.string(), "idempotency_key": z.string(), "nickname": z.string(), "status": z.string(), "source": z.object({ "asset": z.string(), "network": z.string() }), "destination": z.object({ "asset": z.string(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), "deposit_info_status": z.string().optional(), "source_deposit_info": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.any().superRefine((x, ctx) => {
    const schemas = [z.object({ "network": z.string(), "reference_code": z.string(), "recipient_name": z.string().optional(), "bank_name": z.string().optional(), "routing_number": z.string().optional(), "account_holder_name": z.string().optional(), "account_number": z.string().optional(), "country_code": z.string().optional(), "street": z.string().optional(), "additional": z.union([z.string(), z.null()]).optional(), "city": z.string().optional(), "region": z.string().optional(), "postal_code": z.string().optional(), "bic_code": z.string().optional(), "minimum_deposit_amount": z.string() }), z.object({ "wallet_address": z.string(), "minimum_deposit_amount": z.string(), "contract_address": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["auto_conversion_rules.get"] = AutoConversionRulesGetResponseSchema;

const AutoConversionRulesDeleteResponseSchema = z.union([z.null(), z.record(z.string(), z.any())])
toolResponseSchemas["auto_conversion_rules.delete"] = AutoConversionRulesDeleteResponseSchema;

const AutoConversionRulesGetByIdempotencyKeyResponseSchema = z.object({ "auto_conversion_rule_id": z.string(), "idempotency_key": z.string(), "nickname": z.string(), "status": z.string(), "source": z.object({ "asset": z.string(), "network": z.string() }), "destination": z.object({ "asset": z.string(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), "deposit_info_status": z.string().optional(), "source_deposit_info": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.any().superRefine((x, ctx) => {
    const schemas = [z.object({ "network": z.string(), "reference_code": z.string(), "recipient_name": z.string().optional(), "bank_name": z.string().optional(), "routing_number": z.string().optional(), "account_holder_name": z.string().optional(), "account_number": z.string().optional(), "country_code": z.string().optional(), "street": z.string().optional(), "additional": z.union([z.string(), z.null()]).optional(), "city": z.string().optional(), "region": z.string().optional(), "postal_code": z.string().optional(), "bic_code": z.string().optional(), "minimum_deposit_amount": z.string() }), z.object({ "wallet_address": z.string(), "minimum_deposit_amount": z.string(), "contract_address": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["auto_conversion_rules.get_by_idempotency_key"] = AutoConversionRulesGetByIdempotencyKeyResponseSchema;

const AutoConversionRulesCreateResponseSchema = z.object({ "auto_conversion_rule_id": z.string(), "idempotency_key": z.string(), "nickname": z.string(), "status": z.string(), "source": z.object({ "asset": z.string(), "network": z.string() }), "destination": z.object({ "asset": z.string(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), "deposit_info_status": z.string().optional(), "source_deposit_info": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.any().superRefine((x, ctx) => {
    const schemas = [z.object({ "network": z.string(), "reference_code": z.string(), "recipient_name": z.string().optional(), "bank_name": z.string().optional(), "routing_number": z.string().optional(), "account_holder_name": z.string().optional(), "account_number": z.string().optional(), "country_code": z.string().optional(), "street": z.string().optional(), "additional": z.union([z.string(), z.null()]).optional(), "city": z.string().optional(), "region": z.string().optional(), "postal_code": z.string().optional(), "bic_code": z.string().optional(), "minimum_deposit_amount": z.string() }), z.object({ "wallet_address": z.string(), "minimum_deposit_amount": z.string(), "contract_address": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["auto_conversion_rules.create"] = AutoConversionRulesCreateResponseSchema;

const AutoConversionRulesListOrdersResponseSchema = z.object({ "total": z.string(), "items": z.array(z.object({ "auto_conversion_order_id": z.string(), "auto_conversion_rule_id": z.string(), "status": z.string(), "source": z.object({ "asset": z.string(), "network": z.string() }), "destination": z.object({ "asset": z.string(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), "receipt": z.object({ "initial": z.object({ "amount": z.string(), "asset": z.string() }), "developer_fee": z.object({ "amount": z.string(), "asset": z.string() }), "deposit_fee": z.object({ "amount": z.string(), "asset": z.string() }), "conversion_fee": z.object({ "amount": z.string(), "asset": z.string() }), "withdrawal_fee": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "amount": z.string(), "asset": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }), "sub_transactions": z.union([z.array(z.object({ "customer_id": z.string(), "recipient_id": z.union([z.string(), z.null()]).optional(), "transaction_id": z.string(), "idempotency_key": z.string(), "transaction_action": z.enum(["DEPOSIT","WITHDRAWAL","CONVERSION","AUTO_CONVERSION","TRANSFER"]), "transaction_direction": z.string(), "amount": z.string(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }), "source": z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.union([z.string(), z.null()]).optional(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "bank_name": z.union([z.string(), z.null()]).optional(), "bank_account_name": z.union([z.string(), z.null()]).optional() })), "destination": z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.union([z.string(), z.null()]).optional(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "bank_name": z.union([z.string(), z.null()]).optional(), "bank_account_name": z.union([z.string(), z.null()]).optional(), "reference": z.union([z.string(), z.null()]).optional() })), "status": z.enum(["PENDING","COMPLETED","FAILED","REVERSED","RETURNED"]), "amount_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SEND_AMOUNT","RECEIVE_AMOUNT"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "memorandum": z.union([z.string().max(256), z.null()]).optional(), "created_at": z.string(), "modified_at": z.string() })), z.null()]).optional(), "created_at": z.string(), "updated_at": z.string() })) }).strict()
toolResponseSchemas["auto_conversion_rules.list_orders"] = AutoConversionRulesListOrdersResponseSchema;

const AutoConversionRulesGetOrderResponseSchema = z.object({ "auto_conversion_order_id": z.string(), "auto_conversion_rule_id": z.string(), "status": z.string(), "source": z.object({ "asset": z.string(), "network": z.string() }), "destination": z.object({ "asset": z.string(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), "receipt": z.object({ "initial": z.object({ "amount": z.string(), "asset": z.string() }), "developer_fee": z.object({ "amount": z.string(), "asset": z.string() }), "deposit_fee": z.object({ "amount": z.string(), "asset": z.string() }), "conversion_fee": z.object({ "amount": z.string(), "asset": z.string() }), "withdrawal_fee": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "amount": z.string(), "asset": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }), "sub_transactions": z.union([z.array(z.object({ "customer_id": z.string(), "recipient_id": z.union([z.string(), z.null()]).optional(), "transaction_id": z.string(), "idempotency_key": z.string(), "transaction_action": z.enum(["DEPOSIT","WITHDRAWAL","CONVERSION","AUTO_CONVERSION","TRANSFER"]), "transaction_direction": z.string(), "amount": z.string(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }), "source": z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.union([z.string(), z.null()]).optional(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "bank_name": z.union([z.string(), z.null()]).optional(), "bank_account_name": z.union([z.string(), z.null()]).optional() })), "destination": z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.union([z.string(), z.null()]).optional(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "bank_name": z.union([z.string(), z.null()]).optional(), "bank_account_name": z.union([z.string(), z.null()]).optional(), "reference": z.union([z.string(), z.null()]).optional() })), "status": z.enum(["PENDING","COMPLETED","FAILED","REVERSED","RETURNED"]), "amount_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SEND_AMOUNT","RECEIVE_AMOUNT"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "memorandum": z.union([z.string().max(256), z.null()]).optional(), "created_at": z.string(), "modified_at": z.string() })), z.null()]).optional(), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["auto_conversion_rules.get_order"] = AutoConversionRulesGetOrderResponseSchema;

const WithdrawalsGetResponseSchema = z.intersection(z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.string(), "asset": z.string(), "network": z.string(), "code": z.union([z.string(), z.null()]).optional(), "memorandum": z.union([z.string().max(256), z.null()]).optional(), "mode": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.literal("prefunding")];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "on_behalf_of": z.union([z.string(), z.null()]).optional(), "amount_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SEND_AMOUNT","RECEIVE_AMOUNT"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() })), z.object({ "transaction_id": z.string(), "idempotency_key": z.string(), "status": z.enum(["PENDING","COMPLETED","FAILED","RETURNED"]), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }), "transaction_action": z.literal("WITHDRAWAL"), "created_at": z.string(), "modified_at": z.string(), "reference": z.union([z.string(), z.null()]).optional(), "funder_pid": z.union([z.string(), z.null()]).optional(), "recipient_id": z.union([z.string(), z.null()]).optional() }))
toolResponseSchemas["withdrawals.get"] = WithdrawalsGetResponseSchema;

const WithdrawalsGetByIdempotencyKeyResponseSchema = z.intersection(z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.string(), "asset": z.string(), "network": z.string(), "code": z.union([z.string(), z.null()]).optional(), "memorandum": z.union([z.string().max(256), z.null()]).optional(), "mode": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.literal("prefunding")];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "on_behalf_of": z.union([z.string(), z.null()]).optional(), "amount_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SEND_AMOUNT","RECEIVE_AMOUNT"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() })), z.object({ "transaction_id": z.string(), "idempotency_key": z.string(), "status": z.enum(["PENDING","COMPLETED","FAILED","RETURNED"]), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }), "transaction_action": z.literal("WITHDRAWAL"), "created_at": z.string(), "modified_at": z.string(), "reference": z.union([z.string(), z.null()]).optional(), "funder_pid": z.union([z.string(), z.null()]).optional(), "recipient_id": z.union([z.string(), z.null()]).optional() }))
toolResponseSchemas["withdrawals.get_by_idempotency_key"] = WithdrawalsGetByIdempotencyKeyResponseSchema;

const WithdrawalsCreateResponseSchema = z.intersection(z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.string(), "asset": z.string(), "network": z.string(), "code": z.union([z.string(), z.null()]).optional(), "memorandum": z.union([z.string().max(256), z.null()]).optional(), "mode": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.literal("prefunding")];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "on_behalf_of": z.union([z.string(), z.null()]).optional(), "amount_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SEND_AMOUNT","RECEIVE_AMOUNT"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() })), z.object({ "transaction_id": z.string(), "idempotency_key": z.string(), "status": z.enum(["PENDING","COMPLETED","FAILED","RETURNED"]), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }), "transaction_action": z.literal("WITHDRAWAL"), "created_at": z.string(), "modified_at": z.string(), "reference": z.union([z.string(), z.null()]).optional(), "funder_pid": z.union([z.string(), z.null()]).optional(), "recipient_id": z.union([z.string(), z.null()]).optional() }))
toolResponseSchemas["withdrawals.create"] = WithdrawalsCreateResponseSchema;

const ConversionsCreateQuoteResponseSchema = z.object({ "quote_id": z.string(), "user_pay_amount": z.string(), "user_pay_asset": z.string(), "user_obtain_amount": z.string(), "user_obtain_asset": z.string(), "rate": z.string(), "expire_time": z.number().int().gte(0), "valid_until_timestamp": z.string() }).strict()
toolResponseSchemas["conversions.create_quote"] = ConversionsCreateQuoteResponseSchema;

const ConversionsCreateHedgeResponseSchema = z.object({ "transaction_id": z.string(), "order_status": z.string(), "quote_id": z.string(), "user_pay_amount": z.string(), "user_pay_asset": z.string(), "user_obtain_amount": z.string(), "user_obtain_asset": z.string(), "rate": z.string(), "fee": z.string(), "fee_currency": z.string() }).strict()
toolResponseSchemas["conversions.create_hedge"] = ConversionsCreateHedgeResponseSchema;

const ConversionsGetOrderResponseSchema = z.object({ "transaction_id": z.string(), "order_status": z.string(), "quote_id": z.string(), "user_pay_amount": z.string(), "user_pay_asset": z.string(), "user_obtain_amount": z.string(), "user_obtain_asset": z.string(), "rate": z.string(), "fee": z.string(), "fee_currency": z.string() }).strict()
toolResponseSchemas["conversions.get_order"] = ConversionsGetOrderResponseSchema;

const TransactionsListResponseSchema = z.object({ "list": z.array(z.intersection(z.object({ "customer_id": z.string(), "recipient_id": z.union([z.string(), z.null()]).optional(), "transaction_id": z.string(), "idempotency_key": z.string(), "transaction_action": z.enum(["DEPOSIT","WITHDRAWAL","CONVERSION","AUTO_CONVERSION","TRANSFER"]), "transaction_direction": z.string(), "amount": z.string(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }), "source": z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.union([z.string(), z.null()]).optional(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "bank_name": z.union([z.string(), z.null()]).optional(), "bank_account_name": z.union([z.string(), z.null()]).optional() })), "destination": z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.union([z.string(), z.null()]).optional(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "bank_name": z.union([z.string(), z.null()]).optional(), "bank_account_name": z.union([z.string(), z.null()]).optional(), "reference": z.union([z.string(), z.null()]).optional() })), "status": z.enum(["PENDING","COMPLETED","FAILED","REVERSED","RETURNED"]), "amount_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SEND_AMOUNT","RECEIVE_AMOUNT"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "memorandum": z.union([z.string().max(256), z.null()]).optional(), "created_at": z.string(), "modified_at": z.string() }), z.object({ "sub_transactions": z.union([z.array(z.object({ "customer_id": z.string(), "recipient_id": z.union([z.string(), z.null()]).optional(), "transaction_id": z.string(), "idempotency_key": z.string(), "transaction_action": z.enum(["DEPOSIT","WITHDRAWAL","CONVERSION","AUTO_CONVERSION","TRANSFER"]), "transaction_direction": z.string(), "amount": z.string(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }), "source": z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.union([z.string(), z.null()]).optional(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "bank_name": z.union([z.string(), z.null()]).optional(), "bank_account_name": z.union([z.string(), z.null()]).optional() })), "destination": z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.union([z.string(), z.null()]).optional(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "bank_name": z.union([z.string(), z.null()]).optional(), "bank_account_name": z.union([z.string(), z.null()]).optional(), "reference": z.union([z.string(), z.null()]).optional() })), "status": z.enum(["PENDING","COMPLETED","FAILED","REVERSED","RETURNED"]), "amount_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SEND_AMOUNT","RECEIVE_AMOUNT"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "memorandum": z.union([z.string().max(256), z.null()]).optional(), "created_at": z.string(), "modified_at": z.string() })), z.null()]).optional() }))), "total": z.union([z.number().int().gte(0), z.null()]).optional() }).strict()
toolResponseSchemas["transactions.list"] = TransactionsListResponseSchema;

const TransactionsGetResponseSchema = z.intersection(z.object({ "customer_id": z.string(), "recipient_id": z.union([z.string(), z.null()]).optional(), "transaction_id": z.string(), "idempotency_key": z.string(), "transaction_action": z.enum(["DEPOSIT","WITHDRAWAL","CONVERSION","AUTO_CONVERSION","TRANSFER"]), "transaction_direction": z.string(), "amount": z.string(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }), "source": z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.union([z.string(), z.null()]).optional(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "bank_name": z.union([z.string(), z.null()]).optional(), "bank_account_name": z.union([z.string(), z.null()]).optional() })), "destination": z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.union([z.string(), z.null()]).optional(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "bank_name": z.union([z.string(), z.null()]).optional(), "bank_account_name": z.union([z.string(), z.null()]).optional(), "reference": z.union([z.string(), z.null()]).optional() })), "status": z.enum(["PENDING","COMPLETED","FAILED","REVERSED","RETURNED"]), "amount_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SEND_AMOUNT","RECEIVE_AMOUNT"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "memorandum": z.union([z.string().max(256), z.null()]).optional(), "created_at": z.string(), "modified_at": z.string() }), z.object({ "sub_transactions": z.union([z.array(z.object({ "customer_id": z.string(), "recipient_id": z.union([z.string(), z.null()]).optional(), "transaction_id": z.string(), "idempotency_key": z.string(), "transaction_action": z.enum(["DEPOSIT","WITHDRAWAL","CONVERSION","AUTO_CONVERSION","TRANSFER"]), "transaction_direction": z.string(), "amount": z.string(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }), "source": z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.union([z.string(), z.null()]).optional(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "bank_name": z.union([z.string(), z.null()]).optional(), "bank_account_name": z.union([z.string(), z.null()]).optional() })), "destination": z.intersection(z.object({ "wallet_address": z.union([z.string(), z.null()]).optional(), "external_account_id": z.union([z.string(), z.null()]).optional() }), z.object({ "amount": z.union([z.string(), z.null()]).optional(), "asset": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "network": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.string()];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "bank_name": z.union([z.string(), z.null()]).optional(), "bank_account_name": z.union([z.string(), z.null()]).optional(), "reference": z.union([z.string(), z.null()]).optional() })), "status": z.enum(["PENDING","COMPLETED","FAILED","REVERSED","RETURNED"]), "amount_type": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.enum(["SEND_AMOUNT","RECEIVE_AMOUNT"])];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "memorandum": z.union([z.string().max(256), z.null()]).optional(), "created_at": z.string(), "modified_at": z.string() })), z.null()]).optional() }))
toolResponseSchemas["transactions.get"] = TransactionsGetResponseSchema;

const TransfersGetResponseSchema = z.object({ "transaction_id": z.string(), "idempotency_key": z.string(), "status": z.enum(["PENDING","COMPLETED","FAILED"]), "amount": z.string(), "asset": z.string(), "from_customer_id": z.string(), "to_customer_id": z.string(), "memorandum": z.union([z.string().max(256), z.null()]).optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["transfers.get"] = TransfersGetResponseSchema;

const TransfersGetByIdempotencyKeyResponseSchema = z.object({ "transaction_id": z.string(), "idempotency_key": z.string(), "status": z.enum(["PENDING","COMPLETED","FAILED"]), "amount": z.string(), "asset": z.string(), "from_customer_id": z.string(), "to_customer_id": z.string(), "memorandum": z.union([z.string().max(256), z.null()]).optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["transfers.get_by_idempotency_key"] = TransfersGetByIdempotencyKeyResponseSchema;

const TransfersCreateResponseSchema = z.object({ "transaction_id": z.string(), "idempotency_key": z.string(), "status": z.enum(["PENDING","COMPLETED","FAILED"]), "amount": z.string(), "asset": z.string(), "from_customer_id": z.string(), "to_customer_id": z.string(), "memorandum": z.union([z.string().max(256), z.null()]).optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["transfers.create"] = TransfersCreateResponseSchema;

const FeesEstimateResponseSchema = z.object({ "value": z.string(), "asset": z.string() }).strict()
toolResponseSchemas["fees.estimate"] = FeesEstimateResponseSchema;

const SimulationsSimulateTransactionResponseSchema = z.object({ "simulation_id": z.string(), "status": z.enum(["PENDING","COMPLETED","FAILED","REVERSED","RETURNED"]), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["simulations.simulate_transaction"] = SimulationsSimulateTransactionResponseSchema;

const RecipientsGetByIdempotencyKeyResponseSchema = z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) }).strict()
toolResponseSchemas["recipients.get_by_idempotency_key"] = RecipientsGetByIdempotencyKeyResponseSchema;

const RecipientsCreateResponseSchema = z.intersection(z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) }), z.object({ "bank_accounts": z.array(z.intersection(z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.enum(["PENDING","APPROVED","FAILED"]), "network": z.string(), "nickname": z.string(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","XKX","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string(), "intermediary_bank": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "institution_id": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "reference_code": z.string(), "created_at": z.string(), "modified_at": z.string(), "recipient": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }), z.object({ "recipient_id": z.string() }))) }))
toolResponseSchemas["recipients.create"] = RecipientsCreateResponseSchema;

const RecipientsListResponseSchema = z.object({ "list": z.array(z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) })), "total": z.union([z.number().int().gte(0), z.null()]).optional() }).strict()
toolResponseSchemas["recipients.list"] = RecipientsListResponseSchema;

const RecipientsGetResponseSchema = z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) }).strict()
toolResponseSchemas["recipients.get"] = RecipientsGetResponseSchema;

const RecipientsUpdateResponseSchema = z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) }).strict()
toolResponseSchemas["recipients.update"] = RecipientsUpdateResponseSchema;

const RecipientsDeleteResponseSchema = z.union([z.null(), z.record(z.string(), z.any())])
toolResponseSchemas["recipients.delete"] = RecipientsDeleteResponseSchema;

const RecipientsGetByExternalAccountResponseSchema = z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) }).strict()
toolResponseSchemas["recipients.get_by_external_account"] = RecipientsGetByExternalAccountResponseSchema;

const RecipientsBankAccountsGetByIdempotencyKeyResponseSchema = z.intersection(z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.enum(["PENDING","APPROVED","FAILED"]), "network": z.string(), "nickname": z.string(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","XKX","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string(), "intermediary_bank": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "institution_id": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "reference_code": z.string(), "created_at": z.string(), "modified_at": z.string(), "recipient": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }), z.object({ "recipient_id": z.string() }))
toolResponseSchemas["recipients.bank_accounts.get_by_idempotency_key"] = RecipientsBankAccountsGetByIdempotencyKeyResponseSchema;

const RecipientsBankAccountsCreateResponseSchema = z.intersection(z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.enum(["PENDING","APPROVED","FAILED"]), "network": z.string(), "nickname": z.string(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","XKX","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string(), "intermediary_bank": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "institution_id": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "reference_code": z.string(), "created_at": z.string(), "modified_at": z.string(), "recipient": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }), z.object({ "recipient_id": z.string() }))
toolResponseSchemas["recipients.bank_accounts.create"] = RecipientsBankAccountsCreateResponseSchema;

const RecipientsBankAccountsListResponseSchema = z.object({ "list": z.array(z.intersection(z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.enum(["PENDING","APPROVED","FAILED"]), "network": z.string(), "nickname": z.string(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","XKX","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string(), "intermediary_bank": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "institution_id": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "reference_code": z.string(), "created_at": z.string(), "modified_at": z.string(), "recipient": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }), z.object({ "recipient_id": z.string() }))), "total": z.union([z.number().int().gte(0), z.null()]).optional() }).strict()
toolResponseSchemas["recipients.bank_accounts.list"] = RecipientsBankAccountsListResponseSchema;

const RecipientsBankAccountsUpdateResponseSchema = z.intersection(z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.enum(["PENDING","APPROVED","FAILED"]), "network": z.string(), "nickname": z.string(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","XKX","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string(), "intermediary_bank": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "institution_id": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "reference_code": z.string(), "created_at": z.string(), "modified_at": z.string(), "recipient": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.union([z.string(), z.null()]).optional(), "email": z.union([z.string(), z.null()]).optional(), "relationship": z.union([z.string(), z.null()]).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.union([z.string(), z.null()]).optional(), "city": z.string(), "region": z.union([z.string(), z.null()]).optional(), "postal_code": z.string() })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) })];
    const { errors, failed } = schemas.reduce<{
      errors: z.core.$ZodIssue[];
      failed: number;
    }>(
      ({ errors, failed }, schema) =>
        ((result) =>
          result.error
            ? {
                errors: [...errors, ...result.error.issues],
                failed: failed + 1,
              }
            : { errors, failed })(
          schema.safeParse(x),
        ),
      { errors: [], failed: 0 },
    );
    const passed = schemas.length - failed;
    if (passed !== 1) {
      ctx.addIssue(errors.length ? {
        path: [],
        code: "invalid_union",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      } : {
        path: [],
        code: "custom",
        errors: [errors],
        message: "Invalid input: Should pass single schema. Passed " + passed,
      });
    }
  }).optional() }), z.object({ "recipient_id": z.string() }))
toolResponseSchemas["recipients.bank_accounts.update"] = RecipientsBankAccountsUpdateResponseSchema;

const RecipientsBankAccountsDeleteResponseSchema = z.union([z.null(), z.record(z.string(), z.any())])
toolResponseSchemas["recipients.bank_accounts.delete"] = RecipientsBankAccountsDeleteResponseSchema;

const CustomerSignTosAgreementResponseSchema = z.object({ "signed_agreement_id": z.string() }).strict()
toolResponseSchemas["customer.sign_tos_agreement"] = CustomerSignTosAgreementResponseSchema;

const EchoGetResponseSchema = z.object({ "message": z.string(), "timestamp": z.string().optional() }).strict()
toolResponseSchemas["echo.get"] = EchoGetResponseSchema;

const EchoPostResponseSchema = z.object({ "message": z.string(), "timestamp": z.string().optional() }).strict()
toolResponseSchemas["echo.post"] = EchoPostResponseSchema;

export type ToolName = keyof typeof toolSchemas;
export type ToolResponseName = keyof typeof toolResponseSchemas;
