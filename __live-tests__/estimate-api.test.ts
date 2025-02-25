// Imports
import { AuthProvider, Environment, ApiClient, AuthScopes } from '../src/app';
import { describe, expect, test } from 'bun:test';

// Describe the Estimate API
describe('Live API: Estimates', async () => {
	// Initialize the Auth Provider
	const authProvider = new AuthProvider(process.env.QB_CLIENT_ID!, process.env.QB_CLIENT_SECRET!, process.env.REDIRECT_URI!, [
		AuthScopes.Accounting,
	]);

	// Deserialize the Token
	await authProvider.deserializeToken(process.env.SERIALIZED_TOKEN!, process.env.SECRET_KEY!);

	// Setup the API Client
	const apiClient = new ApiClient(authProvider, Environment.Sandbox);

	// Test retrieving all estimates
	test('should retrieve all estimates', async () => {
		// Get the Estimates
		const searchResponse = await apiClient.estimates.getAllEstimates();

		// Assert the Estimates
		expect(searchResponse.results).toBeInstanceOf(Array);
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test Checking for Next Page
	test('should check for next page', async () => {
		// Get all estimates
		const searchResponse = await apiClient.estimates.getAllEstimates();

		// Test the Estimates
		expect(searchResponse.hasNextPage).toBe(true);
	});

	// Test retrieving a single estimate by ID
	test('should retrieve a single estimate', async () => {
		// Get the Estimates
		const searchResponse = await apiClient.estimates.getAllEstimates();

		// Get the First Estimate
		const testEstimate = searchResponse.results[0];

		// Get the Estimate by ID
		const foundEstimate = await apiClient.estimates.getEstimateById(testEstimate.Id);

		// Assert the Estimate
		expect(foundEstimate).toBeDefined();
		expect(foundEstimate.Id).toBe(testEstimate.Id);
	});

	// Test pagination
	test('should handle pagination', async () => {
		// Get the Estimates
		const searchResponse1 = await apiClient.estimates.getAllEstimates({ maxResults: 10, page: 1 });
		const searchResponse2 = await apiClient.estimates.getAllEstimates({ maxResults: 10, page: 2 });
		// Assert the Estimates
		expect(searchResponse1.results).toBeInstanceOf(Array);
		expect(searchResponse2.results).toBeInstanceOf(Array);
		expect(searchResponse1.results.length).toBeGreaterThan(0);
		expect(searchResponse2.results.length).toBeGreaterThan(0);
		expect(searchResponse1.results).not.toEqual(searchResponse2.results);
	});

	// Test date range filtering
	test('should retrieve estimates within date range', async () => {
		// Get the End Date
		const endDate = new Date();

		// Get the Start Date
		const startDate = new Date();
		startDate.setDate(endDate.getDate() - 30);

		// Get the Estimates
		const searchResponse = await apiClient.estimates.getEstimatesForDateRange(startDate, endDate);

		// Assert the Estimates
		expect(searchResponse.results).toBeInstanceOf(Array);
	});

	// Test updated estimates
	test('should retrieve updated estimates', async () => {
		// Get the End Date
		const lastUpdated = new Date();
		lastUpdated.setDate(lastUpdated.getDate() - 30);

		// Get the Updated Estimates
		const searchResponse = await apiClient.estimates.getUpdatedEstimates(lastUpdated);

		// Assert the Estimates
		expect(searchResponse.results).toBeInstanceOf(Array);
	});

	// Test error handling for invalid ID
	test('should throw error for invalid estimate ID', async () => {
		// Assert the Error
		expect(apiClient.estimates.getEstimateById('invalid')).rejects.toThrow();
	});
});
