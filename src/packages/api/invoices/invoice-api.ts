// Imports
import { ApiClient } from '../api-client';
import { Environment, Query, QuickbooksError, type Invoice, type InvoiceQueryResponse } from '../../../types/types';
import { Endpoints } from '../../../types/enums/endpoints';
import { InvoiceQueryBuilder } from './invoice-query-builder';
import path from 'path';

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

	// Returns the Invoice URL
	public async getUrl() {
		// Setup the URL
		const url = new URL(await this.getCompanyEndpoint());

		// Set the Invoice Endpoint
		url.pathname = path.join(url.pathname, 'invoice');

		// Return the URL
		return url;
	}

	/**
	 * Format the Response
	 * @param response - The Response
	 * @returns The Invoices
	 */
	protected async formatResponse(response: any): Promise<Array<Invoice>> {
		// Check if the Response is Invalid
		if (!response?.QueryResponse) {
			// Get the Intuit Error Details
			const errorDetails = await ApiClient.getIntuitErrorDetails(response);

			// Throw the Quickbooks Error
			throw new QuickbooksError('Unable to format Invoices', errorDetails);
		}

		// Check if the Invoice is Not set and if it is, set the Invoice to an empty array
		if (!response.QueryResponse.Invoice) response.QueryResponse.Invoice = new Array();

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
		const result = await this.apiClient.runRequest(url, { method: 'GET' }).catch((error) => {
			// Log the error
			console.error(`Failed to check if there is a next page: ${error}`);
			return null;
		});

		// Check if the Response is invalid
		if (!result?.responseData || !result.responseData?.QueryResponse?.Invoice) return false;

		// Check if the Response is Invalid
		if (result.responseData.QueryResponse.Invoice.length < 1) return false;

		// Return True
		return true;
	}
}
