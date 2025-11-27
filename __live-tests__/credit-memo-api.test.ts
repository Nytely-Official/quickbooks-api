// Imports
import { AuthProvider, Environment, ApiClient, AuthScopes, type CreditMemoOptions, QuickbooksError } from '../src/app';
import { describe, expect, test } from 'bun:test';

// Describe the CreditMemo API
describe('Live API: CreditMemos', async () => {
	// Initialize the Auth Provider
	const authProvider = new AuthProvider(process.env.QB_CLIENT_ID!, process.env.QB_CLIENT_SECRET!, process.env.REDIRECT_URI!, [
		AuthScopes.Accounting,
	]);

	// Deserialize the Token
	await authProvider.deserializeToken(process.env.SERIALIZED_TOKEN!, process.env.SECRET_KEY!);

	// Setup the API Client
	const apiClient = new ApiClient(authProvider, Environment.Sandbox);

	// Test retrieving all creditMemos
	test('should retrieve all creditMemos', async () => {
		// Get the CreditMemos
		const searchResponse = await apiClient.creditMemos.getAllCreditMemos();
		// Assert the CreditMemos
		expect(searchResponse.results).toBeInstanceOf(Array);
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test Checking for Next Page
	test('should check for next page', async () => {
		// Get all creditMemos
		const searchResponse = await apiClient.creditMemos.getAllCreditMemos();

		// Test the CreditMemos
		expect(searchResponse.hasNextPage).toBe(true);
	});

	// Test retrieving a single creditMemo by ID
	test('should retrieve a single creditMemo', async () => {
		// Get the CreditMemos
		const searchResponse = await apiClient.creditMemos.getAllCreditMemos();

		// Get the First CreditMemo
		const testCreditMemo = searchResponse.results[0];

		// Get the CreditMemo by ID
		const foundCreditMemo = await apiClient.creditMemos.getCreditMemoById(testCreditMemo.Id);

		// Assert the CreditMemo
		expect(foundCreditMemo).toBeDefined();
		expect(foundCreditMemo.Id).toBe(testCreditMemo.Id);
	});

	// #FIX Test pagination only 1 item in test account so this test will fail
	// test('should handle pagination', async () => {
	// 	// Get the CreditMemos
	// 	// Setup the CreditMemo Options
	// 	const creditMemoOptions1: CreditMemoOptions = { searchOptions: { maxResults: 10, page: 1 } };
	// 	const creditMemoOptions2: CreditMemoOptions = { searchOptions: { maxResults: 10, page: 2 } };

	// 	// Get the CreditMemos
	// 	const searchResponse1 = await apiClient.creditMemos.getAllCreditMemos(creditMemoOptions1);
	// 	const searchResponse2 = await apiClient.creditMemos.getAllCreditMemos(creditMemoOptions2);

	// 	// Assert the CreditMemos
	// 	expect(searchResponse1.results).toBeInstanceOf(Array);
	// 	expect(searchResponse2.results).toBeInstanceOf(Array);
	// 	expect(searchResponse1.results.length).toBeGreaterThan(0);
	// 	expect(searchResponse2.results.length).toBeGreaterThan(0);
	// 	expect(searchResponse1.results).not.toEqual(searchResponse2.results);
	// });

	// Test date range filtering
	test('should retrieve creditMemos within date range', async () => {
		// Get the End Date

		// Get the Start Date
		const startDate = new Date();

		const endDate = new Date();
		startDate.setDate(endDate.getDate() - 60);

		// Get the CreditMemos
		const searchResponse = await apiClient.creditMemos.getCreditMemosForDateRange(startDate, endDate);

		// Assert the CreditMemos
		expect(searchResponse.results).toBeInstanceOf(Array);
	});

	// Test updated creditMemos
	test('should retrieve updated creditMemos', async () => {
		// Get the End Date
		const lastUpdated = new Date('2012-01-08');

		// Get the Updated CreditMemos
		const searchResponse = await apiClient.creditMemos.getUpdatedCreditMemos(lastUpdated);

		// Assert the CreditMemos
		expect(searchResponse.results).toBeInstanceOf(Array);
	});

	// Test error handling for invalid ID
	test('should throw QuickbooksError for invalid creditMemo ID', async () => {
		try {
			await apiClient.creditMemos.getCreditMemoById('invalid');
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
		const queryBuilder = await apiClient.creditMemos.getQueryBuilder();

		// Add an invalid ID filter that will cause an error
		queryBuilder.whereId('invalid-id-that-does-not-exist');

		try {
			await apiClient.creditMemos.rawCreditMemoQuery(queryBuilder);
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

	// Test returning an empty array if no creditMemos are updated
	test('should return an empty array if no creditMemos are updated', async () => {
		// Setup the Future Date
		const futureDate = new Date();

		// Set the New Full Year
		futureDate.setFullYear(futureDate.getFullYear() + 20);

		// Get the CreditMemos
		const searchResponse = await apiClient.creditMemos.getUpdatedCreditMemos(futureDate);

		// Assert the CreditMemos
		expect(searchResponse.results).toBeArray();

		// Assert the CreditMemos Length
		expect(searchResponse.results.length).toBe(0);
	});
});
