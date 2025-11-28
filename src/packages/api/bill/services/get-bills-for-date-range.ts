// Import the Query Builder
import { QuickbooksError, type Bill, type BillOptions, type SearchResponse } from '../../../../types/types';
import { ApiClient } from '../../api-client';
import { BillAPI } from '../bill-api';

/**
 * Get Bills for a Date Range
 * @param this - The Bill API
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns The Bills
 */
export async function getBillsForDateRange(
	this: BillAPI,
	startDate: Date,
	endDate: Date,
	options: BillOptions = {},
): Promise<SearchResponse<Bill>> {
	// Ensure the Start Date is Before the End Date
	if (startDate > endDate) throw new QuickbooksError('Start date must be before end date', await ApiClient.getIntuitErrorDetails(null));

	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Date Range Filters
	queryBuilder.whereLastUpdatedAfter(startDate);
	queryBuilder.whereLastUpdatedBefore(endDate);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Bills
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const bills = await this.formatResponse(responseData);

	// Setup the Search Response
	const searchResponse: SearchResponse<Bill> = {
		results: bills,
		hasNextPage: await this.hasNextPage(queryBuilder),
		intuitTID,
	};

	// Return the Bills
	return searchResponse;
}
