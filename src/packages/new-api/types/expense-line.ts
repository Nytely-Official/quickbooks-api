import type {
	BillableStatus,
	LinkedTxn,
	MarkupInfo,
	ReferenceType
} from "./defs";

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

export type ExpenseLine = ItemBasedExpenseLine | AccountBasedExpenseLine;

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

export type { ExpenseLine as default };