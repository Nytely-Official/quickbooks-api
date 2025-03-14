// Imports
import type { CompanyInfo, Query } from '../../../types/types';
import { BaseQueryBuilder } from '../common/base-query-builder';

/**
 * The Company Info Query Builder
 */
export class CompanyInfoQueryBuilder extends BaseQueryBuilder<CompanyInfo> {
	/**
	 * Constructor
	 * @param endpoint - The Endpoint
	 * @param baseQuery - The Base Query
	 */
	constructor(endpoint: string, baseQuery: Query) {
		super(endpoint, baseQuery);
	}
} 