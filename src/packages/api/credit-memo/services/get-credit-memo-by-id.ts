// Import the Query Builder
import type { CreditMemo, CreditMemoOptions } from '../../../../types/types';
import { CreditMemoAPI } from '../credit-memo-api';

/**
 * Get CreditMemo by ID
 * @param this - The CreditMemo API
 * @param id - The ID of the creditmemo
 * @returns The CreditMemo
 */
export async function getCreditMemoById(this: CreditMemoAPI, id: string, options: CreditMemoOptions = {}): Promise<CreditMemo | null> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup ID Filter
	queryBuilder.whereId(id);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the CreditMemo
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Check if the Response Failed to find an CreditMemo
	if (!response) return null;

	// Format the Response
	const creditmemos = this.formatResponse(response);

	// Return the CreditMemo
	return creditmemos[0];
}
