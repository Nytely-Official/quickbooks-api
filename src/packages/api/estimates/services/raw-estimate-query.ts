// Import the Query Builder
import { EstimateAPI } from '../estimate-api';
import type { EstimateQueryBuilder } from '../estimate-query-builder';
import type { Estimate, SearchResponse } from '../../../../types/types';

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
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const estimates = await this.formatResponse(responseData);

	// Setup the Search Response
	const searchResponse: SearchResponse<Estimate> = {
		results: estimates,
		hasNextPage: await this.hasNextPage(queryBuilder),
		intuitTID,
	};

	// Return the Estimates
	return searchResponse;
}
