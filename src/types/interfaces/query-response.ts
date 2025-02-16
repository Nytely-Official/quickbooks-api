// Imports
import type { Invoice } from '../types';
import type { Estimate } from '../types';
/**
 * The Invoice Query Response
 */
export interface InvoiceQueryResponse extends QueryResponse {
	Invoice: Array<Invoice>;
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
