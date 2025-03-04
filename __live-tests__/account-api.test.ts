// Imports
import { AuthProvider, Environment, ApiClient, AuthScopes, type AccountOptions } from '../src/app';
import { describe, expect, test } from 'bun:test';

// Describe the Account API
describe('Live API: Accounts', async () => {
	// Initialize the Auth Provider
	const authProvider = new AuthProvider(process.env.QB_CLIENT_ID!, process.env.QB_CLIENT_SECRET!, process.env.REDIRECT_URI!, [
		AuthScopes.Accounting,
	]);

	// Deserialize the Token
	await authProvider.deserializeToken(process.env.SERIALIZED_TOKEN!, process.env.SECRET_KEY!);

	// Setup the API Client
	const apiClient = new ApiClient(authProvider, Environment.Sandbox);

	// Test retrieving all accounts
	test('should retrieve all accounts', async () => {
		// Get all accounts
		const searchResponse = await apiClient.accounts.getAllAccounts();

		// Test the Accounts
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Account length
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test Checking for Next Page
	test('should check for next page', async () => {
		// Get all accounts
		const searchResponse = await apiClient.accounts.getAllAccounts();

		// Test the Accounts
		expect(searchResponse.hasNextPage).toBe(true);
	});

	// Test retrieving a single account
	test('should retrieve a single account', async () => {
		// Get all accounts
		const searchResponse = await apiClient.accounts.getAllAccounts();
		const accounts = searchResponse?.results?.slice(0, 5);

		await Promise.all(
			accounts.map(async (account) => {
				// Get the Account
				const accountResponse = await apiClient.accounts.getAccountById(account.Id);

				// Test the Account
				expect(accountResponse).toBeDefined();

				// Test the Account ID
				expect(accountResponse).toHaveProperty('Id');
			}),
		);
	});

	// Test retrieving accounts with limit
	test('should retrieve limited accounts', async () => {
		// Setup the Account Options
		const accountOptions: AccountOptions = { searchOptions: { maxResults: 10 } };

		// Get all accounts
		const searchResponse = await apiClient.accounts.getAllAccounts(accountOptions);

		// Test the Accounts
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Account length
		expect(searchResponse.results.length).toBeGreaterThan(0);
		expect(searchResponse.results.length).toBeLessThanOrEqual(10);
	});

	// Test pagination
	test('should handle pagination', async () => {
		// Setup the Account Options
		const accountOptions1: AccountOptions = { searchOptions: { maxResults: 10, page: 1 } };
		const accountOptions2: AccountOptions = { searchOptions: { maxResults: 10, page: 2 } };

		// Get all accounts
		const searchResponse1 = await apiClient.accounts.getAllAccounts(accountOptions1);
		const searchResponse2 = await apiClient.accounts.getAllAccounts(accountOptions2);

		// Test the Accounts
		expect(searchResponse1.results).toBeInstanceOf(Array);
		expect(searchResponse2.results).toBeInstanceOf(Array);

		// Test the Account length
		expect(searchResponse1.results.length).toBeGreaterThan(0);
		expect(searchResponse2.results.length).toBeGreaterThan(0);

		// Test the Accounts are different
		expect(searchResponse1.results).not.toEqual(searchResponse2.results);
	});

	// Test date range filtering
	test('should retrieve accounts within date range', async () => {
		// Get the End Date
		const endDate = new Date();

		// Get the Start Date
		const startDate = new Date();
		startDate.setDate(endDate.getDate() - 30);

		// Get the Accounts
		const searchResponse = await apiClient.accounts.getAccountsForDateRange(startDate, endDate);

		// Assert the Accounts
		expect(searchResponse.results).toBeInstanceOf(Array);
	});

	// Test updated accounts
	test('should retrieve updated accounts', async () => {
		// Get the End Date
		const lastUpdated = new Date();
		lastUpdated.setDate(lastUpdated.getDate() - 30);

		// Get the Updated Accounts
		const searchResponse = await apiClient.accounts.getUpdatedAccounts(lastUpdated);

		// Assert the Accounts
		expect(searchResponse.results).toBeInstanceOf(Array);
	});

	// Test error handling for invalid ID
	test('should throw error for invalid account ID', async () => {
		// Assert the Error
		expect(apiClient.accounts.getAccountById('invalid')).rejects.toThrow();
	});

	// Should handle all Search Options
	test('should handle all search options', async () => {
		// Setup the Account Options
		const accountOptions: AccountOptions = {
			searchOptions: {
				maxResults: 10,
				page: 1,
				orderBy: { field: 'Id', direction: 'DESC' },
			},
		};

		// Get all accounts
		const searchResponse = await apiClient.accounts.getAllAccounts(accountOptions);

		// Test the Accounts
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Account length
		expect(searchResponse.results.length).toBeGreaterThan(0);

		// loop through the accounts and test each id is less than the previous one
		for (let i = 0; i < searchResponse.results.length - 1; i++)
			expect(Number(searchResponse.results[i].Id)).toBeGreaterThan(Number(searchResponse.results[i + 1].Id));
	});

	// Test retrieving updated accounts
	test('should retrieve updated accounts', async () => {
		// Get the Last Updated Time
		const lastUpdatedTime = new Date('2012-01-08');

		// Get the Accounts
		const searchResponse = await apiClient.accounts.getUpdatedAccounts(lastUpdatedTime);

		// Test the Accounts
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Account length
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test returning an empty array if no accounts are updated
	test('should return an empty array if no accounts are updated', async () => {
		// Setup the Future Date
		const futureDate = new Date();

		// Set the New Full Year
		futureDate.setFullYear(futureDate.getFullYear() + 20);

		// Get the Accounts
		const searchResponse = await apiClient.accounts.getUpdatedAccounts(futureDate);

		// Assert the Customers
		expect(searchResponse.results).toBeArray();

		// Assert the Customers Length
		expect(searchResponse.results.length).toBe(0);
	});
});
