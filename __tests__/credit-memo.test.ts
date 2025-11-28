import { ApiClient } from '../src/app';
import { AuthProvider, Environment, AuthScopes, type CreditMemoQueryResponse } from '../src/app';
import { describe, expect, it, beforeEach, afterEach } from 'bun:test';
import { mockFetch, mockCreditMemoData, mockTokenData } from './helpers';

// Mock configuration
const TEST_CONFIG = {
	clientId: 'test_client_id',
	clientSecret: 'test_client_secret',
	redirectUri: 'http://localhost:3000/auth-code',
	scopes: [AuthScopes.Accounting],
};

// Describe the CreditMemo API
describe('CreditMemo API', () => {
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

	// Describe the getAllCreditMemos Method
	describe('getAllCreditMemos', () => {
		// Describe the getAllCreditMemos Method
		it('should fetch all credit memos', async () => {
			// Setup the CreditMemo Query Response
			const creditMemoQueryResponse: { QueryResponse: CreditMemoQueryResponse } = {
				QueryResponse: {
					CreditMemo: mockCreditMemoData,
					maxResults: mockCreditMemoData.length,
					startPosition: 1,
					totalCount: mockCreditMemoData.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(creditMemoQueryResponse));

			// Get the CreditMemos
			const searchResponse = await apiClient.creditMemos.getAllCreditMemos();

			// Assert the CreditMemos
			expect(searchResponse.results).toBeArray();

			// Assert the CreditMemos Length
			expect(searchResponse.results.length).toBe(mockCreditMemoData.length);

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');

			// Assert the CreditMemos
			expect(searchResponse.results[0].Id).toBe(mockCreditMemoData[0].Id);
		});
	});

	// Describe the hasNextPage Method
	describe('hasNextPage', () => {
		// Describe the hasNextPage Method
		it('should return true if there is a next page', async () => {
			// Setup the CreditMemo Query Response
			const creditMemoQueryResponse: { QueryResponse: CreditMemoQueryResponse } = {
				QueryResponse: {
					CreditMemo: mockCreditMemoData,
					maxResults: mockCreditMemoData.length,
					startPosition: 1,
					totalCount: mockCreditMemoData.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(creditMemoQueryResponse));

			// Get the CreditMemos
			const searchResponse = await apiClient.creditMemos.getAllCreditMemos();

			// Assert the CreditMemos
			expect(searchResponse.hasNextPage).toBe(true);

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');
		});
	});

	// Describe the getCreditMemoById Method
	describe('getCreditMemoById', () => {
		// Describe the getCreditMemoById Method
		it('should fetch single credit memo by ID', async () => {
			// Get the Test CreditMemo
			const testCreditMemo = mockCreditMemoData[0];

			// Setup the CreditMemo Query Response
			const creditMemoQueryResponse: { QueryResponse: CreditMemoQueryResponse } = {
				QueryResponse: {
					CreditMemo: [testCreditMemo],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};

			// Mock single credit memo response structure
			global.fetch = mockFetch(JSON.stringify(creditMemoQueryResponse));

			// Get the CreditMemo
			const creditMemoResponse = await apiClient.creditMemos.getCreditMemoById(testCreditMemo.Id);

			// Assert the CreditMemo Response Structure
			expect(creditMemoResponse).toBeObject();
			expect(creditMemoResponse).toHaveProperty('creditMemo');
			expect(creditMemoResponse).toHaveProperty('intuitTID');
			expect(typeof creditMemoResponse.intuitTID).toBe('string');
			expect(creditMemoResponse.intuitTID).toBe('test-tid-12345-67890');

			// Assert the CreditMemo
			expect(creditMemoResponse.creditMemo?.Id).toBe(testCreditMemo.Id);
		});

		// Describe the getCreditMemoById Method
		it('should throw error for invalid credit memo ID', async () => {
			// Mock empty response with 400 status
			global.fetch = mockFetch(
				JSON.stringify({
					QueryResponse: {},
					fault: { error: [{ message: 'CreditMemo not found' }] },
				}),
				400,
			);

			// Assert the CreditMemo
			expect(apiClient.creditMemos.getCreditMemoById('invalid')).rejects.toThrow('Failed to run request');
		});
	});

	// Describe the getCreditMemosForDateRange Method
	describe('getCreditMemosForDateRange', () => {
		// Describe the getCreditMemosForDateRange Method
		it('should fetch credit memos within date range', async () => {
			// Set the start Date
			const startDate = new Date('2020-01-09');

			// Set the end Date
			const endDate = new Date('2022-01-12');

			// Get the List of CreditMemos in that date range for the mock data
			const creditMemosInDateRange = mockCreditMemoData.filter((creditMemo) => {
				// Get the CreditMemo Date
				const creditMemoDate = new Date(creditMemo.MetaData!.LastUpdatedTime!);
				// Return the CreditMemo if it is in the date range
				return creditMemoDate >= startDate && creditMemoDate <= endDate;
			});

			// Setup the CreditMemo Query Response
			const creditMemoQueryResponse: { QueryResponse: CreditMemoQueryResponse } = {
				QueryResponse: {
					CreditMemo: creditMemosInDateRange,
					maxResults: creditMemosInDateRange.length,
					startPosition: 1,
					totalCount: creditMemosInDateRange.length,
				},
			};

			// Mock response with proper structure
			global.fetch = mockFetch(JSON.stringify(creditMemoQueryResponse));

			// Get the CreditMemos
			const searchResponse = await apiClient.creditMemos.getCreditMemosForDateRange(startDate, endDate);
			// Assert the CreditMemos
			expect(searchResponse.results).toBeArray();

			// Assert the CreditMemos Length
			expect(searchResponse.results.length).toBe(creditMemosInDateRange.length);

			// Assert the CreditMemos
			expect(searchResponse.results[0].Id).toBe(creditMemosInDateRange[0].Id);

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');
		});
	});

	// Describe the getUpdatedCreditMemos Method
	describe('getUpdatedCreditMemos', () => {
		// Describe the getUpdatedCreditMemos Method
		it('should fetch updated credit memos', async () => {
			// Get the Last Updated Time
			const lastUpdatedTime = new Date('2025-01-09');

			// Get the List of CreditMemos in that date range for the mock data
			const creditMemosInDateRange = mockCreditMemoData.filter((creditMemo) => {
				// Check if the last updated date is invalid
				if (!creditMemo.MetaData?.LastUpdatedTime) return false;

				// Get the CreditMemo Date
				const creditMemoDate = new Date(creditMemo.MetaData.LastUpdatedTime);

				// Return the CreditMemo if it is in the date range
				return creditMemoDate >= lastUpdatedTime;
			});
			// Setup the CreditMemo Query Response
			const creditMemoQueryResponse: { QueryResponse: CreditMemoQueryResponse } = {
				QueryResponse: {
					CreditMemo: creditMemosInDateRange,
					maxResults: creditMemosInDateRange.length,
					startPosition: 1,
					totalCount: creditMemosInDateRange.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(creditMemoQueryResponse));

			// Get the CreditMemos
			const searchResponse = await apiClient.creditMemos.getUpdatedCreditMemos(lastUpdatedTime);

			// Assert the CreditMemos
			expect(searchResponse.results).toBeArray();

			// Assert the CreditMemos Length
			expect(searchResponse.results.length).toBe(creditMemosInDateRange.length);

			// Assert the CreditMemos
			expect(searchResponse.results[0].Id).toBe(creditMemosInDateRange[0].Id);

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');
		});

		// Describe the getUpdatedCreditMemos Method
		it('should return an empty array if no credit memos are updated', async () => {
			// Setup the CreditMemo Query Response
			const creditMemoQueryResponse: { QueryResponse: {}; time: string } = {
				QueryResponse: {},
				time: '2025-03-04T05:46:36.933-08:00',
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(creditMemoQueryResponse));

			// Get the CreditMemos
			const searchResponse = await apiClient.creditMemos.getUpdatedCreditMemos(new Date(new Date().getTime() + 68400000));

			// Assert the CreditMemos
			expect(searchResponse.results).toBeArray();

			// Assert the CreditMemos Length
			expect(searchResponse.results.length).toBe(0);

			// Assert the Intuit TID
			expect(searchResponse.intuitTID).toBeDefined();
			expect(typeof searchResponse.intuitTID).toBe('string');
			expect(searchResponse.intuitTID).toBe('test-tid-12345-67890');
		});
	});
});
