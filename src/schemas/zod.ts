import { z } from "zod";

export const toolSchemas = {} as Record<string, z.ZodTypeAny>;

export const toolResponseSchemas = {} as Record<string, z.ZodTypeAny>;

const AssetsListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "asset": z.enum(["USD","USDC","USDT","PYUSD","RLUSD","USDG","USDP","EURC","MXNB"]).optional(), "network": z.enum(["US_ACH","SWIFT","US_FEDWIRE","ARBITRUM","AVALANCHE","BASE","BNBCHAIN","ETHEREUM","POLYGON","SOLANA"]).optional(), "sort_order": z.enum(["ASC","DESC"]).optional() }).strict().optional() }).strict()
toolSchemas["assets.list"] = AssetsListSchema;

const CustomerCreateTosLinkSchema = z.object({ "request": z.object({ "redirect_url": z.string().optional() }).strict().optional() }).strict()
toolSchemas["customer.create_tos_link"] = CustomerCreateTosLinkSchema;

const CustomerSignTosAgreementSchema = z.object({ "session_token": z.string() }).strict()
toolSchemas["customer.sign_tos_agreement"] = CustomerSignTosAgreementSchema;

const CustomerCreateSchema = z.object({ "request": z.object({ "business_legal_name": z.string(), "business_description": z.string(), "business_registration_number": z.string(), "email": z.string(), "business_type": z.enum(["cooperative","corporation","llc","partnership","sole_proprietorship"]), "business_industry": z.string(), "registered_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict(), "date_of_incorporation": z.string(), "physical_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict().optional(), "signed_agreement_id": z.string(), "is_dao": z.boolean(), "associated_persons": z.array(z.object({ "first_name": z.string(), "middle_name": z.string().optional(), "last_name": z.string(), "email": z.string(), "gender": z.enum(["male","female"]), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict(), "birth_date": z.string(), "country_of_birth": z.string(), "primary_nationality": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.number().int().optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "identifying_information": z.array(z.object({ "type": z.enum(["drivers_license","passport","national_id","state_id"]), "issuing_country": z.string(), "image_front": z.string(), "image_back": z.string(), "national_identity_number": z.string() }).strict()).optional(), "dual_nationality": z.string().optional(), "country_of_tax": z.string(), "tax_type": z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"]), "tax_id": z.string(), "poa": z.string(), "poa_type": z.string() }).strict()), "account_purpose": z.enum(["charitable_donations","ecommerce_retail_payments","investment_purposes","other","payments_to_friends_or_family_abroad","payroll","personal_or_living_expenses","protect_wealth","purchase_goods_and_services","receive_payments_for_goods_and_services","tax_optimization","third_party_money_transmission","treasury_management"]), "source_of_funds": z.array(z.enum(["business_loans","grants","inter_company_funds","investment_proceeds","legal_settlement","owners_capital","pension_retirement","sale_of_assets","sales_of_goods_and_services","tax_refund","third_party_funds","treasury_reserves"])), "source_of_wealth": z.array(z.enum(["business_dividends_or_profits","sale_of_business","inheritance","real_estate_investments","investment_returns","accumulated_revenue","other"])), "documents": z.array(z.object({ "doc_type": z.enum(["aml_comfort_letter","constitutional_document","directors_registry","e_signature_certificate","evidence_of_good_standing","flow_of_funds","formation_document","marketing_materials","other","ownership_chart","ownership_information","proof_of_account_purpose","proof_of_address","proof_of_entity_name_change","proof_of_nature_of_business","proof_of_signatory_authority","proof_of_source_of_funds","proof_of_source_of_wealth","proof_of_tax_identification","registration_document","shareholder_register"]), "file": z.string(), "description": z.string().optional() }).strict()).optional(), "primary_website": z.string().optional(), "publicly_traded": z.boolean(), "estimated_annual_revenue_usd": z.enum(["0_99999","100000_499999","500000_999999","1000000_4999999","5000000_plus"]), "expected_monthly_fiat_deposits": z.enum(["0_99999","100000_499999","500000_999999","1000000_4999999","5000000_plus"]), "expected_monthly_fiat_withdrawals": z.enum(["0_99999","100000_499999","500000_999999","1000000_4999999","5000000_plus"]), "account_purpose_other": z.string().optional(), "high_risk_activities": z.array(z.enum(["adult_entertainment","cannabis","cryptocurrency","gambling","money_services","precious_metals","weapons","none"])).optional(), "high_risk_activities_explanation": z.string().optional(), "tax_id": z.string(), "tax_type": z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"]), "tax_country": z.string() }).strict() }).strict()
toolSchemas["customer.create"] = CustomerCreateSchema;

const CustomerListSchema = z.object({ "params": z.object({ "page_size": z.number().int().optional(), "page_num": z.number().int().optional(), "kyb_status": z.string().optional() }).strict().optional() }).strict()
toolSchemas["customer.list"] = CustomerListSchema;

const CustomerGetSchema = z.object({ "customer_id": z.string() }).strict()
toolSchemas["customer.get"] = CustomerGetSchema;

const CustomerUpdateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "business_legal_name": z.string().optional(), "business_description": z.string().optional(), "business_registration_number": z.string().optional(), "email": z.string().optional(), "business_type": z.enum(["cooperative","corporation","llc","partnership","sole_proprietorship"]).optional(), "business_industry": z.string().optional(), "registered_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict().optional(), "date_of_incorporation": z.string().optional(), "physical_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict().optional(), "signed_agreement_id": z.string().optional(), "is_dao": z.boolean().optional(), "associated_persons": z.array(z.object({ "first_name": z.string(), "middle_name": z.string().optional(), "last_name": z.string(), "email": z.string(), "gender": z.enum(["male","female"]), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict(), "birth_date": z.string(), "country_of_birth": z.string(), "primary_nationality": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.number().int().optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "identifying_information": z.array(z.object({ "type": z.enum(["drivers_license","passport","national_id","state_id"]), "issuing_country": z.string(), "image_front": z.string(), "image_back": z.string(), "national_identity_number": z.string() }).strict()).optional(), "dual_nationality": z.string().optional(), "country_of_tax": z.string(), "tax_type": z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"]), "tax_id": z.string(), "poa": z.string(), "poa_type": z.string() }).strict()).optional(), "account_purpose": z.enum(["charitable_donations","ecommerce_retail_payments","investment_purposes","other","payments_to_friends_or_family_abroad","payroll","personal_or_living_expenses","protect_wealth","purchase_goods_and_services","receive_payments_for_goods_and_services","tax_optimization","third_party_money_transmission","treasury_management"]).optional(), "source_of_funds": z.array(z.enum(["business_loans","grants","inter_company_funds","investment_proceeds","legal_settlement","owners_capital","pension_retirement","sale_of_assets","sales_of_goods_and_services","tax_refund","third_party_funds","treasury_reserves"])).optional(), "source_of_wealth": z.array(z.enum(["business_dividends_or_profits","sale_of_business","inheritance","real_estate_investments","investment_returns","accumulated_revenue","other"])).optional(), "documents": z.array(z.object({ "doc_type": z.enum(["aml_comfort_letter","constitutional_document","directors_registry","e_signature_certificate","evidence_of_good_standing","flow_of_funds","formation_document","marketing_materials","other","ownership_chart","ownership_information","proof_of_account_purpose","proof_of_address","proof_of_entity_name_change","proof_of_nature_of_business","proof_of_signatory_authority","proof_of_source_of_funds","proof_of_source_of_wealth","proof_of_tax_identification","registration_document","shareholder_register"]), "file": z.string(), "description": z.string().optional() }).strict()).optional(), "primary_website": z.string().optional(), "publicly_traded": z.boolean().optional(), "estimated_annual_revenue_usd": z.enum(["0_99999","100000_499999","500000_999999","1000000_4999999","5000000_plus"]).optional(), "expected_monthly_fiat_deposits": z.enum(["0_99999","100000_499999","500000_999999","1000000_4999999","5000000_plus"]).optional(), "expected_monthly_fiat_withdrawals": z.enum(["0_99999","100000_499999","500000_999999","1000000_4999999","5000000_plus"]).optional(), "account_purpose_other": z.string().optional(), "high_risk_activities": z.array(z.enum(["adult_entertainment","cannabis","cryptocurrency","gambling","money_services","precious_metals","weapons","none"])).optional(), "high_risk_activities_explanation": z.string().optional(), "tax_id": z.string().optional(), "tax_type": z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"]).optional(), "tax_country": z.string().optional() }).strict() }).strict()
toolSchemas["customer.update"] = CustomerUpdateSchema;

const CustomerAssociatedPersonsCreateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "first_name": z.string(), "middle_name": z.string().optional(), "last_name": z.string(), "email": z.string(), "gender": z.enum(["male","female"]), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict(), "birth_date": z.string(), "country_of_birth": z.string(), "primary_nationality": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.number().int().optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "identifying_information": z.array(z.object({ "type": z.enum(["drivers_license","passport","national_id","state_id"]), "issuing_country": z.string(), "image_front": z.string(), "image_back": z.string(), "national_identity_number": z.string() }).strict()).optional(), "dual_nationality": z.string().optional(), "country_of_tax": z.string(), "tax_type": z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"]), "tax_id": z.string(), "poa": z.string(), "poa_type": z.string() }).strict() }).strict()
toolSchemas["customer.associated_persons.create"] = CustomerAssociatedPersonsCreateSchema;

const CustomerAssociatedPersonsListSchema = z.object({ "customer_id": z.string() }).strict()
toolSchemas["customer.associated_persons.list"] = CustomerAssociatedPersonsListSchema;

const CustomerAssociatedPersonsGetSchema = z.object({ "customer_id": z.string(), "associated_person_id": z.string() }).strict()
toolSchemas["customer.associated_persons.get"] = CustomerAssociatedPersonsGetSchema;

const CustomerAssociatedPersonsUpdateSchema = z.object({ "customer_id": z.string(), "associated_person_id": z.string(), "request": z.object({ "first_name": z.string().optional(), "middle_name": z.string().optional(), "last_name": z.string().optional(), "email": z.string().optional(), "gender": z.enum(["male","female"]).optional(), "residential_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict().optional(), "birth_date": z.string().optional(), "country_of_birth": z.string().optional(), "primary_nationality": z.string().optional(), "has_ownership": z.boolean().optional(), "ownership_percentage": z.number().int().optional(), "has_control": z.boolean().optional(), "is_signer": z.boolean().optional(), "is_director": z.boolean().optional(), "identifying_information": z.array(z.object({ "type": z.enum(["drivers_license","passport","national_id","state_id"]), "issuing_country": z.string(), "image_front": z.string(), "image_back": z.string(), "national_identity_number": z.string() }).strict()).optional(), "dual_nationality": z.string().optional(), "country_of_tax": z.string().optional(), "tax_type": z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"]).optional(), "tax_id": z.string().optional(), "poa": z.string().optional(), "poa_type": z.string().optional() }).strict() }).strict()
toolSchemas["customer.associated_persons.update"] = CustomerAssociatedPersonsUpdateSchema;

const CustomerAssociatedPersonsDeleteSchema = z.object({ "customer_id": z.string(), "associated_person_id": z.string() }).strict()
toolSchemas["customer.associated_persons.delete"] = CustomerAssociatedPersonsDeleteSchema;

const ExternalAccountsCreateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "idempotency_key": z.string().optional(), "network": z.enum(["US_ACH","SWIFT","US_FEDWIRE"]), "currency": z.literal("USD"), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "nickname": z.string().optional(), "institution_clearing_code": z.string().optional(), "intermediary_bank": z.object({ "institution_id": z.string(), "institution_name": z.string().optional() }).strict().optional() }).strict() }).strict()
toolSchemas["external_accounts.create"] = ExternalAccountsCreateSchema;

const ExternalAccountsGetSchema = z.object({ "customer_id": z.string(), "external_account_id": z.string() }).strict()
toolSchemas["external_accounts.get"] = ExternalAccountsGetSchema;

const ExternalAccountsGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["external_accounts.get_by_idempotency_key"] = ExternalAccountsGetByIdempotencyKeySchema;

const ExternalAccountsListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "currency": z.literal("USD").optional(), "network": z.enum(["US_ACH","SWIFT","US_FEDWIRE"]).optional() }).strict().optional() }).strict()
toolSchemas["external_accounts.list"] = ExternalAccountsListSchema;

const ExternalAccountsRemoveSchema = z.object({ "customer_id": z.string(), "external_account_id": z.string() }).strict()
toolSchemas["external_accounts.remove"] = ExternalAccountsRemoveSchema;

const RecipientsCreateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "idempotency_key": z.string(), "business_type": z.enum(["INDIVIDUAL","COMPANY"]), "first_name": z.string().optional(), "last_name": z.string().optional(), "company_name": z.string().optional(), "nickname": z.string().optional(), "email": z.string().optional(), "mobile_code": z.string().optional(), "mobile_num": z.string().optional(), "relationship": z.enum(["EMPLOYEE","CONTRACTOR","VENDOR","SUBSIDIARY","MERCHANT","CUSTOMER","LANDLORD","FAMILY","OTHER"]), "address": z.object({ "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","YEM","MYT","ZAF","ZMB","ZWE"]), "address_line1": z.string(), "address_line2": z.string().optional(), "city": z.string(), "region": z.string().optional(), "postal_code": z.string() }).strict(), "bank_accounts": z.array(z.object({ "network": z.enum(["US_FEDWIRE","US_ACH","SWIFT"]), "nickname": z.string().optional(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string().optional(), "intermediary_bank": z.object({ "institution_id": z.string() }).strict().optional() }).strict()).optional() }).strict() }).strict()
toolSchemas["recipients.create"] = RecipientsCreateSchema;

