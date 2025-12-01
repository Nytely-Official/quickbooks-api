// Import the Types
import { ApiClient } from '../../packages/api/api-client';
import { ReferenceType, ModificationMetadata, QuickbooksError, LinkedTxn } from '../types';

/**
 * Payment Line
 */
export interface PaymentLine {
	Amount: number;
	LineEx?: {
		any?: Array<{
			name: string;
			nil: boolean;
			value: {
				Name: string;
				Value: string;
			};
			declaredType: string;
			scope: string;
			globalScope: boolean;
			typeSubstituted: boolean;
		}>;
	};
	LinkedTxn: LinkedTxn[];
}

/**
 * Payment
 *
 * @description
 * The Payment Object
 *
 * @see {@link https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/payment}
 */
export class Payment {
	/**
	 * @description The API client used to make requests to the API to manage the Payment object
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
	 * @description Unapplied amount (read-only)
	 * @readonly
	 */
	public readonly UnappliedAmt?: number;

	// Setup the Required Properties
	/**
	 * @description Customer reference (required)
	 * @filterable
	 */
	public CustomerRef: ReferenceType;

	/**
	 * @description Deposit to account reference (required)
	 */
	public DepositToAccountRef: ReferenceType;

	/**
	 * @description Transaction line items (required)
	 * @required
	 */
	public Line: PaymentLine[];

	// Setup the Optional Properties
	/**
	 * @description Transaction date (yyyy-MM-dd)
	 * @filterable
	 * @sortable
	 */
	public TxnDate?: string;

	/**
	 * @description Process payment immediately
	 */
	public ProcessPayment?: boolean;

	/**
	 * @description Project reference
	 * @filterable
	 */
	public ProjectRef?: ReferenceType;

	/**
	 * @description Domain of the data source
	 */
	public domain?: string;

	/**
	 * @description Sparse update flag
	 */
	public sparse?: boolean;

	/**
	 * @description Constructor for Payment
	 * @param apiClient - The API client
	 * @param paymentCreationData - The data for the payment
	 */
	constructor(apiClient: ApiClient, paymentCreationData: PaymentCreationData) {
		// Set the API Client
		this.apiClient = apiClient;

		// Initialize the System Defined Properties
		this.Id = null!;
		this.SyncToken = null!;

		// Build the Required Properties
		this.CustomerRef = paymentCreationData?.CustomerRef ?? null!;
		this.DepositToAccountRef = paymentCreationData?.DepositToAccountRef ?? null!;
		this.Line = paymentCreationData?.Line ?? [];
	}

	/**
	 * @description Set the API Client
	 * @param apiClient - The API client
	 */
	public setApiClient(apiClient: ApiClient) {
		this.apiClient = apiClient;
	}

	/**
	 * @description Reload the Payment Data
	 * @throws {QuickbooksError} If the Payment was not found
	 */
	public async reload() {
		// Get the Payment by ID
		const result = await this.apiClient.payments.getPaymentById(this.Id);

		// Check if the Payment was not Found
		if (!result.payment) throw new QuickbooksError('Payment not found', await ApiClient.getIntuitErrorDetails(null));

		// Assign the Properties
		Object.assign(this, result.payment);
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
	 * @description Updates or creates (if the Id is not set) the Payment
	 */
	public async save() {
		// Get the Payment URL
		const url = await this.apiClient.payments.getUrl();

		// Setup the Request Data
		const requestData: RequestInit = {
			method: 'POST',
			body: JSON.stringify({ ...this.toJSON(), sparse: true }),
		};

		// Update the Payment
		const { responseData } = await this.apiClient.runRequest(url.href, requestData);

		// Extract the Payment from the response (QuickBooks returns { Payment: {...} } or wrapped format)
		const paymentData = responseData?.Payment?.[0] || responseData?.Payment || responseData;

		// Assign the Properties
		Object.assign(this, paymentData);
	}

	/**
	 * @description Downloads the Payment as a PDF
	 * @returns {Promise<Blob>} The PDF file as a Blob
	 * @throws {QuickbooksError} If the Payment ID is not set or the download fails
	 */
	public async downloadPDF(): Promise<Blob> {
		// Check if the Payment has an ID
		if (!this.Id) throw new QuickbooksError('Payment must be saved before downloading PDF', await ApiClient.getIntuitErrorDetails(null));

		// Get the Payment URL and append /pdf
		const url = await this.apiClient.payments.getUrl();
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
	 * @description Voids the Payment
	 * @throws {QuickbooksError} If the Payment ID is not set or the void fails
	 */
	public async void() {
		// Check if the Payment has an ID
		if (!this.Id) throw new QuickbooksError('Payment must be saved before voiding', await ApiClient.getIntuitErrorDetails(null));

		// Get the Payment URL and append operation=void
		const url = await this.apiClient.payments.getUrl();
		url.pathname = `${url.pathname}/${this.Id}`;
		url.searchParams.set('operation', 'void');

		// Setup the Request Data
		const requestData: RequestInit = {
			method: 'POST',
			body: JSON.stringify({ ...this.toJSON(), sparse: true }),
		};

		// Void the Payment
		const { responseData } = await this.apiClient.runRequest(url.href, requestData);

		// Extract the Payment from the response
		const paymentData = responseData?.Payment?.[0] || responseData?.Payment || responseData;

		// Assign the Properties
		if (paymentData) Object.assign(this, paymentData);
	}
}

// Setup the Creation Data
export type PaymentCreationData = {
	CustomerRef: ReferenceType;
	DepositToAccountRef: ReferenceType;
	Line: PaymentLine[];
};
