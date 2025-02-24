// Imports
import type { Estimate, Customer, Invoice } from '../types';

/**
 * The Invoice Query Response
 */
export interface InvoiceQueryResponse extends QueryResponse {
	Invoice: Array<Invoice>;
}

/**
 * The Customer Query Response
 */
export interface CustomerQueryResponse extends QueryResponse {
	Customer: Array<Customer>;
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
