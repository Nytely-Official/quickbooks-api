// Import the Query Builder
import { EstimateAPI } from '../estimate-api';
import type { EstimateQueryBuilder } from '../estimate-query-builder';
import { Estimate, SearchResponse } from '../../../../types/types';
import { plainToClass } from 'class-transformer';
/**
 * Raw Estimate Query
 * @param this - The Estimate API
 * @param queryBuilder - The query builder to use
 * @returns Custom query results
 */
export async function rawEstimateQuery(this: EstimateAPI, queryBuilder: EstimateQueryBuilder): Promise<SearchResponse<Estimate>> {
	// Build the URL
	const url = queryBuilder.build();

	// Execute the custom query
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
