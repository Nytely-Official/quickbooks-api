import { MetaData, ReferenceType } from "./defs";

/**
 * The Estimate Object
 */
export type Estimate = {
	domain?: string;
	sparse?: boolean;
	Id: string;
	CustomerRef: ReferenceType;
	SyncToken: string;
	ShipFromAddr?: PhysicalAddress;
	CurrencyRef?: ReferenceType;
	GlobalTaxCalculation?: GlobalTaxCalculation;
	ProjectRef?: ReferenceType;
	BillEmail?: { Address?: string };
	TxnDate?: string;
	ShipDate?: string;
	ClassRef?: ReferenceType;
	PrintStatus?: string;
	CustomField?: CustomField[];
	SalesTermRef?: ReferenceType;
	TxnStatus?: EstimateStatus;
	LinkedTxn?: LinkedTxn[];
	AcceptedDate?: string;
	ExpirationDate?: string;
	TransactionLocationType?: string;
	DueDate?: string;
	MetaData?: MetaData;
	DocNumber?: string;
	PrivateNote?: string;
	Line?: EstimateLine[];
	CustomerMemo?: { value?: string };
	EmailStatus?: EmailStatus;
	TxnTaxDetail?: TxnTaxDetail;
	AcceptedBy?: string;
	ExchangeRate?: number;
	ShipAddr?: PhysicalAddress;
	DepartmentRef?: ReferenceType;
	ShipMethodRef?: ReferenceType;
	BillAddr?: PhysicalAddress;
	ApplyTaxAfterDiscount?: boolean;
	readonly TotalAmt?: number;
	RecurDataRef?: ReferenceType;
	readonly TaxExemptionRef?: ReferenceType;
	readonly HomeTotalAmt?: number;
	readonly FreeFormAddress?: boolean;
	DeliveryInfo?: {
		DeliveryType?: string;
	};
}

/**
 * The Estimate Status
 */
export type EstimateStatus = 'Accepted' | 'Closed' | 'Pending' | 'Rejected' | 'Converted'

/**
 * The PhysicalAddress Object
 */
export type PhysicalAddress = {
	readonly Id?: string;
	PostalCode?: string;
	City?: string;
	Country?: string;
	Line5?: string;
	Line4?: string;
	Line3?: string;
	Line2?: string;
	Line1?: string;
	readonly Lat?: string;
	readonly Long?: string;
	CountrySubDivisionCode?: string;
}

/**
 * The CustomField Object
 */
export type CustomField = {
	readonly DefinitionId: string;
	StringValue?: string;
	readonly Name?: string;
	readonly Type?: string;
}

/**
 * The LinkedTxn Object
 */
export type LinkedTxn = {
	TxnId: string;
	TxnType: string;
	TxnLineId?: string;
}

/**
 * The EstimateLine Object
 */
export type EstimateLine = {
	readonly Id?: string;
	DetailType: LineDetailType;
	SalesItemLineDetail?: SalesItemLineDetail;
	SubTotalLineDetail?: {};
	Amount: number;
	Description?: string;
	Lin?: number;
}

/**
 * The SalesItemLineDetail Object
 */
export type SalesItemLineDetail = {
	TaxInclusiveAmt?: number;
	DiscountAmt?: number;
	ItemRef?: ReferenceType;
	ClassRef?: ReferenceType;
	TaxCodeRef?: ReferenceType;
	ServiceDate?: string;
	DiscountRate?: number;
	Qty?: number;
	UnitPrice?: number;
	readonly TaxClassificationRef?: ReferenceType;
	ItemAccountRef?: ReferenceType;
}

/**
 * The TxnTaxDetail Object
 */
export type TxnTaxDetail = {
	TxnTaxCodeRef?: ReferenceType;
	TotalTax?: number;
	TaxLine?: TaxLine[];
}

/**
 * The TaxLine Object
 */
export type TaxLine = {
	Amount?: number;
	DetailType: TaxLineDetailType;
	TaxLineDetail?: {
		TaxRateRef?: ReferenceType;
		PercentBased?: boolean;
		TaxPercent?: number;
		NetAmountTaxable?: number;
	};
}

/**
 * The GlobalTaxCalculation
 */
export type GlobalTaxCalculation = 'TaxExcluded' | 'TaxInclusive' | 'NotApplicable'


/**
 * The LineDetailType
 */
export type LineDetailType = 'SalesItemLineDetail' | 'SubTotalLineDetail'

/**
 * The EmailStatus
 */
export type EmailStatus = 'NotSet' | 'NeedToSend' | 'EmailSent'

/**
 * The TaxLineDetailType
 */
export type TaxLineDetailType = 'TaxLineDetail'


export type { Estimate as default };