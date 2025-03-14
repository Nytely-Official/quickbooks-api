import { Bill } from '../../src/app';

// Mock Account Data
export const mockBillData: Array<Bill> = [
	{
		Id: '123',
		SyncToken: '4',
		MetaData: {
			CreateTime: '2023-11-15T10:00:00Z',
			LastUpdatedTime: '2023-11-15T10:30:00Z',
		},
		DocNumber: 'BILL-001',
		TxnDate: '2023-11-10',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For office supplies',
		Line: [
			{
				Id: '1',
				Description: 'Printer Paper',
				Amount: 50.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Id: '2',
				Description: 'Ink Cartridges',
				Amount: 100.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
		],
		VendorRef: {
			value: '45',
			name: 'Office Depot',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '1',
			name: 'Net 30',
		},
		DueDate: '2023-12-10',
		LinkedTxn: [],
		TxnTaxDetail: {
			TotalTax: 15.0,
			Line: [
				{
					DetailType: 'TaxLine',
					TaxLineDetail: {
						TaxRateRef: {
							value: 'TAX_RATE',
							name: 'Sales Tax',
						},
						NetAmountRange: {
							Amount: 150.0,
						},
					},
				},
			],
		},
		TotalAmt: 165.0,
		Balance: 165.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '10',
			name: 'Sales',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '456',
		SyncToken: '2',
		MetaData: {
			CreateTime: '2023-11-16T12:00:00Z',
			LastUpdatedTime: '2023-11-16T12:15:00Z',
		},
		DocNumber: 'BILL-002',
		TxnDate: '2023-11-12',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For web hosting',
		Line: [
			{
				Id: '3',
				Description: 'Web Hosting',
				Amount: 75.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '80',
						name: 'Internet Services',
					},
					BillableStatus: 'NotBillable',
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
		],
		VendorRef: {
			value: '46',
			name: 'Web Hosting Inc.',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '2',
			name: 'Due on receipt',
		},
		DueDate: '2023-11-12',
		LinkedTxn: [
			{
				TxnId: '789',
				TxnType: 'BillPaymentCheck',
			},
		],
		TxnTaxDetail: {
			TotalTax: 0.0,
			Line: [],
		},
		TotalAmt: 75.0,
		Balance: 0.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '11',
			name: 'IT',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '123',
		SyncToken: '4',
		MetaData: {
			CreateTime: '2023-11-15T10:00:00Z',
			LastUpdatedTime: '2023-11-15T10:30:00Z',
		},
		DocNumber: 'BILL-001',
		TxnDate: '2023-11-10',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For office supplies',
		Line: [
			{
				Id: '1',
				Description: 'Printer Paper',
				Amount: 50.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Id: '2',
				Description: 'Ink Cartridges',
				Amount: 100.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
		],
		VendorRef: {
			value: '45',
			name: 'Office Depot',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '1',
			name: 'Net 30',
		},
		DueDate: '2023-12-10',
		LinkedTxn: [],
		TxnTaxDetail: {
			TotalTax: 15.0,
			Line: [
				{
					DetailType: 'TaxLine',
					TaxLineDetail: {
						TaxRateRef: {
							value: 'TAX_RATE',
							name: 'Sales Tax',
						},
						NetAmountRange: {
							Amount: 150.0,
						},
					},
				},
			],
		},
		TotalAmt: 165.0,
		Balance: 165.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '10',
			name: 'Sales',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '456',
		SyncToken: '2',
		MetaData: {
			CreateTime: '2023-11-16T12:00:00Z',
			LastUpdatedTime: '2023-11-16T12:15:00Z',
		},
		DocNumber: 'BILL-002',
		TxnDate: '2023-11-12',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For web hosting',
		Line: [
			{
				Id: '3',
				Description: 'Web Hosting',
				Amount: 75.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '80',
						name: 'Internet Services',
					},
					BillableStatus: 'NotBillable',
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
		],
		VendorRef: {
			value: '46',
			name: 'Web Hosting Inc.',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '2',
			name: 'Due on receipt',
		},
		DueDate: '2023-11-12',
		LinkedTxn: [
			{
				TxnId: '789',
				TxnType: 'BillPaymentCheck',
			},
		],
		TxnTaxDetail: {
			TotalTax: 0.0,
			Line: [],
		},
		TotalAmt: 75.0,
		Balance: 0.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '11',
			name: 'IT',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '123',
		SyncToken: '4',
		MetaData: {
			CreateTime: '2023-11-15T10:00:00Z',
			LastUpdatedTime: '2023-11-15T10:30:00Z',
		},
		DocNumber: 'BILL-001',
		TxnDate: '2023-11-10',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For office supplies',
		Line: [
			{
				Id: '1',
				Description: 'Printer Paper',
				Amount: 50.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Id: '2',
				Description: 'Ink Cartridges',
				Amount: 100.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
		],
		VendorRef: {
			value: '45',
			name: 'Office Depot',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '1',
			name: 'Net 30',
		},
		DueDate: '2023-12-10',
		LinkedTxn: [],
		TxnTaxDetail: {
			TotalTax: 15.0,
			Line: [
				{
					DetailType: 'TaxLine',
					TaxLineDetail: {
						TaxRateRef: {
							value: 'TAX_RATE',
							name: 'Sales Tax',
						},
						NetAmountRange: {
							Amount: 150.0,
						},
					},
				},
			],
		},
		TotalAmt: 165.0,
		Balance: 165.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '10',
			name: 'Sales',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '456',
		SyncToken: '2',
		MetaData: {
			CreateTime: '2023-11-16T12:00:00Z',
			LastUpdatedTime: '2023-11-16T12:15:00Z',
		},
		DocNumber: 'BILL-002',
		TxnDate: '2023-11-12',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For web hosting',
		Line: [
			{
				Id: '3',
				Description: 'Web Hosting',
				Amount: 75.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '80',
						name: 'Internet Services',
					},
					BillableStatus: 'NotBillable',
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
		],
		VendorRef: {
			value: '46',
			name: 'Web Hosting Inc.',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '2',
			name: 'Due on receipt',
		},
		DueDate: '2023-11-12',
		LinkedTxn: [
			{
				TxnId: '789',
				TxnType: 'BillPaymentCheck',
			},
		],
		TxnTaxDetail: {
			TotalTax: 0.0,
			Line: [],
		},
		TotalAmt: 75.0,
		Balance: 0.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '11',
			name: 'IT',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '123',
		SyncToken: '4',
		MetaData: {
			CreateTime: '2023-11-15T10:00:00Z',
			LastUpdatedTime: '2023-11-15T10:30:00Z',
		},
		DocNumber: 'BILL-001',
		TxnDate: '2023-11-10',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For office supplies',
		Line: [
			{
				Id: '1',
				Description: 'Printer Paper',
				Amount: 50.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Id: '2',
				Description: 'Ink Cartridges',
				Amount: 100.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
		],
		VendorRef: {
			value: '45',
			name: 'Office Depot',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '1',
			name: 'Net 30',
		},
		DueDate: '2023-12-10',
		LinkedTxn: [],
		TxnTaxDetail: {
			TotalTax: 15.0,
			Line: [
				{
					DetailType: 'TaxLine',
					TaxLineDetail: {
						TaxRateRef: {
							value: 'TAX_RATE',
							name: 'Sales Tax',
						},
						NetAmountRange: {
							Amount: 150.0,
						},
					},
				},
			],
		},
		TotalAmt: 165.0,
		Balance: 165.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '10',
			name: 'Sales',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '456',
		SyncToken: '2',
		MetaData: {
			CreateTime: '2023-11-16T12:00:00Z',
			LastUpdatedTime: '2023-11-16T12:15:00Z',
		},
		DocNumber: 'BILL-002',
		TxnDate: '2023-11-12',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For web hosting',
		Line: [
			{
				Id: '3',
				Description: 'Web Hosting',
				Amount: 75.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '80',
						name: 'Internet Services',
					},
					BillableStatus: 'NotBillable',
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
		],
		VendorRef: {
			value: '46',
			name: 'Web Hosting Inc.',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '2',
			name: 'Due on receipt',
		},
		DueDate: '2023-11-12',
		LinkedTxn: [
			{
				TxnId: '789',
				TxnType: 'BillPaymentCheck',
			},
		],
		TxnTaxDetail: {
			TotalTax: 0.0,
			Line: [],
		},
		TotalAmt: 75.0,
		Balance: 0.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '11',
			name: 'IT',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '123',
		SyncToken: '4',
		MetaData: {
			CreateTime: '2023-11-15T10:00:00Z',
			LastUpdatedTime: '2023-11-15T10:30:00Z',
		},
		DocNumber: 'BILL-001',
		TxnDate: '2023-11-10',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For office supplies',
		Line: [
			{
				Id: '1',
				Description: 'Printer Paper',
				Amount: 50.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Id: '2',
				Description: 'Ink Cartridges',
				Amount: 100.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
		],
		VendorRef: {
			value: '45',
			name: 'Office Depot',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '1',
			name: 'Net 30',
		},
		DueDate: '2023-12-10',
		LinkedTxn: [],
		TxnTaxDetail: {
			TotalTax: 15.0,
			Line: [
				{
					DetailType: 'TaxLine',
					TaxLineDetail: {
						TaxRateRef: {
							value: 'TAX_RATE',
							name: 'Sales Tax',
						},
						NetAmountRange: {
							Amount: 150.0,
						},
					},
				},
			],
		},
		TotalAmt: 165.0,
		Balance: 165.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '10',
			name: 'Sales',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '456',
		SyncToken: '2',
		MetaData: {
			CreateTime: '2023-11-16T12:00:00Z',
			LastUpdatedTime: '2023-11-16T12:15:00Z',
		},
		DocNumber: 'BILL-002',
		TxnDate: '2023-11-12',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For web hosting',
		Line: [
			{
				Id: '3',
				Description: 'Web Hosting',
				Amount: 75.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '80',
						name: 'Internet Services',
					},
					BillableStatus: 'NotBillable',
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
		],
		VendorRef: {
			value: '46',
			name: 'Web Hosting Inc.',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '2',
			name: 'Due on receipt',
		},
		DueDate: '2023-11-12',
		LinkedTxn: [
			{
				TxnId: '789',
				TxnType: 'BillPaymentCheck',
			},
		],
		TxnTaxDetail: {
			TotalTax: 0.0,
			Line: [],
		},
		TotalAmt: 75.0,
		Balance: 0.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '11',
			name: 'IT',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '123',
		SyncToken: '4',
		MetaData: {
			CreateTime: '2023-11-15T10:00:00Z',
			LastUpdatedTime: '2023-11-15T10:30:00Z',
		},
		DocNumber: 'BILL-001',
		TxnDate: '2023-11-10',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For office supplies',
		Line: [
			{
				Id: '1',
				Description: 'Printer Paper',
				Amount: 50.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Id: '2',
				Description: 'Ink Cartridges',
				Amount: 100.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
		],
		VendorRef: {
			value: '45',
			name: 'Office Depot',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '1',
			name: 'Net 30',
		},
		DueDate: '2023-12-10',
		LinkedTxn: [],
		TxnTaxDetail: {
			TotalTax: 15.0,
			Line: [
				{
					DetailType: 'TaxLine',
					TaxLineDetail: {
						TaxRateRef: {
							value: 'TAX_RATE',
							name: 'Sales Tax',
						},
						NetAmountRange: {
							Amount: 150.0,
						},
					},
				},
			],
		},
		TotalAmt: 165.0,
		Balance: 165.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '10',
			name: 'Sales',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '456',
		SyncToken: '2',
		MetaData: {
			CreateTime: '2023-11-16T12:00:00Z',
			LastUpdatedTime: '2023-11-16T12:15:00Z',
		},
		DocNumber: 'BILL-002',
		TxnDate: '2023-11-12',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For web hosting',
		Line: [
			{
				Id: '3',
				Description: 'Web Hosting',
				Amount: 75.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '80',
						name: 'Internet Services',
					},
					BillableStatus: 'NotBillable',
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
		],
		VendorRef: {
			value: '46',
			name: 'Web Hosting Inc.',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '2',
			name: 'Due on receipt',
		},
		DueDate: '2023-11-12',
		LinkedTxn: [
			{
				TxnId: '789',
				TxnType: 'BillPaymentCheck',
			},
		],
		TxnTaxDetail: {
			TotalTax: 0.0,
			Line: [],
		},
		TotalAmt: 75.0,
		Balance: 0.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '11',
			name: 'IT',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '123',
		SyncToken: '4',
		MetaData: {
			CreateTime: '2023-11-15T10:00:00Z',
			LastUpdatedTime: '2023-11-15T10:30:00Z',
		},
		DocNumber: 'BILL-001',
		TxnDate: '2023-11-10',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For office supplies',
		Line: [
			{
				Id: '1',
				Description: 'Printer Paper',
				Amount: 50.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Id: '2',
				Description: 'Ink Cartridges',
				Amount: 100.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
		],
		VendorRef: {
			value: '45',
			name: 'Office Depot',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '1',
			name: 'Net 30',
		},
		DueDate: '2023-12-10',
		LinkedTxn: [],
		TxnTaxDetail: {
			TotalTax: 15.0,
			Line: [
				{
					DetailType: 'TaxLine',
					TaxLineDetail: {
						TaxRateRef: {
							value: 'TAX_RATE',
							name: 'Sales Tax',
						},
						NetAmountRange: {
							Amount: 150.0,
						},
					},
				},
			],
		},
		TotalAmt: 165.0,
		Balance: 165.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '10',
			name: 'Sales',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '456',
		SyncToken: '2',
		MetaData: {
			CreateTime: '2023-11-16T12:00:00Z',
			LastUpdatedTime: '2023-11-16T12:15:00Z',
		},
		DocNumber: 'BILL-002',
		TxnDate: '2023-11-12',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For web hosting',
		Line: [
			{
				Id: '3',
				Description: 'Web Hosting',
				Amount: 75.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '80',
						name: 'Internet Services',
					},
					BillableStatus: 'NotBillable',
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
		],
		VendorRef: {
			value: '46',
			name: 'Web Hosting Inc.',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '2',
			name: 'Due on receipt',
		},
		DueDate: '2023-11-12',
		LinkedTxn: [
			{
				TxnId: '789',
				TxnType: 'BillPaymentCheck',
			},
		],
		TxnTaxDetail: {
			TotalTax: 0.0,
			Line: [],
		},
		TotalAmt: 75.0,
		Balance: 0.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '11',
			name: 'IT',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '123',
		SyncToken: '4',
		MetaData: {
			CreateTime: '2023-11-15T10:00:00Z',
			LastUpdatedTime: '2023-11-15T10:30:00Z',
		},
		DocNumber: 'BILL-001',
		TxnDate: '2023-11-10',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For office supplies',
		Line: [
			{
				Id: '1',
				Description: 'Printer Paper',
				Amount: 50.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Id: '2',
				Description: 'Ink Cartridges',
				Amount: 100.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
		],
		VendorRef: {
			value: '45',
			name: 'Office Depot',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '1',
			name: 'Net 30',
		},
		DueDate: '2023-12-10',
		LinkedTxn: [],
		TxnTaxDetail: {
			TotalTax: 15.0,
			Line: [
				{
					DetailType: 'TaxLine',
					TaxLineDetail: {
						TaxRateRef: {
							value: 'TAX_RATE',
							name: 'Sales Tax',
						},
						NetAmountRange: {
							Amount: 150.0,
						},
					},
				},
			],
		},
		TotalAmt: 165.0,
		Balance: 165.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '10',
			name: 'Sales',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '456',
		SyncToken: '2',
		MetaData: {
			CreateTime: '2023-11-16T12:00:00Z',
			LastUpdatedTime: '2023-11-16T12:15:00Z',
		},
		DocNumber: 'BILL-002',
		TxnDate: '2023-11-12',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For web hosting',
		Line: [
			{
				Id: '3',
				Description: 'Web Hosting',
				Amount: 75.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '80',
						name: 'Internet Services',
					},
					BillableStatus: 'NotBillable',
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
		],
		VendorRef: {
			value: '46',
			name: 'Web Hosting Inc.',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '2',
			name: 'Due on receipt',
		},
		DueDate: '2023-11-12',
		LinkedTxn: [
			{
				TxnId: '789',
				TxnType: 'BillPaymentCheck',
			},
		],
		TxnTaxDetail: {
			TotalTax: 0.0,
			Line: [],
		},
		TotalAmt: 75.0,
		Balance: 0.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '11',
			name: 'IT',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '123',
		SyncToken: '4',
		MetaData: {
			CreateTime: '2023-11-15T10:00:00Z',
			LastUpdatedTime: '2023-11-15T10:30:00Z',
		},
		DocNumber: 'BILL-001',
		TxnDate: '2023-11-10',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For office supplies',
		Line: [
			{
				Id: '1',
				Description: 'Printer Paper',
				Amount: 50.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Id: '2',
				Description: 'Ink Cartridges',
				Amount: 100.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
		],
		VendorRef: {
			value: '45',
			name: 'Office Depot',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '1',
			name: 'Net 30',
		},
		DueDate: '2023-12-10',
		LinkedTxn: [],
		TxnTaxDetail: {
			TotalTax: 15.0,
			Line: [
				{
					DetailType: 'TaxLine',
					TaxLineDetail: {
						TaxRateRef: {
							value: 'TAX_RATE',
							name: 'Sales Tax',
						},
						NetAmountRange: {
							Amount: 150.0,
						},
					},
				},
			],
		},
		TotalAmt: 165.0,
		Balance: 165.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '10',
			name: 'Sales',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '456',
		SyncToken: '2',
		MetaData: {
			CreateTime: '2023-11-16T12:00:00Z',
			LastUpdatedTime: '2023-11-16T12:15:00Z',
		},
		DocNumber: 'BILL-002',
		TxnDate: '2023-11-12',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For web hosting',
		Line: [
			{
				Id: '3',
				Description: 'Web Hosting',
				Amount: 75.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '80',
						name: 'Internet Services',
					},
					BillableStatus: 'NotBillable',
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
		],
		VendorRef: {
			value: '46',
			name: 'Web Hosting Inc.',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '2',
			name: 'Due on receipt',
		},
		DueDate: '2023-11-12',
		LinkedTxn: [
			{
				TxnId: '789',
				TxnType: 'BillPaymentCheck',
			},
		],
		TxnTaxDetail: {
			TotalTax: 0.0,
			Line: [],
		},
		TotalAmt: 75.0,
		Balance: 0.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '11',
			name: 'IT',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '123',
		SyncToken: '4',
		MetaData: {
			CreateTime: '2023-11-15T10:00:00Z',
			LastUpdatedTime: '2023-11-15T10:30:00Z',
		},
		DocNumber: 'BILL-001',
		TxnDate: '2023-11-10',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For office supplies',
		Line: [
			{
				Id: '1',
				Description: 'Printer Paper',
				Amount: 50.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Id: '2',
				Description: 'Ink Cartridges',
				Amount: 100.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
		],
		VendorRef: {
			value: '45',
			name: 'Office Depot',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '1',
			name: 'Net 30',
		},
		DueDate: '2023-12-10',
		LinkedTxn: [],
		TxnTaxDetail: {
			TotalTax: 15.0,
			Line: [
				{
					DetailType: 'TaxLine',
					TaxLineDetail: {
						TaxRateRef: {
							value: 'TAX_RATE',
							name: 'Sales Tax',
						},
						NetAmountRange: {
							Amount: 150.0,
						},
					},
				},
			],
		},
		TotalAmt: 165.0,
		Balance: 165.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '10',
			name: 'Sales',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '456',
		SyncToken: '2',
		MetaData: {
			CreateTime: '2023-11-16T12:00:00Z',
			LastUpdatedTime: '2025-11-16T12:15:00Z',
		},
		DocNumber: 'BILL-002',
		TxnDate: '2023-11-12',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For web hosting',
		Line: [
			{
				Id: '3',
				Description: 'Web Hosting',
				Amount: 75.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '80',
						name: 'Internet Services',
					},
					BillableStatus: 'NotBillable',
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
		],
		VendorRef: {
			value: '46',
			name: 'Web Hosting Inc.',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '2',
			name: 'Due on receipt',
		},
		DueDate: '2023-11-12',
		LinkedTxn: [
			{
				TxnId: '789',
				TxnType: 'BillPaymentCheck',
			},
		],
		TxnTaxDetail: {
			TotalTax: 0.0,
			Line: [],
		},
		TotalAmt: 75.0,
		Balance: 0.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '11',
			name: 'IT',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '123',
		SyncToken: '4',
		MetaData: {
			CreateTime: '2023-11-15T10:00:00Z',
			LastUpdatedTime: '2023-11-15T10:30:00Z',
		},
		DocNumber: 'BILL-001',
		TxnDate: '2023-11-10',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For office supplies',
		Line: [
			{
				Id: '1',
				Description: 'Printer Paper',
				Amount: 50.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Id: '2',
				Description: 'Ink Cartridges',
				Amount: 100.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
		],
		VendorRef: {
			value: '45',
			name: 'Office Depot',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '1',
			name: 'Net 30',
		},
		DueDate: '2023-12-10',
		LinkedTxn: [],
		TxnTaxDetail: {
			TotalTax: 15.0,
			Line: [
				{
					DetailType: 'TaxLine',
					TaxLineDetail: {
						TaxRateRef: {
							value: 'TAX_RATE',
							name: 'Sales Tax',
						},
						NetAmountRange: {
							Amount: 150.0,
						},
					},
				},
			],
		},
		TotalAmt: 165.0,
		Balance: 165.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '10',
			name: 'Sales',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '456',
		SyncToken: '2',
		MetaData: {
			CreateTime: '2023-11-16T12:00:00Z',
			LastUpdatedTime: '2022-11-16T12:15:00Z',
		},
		DocNumber: 'BILL-002',
		TxnDate: '2023-11-12',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For web hosting',
		Line: [
			{
				Id: '3',
				Description: 'Web Hosting',
				Amount: 75.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '80',
						name: 'Internet Services',
					},
					BillableStatus: 'NotBillable',
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
		],
		VendorRef: {
			value: '46',
			name: 'Web Hosting Inc.',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '2',
			name: 'Due on receipt',
		},
		DueDate: '2023-11-12',
		LinkedTxn: [
			{
				TxnId: '789',
				TxnType: 'BillPaymentCheck',
			},
		],
		TxnTaxDetail: {
			TotalTax: 0.0,
			Line: [],
		},
		TotalAmt: 75.0,
		Balance: 0.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '11',
			name: 'IT',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '123',
		SyncToken: '4',
		MetaData: {
			CreateTime: '2023-11-15T10:00:00Z',
			LastUpdatedTime: '2025-11-15T10:30:00Z',
		},
		DocNumber: 'BILL-001',
		TxnDate: '2023-11-10',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For office supplies',
		Line: [
			{
				Id: '1',
				Description: 'Printer Paper',
				Amount: 50.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Id: '2',
				Description: 'Ink Cartridges',
				Amount: 100.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '70',
						name: 'Office Supplies',
					},
					CustomerRef: {
						value: '22',
						name: 'Acme Corp',
					},
					BillableStatus: 'Billable',
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
		],
		VendorRef: {
			value: '45',
			name: 'Office Depot',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '1',
			name: 'Net 30',
		},
		DueDate: '2023-12-10',
		LinkedTxn: [],
		TxnTaxDetail: {
			TotalTax: 15.0,
			Line: [
				{
					DetailType: 'TaxLine',
					TaxLineDetail: {
						TaxRateRef: {
							value: 'TAX_RATE',
							name: 'Sales Tax',
						},
						NetAmountRange: {
							Amount: 150.0,
						},
					},
				},
			],
		},
		TotalAmt: 165.0,
		Balance: 165.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '10',
			name: 'Sales',
		},
		IncludeInAnnualTPAR: false,
	},
	{
		Id: '456',
		SyncToken: '2',
		MetaData: {
			CreateTime: '2023-11-16T12:00:00Z',
			LastUpdatedTime: '2023-11-16T12:15:00Z',
		},
		DocNumber: 'BILL-002',
		TxnDate: '2023-11-12',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		PrivateNote: 'For web hosting',
		Line: [
			{
				Id: '3',
				Description: 'Web Hosting',
				Amount: 75.0,
				DetailType: 'AccountBasedExpenseLineDetail',
				AccountBasedExpenseLineDetail: {
					AccountRef: {
						value: '80',
						name: 'Internet Services',
					},
					BillableStatus: 'NotBillable',
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
		],
		VendorRef: {
			value: '46',
			name: 'Web Hosting Inc.',
		},
		APAccountRef: {
			value: '33',
			name: 'Accounts Payable',
		},
		SalesTermRef: {
			value: '2',
			name: 'Due on receipt',
		},
		DueDate: '2023-11-12',
		LinkedTxn: [
			{
				TxnId: '789',
				TxnType: 'BillPaymentCheck',
			},
		],
		TxnTaxDetail: {
			TotalTax: 0.0,
			Line: [],
		},
		TotalAmt: 75.0,
		Balance: 0.0,
		ExchangeRate: 1.0,
		DepartmentRef: {
			value: '11',
			name: 'IT',
		},
		IncludeInAnnualTPAR: false,
	},
];
