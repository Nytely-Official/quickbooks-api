import type { BillableStatus, MarkupInfo, MetaData, ReferenceType } from "./defs";
import type { GlobalTaxCalculation, LinkedTxn, TxnTaxDetail } from "./estimate";

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
	Line: Array<ItemBasedExpenseLine | AccountBasedExpenseLine>;

	/**
	 * Version number used for optimistic locking.
	 * Incremented on modification.
	 * @systemDefined
	 * @requiredForUpdate
	 */
	readonly SyncToken: string;

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

export type ItemBasedExpenseLine = {
	/**
	 * The Id of the line item.
	 * If Id > 0 and exists, treated as update for the line item.
	 * If missing, <= 0, or non-existent, treated as create for the line item.
	 * Available in all objects that use lines and support update.
	 * @requiredForUpdate
	 * @systemDefined
	 */
	readonly Id?: string;

	/**
	 * Detail object specific to ItemBasedExpense lines.
	 */
	ItemBasedExpenseLineDetail: ItemBasedExpenseLineDetail;

	/**
	 * The amount of the line item.
	 * Max 15 digits in 10.5 format.
	 */
	Amount: number;

	/**
	 * Set to ItemBasedExpenseLineDetail for this type of line.
	 * LineDetailTypeEnum
	 * Required.
	 */
	DetailType: "ItemBasedExpenseLineDetail";

	/**
	 * Zero or more transactions linked to this line.
	 */
	LinkedTxn?: LinkedTxn[];

	/**
	 * Free form text description of the line item that appears in the printed record.
	 * @max 4000 characters
	 */
	Description?: string;

	/**
	 * Position of the line in the collection of transaction lines. Positive integer.
	 */
	LineNum?: number;
}

export type ItemBasedExpenseLineDetail = {
	/**
	 * The total amount of the line item including tax.
	 * @minorVersion 1
	 */
	TaxInclusiveAmt?: number;

	/**
	 * Reference to the Item.
	 */
	ItemRef?: ReferenceType;

	/**
	 * Reference to a customer or job.
	 */
	CustomerRef?: ReferenceType;

	/**
	 * Reference to the PriceLevel of the service or item for the line.
	 */
	PriceLevelRef?: ReferenceType;

	/**
	 * Reference to the Class associated with the expense.
	 */
	ClassRef?: ReferenceType;

	/**
	 * Reference to the TaxCode for this item.
	 */
	TaxCodeRef?: ReferenceType;

	/**
	 * Markup information for the expense.
	 */
	MarkupInfo?: MarkupInfo;

	/**
	 * The billable status of the expense.
	 * Valid values: Billable, NotBillable, HasBeenBilled
	 * Read-only.
	 */
	readonly BillableStatus?: BillableStatus;

	/**
	 * Number of items for the line.
	 */
	Qty?: number;

	/**
	 * Unit price of the item (home currency). If used for a discount or tax rate,
	 * express the percentage as a fraction (e.g., 0.4 for 40% tax).
	 */
	UnitPrice?: number;
}

export type AccountBasedExpenseLine = {
	/**
	 * The Id of the line item.
	 * If Id > 0 and exists, treated as update for the line item.
	 * If missing, <= 0, or non-existent, treated as create for the line item.
	 * Available in all objects that use lines and support update.
	 * @requiredForUpdate
	 * @systemDefined
	 */
	readonly Id?: string;

	/**
	 * Set to AccountBasedExpenseLineDetail for this type of line.
	 * LineDetailTypeEnum
	 * Required.
	 */
	DetailType: "AccountBasedExpenseLineDetail";

	/**
	 * The amount of the line item.
	 * Max 15 digits in 10.5 format.
	 * Required.
	 */
	Amount: number;

	/**
	 * Account-based expense detail for this line.
	 * Required.
	 */
	AccountBasedExpenseLineDetail: AccountBasedExpenseLineDetail;

	/**
	 * Zero or more PurchaseOrder transactions linked to this Bill line.
	 * LinkedTxn.TxnType should be PurchaseOrder.
	 */
	LinkedTxn?: LinkedTxn[];

	/**
	 * Free form text description of the line item that appears in the printed record.
	 * @max 4000 characters
	 */
	Description?: string;

	/**
	 * Position of the line in the collection of transaction lines. Positive integer.
	 */
	LineNum?: number;
}

export type AccountBasedExpenseLineDetail = {
	/**
	 * Reference to the Expense account associated with this item.
	 * Required.
	 */
	AccountRef: ReferenceType;

	/**
	 * Sales tax paid as part of the expense.
	 */
	TaxAmount?: number;

	/**
	 * Total amount of the line including tax.
	 * @minorVersion 1
	 */
	TaxInclusiveAmt?: number;

	/**
	 * Reference to the Class associated with the expense.
	 */
	ClassRef?: ReferenceType;

	/**
	 * TaxCode associated with the sales tax for the expense.
	 */
	TaxCodeRef?: ReferenceType;

	/**
	 * Markup information for the expense.
	 */
	MarkupInfo?: MarkupInfo;

	/**
	 * The billable status of the expense.
	 * Read-only. Valid: Billable, NotBillable, HasBeenBilled
	 */
	readonly BillableStatus?: BillableStatus;

	/**
	 * Reference to the Customer associated with the expense.
	 */
	CustomerRef?: ReferenceType;
}

export type { Bill as default };