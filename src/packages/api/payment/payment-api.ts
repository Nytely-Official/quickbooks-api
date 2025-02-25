// Imports
import { ApiClient } from '../api-client';
import { Environment, Query, type Payment, type PaymentQueryResponse } from '../../../types/types';
import { Endpoints } from '../../../types/enums/endpoints';
import { PaymentQueryBuilder } from './payment-query-builder';

// Import the Services
import { getAllPayments } from './services/get-all-payments';
import { getPaymentById } from './services/get-payment-by-id';
import { getPaymentsForDateRange } from './services/get-payments-for-date-range';
import { getUpdatedPayments } from './services/get-updated-payments';
import { getPaymentsByDueDate } from './services/get-payment-by-due-date';
import { rawPaymentQuery } from './services/raw-payment-query';

/**
 * API Client
 */
export class PaymentAPI {
	// The List of Payment Services
	public readonly getAllPayments = getAllPayments.bind(this);
	public readonly getPaymentById = getPaymentById.bind(this);
	public readonly getPaymentsForDateRange = getPaymentsForDateRange.bind(this);
	public readonly getUpdatedPayments = getUpdatedPayments.bind(this);
	public readonly getPaymentsByDueDate = getPaymentsByDueDate.bind(this);
	public readonly rawPaymentQuery = rawPaymentQuery.bind(this);

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
	 * @returns The Payments
	 */
	protected formatResponse(response: any): Array<Payment> {
		// Check if the Response is invalid
		if (!response || response.QueryResponse?.Payment?.length < 1) throw new Error('Payments not found');

		// Get the Payments
		const queryResponse = response.QueryResponse as PaymentQueryResponse;

		// Return the Payments
		return queryResponse.Payment;
	}

	/**
	 * Get the Query Builder
	 * @returns The Query Builder
	 */
	public async getQueryBuilder(): Promise<PaymentQueryBuilder> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new PaymentQueryBuilder(companyEndpoint, Query.Payment);

		// Return the Query Builder
		return queryBuilder;
	}

	/**
	 * Checks if there is a next page
	 * @param queryBuilder - The Query Builder
	 * @returns {boolean} True if there is a next page, false otherwise
	 */
	protected async hasNextPage(queryBuilder: PaymentQueryBuilder): Promise<boolean> {
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
		if (!response?.QueryResponse?.Payment) return false;

		// Check if the Response is Invalid
		if (response.QueryResponse.Payment.length < 1) return false;

		// Return True
		return true;
	}
}
