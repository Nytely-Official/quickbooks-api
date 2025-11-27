// Imports
import { ApiClient } from '../api-client';
import { Environment, Query, QuickbooksError, type CompanyInfo, type CompanyInfoQueryResponse } from '../../../types/types';
import { Endpoints } from '../../../types/enums/endpoints';
import { CompanyInfoQueryBuilder } from './company-info-query-builder';

// Import the Services
import { getCompanyInfo } from './services/get-company-info';
import { rawCompanyInfoQuery } from './services/raw-company-info-query';

/**
 * Company Info API
 */
export class CompanyInfoAPI {
	// The List of Company Info Services
	public readonly getCompanyInfo = getCompanyInfo.bind(this);
	public readonly rawCompanyInfoQuery = rawCompanyInfoQuery.bind(this);

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
	 * @returns The Company Info
	 */
	protected async formatResponse(response: any): Promise<CompanyInfo> {
		// Check if the Response is Invalid
		if (!response?.QueryResponse) {
			// Get the Intuit Error Details
			const errorDetails = await ApiClient.getIntuitErrorDetails(response);

			// Throw the Quickbooks Error
			throw new QuickbooksError('Unable to format Company Info', errorDetails);
		}

		// Check if the Company Info is Not set and if it is, set the Company Info to an empty array
		if (!response.QueryResponse.CompanyInfo) response.QueryResponse.CompanyInfo = new Array();

		// Get the Company Info
		const queryResponse = response.QueryResponse as CompanyInfoQueryResponse;

		// Return the first Company Info (there should only be one)
		return queryResponse.CompanyInfo[0];
	}

	/**
	 * Get the Query Builder
	 * @returns The Query Builder
	 */
	public async getQueryBuilder(): Promise<CompanyInfoQueryBuilder> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new CompanyInfoQueryBuilder(companyEndpoint, Query.CompanyInfo);

		// Return the Query Builder
		return queryBuilder;
	}
}
