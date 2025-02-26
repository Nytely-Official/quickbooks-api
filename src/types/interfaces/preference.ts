export interface Preferences {
	EmailMessagesPrefs: EmailMessagesPrefs;
	ProductAndServicesPrefs: ProductAndServicesPrefs;
	domain: string;
	SyncToken: string;
	ReportPrefs: ReportPrefs;
	AccountingInfoPrefs: AccountingInfoPrefs;
	SalesFormsPrefs: SalesFormsPrefs;
	VendorAndPurchasesPrefs: VendorAndPurchasesPrefs;
	TaxPrefs: TaxPrefs;
	OtherPrefs: OtherPrefs;
	sparse: boolean;
	TimeTrackingPrefs: TimeTrackingPrefs;
	CurrencyPrefs: CurrencyPrefs;
	Id: string;
	MetaData: MetaData;
}

interface MetaData {
	CreateTime: string;
	LastUpdatedTime: string;
}

interface CurrencyPrefs {
	HomeCurrency: DefaultTerms;
	MultiCurrencyEnabled: boolean;
}

interface TimeTrackingPrefs {
	WorkWeekStartDate: string;
	MarkTimeEntriesBillable: boolean;
	ShowBillRateToAll: boolean;
	UseServices: boolean;
	BillCustomers: boolean;
}

interface OtherPrefs {
	NameValue: NameValue[];
}

interface NameValue {
	Name: string;
	Value: string;
}

interface TaxPrefs {
	TaxGroupCodeRef: DefaultTerms;
	UsingSalesTax: boolean;
}

interface VendorAndPurchasesPrefs {
	BillableExpenseTracking: boolean;
	TrackingByCustomer: boolean;
	POCustomField: CustomField2[];
}

interface SalesFormsPrefs {
	ETransactionPaymentEnabled: boolean;
	CustomTxnNumbers: boolean;
	AllowShipping: boolean;
	AllowServiceDate: boolean;
	ETransactionEnabledStatus: string;
	DefaultCustomerMessage: string;
	EmailCopyToCompany: boolean;
	AllowEstimates: boolean;
	DefaultTerms: DefaultTerms;
	AllowDiscount: boolean;
	DefaultDiscountAccount: string;
	AllowDeposit: boolean;
	AutoApplyPayments: boolean;
	IPNSupportEnabled: boolean;
	AutoApplyCredit: boolean;
	CustomField: CustomField2[];
	UsingPriceLevels: boolean;
	ETransactionAttachPDF: boolean;
}

interface CustomField2 {
	CustomField: CustomField[];
}

interface CustomField {
	BooleanValue?: boolean;
	Type: string;
	Name: string;
	StringValue?: string;
}

interface DefaultTerms {
	value: string;
}

interface AccountingInfoPrefs {
	FirstMonthOfFiscalYear: string;
	UseAccountNumbers: boolean;
	TaxYearMonth: string;
	ClassTrackingPerTxn: boolean;
	TrackDepartments: boolean;
	TaxForm: string;
	CustomerTerminology: string;
	BookCloseDate: string;
	DepartmentTerminology: string;
	ClassTrackingPerTxnLine: boolean;
}

interface ReportPrefs {
	ReportBasis: string;
	CalcAgingReportFromTxnDate: boolean;
}

interface ProductAndServicesPrefs {
	QuantityWithPriceAndRate: boolean;
	ForPurchase: boolean;
	QuantityOnHand: boolean;
	ForSales: boolean;
}

interface EmailMessagesPrefs {
	InvoiceMessage: InvoiceMessage;
	EstimateMessage: InvoiceMessage;
	SalesReceiptMessage: InvoiceMessage;
	StatementMessage: InvoiceMessage;
}

interface InvoiceMessage {
	Message: string;
	Subject: string;
}