const InstructionsGetDepositInstructionSchema = z.object({ "customer_id": z.string(), "params": z.object({ "asset": z.enum(["USD","USDC","USDT","PYUSD","RLUSD","USDG","USDP","EURC","MXNB"]), "network": z.enum(["US_ACH","SWIFT","US_FEDWIRE","ARBITRUM","AVALANCHE","BASE","BNBCHAIN","ETHEREUM","POLYGON","SOLANA"]) }).strict() }).strict()
toolSchemas["instructions.get_deposit_instruction"] = InstructionsGetDepositInstructionSchema;

const ConversionsCreateQuoteSchema = z.object({ "customer_id": z.string(), "request": z.object({ "from_asset": z.object({ "amount": z.string().optional(), "asset": z.enum(["USD","USDC","USDT","PYUSD","RLUSD","USDG","USDP","EURC","MXNB"]), "network": z.enum(["ARBITRUM","AVALANCHE","BASE","BNBCHAIN","ETHEREUM","POLYGON","SOLANA"]).optional() }).strict(), "to_asset": z.object({ "amount": z.string().optional(), "asset": z.enum(["USD","USDC","USDT","PYUSD","RLUSD","USDG","USDP","EURC","MXNB"]), "network": z.enum(["ARBITRUM","AVALANCHE","BASE","BNBCHAIN","ETHEREUM","POLYGON","SOLANA"]).optional() }).strict() }).strict() }).strict()
toolSchemas["conversions.create_quote"] = ConversionsCreateQuoteSchema;

const ConversionsCreateHedgeSchema = z.object({ "customer_id": z.string(), "request": z.object({ "quote_id": z.string() }).strict() }).strict()
toolSchemas["conversions.create_hedge"] = ConversionsCreateHedgeSchema;

const ConversionsGetOrderSchema = z.object({ "customer_id": z.string(), "order_id": z.string() }).strict()
toolSchemas["conversions.get_order"] = ConversionsGetOrderSchema;

const AutoConversionRulesCreateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "idempotency_key": z.string().optional(), "source": z.object({ "asset": z.string(), "network": z.string() }).strict(), "destination": z.object({ "asset": z.string(), "network": z.string().optional(), "wallet_address": z.string().optional(), "external_account_id": z.string().optional() }).strict() }).strict() }).strict()
toolSchemas["auto_conversion_rules.create"] = AutoConversionRulesCreateSchema;

const AutoConversionRulesGetSchema = z.object({ "customer_id": z.string(), "rule_id": z.string() }).strict()
toolSchemas["auto_conversion_rules.get"] = AutoConversionRulesGetSchema;

const AutoConversionRulesGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["auto_conversion_rules.get_by_idempotency_key"] = AutoConversionRulesGetByIdempotencyKeySchema;

const AutoConversionRulesListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "page": z.number().int().optional(), "size": z.number().int().optional() }).strict().optional() }).strict()
toolSchemas["auto_conversion_rules.list"] = AutoConversionRulesListSchema;

const AutoConversionRulesDeleteSchema = z.object({ "customer_id": z.string(), "rule_id": z.string() }).strict()
toolSchemas["auto_conversion_rules.delete"] = AutoConversionRulesDeleteSchema;

const AutoConversionRulesListOrdersSchema = z.object({ "customer_id": z.string(), "rule_id": z.string(), "params": z.object({ "status": z.string().optional(), "page": z.number().int().optional(), "size": z.number().int().optional() }).strict().optional() }).strict()
toolSchemas["auto_conversion_rules.list_orders"] = AutoConversionRulesListOrdersSchema;

const AutoConversionRulesGetOrderSchema = z.object({ "customer_id": z.string(), "rule_id": z.string(), "order_id": z.string() }).strict()
toolSchemas["auto_conversion_rules.get_order"] = AutoConversionRulesGetOrderSchema;

const WithdrawalsCreateSchema = z.object({ "customer_id": z.string(), "request": z.object({ "idempotency_key": z.string().optional(), "amount": z.string(), "asset": z.enum(["USD","USDC","USDT","PYUSD","RLUSD","USDG","USDP","EURC","MXNB"]), "network": z.enum(["US_ACH","SWIFT","US_FEDWIRE","ARBITRUM","AVALANCHE","BASE","BNBCHAIN","ETHEREUM","POLYGON","SOLANA"]), "wallet_address": z.string().optional(), "external_account_id": z.string().optional(), "code": z.string().optional() }).strict().and(z.any().superRefine((x, ctx) => {
    const schemas = [z.object({ "wallet_address": z.string() }), z.object({ "external_account_id": z.string() })];
    const errors = schemas.reduce<z.ZodError[]>(
      (errors, schema) =>
        ((result) =>
          result.error ? [...errors, result.error] : errors)(
          schema.safeParse(x),
        ),
      [],
    );
    if (schemas.length - errors.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid input: Should pass single schema",
      });
    }
  })) }).strict()
toolSchemas["withdrawals.create"] = WithdrawalsCreateSchema;

const WithdrawalsGetSchema = z.object({ "customer_id": z.string(), "withdrawal_id": z.string() }).strict()
toolSchemas["withdrawals.get"] = WithdrawalsGetSchema;

const WithdrawalsGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["withdrawals.get_by_idempotency_key"] = WithdrawalsGetByIdempotencyKeySchema;

const RecipientsGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["recipients.get_by_idempotency_key"] = RecipientsGetByIdempotencyKeySchema;

const TransactionsListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "transaction_id": z.string().optional(), "asset": z.enum(["USD","USDC","USDT","PYUSD","RLUSD","USDG","USDP","EURC","MXNB"]).optional(), "created_after": z.string().optional(), "created_before": z.string().optional(), "page": z.number().int().optional(), "size": z.number().int().optional() }).strict().optional() }).strict()
toolSchemas["transactions.list"] = TransactionsListSchema;

const TransactionsGetSchema = z.object({ "customer_id": z.string(), "transaction_id": z.string() }).strict()
toolSchemas["transactions.get"] = TransactionsGetSchema;

const SimulationsSimulateDepositSchema = z.object({ "customer_id": z.string(), "request": z.object({ "asset": z.enum(["USD","USDC","USDT","PYUSD","RLUSD","USDG","USDP","EURC","MXNB"]), "network": z.enum(["US_ACH","SWIFT","US_FEDWIRE","ARBITRUM","AVALANCHE","BASE","BNBCHAIN","ETHEREUM","POLYGON","SOLANA"]).optional(), "amount": z.string(), "reference_code": z.string().optional() }).strict() }).strict()
toolSchemas["simulations.simulate_deposit"] = SimulationsSimulateDepositSchema;

const EchoGetSchema = z.object({}).strict()
toolSchemas["echo.get"] = EchoGetSchema;

const EchoPostSchema = z.object({ "request": z.object({ "message": z.string() }).strict() }).strict()
toolSchemas["echo.post"] = EchoPostSchema;

const RecipientsListSchema = z.object({ "customer_id": z.string(), "params": z.object({ "search": z.union([z.string(), z.null()]).optional(), "page": z.number().int().gte(0).optional(), "size": z.number().int().gte(0).optional() }).strict().optional() }).strict()
toolSchemas["recipients.list"] = RecipientsListSchema;

