// Import the Query Builder
import { EstimateAPI } from '../estimate-api';
import type { InvoiceQueryBuilder } from '../../invoices/invoice-query-builder';
import type { Estimate } from '../../../../types/types';

/**
 * Raw Estimate Query
 * @param this - The Estimate API
 * @param queryBuilder - The query builder to use
 * @returns Custom query results
 */
export async function rawEstimateQuery(this: EstimateAPI, queryBuilder: InvoiceQueryBuilder): Promise<Array<Estimate>> {
	// Build the URL
	const url = queryBuilder.build();

	// Execute the custom query
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const estimates = this.formatResponse(response);

	// Return the Estimates
	return estimates;
}
