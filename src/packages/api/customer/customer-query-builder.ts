// Imports
import { type Customer, type Query, CustomerFilters } from '../../../types/types';
import { BaseQueryBuilder } from '../common/base-query-builder';

/**
 * The Invoice Query Builder
 */
export class CustomerQueryBuilder extends BaseQueryBuilder<Customer> {
	/**
	 * Constructor
	 * @param endpoint - The Endpoint
	 * @param baseQuery - The Base Query
	 */
	constructor(endpoint: string, baseQuery: Query) {
		super(endpoint, baseQuery);
	}

	/**
	 * Where Customer ID
	 * @param customerId - The customer ID
	 * @returns The Query Builder
	 */
	public whereCustomerId(customerId: string): this {
		this.whereClauses.push(`${CustomerFilters.Id} = '${customerId}'`);
		return this;
	}
}
