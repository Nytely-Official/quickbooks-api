// Import the Query Builder
import { CreditMemoAPI } from '../credit-memo-api';
import type { CreditMemoQueryBuilder } from '../credit-memo-query-builder';
import type { CreditMemo, SearchResponse } from '../../../../types/types';

/**
 * Raw CreditMemo Query
 * @param this - The CreditMemo API
 * @param queryBuilder - The query builder to use
 * @returns Custom query results
 */
export async function rawCreditMemoQuery(this: CreditMemoAPI, queryBuilder: CreditMemoQueryBuilder): Promise<SearchResponse<CreditMemo>> {
	// Build the URL
	const url = queryBuilder.build();

	// Execute the custom query
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
