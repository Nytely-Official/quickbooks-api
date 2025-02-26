// Imports
import type { Estimate, Customer, Invoice, Payment, CreditMemo } from '../types';
import { Preferences } from './preference';

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
