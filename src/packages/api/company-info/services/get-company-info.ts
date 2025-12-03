// Imports
import { plainToClass } from 'class-transformer';
import { CompanyInfoOptions } from '../../../../types/interfaces/options';
import { CompanyInfo } from '../../../../types/types';
import { CompanyInfoAPI } from '../company-info-api';

/**
 * Get Company Info
 * @param this - The Company Info API
 * @param options - The Search Options
 * @returns The Company Info
 */
export async function getCompanyInfo(
	this: CompanyInfoAPI,
	options: CompanyInfoOptions = {},
): Promise<{ companyInfo: CompanyInfo | undefined; intuitTID: string }> {
	// Get the Query Builder
	const queryBuilder = await this.getQueryBuilder();

	// Setup the Search Options (if provided)
	if (options.searchOptions) queryBuilder.setSearchOptions(options.searchOptions);

	// Setup the URL
	const url = queryBuilder.build();

	// Get the Company Info
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const companyInfoData = await this.formatResponse(responseData);

	// Check if CompanyInfo data exists
	if (!companyInfoData) return { companyInfo: undefined, intuitTID };

	// Convert the CompanyInfo to a Class
	const companyInfo = plainToClass(CompanyInfo, companyInfoData);

	// Check if the conversion was successful
	if (!companyInfo) return { companyInfo: undefined, intuitTID };

	// Set the API Client
	companyInfo.setApiClient(this.apiClient);

	// Return the Company Info with Intuit TID
	return {
		companyInfo,
		intuitTID,
	};
}
