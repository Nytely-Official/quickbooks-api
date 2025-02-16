// Imports
import { ApiClient } from '../api-client';
import { Environment, Query, type Estimate, type EstimateQueryResponse } from '../../../types/types';
import { Endpoints } from '../../../types/enums/endpoints';
import { EstimateQueryBuilder } from './estimate-query-builder';

// Import the Services
import { getAllEstimates } from './services/get-all-estimates';
import { getEstimateById } from './services/get-estimate-by-id';
import { getEstimatesForDateRange } from './services/get-estimates-for-date-range';
import { getUpdatedEstimates } from './services/get-updated-estimates';
import { rawEstimateQuery } from './services/raw-estimate-query';

/**
 * API Client
 */
export class EstimateAPI {
	// The List of Estimate Services
	public readonly getAllEstimates = getAllEstimates.bind(this);
	public readonly getEstimateById = getEstimateById.bind(this);
	public readonly getEstimatesForDateRange = getEstimatesForDateRange.bind(this);
	public readonly getUpdatedEstimates = getUpdatedEstimates.bind(this);
	public readonly rawEstimateQuery = rawEstimateQuery.bind(this);

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
	 * @returns The Estimates
	 */
	protected formatResponse(response: any): Array<Estimate> {
		// Check if the Response is invalid
		if (!response || response.QueryResponse?.Estimate?.length < 1) throw new Error('Estimates not found');

		// Get the Estimates
		const queryResponse = response.QueryResponse as EstimateQueryResponse;

		// Return the Estimates
		return queryResponse.Estimate;
	}

	/**
	 * Get the Query Builder

	 * @returns The Query Builder
	 */
	public async getQueryBuilder(): Promise<EstimateQueryBuilder> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new EstimateQueryBuilder(companyEndpoint, Query.Estimate);

		// Return the Query Builder
		return queryBuilder;
	}
}
