import { ApiClient } from '../api-client';
import { Environment, Query, QuickbooksError, type Bill, type BillQueryResponse } from '../../../types/types';
import { BillQueryBuilder } from './bill-query-builder';

// Import the Services
import { getAllBills } from './services/get-all-bills';
import { getBillById } from './services/get-bill-by-id';
import { getBillsForDateRange } from './services/get-bills-for-date-range';
import { getUpdatedBills } from './services/get-updated-bills';
import { rawBillQuery } from './services/raw-bill-query';

/**
 * Bill API Client
 */
export class BillAPI {
	// The List of Bill Services
	public readonly getAllBills = getAllBills.bind(this);
	public readonly getBillById = getBillById.bind(this);
	public readonly getBillsForDateRange = getBillsForDateRange.bind(this);
	public readonly getUpdatedBills = getUpdatedBills.bind(this);
	public readonly rawBillQuery = rawBillQuery.bind(this);

	/**
	 * Constructor
	 * @param apiClient - The API Client
	 */
	constructor(protected readonly apiClient: ApiClient) {}

	/**
	 * Get the Company Endpoint
	 * @returns The Company Endpoint
	 */
	protected async getCompanyEndpoint(): Promise<string> {
		// Get the Token
		const token = await this.apiClient.authProvider.getToken();

		// Get the Environment URL
		const environmentUrl =
			this.apiClient.environment === Environment.Production ? 'quickbooks.api.intuit.com' : 'sandbox-quickbooks.api.intuit.com';

		// Return the Company Endpoint
		return `https://${environmentUrl}/v3/company/${token.realmId}`;
	}

	/**
	 * Format the Response
	 * @param response - The Response
	 * @returns The Bills
	 */
	protected async formatResponse(response: any): Promise<Array<Bill>> {
		// Check if the Response is invalid
		if (!response?.QueryResponse) {
			// Get the Intuit Error Details
			const errorDetails = await ApiClient.getIntuitErrorDetails(response);

			// Throw the Quickbooks Error
			throw new QuickbooksError('Unable to format Bills', errorDetails);
		}

		// Check if the Length is Less than 1 and if it is, set the Bill to an empty array
		if (!response.QueryResponse.Bill) response.QueryResponse.Bill = new Array();

		// Get the Bills
		const queryResponse = response.QueryResponse as BillQueryResponse;

		// Return the Bills
		return queryResponse.Bill;
	}

	/**
	 * Get the Query Builder
	 * @returns The Query Builder
	 */
	public async getQueryBuilder(): Promise<BillQueryBuilder> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new BillQueryBuilder(companyEndpoint, Query.Bill);

		// Return the Query Builder
		return queryBuilder;
	}

	/**
	 * Checks if there is a next page
	 * @param queryBuilder - The Query Builder
	 * @returns True if there is a next page
	 */
	protected async hasNextPage(queryBuilder: BillQueryBuilder): Promise<boolean> {
		// Check if Auto Check Next Page is Disabled
		if (!this.apiClient.autoCheckNextPage) return false;

		// Get the Page Number
		const page = (queryBuilder.searchOptions.page || 1) + 1;

		// Update the Page Number
		queryBuilder.searchOptions.page = page;

		// Get the URL
		const url = queryBuilder.build();

		// Run the Request
		const result = await this.apiClient.runRequest(url, { method: 'GET' }).catch((error) => {
			console.error(`Failed to check if there is a next page: ${error}`);
			return null;
		});

		// Check if the Response is Invalid
		if (!result?.responseData || !result.responseData?.QueryResponse?.Bill) return false;

		// Check if the Response has no Bills
		if (result.responseData.QueryResponse.Bill.length < 1) return false;

		// Return True
		return true;
	}
}
