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

		// Test the Intuit TID
		expect(searchResponse.intuitTID).toBeDefined();
		expect(typeof searchResponse.intuitTID).toBe('string');
	});

	// Test Checking for Next Page
	test('should check for next page', async () => {
		// Get all creditMemos
		const searchResponse = await apiClient.creditMemos.getAllCreditMemos();

		// Test the CreditMemos
		expect(searchResponse.hasNextPage).toBe(true);

		// Test the Intuit TID
		expect(searchResponse.intuitTID).toBeDefined();
		expect(typeof searchResponse.intuitTID).toBe('string');
	});

	// Test retrieving a single creditMemo by ID
	test('should retrieve a single creditMemo', async () => {
		// Get the CreditMemos
		const searchResponse = await apiClient.creditMemos.getAllCreditMemos();

		// Get the First CreditMemo
		const testCreditMemo = searchResponse.results[0];

		// Get the CreditMemo by ID
		const creditMemoResponse = await apiClient.creditMemos.getCreditMemoById(testCreditMemo.Id);

		// Assert the CreditMemo Response Structure
		expect(creditMemoResponse).toBeDefined();
		expect(creditMemoResponse).toHaveProperty('creditMemo');
		expect(creditMemoResponse).toHaveProperty('intuitTID');
		expect(typeof creditMemoResponse.intuitTID).toBe('string');

		// Assert the CreditMemo ID
		expect(creditMemoResponse.creditMemo?.Id).toBe(testCreditMemo.Id);
	});

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

		// Test the Intuit TID
		expect(searchResponse.intuitTID).toBeDefined();
		expect(typeof searchResponse.intuitTID).toBe('string');
	});

	// Test updated creditMemos
	test('should retrieve updated creditMemos', async () => {
		// Get the End Date
		const lastUpdated = new Date('2012-01-08');

		// Get the Updated CreditMemos
		const searchResponse = await apiClient.creditMemos.getUpdatedCreditMemos(lastUpdated);

		// Assert the CreditMemos
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Intuit TID
		expect(searchResponse.intuitTID).toBeDefined();
		expect(typeof searchResponse.intuitTID).toBe('string');
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

		// Test the Intuit TID
		expect(searchResponse.intuitTID).toBeDefined();
		expect(typeof searchResponse.intuitTID).toBe('string');
	});

	// Test CreditMemo class methods
	describe('CreditMemo Class Methods', () => {
		// Test downloading credit memo PDF
		test('should download credit memo PDF', async () => {
			// Get all credit memos
			const searchResponse = await apiClient.creditMemos.getAllCreditMemos({ searchOptions: { maxResults: 1 } });

			// Check if we have at least one credit memo
			if (searchResponse.results.length === 0) {
				console.log('No credit memos found, skipping PDF download test');
				return;
			}

			// Get the first credit memo
			const creditMemo = searchResponse.results[0];

			// Get the credit memo by ID to get class instance
			const creditMemoResponse = await apiClient.creditMemos.getCreditMemoById(creditMemo.Id);

			// Check if credit memo exists
			if (!creditMemoResponse.creditMemo) {
				console.log('Credit memo not found, skipping PDF download test');
				return;
			}

			// Download the PDF
			const pdf = await creditMemoResponse.creditMemo.downloadPDF();

			// Assert the PDF is a Blob
			expect(pdf).toBeInstanceOf(Blob);
			expect(pdf.type).toContain('application/pdf');
			expect(pdf.size).toBeGreaterThan(0);
		});
	});
});
