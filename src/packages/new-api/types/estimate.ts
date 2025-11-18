import type { CustomField, EmailAddress, EmailStatus, GlobalTaxCalculation, LinkedTxn, MetaData, PhysicalAddress, ReferenceType, TxnTaxDetail } from "./defs";
import type TransactionLine from "./transaction-line";

/**
 * Estimate
 *
 * @see {@link https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/estimate}
 */
export type Estimate = {
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
	readonly SyncToken?: string;

	/**
	 * Address where the goods are shipped from (or sale location when no shipping).
	 * Required for accurate sales tax when automated tax is enabled.
	 * For international addresses - pass countries as ISO alpha-3 or full name.
	 * @minorVersion 35
	 */
	ShipFromAddr?: PhysicalAddress;

	/**
	 * Currency for all amounts on this transaction.
	 * Conditionally required if multicurrency is enabled.
	 */
	CurrencyRef?: ReferenceType;

	/**
	 * Method in which tax is applied (non-US companies).
	 * Allowed: TaxExcluded | TaxInclusive | NotApplicable
	 * Conditionally required.
	 */
	GlobalTaxCalculation?: GlobalTaxCalculation;

	/**
	 * Reference to the Project associated with this transaction.
	 * @minorVersion 69
	 * @filterable
	 * Conditionally required.
	 */
	ProjectRef?: ReferenceType;

	/**
	 * Email address where the estimate is sent.
	 * Required if EmailStatus=NeedToSend.
	 */
	BillEmail?: EmailAddress;

	/**
	 * The transaction date (posting date for posting transactions).
	 * Uses server date if not supplied.
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
	 * Reference to the Class associated with the transaction.
	 */
	ClassRef?: ReferenceType;

	/**
	 * Printing status.
	 */
	PrintStatus?: PrintStatus;

	/**
	 * Up to three custom fields for the transaction.
	 */
	CustomField?: CustomField[];

	/**
	 * Reference to the sales term associated with the transaction.
	 */
	SalesTermRef?: ReferenceType;

	/**
	 * Estimate status: Accepted | Closed | Pending | Rejected | Converted
	 */
	TxnStatus?: EstimateStatus;

	/**
	 * Zero or more Invoice objects related to this transaction.
	 */
	LinkedTxn?: LinkedTxn[];

	/**
	 * Date estimate was accepted.
	 */
	AcceptedDate?: string;

	/**
	 * Date by which estimate must be accepted before invalidation.
	 */
	ExpirationDate?: string;

	/**
	 * Account location (locale-specific).
	 * @minorVersion 4
	 */
	TransactionLocationType?: string;

	/**
	 * Date when payment is due (derived from SalesTermRef and TxnDate if absent).
	 * @filterable
	 * @sortable
	 */
	DueDate?: string;

	/**
	 * Descriptive metadata (read-only).
	 */
	MetaData?: MetaData;

	/**
	 * Reference number for the transaction.
	 * @max 21 characters
	 * @filterable
	 * @sortable
	 */
	DocNumber?: string;

	/**
	 * Organization-private note about the transaction.
	 * @max 4000 characters
	 */
	PrivateNote?: string;

	/**
	 * Individual line items of a transaction.
	 * Valid Line types include: SalesItemLine, GroupLine, DescriptionOnlyLine,
	 * DiscountLine and SubTotalLine (overall transaction).
	 * If the transaction is taxable there is a limit of 750 lines per transaction.
	 */
	Line?: TransactionLine[];

	/**
	 * User-entered message to the customer (visible on transactions).
	 */
	CustomerMemo?: { value?: string };

	/**
	 * Email status of the estimate.
	 */
	EmailStatus?: EmailStatus;

	/**
	 * Taxes charged on the transaction as a whole.
	 */
	TxnTaxDetail?: TxnTaxDetail;

	/**
	 * Name of customer who accepted the estimate.
	 */
	AcceptedBy?: string;

	/**
	 * Home currency units per one unit of CurrencyRef (multicurrency only).
	 */
	ExchangeRate?: number;

	/**
	 * Ship-to address.
	 */
	ShipAddr?: PhysicalAddress;

	/**
	 * Department/location of the transaction.
	 */
	DepartmentRef?: ReferenceType;

	/**
	 * Ship method associated with the transaction.
	 */
	ShipMethodRef?: ReferenceType;

	/**
	 * Bill-to address.
	 */
	BillAddr?: PhysicalAddress;

	/**
	 * If false or null, calculate tax first then apply discount.
	 * If true, subtract discount first then calculate tax.
	 */
	ApplyTaxAfterDiscount?: boolean;

	/**
	 * Total amount including charges, allowances, and taxes.
	 * Calculated by QuickBooks.
	 * @systemDefined
	 */
	readonly TotalAmt?: number;

	/**
	 * Reference to the Recurring Transaction template this Estimate was created from.
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
	 * Total amount in the home currency (multicurrency only).
	 * Includes charges, allowances and taxes. Calculated by QuickBooks.
	 * @systemDefined
	 */
	readonly HomeTotalAmt?: number;

	/**
	 * Denotes how ShipAddr is stored: formatted or unformatted.
	 * @systemDefined
	 */
	readonly FreeFormAddress?: boolean;

	/**
	 * Email delivery information (when send operation is used).
	 */
	DeliveryInfo?: {
		DeliveryType?: string;
	};
}

/**
 * Estimate subtypes reused by other documents
 */
export type EstimateStatus = 'Accepted' | 'Closed' | 'Pending' | 'Rejected' | 'Converted';


export type LineDetailType = NonNullable<Estimate['Line']>[number]['DetailType'];
export type PrintStatus = 'NotSet' | 'NeedToPrint' | 'PrintComplete';

export type { Estimate as default };