// Imports
import { ApiClient } from '../api-client';
import { Environment, Query, type CreditMemo, type CreditMemoQueryResponse } from '../../../types/types';
import { Endpoints } from '../../../types/enums/endpoints';
import { CreditMemoQueryBuilder } from './credit-memo-query-builder';

// Import the Services
import { getAllCreditMemos } from './services/get-all-credit-memos';
import { getCreditMemoById } from './services/get-credit-memo-by-id';
import { getCreditMemosForDateRange } from './services/get-credit-memos-for-date-range';
import { getUpdatedCreditMemos } from './services/get-updated-credit-memos';
import { rawCreditMemoQuery } from './services/raw-credit-memo-query';

/**
 * API Client
 */
export class CreditMemoAPI {
	// The List of CreditMemo Services
	public readonly getAllCreditMemos = getAllCreditMemos.bind(this);
	public readonly getCreditMemoById = getCreditMemoById.bind(this);
	public readonly getCreditMemosForDateRange = getCreditMemosForDateRange.bind(this);
	public readonly getUpdatedCreditMemos = getUpdatedCreditMemos.bind(this);
	public readonly rawCreditMemoQuery = rawCreditMemoQuery.bind(this);

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
	 * @returns The CreditMemos
	 */
	protected formatResponse(response: any): Array<CreditMemo> {
		// Check if the Response is invalid
		if (!response || response.QueryResponse?.CreditMemo?.length < 1) throw new Error('CreditMemos not found');
		// Get the CreditMemos
		const queryResponse = response.QueryResponse as CreditMemoQueryResponse;

		// Return the CreditMemos
		return queryResponse.CreditMemo;
	}

	/**
	 * Get the Query Builder
	 * @returns The Query Builder
	 */
	public async getQueryBuilder(): Promise<CreditMemoQueryBuilder> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new CreditMemoQueryBuilder(companyEndpoint, Query.CreditMemo);

		// Return the Query Builder
		return queryBuilder;
	}

	/**
	 * Checks if there is a next page
	 * @param queryBuilder - The Query Builder
	 * @returns {boolean} True if there is a next page, false otherwise
	 */
	protected async hasNextPage(queryBuilder: CreditMemoQueryBuilder): Promise<boolean> {
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
		if (!response?.QueryResponse?.CreditMemo) return false;

		// Check if the Response is Invalid
		if (response.QueryResponse.CreditMemo.length < 1) return false;

		// Return True
		return true;
	}
}