const RecipientsGetSchema = z.object({ "customer_id": z.string(), "recipient_id": z.string() }).strict()
toolSchemas["recipients.get"] = RecipientsGetSchema;

const RecipientsDeleteSchema = z.object({ "customer_id": z.string(), "recipient_id": z.string() }).strict()
toolSchemas["recipients.delete"] = RecipientsDeleteSchema;

const RecipientsBankAccountsGetByIdempotencyKeySchema = z.object({ "customer_id": z.string(), "recipient_id": z.string(), "idempotency_key": z.string() }).strict()
toolSchemas["recipients.bank_accounts.get_by_idempotency_key"] = RecipientsBankAccountsGetByIdempotencyKeySchema;

const RecipientsBankAccountsCreateSchema = z.object({ "customer_id": z.string(), "recipient_id": z.string(), "request": z.object({ "idempotency_key": z.string(), "network": z.enum(["US_ACH","SWIFT","US_FEDWIRE"]), "nickname": z.union([z.string(), z.null()]).optional(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.enum(["AND","ARE","AFG","ATG","AIA","ALB","ARM","AGO","ARG","ASM","AUT","AUS","ABW","AZE","BIH","BRB","BGD","BEL","BFA","BGR","BHR","BDI","BEN","BLM","BMU","BRN","BOL","BRA","BHS","BTN","BWA","BLR","BLZ","CAN","CCK","COD","CAF","COG","CHE","CIV","COK","CHL","CMR","CHN","COL","CRI","CUB","CPV","CUW","CXR","CYP","CZE","DEU","DJI","DNK","DMA","DOM","DZA","ECU","EST","EGY","ESH","ERI","ESP","ETH","FIN","FJI","FLK","FSM","FRO","FRA","GAB","GBR","GRD","GEO","GUF","GGY","GHA","GIB","GRL","GMB","GIN","GLP","GNQ","GRC","SGS","GTM","GUM","GNB","GUY","HKG","HND","HRV","HTI","HUN","IDN","IRL","ISR","IMN","IND","IOT","IRQ","IRN","ISL","ITA","JEY","JAM","JOR","JPN","KEN","KGZ","KHM","KIR","COM","KNA","PRK","KOR","KWT","CYM","KAZ","LAO","LBN","LCA","LIE","LKA","LBR","LSO","LTU","LUX","LVA","LBY","MAR","MCO","MDA","MNE","MAF","MDG","MHL","MKD","MLI","MMR","MNG","MAC","MNP","MTQ","MRT","MSR","MLT","MUS","MDV","MWI","MEX","MYS","MOZ","NAM","NCL","NER","NFK","NGA","NIC","NLD","NOR","NPL","NRU","NIU","NZL","OMN","PAN","PER","PYF","PNG","PHL","PAK","POL","SPM","PCN","PRI","PSE","PRT","PLW","PRY","QAT","REU","ROU","SRB","RUS","RWA","SAU","SLB","SYC","SDN","SWE","SGP","SHN","SVN","SJM","SVK","SLE","SMR","SEN","SOM","SUR","SSD","STP","SLV","SXM","SYR","SWZ","TCA","TCD","TGO","THA","TJK","TKL","TLS","TKM","TUN","TON","TUR","TTO","TUV","TWN","TZA","UKR","UGA","USA","URY","UZB","VAT","VCT","VEN","VGB","VIR","VNM","VUT","WLF","WSM","YEM","MYT","ZAF","ZMB","ZWE"]), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.union([z.string(), z.null()]).optional(), "intermediary_bank": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "institution_id": z.string() }).strict()];
    const errors = schemas.reduce<z.ZodError[]>(
      (errors, schema) =>
        ((result) =>
          result.error ? [...errors, result.error] : errors)(
          schema.safeParse(x),
        ),
      [],
    );
    if (schemas.length - errors.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid input: Should pass single schema",
      });
    }
  }).optional() }).strict() }).strict()
toolSchemas["recipients.bank_accounts.create"] = RecipientsBankAccountsCreateSchema;

const RecipientsBankAccountsListSchema = z.object({ "customer_id": z.string(), "recipient_id": z.string(), "params": z.object({ "currency": z.union([z.string(), z.null()]).optional(), "network": z.union([z.string(), z.null()]).optional() }).strict().optional() }).strict()
toolSchemas["recipients.bank_accounts.list"] = RecipientsBankAccountsListSchema;

const RecipientsBankAccountsDeleteSchema = z.object({ "customer_id": z.string(), "recipient_id": z.string(), "bank_account_id": z.string() }).strict()
toolSchemas["recipients.bank_accounts.delete"] = RecipientsBankAccountsDeleteSchema;

const AssetsListResponseSchema = z.array(z.object({ "customer_id": z.string(), "asset": z.string(), "network": z.string().optional(), "available_amount": z.string(), "unavailable_amount": z.string(), "created_at": z.string(), "modified_at": z.string() }).strict())
toolResponseSchemas["assets.list"] = AssetsListResponseSchema;

const CustomerCreateTosLinkResponseSchema = z.object({ "url": z.string(), "session_token": z.string(), "expires_in": z.number().int() }).strict()
toolResponseSchemas["customer.create_tos_link"] = CustomerCreateTosLinkResponseSchema;

const CustomerSignTosAgreementResponseSchema = z.object({ "signed_agreement_id": z.string() }).strict()
toolResponseSchemas["customer.sign_tos_agreement"] = CustomerSignTosAgreementResponseSchema;

