import { ApiClient } from '../src/app';
import { AuthProvider, Environment, AuthScopes, type PreferenceQueryResponse, Preferences } from '../src/app';
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

			// Assert the Preferences are class instances
			if (searchResponse.results[0]) {
				expect(searchResponse.results[0]).toBeInstanceOf(Preferences);
				expect(typeof searchResponse.results[0].setApiClient).toBe('function');
				expect(typeof searchResponse.results[0].reload).toBe('function');
			}

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');
		});
	});

	// Describe the Preferences Class Methods
	describe('Preferences Class', () => {
		afterEach(() => {
			global.fetch = globalFetch;
		});

		it('should return Preferences class instances', async () => {
			const preferenceQueryResponse = {
				QueryResponse: {
					Preferences: mockPreferenceData,
					maxResults: mockPreferenceData.length,
					startPosition: 1,
					totalCount: mockPreferenceData.length,
				},
			};
			global.fetch = mockFetch(JSON.stringify(preferenceQueryResponse));

			const searchResponse = await apiClient.preferences.getPreferences();

			expect(searchResponse.results[0]).toBeInstanceOf(Preferences);
			expect(typeof searchResponse.results[0]?.setApiClient).toBe('function');
			expect(typeof searchResponse.results[0]?.reload).toBe('function');
		});

		it('should reload preferences data', async () => {
			const initialPreferences = mockPreferenceData;
			const updatedPreferences = [
				{
					...initialPreferences[0],
					SyncToken: '2',
				},
			];

			// Setup initial fetch
			const preferenceQueryResponse = {
				QueryResponse: {
					Preferences: initialPreferences,
					maxResults: initialPreferences.length,
					startPosition: 1,
					totalCount: initialPreferences.length,
				},
			};
			global.fetch = mockFetch(JSON.stringify(preferenceQueryResponse));

			const searchResponse = await apiClient.preferences.getPreferences();
			const preferences = searchResponse.results[0]!;

			// Modify locally (if possible)
			(preferences as any).SyncToken = 'Local-Change';

			// Setup reload response
			const reloadQueryResponse = {
				QueryResponse: {
					Preferences: updatedPreferences,
					maxResults: updatedPreferences.length,
					startPosition: 1,
					totalCount: updatedPreferences.length,
				},
			};
			global.fetch = mockFetch(JSON.stringify(reloadQueryResponse));

			// Reload the preferences
			await preferences.reload();

			// Assert the preferences were reloaded
			expect(preferences.SyncToken).toBe(updatedPreferences[0].SyncToken);
		});
	});
});
