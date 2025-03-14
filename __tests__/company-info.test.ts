import { ApiClient } from '../src/app';
import { AuthProvider, Environment, AuthScopes, type CompanyInfoQueryResponse } from '../src/app';
import { describe, expect, it, beforeEach, afterEach } from 'bun:test';
import { mockFetch, mockTokenData } from './helpers';
import { mockCompanyInfoData } from './__mocks__/company-info-data';

// Mock configuration
const TEST_CONFIG = {
	clientId: 'test_client_id',
	clientSecret: 'test_client_secret',
	redirectUri: 'http://localhost:3000/auth-code',
	scopes: [AuthScopes.Accounting],
};

// Describe the Company Info API
describe('Company Info API', () => {
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

	// Describe the getCompanyInfo Method
	describe('getCompanyInfo', () => {
		// After Each
		afterEach(() => {
			// Set the Global Fetch
			global.fetch = globalFetch;
		});

		// Test fetching company info
		it('should fetch company info', async () => {
			// Setup the Company Info Query Response
			const companyInfoQueryResponse = {
				QueryResponse: {
					CompanyInfo: [mockCompanyInfoData],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(companyInfoQueryResponse));

			// Get the Company Info
			const companyInfo = await apiClient.companyInfo.getCompanyInfo();

			// Assert the Company Info
			expect(companyInfo).toBeObject();
			expect(companyInfo.Id).toBe(mockCompanyInfoData.Id);
			expect(companyInfo.CompanyName).toBe(mockCompanyInfoData.CompanyName);
			expect(companyInfo.LegalName).toBe(mockCompanyInfoData.LegalName);
			expect(companyInfo.Email.Address).toBe(mockCompanyInfoData.Email.Address);
			expect(companyInfo.PrimaryPhone.FreeFormNumber).toBe(mockCompanyInfoData.PrimaryPhone.FreeFormNumber);
		});

		// Test handling search options
		it('should handle search options', async () => {
			// Setup the Company Info Query Response
			const companyInfoQueryResponse = {
				QueryResponse: {
					CompanyInfo: [mockCompanyInfoData],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(companyInfoQueryResponse));

			// Get the Company Info with search options
			const companyInfo = await apiClient.companyInfo.getCompanyInfo({
				maxResults: 1,
				page: 1,
			});

			// Assert the Company Info
			expect(companyInfo).toBeObject();
			expect(companyInfo.Id).toBe(mockCompanyInfoData.Id);
		});

		// Test error handling when no company info is found
		it('should throw error when no company info is found', async () => {
			// Setup the Company Info Query Response with empty CompanyInfo array
			const companyInfoQueryResponse = {
				QueryResponse: {
					CompanyInfo: [],
					maxResults: 0,
					startPosition: 1,
					totalCount: 0,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(companyInfoQueryResponse));

			// Assert the Error
			await expect(apiClient.companyInfo.getCompanyInfo()).rejects.toThrow('No Company Info found');
		});

		// Test error handling for invalid response
		it('should throw error for invalid response', async () => {
			// Mock empty response with 400 status
			global.fetch = mockFetch(
				JSON.stringify({
					fault: { error: [{ message: 'Invalid Response' }] },
				}),
				400,
			);

			// Assert the Error
			await expect(apiClient.companyInfo.getCompanyInfo()).rejects.toThrow('Failed to run request');
		});
	});

	// Describe the rawCompanyInfoQuery Method
	describe('rawCompanyInfoQuery', () => {
		it('should execute raw company info query', async () => {
			// Setup the Company Info Query Response
			const companyInfoQueryResponse = {
				QueryResponse: {
					CompanyInfo: [mockCompanyInfoData],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(companyInfoQueryResponse));

			// Execute Raw Query
			const companyInfo = await apiClient.companyInfo.rawCompanyInfoQuery('select * from companyinfo');

			// Assert the Company Info
			expect(companyInfo).toBeObject();
			expect(companyInfo.Id).toBe(mockCompanyInfoData.Id);
			expect(companyInfo.CompanyName).toBe(mockCompanyInfoData.CompanyName);
		});

		// Test error handling for raw query
		it('should throw error for invalid raw query', async () => {
			// Mock empty response with 400 status
			global.fetch = mockFetch(
				JSON.stringify({
					fault: { error: [{ message: 'Invalid Query' }] },
				}),
				400,
			);

			// Assert the Error
			await expect(apiClient.companyInfo.rawCompanyInfoQuery('invalid query')).rejects.toThrow('Failed to run request');
		});
	});
}); 