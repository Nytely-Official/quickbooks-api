import { ApiClient } from '../src/app';
import { AuthProvider, Environment, AuthScopes, type InvoiceQueryResponse } from '../src/app';
import { describe, expect, it, beforeEach, afterEach } from 'bun:test';
import { mockFetch, mockInvoiceData, mockTokenData } from './helpers';

// Mock configuration
const TEST_CONFIG = {
	clientId: 'test_client_id',
	clientSecret: 'test_client_secret',
	redirectUri: 'http://localhost:3000/auth-code',
	scopes: [AuthScopes.Accounting],
};

// Describe the Invoice API
describe('Invoice API', () => {
	// Declare the API Client
	let apiClient: ApiClient;

	// Declare the Global Fetch
	let globalFetch: typeof fetch;

	// Before Each
	beforeEach(async () => {
		// Set the Global Fetch
		globalFetch = global.fetch;

		// Create the Auth Provider
		const authProvider = new AuthProvider(TEST_CONFIG.clientId, TEST_CONFIG.clientSecret, TEST_CONFIG.redirectUri, TEST_CONFIG.scopes);

		// Set the Token for the Auth Provider
		await authProvider.setToken(mockTokenData);

		// Create the API Client
		apiClient = new ApiClient(authProvider, Environment.Sandbox);
	});

	// After Each
	afterEach(() => {
		// Set the Global Fetch
		global.fetch = globalFetch;
	});

	// Describe the getAllInvoices Method
	describe('getAllInvoices', () => {
		// Describe the getAllInvoices Method
		it('should fetch all invoices', async () => {
			// Setup the Invoice Query Response
			const invoiceQueryResponse: { QueryResponse: InvoiceQueryResponse } = {
				QueryResponse: {
					Invoice: mockInvoiceData,
					maxResults: mockInvoiceData.length,
					startPosition: 1,
					totalCount: mockInvoiceData.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(invoiceQueryResponse));

			// Get the Invoices
			const searchResponse = await apiClient.invoices.getAllInvoices();

			// Assert the Invoices
			expect(searchResponse.results).toBeArray();

			// Assert the Invoices Length
			expect(searchResponse.results.length).toBe(mockInvoiceData.length);

			// Assert the Invoices
			expect(searchResponse.results[0].Id).toBe(mockInvoiceData[0].Id);
		});
	});

	// Describe the hasNextPage Method
	describe('hasNextPage', () => {
		// Describe the hasNextPage Method
		it('should return true if there is a next page', async () => {
			// Setup the Invoice Query Response
			const invoiceQueryResponse: { QueryResponse: InvoiceQueryResponse } = {
				QueryResponse: {
					Invoice: mockInvoiceData,
					maxResults: mockInvoiceData.length,
					startPosition: 1,
					totalCount: mockInvoiceData.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(invoiceQueryResponse));

			// Get the Invoices
			const searchResponse = await apiClient.invoices.getAllInvoices();

			// Assert the Invoices
			expect(searchResponse.hasNextPage).toBe(true);
		});
	});

	// Describe the getInvoiceById Method
	describe('getInvoiceById', () => {
		// Describe the getInvoiceById Method
		it('should fetch single invoice by ID', async () => {
			// Get the Test Invoice
			const testInvoice = mockInvoiceData[0];

			// Setup the Invoice Query Response
			const invoiceQueryResponse: { QueryResponse: InvoiceQueryResponse } = {
				QueryResponse: {
					Invoice: [testInvoice],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};

			// Mock single invoice response structure
			global.fetch = mockFetch(JSON.stringify(invoiceQueryResponse));

			// Get the Invoice
			const invoice = await apiClient.invoices.getInvoiceById(testInvoice.Id);

			// Assert the Invoice
			expect(invoice.Id).toBe(testInvoice.Id);
		});

		// Describe the getInvoiceById Method
		it('should throw error for invalid invoice ID', async () => {
			// Mock empty response with 400 status
			global.fetch = mockFetch(
				JSON.stringify({
					QueryResponse: {},
					fault: { error: [{ message: 'Invoice not found' }] },
				}),
				400,
			);

			// Assert the Invoice
			expect(apiClient.invoices.getInvoiceById('invalid')).rejects.toThrow('Failed to run request');
		});
	});

	// Describe the getInvoicesForDateRange Method
	describe('getInvoicesForDateRange', () => {
		// Describe the getInvoicesForDateRange Method
		it('should fetch invoices within date range', async () => {
			// Set the start Date
			const startDate = new Date('2025-01-09');

			// Set the end Date
			const endDate = new Date('2025-01-12');

			// Get the List of Invoices in that date range for the mock data
			const invoicesInDateRange = mockInvoiceData.filter((invoice) => {
				// Get the Invoice Date
				const invoiceDate = new Date(invoice.MetaData!.LastUpdatedTime!);

				// Return the Invoice if it is in the date range
				return invoiceDate >= startDate && invoiceDate <= endDate;
			});

			// Setup the Invoice Query Response
			const invoiceQueryResponse: { QueryResponse: InvoiceQueryResponse } = {
				QueryResponse: {
					Invoice: invoicesInDateRange,
					maxResults: mockInvoiceData.length,
					startPosition: 1,
					totalCount: mockInvoiceData.length,
				},
			};

			// Mock response with proper structure
			global.fetch = mockFetch(JSON.stringify(invoiceQueryResponse));

			// Get the Invoices
			const searchResponse = await apiClient.invoices.getInvoicesForDateRange(startDate, endDate);

			// Assert the Invoices
			expect(searchResponse.results).toBeArray();

			// Assert the Invoices Length
			expect(searchResponse.results.length).toBe(invoicesInDateRange.length);

			// Assert the Invoices
			expect(searchResponse.results[0].Id).toBe(invoicesInDateRange[0].Id);
		});
	});

	// Describe the getUpdatedInvoices Method
	describe('getUpdatedInvoices', () => {
		// Describe the getUpdatedInvoices Method
		it('should fetch updated invoices', async () => {
			// Get the Last Updated Time
			const lastUpdatedTime = new Date('2025-01-09');

			// Get the List of Invoices in that date range for the mock data
			const invoicesInDateRange = mockInvoiceData.filter((invoice) => {
				// Check if the last updated date is invalid
				if (!invoice.MetaData?.LastUpdatedTime) return false;

				// Get the Invoice Date
				const invoiceDate = new Date(invoice.MetaData.LastUpdatedTime);

				// Return the Invoice if it is in the date range
				return invoiceDate >= lastUpdatedTime;
			});
			// Setup the Invoice Query Response
			const invoiceQueryResponse: { QueryResponse: InvoiceQueryResponse } = {
				QueryResponse: {
					Invoice: invoicesInDateRange,
					maxResults: invoicesInDateRange.length,
					startPosition: 1,
					totalCount: invoicesInDateRange.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(invoiceQueryResponse));

			// Get the Invoices
			const searchResponse = await apiClient.invoices.getUpdatedInvoices(lastUpdatedTime);

			// Assert the Invoices
			expect(searchResponse.results).toBeArray();

			// Assert the Invoices Length
			expect(searchResponse.results.length).toBe(invoicesInDateRange.length);

			// Assert the Invoices
			expect(searchResponse.results[0].Id).toBe(invoicesInDateRange[0].Id);
		});

		// Describe the getUpdatedInvoices Method
		it('should return an empty array if no invoices are updated', async () => {
			// Setup the Invoice Query Response
			const invoiceQueryResponse: { QueryResponse: {}; time: string } = {
				QueryResponse: {},
				time: '2025-03-04T05:46:36.933-08:00',
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(invoiceQueryResponse));

			// Get the Invoices
			const searchResponse = await apiClient.invoices.getUpdatedInvoices(new Date(new Date().getTime() + 68400000));

			// Assert the Invoices
			expect(searchResponse.results).toBeArray();

			// Assert the Invoices Length
			expect(searchResponse.results.length).toBe(0);
		});
	});

	// Describe the getInvoicesByDueDate Method
	describe('getInvoicesByDueDate', () => {
		// Describe the getInvoicesByDueDate Method
		it('should fetch invoices by due date', async () => {
			// Set the Test Date
			const testDate = new Date('2024-12-23');

			// Setup the Invoice Query Response
			const invoiceQueryResponse: { QueryResponse: InvoiceQueryResponse } = {
				QueryResponse: {
					Invoice: mockInvoiceData.filter((invoice) => invoice.DueDate && new Date(invoice.DueDate).getTime() === testDate.getTime()),
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(invoiceQueryResponse));

			// Get the Invoices
			const searchResponse = await apiClient.invoices.getInvoicesByDueDate(testDate);

			// Assert the Invoices
			expect(searchResponse.results).toBeArray();

			// Assert the Invoices Length
			expect(searchResponse.results.length).toBe(invoiceQueryResponse.QueryResponse.Invoice.length);

			// Assert the Invoices
			expect(new Date(searchResponse.results[0].DueDate).getTime()).toBe(testDate.getTime());
		});
	});
});
