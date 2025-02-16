// Import the Query Builder
import { SearchOptions, type Estimate } from '../../../../types/types';
import { EstimateAPI } from '../estimate-api';

/**
 * Get Estimate by ID
 * @param this - The Estimate API
 * @param id - The ID of the estimate
 * @returns The Estimate
 */
export async function getEstimateById(this: EstimateAPI, id: string, options: SearchOptions<Estimate> = {}): Promise<Estimate> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup ID Filter
	queryBuilder.whereId(id);

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Estimate
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Check if the Response Failed to find an Estimate
	if (!response) throw new Error('Estimate not found');

	// Format the Response
	const estimates = this.formatResponse(response);

	// Return the Estimate
	return estimates[0];
}
