// Imports
import { CompanyInfoOptions } from '../../../../types/interfaces/options';
import type { CompanyInfo } from '../../../../types/types';
import { CompanyInfoAPI } from '../company-info-api';

/**
 * Get Company Info
 * @param this - The Company Info API
 * @param options - The Search Options
 * @returns The Company Info
 */
export async function getCompanyInfo(this: CompanyInfoAPI, options: CompanyInfoOptions = {}): Promise<CompanyInfo> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Company Info
	const response = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const companyInfo = await this.formatResponse(response);

	// Return the Company Info
	return companyInfo;
}
