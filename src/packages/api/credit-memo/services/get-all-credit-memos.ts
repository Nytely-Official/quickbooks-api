// Imports
import { type CreditMemo, type SearchOptions, type SearchResponse } from '../../../../types/types';
import { CreditMemoAPI } from '../credit-memo-api';

/**
 * Get All CreditMemos
 * @param this - The CreditMemo API
 * @returns The CreditMemos
 */
export async function getAllCreditMemos(this: CreditMemoAPI, options: SearchOptions<CreditMemo> = {}): Promise<SearchResponse<CreditMemo>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the CreditMemos
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const creditmemos = this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<CreditMemo> = {
		results: creditmemos,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the CreditMemos
	return searchResponse;
}
