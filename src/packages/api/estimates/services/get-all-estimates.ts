// Imports
import { SearchOptions, SearchResponse, type Estimate } from '../../../../types/types';
import { EstimateAPI } from '../estimate-api';

/**
 * Get All Estimates
 * @param this - The Estimate API
 * @returns The Estimates
 */
export async function getAllEstimates(this: EstimateAPI, options: SearchOptions<Estimate> = {}): Promise<SearchResponse<Estimate>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Estimates
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const estimates = this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<Estimate> = {
		results: estimates,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the Estimates
	return searchResponse;
}
