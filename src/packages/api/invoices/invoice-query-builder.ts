// Imports
import type { Invoice, Query } from '../../../types/types';
import { BaseQueryBuilder } from '../common/base-query-builder';

/**
 * The Invoice Query Builder
 */
export class InvoiceQueryBuilder extends BaseQueryBuilder<Invoice> {
	/**
	 * Constructor
	 * @param endpoint - The Endpoint
	 * @param baseQuery - The Base Query
	 */
	constructor(endpoint: string, baseQuery: Query) {
		super(endpoint, baseQuery);
	}

	/**
	 * Where Due Date
	 * @param date - The due date
	 * @returns The Query Builder
	 */
	public whereDueDate(date: Date): this {
		this.whereClauses.push(`DueDate = '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Where Customer ID
	 * @param customerId - The customer ID
	 * @returns The Query Builder
	 */
	public whereCustomerId(customerId: string): this {
		this.whereClauses.push(`CustomerRef.value = '${customerId}'`);
		return this;
	}

	/**
	 * Where Status
	 * @param status - The status
	 * @returns The Query Builder
	 */
	public whereStatus(status: 'paid' | 'unpaid'): this {
		// Setup the Operator
		const operator = status === 'paid' ? '=' : '>';

		// Add the Where Clause
		this.whereClauses.push(`Balance ${operator} '0'`);

		// Return the Query Builder
		return this;
	}
}
