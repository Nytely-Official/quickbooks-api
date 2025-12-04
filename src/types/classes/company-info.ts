// Import the Types
import { ApiClient } from '../../packages/api/api-client';
import { PhysicalAddress, EmailAddress, ModificationMetadata, QuickbooksError } from '../types';

/**
 * Name Value Pair
 */
interface NameValuePair {
	Name: string;
	Value: string;
}

/**
 * Website Address
 */
interface WebsiteAddress {
	URI?: string;
}

/**
 * Phone Number
 */
interface PhoneNumber {
	FreeFormNumber: string;
}

/**
 * CompanyInfo
 *
 * @description
 * The Company Info Object (read-only)
 *
 * @see {@link https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/companyinfo}
 */
export class CompanyInfo {
	/**
	 * @description The API client used to make requests to the API to manage the CompanyInfo object
	 */
	private apiClient: ApiClient;

	// Setup the Readonly Properties
	/**
	 * @description Unique identifier for this object
	 * @readonly @systemDefined
	 */
	public readonly Id: string;

	/**
	 * @description Version number for update tracking
	 * @readonly @systemDefined
	 */
	public readonly SyncToken: string;

	/**
	 * @description System-defined metadata. Read-only
	 */
	public readonly MetaData?: ModificationMetadata;

	/**
	 * @description Company name
	 * @readonly
	 */
	public readonly CompanyName: string;

	/**
	 * @description Legal name of the company
	 * @readonly
	 */
	public readonly LegalName: string;

	/**
	 * @description Company address
	 * @readonly
	 */
	public readonly CompanyAddr: PhysicalAddress;

	/**
	 * @description Legal address
	 * @readonly
	 */
	public readonly LegalAddr: PhysicalAddress;

	/**
	 * @description Customer communication address
	 * @readonly
	 */
	public readonly CustomerCommunicationAddr: PhysicalAddress;

	/**
	 * @description Primary phone number
	 * @readonly
	 */
	public readonly PrimaryPhone: PhoneNumber;

	/**
	 * @description Company email address
	 * @readonly
	 */
	public readonly Email: EmailAddress;

	/**
	 * @description Website address
	 * @readonly
	 */
	public readonly WebAddr: WebsiteAddress;

	/**
	 * @description Country code
	 * @readonly
	 */
	public readonly Country: string;

	/**
	 * @description Supported languages
	 * @readonly
	 */
	public readonly SupportedLanguages: string;

	/**
	 * @description Fiscal year start month
	 * @readonly
	 */
	public readonly FiscalYearStartMonth: string;

	/**
	 * @description Company start date
	 * @readonly
	 */
	public readonly CompanyStartDate: string;

	/**
	 * @description Employer ID
	 * @readonly
	 */
	public readonly EmployerId: string;

	/**
	 * @description Name-value pairs for additional data
	 * @readonly
	 */
	public readonly NameValue: NameValuePair[];

	/**
	 * @description Domain of the data source
	 */
	public readonly domain: string;

	/**
	 * @description Sparse update flag
	 */
	public readonly sparse: boolean;

	/**
	 * @description Constructor for CompanyInfo
	 * @param apiClient - The API client
	 * @param companyInfoData - The company info data (typically from API response)
	 */
	constructor(apiClient: ApiClient, companyInfoData?: Partial<CompanyInfo>) {
		// Set the API Client
		this.apiClient = apiClient;

		// Initialize readonly properties
		this.Id = null!;
		this.SyncToken = null!;
		this.CompanyName = null!;
		this.LegalName = null!;
		this.CompanyAddr = null!;
		this.LegalAddr = null!;
		this.CustomerCommunicationAddr = null!;
		this.PrimaryPhone = null!;
		this.Email = null!;
		this.WebAddr = null!;
		this.Country = null!;
		this.SupportedLanguages = null!;
		this.FiscalYearStartMonth = null!;
		this.CompanyStartDate = null!;
		this.EmployerId = null!;
		this.NameValue = null!;
		this.domain = null!;
		this.sparse = null!;

		// Initialize all properties from the data
		if (companyInfoData) {
			Object.assign(this, companyInfoData);
		}
	}

	/**
	 * @description Set the API Client
	 * @param apiClient - The API client
	 */
	public setApiClient(apiClient: ApiClient) {
		this.apiClient = apiClient;
	}

	/**
	 * @description Reload the CompanyInfo Data
	 * @throws {QuickbooksError} If the CompanyInfo was not found
	 */
	public async reload() {
		// Get the CompanyInfo
		const result = await this.apiClient.companyInfo.getCompanyInfo();

		// Check if the CompanyInfo was not Found
		if (!result.companyInfo) throw new QuickbooksError('CompanyInfo not found', await ApiClient.getIntuitErrorDetails(null));

		// Assign the Properties
		Object.assign(this, result.companyInfo);
	}
}
