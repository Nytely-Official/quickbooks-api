// Imports
import { ApiClient, Environment, Query, type Invoice, type InvoiceQueryResponse } from "@/app";
import { Endpoints } from "@/types/enums/endpoints";
import { QueryBuilder } from "../query-builder";

/**
 * API Client
 */
export class InvoiceAPI {
	/**
	 * Constructor
	 * @param apiClient - The API Client
	 */
	constructor(private readonly apiClient: ApiClient) {}

	/**
	 * Get the Company Endpoint
	 * @returns The Company Endpoint with the attached token realmId
	 */
	private async getCompanyEndpoint() {
		// Get the Base Endpoint
		const baseEndpoint =
			this.apiClient.environment === Environment.Production ? Endpoints.ProductionCompanyApi : Endpoints.SandboxCompanyApi;

		// Get the Token
		const token = await this.apiClient.authProvider.getToken();

		// Return the Company Endpoint
		return `${baseEndpoint}/${token.realmId}`;
	}

	/**
	 * Get All Invoices
	 * @returns The Invoices
	 */
	async getAllInvoices(): Promise<Array<Invoice>> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new QueryBuilder(companyEndpoint, Query.Invoice);

		// Setup the URL
		const url = queryBuilder.build();

		// Get the Invoices
		const response = await this.apiClient.runRequest(url, { method: "GET" });

		// Get the Invoices
		const queryResponse = response.QueryResponse as InvoiceQueryResponse;

		// Return the Invoices
		return queryResponse.Invoice;
	}

	/**
	 * Get Invoices for a Date Range
	 * @param startDate - The start date
	 * @param endDate - The end date
	 * @returns The Invoices
	 */

	async getInvoicesForDateRange(startDate: Date, endDate: Date): Promise<Array<Invoice>> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new QueryBuilder(companyEndpoint, Query.Invoice);

		// Setup the URL
		const url = queryBuilder.whereLastUpdatedAfter(startDate).whereLastUpdatedBefore(endDate).build();

		// Get the Invoices
		const response = await this.apiClient.runRequest(url, { method: "GET" });

		// Get the Invoices
		const queryResponse = response.QueryResponse as InvoiceQueryResponse;

		// Return the Invoices
		return queryResponse.Invoice;
	}

	/**
	 * Get Updated Invoices
	 * @param lastUpdatedDate - The last updated date
	 * @returns The Invoices
	 */
	async getUpdatedInvoices(lastUpdatedDate: Date): Promise<Array<Invoice>> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new QueryBuilder(companyEndpoint, Query.Invoice);

		// Setup the URL
		const url = queryBuilder.whereLastUpdatedAfter(lastUpdatedDate).build();

		// Get the Invoices
		const response = await this.apiClient.runRequest(url, { method: "GET" });

		// Get the Invoices
		const queryResponse = response.QueryResponse as InvoiceQueryResponse;

		// Return the Invoices
		return queryResponse.Invoice;
	}

	/**
	 * Get Invoice by ID
	 * @param id - The ID of the invoice
	 * @returns The Invoice
	 */
	async getInvoiceById(id: string): Promise<Invoice> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new QueryBuilder(companyEndpoint, Query.Invoice);

		// Setup the URL
		const url = queryBuilder.whereId(id).build();

		// Get the Invoice
		const response = await this.apiClient.runRequest(url, { method: "GET" });

		// Get the Invoices
		const queryResponse = response.QueryResponse as InvoiceQueryResponse;

		// Return the Invoice
		return queryResponse.Invoice[0];
	}
}
