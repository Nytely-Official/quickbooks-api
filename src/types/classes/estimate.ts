// Import the Types
import { ApiClient } from '../../packages/api/api-client';
import {
	ReferenceType,
	PhysicalAddress,
	EmailAddress,
	ModificationMetadata,
	QuickbooksError,
	CustomField,
	LinkedTxn,
	TxnTaxDetail,
	MemoRef,
	GlobalTaxCalculation,
	EstimateStatus,
	EmailStatus,
} from '../types';

/**
 * Estimate Line
 */
export interface EstimateLine {
	readonly Id?: string;
	DetailType: string;
	SalesItemLineDetail?: {
		TaxInclusiveAmt?: number;
		DiscountAmt?: number;
		ItemRef?: ReferenceType;
		ClassRef?: ReferenceType;
		TaxCodeRef?: ReferenceType;
		ServiceDate?: string;
		DiscountRate?: number;
		Qty?: number;
		UnitPrice?: number;
		readonly TaxClassificationRef?: ReferenceType;
		ItemAccountRef?: ReferenceType;
	};
	SubTotalLineDetail?: {};
	Amount: number;
	Description?: string;
	LineNum?: number;
}

/**
 * Estimate
 *
 * @description
 * The Estimate Object
 *
 * @see {@link https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/estimate}
 */
export class Estimate {
	/**
	 * @description The API client used to make requests to the API to manage the Estimate object
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
	 * @description Total amount (read-only, system calculated)
	 * @readonly
	 */
	public readonly TotalAmt?: number;

	/**
	 * @description Home currency total (read-only)
	 * @readonly
	 */
	public readonly HomeTotalAmt?: number;

	/**
	 * @description Tax exemption reference (read-only)
	 * @readonly
	 */
	public readonly TaxExemptionRef?: ReferenceType;

	/**
	 * @description Free form address flag (read-only)
	 * @readonly
	 */
	public readonly FreeFormAddress?: boolean;

	// Setup the Required Properties
	/**
	 * @description Customer reference (required)
	 * @filterable
	 */
	public CustomerRef: ReferenceType;

	/**
	 * @description Transaction line items (required)
	 * @required
	 */
	public Line: EstimateLine[];

	// Setup the Optional Properties
	/**
	 * @description Transaction date (yyyy-MM-dd)
	 * @filterable
	 * @sortable
	 */
	public TxnDate?: string;

	/**
	 * @description Shipping date
	 */
	public ShipDate?: string;

	/**
	 * @description Shipping origin address
	 */
	public ShipFromAddr?: PhysicalAddress;

	/**
	 * @description Currency reference
	 */
	public CurrencyRef?: ReferenceType;

	/**
	 * @description Tax calculation method
	 * @allowedValues TaxExcluded, TaxInclusive, NotApplicable
	 */
	public GlobalTaxCalculation?: GlobalTaxCalculation;

	/**
	 * @description Project reference
	 * @filterable
	 */
	public ProjectRef?: ReferenceType;

	/**
	 * @description Billing email
	 */
	public BillEmail?: EmailAddress;

	/**
	 * @description Class reference
	 */
	public ClassRef?: ReferenceType;

	/**
	 * @description Print status
	 * @allowedValues NotSet, NeedToPrint, PrintComplete
	 */
	public PrintStatus?: string;

	/**
	 * @description Custom fields
	 */
	public CustomField?: CustomField[];

	/**
	 * @description Sales terms reference
	 * @filterable
	 */
	public SalesTermRef?: ReferenceType;

	/**
	 * @description Transaction status
	 */
	public TxnStatus?: EstimateStatus;

	/**
	 * @description Related transactions
	 */
	public LinkedTxn?: LinkedTxn[];

	/**
	 * @description Accepted date
	 */
	public AcceptedDate?: string;

	/**
	 * @description Expiration date
	 */
	public ExpirationDate?: string;

	/**
	 * @description Transaction location type
	 */
	public TransactionLocationType?: string;

	/**
	 * @description Due date
	 * @filterable
	 * @sortable
	 */
	public DueDate?: string;

	/**
	 * @description Document number
	 * @filterable
	 * @sortable
	 */
	public DocNumber?: string;

	/**
	 * @description Private note (max 4000 chars)
	 */
	public PrivateNote?: string;

	/**
	 * @description Customer memo
	 */
	public CustomerMemo?: MemoRef;

	/**
	 * @description Email status
	 * @allowedValues NotSet, NeedToSend, EmailSent
	 */
	public EmailStatus?: EmailStatus;

	/**
	 * @description Tax details
	 */
	public TxnTaxDetail?: TxnTaxDetail;

