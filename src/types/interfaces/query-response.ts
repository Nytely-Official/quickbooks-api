// Imports
import type { Invoice } from "./invoice";

/**
 * The Invoice Query Response
 */
export interface InvoiceQueryResponse extends QueryResponse {
	Invoice: Array<Invoice>;
}

/**
 * The Query Response
 */
export interface QueryResponse {
	startPosition: number;
	maxResults: number;
	totalCount: number;
}
