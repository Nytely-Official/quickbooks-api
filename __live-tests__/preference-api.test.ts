// Imports
import { AuthProvider, Environment, ApiClient, AuthScopes } from '../src/app';
import { describe, expect, test } from 'bun:test';

// Describe the Preference API
describe('Live API: Preferences', async () => {
	// Initialize the Auth Provider
	const authProvider = new AuthProvider(
		process.env.QB_CLIENT_ID!,
		process.env.QB_CLIENT_SECRET!,
		process.env.REDIRECT_URI!,
		[AuthScopes.Accounting],
		null,
		Environment.Sandbox,
	);

	// Deserialize the Token
	await authProvider.deserializeToken(process.env.SERIALIZED_TOKEN!, process.env.SECRET_KEY!);

	// Setup the API Client
	const apiClient = new ApiClient(authProvider, Environment.Sandbox);

	// Test retrieving all preferences
	test('should retrieve all preferences', async () => {
		// Get all preferences
		const searchResponse = await apiClient.preferences.getPreferences();

		// Test the Preferences
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Preference length
		expect(searchResponse.results.length).toBeGreaterThan(0);

		// Test the Intuit TID
		expect(searchResponse.intuitTID).toBeDefined();
		expect(typeof searchResponse.intuitTID).toBe('string');
	});

	// Test Checking for Next Page
	test('should check for next page', async () => {
		// Get all preferences
		const searchResponse = await apiClient.preferences.getPreferences();

		// Test the Preferences
		expect(searchResponse.hasNextPage).toBeDefined();

		// Test the Intuit TID
		expect(searchResponse.intuitTID).toBeDefined();
		expect(typeof searchResponse.intuitTID).toBe('string');
	});
});
