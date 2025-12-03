// Import the Query Builder
import { plainToClass } from 'class-transformer';
import { CreditMemo, type CreditMemoOptions } from '../../../../types/types';
import { CreditMemoAPI } from '../credit-memo-api';

/**
 * Get CreditMemo by ID
 * @param this - The CreditMemo API
 * @param id - The ID of the creditmemo
 * @returns The CreditMemo
 */
export async function getCreditMemoById(
	this: CreditMemoAPI,
	id: string,
	options: CreditMemoOptions = {},
): Promise<{ creditMemo: CreditMemo | null; intuitTID: string }> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup ID Filter
	queryBuilder.whereId(id);

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the CreditMemo
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Check if the Response Failed to find an CreditMemo
	if (!responseData) return { creditMemo: null, intuitTID };

	// Format the Response
	const creditmemos = await this.formatResponse(responseData);

	// Convert the CreditMemo to a Class
	const creditMemo = creditmemos[0] ? plainToClass(CreditMemo, creditmemos[0]) : null;

	// Check if the CreditMemo is valid and set the API Client
	if (creditMemo) creditMemo.setApiClient(this.apiClient);

	// Return the CreditMemo with Intuit TID
	return {
		creditMemo,
		intuitTID,
	};
}
