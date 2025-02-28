export interface Account {
	FullyQualifiedName: string;
	domain: string;
	Name: string;
	Classification: string;
	AccountSubType: string;
	CurrencyRef: CurrencyRef;
	CurrentBalanceWithSubAccounts: number;
	sparse: boolean;
	MetaData: MetaData;
	AccountType: string;
	CurrentBalance: number;
	Active: boolean;
	SyncToken: string;
	Id: string;
	SubAccount: boolean;
}

interface MetaData {
	CreateTime: string;
	LastUpdatedTime: string;
}

interface CurrencyRef {
	name: string;
	value: string;
}
