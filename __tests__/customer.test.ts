import { ApiClient } from '../src/app';
import { AuthProvider, Environment, AuthScopes, type CustomerQueryResponse } from '../src/app';
import { describe, expect, it, beforeEach, afterEach } from 'bun:test';
import { mockFetch, mockCustomerData, mockTokenData } from './helpers';

// Mock configuration
const TEST_CONFIG = {
	clientId: 'test_client_id',
	clientSecret: 'test_client_secret',
	redirectUri: 'http://localhost:3000/auth-code',
	scopes: [AuthScopes.Accounting],
};

// Describe the Customer API
describe('Customer API', () => {
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

	// Describe the hasNextPage Method
	describe('hasNextPage', () => {
		// Describe the hasNextPage Method
		it('should return true if there is a next page', async () => {
			// Get the Last Updated Time
			const lastUpdatedTime = new Date('2024-01-08');

			// Get the List of Customers in that date range for the mock data
			const customersInDateRange = mockCustomerData.filter((customer) => {
				// Check if the last updated date is invalid
				if (!customer.MetaData?.LastUpdatedTime) return false;

				// Get the Customer Date
				const customerDate = new Date(customer.MetaData.LastUpdatedTime);
				// Return the Customer if it is in the date range
				return customerDate > lastUpdatedTime;
			});

			// Setup the Customer Query Response
			const customerQueryResponse: { QueryResponse: CustomerQueryResponse } = {
				QueryResponse: {
					Customer: customersInDateRange,
					maxResults: customersInDateRange.length,
					startPosition: 1,
					totalCount: customersInDateRange.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(customerQueryResponse));

			// Get the Customers
			const searchResponse = await apiClient.customers.getAllCustomers();

			// Assert the Customers
			expect(searchResponse.hasNextPage).toBe(true);

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');
		});
	});

	// Describe the getCustomersForDateRange Method
	describe('getCustomersForDateRange', () => {
		// Describe the getCustomersForDateRange Method
		it('should fetch customers within date range', async () => {
			// Set the start Date
			const startDate = new Date('2021-01-09');

			// Set the end Date
			const endDate = new Date('2023-05-29');

			// Get the List of Customers in that date range for the mock data
			const customersInDateRange = mockCustomerData.filter((customer) => {
				// Get the Customer Date
				const customerDate = new Date(customer.MetaData!.LastUpdatedTime!);

				// Return the Customer if it is in the date range
				return customerDate >= startDate && customerDate <= endDate;
			});

			// Setup the Customer Query Response
			const customerQueryResponse: { QueryResponse: CustomerQueryResponse } = {
				QueryResponse: {
					Customer: customersInDateRange,
					maxResults: mockCustomerData.length,
					startPosition: 1,
					totalCount: mockCustomerData.length,
				},
			};

			// Mock response with proper structure
			global.fetch = mockFetch(JSON.stringify(customerQueryResponse));

			// Get the Customers
			const searchResponse = await apiClient.customers.getCustomersForDateRange(startDate, endDate);
			// Assert the Customers
			expect(searchResponse.results).toBeArray();

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');

			// Assert the Customers Length
			expect(searchResponse.results.length).toBe(customersInDateRange.length);

			// Assert the Customers
			expect(searchResponse.results[0].Id).toBe(customersInDateRange[0].Id);
		});
	});

	// Describe the getCustomerById Method
	describe('getCustomerById', () => {
		// Describe the getCustomerById Method
		it('should fetch single customer by ID', async () => {
			// Get the Test Customer
			const testCustomer = mockCustomerData[0];

			// Setup the Customer Query Response
			const customerQueryResponse: { QueryResponse: CustomerQueryResponse } = {
				QueryResponse: {
					Customer: [testCustomer],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};

			// Mock single customer response structure
			global.fetch = mockFetch(JSON.stringify(customerQueryResponse));

			// Get the Customer
			const customerResponse = await apiClient.customers.getCustomerById(testCustomer.Id);
			// Assert the Customer Response Structure
			expect(customerResponse).toBeObject();
			expect(customerResponse).toHaveProperty('customer');
			expect(customerResponse).toHaveProperty('intuitTID');
			expect(typeof customerResponse.intuitTID).toBe('string');
			expect(customerResponse.intuitTID).toBe('test-tid-12345-67890');
			// Assert the Customer
			expect(customerResponse.customer?.Id).toBe(testCustomer.Id);
		});

		// Describe the getCustomerById Method
		it('should throw error for invalid customer ID', async () => {
			// Mock empty response with 400 status
			global.fetch = mockFetch(
				JSON.stringify({
					QueryResponse: {},
					fault: { error: [{ message: 'Customer not found' }] },
				}),
				400,
			);

			// Assert the Customer
			expect(apiClient.customers.getCustomerById('invalid')).rejects.toThrow('Failed to run request');
		});
	});

	// Describe the getAllCustomers Method
	describe('getAllCustomers', () => {
		// Describe the getAllCustomers Method
		it('should fetch all customers', async () => {
			// Setup the Customer Query Response
			const customerQueryResponse: { QueryResponse: CustomerQueryResponse } = {
				QueryResponse: {
					Customer: mockCustomerData,
					maxResults: mockCustomerData.length,
					startPosition: 1,
					totalCount: mockCustomerData.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(customerQueryResponse));

			// Get the Customers
			const searchResponse = await apiClient.customers.getAllCustomers();

			// Assert the Customers
			expect(searchResponse.results).toBeArray();

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');

			// Assert the Customers Length
			expect(searchResponse.results.length).toBe(mockCustomerData.length);

			// Assert the Customers
			expect(searchResponse.results[0].Id).toBe(mockCustomerData[0].Id);
		});
	});

	// Describe the getUpdatedCustomers Method
	describe('getUpdatedCustomers', () => {
		// Get the Last Updated Time
		const lastUpdatedTime = new Date('2021-01-08');
		// Describe the getUpdatedCustomers Method
		it('should fetch updated customers', async () => {
			// Get the List of Customers in that date range for the mock data
			const customersInDateRange = mockCustomerData.filter((customer) => {
				// Check if the last updated date is invalid
				if (!customer.MetaData?.LastUpdatedTime) return false;

				// Get the Customer Date
				const customerDate = new Date(customer.MetaData.LastUpdatedTime);
				// Return the Customer if it is in the date range
				return customerDate > lastUpdatedTime;
			});

			// Setup the Customer Query Response
			const customerQueryResponse: { QueryResponse: CustomerQueryResponse } = {
				QueryResponse: {
					Customer: customersInDateRange,
					maxResults: customersInDateRange.length,
					startPosition: 1,
					totalCount: customersInDateRange.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(customerQueryResponse));

			// Get the Customers
			const searchResponse = await apiClient.customers.getUpdatedCustomers(lastUpdatedTime);

			// Assert the Customers
			expect(searchResponse.results).toBeArray();

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');
			// Assert the Customers Length
			expect(searchResponse.results.length).toBe(customersInDateRange.length);

			// Assert the Customers
			expect(searchResponse.results[0].Id).toBe(customersInDateRange[0].Id);
		});

		// Describe the getUpdatedCustomers Method
		it('should return an empty array if no customers are updated', async () => {
			// Setup the Customer Query Response
			const customerQueryResponse: { QueryResponse: {}; time: string } = {
				QueryResponse: {},
				time: '2025-03-04T05:46:36.933-08:00',
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(customerQueryResponse));

			// Get the Customers
			const searchResponse = await apiClient.customers.getUpdatedCustomers(new Date(new Date().getTime() + 68400000));

			// Assert the Customers
			expect(searchResponse.results).toBeArray();

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');

			// Assert the Customers Length
			expect(searchResponse.results.length).toBe(0);
		});
	});
});