const CustomerCreateResponseSchema = z.object({ "customer_id": z.string(), "email": z.string(), "business_legal_name": z.string(), "business_description": z.string().optional(), "business_type": z.enum(["cooperative","corporation","llc","partnership","sole_proprietorship"]), "business_industry": z.string().optional(), "business_registration_number": z.string().optional(), "date_of_incorporation": z.string().optional(), "incorporation_country": z.string().optional(), "incorporation_state": z.string().optional(), "registered_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict().optional(), "physical_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict().optional(), "primary_website": z.string().optional(), "publicly_traded": z.boolean().optional(), "tax_id": z.string().optional(), "tax_type": z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"]).optional(), "tax_country": z.string().optional(), "status": z.enum(["init","pending_review","under_review","pending_response","escalated","pending_approval","rejected","approved"]), "submitted_at": z.string().optional(), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.create"] = CustomerCreateResponseSchema;

const CustomerListResponseSchema = z.object({ "customers": z.array(z.object({ "customer_id": z.string(), "email": z.string(), "business_legal_name": z.string(), "business_type": z.enum(["cooperative","corporation","llc","partnership","sole_proprietorship"]), "status": z.enum(["init","pending_review","under_review","pending_response","escalated","pending_approval","rejected","approved"]), "created_at": z.string(), "updated_at": z.string() }).strict()), "total": z.number().int() }).strict()
toolResponseSchemas["customer.list"] = CustomerListResponseSchema;

const CustomerGetResponseSchema = z.object({ "customer_id": z.string(), "email": z.string(), "business_legal_name": z.string(), "business_description": z.string().optional(), "business_type": z.enum(["cooperative","corporation","llc","partnership","sole_proprietorship"]), "business_industry": z.string().optional(), "business_registration_number": z.string().optional(), "date_of_incorporation": z.string().optional(), "incorporation_country": z.string().optional(), "incorporation_state": z.string().optional(), "registered_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict().optional(), "physical_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict().optional(), "primary_website": z.string().optional(), "publicly_traded": z.boolean().optional(), "tax_id": z.string().optional(), "tax_type": z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"]).optional(), "tax_country": z.string().optional(), "status": z.enum(["init","pending_review","under_review","pending_response","escalated","pending_approval","rejected","approved"]), "submitted_at": z.string().optional(), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.get"] = CustomerGetResponseSchema;

const CustomerUpdateResponseSchema = z.object({ "customer_id": z.string(), "email": z.string(), "business_legal_name": z.string(), "business_description": z.string().optional(), "business_type": z.enum(["cooperative","corporation","llc","partnership","sole_proprietorship"]), "business_industry": z.string().optional(), "business_registration_number": z.string().optional(), "date_of_incorporation": z.string().optional(), "incorporation_country": z.string().optional(), "incorporation_state": z.string().optional(), "registered_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict().optional(), "physical_address": z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict().optional(), "primary_website": z.string().optional(), "publicly_traded": z.boolean().optional(), "tax_id": z.string().optional(), "tax_type": z.enum(["SSN","EIN","TFN","ABN","ACN","UTR","NINO","NRIC","FIN","ASDG","ITR","NIF","TIN","VAT","CUIL","CUIT","DNI","BIN","UNP","RNPM","NIT","CPF","CNPJ","NIRE","UCN","UIC","SIN","BN","RUT","IIN","USCC","CNOC","USCN","ITIN","CPJ","OIB","DIC","CPR","CVR","CN","RNC","RUC","TN","HETU","YT","ALV","SIREN","IDNR","STNR","VTA","HKID","AJ","EN","KN","VSK","PAN","GSTN","NIK","NPWP","PPS","TRN","CRO","CHY","CF","IVA","IN","JCT","EDRPOU","EID"]).optional(), "tax_country": z.string().optional(), "status": z.enum(["init","pending_review","under_review","pending_response","escalated","pending_approval","rejected","approved"]), "submitted_at": z.string().optional(), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.update"] = CustomerUpdateResponseSchema;

const CustomerAssociatedPersonsCreateResponseSchema = z.object({ "associated_person_id": z.string(), "email": z.string(), "first_name": z.string(), "middle_name": z.string().optional(), "last_name": z.string(), "birth_date": z.string(), "primary_nationality": z.string(), "residential_address": z.union([z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict(), z.null()]), "applicant_type": z.string(), "title": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.number().optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.associated_persons.create"] = CustomerAssociatedPersonsCreateResponseSchema;

const CustomerAssociatedPersonsListResponseSchema = z.array(z.object({ "associated_person_id": z.string(), "email": z.string(), "first_name": z.string(), "middle_name": z.string().optional(), "last_name": z.string(), "birth_date": z.string(), "primary_nationality": z.string(), "residential_address": z.union([z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict(), z.null()]), "applicant_type": z.string(), "title": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.number().optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "created_at": z.string(), "updated_at": z.string() }).strict())
toolResponseSchemas["customer.associated_persons.list"] = CustomerAssociatedPersonsListResponseSchema;

const CustomerAssociatedPersonsGetResponseSchema = z.object({ "associated_person_id": z.string(), "email": z.string(), "first_name": z.string(), "middle_name": z.string().optional(), "last_name": z.string(), "birth_date": z.string(), "primary_nationality": z.string(), "residential_address": z.union([z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict(), z.null()]), "applicant_type": z.string(), "title": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.number().optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.associated_persons.get"] = CustomerAssociatedPersonsGetResponseSchema;

const CustomerAssociatedPersonsUpdateResponseSchema = z.object({ "associated_person_id": z.string(), "email": z.string(), "first_name": z.string(), "middle_name": z.string().optional(), "last_name": z.string(), "birth_date": z.string(), "primary_nationality": z.string(), "residential_address": z.union([z.object({ "street_line_1": z.string(), "city": z.string(), "country": z.string(), "state": z.string(), "postal_code": z.string(), "street_line_2": z.string().optional(), "subdivision": z.string().optional() }).strict(), z.null()]), "applicant_type": z.string(), "title": z.string(), "has_ownership": z.boolean(), "ownership_percentage": z.number().optional(), "has_control": z.boolean(), "is_signer": z.boolean(), "is_director": z.boolean(), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["customer.associated_persons.update"] = CustomerAssociatedPersonsUpdateResponseSchema;

const CustomerAssociatedPersonsDeleteResponseSchema = z.union([z.null(), z.record(z.string(), z.any())])
toolResponseSchemas["customer.associated_persons.delete"] = CustomerAssociatedPersonsDeleteResponseSchema;

const ExternalAccountsCreateResponseSchema = z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.string(), "network": z.string(), "nickname": z.string().optional(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.string(), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string().optional(), "intermediary_bank": z.object({ "institution_id": z.string(), "institution_name": z.string().optional() }).strict().optional(), "reference_code": z.string().optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["external_accounts.create"] = ExternalAccountsCreateResponseSchema;

const ExternalAccountsGetResponseSchema = z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.string(), "network": z.string(), "nickname": z.string().optional(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.string(), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string().optional(), "intermediary_bank": z.object({ "institution_id": z.string(), "institution_name": z.string().optional() }).strict().optional(), "reference_code": z.string().optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["external_accounts.get"] = ExternalAccountsGetResponseSchema;

const ExternalAccountsGetByIdempotencyKeyResponseSchema = z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.string(), "network": z.string(), "nickname": z.string().optional(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.string(), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string().optional(), "intermediary_bank": z.object({ "institution_id": z.string(), "institution_name": z.string().optional() }).strict().optional(), "reference_code": z.string().optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["external_accounts.get_by_idempotency_key"] = ExternalAccountsGetByIdempotencyKeyResponseSchema;

const ExternalAccountsListResponseSchema = z.array(z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.string(), "network": z.string(), "nickname": z.string().optional(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.string(), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string().optional(), "intermediary_bank": z.object({ "institution_id": z.string(), "institution_name": z.string().optional() }).strict().optional(), "reference_code": z.string().optional(), "created_at": z.string(), "modified_at": z.string() }).strict())
toolResponseSchemas["external_accounts.list"] = ExternalAccountsListResponseSchema;

const ExternalAccountsRemoveResponseSchema = z.union([z.null(), z.record(z.string(), z.any())])
toolResponseSchemas["external_accounts.remove"] = ExternalAccountsRemoveResponseSchema;

const RecipientsCreateResponseSchema = z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.string().optional(), "email": z.string().optional(), "relationship": z.string().optional(), "status": z.string(), "address": z.union([z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.string().optional(), "city": z.string(), "region": z.string().optional(), "postal_code": z.string() }).strict(), z.null()]).optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["recipients.create"] = RecipientsCreateResponseSchema;

const InstructionsGetDepositInstructionResponseSchema = z.object({ "asset": z.string(), "network": z.string(), "bank_instruction": z.object({ "bank_name": z.string().optional(), "routing_number": z.string().optional(), "account_holder": z.string().optional(), "account_number": z.string().optional(), "account_identifier": z.string().optional(), "bic_code": z.string().optional(), "address": z.object({ "street_line_1": z.string().optional(), "street_line_2": z.string().optional(), "city": z.string().optional(), "state": z.string().optional(), "country": z.string().optional(), "postal_code": z.string().optional() }).strict().optional(), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }).strict() }).strict().optional(), "wallet_instruction": z.object({ "wallet_address": z.string().optional(), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }).strict() }).strict().optional(), "transaction_action": z.string(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["instructions.get_deposit_instruction"] = InstructionsGetDepositInstructionResponseSchema;

const ConversionsCreateQuoteResponseSchema = z.object({ "quote_id": z.string(), "user_pay_amount": z.string(), "user_pay_asset": z.string(), "user_pay_network": z.string(), "user_obtain_amount": z.string(), "user_obtain_asset": z.string(), "user_obtain_network": z.string(), "rate": z.string(), "expire_time": z.number().int(), "valid_until_timestamp": z.string() }).strict()
toolResponseSchemas["conversions.create_quote"] = ConversionsCreateQuoteResponseSchema;

const ConversionsCreateHedgeResponseSchema = z.object({ "order_id": z.string(), "order_status": z.string(), "quote_id": z.string(), "user_pay_amount": z.string(), "user_pay_asset": z.string(), "user_pay_network": z.string(), "user_obtain_amount": z.string(), "user_obtain_asset": z.string(), "user_obtain_network": z.string(), "rate": z.string(), "fee": z.string(), "fee_currency": z.string() }).strict()
toolResponseSchemas["conversions.create_hedge"] = ConversionsCreateHedgeResponseSchema;

const ConversionsGetOrderResponseSchema = z.object({ "order_id": z.string(), "order_status": z.string(), "quote_id": z.string(), "user_pay_amount": z.string(), "user_pay_asset": z.string(), "user_pay_network": z.string(), "user_obtain_amount": z.string(), "user_obtain_asset": z.string(), "user_obtain_network": z.string(), "rate": z.string(), "fee": z.string(), "fee_currency": z.string() }).strict()
toolResponseSchemas["conversions.get_order"] = ConversionsGetOrderResponseSchema;

const AutoConversionRulesCreateResponseSchema = z.object({ "auto_conversion_rule_id": z.string(), "idempotency_key": z.string(), "nickname": z.string(), "status": z.enum(["PENDING","ACTIVE","INACTIVE"]), "source": z.object({ "asset": z.string(), "network": z.string() }).strict(), "destination": z.object({ "asset": z.string(), "network": z.string().optional(), "wallet_address": z.string().optional(), "external_account_id": z.string().optional() }).strict(), "deposit_info_status": z.enum(["PENDING","ACTIVE","INACTIVE"]).optional(), "source_deposit_info": z.any().superRefine((x, ctx) => {
    const schemas = [z.object({ "network": z.string(), "reference_code": z.string(), "minimum_deposit_amount": z.string(), "recipient_name": z.string().optional(), "bank_name": z.string().optional(), "routing_number": z.string().optional(), "account_holder_name": z.string().optional(), "account_number": z.string().optional(), "country_code": z.string().optional(), "street": z.string().optional(), "additional": z.string().optional(), "city": z.string().optional(), "region": z.string().optional(), "postal_code": z.string().optional(), "bic_code": z.string().optional() }).strict(), z.object({ "wallet_address": z.string(), "minimum_deposit_amount": z.string(), "contract_address": z.string() }).strict()];
    const errors = schemas.reduce<z.ZodError[]>(
      (errors, schema) =>
        ((result) =>
          result.error ? [...errors, result.error] : errors)(
          schema.safeParse(x),
        ),
      [],
    );
    if (schemas.length - errors.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid input: Should pass single schema",
      });
    }
  }).optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["auto_conversion_rules.create"] = AutoConversionRulesCreateResponseSchema;

const AutoConversionRulesGetResponseSchema = z.object({ "auto_conversion_rule_id": z.string(), "idempotency_key": z.string(), "nickname": z.string(), "status": z.enum(["PENDING","ACTIVE","INACTIVE"]), "source": z.object({ "asset": z.string(), "network": z.string() }).strict(), "destination": z.object({ "asset": z.string(), "network": z.string().optional(), "wallet_address": z.string().optional(), "external_account_id": z.string().optional() }).strict(), "deposit_info_status": z.enum(["PENDING","ACTIVE","INACTIVE"]).optional(), "source_deposit_info": z.any().superRefine((x, ctx) => {
    const schemas = [z.object({ "network": z.string(), "reference_code": z.string(), "minimum_deposit_amount": z.string(), "recipient_name": z.string().optional(), "bank_name": z.string().optional(), "routing_number": z.string().optional(), "account_holder_name": z.string().optional(), "account_number": z.string().optional(), "country_code": z.string().optional(), "street": z.string().optional(), "additional": z.string().optional(), "city": z.string().optional(), "region": z.string().optional(), "postal_code": z.string().optional(), "bic_code": z.string().optional() }).strict(), z.object({ "wallet_address": z.string(), "minimum_deposit_amount": z.string(), "contract_address": z.string() }).strict()];
    const errors = schemas.reduce<z.ZodError[]>(
      (errors, schema) =>
        ((result) =>
          result.error ? [...errors, result.error] : errors)(
          schema.safeParse(x),
        ),
      [],
    );
    if (schemas.length - errors.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid input: Should pass single schema",
      });
    }
  }).optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["auto_conversion_rules.get"] = AutoConversionRulesGetResponseSchema;

const AutoConversionRulesGetByIdempotencyKeyResponseSchema = z.object({ "auto_conversion_rule_id": z.string(), "idempotency_key": z.string(), "nickname": z.string(), "status": z.enum(["PENDING","ACTIVE","INACTIVE"]), "source": z.object({ "asset": z.string(), "network": z.string() }).strict(), "destination": z.object({ "asset": z.string(), "network": z.string().optional(), "wallet_address": z.string().optional(), "external_account_id": z.string().optional() }).strict(), "deposit_info_status": z.enum(["PENDING","ACTIVE","INACTIVE"]).optional(), "source_deposit_info": z.any().superRefine((x, ctx) => {
    const schemas = [z.object({ "network": z.string(), "reference_code": z.string(), "minimum_deposit_amount": z.string(), "recipient_name": z.string().optional(), "bank_name": z.string().optional(), "routing_number": z.string().optional(), "account_holder_name": z.string().optional(), "account_number": z.string().optional(), "country_code": z.string().optional(), "street": z.string().optional(), "additional": z.string().optional(), "city": z.string().optional(), "region": z.string().optional(), "postal_code": z.string().optional(), "bic_code": z.string().optional() }).strict(), z.object({ "wallet_address": z.string(), "minimum_deposit_amount": z.string(), "contract_address": z.string() }).strict()];
    const errors = schemas.reduce<z.ZodError[]>(
      (errors, schema) =>
        ((result) =>
          result.error ? [...errors, result.error] : errors)(
          schema.safeParse(x),
        ),
      [],
    );
    if (schemas.length - errors.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid input: Should pass single schema",
      });
    }
  }).optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["auto_conversion_rules.get_by_idempotency_key"] = AutoConversionRulesGetByIdempotencyKeyResponseSchema;

const AutoConversionRulesListResponseSchema = z.object({ "total": z.number().int(), "items": z.array(z.object({ "auto_conversion_rule_id": z.string(), "idempotency_key": z.string(), "nickname": z.string(), "status": z.enum(["PENDING","ACTIVE","INACTIVE"]), "source": z.object({ "asset": z.string(), "network": z.string() }).strict(), "destination": z.object({ "asset": z.string(), "network": z.string().optional(), "wallet_address": z.string().optional(), "external_account_id": z.string().optional() }).strict(), "deposit_info_status": z.enum(["PENDING","ACTIVE","INACTIVE"]).optional(), "source_deposit_info": z.any().superRefine((x, ctx) => {
    const schemas = [z.object({ "network": z.string(), "reference_code": z.string(), "minimum_deposit_amount": z.string(), "recipient_name": z.string().optional(), "bank_name": z.string().optional(), "routing_number": z.string().optional(), "account_holder_name": z.string().optional(), "account_number": z.string().optional(), "country_code": z.string().optional(), "street": z.string().optional(), "additional": z.string().optional(), "city": z.string().optional(), "region": z.string().optional(), "postal_code": z.string().optional(), "bic_code": z.string().optional() }).strict(), z.object({ "wallet_address": z.string(), "minimum_deposit_amount": z.string(), "contract_address": z.string() }).strict()];
    const errors = schemas.reduce<z.ZodError[]>(
      (errors, schema) =>
        ((result) =>
          result.error ? [...errors, result.error] : errors)(
          schema.safeParse(x),
        ),
      [],
    );
    if (schemas.length - errors.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid input: Should pass single schema",
      });
    }
  }).optional(), "created_at": z.string(), "modified_at": z.string() }).strict()) }).strict()
toolResponseSchemas["auto_conversion_rules.list"] = AutoConversionRulesListResponseSchema;

const AutoConversionRulesDeleteResponseSchema = z.union([z.null(), z.record(z.string(), z.any())])
toolResponseSchemas["auto_conversion_rules.delete"] = AutoConversionRulesDeleteResponseSchema;

const AutoConversionRulesListOrdersResponseSchema = z.object({ "total": z.number().int(), "items": z.array(z.object({ "auto_conversion_order_id": z.string(), "auto_conversion_rule_id": z.string(), "status": z.string(), "source": z.object({ "asset": z.string(), "network": z.string() }).strict(), "destination": z.object({ "asset": z.string(), "network": z.string().optional(), "wallet_address": z.string().optional(), "external_account_id": z.string().optional() }).strict(), "receipt": z.object({ "initial": z.object({ "amount": z.string(), "asset": z.string() }).strict(), "developer_fee": z.object({ "amount": z.string(), "asset": z.string() }).strict(), "deposit_fee": z.object({ "amount": z.string(), "asset": z.string() }).strict(), "conversion_fee": z.object({ "amount": z.string(), "asset": z.string() }).strict(), "withdrawal_fee": z.object({ "amount": z.string(), "asset": z.string() }).strict().optional() }).strict(), "created_at": z.string(), "updated_at": z.string() }).strict()) }).strict()
toolResponseSchemas["auto_conversion_rules.list_orders"] = AutoConversionRulesListOrdersResponseSchema;

const AutoConversionRulesGetOrderResponseSchema = z.object({ "auto_conversion_order_id": z.string(), "auto_conversion_rule_id": z.string(), "status": z.string(), "source": z.object({ "asset": z.string(), "network": z.string() }).strict(), "destination": z.object({ "asset": z.string(), "network": z.string().optional(), "wallet_address": z.string().optional(), "external_account_id": z.string().optional() }).strict(), "receipt": z.object({ "initial": z.object({ "amount": z.string(), "asset": z.string() }).strict(), "developer_fee": z.object({ "amount": z.string(), "asset": z.string() }).strict(), "deposit_fee": z.object({ "amount": z.string(), "asset": z.string() }).strict(), "conversion_fee": z.object({ "amount": z.string(), "asset": z.string() }).strict(), "withdrawal_fee": z.object({ "amount": z.string(), "asset": z.string() }).strict().optional() }).strict(), "created_at": z.string(), "updated_at": z.string() }).strict()
toolResponseSchemas["auto_conversion_rules.get_order"] = AutoConversionRulesGetOrderResponseSchema;

const WithdrawalsCreateResponseSchema = z.object({ "transaction_id": z.string(), "idempotency_key": z.string(), "amount": z.string(), "asset": z.string(), "network": z.string(), "wallet_address": z.string().optional(), "external_account_id": z.string().optional(), "code": z.string().optional(), "status": z.string(), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }).strict(), "transaction_action": z.string(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["withdrawals.create"] = WithdrawalsCreateResponseSchema;

const WithdrawalsGetResponseSchema = z.object({ "transaction_id": z.string(), "idempotency_key": z.string(), "amount": z.string(), "asset": z.string(), "network": z.string(), "wallet_address": z.string().optional(), "external_account_id": z.string().optional(), "code": z.string().optional(), "status": z.string(), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }).strict(), "transaction_action": z.string(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["withdrawals.get"] = WithdrawalsGetResponseSchema;

const WithdrawalsGetByIdempotencyKeyResponseSchema = z.object({ "transaction_id": z.string(), "idempotency_key": z.string(), "amount": z.string(), "asset": z.string(), "network": z.string(), "wallet_address": z.string().optional(), "external_account_id": z.string().optional(), "code": z.string().optional(), "status": z.string(), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }).strict(), "transaction_action": z.string(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["withdrawals.get_by_idempotency_key"] = WithdrawalsGetByIdempotencyKeyResponseSchema;

const RecipientsGetByIdempotencyKeyResponseSchema = z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.any().superRefine((x, ctx) => {
    const schemas = [z.string(), z.null()];
    const errors = schemas.reduce<z.ZodError[]>(
      (errors, schema) =>
        ((result) =>
          result.error ? [...errors, result.error] : errors)(
          schema.safeParse(x),
        ),
      [],
    );
    if (schemas.length - errors.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid input: Should pass single schema",
      });
    }
  }).optional(), "email": z.any().superRefine((x, ctx) => {
    const schemas = [z.string(), z.null()];
    const errors = schemas.reduce<z.ZodError[]>(
      (errors, schema) =>
        ((result) =>
          result.error ? [...errors, result.error] : errors)(
          schema.safeParse(x),
        ),
      [],
    );
    if (schemas.length - errors.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid input: Should pass single schema",
      });
    }
  }).optional(), "relationship": z.any().superRefine((x, ctx) => {
    const schemas = [z.string(), z.null()];
    const errors = schemas.reduce<z.ZodError[]>(
      (errors, schema) =>
        ((result) =>
          result.error ? [...errors, result.error] : errors)(
          schema.safeParse(x),
        ),
      [],
    );
    if (schemas.length - errors.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid input: Should pass single schema",
      });
    }
  }).optional(), "status": z.string(), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.null(), z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.string().optional(), "city": z.string(), "region": z.string().optional(), "postal_code": z.string() }).strict()];
    const errors = schemas.reduce<z.ZodError[]>(
      (errors, schema) =>
        ((result) =>
          result.error ? [...errors, result.error] : errors)(
          schema.safeParse(x),
        ),
      [],
    );
    if (schemas.length - errors.length !== 1) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid input: Should pass single schema",
      });
    }
  }).optional(), "created_at": z.string().datetime({ offset: true }), "modified_at": z.string().datetime({ offset: true }) }).strict()
