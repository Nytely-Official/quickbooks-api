// Imports
import { type Query, type Estimate, EstimateFilters } from '../../../types/types';
import { BaseQueryBuilder } from '../common/base-query-builder';

/**
 * The Estimate Query Builder
 */
export class EstimateQueryBuilder extends BaseQueryBuilder<Estimate> {
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
		this.whereClauses.push(`${EstimateFilters.Id} = '${customerId}'`);
		return this;
	}

	/**
	 * Where Transaction Date
	 * @param date - The transaction date
	 * @returns The Query Builder
	 */
	public whereTxnDate(date: Date): this {
		this.whereClauses.push(`${EstimateFilters.TxnDate} = '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Where Accepted Date
	 * @param date - The acceptance date
	 * @returns The Query Builder
	 */
	public whereAcceptedDate(date: Date): this {
		this.whereClauses.push(`${EstimateFilters.AcceptedDate} = '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Where Expiration Date
	 * @param date - The expiration date
	 * @returns The Query Builder
	 */
	public whereExpirationDate(date: Date): this {
		this.whereClauses.push(`${EstimateFilters.ExpirationDate} = '${date.toISOString()}'`);
		return this;
	}
}