	/**
	 * @description Accepted by
	 */
	public AcceptedBy?: string;

	/**
	 * @description Currency exchange rate
	 */
	public ExchangeRate?: number;

	/**
	 * @description Shipping address
	 */
	public ShipAddr?: PhysicalAddress;

	/**
	 * @description Department reference
	 */
	public DepartmentRef?: ReferenceType;

	/**
	 * @description Shipping method reference
	 */
	public ShipMethodRef?: ReferenceType;

	/**
	 * @description Billing address
	 */
	public BillAddr?: PhysicalAddress;

	/**
	 * @description Apply tax after discount
	 */
	public ApplyTaxAfterDiscount?: boolean;

	/**
	 * @description Recurring transaction reference
	 */
	public RecurDataRef?: ReferenceType;

	/**
	 * @description Delivery info
	 */
	public DeliveryInfo?: {
		DeliveryType?: string;
	};

	/**
	 * @description Domain of the data source
	 */
	public domain?: string;

	/**
	 * @description Sparse update flag
	 */
	public sparse?: boolean;

	/**
	 * @description Constructor for Estimate
	 * @param apiClient - The API client
	 * @param estimateCreationData - The data for the estimate
	 */
	constructor(apiClient: ApiClient, estimateCreationData: EstimateCreationData) {
		// Set the API Client
		this.apiClient = apiClient;

		// Initialize the System Defined Properties
		this.Id = null!;
		this.SyncToken = null!;

		// Build the Required Properties
		this.CustomerRef = estimateCreationData?.CustomerRef ?? null!;
		this.Line = estimateCreationData?.Line ?? [];
	}

	/**
	 * @description Set the API Client
	 * @param apiClient - The API client
	 */
	public setApiClient(apiClient: ApiClient) {
		this.apiClient = apiClient;
	}

	/**
	 * @description Reload the Estimate Data
	 * @throws {QuickbooksError} If the Estimate was not found
	 */
	public async reload() {
		// Get the Estimate by ID
		const result = await this.apiClient.estimates.getEstimateById(this.Id);

		// Check if the Estimate was not Found
		if (!result.estimate) throw new QuickbooksError('Estimate not found', await ApiClient.getIntuitErrorDetails(null));

		// Assign the Properties
		Object.assign(this, result.estimate);
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
	 * @description Updates or creates (if the Id is not set) the Estimate
	 */
	public async save() {
		// Get the Estimate URL
		const url = await this.apiClient.estimates.getUrl();

		// Setup the Request Data
		const requestData: RequestInit = {
			method: 'POST',
			body: JSON.stringify({ ...this.toJSON(), sparse: true }),
		};

		// Update the Estimate
		const { responseData } = await this.apiClient.runRequest(url.href, requestData);

		// Extract the Estimate from the response (QuickBooks returns { Estimate: {...} } or wrapped format)
		const estimateData = responseData?.Estimate?.[0] || responseData?.Estimate || responseData;

		// Assign the Properties
		Object.assign(this, estimateData);
	}

	/**
	 * @description Sends the Estimate via email
	 * @throws {QuickbooksError} If the Estimate ID is not set or the send fails
	 */
	public async send() {
		// Check if the Estimate has an ID
		if (!this.Id) throw new QuickbooksError('Estimate must be saved before sending', await ApiClient.getIntuitErrorDetails(null));

		// Get the Estimate URL and append /send
		const url = await this.apiClient.estimates.getUrl();
		url.pathname = `${url.pathname}/${this.Id}/send`;

		// Setup the Request Data
		const requestData: RequestInit = {
			method: 'POST',
			body: JSON.stringify({ ...this.toJSON(), sparse: true }),
		};

		// Send the Estimate
		const { responseData } = await this.apiClient.runRequest(url.href, requestData);

		// Extract the Estimate from the response
		const estimateData = responseData?.Estimate?.[0] || responseData?.Estimate || responseData;

		// Assign the Properties
		if (estimateData) Object.assign(this, estimateData);
	}

	/**
	 * @description Downloads the Estimate as a PDF
	 * @returns {Promise<Blob>} The PDF file as a Blob
	 * @throws {QuickbooksError} If the Estimate ID is not set or the download fails
	 */
	public async downloadPDF(): Promise<Blob> {
		// Check if the Estimate has an ID
		if (!this.Id) throw new QuickbooksError('Estimate must be saved before downloading PDF', await ApiClient.getIntuitErrorDetails(null));

		// Get the Estimate URL and append /pdf
		const url = await this.apiClient.estimates.getUrl();
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
export type EstimateCreationData = {
	CustomerRef: ReferenceType;
	Line: EstimateLine[];
};
