import { ApiClient } from '../src/app';
import { AuthProvider, Environment, AuthScopes, type CompanyInfoQueryResponse, CompanyInfo } from '../src/app';
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
			const companyInfoResponse = await apiClient.companyInfo.getCompanyInfo();

			// Assert the Company Info Response Structure
			expect(companyInfoResponse).toBeObject();
			expect(companyInfoResponse).toHaveProperty('companyInfo');
			expect(companyInfoResponse).toHaveProperty('intuitTID');
			expect(typeof companyInfoResponse.intuitTID).toBe('string');
			expect(companyInfoResponse.intuitTID).toBe('test-tid-12345-67890');

			// Assert the Company Info
			expect(companyInfoResponse.companyInfo.Id).toBe(mockCompanyInfoData.Id);
			expect(companyInfoResponse.companyInfo.CompanyName).toBe(mockCompanyInfoData.CompanyName);
			expect(companyInfoResponse.companyInfo.LegalName).toBe(mockCompanyInfoData.LegalName);
			expect(companyInfoResponse.companyInfo.Email.Address).toBe(mockCompanyInfoData.Email.Address);
			expect(companyInfoResponse.companyInfo.PrimaryPhone.FreeFormNumber).toBe(mockCompanyInfoData.PrimaryPhone.FreeFormNumber);
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
			const companyInfoResponse = await apiClient.companyInfo.getCompanyInfo({
				maxResults: 1,
				page: 1,
			});

			// Assert the Company Info Response Structure
			expect(companyInfoResponse).toBeObject();
			expect(companyInfoResponse).toHaveProperty('companyInfo');
			expect(companyInfoResponse).toHaveProperty('intuitTID');
			expect(typeof companyInfoResponse.intuitTID).toBe('string');
			expect(companyInfoResponse.intuitTID).toBe('test-tid-12345-67890');

			// Assert the Company Info
			expect(companyInfoResponse.companyInfo.Id).toBe(mockCompanyInfoData.Id);

			// Assert the CompanyInfo is a class instance
			if (companyInfoResponse.companyInfo) {
				expect(companyInfoResponse.companyInfo).toBeInstanceOf(CompanyInfo);
				expect(typeof companyInfoResponse.companyInfo.setApiClient).toBe('function');
				expect(typeof companyInfoResponse.companyInfo.reload).toBe('function');
			}
		});

		// Test error handling when no company info is found
		it('should return undefined when no company info is found', async () => {
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

			// Get the Company Info
			const companyInfoResponse = await apiClient.companyInfo.getCompanyInfo();

			// Assert that it returns a response with null companyInfo when no company info is found
			expect(companyInfoResponse).toBeObject();
			expect(companyInfoResponse).toHaveProperty('companyInfo');
			expect(companyInfoResponse).toHaveProperty('intuitTID');
			expect(companyInfoResponse.companyInfo).toBeUndefined();
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
			const companyInfoResponse = await apiClient.companyInfo.rawCompanyInfoQuery('select * from companyinfo');

			// Assert the Company Info Response Structure
			expect(companyInfoResponse).toBeObject();
			expect(companyInfoResponse).toHaveProperty('companyInfo');
			expect(companyInfoResponse).toHaveProperty('intuitTID');
			expect(typeof companyInfoResponse.intuitTID).toBe('string');
			expect(companyInfoResponse.intuitTID).toBe('test-tid-12345-67890');

			// Assert the Company Info
			expect(companyInfoResponse.companyInfo.Id).toBe(mockCompanyInfoData.Id);
			expect(companyInfoResponse.companyInfo.CompanyName).toBe(mockCompanyInfoData.CompanyName);
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

	// Describe the CompanyInfo Class Methods
	describe('CompanyInfo Class', () => {
		afterEach(() => {
			global.fetch = globalFetch;
		});

		it('should return CompanyInfo class instance', async () => {
			const companyInfoQueryResponse = {
				QueryResponse: {
					CompanyInfo: [mockCompanyInfoData],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};
			global.fetch = mockFetch(JSON.stringify(companyInfoQueryResponse));

			const companyInfoResponse = await apiClient.companyInfo.getCompanyInfo();

			expect(companyInfoResponse.companyInfo).toBeInstanceOf(CompanyInfo);
			expect(typeof companyInfoResponse.companyInfo?.setApiClient).toBe('function');
			expect(typeof companyInfoResponse.companyInfo?.reload).toBe('function');
		});

		it('should reload company info data', async () => {
			const initialCompanyInfo = mockCompanyInfoData;
			const updatedCompanyInfo = { ...initialCompanyInfo, CompanyName: 'Updated Company Name' };

			// Setup initial fetch
			const companyInfoQueryResponse = {
				QueryResponse: {
					CompanyInfo: [initialCompanyInfo],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};
			global.fetch = mockFetch(JSON.stringify(companyInfoQueryResponse));

			const companyInfoResponse = await apiClient.companyInfo.getCompanyInfo();
			const companyInfo = companyInfoResponse.companyInfo!;

			// Modify locally (if possible)
			(companyInfo as any).CompanyName = 'Local-Change';

			// Setup reload response
			const reloadQueryResponse = {
				QueryResponse: {
					CompanyInfo: [updatedCompanyInfo],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};
			global.fetch = mockFetch(JSON.stringify(reloadQueryResponse));

			// Reload the company info
			await companyInfo.reload();

			// Assert the company info was reloaded
			expect(companyInfo.CompanyName).toBe(updatedCompanyInfo.CompanyName);
		});
	});
});
