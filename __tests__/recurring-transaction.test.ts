import { ApiClient } from '../src/app';
import { AuthProvider, Environment, AuthScopes, RecurringTransaction } from '../src/app';
import { describe, expect, it, beforeEach, afterEach } from 'bun:test';
import { mockFetch, mockRecurringTransactionData, mockTokenData } from './helpers';

// Mock configuration
const TEST_CONFIG = {
	clientId: 'test_client_id',
	clientSecret: 'test_client_secret',
	redirectUri: 'http://localhost:3000/auth-code',
	scopes: [AuthScopes.Accounting],
};

describe('RecurringTransaction API', () => {
	let apiClient: ApiClient;
	let globalFetch: typeof fetch;

	beforeEach(async () => {
		globalFetch = global.fetch;
		const authProvider = new AuthProvider(TEST_CONFIG.clientId, TEST_CONFIG.clientSecret, TEST_CONFIG.redirectUri, TEST_CONFIG.scopes);
		await authProvider.setToken(mockTokenData);
		apiClient = new ApiClient(authProvider, Environment.Sandbox);
	});

	afterEach(() => {
		global.fetch = globalFetch;
	});

	describe('getAllRecurringTransactions', () => {
		it('should fetch all recurring transactions', async () => {
			const queryResponse = {
				QueryResponse: {
					RecurringTransaction: mockRecurringTransactionData,
					maxResults: mockRecurringTransactionData.length,
					startPosition: 1,
					totalCount: mockRecurringTransactionData.length,
				},
			};

			global.fetch = mockFetch(JSON.stringify(queryResponse));

			const searchResponse = await apiClient.recurringTransactions.getAllRecurringTransactions();

			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(mockRecurringTransactionData.length);
			searchResponse.results.forEach((rt, index) => {
				expect(rt.Id).toBe(mockRecurringTransactionData[index].Id);
			});
		});

		it('should handle search options', async () => {
			const subset = mockRecurringTransactionData.slice(0, 2);
			const queryResponse = {
				QueryResponse: {
					RecurringTransaction: subset,
					maxResults: 2,
					startPosition: 1,
					totalCount: subset.length,
				},
			};

			global.fetch = mockFetch(JSON.stringify(queryResponse));

			const searchResponse = await apiClient.recurringTransactions.getAllRecurringTransactions({
				searchOptions: { maxResults: 2, page: 1 },
			});

			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(2);
		});
	});

	describe('getRecurringTransactionById', () => {
		it('should fetch recurring transaction by ID', async () => {
			const testRT = mockRecurringTransactionData[0];
			const queryResponse = {
				QueryResponse: {
					RecurringTransaction: [testRT],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};

			global.fetch = mockFetch(JSON.stringify(queryResponse));

			const result = await apiClient.recurringTransactions.getRecurringTransactionById(testRT.Id!);

			expect(result).toBeObject();
			expect(result).toHaveProperty('recurringTransaction');
			expect(result).toHaveProperty('intuitTID');
			expect(typeof result.intuitTID).toBe('string');
			expect(result.intuitTID).toBe('test-tid-12345-67890');
			expect(result.recurringTransaction).toBeObject();
			expect(result.recurringTransaction?.Id).toBe(testRT.Id);

			if (result.recurringTransaction) {
				expect(result.recurringTransaction).toBeInstanceOf(RecurringTransaction);
				expect(typeof result.recurringTransaction.setApiClient).toBe('function');
				expect(typeof result.recurringTransaction.reload).toBe('function');
				expect(typeof result.recurringTransaction.save).toBe('function');
				expect(typeof result.recurringTransaction.delete).toBe('function');
			}
		});

		it('should throw error for invalid recurring transaction ID', async () => {
			global.fetch = mockFetch(
				JSON.stringify({
					QueryResponse: {},
					fault: { error: [{ message: 'RecurringTransaction not found' }] },
				}),
				400,
			);

			expect(apiClient.recurringTransactions.getRecurringTransactionById('-1')).rejects.toThrow('Failed to run request');
		});
	});

	describe('getUpdatedRecurringTransactions', () => {
		it('should fetch updated recurring transactions', async () => {
			const lastUpdatedTime = new Date('2024-06-01');

			const updated = mockRecurringTransactionData.filter((rt) => {
				if (!rt.MetaData?.LastUpdatedTime) return false;
				const rtDate = new Date(rt.MetaData.LastUpdatedTime);
				return rtDate >= lastUpdatedTime;
			});

			const queryResponse = {
				QueryResponse: {
					RecurringTransaction: updated,
					maxResults: updated.length,
					startPosition: 1,
					totalCount: updated.length,
				},
			};

			global.fetch = mockFetch(JSON.stringify(queryResponse));

			const searchResponse = await apiClient.recurringTransactions.getUpdatedRecurringTransactions(lastUpdatedTime);

			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(updated.length);
		});
	});

	describe('rawRecurringTransactionQuery', () => {
		it('should execute raw query', async () => {
			const queryResponse = {
				QueryResponse: {
					RecurringTransaction: mockRecurringTransactionData,
					maxResults: mockRecurringTransactionData.length,
					startPosition: 1,
					totalCount: mockRecurringTransactionData.length,
				},
			};

			global.fetch = mockFetch(JSON.stringify(queryResponse));

			const queryBuilder = await apiClient.recurringTransactions.getQueryBuilder();
			const searchResponse = await apiClient.recurringTransactions.rawRecurringTransactionQuery(queryBuilder);

			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(mockRecurringTransactionData.length);
			expect(searchResponse.results[0].Id).toBe(mockRecurringTransactionData[0].Id);
		});
	});

	describe('RecurringTransaction Class', () => {
		afterEach(() => {
			global.fetch = globalFetch;
		});

		it('should return RecurringTransaction class instance with correct properties', async () => {
			const testRT = mockRecurringTransactionData[0];
			const queryResponse = {
				QueryResponse: {
					RecurringTransaction: [testRT],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};
			global.fetch = mockFetch(JSON.stringify(queryResponse));

			const result = await apiClient.recurringTransactions.getRecurringTransactionById(testRT.Id!);

			expect(result.recurringTransaction).toBeInstanceOf(RecurringTransaction);
			expect(result.recurringTransaction?.RecurringInfo.Name).toBe('Monthly HOA Invoice - Unit 2A');
			expect(result.recurringTransaction?.RecurringInfo.RecurType).toBe('Automated');
			expect(result.recurringTransaction?.RecurringInfo.ScheduleInfo.IntervalType).toBe('Monthly');
			expect(result.recurringTransaction?.Invoice?.CustomerRef.value).toBe('QBO-CUST-001');
		});

		it('should save recurring transaction', async () => {
			const testRT = mockRecurringTransactionData[0];
			const queryResponse = {
				QueryResponse: {
					RecurringTransaction: [testRT],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};
			global.fetch = mockFetch(JSON.stringify(queryResponse));

			const result = await apiClient.recurringTransactions.getRecurringTransactionById(testRT.Id!);
			const rt = result.recurringTransaction!;

			rt.RecurringInfo.Name = 'Updated Template Name';

			const saveResponse = { RecurringTransaction: { ...testRT, RecurringInfo: { ...testRT.RecurringInfo, Name: 'Updated Template Name' } } };
			global.fetch = mockFetch(JSON.stringify(saveResponse));

			await rt.save();

			expect(global.fetch).toBeDefined();
		});

		it('should delete recurring transaction', async () => {
			const testRT = mockRecurringTransactionData[0];
			const queryResponse = {
				QueryResponse: {
					RecurringTransaction: [testRT],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};
			global.fetch = mockFetch(JSON.stringify(queryResponse));

			const result = await apiClient.recurringTransactions.getRecurringTransactionById(testRT.Id!);
			const rt = result.recurringTransaction!;

			global.fetch = mockFetch(JSON.stringify({}));

			await rt.delete();

			expect(global.fetch).toBeDefined();
		});

		it('should throw error when deleting without ID', async () => {
			const testRT = mockRecurringTransactionData[0];
			const queryResponse = {
				QueryResponse: {
					RecurringTransaction: [testRT],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};
			global.fetch = mockFetch(JSON.stringify(queryResponse));

			const result = await apiClient.recurringTransactions.getRecurringTransactionById(testRT.Id!);
			const rt = result.recurringTransaction!;

			(rt as any).Id = null;

			await expect(rt.delete()).rejects.toThrow('RecurringTransaction must be saved before deleting');
		});
	});
});
