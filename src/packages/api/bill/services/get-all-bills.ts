import type { Bill, BillOptions, SearchResponse } from '../../../../types/types';
import { BillAPI } from '../bill-api';

/**
 * Get All Bills
 * @param this - The Bill API
 * @param options - The options
 * @returns The Bills
 */
export async function getAllBills(this: BillAPI, options: BillOptions = {}): Promise<SearchResponse<Bill>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Build the URL
	const url = queryBuilder.build();

	// Get the Bills
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const bills = await this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<Bill> = {
		results: bills,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the Search Response
	return searchResponse;
}
