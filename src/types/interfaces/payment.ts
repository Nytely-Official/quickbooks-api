export interface Payment {
	SyncToken: string;
	domain: string;
	DepositToAccountRef: DepositToAccountRef;
	UnappliedAmt: number;
	TxnDate: string;
	TotalAmt: number;
	ProjectRef: DepositToAccountRef;
	ProcessPayment: boolean;
	sparse: boolean;
	Line: Line[];
	CustomerRef: CustomerRef;
	Id: string;
	MetaData: MetaData;
}

interface MetaData {
	CreateTime: string;
	LastUpdatedTime: string;
}

interface CustomerRef {
	name: string;
	value: string;
}

interface Line {
	Amount: number;
	LineEx: LineEx;
	LinkedTxn: LinkedTxn[];
}

interface LinkedTxn {
	TxnId: string;
	TxnType: string;
}

interface LineEx {
	any: Any[];
}

interface Any {
	name: string;
	nil: boolean;
	value: Value;
	declaredType: string;
	scope: string;
	globalScope: boolean;
	typeSubstituted: boolean;
}

interface Value {
	Name: string;
	Value: string;
}

interface DepositToAccountRef {
	value: string;
}
