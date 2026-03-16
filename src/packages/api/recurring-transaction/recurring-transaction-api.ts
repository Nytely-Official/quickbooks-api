import { ApiClient } from '../api-client';
import { Environment, Query, QuickbooksError, type RecurringTransaction, type RecurringTransactionQueryResponse } from '../../../types/types';
import { RecurringTransactionQueryBuilder } from './recurring-transaction-query-builder';
import path from 'path';

// Import the Services
import { getAllRecurringTransactions } from './services/get-all-recurring-transactions';
import { getRecurringTransactionById } from './services/get-recurring-transaction-by-id';
import { getUpdatedRecurringTransactions } from './services/get-updated-recurring-transactions';
import { rawRecurringTransactionQuery } from './services/raw-recurring-transaction-query';

/**
 * RecurringTransaction API Client
 */
export class RecurringTransactionAPI {
	// The List of RecurringTransaction Services
	public readonly getAllRecurringTransactions = getAllRecurringTransactions.bind(this);
	public readonly getRecurringTransactionById = getRecurringTransactionById.bind(this);
	public readonly getUpdatedRecurringTransactions = getUpdatedRecurringTransactions.bind(this);
	public readonly rawRecurringTransactionQuery = rawRecurringTransactionQuery.bind(this);

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
	 * @returns The RecurringTransactions
	 */
	protected async formatResponse(response: any): Promise<Array<RecurringTransaction>> {
		// Check if the Response is invalid
		if (!response?.QueryResponse) {
			// Get the Intuit Error Details
			const errorDetails = await ApiClient.getIntuitErrorDetails(response);

			// Throw the Quickbooks Error
			throw new QuickbooksError('Unable to format RecurringTransactions', errorDetails);
		}

		// Check if the Length is Less than 1 and if it is, set to an empty array
		if (!response.QueryResponse.RecurringTransaction) response.QueryResponse.RecurringTransaction = new Array();

		// Get the RecurringTransactions
		const queryResponse = response.QueryResponse as RecurringTransactionQueryResponse;

		// Return the RecurringTransactions
		return queryResponse.RecurringTransaction;
	}

	// Returns the RecurringTransaction URL
	public async getUrl() {
		// Setup the URL
		const url = new URL(await this.getCompanyEndpoint());

		// Set the RecurringTransaction Endpoint
		url.pathname = path.join(url.pathname, 'recurringtransaction');

		// Return the URL
		return url;
	}

	/**
	 * Get the Query Builder
	 * @returns The Query Builder
	 */
	public async getQueryBuilder(): Promise<RecurringTransactionQueryBuilder> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new RecurringTransactionQueryBuilder(companyEndpoint, Query.RecurringTransaction);

		// Return the Query Builder
		return queryBuilder;
	}

	/**
	 * Checks if there is a next page
	 * @param queryBuilder - The Query Builder
	 * @returns True if there is a next page
	 */
	protected async hasNextPage(queryBuilder: RecurringTransactionQueryBuilder): Promise<boolean> {
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
		if (!result?.responseData || !result.responseData?.QueryResponse?.RecurringTransaction) return false;

		// Check if the Response has no RecurringTransactions
		if (result.responseData.QueryResponse.RecurringTransaction.length < 1) return false;

		// Return True
		return true;
	}
}
