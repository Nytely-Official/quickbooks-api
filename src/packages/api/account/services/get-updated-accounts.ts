// Import the Query Builder
import { SearchOptions, SearchResponse, type Account } from '../../../../types/types';
import { AccountAPI } from '../account-api';

/**
 * Get Updated Accounts
 * @param this - The Account API
 * @param lastUpdatedDate - The last updated date
 * @returns The Accounts
 */
export async function getUpdatedAccounts(
	this: AccountAPI,
	lastUpdatedDate: Date,
	options: SearchOptions<Account> = {},
): Promise<SearchResponse<Account>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Last Updated Date Filter
	queryBuilder.whereLastUpdatedAfter(lastUpdatedDate);

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
