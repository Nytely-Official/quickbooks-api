// Import the Query Builder
import { AccountAPI } from '../account-api';
import type { AccountQueryBuilder } from '../account-query-builder';
import type { Account, SearchResponse } from '../../../../types/types';

/**
 * Raw Account Query
 * @param this - The Account API
 * @param queryBuilder - The query builder to use
 * @returns Custom query results
 */
export async function rawAccountQuery(this: AccountAPI, queryBuilder: AccountQueryBuilder): Promise<SearchResponse<Account>> {
	// Build the URL
	const url = queryBuilder.build();

	// Execute the custom query
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const accounts = await this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<Account> = {
		results: accounts,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the Accounts
	return searchResponse;
}
