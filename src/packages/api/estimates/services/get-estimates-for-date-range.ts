// Import the Query Builder
import { SearchOptions, SearchResponse, type Estimate } from '../../../../types/types';
import { EstimateAPI } from '../estimate-api';

/**
 * Get Estimates for a Date Range
 * @param this - The Estimate API
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns The Estimates
 */
export async function getEstimatesForDateRange(
	this: EstimateAPI,
	startDate: Date,
	endDate: Date,
	options: SearchOptions<Estimate> = {},
): Promise<SearchResponse<Estimate>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Date Range Filters
	queryBuilder.whereLastUpdatedAfter(startDate);
	queryBuilder.whereLastUpdatedBefore(endDate);

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
