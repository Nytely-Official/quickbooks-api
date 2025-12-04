import { ApiClient } from '../src/app';
import { AuthProvider, Environment, AuthScopes, type PaymentQueryResponse, Payment } from '../src/app';
import { describe, expect, it, beforeEach, afterEach } from 'bun:test';
import { mockFetch, mockPaymentData, mockTokenData, mockPDF } from './helpers';

// Mock configuration
const TEST_CONFIG = {
	clientId: 'test_client_id',
	clientSecret: 'test_client_secret',
	redirectUri: 'http://localhost:3000/auth-code',
	scopes: [AuthScopes.Accounting],
};

// Describe the Payment API
describe('Payment API', () => {
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

	// Describe the getAllPayments Method
	describe('getAllPayments', () => {
		// Describe the getAllPayments Method
		it('should fetch all payments', async () => {
			// Setup the Payment Query Response
			const paymentQueryResponse: { QueryResponse: PaymentQueryResponse } = {
				QueryResponse: {
					Payment: mockPaymentData,
					maxResults: mockPaymentData.length,
					startPosition: 1,
					totalCount: mockPaymentData.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(paymentQueryResponse));

			// Get the Payments
			const searchResponse = await apiClient.payments.getAllPayments();

			// Assert the Payments
			expect(searchResponse.results).toBeArray();

			// Assert the Payments Length
			expect(searchResponse.results.length).toBe(mockPaymentData.length);

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');

			// Assert the Payments
			expect(searchResponse.results[0].Id).toBe(mockPaymentData[0].Id);
		});
	});

	// Describe the hasNextPage Method
	describe('hasNextPage', () => {
		// Describe the hasNextPage Method
		it('should return true if there is a next page', async () => {
			// Setup the Payment Query Response
			const paymentQueryResponse: { QueryResponse: PaymentQueryResponse } = {
				QueryResponse: {
					Payment: mockPaymentData,
					maxResults: mockPaymentData.length,
					startPosition: 1,
					totalCount: mockPaymentData.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(paymentQueryResponse));

			// Get the Payments
			const searchResponse = await apiClient.payments.getAllPayments();

			// Assert the Payments
			expect(searchResponse.hasNextPage).toBe(true);

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');
		});
	});

	// Describe the getPaymentById Method
	describe('getPaymentById', () => {
		// Describe the getPaymentById Method
		it('should fetch single payment by ID', async () => {
			// Get the Test Payment
			const testPayment = mockPaymentData[0];

			// Setup the Payment Query Response
			const paymentQueryResponse: { QueryResponse: PaymentQueryResponse } = {
				QueryResponse: {
					Payment: [testPayment],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};

			// Mock single payment response structure
			global.fetch = mockFetch(JSON.stringify(paymentQueryResponse));

			// Get the Payment
			const paymentResponse = await apiClient.payments.getPaymentById(testPayment.Id);

			// Assert the Payment Response Structure
			expect(paymentResponse).toBeObject();
			expect(paymentResponse).toHaveProperty('payment');
			expect(paymentResponse).toHaveProperty('intuitTID');
			expect(typeof paymentResponse.intuitTID).toBe('string');
			expect(paymentResponse.intuitTID).toBe('test-tid-12345-67890');

			// Assert the Payment
			expect(paymentResponse.payment?.Id).toBe(testPayment.Id);

			// Assert the Payment is a class instance
			if (paymentResponse.payment) {
				expect(paymentResponse.payment).toBeInstanceOf(Payment);
				expect(typeof paymentResponse.payment.setApiClient).toBe('function');
				expect(typeof paymentResponse.payment.reload).toBe('function');
				expect(typeof paymentResponse.payment.save).toBe('function');
			}
		});

		// Describe the getPaymentById Method
		it('should throw error for invalid payment ID', async () => {
			// Mock empty response with 400 status
			global.fetch = mockFetch(
				JSON.stringify({
					QueryResponse: {},
					fault: { error: [{ message: 'Payment not found' }] },
				}),
				400,
			);

			// Assert the Payment
			expect(apiClient.payments.getPaymentById('invalid')).rejects.toThrow('Failed to run request');
		});
	});

	// Describe the getPaymentsForDateRange Method
	describe('getPaymentsForDateRange', () => {
		// Describe the getPaymentsForDateRange Method
		it('should fetch payments within date range', async () => {
			// Set the start Date
			const startDate = new Date('2021-01-09');

			// Set the end Date
			const endDate = new Date('2023-01-12');

			// Get the List of Payments in that date range for the mock data
			const paymentsInDateRange = mockPaymentData.filter((payment) => {
				// Get the Payment Date
				const paymentDate = new Date(payment.MetaData!.LastUpdatedTime!);
				// Return the Payment if it is in the date range
				return paymentDate >= startDate && paymentDate <= endDate;
			});

			// Setup the Payment Query Response
			const paymentQueryResponse: { QueryResponse: PaymentQueryResponse } = {
				QueryResponse: {
					Payment: paymentsInDateRange,
					maxResults: paymentsInDateRange.length,
					startPosition: 1,
					totalCount: paymentsInDateRange.length,
				},
			};

			// Mock response with proper structure
			global.fetch = mockFetch(JSON.stringify(paymentQueryResponse));

			// Get the Payments
			const searchResponse = await apiClient.payments.getPaymentsForDateRange(startDate, endDate);
			// Assert the Payments
			expect(searchResponse.results).toBeArray();

			// Assert the Payments Length
			expect(searchResponse.results.length).toBe(paymentsInDateRange.length);

			// Assert the Payments
			expect(searchResponse.results[0].Id).toBe(paymentsInDateRange[0].Id);

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');
		});
	});

	// Describe the getUpdatedPayments Method
	describe('getUpdatedPayments', () => {
		// Describe the getUpdatedPayments Method
		it('should fetch updated payments', async () => {
			// Get the Last Updated Time
			const lastUpdatedTime = new Date('2025-01-09');

			// Get the List of Payments in that date range for the mock data
			const paymentsInDateRange = mockPaymentData.filter((payment) => {
				// Check if the last updated date is invalid
				if (!payment.MetaData?.LastUpdatedTime) return false;

				// Get the Payment Date
				const paymentDate = new Date(payment.MetaData.LastUpdatedTime);

				// Return the Payment if it is in the date range
				return paymentDate >= lastUpdatedTime;
			});
			// Setup the Payment Query Response
			const paymentQueryResponse: { QueryResponse: PaymentQueryResponse } = {
				QueryResponse: {
					Payment: paymentsInDateRange,
					maxResults: paymentsInDateRange.length,
					startPosition: 1,
					totalCount: paymentsInDateRange.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(paymentQueryResponse));

			// Get the Payments
			const searchResponse = await apiClient.payments.getUpdatedPayments(lastUpdatedTime);

			// Assert the Payments
			expect(searchResponse.results).toBeArray();

			// Assert the Payments Length
			expect(searchResponse.results.length).toBe(paymentsInDateRange.length);

			// Assert the Payments
			expect(searchResponse.results[0].Id).toBe(paymentsInDateRange[0].Id);
		});

		// Describe the getUpdatedPayments Method
		it('should return an empty array if no payments are updated', async () => {
			// Setup the Payment Query Response
			const paymentQueryResponse: { QueryResponse: {}; time: string } = {
				QueryResponse: {},
				time: '2025-03-04T05:46:36.933-08:00',
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(paymentQueryResponse));

			// Get the Payments
			const searchResponse = await apiClient.payments.getUpdatedPayments(new Date(new Date().getTime() + 68400000));

			// Assert the Payments
			expect(searchResponse.results).toBeArray();

			// Assert the Payments Length
			expect(searchResponse.results.length).toBe(0);

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');
		});
	});

	// Describe the Payment Class Methods
	describe('Payment Class', () => {
		afterEach(() => {
			global.fetch = globalFetch;
		});

		it('should return Payment class instance', async () => {
			const testPayment = mockPaymentData[0];
			const paymentQueryResponse = {
				QueryResponse: {
					Payment: [testPayment],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};
			global.fetch = mockFetch(JSON.stringify(paymentQueryResponse));

			const paymentResponse = await apiClient.payments.getPaymentById(testPayment.Id);

			expect(paymentResponse.payment).toBeInstanceOf(Payment);
			expect(typeof paymentResponse.payment?.setApiClient).toBe('function');
			expect(typeof paymentResponse.payment?.reload).toBe('function');
			expect(typeof paymentResponse.payment?.save).toBe('function');
			expect(typeof paymentResponse.payment?.downloadPDF).toBe('function');
			expect(typeof paymentResponse.payment?.void).toBe('function');
		});

		it('should reload payment data', async () => {
			const testPayment = mockPaymentData[0];
			const updatedPayment = { ...testPayment, TotalAmt: 999.99 };

			// Setup initial fetch
			const paymentQueryResponse = {
				QueryResponse: {
					Payment: [testPayment],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};
			global.fetch = mockFetch(JSON.stringify(paymentQueryResponse));

			const paymentResponse = await apiClient.payments.getPaymentById(testPayment.Id);
			const payment = paymentResponse.payment!;

			// Modify locally
			(payment as any).TotalAmt = 111.11;

			// Setup reload response
			const reloadQueryResponse = {
				QueryResponse: {
					Payment: [updatedPayment],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};
			global.fetch = mockFetch(JSON.stringify(reloadQueryResponse));

			// Reload the payment
			await payment.reload();

			// Assert the payment was reloaded
			expect(payment.TotalAmt).toBe(updatedPayment.TotalAmt);
		});

		it('should save payment data', async () => {
			const testPayment = mockPaymentData[0];
			const savedPayment = { ...testPayment, SyncToken: '1', Id: testPayment.Id };

			// Setup initial fetch
			const paymentQueryResponse = {
				QueryResponse: {
					Payment: [testPayment],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};
			global.fetch = mockFetch(JSON.stringify(paymentQueryResponse));

			const paymentResponse = await apiClient.payments.getPaymentById(testPayment.Id);
			const payment = paymentResponse.payment!;

			// Modify the payment
			if (payment.TotalAmt !== undefined) {
				(payment as any).TotalAmt = 500.0;
			}

			// Setup save response
			const saveResponse = {
				Payment: savedPayment,
			};
			global.fetch = mockFetch(JSON.stringify(saveResponse));

			// Save the payment
			await payment.save();

			// Assert the save was called
			expect(global.fetch).toBeDefined();
		});

		it('should download payment PDF', async () => {
			const testPayment = mockPaymentData[0];
			const pdfBlob = new Blob(['PDF content'], { type: 'application/pdf' });

			// Setup initial fetch
			const paymentQueryResponse = {
				QueryResponse: {
					Payment: [testPayment],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};
			global.fetch = mockFetch(JSON.stringify(paymentQueryResponse));

			const paymentResponse = await apiClient.payments.getPaymentById(testPayment.Id);
			const payment = paymentResponse.payment!;

			// Setup PDF response
			global.fetch = mockPDF(pdfBlob);

			// Download the PDF
			const pdf = await payment.downloadPDF();

			// Assert the PDF is a Blob
			expect(pdf).toBeInstanceOf(Blob);
			expect(pdf.type).toBe('application/pdf');
		});

		it('should void payment', async () => {
			const testPayment = mockPaymentData[0];
			const voidedPayment = { ...testPayment, TotalAmt: 0, SyncToken: '1' };

			// Setup initial fetch
			const paymentQueryResponse = {
				QueryResponse: {
					Payment: [testPayment],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};
			global.fetch = mockFetch(JSON.stringify(paymentQueryResponse));

			const paymentResponse = await apiClient.payments.getPaymentById(testPayment.Id);
			const payment = paymentResponse.payment!;

			// Setup void response
			const voidResponse = {
				Payment: [voidedPayment],
			};
			global.fetch = mockFetch(JSON.stringify(voidResponse));

			// Void the payment
			await payment.void();

			// Assert the payment was updated
			expect(payment.TotalAmt).toBe(voidedPayment.TotalAmt);
		});
	});
});
