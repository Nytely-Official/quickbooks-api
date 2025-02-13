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
		const invoices = await apiClient.invoices.getAllInvoices();

		// Test the Invoices
		expect(invoices).toBeInstanceOf(Array);

		// Test the Invoice length
		expect(invoices.length).toBeGreaterThan(0);
	});

	// Test retrieving a single invoice
	test('should retrieve a single invoice', async () => {
		// Get all invoices
		const invoices = await apiClient.invoices.getAllInvoices();

		// Get the first invoice
		const invoice = invoices[0];

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
		const invoices = await apiClient.invoices.getAllInvoices({ maxResults: 10 });

		// Test the Invoices
		expect(invoices).toBeInstanceOf(Array);

		// Test the Invoice length
		expect(invoices.length).toBe(10);
	});

	// Test pagination
	test('should handle pagination', async () => {
		// Get all invoices
		const invoicePage1 = await apiClient.invoices.getAllInvoices({ maxResults: 10, startPosition: 0 });
		const invoicePage2 = await apiClient.invoices.getAllInvoices({ maxResults: 10, startPosition: 10 });

		// Test the Invoices
		expect(invoicePage1).toBeInstanceOf(Array);
		expect(invoicePage2).toBeInstanceOf(Array);

		// Test the Invoice length
		expect(invoicePage1.length).toBe(10);
		expect(invoicePage2.length).toBe(10);

		// Test the Invoices are different
		expect(invoicePage1).not.toEqual(invoicePage2);
	});

	// Should handle all Search Options
	test('should handle all search options', async () => {
		// Get all invoices
		const invoices = await apiClient.invoices.getAllInvoices({
			maxResults: 10,
			startPosition: 0,
			orderBy: { field: 'Id', direction: 'DESC' },
		});

		// Test the Invoices
		expect(invoices).toBeInstanceOf(Array);

		// Test the Invoice length
		expect(invoices.length).toBe(10);

		// loop through the invoices and test each id is less than the previous one
		for (let i = 0; i < invoices.length - 1; i++) expect(Number(invoices[i].Id)).toBeGreaterThan(Number(invoices[i + 1].Id));
	});
});
