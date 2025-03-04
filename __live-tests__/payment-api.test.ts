// Imports
import { AuthProvider, Environment, ApiClient, AuthScopes, type PaymentOptions } from '../src/app';
import { describe, expect, test } from 'bun:test';

// Describe the Payment API
describe('Live API: Payments', async () => {
	// Initialize the Auth Provider
	const authProvider = new AuthProvider(process.env.QB_CLIENT_ID!, process.env.QB_CLIENT_SECRET!, process.env.REDIRECT_URI!, [
		AuthScopes.Accounting,
	]);

	// Deserialize the Token
	await authProvider.deserializeToken(process.env.SERIALIZED_TOKEN!, process.env.SECRET_KEY!);

	// Setup the API Client
	const apiClient = new ApiClient(authProvider, Environment.Sandbox);

	// Test retrieving all payments
	test('should retrieve all Payments', async () => {
		// Get all payments
		const searchResponse = await apiClient.payments.getAllPayments();

		// Test the Payments
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Payment length
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test Checking for Next Page
	test('should check for next page', async () => {
		// Get all payments
		const searchResponse = await apiClient.payments.getAllPayments();

		// Test the Payments
		expect(searchResponse.hasNextPage).toBe(true);
	});

	// Test retrieving a single payment
	test('should retrieve a single payment', async () => {
		// Get all payments
		const searchResponse = await apiClient.payments.getAllPayments();

		// Get the first payment
		const payment = searchResponse.results[0];

		// Get the Payment by ID
		const foundPayment = await apiClient.payments.getPaymentById(payment.Id);

		// Test the Payment
		expect(foundPayment).toBeDefined();

		// Test the Payment ID
		expect(foundPayment.Id).toBe(payment.Id);
	});

	// Test retrieving 10 payments
	test('should retrieve 10 payments', async () => {
		// Setup the Payment Options
		const paymentOptions: PaymentOptions = { searchOptions: { maxResults: 10 } };

		// Get all payments
		const searchResponse = await apiClient.payments.getAllPayments(paymentOptions);

		// Test the Payments
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Payment length
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test pagination
	test('should handle pagination', async () => {
		// Setup the Payment Options
		const paymentOptions1: PaymentOptions = { searchOptions: { maxResults: 10, page: 1 } };
		const paymentOptions2: PaymentOptions = { searchOptions: { maxResults: 10, page: 2 } };

		// Get all payments
		const searchResponse1 = await apiClient.payments.getAllPayments(paymentOptions1);
		const searchResponse2 = await apiClient.payments.getAllPayments(paymentOptions2);

		// Test the Payments
		expect(searchResponse1.results).toBeInstanceOf(Array);
		expect(searchResponse2.results).toBeInstanceOf(Array);

		// Test the Payment length
		expect(searchResponse1.results.length).toBeGreaterThan(0);
		expect(searchResponse2.results.length).toBeGreaterThan(0);

		// Test the Payments are different
		expect(searchResponse1.results).not.toEqual(searchResponse2.results);
	});

	// Should handle all Search Options
	test('should handle all search options', async () => {
		// Setup the Payment Options
		const paymentOptions: PaymentOptions = {
			searchOptions: {
				maxResults: 10,
				page: 1,
				orderBy: { field: 'Id', direction: 'DESC' },
			},
		};

		// Get all payments
		const searchResponse = await apiClient.payments.getAllPayments(paymentOptions);

		// Test the Payments
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Payment length
		expect(searchResponse.results.length).toBeGreaterThan(0);

		// loop through the payments and test each id is less than the previous one
		for (let i = 0; i < searchResponse.results.length - 1; i++)
			expect(Number(searchResponse.results[i].Id)).toBeGreaterThan(Number(searchResponse.results[i + 1].Id));
	});

	// Test retrieving updated payments
	test('should retrieve updated payments', async () => {
		// Get the End Date
		const lastUpdated = new Date();

		// Set the Date to 30 days ago
		lastUpdated.setDate(lastUpdated.getDate() - 30);

		// Get the Updated Payments
		const searchResponse = await apiClient.payments.getUpdatedPayments(lastUpdated);

		// Assert the Payments
		expect(searchResponse.results).toBeInstanceOf(Array);
	});

	// Test retrieving updated payments
	test('should retrieve updated payments', async () => {
		// Get the Last Updated Time
		const lastUpdatedTime = new Date('2012-01-08');

		// Get the Payments
		const searchResponse = await apiClient.payments.getUpdatedPayments(lastUpdatedTime);

		// Test the Payments
		expect(searchResponse.results).toBeInstanceOf(Array);

		// Test the Payment length
		expect(searchResponse.results.length).toBeGreaterThan(0);
	});

	// Test returning an empty array if no payments are updated
	test('should return an empty array if no payments are updated', async () => {
		// Setup the Future Date
		const futureDate = new Date();

		// Set the New Full Year
		futureDate.setFullYear(futureDate.getFullYear() + 20);

		// Get the Payments
		const searchResponse = await apiClient.payments.getUpdatedPayments(futureDate);

		// Assert the Payments
		expect(searchResponse.results).toBeArray();

		// Assert the Payments Length
		expect(searchResponse.results.length).toBe(0);
	});
});
