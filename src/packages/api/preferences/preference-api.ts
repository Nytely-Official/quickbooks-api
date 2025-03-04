// Imports
import { ApiClient } from '../api-client';
import { Environment, Query, type Preferences, type PreferenceQueryResponse } from '../../../types/types';
import { Endpoints } from '../../../types/enums/endpoints';
import { PreferenceQueryBuilder } from './preference-query-builder';

// Import the Services
import { getPreferences } from './services/get-preferences';
import { rawPreferenceQuery } from './services/raw-preference-query';

/**
 * API Client
 */
export class PreferenceAPI {
	// The List of Preference Services
	public readonly getPreferences = getPreferences.bind(this);
	public readonly rawPreferenceQuery = rawPreferenceQuery.bind(this);

	/**
	 * Constructor

	 * @param apiClient - The API Client
	 */
	constructor(protected readonly apiClient: ApiClient) {}

	/**
	 * Get the Company Endpoint
	 * @returns The Company Endpoint with the attached token realmId
	 */
	protected async getCompanyEndpoint() {
		// Get the Base Endpoint
		const baseEndpoint =
			this.apiClient.environment === Environment.Production ? Endpoints.ProductionCompanyApi : Endpoints.SandboxCompanyApi;

		// Get the Token
		const token = await this.apiClient.authProvider.getToken();

		// Return the Company Endpoint
		return `${baseEndpoint}/${token.realmId}`;
	}

	/**
	 * Format the Response
	 * @param response - The Response
	 * @returns The Preferences
	 */
	protected formatResponse(response: any): Array<Preferences> {
		// Check if the Response is Invalid
		if (!response?.QueryResponse) throw new Error('Invalid Response');

		// Check if the Preferences is Not set and Initialize an Empty Array
		if (!response.QueryResponse.Preferences) response.QueryResponse.Preferences = new Array<Preferences>();

		// Get the Preferences
		const queryResponse = response.QueryResponse as PreferenceQueryResponse;

		// Return the Preferences
		return queryResponse.Preferences;
	}

	/**
	 * Get the Query Builder
	 * @returns The Query Builder
	 */
	public async getQueryBuilder(): Promise<PreferenceQueryBuilder> {
		// Get the Company Endpoint
		const companyEndpoint = await this.getCompanyEndpoint();

		// Setup the New Query Builder
		const queryBuilder = new PreferenceQueryBuilder(companyEndpoint, Query.Preferences);

		// Return the Query Builder
		return queryBuilder;
	}

	/**
	 * Checks if there is a next page
	 * @param queryBuilder - The Query Builder
	 * @returns {boolean} True if there is a next page, false otherwise
	 */
	protected async hasNextPage(queryBuilder: PreferenceQueryBuilder): Promise<boolean> {
		// Check if the Auto Check Next Page is Disabled
		if (!this.apiClient.autoCheckNextPage) return false;

		// Get the Page Number
		const page = (queryBuilder.searchOptions.page || 1) + 1;

		// Update the Page Number
		queryBuilder.searchOptions.page = page;

		// Get the URL
		const url = queryBuilder.build();

		// Run the Request
		const response = await this.apiClient.runRequest(url, { method: 'GET' }).catch((error) => {
			// Log the error
			console.error(`Failed to check if there is a next page: ${error}`);
		});

		// Check if the Response is invalid
		if (!response?.QueryResponse?.Preference) return false;

		// Check if the Response is Invalid
		if (response.QueryResponse.Preference.length < 1) return false;

		// Return True
		return true;
	}
}
