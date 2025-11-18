import type {
	GlobalTaxCalculation,
	LinkedTxn,
	MetaData,
	ReferenceType,
	TxnTaxDetail
} from "./defs";
import type ExpenseLine from "./expense-line";

export type Bill = {
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
	 * Reference to the vendor for this transaction.
	 * @filterable
	 * @sortable
	 * Required.
	 */
	VendorRef: ReferenceType;

	/**
	 * Individual line items of a transaction.
	 * Valid `Line` types include: `ItemBasedExpenseLine` and `AccountBasedExpenseLine`.
	 * Required.
	 */
	Line: ExpenseLine[];

	/**
	 * Version number used for optimistic locking.
	 * Incremented on modification.
	 * @systemDefined
	 * @requiredForUpdate
	 */
	readonly SyncToken?: string;

	/**
	 * Reference to the currency in which amounts are expressed.
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
	 * The transaction date.
	 * If not supplied, server current date is used.
	 * @filterable
	 * @sortable
	 * @defaultSortOrder ASC
	 */
	TxnDate?: string;

	/**
	 * AP account that this bill is credited to.
	 * @filterable
	 * @sortable
	 */
	APAccountRef?: ReferenceType;

	/**
	 * Reference to the Term associated with the transaction.
	 * @filterable
	 * @sortable
	 */
	SalesTermRef?: ReferenceType;

	/**
	 * Zero or more related transactions linked to this Bill.
	 */
	LinkedTxn?: LinkedTxn[];

	/**
	 * Total amount of the transaction including charges, allowances, and taxes.
	 * Calculated by QuickBooks business logic.
	 * @filterable
	 * @sortable
	 */
	readonly TotalAmt?: number;

	/**
	 * The account location (locale specific).
	 * @minorVersion 4
	 */
	TransactionLocationType?: string;

	/**
	 * Date when payment is due. If not provided, derived from SalesTermRef and TxnDate.
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
	 * @defaultSortOrder ASC
	 */
	DocNumber?: string;

	/**
	 * Organization-private note about the transaction.
	 * @max 4000 characters
	 */
	PrivateNote?: string;

	/**
	 * Details of taxes charged on the transaction as a whole.
	 */
	TxnTaxDetail?: TxnTaxDetail;

	/**
	 * The number of home currency units per one unit of CurrencyRef.
	 * Applicable if multicurrency is enabled.
	 */
	ExchangeRate?: number;

	/**
	 * Reference to a Department specifying the location of the transaction.
	 */
	DepartmentRef?: ReferenceType;

	/**
	 * Include the supplier in the annual TPAR (AU).
	 * @minorVersion 40
	 */
	IncludeInAnnualTPAR?: boolean;

	/**
	 * Amount in Balance expressed in terms of the home currency.
	 * Calculated by QuickBooks business logic.
	 * @minorVersion 3
	 */
	readonly HomeBalance?: number;

	/**
	 * Reference to the Recurring Transaction template the Bill was created from.
	 * @minorVersion 52
	 */
	readonly RecurDataRef?: ReferenceType;

	/**
	 * The balance reflecting payments made against the transaction.
	 * Initially set to TotalAmt. A Balance of 0 indicates fully paid.
	 * Calculated by QuickBooks business logic.
	 * @filterable
	 */
	readonly Balance?: number;
}


export type { Bill as default };