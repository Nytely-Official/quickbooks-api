// Imports
import type { CompanyInfo } from '../../../../types/types';
import { CompanyInfoAPI } from '../company-info-api';

/**
 * Raw Company Info Query
 * @param this - The Company Info API
 * @param query - The Raw Query
 * @returns The Company Info
 */
export async function rawCompanyInfoQuery(this: CompanyInfoAPI, query: string): Promise<{ companyInfo: CompanyInfo; intuitTID: string }> {
	// Get the Company Endpoint
	const companyEndpoint = await this.getCompanyEndpoint();

	// Setup the URL
	const url = `${companyEndpoint}/query?query=${encodeURIComponent(query)}`;

	// Get the Company Info
	const { responseData, intuitTID } = await this.apiClient.runRequest(url, { method: 'GET' });

	// Format the Response
	const companyInfo = await this.formatResponse(responseData);

	// Return the Company Info with Intuit TID
	return {
		companyInfo,
		intuitTID,
	};
}
