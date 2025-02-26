// Import the Query Builder
import { SearchOptions, SearchResponse, type CreditMemo } from '../../../../types/types';
import { CreditMemoAPI } from '../credit-memo-api';

/**
 * Get CreditMemos by Due Date
 * @param this - The CreditMemo API
 * @param dueDate - The due date to filter by
 * @returns Filtered CreditMemos
 */
export async function getCreditMemosByDueDate(
	this: CreditMemoAPI,
	dueDate: Date,
	options: SearchOptions<CreditMemo> = {},
): Promise<SearchResponse<CreditMemo>> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Due Date Filter
	queryBuilder.whereDueDate(dueDate);

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL with due date filter
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
