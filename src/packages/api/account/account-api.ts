// Imports
import { ApiClient } from '../api-client';
import { Environment, Query, type Account, type AccountQueryResponse } from '../../../types/types';
import { Endpoints } from '../../../types/enums/endpoints';
import { AccountQueryBuilder } from './account-query-builder';

// Import the Services
import { getAllAccounts } from './services/get-all-accounts';
import { getAccountById } from './services/get-account-by-id';
import { getAccountsForDateRange } from './services/get-accounts-for-date-range';
import { getAccountsCreatedForDateRange } from './services/get-accounts-created-for-date-range';
import { getUpdatedAccounts } from './services/get-updated-accounts';
import { rawAccountQuery } from './services/raw-account-query';

/**
 * API Client
 */
export class AccountAPI {
	// The List of Account Services
	public readonly getAllAccounts = getAllAccounts.bind(this);
	public readonly getAccountById = getAccountById.bind(this);
	public readonly getAccountsCreatedForDateRange = getAccountsCreatedForDateRange.bind(this);
	public readonly getAccountsForDateRange = getAccountsForDateRange.bind(this);
	public readonly getUpdatedAccounts = getUpdatedAccounts.bind(this);
	public readonly rawAccountQuery = rawAccountQuery.bind(this);

	/**
	 * Constructor

	 * @param apiClient - The API Client
	 */
	constructor(protected readonly apiClient: ApiClient) {}

	/**
	 * Get the Company Endpoint
	 * @returns The Company Endpoint with the attached token realmId
	 */
	protected async getCompanyEndpoint() {
		// Get the Base Endpoint
		const baseEndpoint =
			this.apiClient.environment === Environment.Production ? Endpoints.ProductionCompanyApi : Endpoints.SandboxCompanyApi;

		// Get the Token
		const token = await this.apiClient.authProvider.getToken();

		// Return the Company Endpoint
		return `${baseEndpoint}/${token.realmId}`;
	}

	/**
	 * Format the Response
	 * @param response - The Response
	 * @returns The Accounts
	 */
	protected formatResponse(response: any): Array<Account> {
		// Check if the Response is Invalid
		if (!response?.QueryResponse) throw new Error('Invalid Response');

		// Check if the Account is Not set and Initialize an Empty Array
		if (!response.QueryResponse.Account) response.QueryResponse.Account = new Array<Account>();

		// Get the Accounts
		const queryResponse = response.QueryResponse as AccountQueryResponse;

		// Return the Accounts
		return queryResponse.Account;
	}

	/**
	 * Get the Query Builder
	 * @returns The Query Builder
	 */
	public async getQueryBuilder(): Promise<AccountQueryBuilder> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new AccountQueryBuilder(companyEndpoint, Query.Account);

		// Return the Query Builder
		return queryBuilder;
	}

	/**
	 * Checks if there is a next page
	 * @param queryBuilder - The Query Builder
	 * @returns {boolean} True if there is a next page, false otherwise
	 */
	protected async hasNextPage(queryBuilder: AccountQueryBuilder): Promise<boolean> {
		// Check if the Auto Check Next Page is Disabled
		if (!this.apiClient.autoCheckNextPage) return false;

		// Get the Page Number
		const page = (queryBuilder.searchOptions.page || 1) + 1;

		// Update the Page Number
		queryBuilder.searchOptions.page = page;

		// Get the URL
		const url = queryBuilder.build();

		// Run the Request
		const response = await this.apiClient.runRequest(url, { method: 'GET' }).catch((error) => {
			// Log the error
			console.error(`Failed to check if there is a next page: ${error}`);
		});

		// Check if the Response is invalid
		if (!response?.QueryResponse?.Account) return false;

		// Check if the Response is Invalid
		if (response.QueryResponse.Account.length < 1) return false;

		// Return True
		return true;
	}
}
