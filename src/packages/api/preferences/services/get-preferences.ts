// Imports
import type { Preferences, PreferenceOptions, SearchResponse } from '../../../../types/types';
import { PreferenceAPI } from '../preference-api';

/**
 * Get All Preferences
 * @param this - The Preference API
 * @returns The Preferences
 */
export async function getPreferences(this: PreferenceAPI, options: PreferenceOptions = {}): Promise<SearchResponse<Preferences>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Preferences
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	let preferences = await this.formatResponse(responseData);

	// Setup the Search Response
	const searchResponse: SearchResponse<Preferences> = {
		results: preferences,
		hasNextPage: await this.hasNextPage(queryBuilder),
		intuitTID,
	};

	// Return the Preferences
	return searchResponse;
}