toolResponseSchemas["recipients.get_by_idempotency_key"] = RecipientsGetByIdempotencyKeyResponseSchema;

const TransactionsListResponseSchema = z.object({ "list": z.array(z.object({ "customer_id": z.string(), "transaction_id": z.string(), "idempotency_key": z.string(), "transaction_action": z.enum(["DEPOSIT","WITHDRAWAL","CONVERSION"]), "amount": z.string(), "asset": z.string().optional(), "network": z.string().optional(), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }).strict(), "source": z.object({ "amount": z.string().optional(), "asset": z.string().optional(), "network": z.string().optional(), "address_id": z.string() }).strict(), "destination": z.object({ "amount": z.string().optional(), "asset": z.string().optional(), "network": z.string().optional(), "address_id": z.string() }).strict(), "status": z.enum(["PENDING","COMPLETED","FAILED","REVERSED"]), "created_at": z.string(), "modified_at": z.string() }).strict()), "total": z.number().int().optional() }).strict()
toolResponseSchemas["transactions.list"] = TransactionsListResponseSchema;

const TransactionsGetResponseSchema = z.object({ "customer_id": z.string(), "transaction_id": z.string(), "idempotency_key": z.string(), "transaction_action": z.enum(["DEPOSIT","WITHDRAWAL","CONVERSION"]), "amount": z.string(), "asset": z.string().optional(), "network": z.string().optional(), "transaction_fee": z.object({ "value": z.string(), "asset": z.string() }).strict(), "source": z.object({ "amount": z.string().optional(), "asset": z.string().optional(), "network": z.string().optional(), "address_id": z.string() }).strict(), "destination": z.object({ "amount": z.string().optional(), "asset": z.string().optional(), "network": z.string().optional(), "address_id": z.string() }).strict(), "status": z.enum(["PENDING","COMPLETED","FAILED","REVERSED"]), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["transactions.get"] = TransactionsGetResponseSchema;

const SimulationsSimulateDepositResponseSchema = z.object({ "simulation_id": z.string(), "status": z.enum(["PENDING","COMPLETED","FAILED","REVERSED"]), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["simulations.simulate_deposit"] = SimulationsSimulateDepositResponseSchema;

const EchoGetResponseSchema = z.object({ "message": z.string(), "timestamp": z.string().optional() }).strict()
toolResponseSchemas["echo.get"] = EchoGetResponseSchema;

const EchoPostResponseSchema = z.object({ "message": z.string(), "timestamp": z.string().optional() }).strict()
toolResponseSchemas["echo.post"] = EchoPostResponseSchema;

const RecipientsListResponseSchema = z.object({ "list": z.array(z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.string().optional(), "email": z.string().optional(), "relationship": z.string().optional(), "status": z.string(), "address": z.union([z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.string().optional(), "city": z.string(), "region": z.string().optional(), "postal_code": z.string() }).strict(), z.null()]).optional(), "created_at": z.string(), "modified_at": z.string() }).strict()) }).strict()
toolResponseSchemas["recipients.list"] = RecipientsListResponseSchema;

