// Import the Query Builder
import { PreferenceAPI } from '../preference-api';
import type { PreferenceQueryBuilder } from '../preference-query-builder';
import type { Preferences, SearchResponse } from '../../../../types/types';

/**
 * Raw Preference Query
 * @param this - The Preference API
 * @param queryBuilder - The query builder to use
 * @returns Custom query results
 */
export async function rawPreferenceQuery(this: PreferenceAPI, queryBuilder: PreferenceQueryBuilder): Promise<SearchResponse<Preferences>> {
	// Build the URL
	const url = queryBuilder.build();

	// Execute the custom query
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const preferences = await this.formatResponse(responseData);

	// Setup the Search Response
	const searchResponse: SearchResponse<Preferences> = {
		results: preferences,
		hasNextPage: await this.hasNextPage(queryBuilder),
		intuitTID,
	};

	// Return the Preferences
	return searchResponse;
}
