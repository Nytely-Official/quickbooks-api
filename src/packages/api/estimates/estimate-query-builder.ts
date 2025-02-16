// Imports
import type { Query, Estimate, DeepKeys } from '../../../types/types';
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
		const whereProperty: DeepKeys<Estimate> = 'CustomerRef.value';
		this.whereClauses.push(`${whereProperty} = '${customerId}'`);
		return this;
	}

	/**
	 * Where Transaction Date
	 * @param date - The transaction date
	 * @returns The Query Builder
	 */
	public whereTxnDate(date: Date): this {
		const whereProperty: DeepKeys<Estimate> = 'TxnDate';
		this.whereClauses.push(`${whereProperty} = '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Where Accepted Date
	 * @param date - The acceptance date
	 * @returns The Query Builder
	 */
	public whereAcceptedDate(date: Date): this {
		const whereProperty: DeepKeys<Estimate> = 'AcceptedDate';
		this.whereClauses.push(`${whereProperty} = '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Where Expiration Date
	 * @param date - The expiration date
	 * @returns The Query Builder
	 */
	public whereExpirationDate(date: Date): this {
		const whereProperty: DeepKeys<Estimate> = 'ExpirationDate';
		this.whereClauses.push(`${whereProperty} = '${date.toISOString()}'`);
		return this;
	}
}
