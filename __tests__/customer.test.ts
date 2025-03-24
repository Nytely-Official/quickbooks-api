import { ApiClient, CustomerQueryResponse } from '../src/app';
import { AuthProvider, Environment, AuthScopes } from '../src/app';
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

		const customerQueryResponse: { QueryResponse: CustomerQueryResponse } = {
			QueryResponse: {
				Customer: mockCustomerData,
				maxResults: 0, // havent done this yet
				startPosition: 0, // havent done this yet
				totalCount: 0, // havent done this yet
			}
		}

		global.fetch = mockFetch(JSON.stringify(customerQueryResponse));

		// Describe the hasNextPage Method
		it('should return true if there is a next page', async () => {
			// Get the Last Updated Time
			const customers = await apiClient.customers.query.select({
				id: 'Id',
				name: 'DisplayName',
				balance: 'Balance',
			}).where('Active', 'eq', false).orderBy('Balance', 'desc').limit(10);

			console.log(customers);
		});
	});
});
