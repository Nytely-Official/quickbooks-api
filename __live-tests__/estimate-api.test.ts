// Imports
import { AuthProvider, Environment, ApiClient, AuthScopes, EstimateOptions, CustomerOptions, Estimate, QuickbooksError } from '../src/app';
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

		// Test the Intuit TID
		expect(searchResponse.intuitTID).toBeDefined();
		expect(typeof searchResponse.intuitTID).toBe('string');
	});

	// Test Checking for Next Page
	test('should check for next page', async () => {
		// Get all estimates
		const searchResponse = await apiClient.estimates.getAllEstimates();

		// Test the Estimates
		expect(searchResponse.hasNextPage).toBe(true);

		// Test the Intuit TID
		expect(searchResponse.intuitTID).toBeDefined();
		expect(typeof searchResponse.intuitTID).toBe('string');
	});

	// Test retrieving a single estimate by ID
	test('should retrieve a single estimate', async () => {
		// Get the Estimates
		const searchResponse = await apiClient.estimates.getAllEstimates();

		// Get the First Estimate
		const testEstimate = searchResponse.results[0];

		// Get the Estimate by ID
		const estimateResponse = await apiClient.estimates.getEstimateById(testEstimate.Id);

		// Assert the Estimate Response Structure
		expect(estimateResponse).toBeDefined();
		expect(estimateResponse).toHaveProperty('estimate');
		expect(estimateResponse).toHaveProperty('intuitTID');
		expect(typeof estimateResponse.intuitTID).toBe('string');

		// Assert the Estimate ID
		expect(estimateResponse.estimate?.Id).toBe(testEstimate.Id);
	});

	// Test retrieving an estimate by Customer ID
	test('should retrieve estimates by Customer ID', async () => {
		// Setup the Customer Options
		const estimateOptions: EstimateOptions = { searchOptions: { maxResults: 1 } };

		// Get the Estimate
		const searchResponse = await apiClient.estimates.getAllEstimates(estimateOptions);

		// Get the First Estimate Customer ID
		const testCustomerId = searchResponse.results[0]?.CustomerRef?.value;

		// Assert the Customer
		expect(testCustomerId).toBeDefined();
		expect(testCustomerId).toBeString();

		// Get the estimate query builder
		const estimateQueryBuilder = await apiClient.estimates.getQueryBuilder();

		// Add the Customer ID Filter
		estimateQueryBuilder.whereCustomerId(testCustomerId);

		// Make the Request
		const estimateResponse = await apiClient.estimates.rawEstimateQuery(estimateQueryBuilder);

		// Assert the Estimates
		expect(estimateResponse.results).toBeInstanceOf(Array);
		expect(estimateResponse.results.length).toBeGreaterThan(0);

		// Assert the Estimates are for the Customer
		expect(estimateResponse.results.every((estimate: Estimate) => estimate.CustomerRef.value === testCustomerId)).toBe(true);
	});

	// Test pagination
	test('should handle pagination', async () => {
		// Setup the Estimate Options
		const estimateOptions1: EstimateOptions = { searchOptions: { maxResults: 10, page: 1 } };
		const estimateOptions2: EstimateOptions = { searchOptions: { maxResults: 10, page: 2 } };

		// Get the Estimates
		const searchResponse1 = await apiClient.estimates.getAllEstimates(estimateOptions1);
		const searchResponse2 = await apiClient.estimates.getAllEstimates(estimateOptions2);

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

		// Test the Intuit TID
		expect(searchResponse.intuitTID).toBeDefined();
		expect(typeof searchResponse.intuitTID).toBe('string');
	});

	// Test updated estimates
	test('should retrieve updated estimates', async () => {
		// Get the End Date
		const lastUpdated = new Date('2012-01-08');

		// Get the Updated Estimates
		const searchResponse = await apiClient.estimates.getUpdatedEstimates(lastUpdated);

		// Assert the Estimates
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Intuit TID
		expect(searchResponse.intuitTID).toBeDefined();
		expect(typeof searchResponse.intuitTID).toBe('string');
	});

	// Test error handling for invalid ID
	test('should throw QuickbooksError for invalid estimate ID', async () => {
		try {
			await apiClient.estimates.getEstimateById('invalid');
			expect(false).toBe(true); // Should not reach here
		} catch (error) {
			// Assert the Error is a QuickbooksError
			expect(error).toBeInstanceOf(QuickbooksError);
			expect(error).toBeInstanceOf(Error);

			// Assert the Error has the correct structure
			expect(error.message).toBeDefined();
			expect(error.details).toBeDefined();
			expect(error.details.statusCode).toBeDefined();
			expect(typeof error.details.statusCode).toBe('number');
			expect(error.details.intuitError).toBeDefined();
			expect(Array.isArray(error.details.intuitError)).toBe(true);
			expect(error.details.intuitTID).toBeDefined();
			expect(typeof error.details.intuitTID).toBe('string');
		}
	});

	// Test error handling for invalid raw query
	test('should throw QuickbooksError for invalid raw query', async () => {
		// Get the Query Builder
		const queryBuilder = await apiClient.estimates.getQueryBuilder();

		// Add an invalid ID filter that will cause an error
		queryBuilder.whereId('invalid-id-that-does-not-exist');

		try {
			await apiClient.estimates.rawEstimateQuery(queryBuilder);
			expect(false).toBe(true); // Should not reach here
		} catch (error) {
			// Assert the Error is a QuickbooksError
			expect(error).toBeInstanceOf(QuickbooksError);
			expect(error).toBeInstanceOf(Error);

			// Assert the Error has the correct structure
			expect(error.message).toBeDefined();
			expect(error.details).toBeDefined();
			expect(error.details.statusCode).toBeDefined();
			expect(typeof error.details.statusCode).toBe('number');
			expect(error.details.intuitError).toBeDefined();
			expect(Array.isArray(error.details.intuitError)).toBe(true);
			expect(error.details.intuitTID).toBeDefined();
			expect(typeof error.details.intuitTID).toBe('string');
		}
	});

	// Test returning an empty array if no estimates are updated
	test('should return an empty array if no estimates are updated', async () => {
		// Setup the Future Date
		const futureDate = new Date();

		// Set the New Full Year
		futureDate.setFullYear(futureDate.getFullYear() + 20);

		// Get the Estimates
		const searchResponse = await apiClient.estimates.getUpdatedEstimates(futureDate);

		// Assert the Estimates
		expect(searchResponse.results).toBeArray();

		// Assert the Estimates Length
		expect(searchResponse.results.length).toBe(0);

		// Test the Intuit TID
		expect(searchResponse.intuitTID).toBeDefined();
		expect(typeof searchResponse.intuitTID).toBe('string');
	});
});
