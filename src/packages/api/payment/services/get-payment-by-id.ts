// Import the Query Builder
import { SearchOptions, type Payment } from '../../../../types/types';
import { PaymentAPI } from '../payment-api';

/**
 * Get Payment by ID
 * @param this - The Payment API
 * @param id - The ID of the payment
 * @returns The Payment
 */
export async function getPaymentById(this: PaymentAPI, id: string, options: SearchOptions<Payment> = {}): Promise<Payment> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup ID Filter
	queryBuilder.whereId(id);

	// Setup the Search Options
	queryBuilder.setSearchOptions(options);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Payment
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Check if the Response Failed to find an Payment
	if (!response) throw new Error('Payment not found');

	// Format the Response
	const payments = this.formatResponse(response);

	// Return the Payment
	return payments[0];
}
