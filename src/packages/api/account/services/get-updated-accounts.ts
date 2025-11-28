// Import the Query Builder
import type { Account, AccountOptions, SearchResponse } from '../../../../types/types';
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
	options: AccountOptions = {},
): Promise<SearchResponse<Account>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Last Updated Date Filter
	queryBuilder.whereLastUpdatedAfter(lastUpdatedDate);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Accounts
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const accounts = await this.formatResponse(responseData);

	// Setup the Search Response
	const searchResponse: SearchResponse<Account> = {
		results: accounts,
		hasNextPage: await this.hasNextPage(queryBuilder),
		intuitTID,
	};

	// Return the Accounts
	return searchResponse;
}
