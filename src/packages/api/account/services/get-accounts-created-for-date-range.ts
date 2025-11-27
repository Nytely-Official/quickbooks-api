// Import the Query Builder
import { QuickbooksError, type Account, type AccountOptions, type SearchResponse } from '../../../../types/types';
import { ApiClient } from '../../api-client';
import { AccountAPI } from '../account-api';

/**
 * Get Accounts created for a Date Range
 * @param this - The Account API
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns The Accounts
 */
export async function getAccountsCreatedForDateRange(
	this: AccountAPI,
	startDate: Date,
	endDate: Date,
	options: AccountOptions = {},
): Promise<SearchResponse<Account>> {
	// Ensure the Start Date is Before the End Date
	if (startDate > endDate) throw new QuickbooksError('Start date must be before end date', await ApiClient.getIntuitErrorDetails(null));

	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Date Range Filters
	queryBuilder.whereCreatedAfter(startDate);
	queryBuilder.whereCreatedBefore(endDate);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Accounts
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
