// Imports
import { type Preferences, type SearchOptions, type SearchResponse } from '../../../../types/types';
import { PreferenceAPI } from '../preference-api';

/**
 * Get All Preferences
 * @param this - The Preference API
 * @returns The Preferences
 */
export async function getPreferences(this: PreferenceAPI, options: SearchOptions<Preferences> = {}): Promise<SearchResponse<Preferences>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Preferences
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	let preferences = this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<Preferences> = {
		results: preferences,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the Preferences
	return searchResponse;
}
