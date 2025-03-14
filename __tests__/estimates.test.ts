// Imports
import { ApiClient } from '../src/app';
import { AuthProvider, Environment, AuthScopes, type EstimateQueryResponse } from '../src/app';
import { describe, expect, it, beforeEach, afterEach } from 'bun:test';
import { mockFetch, mockEstimateData, mockTokenData } from './helpers';

// Mock configuration
const TEST_CONFIG = {
	clientId: 'test_client_id',
	clientSecret: 'test_client_secret',
	redirectUri: 'http://localhost:3000/auth-code',
	scopes: [AuthScopes.Accounting],
};

// Describe the Estimate API
describe('Estimate API', () => {
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

	// Describe the getAllEstimates Method
	describe('getAllEstimates', () => {
		// Test the getAllEstimates Method
		it('should fetch all estimates', async () => {
			// Setup the Estimate Query Response
			const estimateQueryResponse: { QueryResponse: EstimateQueryResponse } = {
				QueryResponse: {
					Estimate: mockEstimateData,
					maxResults: mockEstimateData.length,
					startPosition: 1,
					totalCount: mockEstimateData.length,
				},
			};

			// Set the Global Fetch
			global.fetch = mockFetch(JSON.stringify(estimateQueryResponse));

			// Get the Estimates
			const searchResponse = await apiClient.estimates.getAllEstimates();

			// Assert the Estimates
			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(mockEstimateData.length);
			expect(searchResponse.results[0].Id).toBe(mockEstimateData[0].Id);
		});
	});

	// Describe the hasNextPage Method
	describe('hasNextPage', () => {
		// Test the hasNextPage Method
		it('should return true if there is a next page', async () => {
			// Setup the Estimate Query Response
			const estimateQueryResponse: { QueryResponse: EstimateQueryResponse } = {
				QueryResponse: {
					Estimate: mockEstimateData,
					maxResults: mockEstimateData.length,
					startPosition: 1,
					totalCount: mockEstimateData.length,
				},
			};

			// Set the Global Fetch
			global.fetch = mockFetch(JSON.stringify(estimateQueryResponse));

			// Get the Estimates
			const searchResponse = await apiClient.estimates.getAllEstimates();

			// Assert the Estimates
			expect(searchResponse.hasNextPage).toBe(true);
		});
	});

	// Describe the getEstimateById Method
	describe('getEstimateById', () => {
		// Test the getEstimateById Method
		it('should fetch single estimate by ID', async () => {
			// Setup the Estimate Query Response
			const testEstimate = mockEstimateData[0];

			// Setup the Estimate Query Response
			const estimateQueryResponse: { QueryResponse: EstimateQueryResponse } = {
				QueryResponse: {
					Estimate: [testEstimate],
					maxResults: 1,
					startPosition: 1,
					totalCount: 1,
				},
			};

			// Set the Global Fetch
			global.fetch = mockFetch(JSON.stringify(estimateQueryResponse));

			// Get the Estimate
			const searchResponse = await apiClient.estimates.getEstimateById(testEstimate.Id);

			// Assert the Estimate
			expect(searchResponse.Id).toBe(testEstimate.Id);
		});

		// Test the getEstimateById Method with an Invalid Estimate ID
		it('should throw error for invalid estimate ID', async () => {
			// Setup the Estimate Query Response
			global.fetch = mockFetch(
				JSON.stringify({
					QueryResponse: {},
					fault: { error: [{ message: 'Estimate not found' }] },
				}),
				400,
			);

			// Assert the Error
			expect(apiClient.estimates.getEstimateById('invalid')).rejects.toThrow('Estimate not found');
		});
	});

	// Describe the getEstimatesForDateRange Method
	describe('getEstimatesForDateRange', () => {
		// Test the getEstimatesForDateRange Method
		it('should fetch estimates within date range', async () => {
			// Setup the Start and End Dates
			const startDate = new Date('2025-01-09');
			const endDate = new Date('2025-01-12');

			// Get the Estimates in the Date Range
			const estimatesInDateRange = mockEstimateData.filter((estimate) => {
				// Check if the Estimate has a Last Updated Time
				if (!estimate.MetaData?.LastUpdatedTime) return false;

				// Get the Estimate Date
				const estimateDate = new Date(estimate.MetaData.LastUpdatedTime);

				// Return the Estimate if it is in the Date Range
				return estimateDate >= startDate && estimateDate <= endDate;
			});

			// Setup the Estimate Query Response
			const estimateQueryResponse: { QueryResponse: EstimateQueryResponse } = {
				QueryResponse: {
					Estimate: estimatesInDateRange,
					maxResults: mockEstimateData.length,
					startPosition: 1,
					totalCount: mockEstimateData.length,
				},
			};

			// Set the Global Fetch
			global.fetch = mockFetch(JSON.stringify(estimateQueryResponse));

			// Get the Estimates in the Date Range
			const searchResponse = await apiClient.estimates.getEstimatesForDateRange(startDate, endDate);

			// Assert the Estimates
			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(estimatesInDateRange.length);
			expect(searchResponse.results[0].Id).toBe(estimatesInDateRange[0].Id);
		});
	});

	// Describe the getUpdatedEstimates Method
	describe('getUpdatedEstimates', () => {
		// Test the getUpdatedEstimates Method
		it('should fetch updated estimates', async () => {
			// Setup the Last Updated Time
			const lastUpdatedTime = new Date('2024-01-09');

			// Get the Estimates in the Date Range
			const estimatesInDateRange = mockEstimateData.filter((estimate) => {
				// Check if the Estimate has a Last Updated Time
				if (!estimate.MetaData?.LastUpdatedTime) return false;

				// Get the Estimate Date
				const estimateDate = new Date(estimate.MetaData.LastUpdatedTime);

				// Return the Estimate if it is in the Date Range
				return estimateDate >= lastUpdatedTime;
			});

			// Setup the Estimate Query Response
			const estimateQueryResponse: { QueryResponse: EstimateQueryResponse } = {
				QueryResponse: {
					Estimate: estimatesInDateRange,
					maxResults: estimatesInDateRange.length,
					startPosition: 1,
					totalCount: estimatesInDateRange.length,
				},
			};

			// Set the Global Fetch
			global.fetch = mockFetch(JSON.stringify(estimateQueryResponse));

			// Get the Estimates
			const searchResponse = await apiClient.estimates.getUpdatedEstimates(lastUpdatedTime);

			// Assert the Estimates
			expect(searchResponse.results).toBeArray();
			expect(searchResponse.results.length).toBe(estimatesInDateRange.length);
			expect(searchResponse.results[0].Id).toBe(estimatesInDateRange[0].Id);
		});

		// Describe the getUpdatedEstimates Method
		it('should return an empty array if no estimates are updated', async () => {
			// Setup the Estimate Query Response
			const estimateQueryResponse: { QueryResponse: {}; time: string } = {
				QueryResponse: {},
				time: '2025-03-04T05:46:36.933-08:00',
			};

			// Mock the Fetch with proper QueryResponse structure
			global.fetch = mockFetch(JSON.stringify(estimateQueryResponse));

			// Get the Estimates
			const searchResponse = await apiClient.estimates.getUpdatedEstimates(new Date(new Date().getTime() + 68400000));

			// Assert the Estimates
			expect(searchResponse.results).toBeArray();

			// Assert the Estimates Length
			expect(searchResponse.results.length).toBe(0);
		});
	});
});
