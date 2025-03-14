// Imports
import type { Estimate, Customer, Invoice, Payment, Account, CreditMemo, Preferences, CompanyInfo } from '../types';

/**
 * The Invoice Query Response
 */
export interface InvoiceQueryResponse extends QueryResponse {
	Invoice: Array<Invoice>;
}
/**
 * The Credit Memo Query Response
 */
export interface CreditMemoQueryResponse extends QueryResponse {
	CreditMemo: Array<CreditMemo>;
}

/**
 * The Customer Query Response
 */
export interface CustomerQueryResponse extends QueryResponse {
	Customer: Array<Customer>;
}

/**
 * The Preference Query Response
 */

export interface PreferenceQueryResponse extends QueryResponse {
	Preferences: Array<Preferences>;
}
/**
 * The Payment Query Response
 */
export interface PaymentQueryResponse extends QueryResponse {
	Payment: Array<Payment>;
}

/**
 * The Account Query Response
 */
export interface AccountQueryResponse extends QueryResponse {
	Account: Array<Account>;
}

/**
 * The CompanyInfo Query Response
 */
export interface CompanyInfoQueryResponse extends QueryResponse {
	CompanyInfo: Array<CompanyInfo>;
}

/**
 * The Estimate Query Response
 */
export interface EstimateQueryResponse extends QueryResponse {
	Estimate: Array<Estimate>;
}

/**
 * The Query Response
 */
export interface QueryResponse {
	startPosition: number;
	maxResults: number;
	totalCount: number;
}
