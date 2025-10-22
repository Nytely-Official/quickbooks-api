// Imports
import type { Preferences, Query } from '../../../types/types';
import { BaseQueryBuilder } from '../common/base-query-builder';

/**
 * The Preference Query Builder
 */
export class PreferenceQueryBuilder extends BaseQueryBuilder<Preferences> {
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
		this.whereClauses.push(`CustomerRef = '${customerId}'`);
		return this;
	}
}
