export interface CreditMemo {
	TxnDate: string;
	domain: string;
	PrintStatus: string;
	TotalAmt: number;
	RemainingCredit: number;
	Line: Line[];
	ApplyTaxAfterDiscount: boolean;
	DocNumber: string;
	sparse: boolean;
	CustomerMemo: TaxCodeRef;
	ProjectRef: TaxCodeRef;
	Balance: number;
	CustomerRef: ItemRef;
	TxnTaxDetail: TxnTaxDetail;
	SyncToken: string;
	CustomField: CustomField[];
	ShipAddr: ShipAddr;
	EmailStatus: string;
	BillAddr: BillAddr;
	MetaData: MetaData;
	BillEmail: BillEmail;
	Id: string;
}

interface BillEmail {
	Address: string;
}

interface MetaData {
	CreateTime: string;
	LastUpdatedTime: string;
}

interface BillAddr {
	Line4: string;
	Line3: string;
	Id: string;
	Line1: string;
	Line2: string;
}

interface ShipAddr {
	CountrySubDivisionCode: string;
	City: string;
	PostalCode: string;
	Id: string;
	Line1: string;
}

interface CustomField {
	DefinitionId: string;
	Type: string;
	Name: string;
}

interface TxnTaxDetail {
	TotalTax: number;
}

interface Line {
	Description?: string;
	DetailType: string;
	SalesItemLineDetail?: SalesItemLineDetail;
	LineNum?: number;
	Amount: number;
	Id?: string;
	SubTotalLineDetail?: SubTotalLineDetail;
}

interface SubTotalLineDetail {}

interface SalesItemLineDetail {
	TaxCodeRef: TaxCodeRef;
	Qty: number;
	UnitPrice: number;
	ItemRef: ItemRef;
}

interface ItemRef {
	name: string;
	value: string;
}

interface TaxCodeRef {
	value: string;
}
