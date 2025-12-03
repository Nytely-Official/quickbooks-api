// Import the Types
import { ApiClient } from '../../packages/api/api-client';
import { ModificationMetadata, QuickbooksError } from '../types';

/**
 * Preferences
 *
 * @description
 * The Preferences Object (read-only, retrieved via API)
 *
 * @see {@link https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/preferences}
 */
export class Preferences {
	/**
	 * @description The API client used to make requests to the API to manage the Preferences object
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
	 * @description Email messages preferences
	 * @readonly
	 */
	public readonly EmailMessagesPrefs?: {
		InvoiceMessage?: {
			Message?: string;
			Subject?: string;
		};
		EstimateMessage?: {
			Message?: string;
			Subject?: string;
		};
		SalesReceiptMessage?: {
			Message?: string;
			Subject?: string;
		};
		StatementMessage?: {
			Message?: string;
			Subject?: string;
		};
	};

	/**
	 * @description Product and services preferences
	 * @readonly
	 */
	public readonly ProductAndServicesPrefs?: {
		QuantityWithPriceAndRate?: boolean;
		ForPurchase?: boolean;
		QuantityOnHand?: boolean;
		ForSales?: boolean;
	};

	/**
	 * @description Domain of the data source
	 */
	public readonly domain: string;

	/**
	 * @description Report preferences
	 * @readonly
	 */
	public readonly ReportPrefs?: {
		ReportBasis?: string;
		CalcAgingReportFromTxnDate?: boolean;
	};

	/**
	 * @description Accounting info preferences
	 * @readonly
	 */
	public readonly AccountingInfoPrefs?: {
		FirstMonthOfFiscalYear?: string;
		UseAccountNumbers?: boolean;
		TaxYearMonth?: string;
		ClassTrackingPerTxn?: boolean;
		TrackDepartments?: boolean;
		TaxForm?: string;
		CustomerTerminology?: string;
		BookCloseDate?: string;
		DepartmentTerminology?: string;
		ClassTrackingPerTxnLine?: boolean;
	};

	/**
	 * @description Sales forms preferences
	 * @readonly
	 */
	public readonly SalesFormsPrefs?: {
		ETransactionPaymentEnabled?: boolean;
		CustomTxnNumbers?: boolean;
		AllowShipping?: boolean;
		AllowServiceDate?: boolean;
		ETransactionEnabledStatus?: string;
		DefaultCustomerMessage?: string;
		EmailCopyToCompany?: boolean;
		AllowEstimates?: boolean;
		DefaultTerms?: { value?: string };
		AllowDiscount?: boolean;
		DefaultDiscountAccount?: string;
		AllowDeposit?: boolean;
		AutoApplyPayments?: boolean;
		IPNSupportEnabled?: boolean;
		AutoApplyCredit?: boolean;
		CustomField?: Array<{
			CustomField?: Array<{
				BooleanValue?: boolean;
				Type?: string;
				Name?: string;
				StringValue?: string;
			}>;
		}>;
		UsingPriceLevels?: boolean;
		ETransactionAttachPDF?: boolean;
	};

	/**
	 * @description Vendor and purchases preferences
	 * @readonly
	 */
	public readonly VendorAndPurchasesPrefs?: {
		BillableExpenseTracking?: boolean;
		TrackingByCustomer?: boolean;
		POCustomField?: Array<{
			CustomField?: Array<{
				BooleanValue?: boolean;
				Type?: string;
				Name?: string;
				StringValue?: string;
			}>;
		}>;
	};

	/**
	 * @description Tax preferences
	 * @readonly
	 */
	public readonly TaxPrefs?: {
		TaxGroupCodeRef?: { value?: string };
		UsingSalesTax?: boolean;
	};

	/**
	 * @description Other preferences
	 * @readonly
	 */
	public readonly OtherPrefs?: {
		NameValue?: Array<{
			Name?: string;
			Value?: string;
		}>;
	};

	/**
	 * @description Sparse update flag
	 */
	public readonly sparse: boolean;

	/**
	 * @description Time tracking preferences
	 * @readonly
	 */
	public readonly TimeTrackingPrefs?: {
		WorkWeekStartDate?: string;
		MarkTimeEntriesBillable?: boolean;
		ShowBillRateToAll?: boolean;
		UseServices?: boolean;
		BillCustomers?: boolean;
	};

	/**
	 * @description Currency preferences
	 * @readonly
	 */
	public readonly CurrencyPrefs?: {
		HomeCurrency?: { value?: string };
		MultiCurrencyEnabled?: boolean;
	};

	/**
	 * @description Constructor for Preferences
	 * @param apiClient - The API client
	 * @param preferencesData - The preferences data (typically from API response)
	 */
	constructor(apiClient: ApiClient, preferencesData?: Partial<Preferences>) {
		// Set the API Client
		this.apiClient = apiClient;

		// Initialize readonly properties
		this.Id = null!;
		this.SyncToken = null!;
		this.domain = null!;
		this.sparse = null!;

		// Initialize all properties from the data
		if (preferencesData) {
			Object.assign(this, preferencesData);
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
	 * @description Reload the Preferences Data
	 * @throws {QuickbooksError} If the Preferences was not found
	 */
	public async reload() {
		// Get the Preferences
		const result = await this.apiClient.preferences.getPreferences();

		// Check if the Preferences was not Found
		if (!result.results || result.results.length === 0) {
			throw new QuickbooksError('Preferences not found', await ApiClient.getIntuitErrorDetails(null));
		}

		// Assign the Properties (Preferences typically returns an array, get the first)
		Object.assign(this, result.results[0]);
	}
}
