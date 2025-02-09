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
});
