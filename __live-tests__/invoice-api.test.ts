// Imports
import { AuthProvider, Environment, ApiClient, AuthScopes } from '../src/app';
import { beforeAll, describe, expect, test } from 'bun:test';

// Describe the Invoice API
describe('Live API: Invoices', async () => {
	// Initialize the Auth Provider
	const authProvider = new AuthProvider(process.env.QB_CLIENT_ID!, process.env.QB_CLIENT_SECRET!, process.env.REDIRECT_URI!, [
		AuthScopes.Accounting,
	]);

	// Deserialize the Token
	await authProvider.deserializeToken(process.env.SERIALIZED_TOKEN!, process.env.SECRET_KEY!);

	// Setup the API Client
	const apiClient = new ApiClient(authProvider, Environment.Sandbox);

	// Test retrieving all invoices
	test('should retrieve all invoices', async () => {
		// Get all invoices
		const searchResponse = await apiClient.invoices.getAllInvoices();

		// Test the Invoices
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Invoice length
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test Checking for Next Page
	test('should check for next page', async () => {
		// Get all invoices
		const searchResponse = await apiClient.invoices.getAllInvoices();

		// Test the Invoices
		expect(searchResponse.hasNextPage).toBe(true);
	});

	// Test retrieving a single invoice
	test('should retrieve a single invoice', async () => {
		// Get all invoices
		const searchResponse = await apiClient.invoices.getAllInvoices();

		// Get the first invoice
		const invoice = searchResponse.results[0];

		// Get the Invoice by ID
		const foundInvoice = await apiClient.invoices.getInvoiceById(invoice.Id);

		// Test the Invoice
		expect(foundInvoice).toBeDefined();

		// Test the Invoice ID
		expect(foundInvoice.Id).toBe(invoice.Id);
	});

	// Test retrieving 10 invoices
	test('should retrieve 10 invoices', async () => {
		// Get all invoices
		const searchResponse = await apiClient.invoices.getAllInvoices({ maxResults: 10 });

		// Test the Invoices
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Invoice length
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test pagination
	test('should handle pagination', async () => {
		// Get all invoices
		const searchResponse1 = await apiClient.invoices.getAllInvoices({ maxResults: 10, page: 1 });
		const searchResponse2 = await apiClient.invoices.getAllInvoices({ maxResults: 10, page: 2 });

		// Test the Invoices
		expect(searchResponse1.results).toBeInstanceOf(Array);
		expect(searchResponse2.results).toBeInstanceOf(Array);

		// Test the Invoice length
		expect(searchResponse1.results.length).toBeGreaterThan(0);
		expect(searchResponse2.results.length).toBeGreaterThan(0);

		// Test the Invoices are different
		expect(searchResponse1.results).not.toEqual(searchResponse2.results);
	});

	// Should handle all Search Options
	test('should handle all search options', async () => {
		// Get all invoices
		const searchResponse = await apiClient.invoices.getAllInvoices({
			maxResults: 10,
			page: 1,
			orderBy: { field: 'Id', direction: 'DESC' },
		});

		// Test the Invoices
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Invoice length
		expect(searchResponse.results.length).toBeGreaterThan(0);

		// loop through the invoices and test each id is less than the previous one
		for (let i = 0; i < searchResponse.results.length - 1; i++)
			expect(Number(searchResponse.results[i].Id)).toBeGreaterThan(Number(searchResponse.results[i + 1].Id));
	});
});
