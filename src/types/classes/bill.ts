// Import the Types
import { ApiClient } from '../../packages/api/api-client';
import { ReferenceType, ModificationMetadata, QuickbooksError, LinkedTxn, TxnTaxDetail } from '../types';

/**
 * Bill Line Detail Types
 */
export type BillLineDetailType = 'AccountBasedExpenseLineDetail' | 'ItemBasedExpenseLineDetail';

/**
 * Bill Line
 */
export interface BillLine {
	Id?: string;
	Description?: string;
	Amount?: number;
	DetailType?: BillLineDetailType;
	AccountBasedExpenseLineDetail?: {
		AccountRef: ReferenceType;
		CustomerRef?: ReferenceType;
		BillableStatus?: 'Billable' | 'NotBillable';
		TaxCodeRef?: ReferenceType;
	};
	ItemBasedExpenseLineDetail?: any;
}

/**
 * Bill
 *
 * @description
 * The Bill Object
 *
 * @see {@link https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/bill}
 */
export class Bill {
	/**
	 * @description The API client used to make requests to the API to manage the Bill object
	 */
	private apiClient: ApiClient;

	// Setup the Readonly Properties
	/**
	 * @description Unique identifier for this object
	 * @readonly @systemDefined
	 * @filterable
	 * @sortable
	 * @requiredForUpdate
	 */
	public readonly Id: string;

	/**
	 * @description Version number for update tracking
	 * @readonly @systemDefined
	 * @requiredForUpdate
	 */
	public readonly SyncToken: string;

	/**
	 * @description System-defined metadata. Read-only
	 */
	public readonly MetaData?: ModificationMetadata;

	/**
	 * @description Total amount of the bill (read-only, system calculated)
	 * @readonly
	 * @filterable
	 * @sortable
	 */
	public readonly TotalAmt?: number;

	/**
	 * @description Remaining balance (read-only)
	 * @readonly
	 * @filterable
	 * @sortable
	 */
	public readonly Balance?: number;

	// Setup the Required Properties
	/**
	 * @description Vendor reference (required)
	 * @filterable
	 */
	public VendorRef: ReferenceType;

	/**
	 * @description Transaction line items (required)
	 * @required
	 */
	public Line?: BillLine[];

	// Setup the Optional Properties
	/**
	 * @description Document number
	 * @filterable
	 * @sortable
	 */
	public DocNumber?: string;

	/**
	 * @description Transaction date (yyyy-MM-dd)
	 * @filterable
	 * @sortable
	 */
	public TxnDate?: string;

	/**
	 * @description Currency reference
	 */
	public CurrencyRef?: ReferenceType;

	/**
	 * @description Private note (max 4000 chars)
	 */
	public PrivateNote?: string;

	/**
	 * @description Accounts payable account reference
	 */
	public APAccountRef?: ReferenceType;

	/**
	 * @description Sales terms reference
	 * @filterable
	 */
	public SalesTermRef?: ReferenceType;

	/**
	 * @description Payment due date (yyyy-MM-dd)
	 * @filterable
	 * @sortable
	 */
	public DueDate?: string;

	/**
	 * @description Related transactions
	 */
	public LinkedTxn?: LinkedTxn[];

	/**
	 * @description Tax details
	 */
	public TxnTaxDetail?: TxnTaxDetail;

	/**
	 * @description Currency exchange rate
	 */
	public ExchangeRate?: number;

	/**
	 * @description Department reference
	 */
	public DepartmentRef?: ReferenceType;

	/**
	 * @description Include in annual TPAR report
	 */
	public IncludeInAnnualTPAR?: boolean;

	/**
	 * @description Domain of the data source
	 */
	public domain?: string;

	/**
	 * @description Sparse update flag
	 */
	public sparse?: boolean;

	/**
	 * @description Constructor for Bill
	 * @param apiClient - The API client
	 * @param billCreationData - The data for the bill
	 */
	constructor(apiClient: ApiClient, billCreationData: BillCreationData) {
		// Set the API Client
		this.apiClient = apiClient;

		// Initialize the System Defined Properties
		this.Id = null!;
		this.SyncToken = null!;

		// Build the Required Properties
		this.VendorRef = billCreationData?.VendorRef ?? null!;
		this.Line = billCreationData?.Line ?? [];
	}

	/**
	 * @description Set the API Client
	 * @param apiClient - The API client
	 */
	public setApiClient(apiClient: ApiClient) {
		this.apiClient = apiClient;
	}

	/**
	 * @description Reload the Bill Data
	 * @throws {QuickbooksError} If the Bill was not found
	 */
	public async reload() {
		// Get the Bill by ID
		const result = await this.apiClient.bills.getBillById(this.Id);

		// Check if the Bill was not Found
		if (!result.bill) throw new QuickbooksError('Bill not found', await ApiClient.getIntuitErrorDetails(null));

		// Assign the Properties
		Object.assign(this, result.bill);
	}

	/**
	 * @description Custom JSON serialization to exclude private properties
	 */
	private toJSON() {
		// Setup the Excluded Properties
		const excludedProperties = ['apiClient'];

		// Setup the JSON Object
		const jsonData = { ...Object.fromEntries(Object.entries(this).filter(([key]) => !excludedProperties.includes(key))) };

		// Return the JSON Object
		return jsonData;
	}

	/**
	 * @description Updates or creates (if the Id is not set) the Bill
	 */
	public async save() {
		// Get the Bill URL
		const url = await this.apiClient.bills.getUrl();

		// Setup the Request Data
		const requestData: RequestInit = {
			method: 'POST',
			body: JSON.stringify({ ...this.toJSON(), sparse: true }),
		};

		// Update the Bill
		const { responseData } = await this.apiClient.runRequest(url.href, requestData);

		// Extract the Bill from the response (QuickBooks returns { Bill: {...} } or wrapped format)
		const billData = responseData?.Bill?.[0] || responseData?.Bill || responseData;

		// Assign the Properties
		Object.assign(this, billData);
	}

	/**
	 * @description Downloads the Bill as a PDF
	 * @returns {Promise<Blob>} The PDF file as a Blob
	 * @throws {QuickbooksError} If the Bill ID is not set or the download fails
	 */
	public async downloadPDF(): Promise<Blob> {
		// Check if the Bill has an ID
		if (!this.Id) throw new QuickbooksError('Bill must be saved before downloading PDF', await ApiClient.getIntuitErrorDetails(null));

		// Get the Bill URL and append /pdf
		const url = await this.apiClient.bills.getUrl();
		url.pathname = `${url.pathname}/${this.Id}/pdf`;

		// Get the Token
		const token = await this.apiClient.authProvider.getToken();

		// Setup the Request Data for PDF
		const requestData: RequestInit = {
			method: 'GET',
			headers: {
				Accept: 'application/pdf',
				Authorization: `Bearer ${token.accessToken}`,
			},
		};

		// Download the PDF
		const response = await fetch(url.href, requestData);

		// Check if the Response has failed
		if (!response.ok) {
			const errorDetails = await ApiClient.getIntuitErrorDetails(response);
			throw new QuickbooksError('Failed to download PDF', errorDetails);
		}

		// Return the PDF as a Blob
		return await response.blob();
	}
}

// Setup the Creation Data
export type BillCreationData = {
	VendorRef: ReferenceType;
	Line?: BillLine[];
};
