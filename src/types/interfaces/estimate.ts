// Imports
import { EstimateStatus } from '../types';

/**
 * The Estimate Object
 */
export interface Estimate {
	domain?: string;
	sparse?: boolean;
	Id: string;
	CustomerRef: ReferenceType;
	SyncToken: string;
	ShipFromAddr?: PhysicalAddress;
	CurrencyRef?: ReferenceType;
	GlobalTaxCalculation?: GlobalTaxCalculationEnum;
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
	EmailStatus?: EmailStatusEnum;
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
 * The MetaData Object
 */
interface MetaData {
	CreateTime?: string;
	LastUpdatedTime?: string;
}

/**
 * The ReferenceType Object
 */
interface ReferenceType {
	value: string;
	name?: string;
}

/**
 * The PhysicalAddress Object
 */
interface PhysicalAddress {
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
interface CustomField {
	readonly DefinitionId: string;
	StringValue?: string;
	readonly Name?: string;
	readonly Type?: string;
}

/**
 * The LinkedTxn Object
 */
interface LinkedTxn {
	TxnId: string;
	TxnType: string;
	TxnLineId?: string;
}

/**
 * The EstimateLine Object
 */
interface EstimateLine {
	readonly Id?: string;
	DetailType: LineDetailTypeEnum;
	SalesItemLineDetail?: SalesItemLineDetail;
	SubTotalLineDetail?: {};
	Amount: number;
	Description?: string;
	LineNum?: number;
}

/**
 * The SalesItemLineDetail Object
 */
interface SalesItemLineDetail {
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
interface TxnTaxDetail {
	TxnTaxCodeRef?: ReferenceType;
	TotalTax?: number;
	TaxLine?: TaxLine[];
}

/**
 * The TaxLine Object
 */
interface TaxLine {
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
 * The GlobalTaxCalculationEnum Enum
 */
enum GlobalTaxCalculationEnum {
	TaxExcluded = 'TaxExcluded',
	TaxInclusive = 'TaxInclusive',
	NotApplicable = 'NotApplicable',
}

/**
 * The LineDetailTypeEnum Enum
 */
enum LineDetailTypeEnum {
	SalesItemLineDetail = 'SalesItemLineDetail',
	SubTotalLineDetail = 'SubTotalLineDetail',
}

/**
 * The EmailStatusEnum Enum
 */
enum EmailStatusEnum {
	NotSet = 'NotSet',
	NeedToSend = 'NeedToSend',
	EmailSent = 'EmailSent',
}

/**
 * The TaxLineDetailType Enum
 */
enum TaxLineDetailType {
	TaxLineDetail = 'TaxLineDetail',
}
