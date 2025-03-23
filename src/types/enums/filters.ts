/**
 * Customer Filters
 *
 * @description The filterables for the Customer Object
 *
 * @see {@link https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/customer}
 */
export enum CustomerFilters {
	Id = 'Id',
	DisplayName = 'DisplayName',
	GivenName = 'GivenName',
	MiddleName = 'MiddleName',
	FamilyName = 'FamilyName',
	PrimaryEmailAddr = 'PrimaryEmailAddr',
	Active = 'Active',
	CompanyName = 'CompanyName',
	Balance = 'Balance',
	PrintOnCheckName = 'PrintOnCheckName',
	FullyQualifiedName = 'FullyQualifiedName',
}

/**
 * Invoice Filters
 *
 * @description The filterables for the Invoice Object
 *
 * @see {@link https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/invoice}
 */
export enum InvoiceFilters {
	Id = 'Id',
	CustomerRef = 'CustomerRef',
	DocNumber = 'DocNumber',
	ProjectRef = 'ProjectRef',
	TxnDate = 'TxnDate',
	SalesTermRef = 'SalesTermRef',
	DueDate = 'DueDate',
	Balance = 'Balance',
}
