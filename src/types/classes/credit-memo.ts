// Import the Types
import { ApiClient } from '../../packages/api/api-client';
import {
	ReferenceType,
	PhysicalAddress,
	EmailAddress,
	ModificationMetadata,
	QuickbooksError,
	CustomField,
	TxnTaxDetail,
	MemoRef,
} from '../types';

/**
 * Credit Memo Line
 */
export interface CreditMemoLine {
	Id?: string;
	Description?: string;
	DetailType: string;
	SalesItemLineDetail?: {
		TaxCodeRef: ReferenceType;
		Qty: number;
		UnitPrice: number;
		ItemRef: ReferenceType;
	};
	LineNum?: number;
	Amount: number;
	SubTotalLineDetail?: {};
}

/**
 * CreditMemo
 *
 * @description
 * The Credit Memo Object
 *
 * @see {@link https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/creditmemo}
 */
export class CreditMemo {
	/**
	 * @description The API client used to make requests to the API to manage the CreditMemo object
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
	 * @filterable
	 * @sortable
	 */
	public readonly TotalAmt?: number;

	/**
	 * @description Remaining credit amount (read-only)
	 * @readonly
	 */
	public readonly RemainingCredit?: number;

	/**
	 * @description Current balance (read-only)
	 * @readonly
	 * @filterable
	 * @sortable
	 */
	public readonly Balance?: number;

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
	public Line: CreditMemoLine[];

	// Setup the Optional Properties
	/**
	 * @description Transaction date (yyyy-MM-dd)
	 * @filterable
	 * @sortable
	 */
	public TxnDate?: string;

	/**
	 * @description Document number
	 * @filterable
	 * @sortable
	 */
	public DocNumber?: string;

	/**
	 * @description Print status
	 * @allowedValues NotSet, NeedToPrint, PrintComplete
	 */
	public PrintStatus?: string;

	/**
	 * @description Apply tax after discount
	 */
	public ApplyTaxAfterDiscount?: boolean;

	/**
	 * @description Customer memo
	 */
	public CustomerMemo?: MemoRef;

	/**
	 * @description Project reference
	 * @filterable
	 */
	public ProjectRef?: ReferenceType;

	/**
	 * @description Tax details
	 */
	public TxnTaxDetail?: TxnTaxDetail;

	/**
	 * @description Custom fields
	 */
	public CustomField?: CustomField[];

	/**
	 * @description Shipping address
	 */
	public ShipAddr?: PhysicalAddress;

	/**
	 * @description Email status
	 * @allowedValues NotSet, NeedToSend, EmailSent
	 */
	public EmailStatus?: string;

	/**
	 * @description Billing address
	 */
	public BillAddr?: PhysicalAddress;

	/**
	 * @description Billing email
	 */
	public BillEmail?: EmailAddress;

	/**
	 * @description Domain of the data source
	 */
	public domain?: string;

	/**
	 * @description Sparse update flag
	 */
	public sparse?: boolean;

	/**
	 * @description Constructor for CreditMemo
	 * @param apiClient - The API client
	 * @param creditMemoCreationData - The data for the credit memo
	 */
	constructor(apiClient: ApiClient, creditMemoCreationData: CreditMemoCreationData) {
		// Set the API Client
		this.apiClient = apiClient;

		// Initialize the System Defined Properties
		this.Id = null!;
		this.SyncToken = null!;

		// Build the Required Properties
		this.CustomerRef = creditMemoCreationData?.CustomerRef ?? null!;
		this.Line = creditMemoCreationData?.Line ?? [];
	}

	/**
	 * @description Set the API Client
	 * @param apiClient - The API client
	 */
	public setApiClient(apiClient: ApiClient) {
		this.apiClient = apiClient;
	}

