// Imports
import { AuthProvider, Environment, ApiClient, AuthScopes } from '../src/app';
import { describe, expect, test } from 'bun:test';

// Describe the Customer API
describe('Live API: Customers', async () => {
	// Initialize the Auth Provider
	const authProvider = new AuthProvider(process.env.QB_CLIENT_ID!, process.env.QB_CLIENT_SECRET!, process.env.REDIRECT_URI!, [
		AuthScopes.Accounting,
	]);

	// Deserialize the Token
	await authProvider.deserializeToken(process.env.SERIALIZED_TOKEN!, process.env.SECRET_KEY!);

	// Setup the API Client
	const apiClient = new ApiClient(authProvider, Environment.Sandbox);

	// Test retrieving all customers
	test('should retrieve all customers', async () => {
		// Get all customers
		const searchResponse = await apiClient.customers.getAllCustomers();

		// Test the Customers
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Customer length
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test Checking for Next Page
	test('should check for next page', async () => {
		// Get all customers
		const searchResponse = await apiClient.customers.getAllCustomers();

		// Test the Customers
		expect(searchResponse.hasNextPage).toBe(true);
	});

	// Test retrieving a single customer
	test('should retrieve a single customer', async () => {
		// Get all customers
		const searchResponse = await apiClient.customers.getAllCustomers();

		// Get the first customer
		const customer = searchResponse.results[0];

		// Get the Customer by ID
		const foundCustomer = await apiClient.customers.getCustomerById(customer.Id);

		// Test the Customer
		expect(foundCustomer).toBeDefined();

		// Test the Customer ID
		expect(foundCustomer.Id).toBe(customer.Id);
	});

	// Test retrieving 10 customers
	test('should retrieve 10 customers', async () => {
		// Get all customers
		const searchResponse = await apiClient.customers.getAllCustomers({ maxResults: 10 });

		// Test the Customers
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Customer length
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test pagination
	test('should handle pagination', async () => {
		// Get all customers
		const searchResponse1 = await apiClient.customers.getAllCustomers({ maxResults: 10, page: 1 });
		const searchResponse2 = await apiClient.customers.getAllCustomers({ maxResults: 10, page: 2 });

		// Test the Customers
		expect(searchResponse1.results).toBeInstanceOf(Array);
		expect(searchResponse2.results).toBeInstanceOf(Array);

		// Test the Customer length
		expect(searchResponse1.results.length).toBeGreaterThan(0);
		expect(searchResponse2.results.length).toBeGreaterThan(0);

		// Test the Customers are different
		expect(searchResponse1.results).not.toEqual(searchResponse2.results);
	});

	// Should handle all Search Options
	test('should handle all search options', async () => {
		// Get all customers
		const searchResponse = await apiClient.customers.getAllCustomers({
			maxResults: 10,
			page: 1,
			orderBy: { field: 'Id', direction: 'DESC' },
		});

		// Test the Customers
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Customer length
		expect(searchResponse.results.length).toBeGreaterThan(0);

		// loop through the customers and test each id is less than the previous one
		for (let i = 0; i < searchResponse.results.length - 1; i++)
			expect(Number(searchResponse.results[i].Id)).toBeGreaterThan(Number(searchResponse.results[i + 1].Id));
	});
});
