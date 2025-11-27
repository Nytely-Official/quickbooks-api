// Imports
import { ApiClient } from '../../app';
import {
	EmailStatus,
	PhysicalAddress,
	SalesItemLine,
	GroupLine,
	DescriptionOnlyLine,
	DiscountLine,
	SubTotalLine,
	ReferenceType,
	GlobalTaxCalculation,
	EmailAddress,
	ModificationMetadata,
	DeliveryInfo,
	PrintStatus,
	LinkedTxn,
	MemoRef,
	TxnTaxDetail,
	CustomField,
	QuickbooksError,
} from '../types';

/**
 * Invoice
 *
 * @description The Invoice Object
 */
export class Invoice {
	/**
	 * @description The API client used to make requests to the API to manage the Customer object
	 */
	private apiClient: ApiClient;

	// Setup the Required Properties
	/**
	 * @description Transaction line items (required)
	 * @required
	 * @maxItems 750 when taxable
	 */
	public Line: Array<SalesItemLine | GroupLine | DescriptionOnlyLine | DiscountLine | SubTotalLine>;

	/**
	 * @description Customer/job reference (required)
	 * @filterable
	 */
	public CustomerRef: ReferenceType;

	/**
	 * @description Shipping origin address (required for automated tax)
	 * @minorVersion 35
	 */
	public ShipFromAddr: PhysicalAddress;

	/**
	 * @description Currency reference (required if multicurrency enabled)
	 */
	public CurrencyRef: ReferenceType;

	/**
	 * @description Tax calculation method (required for non-US companies)
	 * @allowedValues TaxExcluded, TaxInclusive, NotApplicable
	 */
	public GlobalTaxCalculation: GlobalTaxCalculation;

	/**
	 * @description Project reference (required)
	 * @minorVersion 69
	 * @filterable
	 */
	public ProjectRef: ReferenceType;

	/**
	 * @description Billing email (required if EmailStatus=NeedToSend)
	 */
	public BillEmail: EmailAddress;

	// Setup the Readonly Properties
	/**
	 * @description Unique identifier (read-only, system defined)
	 * @requiredForUpdate
	 * @filterable
	 * @sortable
	 */
	public readonly Id: string;

	/**
	 * @description Version lock token (read-only, system defined)
	 * @requiredForUpdate
	 */
	public readonly SyncToken: string;

	/**
	 * @description Modification metadata (read-only)
	 */
	public readonly MetaData: ModificationMetadata;

	/**
	 * @description Home currency balance (read-only)
	 * @minorVersion 3
	 */
	public readonly HomeBalance: number;

	/**
	 * @description Delivery information (read-only)
	 */
	public readonly DeliveryInfo: DeliveryInfo;

	/**
	 * @description Total amount (read-only, system calculated)
	 */
	public readonly TotalAmt: number;

	/**
	 * @description Sharable invoice link (read-only)
	 * @minorVersion 36
	 */
	public readonly InvoiceLink: string;

	/**
	 * @description Recurring transaction reference (read-only)
	 * @minorVersion 52
	 */
	public readonly RecurDataRef: ReferenceType;

	/**
	 * @description Tax exemption reference (read-only)
	 * @minorVersion 21
	 */
	public readonly TaxExemptionRef: ReferenceType;

	/**
	 * @description Remaining balance (read-only)
	 * @filterable
	 * @sortable
	 */
	public readonly Balance: number;

	/**
	 * @description Home currency total (read-only)
	 */
	public readonly HomeTotalAmt: number;

	// Setup the Optional Properties
	/**
	 * @description Transaction date (yyyy/MM/dd)
	 * @filterable
	 * @sortable
	 */
	public TxnDate?: Date;

	/**
	 * @description Goods delivery date
	 */
	public ShipDate?: Date;

	/**
	 * @description Shipping tracking number
	 */
	public TrackingNum?: string;

	/**
	 * @description Printing status
	 * @allowedValues NotSet, NeedToPrint, PrintComplete
	 */
	public PrintStatus?: PrintStatus;

	/**
	 * @description Sales terms reference
	 * @filterable
	 */
	public SalesTermRef?: ReferenceType;

	/**
	 * @description Transaction source (internal use)
	 */
	public TxnSource?: string;

	/**
	 * @description Related transactions
	 * @maxItems 750
	 */
	public LinkedTxn?: Array<LinkedTxn>;

	/**
	 * @description Deposit account reference
	 */
	public DepositToAccountRef?: ReferenceType;

	/**
	 * @description Allow online ACH payments
	 */
	public AllowOnlineACHPayment?: boolean;

	/**
	 * @description Transaction location type
	 * @minorVersion 4
	 */
	public TransactionLocationType?: string;

