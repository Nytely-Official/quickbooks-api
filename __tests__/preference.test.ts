import { ApiClient } from '../src/app';
import { AuthProvider, Environment, AuthScopes, type PreferenceQueryResponse } from '../src/app';
import { describe, expect, it, beforeEach, afterEach } from 'bun:test';
import { mockFetch, mockPreferenceData, mockTokenData } from './helpers';

// Mock configuration
const TEST_CONFIG = {
	clientId: 'test_client_id',
	clientSecret: 'test_client_secret',
	redirectUri: 'http://localhost:3000/auth-code',
	scopes: [AuthScopes.Accounting],
};

// Describe the Preference API
describe('Preference API', () => {
	// Declare the API Client
	let apiClient: ApiClient;

	// Declare the Global Fetch
	let globalFetch: typeof fetch;

	// Before Each
	beforeEach(async () => {
		// Set the Global Fetch
		globalFetch = global.fetch;

		// Create the Auth Provider
		const authProvider = new AuthProvider(TEST_CONFIG.clientId, TEST_CONFIG.clientSecret, TEST_CONFIG.redirectUri, TEST_CONFIG.scopes);

		// Set the Token for the Auth Provider
		await authProvider.setToken(mockTokenData);

		// Create the API Client
		apiClient = new ApiClient(authProvider, Environment.Sandbox);
	});

	// After Each
	afterEach(() => {
		// Set the Global Fetch
		global.fetch = globalFetch;
	});

	// Describe the getAllPreferences Method
	describe('getAllPreferences', () => {
		// Describe the getAllPreferences Method
		it('should fetch all preferences', async () => {
			// Setup the Preference Query Response
			const preferenceQueryResponse: { QueryResponse: PreferenceQueryResponse } = {
				QueryResponse: {
					Preferences: mockPreferenceData,
					maxResults: mockPreferenceData.length,
					startPosition: 1,
					totalCount: mockPreferenceData.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(preferenceQueryResponse));

			// Get the Preferences
			const searchResponse = await apiClient.preferences.getPreferences();

			// Assert the Preferences
			expect(searchResponse.results).toBeArray();

			// Assert the Preferences Length
			expect(searchResponse.results.length).toBe(mockPreferenceData.length);

			// Assert the Preferences
			expect(searchResponse.results[0].Id).toBe(mockPreferenceData[0].Id);

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');
		});
	});
});
