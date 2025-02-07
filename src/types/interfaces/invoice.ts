/**
 * The Invoice Object
 */
export interface Invoice {
	/**################### MAIN PROPERTIES ###################*/
	Id: string; // Required for update, read-only
	Line: (SalesItemLine | GroupLine | DescriptionOnlyLine | DiscountLine | SubTotalLine)[];
	CustomerRef: ReferenceType;
	SyncToken?: string; // Required for update, read-only
	ShipFromAddr?: PhysicalAddress; // Conditionally required
	CurrencyRef?: CurrencyRefType; // Conditionally required
	GlobalTaxCalculation?: "TaxExcluded" | "TaxInclusive" | "NotApplicable"; // Conditionally required
	DocNumber?: string; // Conditionally required (max 21 chars)
	ProjectRef?: ReferenceType; // Conditionally required (minorVersion: 69)
	BillEmail?: EmailAddress; // Conditionally required
	TxnDate?: string;
	ShipDate?: string;
	TrackingNum?: string;
	ClassRef?: ReferenceType;
	PrintStatus?: "NotSet" | "NeedToPrint" | "PrintComplete";
	SalesTermRef?: ReferenceType;
	TxnSource?: string;
	LinkedTxn?: LinkedTxn[];
	DepositToAccountRef?: ReferenceType;
	AllowOnlineACHPayment?: boolean;
	domain?: string;
	sparse?: boolean;
	TransactionLocationType?: string;
	DueDate?: string;
	MetaData?: ModificationMetaData;
	PrivateNote?: string; // max 4000 chars
	BillEmailCc?: EmailAddress;
	CustomerMemo?: MemoRef;
	EmailStatus?: "NotSet" | "NeedToSend" | "EmailSent";
	ExchangeRate?: number;
	Deposit?: number;
	TxnTaxDetail?: TxnTaxDetail;
	AllowOnlineCreditCardPayment?: boolean;
	CustomField?: CustomField[];
	ShipAddr?: PhysicalAddress;
	DepartmentRef?: ReferenceType;
	BillEmailBcc?: EmailAddress;
	ShipMethodRef?: ReferenceType;
	BillAddr?: PhysicalAddress;
	ApplyTaxAfterDiscount?: boolean;

	/**################### READ-ONLY PROPERTIES ###################*/
	HomeBalance?: number;
	DeliveryInfo?: DeliveryInfo;
	TotalAmt?: number;
	InvoiceLink?: string;
	RecurDataRef?: ReferenceType;
	TaxExemptionRef?: ReferenceType;
	Balance?: number;
	HomeTotalAmt?: number;
	FreeFormAddress?: boolean;

	/** @deprecated */
	AllowOnlinePayment?: boolean;

	/** @deprecated */
	AllowIPNPayment?: boolean;
}

/**################### Supporting Interfaces ###################*/
/**
 * The Reference Type
 */
interface ReferenceType {
	value: string;
	name?: string;
}

/**
 * The Physical Address Type
 */
interface PhysicalAddress {
	Id?: string;
	Line1?: string;
	Line2?: string;
	Line3?: string;
	Line4?: string;
	Line5?: string;
	City?: string;
	Country?: string;
	CountrySubDivisionCode?: string;
	PostalCode?: string;
	Lat?: string;
	Long?: string;
}

/**
 * The Email Address Type
 */
interface EmailAddress {
	Address?: string;
}

/**
 * The Line Type
 */
interface Line {
	// Base line properties would go here
}

/**
 * The Sales Item Line Type
 */
interface SalesItemLine extends Line {}

/**
 * The Group Line Type
 */
interface GroupLine extends Line {}

/**
 * The Description Only Line Type
 */
interface DescriptionOnlyLine extends Line {}

/**
 * The Discount Line Type
 */
interface DiscountLine extends Line {}

/**
 * The Sub Total Line Type
 */
interface SubTotalLine extends Line {}

/**
 * The Currency Reference Type
 */
interface CurrencyRefType extends ReferenceType {
	currencyCode?: string; // 3-letter ISO 4217 currency code
}

/**
 * The Linked Transaction Type
 */
interface LinkedTxn {
	TxnId: string;
	TxnType: "Payment" | "Estimate" | "TimeActivity" | "ReimburseCharge" | "ChargeCredit" | "StatementCharge";
}

/**
 * The Modification Meta Data Type
 */

interface ModificationMetaData {
	CreateTime?: string;
	LastUpdatedTime?: string;
	LastUpdatedBy?: string;
}

/**
 * The Memo Reference Type
 */
interface MemoRef {
	value: string;
}

/**
 * The Transaction Tax Detail Type
 */
interface TxnTaxDetail {
	TxnTaxCodeRef?: ReferenceType;
	TotalTax?: number;
	TaxLine?: TaxLine[];
	TaxLineTaxDetail?: TaxLineDetail[];
}

/**
 * The Custom Field Type
 */
interface CustomField {
	DefinitionId: string;
	Value: string;
}

/**
 * The Delivery Info Type
 */
interface DeliveryInfo {
	DeliveryType: "Email";
	DeliveryTime?: string;
	DeliveryError?: {
		ErrorCode?: string;
		ErrorMessage?: string;
	};
}

/**
 * The Tax Line Type
 */
interface TaxLine {
	Amount?: number;
	DetailType: "TaxLineDetail";
	TaxLineDetail?: TaxLineDetail;
}

/**
 * The Tax Line Detail Type
 */

interface TaxLineDetail {
	TaxRateRef?: ReferenceType;
	PercentBased?: boolean;
	TaxPercent?: number;
	NetAmountTaxable?: number;
}
