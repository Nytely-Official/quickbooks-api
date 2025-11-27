// Imports
import { AuthProvider, Environment, ApiClient, AuthScopes, InvoiceOptions, CustomerOptions, QuickbooksError } from '../src/app';
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
		// Setup the Customer Options
		const customerOptions: CustomerOptions = { searchOptions: { maxResults: 10 } };
		// Get all customers
		const searchResponse = await apiClient.customers.getAllCustomers(customerOptions);

		// Test the Customers
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Customer length
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test pagination
	test('should handle pagination', async () => {
		// Setup the Customer Options
		const customerOptions1: CustomerOptions = { searchOptions: { maxResults: 10, page: 1 } };
		const customerOptions2: CustomerOptions = { searchOptions: { maxResults: 10, page: 2 } };

		// Get all customers
		const searchResponse1 = await apiClient.customers.getAllCustomers(customerOptions1);
		const searchResponse2 = await apiClient.customers.getAllCustomers(customerOptions2);

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
		// Setup the Customer Options
		const customerOptions: CustomerOptions = {
			searchOptions: {
				maxResults: 10,
				page: 1,
				orderBy: { field: 'Id', direction: 'DESC' },
			},
		};
		// Get all customers
		const searchResponse = await apiClient.customers.getAllCustomers(customerOptions);

		// Test the Customers
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Customer length
		expect(searchResponse.results.length).toBeGreaterThan(0);

		// loop through the customers and test each id is less than the previous one
		for (let i = 0; i < searchResponse.results.length - 1; i++)
			expect(Number(searchResponse.results[i].Id)).toBeGreaterThan(Number(searchResponse.results[i + 1].Id));
	});

	// Test retrieving updated customers
	test('should retrieve updated customers', async () => {
		// Get the Last Updated Time
		const lastUpdatedTime = new Date('2012-01-08');

		// Get the Customers
		const searchResponse = await apiClient.customers.getUpdatedCustomers(lastUpdatedTime);

		// Test the Customers
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Customer length
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test returning an empty array if no customers are updated
	test('should return an empty array if no customers are updated', async () => {
		// Setup the Future Date
		const futureDate = new Date();

		// Set the New Full Year
		futureDate.setFullYear(futureDate.getFullYear() + 20);

		// Get the Customers
		const searchResponse = await apiClient.customers.getUpdatedCustomers(futureDate);

		// Assert the Customers
		expect(searchResponse.results).toBeArray();

		// Assert the Customers Length
		expect(searchResponse.results.length).toBe(0);
	});

	// Test error handling for invalid ID
	test('should throw QuickbooksError for invalid customer ID', async () => {
		try {
			await apiClient.customers.getCustomerById('invalid');
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
		const queryBuilder = await apiClient.customers.getQueryBuilder();

		// Add an invalid ID filter that will cause an error
		queryBuilder.whereId('invalid-id-that-does-not-exist');

		try {
			await apiClient.customers.rawCustomerQuery(queryBuilder);
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
