// Import the Query Builder
import { BillAPI } from '../bill-api';
import type { BillQueryBuilder } from '../bill-query-builder';
import type { Bill, SearchResponse } from '../../../../types/types';

/**
 * Raw Bill Query
 * @param this - The Bill API
 * @param queryBuilder - The query builder to use
 * @returns Custom query results
 */
export async function rawBillQuery(this: BillAPI, queryBuilder: BillQueryBuilder): Promise<SearchResponse<Bill>> {
	// Build the URL
	const url = queryBuilder.build();

	// Execute the custom query
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const bills = this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<Bill> = {
		results: bills,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the Bills
	return searchResponse;
}
