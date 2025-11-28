// Import the Query Builder
import type { Estimate, EstimateOptions, SearchResponse } from '../../../../types/types';
import { EstimateAPI } from '../estimate-api';

/**
 * Get Updated Estimates
 * @param this - The Estimate API
 * @param lastUpdatedDate - The last updated date
 * @returns The Estimates
 */
export async function getUpdatedEstimates(
	this: EstimateAPI,
	lastUpdatedDate: Date,
	options: EstimateOptions = {},
): Promise<SearchResponse<Estimate>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Last Updated Date Filter
	queryBuilder.whereLastUpdatedAfter(lastUpdatedDate);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Estimates
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
