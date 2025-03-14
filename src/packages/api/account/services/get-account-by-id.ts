// Import the Query Builder
import type { Account, AccountOptions } from '../../../../types/types';
import { AccountAPI } from '../account-api';

/**
 * Get Account by ID
 * @param this - The Account API
 * @param id - The ID of the account
 * @returns The Account
 */
export async function getAccountById(this: AccountAPI, id: string, options: AccountOptions = {}): Promise<Account | null> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup ID Filter
	queryBuilder.whereId(id);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();
	// Get the Account
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Check if the Response Failed to find an Account
	if (!response) return null;

	// Format the Response
	const accounts = this.formatResponse(response);

	// Return the Account
	return accounts[0];
}
