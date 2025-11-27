import { ApiClient } from '../src/app';
import { AuthProvider, Environment, AuthScopes, type BillQueryResponse } from '../src/app';
import { describe, expect, it, beforeEach, afterEach } from 'bun:test';
import { mockFetch, mockBillData, mockTokenData } from './helpers';

// Mock configuration
const TEST_CONFIG = {
	clientId: 'test_client_id',
	clientSecret: 'test_client_secret',
	redirectUri: 'http://localhost:3000/auth-code',
	scopes: [AuthScopes.Accounting],
};

// Describe the Bill API
describe('Bill API', () => {
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
		// Reset the Global Fetch
		global.fetch = globalFetch;
	});

	// Describe the getAllBills Method
	describe('getAllBills', () => {
		it('should fetch all bills', async () => {
			// Setup the Bill Query Response
			const billQueryResponse = {
				QueryResponse: {
					Bill: mockBillData,
					maxResults: mockBillData.length,
					startPosition: 1,
					totalCount: mockBillData.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(billQueryResponse));

			// Get the Bills
			const searchResponse = await apiClient.bills.getAllBills();

			// Assert the Bills
			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(mockBillData.length);
			searchResponse.results.forEach((bill, index) => {
				expect(bill.Id).toBe(mockBillData[index].Id);
			});
		});

		it('should handle search options', async () => {
			// Get a subset of bills
			const bills = mockBillData.slice(0, 10);

			// Setup the Bill Query Response
			const billQueryResponse = {
				QueryResponse: {
					Bill: bills,
					maxResults: 10,
					startPosition: 1,
					totalCount: bills.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(billQueryResponse));

			// Get the Bills with search options
			const searchResponse = await apiClient.bills.getAllBills({
				maxResults: 10,
				page: 1,
			});

			// Assert the Bills
			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(10);
		});
	});

	// Describe the getBillById Method
	describe('getBillById', () => {
		it('should fetch bills by their IDs', async () => {
			// Test each bill in mock data
			for (const bill of mockBillData) {
				// Setup the Bill Query Response
				const billQueryResponse = {
					QueryResponse: {
						Bill: [bill],
						maxResults: 1,
						startPosition: 1,
						totalCount: 1,
					},
				};

				// Mock single bill response structure
				global.fetch = mockFetch(JSON.stringify(billQueryResponse));

				// Get the Bill
				const searchResponse = await apiClient.bills.getBillById(bill.Id);

				// Assert the Bill
				expect(searchResponse).toBeObject();
				expect(searchResponse.Id).toBe(bill.Id);
			}
		});

		it('should throw error for invalid bill ID', async () => {
			// Mock empty response with 400 status
			global.fetch = mockFetch(
				JSON.stringify({
					QueryResponse: {},
					fault: { error: [{ message: 'Bill not found' }] },
				}),
				400,
			);

			// Assert the Error
			expect(apiClient.bills.getBillById('-1')).rejects.toThrow('Failed to run request');
		});
	});

	// Describe the getBillsForDateRange Method
	describe('getBillsForDateRange', () => {
		it('should fetch bills within date range', async () => {
			// Set the start Date
			const startDate = new Date('2020-01-09');

			// Set the end Date
			const endDate = new Date('2025-01-12');

			// Get the List of Bills in that date range for the mock data
			const billsInDateRange = mockBillData.filter((bill) => {
				if (!bill.MetaData?.LastUpdatedTime) return false;
				const billDate = new Date(bill.MetaData.LastUpdatedTime);
				return billDate >= startDate && billDate <= endDate;
			});

			// Setup the Bill Query Response
			const billQueryResponse = {
				QueryResponse: {
					Bill: billsInDateRange,
					maxResults: billsInDateRange.length,
					startPosition: 1,
					totalCount: billsInDateRange.length,
				},
			};

			// Mock response with proper structure
			global.fetch = mockFetch(JSON.stringify(billQueryResponse));

			// Get the Bills
			const searchResponse = await apiClient.bills.getBillsForDateRange(startDate, endDate);

			// Assert the Bills
			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(billsInDateRange.length);
			expect(searchResponse.results[0].Id).toBe(billsInDateRange[0].Id);
		});
	});

	// Describe the getUpdatedBills Method
	describe('getUpdatedBills', () => {
		it('should fetch updated bills', async () => {
			// Get the Last Updated Time
			const lastUpdatedTime = new Date('2024-01-09');

			// Get the List of Updated Bills from mock data
			const updatedBills = mockBillData.filter((bill) => {
				if (!bill.MetaData?.LastUpdatedTime) return false;
				const billDate = new Date(bill.MetaData.LastUpdatedTime);
				return billDate >= lastUpdatedTime;
			});

			// Setup the Bill Query Response
			const billQueryResponse = {
				QueryResponse: {
					Bill: updatedBills,
					maxResults: updatedBills.length,
					startPosition: 1,
					totalCount: updatedBills.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(billQueryResponse));

			// Get the Bills
			const searchResponse = await apiClient.bills.getUpdatedBills(lastUpdatedTime);

			// Assert the Bills
			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(updatedBills.length);
			expect(searchResponse.results[0].Id).toBe(updatedBills[0].Id);
		});
	});

	// Describe the rawBillQuery Method
	describe('rawBillQuery', () => {
		it('should execute raw bill query', async () => {
			// Setup the Bill Query Response
			const billQueryResponse = {
				QueryResponse: {
					Bill: mockBillData,
					maxResults: mockBillData.length,
					startPosition: 1,
					totalCount: mockBillData.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(billQueryResponse));

			// Get the Query Builder
			const queryBuilder = await apiClient.bills.getQueryBuilder();

			// Execute Raw Query
			const searchResponse = await apiClient.bills.rawBillQuery(queryBuilder);

			// Assert the Bills
			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(mockBillData.length);
			expect(searchResponse.results[0].Id).toBe(mockBillData[0].Id);
		});
	});
});
