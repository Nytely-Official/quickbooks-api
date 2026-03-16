import type {
	ReferenceType,
	SalesItemLine,
	GroupLine,
	DescriptionOnlyLine,
	DiscountLine,
	SubTotalLine,
	ModificationMetadata,
	EmailAddress,
	PhysicalAddress,
	TxnTaxDetail,
	CustomField,
	LinkedTxn,
} from '../types';
import type { BillLine } from '../classes/bill';

/**
 * Recurring transaction type — which underlying entity this template wraps
 */
export type RecurringTxnType = 'Invoice' | 'Bill' | 'SalesReceipt' | 'CreditMemo' | 'Estimate' | 'Purchase' | 'Deposit' | 'RefundReceipt' | 'JournalEntry' | 'VendorCredit' | 'Transfer';

/**
 * How QBO handles the recurring transaction
 */
export type RecurType = 'Automated' | 'Reminded' | 'Unscheduled';

/**
 * Schedule interval type
 */
export type IntervalType = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

/**
 * Schedule configuration for recurring transactions
 */
export interface ScheduleInfo {
	/**
	 * Schedule interval type
	 */
	IntervalType: IntervalType;

	/**
	 * Number of intervals between occurrences
	 */
	NumInterval: number;

	/**
	 * Day of month (1–31) for Monthly schedules
	 */
	DayOfMonth?: number;

	/**
	 * Day of week for Weekly schedules
	 */
	DayOfWeek?: string;

	/**
	 * Start date (yyyy-MM-dd)
	 */
	StartDate: string;

	/**
	 * Next scheduled date (yyyy-MM-dd, system-managed)
	 */
	NextDate?: string;

	/**
	 * End date (yyyy-MM-dd, optional)
	 */
	EndDate?: string;

	/**
	 * Maximum number of occurrences (0 = unlimited)
	 */
	MaxOccurrences?: number;

	/**
	 * Days before due date to create the transaction
	 */
	DaysBefore?: number;
}

/**
 * Recurring schedule configuration
 */
export interface RecurringInfo {
	/**
	 * Template name displayed in QBO
	 */
	Name: string;

	/**
	 * How the schedule is processed
	 */
	RecurType: RecurType;

	/**
	 * Whether the schedule is active
	 */
	Active: boolean;

	/**
	 * Schedule timing configuration
	 */
	ScheduleInfo: ScheduleInfo;
}

/**
 * Invoice fields used inside a recurring transaction template
 */
export interface RecurringInvoice {
	Id?: string;
	SyncToken?: string;
	MetaData?: ModificationMetadata;
	CustomerRef: ReferenceType;
	Line: Array<SalesItemLine | GroupLine | DescriptionOnlyLine | DiscountLine | SubTotalLine>;
	DueDate?: string;
	TxnDate?: string;
	DocNumber?: string;
	PrivateNote?: string;
	BillEmail?: EmailAddress;
	BillAddr?: PhysicalAddress;
	ShipAddr?: PhysicalAddress;
	DepartmentRef?: ReferenceType;
	SalesTermRef?: ReferenceType;
	TxnTaxDetail?: TxnTaxDetail;
	CustomField?: CustomField;
	LinkedTxn?: LinkedTxn[];
	CurrencyRef?: ReferenceType;
	AllowOnlineACHPayment?: boolean;
	AllowOnlineCreditCardPayment?: boolean;
	CustomerMemo?: { value: string };
	TotalAmt?: number;
	Balance?: number;
	domain?: string;
	sparse?: boolean;
}

/**
 * Bill fields used inside a recurring transaction template
 */
export interface RecurringBill {
	Id?: string;
	SyncToken?: string;
	MetaData?: ModificationMetadata;
	VendorRef: ReferenceType;
	Line?: BillLine[];
	DueDate?: string;
	TxnDate?: string;
	DocNumber?: string;
	PrivateNote?: string;
	APAccountRef?: ReferenceType;
	SalesTermRef?: ReferenceType;
	TxnTaxDetail?: TxnTaxDetail;
	CurrencyRef?: ReferenceType;
	DepartmentRef?: ReferenceType;
	TotalAmt?: number;
	Balance?: number;
	domain?: string;
	sparse?: boolean;
}

/**
 * The full RecurringTransaction object returned by QBO
 *
 * The transaction type is polymorphic — exactly one of Invoice, Bill, etc.
 * will be present depending on TxnType.
 */
export interface RecurringTransactionData {
	Id?: string;
	SyncToken?: string;
	MetaData?: ModificationMetadata;
	RecurringInfo: RecurringInfo;

	Invoice?: RecurringInvoice;
	Bill?: RecurringBill;

	domain?: string;
	sparse?: boolean;
}
