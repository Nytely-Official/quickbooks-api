// Imports
import { ApiClient } from '../api-client';
import { Environment, type CustomerQueryResponse } from '../../../types/types';
import { Customer, CustomerFilters, CustomerSortables } from './customer';
import { Endpoints } from '../../../types/enums/endpoints';
import { QueryBuilder, QueryParams } from '../common/query-builder';

/**
 * API Client
 */
export class CustomerAPI {
	/**
	 * Constructor
	 * @param apiClient - The API Client
	 */
	constructor(protected readonly apiClient: ApiClient) { }

	/**
	 * The Query Builder
	 */
	public query = new QueryBuilder<Customer, CustomerFilters, CustomerSortables>(this.executeQuery.bind(this));

	/**
	 * Execute the Query
	 * @param params - The Query Parameters from the Query Builder
	 * @returns The Query Response
	 */
	protected async executeQuery(params: QueryParams) {
		// Get the URL
		const url = [
			await this.getCompanyEndpoint() + '/query?query=select * from Customer',
		]

		// Add the Filters
		if (params.filters.length > 0) {
			url.push(`where ${params.filters.map(filter => `${filter.key} ${filter.value}`).join(' and ')}`)
		}

		// Add the Order By
		if (params.orderBy) {
			url.push(`orderby ${params.orderBy.key} ${params.orderBy.direction}`)
		}

		// Add the Limit
		if (params.limit) {
			url.push(`maxresults ${params.limit}`)
		}

		// Join the URL
		const queryUrl = url.join(' ');

		// Run the Request
		const response = await this.apiClient.runRequest(encodeURI(queryUrl), { method: 'GET' });

		// Format the Response
		let customers = this.formatResponse(response);

		// Remap the Response - (if supplied)
		if (params.remap) {
			customers = this.remapResponse(customers, params.remap);
		}

		return customers;
	}

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
	protected formatResponse(response: { QueryResponse?: CustomerQueryResponse }): Array<Customer> {
		// Check if the Response is Invalid
		if (!response?.QueryResponse) throw new Error('Invalid Response');

		// Check if the Customer is Not set and Initialize an Empty Array
		if (!response.QueryResponse.Customer) response.QueryResponse.Customer = new Array<Customer>();

		// Get the Customers
		const queryResponse = response.QueryResponse as unknown as CustomerQueryResponse;

		// Return the Customers
		return queryResponse.Customer;
	}

	/**
	 * Remap the Data
	 * @param data - The initial data
	 * @param remap - The Remap
	 * @returns The Remapped Data
	 */
	protected remapResponse<T = any>(data: Customer[], remap: Record<string, string>) {
		return data.map((item) => {
			const result: Record<string, any> = {};

			// Process each field in the remap object
			for (const [targetKey, sourcePath] of Object.entries(remap)) {
				// Check if we need to access a nested property
				if (sourcePath.includes('.')) {
					// Split the path into parts
					const [parentKey, childKey] = sourcePath.split('.');

					// Access the nested property safely
					if ((item as Record<string, any>)[parentKey] && (item as Record<string, any>)[parentKey][childKey] !== undefined) {
						result[targetKey] = (item as Record<string, any>)[parentKey][childKey];
					}
				} else {
					// Direct property access
					if ((item as Record<string, any>)[sourcePath] !== undefined) {
						result[targetKey] = (item as Record<string, any>)[sourcePath];
					}
				}
			}

			return result;
		}) as T[];
	}

}
