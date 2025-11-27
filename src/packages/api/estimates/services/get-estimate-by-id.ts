// Import the Query Builder
import type { Estimate, EstimateOptions } from '../../../../types/types';
import { EstimateAPI } from '../estimate-api';

/**
 * Get Estimate by ID
 * @param this - The Estimate API
 * @param id - The ID of the estimate
 * @returns The Estimate
 */
export async function getEstimateById(this: EstimateAPI, id: string, options: EstimateOptions = {}): Promise<Estimate | null> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup ID Filter
	queryBuilder.whereId(id);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Estimate
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Check if the Response Failed to find an Estimate
	if (!response) return null;

	// Format the Response
	const estimates = await this.formatResponse(response);

	// Return the Estimate
	return estimates[0];
}
