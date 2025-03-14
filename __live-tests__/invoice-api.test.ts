// Imports
import { AuthProvider, Environment, ApiClient, AuthScopes, InvoiceOptions, InvoiceStatus, Invoice } from '../src/app';
import { describe, expect, test } from 'bun:test';

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
		// Setup the Invoice Options
		const invoiceOptions: InvoiceOptions = { searchOptions: { maxResults: 10 } };

		// Get all invoices
		const searchResponse = await apiClient.invoices.getAllInvoices(invoiceOptions);

		// Test the Invoices
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Invoice length
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test retrieving Invoices by Status
	test('should retrieve Invoices by Status', async () => {
		// Setup the Invoice Options
		const invoiceOptionsPaid: InvoiceOptions = { searchOptions: { maxResults: 10 }, status: InvoiceStatus.Paid };
		const invoiceOptionsUnpaid: InvoiceOptions = { searchOptions: { maxResults: 10 }, status: InvoiceStatus.Unpaid };

		// Get all invoices
		const searchResponsePaid = await apiClient.invoices.getAllInvoices(invoiceOptionsPaid);
		const searchResponseUnpaid = await apiClient.invoices.getAllInvoices(invoiceOptionsUnpaid);

		// Test the Invoices
		expect(searchResponsePaid.results).toBeInstanceOf(Array);
		expect(searchResponseUnpaid.results).toBeInstanceOf(Array);

		// Test the Invoice length
		expect(searchResponsePaid.results.length).toBeGreaterThan(0);
		expect(searchResponseUnpaid.results.length).toBeGreaterThan(0);

		// Test the Invoices are different
		expect(searchResponsePaid.results).not.toEqual(searchResponseUnpaid.results);

		// Test the Invoices are paid
		await Promise.all(
			searchResponsePaid.results.map(async (invoice: Invoice) => {
				expect(invoice.Balance).toBe(0);
			}),
		);

		// Test the Invoices are unpaid
		await Promise.all(
			searchResponseUnpaid.results.map(async (invoice: Invoice) => {
				expect(invoice.Balance).toBeGreaterThan(0);
			}),
		);
	});

	// Test pagination
	test('should handle pagination', async () => {
		// Setup the Invoice Options
		const invoiceOptions1: InvoiceOptions = { searchOptions: { maxResults: 10, page: 1 } };
		const invoiceOptions2: InvoiceOptions = { searchOptions: { maxResults: 10, page: 2 } };

		// Get all invoices
		const searchResponse1 = await apiClient.invoices.getAllInvoices(invoiceOptions1);
		const searchResponse2 = await apiClient.invoices.getAllInvoices(invoiceOptions2);

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
		// Setup the Invoice Options
		const invoiceOptions: InvoiceOptions = {
			searchOptions: {
				maxResults: 10,
				page: 1,
				orderBy: { field: 'Id', direction: 'DESC' },
			},
		};

		// Get all invoices
		const searchResponse = await apiClient.invoices.getAllInvoices(invoiceOptions);

		// Test the Invoices
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Invoice length
		expect(searchResponse.results.length).toBeGreaterThan(0);

		// loop through the invoices and test each id is less than the previous one
		for (let i = 0; i < searchResponse.results.length - 1; i++)
			expect(Number(searchResponse.results[i].Id)).toBeGreaterThan(Number(searchResponse.results[i + 1].Id));
	});

	// Test retrieving updated invoices
	test('should retrieve updated invoices', async () => {
		// Get the Last Updated Time
		const lastUpdatedTime = new Date('2012-01-08');

		// Get the Invoices
		const searchResponse = await apiClient.invoices.getUpdatedInvoices(lastUpdatedTime);

		// Test the Invoices
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Invoice length
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test returning an empty array if no invoices are updated
	test('should return an empty array if no invoices are updated', async () => {
		// Setup the Future Date
		const futureDate = new Date();

		// Set the New Full Year
		futureDate.setFullYear(futureDate.getFullYear() + 20);

		// Get the Invoices
		const searchResponse = await apiClient.invoices.getUpdatedInvoices(futureDate);

		// Assert the Invoices
		expect(searchResponse.results).toBeArray();

		// Assert the Invoices Length
		expect(searchResponse.results.length).toBe(0);
	});
});
