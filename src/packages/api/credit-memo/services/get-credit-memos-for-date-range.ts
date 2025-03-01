// Import the Query Builder
import type { CreditMemo, CreditMemoOptions, SearchResponse } from '../../../../types/types';
import { CreditMemoAPI } from '../credit-memo-api';

/**
 * Get CreditMemos for a Date Range
 * @param this - The CreditMemo API
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns The CreditMemos
 */
export async function getCreditMemosForDateRange(
	this: CreditMemoAPI,
	startDate: Date,
	endDate: Date,
	options: CreditMemoOptions = {},
): Promise<SearchResponse<CreditMemo>> {
	// Ensure the Start Date is Before the End Date
	if (startDate > endDate) throw new Error('Start date must be before end date');

	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Date Range Filters
	queryBuilder.whereLastUpdatedAfter(startDate);
	queryBuilder.whereLastUpdatedBefore(endDate);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the CreditMemos
	const response = await this.apiClient.runRequest(url, { method: 'GET' });
	// Format the Response
	const creditmemos = this.formatResponse(response);

	// Setup the Search Response
	const searchResponse: SearchResponse<CreditMemo> = {
		results: creditmemos,
		hasNextPage: await this.hasNextPage(queryBuilder),
	};

	// Return the CreditMemos
	return searchResponse;
}
