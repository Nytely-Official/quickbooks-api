// Imports
import { ApiClient } from '../api-client';
import { Environment, Query, type Invoice, type InvoiceQueryResponse } from '../../../types/types';
import { Endpoints } from '../../../types/enums/endpoints';
import { QueryBuilder } from '../query-builder';

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
		// Check if the Response is invalid
		if (!response || response.QueryResponse?.Invoice?.length < 1) throw new Error('Invoices not found');

		// Get the Invoices
		const queryResponse = response.QueryResponse as InvoiceQueryResponse;

		// Return the Invoices
		return queryResponse.Invoice;
	}

	/**
	 * Get the Query Builder

	 * @returns The Query Builder
	 */
	public async getQueryBuilder(): Promise<QueryBuilder> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new QueryBuilder(companyEndpoint, Query.Invoice);

		// Return the Query Builder
		return queryBuilder;
	}
}
