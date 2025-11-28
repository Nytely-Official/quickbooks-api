// Imports
import { ApiClient } from '../api-client';
import { Environment, Query, QuickbooksError, type Customer, type CustomerQueryResponse } from '../../../types/types';
import { Endpoints } from '../../../types/enums/endpoints';
import { CustomerQueryBuilder } from './customer-query-builder';

// Import the Services
import { getAllCustomers } from './services/get-all-customers';
import { getCustomerById } from './services/get-customer-by-id';
import { getCustomersForDateRange } from './services/get-customers-for-date-range';
import { getUpdatedCustomers } from './services/get-updated-customers';

import { rawCustomerQuery } from './services/raw-customer-query';
import path from 'path';

/**
 * API Client
 */
export class CustomerAPI {
	// The List of Customer Services
	public readonly getAllCustomers = getAllCustomers.bind(this);
	public readonly getCustomerById = getCustomerById.bind(this);
	public readonly getCustomersForDateRange = getCustomersForDateRange.bind(this);
	public readonly getUpdatedCustomers = getUpdatedCustomers.bind(this);
	public readonly rawCustomerQuery = rawCustomerQuery.bind(this);

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
	 * @returns The Customers
	 */
	protected async formatResponse(response: any): Promise<Array<Customer>> {
		// Check if the Response is Invalid
		if (!response?.QueryResponse) {
			// Get the Intuit Error Details
			const errorDetails = await ApiClient.getIntuitErrorDetails(response);

			// Throw the Quickbooks Error
			throw new QuickbooksError('Unable to format Customers', errorDetails);
		}

		// Check if the Customer is Not set and if it is, set the Customer to an empty array
		if (!response.QueryResponse.Customer) response.QueryResponse.Customer = new Array();

		// Get the Customers
		const queryResponse = response.QueryResponse as CustomerQueryResponse;

		// Return the Customers
		return queryResponse.Customer;
	}

	// Returns the Customer URL
	public async getUrl() {
		// Setup the URL
		const url = new URL(await this.getCompanyEndpoint());

		// Set the Customer Endpoint
		url.pathname = path.join(url.pathname, 'customer');

		// Return the URL
		return url;
	}

	/**
	 * Get the Query Builder
	 * @returns The Query Builder
	 */
	public async getQueryBuilder(): Promise<CustomerQueryBuilder> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new CustomerQueryBuilder(companyEndpoint, Query.Customer);

		// Return the Query Builder
		return queryBuilder;
	}

	/**
	 * Checks if there is a next page
	 * @param queryBuilder - The Query Builder
	 * @returns {boolean} True if there is a next page, false otherwise
	 */
	protected async hasNextPage(queryBuilder: CustomerQueryBuilder): Promise<boolean> {
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
		if (!result?.responseData || !result.responseData?.QueryResponse?.Customer) return false;

		// Check if the Response is Invalid
		if (result.responseData.QueryResponse.Customer.length < 1) return false;

		// Return True
		return true;
	}
}
