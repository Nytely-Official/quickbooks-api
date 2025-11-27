// Imports
import { AuthProvider, Environment, ApiClient, AuthScopes, type BillOptions, QuickbooksError } from '../src/app';
import { describe, expect, test } from 'bun:test';

// Describe the Bill API
describe('Live API: Bills', async () => {
	// Initialize the Auth Provider
	const authProvider = new AuthProvider(process.env.QB_CLIENT_ID!, process.env.QB_CLIENT_SECRET!, process.env.REDIRECT_URI!, [
		AuthScopes.Accounting,
	]);

	// Deserialize the Token
	await authProvider.deserializeToken(process.env.SERIALIZED_TOKEN!, process.env.SECRET_KEY!);

	// Setup the API Client
	const apiClient = new ApiClient(authProvider, Environment.Sandbox);

	// Test retrieving all bills
	test('should retrieve all bills', async () => {
		// Get all bills
		const searchResponse = await apiClient.bills.getAllBills();

		// Test the Bills
		expect(searchResponse.results).toBeInstanceOf(Array);
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test Checking for Next Page
	test('should check for next page', async () => {
		// Get all bills
		const searchResponse = await apiClient.bills.getAllBills();

		// Test the Bills
		expect(searchResponse.hasNextPage).toBe(true);
	});

	// Test retrieving a single bill
	test('should retrieve a single bill', async () => {
		// Get all bills
		const searchResponse = await apiClient.bills.getAllBills();

		// Get the first bill
		const bill = searchResponse.results[0];

		// Get the Bill by ID
		const foundBill = await apiClient.bills.getBillById(bill.Id);

		// Test the Bill
		expect(foundBill).toBeDefined();
		expect(foundBill.Id).toBe(bill.Id);
	});

	// Test retrieving limited bills
	test('should retrieve limited bills', async () => {
		// Setup the Bill Options
		const billOptions: BillOptions = { searchOptions: { maxResults: 10 } };

		// Get all bills
		const searchResponse = await apiClient.bills.getAllBills(billOptions);

		// Test the Bills
		expect(searchResponse.results).toBeInstanceOf(Array);
		expect(searchResponse.results.length).toBeGreaterThan(0);
		expect(searchResponse.results.length).toBeLessThanOrEqual(10);
	});

	// Test pagination
	test('should handle pagination', async () => {
		// Setup the Bill Options
		const billOptions1: BillOptions = { searchOptions: { maxResults: 10, page: 1 } };
		const billOptions2: BillOptions = { searchOptions: { maxResults: 10, page: 2 } };

		// Get all bills
		const searchResponse1 = await apiClient.bills.getAllBills(billOptions1);
		const searchResponse2 = await apiClient.bills.getAllBills(billOptions2);

		// Test the Bills
		expect(searchResponse1.results).toBeInstanceOf(Array);
		expect(searchResponse2.results).toBeInstanceOf(Array);
		expect(searchResponse1.results.length).toBeGreaterThan(0);
		expect(searchResponse2.results.length).toBeGreaterThan(0);
		expect(searchResponse1.results).not.toEqual(searchResponse2.results);
	});

	// Test date range filtering
	test('should retrieve bills within date range', async () => {
		// Get the End Date
		const endDate = new Date();

		// Get the Start Date
		const startDate = new Date();
		startDate.setDate(endDate.getDate() - 730);

		// Get the Bills
		const searchResponse = await apiClient.bills.getBillsForDateRange(startDate, endDate);

		// Assert the Bills
		expect(searchResponse.results).toBeInstanceOf(Array);
	});

	// Test updated bills
	// test('should retrieve updated bills', async () => {
	// 	// Get the Last Updated Time
	// 	const lastUpdatedTime = new Date();
	// 	lastUpdatedTime.setDate(lastUpdatedTime.getDate() - 60);

	// 	// Get the Updated Bills
	// 	const searchResponse = await apiClient.bills.getUpdatedBills(lastUpdatedTime);

	// 	// Assert the Bills
	// 	expect(searchResponse.results).toBeInstanceOf(Array);
	// });

	// Should handle all Search Options
	test('should handle all search options', async () => {
		// Setup the Bill Options
		const billOptions: BillOptions = {
			searchOptions: {
				maxResults: 10,
				page: 1,
				orderBy: { field: 'Id', direction: 'DESC' },
			},
		};

		// Get all bills
		const searchResponse = await apiClient.bills.getAllBills(billOptions);

		// Test the Bills
		expect(searchResponse.results).toBeInstanceOf(Array);
		expect(searchResponse.results.length).toBeGreaterThan(0);

		// loop through the bills and test each id is less than the previous one
		for (let i = 0; i < searchResponse.results.length - 1; i++) {
			expect(Number(searchResponse.results[i].Id)).toBeGreaterThan(Number(searchResponse.results[i + 1].Id));
		}
	});

	// Test error handling for invalid ID
	test('should throw QuickbooksError for invalid bill ID', async () => {
		try {
			await apiClient.bills.getBillById('invalid');
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
		const queryBuilder = await apiClient.bills.getQueryBuilder();

		// Add an invalid ID filter that will cause an error
		queryBuilder.whereId('invalid-id-that-does-not-exist');

		try {
			await apiClient.bills.rawBillQuery(queryBuilder);
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
});