const RecipientsGetResponseSchema = z.object({ "recipient_id": z.string(), "customer_id": z.string(), "business_type": z.string(), "full_name": z.string(), "nickname": z.string().optional(), "email": z.string().optional(), "relationship": z.string().optional(), "status": z.string(), "address": z.union([z.object({ "full_address": z.string(), "country_code": z.string(), "address_line1": z.string(), "address_line2": z.string().optional(), "city": z.string(), "region": z.string().optional(), "postal_code": z.string() }).strict(), z.null()]).optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["recipients.get"] = RecipientsGetResponseSchema;

const RecipientsDeleteResponseSchema = z.union([z.null(), z.record(z.string(), z.any())])
toolResponseSchemas["recipients.delete"] = RecipientsDeleteResponseSchema;

const RecipientsBankAccountsGetByIdempotencyKeyResponseSchema = z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.string(), "network": z.string(), "nickname": z.string().optional(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.string(), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string().optional(), "intermediary_bank": z.object({ "institution_id": z.string(), "institution_name": z.string().optional() }).strict().optional(), "reference_code": z.string().optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["recipients.bank_accounts.get_by_idempotency_key"] = RecipientsBankAccountsGetByIdempotencyKeyResponseSchema;

const RecipientsBankAccountsCreateResponseSchema = z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.string(), "network": z.string(), "nickname": z.string().optional(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.string(), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string().optional(), "intermediary_bank": z.object({ "institution_id": z.string(), "institution_name": z.string().optional() }).strict().optional(), "reference_code": z.string().optional(), "created_at": z.string(), "modified_at": z.string() }).strict()
toolResponseSchemas["recipients.bank_accounts.create"] = RecipientsBankAccountsCreateResponseSchema;

const RecipientsBankAccountsListResponseSchema = z.object({ "list": z.array(z.object({ "external_account_id": z.string(), "idempotency_key": z.string(), "customer_id": z.string(), "status": z.string(), "network": z.string(), "nickname": z.string().optional(), "account_holder_name": z.string(), "currency": z.string(), "country_code": z.string(), "account_number": z.string(), "institution_id": z.string(), "institution_name": z.string(), "institution_clearing_code": z.string().optional(), "intermediary_bank": z.object({ "institution_id": z.string(), "institution_name": z.string().optional() }).strict().optional(), "reference_code": z.string().optional(), "created_at": z.string(), "modified_at": z.string() }).strict()) }).strict()
toolResponseSchemas["recipients.bank_accounts.list"] = RecipientsBankAccountsListResponseSchema;

const RecipientsBankAccountsDeleteResponseSchema = z.union([z.null(), z.record(z.string(), z.any())])
toolResponseSchemas["recipients.bank_accounts.delete"] = RecipientsBankAccountsDeleteResponseSchema;

export type ToolName = keyof typeof toolSchemas;
export type ToolResponseName = keyof typeof toolResponseSchemas;
