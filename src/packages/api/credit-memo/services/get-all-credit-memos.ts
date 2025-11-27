// Imports
import type { CreditMemo, CreditMemoOptions, SearchResponse } from '../../../../types/types';
import { CreditMemoAPI } from '../credit-memo-api';

/**
 * Get All CreditMemos
 * @param this - The CreditMemo API
 * @returns The CreditMemos
 */
export async function getAllCreditMemos(this: CreditMemoAPI, options: CreditMemoOptions = {}): Promise<SearchResponse<CreditMemo>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the CreditMemos
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const creditmemos = await this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<CreditMemo> = {
		results: creditmemos,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the CreditMemos
	return searchResponse;
}
