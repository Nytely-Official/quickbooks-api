import { ApiClient } from '../src/app';
import { AuthProvider, Environment, AuthScopes, type AccountQueryResponse } from '../src/app';
import { describe, expect, it, beforeEach, afterEach } from 'bun:test';
import { mockFetch, mockAccountData, mockTokenData } from './helpers';

// Mock configuration
const TEST_CONFIG = {
	clientId: 'test_client_id',
	clientSecret: 'test_client_secret',
	redirectUri: 'http://localhost:3000/auth-code',
	scopes: [AuthScopes.Accounting],
};

// Describe the Account API
describe('Account API', () => {
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

	// Describe the getAllAccounts Method
	describe('getAllAccounts', () => {
		// After Each
		afterEach(() => {
			// Set the Global Fetch
			global.fetch = globalFetch;
		});

		// Test handling search options
		it('should handle search options', async () => {
			// Get a subset of accounts
			const accounts = mockAccountData.slice(0, 10);

			// Setup the Account Query Response
			const accountQueryResponse = {
				QueryResponse: {
					Account: accounts,
					maxResults: 10,
					startPosition: 1,
					totalCount: accounts.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(accountQueryResponse));

			// Get the Accounts with search options
			const searchResponse = await apiClient.accounts.getAllAccounts({
				maxResults: 10,
				page: 1,
			});

			// Assert the Accounts
			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(10);
		});

		// Test fetching all accounts
		it('should fetch all accounts', async () => {
			// Setup the Account Query Response
			const accountQueryResponse = {
				QueryResponse: {
					Account: mockAccountData,
					maxResults: mockAccountData.length,
					startPosition: 1,
					totalCount: mockAccountData.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(accountQueryResponse));

			// Get the Accounts
			const searchResponse = await apiClient.accounts.getAllAccounts();

			// Assert the Accounts
			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(mockAccountData.length);
			searchResponse.results.forEach((account, index) => {
				expect(account.Id).toBe(mockAccountData[index].Id);
			});
		});
	});

	// Describe the hasNextPage Method
	describe('hasNextPage', () => {
		it('should return true if there is a next page', async () => {
			// Setup the Account Query Response
			const accountQueryResponse = {
				QueryResponse: {
					Account: mockAccountData,
					maxResults: mockAccountData.length,
					startPosition: 1,
					totalCount: mockAccountData.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(accountQueryResponse));

			// Get the Accounts
			const searchResponse = await apiClient.accounts.getAllAccounts();

			// Assert the Next Page
			expect(searchResponse.hasNextPage).toBe(true);
		});
	});

	// Describe the getAccountById Method
	describe('getAccountById', () => {
		// After Each
		afterEach(() => {
			// Set the Global Fetch
			global.fetch = globalFetch;
		});

		it('should fetch accounts by their IDs', async () => {
			// Test each account in mock data
			for (const account of mockAccountData) {
				// Setup the Account Query Response
				const accountQueryResponse = {
					QueryResponse: {
						Account: [account],
						maxResults: 1,
						startPosition: 1,
						totalCount: 1,
					},
				};

				// Mock single account response structure
				global.fetch = mockFetch(JSON.stringify(accountQueryResponse));

				// Get the Account
				const searchResponse = await apiClient.accounts.getAccountById(account.Id);

				// Assert the Account
				expect(searchResponse).toBeObject();
				expect(searchResponse.Id).toBe(account.Id);
			}
		});

		it('should throw error for invalid account ID', async () => {
			// Mock empty response with 400 status
			global.fetch = mockFetch(
				JSON.stringify({
					QueryResponse: {},
					fault: { error: [{ message: 'Account not found' }] },
				}),
				400,
			);

			// Assert the Error
			expect(apiClient.accounts.getAccountById('-1')).rejects.toThrow('Account not found');
		});
	});

	// Describe the getAccountsForDateRange Method
	describe('getAccountsForDateRange', () => {
		it('should fetch accounts within date range', async () => {
			// Set the start Date
			const startDate = new Date('2020-01-09');

			// Set the end Date
			const endDate = new Date('2025-01-12');

			// Get the List of Accounts in that date range for the mock data
			const accountsInDateRange = mockAccountData.filter((account) => {
				// Skip if no metadata
				if (!account.MetaData?.LastUpdatedTime) return false;
				const accountDate = new Date(account.MetaData.LastUpdatedTime);
				return accountDate >= startDate && accountDate <= endDate;
			});

			// Setup the Account Query Response
			const accountQueryResponse = {
				QueryResponse: {
					Account: accountsInDateRange,
					maxResults: accountsInDateRange.length,
					startPosition: 1,
					totalCount: accountsInDateRange.length,
				},
			};

			// Mock response with proper structure
			global.fetch = mockFetch(JSON.stringify(accountQueryResponse));

			// Get the Accounts
			const searchResponse = await apiClient.accounts.getAccountsForDateRange(startDate, endDate);

			// Assert the Accounts
			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(accountsInDateRange.length);
			expect(searchResponse.results[0].Id).toBe(accountsInDateRange[0].Id);
		});
	});

	// Describe the getUpdatedAccounts Method
	describe('getUpdatedAccounts', () => {
		it('should fetch updated accounts', async () => {
			// Get the Last Updated Time
			const lastUpdatedTime = new Date('2024-01-09');

			// Get the List of Updated Accounts from mock data
			const updatedAccounts = mockAccountData.filter((account) => {
				// Skip if no metadata
				if (!account.MetaData?.LastUpdatedTime) return false;
				const accountDate = new Date(account.MetaData.LastUpdatedTime);
				return accountDate >= lastUpdatedTime;
			});

			// Setup the Account Query Response
			const accountQueryResponse = {
				QueryResponse: {
					Account: updatedAccounts,
					maxResults: updatedAccounts.length,
					startPosition: 1,
					totalCount: updatedAccounts.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(accountQueryResponse));

			// Get the Accounts
			const searchResponse = await apiClient.accounts.getUpdatedAccounts(lastUpdatedTime);

			// Assert the Accounts
			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(updatedAccounts.length);
			expect(searchResponse.results[0].Id).toBe(updatedAccounts[0].Id);
		});
	});

	// Describe the rawAccountQuery Method
	describe('rawAccountQuery', () => {
		it('should execute raw account query', async () => {
			// Setup the Account Query Response
			const accountQueryResponse = {
				QueryResponse: {
					Account: mockAccountData,
					maxResults: mockAccountData.length,
					startPosition: 1,
					totalCount: mockAccountData.length,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(accountQueryResponse));

			// Get the Query Builder
			const queryBuilder = await apiClient.accounts.getQueryBuilder();

			// Execute Raw Query
			const searchResponse = await apiClient.accounts.rawAccountQuery(queryBuilder);

			// Assert the Accounts
			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(mockAccountData.length);
			expect(searchResponse.results[0].Id).toBe(mockAccountData[0].Id);
		});
	});
});
