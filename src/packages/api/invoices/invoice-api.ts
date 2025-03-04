// Imports
import { ApiClient } from '../api-client';
import { Environment, Query, type Invoice, type InvoiceQueryResponse } from '../../../types/types';
import { Endpoints } from '../../../types/enums/endpoints';
import { InvoiceQueryBuilder } from './invoice-query-builder';

// Import the Services
import { getAllInvoices } from './services/get-all-invoices';
import { getInvoiceById } from './services/get-invoice-by-id';
import { getInvoicesForDateRange } from './services/get-invoices-for-date-range';
import { getUpdatedInvoices } from './services/get-updated-invoices';
import { getInvoicesByDueDate } from './services/get-invoices-by-due-date';
import { rawInvoiceQuery } from './services/raw-invoice-query';

/**
 * API Client
 */
export class InvoiceAPI {
	// The List of Invoice Services
	public readonly getAllInvoices = getAllInvoices.bind(this);
	public readonly getInvoiceById = getInvoiceById.bind(this);
	public readonly getInvoicesForDateRange = getInvoicesForDateRange.bind(this);
	public readonly getUpdatedInvoices = getUpdatedInvoices.bind(this);
	public readonly getInvoicesByDueDate = getInvoicesByDueDate.bind(this);
	public readonly rawInvoiceQuery = rawInvoiceQuery.bind(this);

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
	 * @returns The Invoices
	 */
	protected formatResponse(response: any): Array<Invoice> {
		// Check if the Response is Invalid
		if (!response?.QueryResponse) throw new Error('Invalid Response');

		// Check if the Invoice is Not set and Initialize an Empty Array
		if (!response.QueryResponse.Invoice) response.QueryResponse.Invoice = new Array<Invoice>();

		// Get the Invoices
		const queryResponse = response.QueryResponse as InvoiceQueryResponse;

		// Return the Invoices
		return queryResponse.Invoice;
	}

	/**
	 * Get the Query Builder
	 * @returns The Query Builder
	 */
	public async getQueryBuilder(): Promise<InvoiceQueryBuilder> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new InvoiceQueryBuilder(companyEndpoint, Query.Invoice);

		// Return the Query Builder
		return queryBuilder;
	}

	/**
	 * Checks if there is a next page
	 * @param queryBuilder - The Query Builder
	 * @returns {boolean} True if there is a next page, false otherwise
	 */
	protected async hasNextPage(queryBuilder: InvoiceQueryBuilder): Promise<boolean> {
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
		if (!response?.QueryResponse?.Invoice) return false;

		// Check if the Response is Invalid
		if (response.QueryResponse.Invoice.length < 1) return false;

		// Return True
		return true;
	}
}