	/**
	 * @description Reload the CreditMemo Data
	 * @throws {QuickbooksError} If the CreditMemo was not found
	 */
	public async reload() {
		// Get the CreditMemo by ID
		const result = await this.apiClient.creditMemos.getCreditMemoById(this.Id);

		// Check if the CreditMemo was not Found
		if (!result.creditMemo) throw new QuickbooksError('CreditMemo not found', await ApiClient.getIntuitErrorDetails(null));

		// Assign the Properties
		Object.assign(this, result.creditMemo);
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
	 * @description Updates or creates (if the Id is not set) the CreditMemo
	 */
	public async save() {
		// Get the CreditMemo URL
		const url = await this.apiClient.creditMemos.getUrl();

		// Setup the Request Data
		const requestData: RequestInit = {
			method: 'POST',
			body: JSON.stringify({ ...this.toJSON(), sparse: true }),
		};

		// Update the CreditMemo
		const { responseData } = await this.apiClient.runRequest(url.href, requestData);

		// Extract the CreditMemo from the response (QuickBooks returns { CreditMemo: {...} } or wrapped format)
		const creditMemoData = responseData?.CreditMemo?.[0] || responseData?.CreditMemo || responseData;

		// Assign the Properties
		Object.assign(this, creditMemoData);
	}

	/**
	 * @description Sends the CreditMemo via email
	 * @throws {QuickbooksError} If the CreditMemo ID is not set or the send fails
	 */
	public async send() {
		// Check if the CreditMemo has an ID
		if (!this.Id) throw new QuickbooksError('CreditMemo must be saved before sending', await ApiClient.getIntuitErrorDetails(null));

		// Get the CreditMemo URL and append /send
		const url = await this.apiClient.creditMemos.getUrl();
		url.pathname = `${url.pathname}/${this.Id}/send`;

		// Setup the Request Data
		const requestData: RequestInit = {
			method: 'POST',
			body: JSON.stringify({ ...this.toJSON(), sparse: true }),
		};

		// Send the CreditMemo
		const { responseData } = await this.apiClient.runRequest(url.href, requestData);

		// Extract the CreditMemo from the response
		const creditMemoData = responseData?.CreditMemo?.[0] || responseData?.CreditMemo || responseData;

		// Assign the Properties
		if (creditMemoData) Object.assign(this, creditMemoData);
	}

	/**
	 * @description Downloads the CreditMemo as a PDF
	 * @returns {Promise<Blob>} The PDF file as a Blob
	 * @throws {QuickbooksError} If the CreditMemo ID is not set or the download fails
	 */
	public async downloadPDF(): Promise<Blob> {
		// Check if the CreditMemo has an ID
		if (!this.Id) throw new QuickbooksError('CreditMemo must be saved before downloading PDF', await ApiClient.getIntuitErrorDetails(null));

		// Get the CreditMemo URL and append /pdf
		const url = await this.apiClient.creditMemos.getUrl();
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

	/**
	 * @description Voids the CreditMemo
	 * @throws {QuickbooksError} If the CreditMemo ID is not set or the void fails
	 */
	public async void() {
		// Check if the CreditMemo has an ID
		if (!this.Id) throw new QuickbooksError('CreditMemo must be saved before voiding', await ApiClient.getIntuitErrorDetails(null));

		// Get the CreditMemo URL and append operation=void
		const url = await this.apiClient.creditMemos.getUrl();
		url.pathname = `${url.pathname}/${this.Id}`;
		url.searchParams.set('operation', 'void');

		// Setup the Request Data
		const requestData: RequestInit = {
			method: 'POST',
			body: JSON.stringify({ ...this.toJSON(), sparse: true }),
		};

		// Void the CreditMemo
		const { responseData } = await this.apiClient.runRequest(url.href, requestData);

		// Extract the CreditMemo from the response
		const creditMemoData = responseData?.CreditMemo?.[0] || responseData?.CreditMemo || responseData;

		// Assign the Properties
		if (creditMemoData) Object.assign(this, creditMemoData);
	}
}

// Setup the Creation Data
export type CreditMemoCreationData = {
	CustomerRef: ReferenceType;
	Line: CreditMemoLine[];
};
