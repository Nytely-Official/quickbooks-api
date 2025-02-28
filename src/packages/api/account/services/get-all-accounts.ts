// Imports
import { type Account, type SearchOptions, type SearchResponse } from '../../../../types/types';
import { AccountAPI } from '../account-api';

/**
 * Get All Accounts
 * @param this - The Account API
 * @returns The Accounts
 */
export async function getAllAccounts(this: AccountAPI, options: SearchOptions<Account> = {}): Promise<SearchResponse<Account>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Accounts
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const accounts = this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<Account> = {
		results: accounts,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the Accounts
	return searchResponse;
}
