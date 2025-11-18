import type { MetaData, ReferenceType, EmailAddress } from "./defs";
import type {
	PhysicalAddress,
	LinkedTxn,
	TxnTaxDetail,
	EmailStatus,
	CustomField,
	GlobalTaxCalculation,
} from "./estimate";

/**
 * Invoice
 *
 * @see {@link https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/invoice}
 */
export type Invoice = {
	/**
	 * Unique identifier for this object. Sort order is ASC by default.
	 * @filterable
	 * @sortable
	 * @defaultSortOrder ASC
	 * @systemDefined
	 * @requiredForUpdate
	 */
	readonly Id: string;

	/**
	 * Individual line items of a transaction.
	 * Valid Line types include: SalesItemLine, GroupLine, DescriptionOnlyLine,
	 * DiscountLine and SubTotalLine.
	 * If the transaction is taxable there is a limit of 750 lines per transaction.
	 * Required.
	 */
	Line: InvoiceLine[];

	/**
	 * Reference to a customer or job.
	 * @filterable
	 * Required.
	 */
	CustomerRef: ReferenceType;

	/**
	 * Version number used for optimistic locking.
	 * Incremented on modification.
	 * @systemDefined
	 * @requiredForUpdate
	 */
	readonly SyncToken: string;

	/**
	 * Identifies the address where the goods are shipped from.
	 * Required for accurate sales tax when automated sales tax is enabled.
	 * International addresses should use ISO alpha-3 or full country name.
	 * @minorVersion 35
	 * Conditionally required.
	 */
	ShipFromAddr?: PhysicalAddress;

	/**
	 * Reference to the currency for this transaction.
	 * Conditionally required if multicurrency is enabled.
	 */
	CurrencyRef?: ReferenceType;

	/**
	 * Method in which tax is applied.
	 * Allowed: TaxExcluded, TaxInclusive, NotApplicable.
	 * Not applicable to US companies; required for non-US companies.
	 * Conditionally required.
	 */
	GlobalTaxCalculation?: GlobalTaxCalculation;

	/**
	 * Reference number for the transaction.
	 * @max 21 characters
	 * @filterable
	 * @sortable
	 * Conditionally required (see CustomTxnNumber behavior per locale).
	 */
	DocNumber?: string;

	/**
	 * Reference to the Project associated with this transaction.
	 * @minorVersion 69
	 * @filterable
	 * Conditionally required.
	 */
	ProjectRef?: ReferenceType;

	/**
	 * Email address where the invoice is sent.
	 * Required if EmailStatus=NeedToSend.
	 */
	BillEmail?: EmailAddress;

	/**
	 * The transaction date.
	 * yyyy/MM/dd format. Used as posting date for posting transactions.
	 * If not supplied, server current date is used.
	 * @filterable
	 * @sortable
	 * @defaultSortOrder ASC
	 */
	TxnDate?: string;

	/**
	 * Date for delivery of goods or services.
	 */
	ShipDate?: string;

	/**
	 * Shipping provider tracking number.
	 */
	TrackingNum?: string;

	/**
	 * Reference to the Class associated with the transaction.
	 */
	ClassRef?: ReferenceType;

	/**
	 * Printing status of the invoice.
	 * Valid values: NotSet, NeedToPrint, PrintComplete
	 */
	PrintStatus?: PrintStatus;

	/**
	 * Reference to the sales term associated with the transaction.
	 * @filterable
	 */
	SalesTermRef?: ReferenceType;

	/**
	 * Used internally to specify originating source of a credit card transaction.
	 */
	TxnSource?: string;

	/**
	 * Zero or more related transactions to this Invoice object.
	 */
	LinkedTxn?: LinkedTxn[];

	/**
	 * Account to which money is deposited.
	 */
	DepositToAccountRef?: ReferenceType;

	/**
	 * If true, allow invoice to be paid with online bank transfers (ACH).
	 */
	AllowOnlineACHPayment?: boolean;

	/**
	 * The account location (locale specific).
	 * @minorVersion 4
	 */
	TransactionLocationType?: string;

	/**
	 * Date when payment is due.
	 * If not provided, SalesTermRef determines due date from TxnDate.
	 * @filterable
	 * @sortable
	 */
	DueDate?: string;

	/**
	 * Descriptive metadata (read-only).
	 */
	MetaData?: MetaData;

	/**
	 * Organization-private note about the transaction.
	 * @max 4000 characters
	 */
	PrivateNote?: string;

	/**
	 * Carbon copy e-mail address where the invoice is sent.
	 * @minorVersion 8
	 */
	BillEmailCc?: EmailAddress;

	/**
	 * User-entered message to the customer; visible on transactions.
	 */
	CustomerMemo?: { value?: string };

	/**
	 * Email status of the invoice.
	 * Valid values: NotSet, NeedToSend, EmailSent
	 */
	EmailStatus?: EmailStatus;

	/**
	 * The number of home currency units per one unit of CurrencyRef.
	 * Applicable if multicurrency is enabled.
	 */
	ExchangeRate?: number;

	/**
	 * The deposit made towards this invoice.
	 */
	Deposit?: number;

	/**
	 * Details of taxes charged on the transaction as a whole.
	 */
	TxnTaxDetail?: TxnTaxDetail;

	/**
	 * If true, allow invoice to be paid with online credit card payments.
	 */
	AllowOnlineCreditCardPayment?: boolean;

	/**
	 * Up to three custom fields for the transaction.
	 */
	CustomField?: CustomField[];

	/**
	 * Address where the goods must be shipped.
	 */
	ShipAddr?: PhysicalAddress;

	/**
	 * A reference to a Department specifying the location of the transaction.
	 */
	DepartmentRef?: ReferenceType;

	/**
	 * Blind carbon copy e-mail address where the invoice is sent.
	 * @minorVersion 8
	 */
	BillEmailBcc?: EmailAddress;

	/**
	 * Reference to the ShipMethod associated with the transaction.
	 */
	ShipMethodRef?: ReferenceType;

	/**
	 * Bill-to address of the Invoice.
	 */
	BillAddr?: PhysicalAddress;

	/**
	 * If false or null, calculate the sales tax first, then apply the discount.
	 * If true, subtract the discount first and then calculate the sales tax.
	 */
	ApplyTaxAfterDiscount?: boolean;

	/**
	 * Amount in Balance expressed in terms of the home currency.
	 * Calculated by QuickBooks business logic.
	 * @minorVersion 3
	 */
	readonly HomeBalance?: number;

	/**
	 * Email delivery information.
	 * Returned when email is delivered via send operation.
	 */
	readonly DeliveryInfo?: DeliveryInfo;

	/**
	 * Total amount of the transaction including charges, allowances, and taxes.
	 * Calculated by QuickBooks business logic.
	 * @systemDefined
	 */
	readonly TotalAmt?: number;

	/**
	 * Sharable link for the invoice sent to external customers.
	 * Generated only for invoices with online payment enabled and a valid email.
	 * Include query param `include=invoiceLink` to get the link in query response.
	 * @minorVersion 36
	 * @systemDefined
	 */
	readonly InvoiceLink?: string;

	/**
	 * Reference to the Recurring Transaction template the Invoice was created from.
	 * @minorVersion 52
	 */
	readonly RecurDataRef?: ReferenceType;

	/**
	 * Reference to the Tax Exemption associated with this object.
	 * Available for companies with automated sales tax enabled.
	 * @minorVersion 21
	 * @systemDefined
	 */
	readonly TaxExemptionRef?: ReferenceType;

	/**
	 * The balance reflecting payments made against the transaction.
	 * Initially set to TotalAmt. A Balance of 0 indicates fully paid.
	 * Calculated by QuickBooks business logic.
	 * @filterable
	 * @sortable
	 */
	readonly Balance?: number;

	/**
	 * Total amount of the transaction in the home currency.
	 * Includes charges, allowances and taxes. Calculated by QuickBooks business logic.
	 * Applicable if multicurrency is enabled for the company.
	 * @systemDefined
	 */
	readonly HomeTotalAmt?: number;

	/**
	 * Denotes how ShipAddr is stored: formatted or unformatted.
	 * @systemDefined
	 */
	readonly FreeFormAddress?: boolean;

	/**
	 * Deprecated legacy flag to allow online payments.
	 * @deprecated
	 */
	AllowOnlinePayment?: boolean;

	/**
	 * Deprecated legacy flag to allow payments from legacy Intuit Payment Network.
	 * Must always be set to false.
	 * @deprecated
	 */
	AllowIPNPayment?: boolean;
};

export type PrintStatus = 'NotSet' | 'NeedToPrint' | 'PrintComplete';

export type DeliveryInfo = {
	DeliveryType?: string;
};

export type InvoiceLine = {
	readonly Id?: string;
	DetailType?: string;
	Amount?: number;
	Description?: string;
};

export type { Invoice as default };