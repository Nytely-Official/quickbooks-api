export interface Bill {
	Id?: string;
	SyncToken?: string;
	MetaData?: MetaData;
	DocNumber?: string;
	TxnDate?: string;
	CurrencyRef?: ReferenceType;
	PrivateNote?: string;
	Line?: Line[];
	VendorRef: ReferenceType;
	APAccountRef?: ReferenceType;
	SalesTermRef?: ReferenceType;
	DueDate?: string;
	LinkedTxn?: LinkedTxn[];
	TxnTaxDetail?: TxnTaxDetail;
	TotalAmt?: number;
	Balance?: number;
	ExchangeRate?: number;
	DepartmentRef?: ReferenceType;
	IncludeInAnnualTPAR?: boolean;
}

interface ReferenceType {
	value: string;
	name?: string;
}

interface LinkedTxn {
	TxnId: string;
	TxnType: string;
}

interface AccountBasedExpenseLineDetail {
	AccountRef: ReferenceType;
	CustomerRef?: ReferenceType;
	BillableStatus?: 'Billable' | 'NotBillable';
	TaxCodeRef?: ReferenceType;
}

interface Line {
	Id?: string;
	Description?: string;
	Amount?: number;
	DetailType?: 'AccountBasedExpenseLineDetail' | 'ItemBasedExpenseLineDetail';
	AccountBasedExpenseLineDetail?: AccountBasedExpenseLineDetail;
	ItemBasedExpenseLineDetail?: any;
}

interface TxnTaxDetail {
	TotalTax?: number;
	Line?: {
		DetailType: string;
		TaxLineDetail: {
			TaxRateRef: ReferenceType;
			NetAmountRange: {
				Amount: number;
			};
		};
	}[];
}

interface MetaData {
	CreateTime?: string;
	LastUpdatedTime?: string;
}
