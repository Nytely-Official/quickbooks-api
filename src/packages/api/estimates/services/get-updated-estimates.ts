// Import the Query Builder
import { SearchOptions, type Estimate } from '../../../../types/types';
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
	options: SearchOptions<Estimate> = {},
): Promise<Array<Estimate>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Last Updated Date Filter
	queryBuilder.whereLastUpdatedAfter(lastUpdatedDate);

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Estimates
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const estimates = this.formatResponse(response);

	// Return the Estimates
	return estimates;
}
