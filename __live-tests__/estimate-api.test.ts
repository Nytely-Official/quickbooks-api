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
		const estimates = await apiClient.estimates.getAllEstimates();

		// Assert the Estimates
		expect(estimates).toBeInstanceOf(Array);
		expect(estimates.length).toBeGreaterThan(0);
	});

	// Test retrieving a single estimate by ID
	test('should retrieve a single estimate', async () => {
		// Get the Estimates
		const allEstimates = await apiClient.estimates.getAllEstimates();

		// Get the First Estimate
		const testEstimate = allEstimates[0];

		// Get the Estimate by ID
		const foundEstimate = await apiClient.estimates.getEstimateById(testEstimate.Id);

		// Assert the Estimate
		expect(foundEstimate).toBeDefined();
		expect(foundEstimate.Id).toBe(testEstimate.Id);
	});

	// Test pagination
	test('should handle pagination', async () => {
		// Get the Estimates
		const page1 = await apiClient.estimates.getAllEstimates({ maxResults: 10, startPosition: 0 });
		const page2 = await apiClient.estimates.getAllEstimates({ maxResults: 10, startPosition: 10 });

		// Assert the Estimates
		expect(page1).toBeInstanceOf(Array);
		expect(page2).toBeInstanceOf(Array);
		expect(page1.length).toBe(10);
		expect(page2.length).toBe(2);
		expect(page1).not.toEqual(page2);
	});

	// Test date range filtering
	test('should retrieve estimates within date range', async () => {
		// Get the End Date
		const endDate = new Date();

		// Get the Start Date
		const startDate = new Date();
		startDate.setDate(endDate.getDate() - 30);

		// Get the Estimates
		const estimates = await apiClient.estimates.getEstimatesForDateRange(startDate, endDate);

		// Assert the Estimates
		expect(estimates).toBeInstanceOf(Array);
	});

	// Test updated estimates
	test('should retrieve updated estimates', async () => {
		// Get the End Date
		const lastUpdated = new Date();
		lastUpdated.setDate(lastUpdated.getDate() - 30);

		// Get the Updated Estimates
		const updatedEstimates = await apiClient.estimates.getUpdatedEstimates(lastUpdated);

		// Assert the Estimates
		expect(updatedEstimates).toBeInstanceOf(Array);
	});

	// Test error handling for invalid ID
	test('should throw error for invalid estimate ID', async () => {
		// Assert the Error
		expect(apiClient.estimates.getEstimateById('invalid')).rejects.toThrow();
	});
});
