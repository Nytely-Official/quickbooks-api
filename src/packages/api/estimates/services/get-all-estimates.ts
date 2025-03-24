// Imports
import { Estimate, EstimateOptions, SearchResponse } from '../../../../types/types';
import { EstimateAPI } from '../estimate-api';
import { plainToClass } from 'class-transformer';

/**
 * Get All Estimates
 * @param this - The Estimate API
 * @returns The Estimates
 */
export async function getAllEstimates(this: EstimateAPI, options: EstimateOptions = {}): Promise<SearchResponse<Estimate>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Estimates
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const estimates = this.formatResponse(response);

	// Map the Estimates to Classes
	const mappedEstimates = estimates.map((estimate) => plainToClass(Estimate, estimate));

	// Setup the Search Response
	const searchResponse: SearchResponse<Estimate> = {
		results: mappedEstimates,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the Estimates
	return searchResponse;
}