	/**
	 * @description Payment due date
	 * @filterable
	 * @sortable
	 */
	public DueDate?: Date;

	/**
	 * @description Private transaction note (max 4000 chars)
	 */
	public PrivateNote?: string;

	/**
	 * @description CC email address
	 * @minorVersion 8
	 */
	public BillEmailCc?: EmailAddress;

	/**
	 * @description Customer-facing memo
	 */
	public CustomerMemo?: MemoRef;

	/**
	 * @description Email status
	 * @allowedValues NotSet, NeedToSend, EmailSent
	 */
	public EmailStatus?: EmailStatus;

	/**
	 * @description Currency exchange rate
	 */
	public ExchangeRate?: number;

	/**
	 * @description Deposit amount
	 */
	public Deposit?: number;

	/**
	 * @description Tax details
	 */
	public TxnTaxDetail?: TxnTaxDetail;

	/**
	 * @description Allow credit card payments
	 */
	public AllowOnlineCreditCardPayment?: boolean;

	/**
	 * @description Custom fields
	 */
	public CustomField?: CustomField;

	/**
	 * @description Shipping address
	 */
	public ShipAddr?: PhysicalAddress;

	/**
	 * @description Department reference
	 */
	public DepartmentRef?: ReferenceType;

	/**
	 * @description BCC email address
	 * @minorVersion 8
	 */
	public BillEmailBcc?: EmailAddress;

	/**
	 * @description Shipping method reference
	 */
	public ShipMethodRef?: ReferenceType;

	/**
	 * @description Billing address
	 */
	public BillAddr?: PhysicalAddress;

	/**
	 * @description Tax calculation order
	 * @description true = apply discount before tax
	 */
	public ApplyTaxAfterDiscount?: Boolean;

	/**
	 * @description The constructor for the Invoice object
	 * @param apiClient The API client used to make requests to the API
	 * @param invoiceCreationData The data used to create the invoice
	 */
	constructor(apiClient: ApiClient, invoiceCreationData: InvoiceCreationData) {
		// Set the API Client
		this.apiClient = apiClient;

		// Set the Creation Data
		this.Line = invoiceCreationData?.Line ?? new Array();
		this.CustomerRef = invoiceCreationData?.CustomerRef ?? null!;
		this.ShipFromAddr = invoiceCreationData?.ShipFromAddr ?? null!;
		this.CurrencyRef = invoiceCreationData?.CurrencyRef ?? null!;
		this.GlobalTaxCalculation = invoiceCreationData?.GlobalTaxCalculation ?? null!;
		this.ProjectRef = invoiceCreationData?.ProjectRef ?? null!;
		this.BillEmail = invoiceCreationData?.BillEmail ?? null!;

		// Set the Readonly Properties
		this.Id = null!;
		this.SyncToken = null!;
		this.MetaData = null!;
		this.HomeBalance = null!;
		this.DeliveryInfo = null!;
		this.TotalAmt = null!;
		this.InvoiceLink = null!;
		this.RecurDataRef = null!;
		this.TaxExemptionRef = null!;
		this.Balance = null!;
		this.HomeTotalAmt = null!;
	}

	/**
	 * @description Set the API Client
	 * @param apiClient - The API client
	 */
	public setApiClient(apiClient: ApiClient) {
		this.apiClient = apiClient;
	}

	/**
	 * @description Reload the Invoice Data
	 * @throws {QuickbooksError} If the Invoice was not found
	 */
	public async reload() {
		// Get the Invoice by ID
		const invoice = await this.apiClient.invoices.getInvoiceById(this.Id);

		// Check if the Invoice was not Found
		if (!invoice) throw new QuickbooksError('Invoice not found', await ApiClient.getIntuitErrorDetails(null));

		// Assign the Properties
		Object.assign(this, invoice);
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
	 * @description Updates or creates (if the Id is not set) the Invoice
	 */
	public async save() {
		// Get the Invoice URL
		const url = await this.apiClient.invoices.getUrl();

		// Setup the Request Data
		const requestData: RequestInit = {
			method: 'POST',
			body: JSON.stringify({ ...this.toJSON(), sparse: true }),
		};

		// Update the Invoice
		const response = await this.apiClient.runRequest(url.href, requestData);

		// Assign the Properties
		Object.assign(this, response);
	}
}

// Setup the Creation Data
export type InvoiceCreationData = {
	Line: Array<SalesItemLine | GroupLine | DescriptionOnlyLine | DiscountLine | SubTotalLine>;
	CustomerRef: ReferenceType;
	ShipFromAddr: PhysicalAddress;
	CurrencyRef: ReferenceType;
	GlobalTaxCalculation: GlobalTaxCalculation;
	ProjectRef: ReferenceType;
	BillEmail: EmailAddress;
};
