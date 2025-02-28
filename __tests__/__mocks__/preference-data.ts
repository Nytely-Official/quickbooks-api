// Imports
import type { Preferences } from '../../src/app';

export const mockPreferenceData: Array<Preferences> = [
	{
		EmailMessagesPrefs: {
			InvoiceMessage: {
				Message:
					"Your invoice is attached.  Please remit payment at your earliest convenience.\nThank you for your business - we appreciate it very much.\n\nSincerely,\nCraig's Design and Landscaping Services",
				Subject: "Invoice from Craig's Design and Landscaping Services",
			},
			EstimateMessage: {
				Message:
					"Please review the estimate below.  Feel free to contact us if you have any questions.\nWe look forward to working with you.\n\nSincerely,\nCraig's Design and Landscaping Services",
				Subject: "Estimate from Craig's Design and Landscaping Services",
			},
			SalesReceiptMessage: {
				Message:
					"Your sales receipt is attached.\nThank you for your business - we appreciate it very much.\n\nSincerely,\nCraig's Design and Landscaping Services",
				Subject: "Sales Receipt from Craig's Design and Landscaping Services",
			},
			StatementMessage: {
				Message:
					"Your statement is attached.  Please remit payment at your earliest convenience.\nThank you for your business - we appreciate it very much.\n\nSincerely,\nCraig's Design and Landscaping Services",
				Subject: "Statement from Craig's Design and Landscaping Services",
			},
		},
		ProductAndServicesPrefs: {
			QuantityWithPriceAndRate: true,
			ForPurchase: true,
			QuantityOnHand: true,
			ForSales: true,
		},
		domain: 'QBO',
		SyncToken: '6',
		ReportPrefs: {
			ReportBasis: 'Accrual',
			CalcAgingReportFromTxnDate: false,
		},
		AccountingInfoPrefs: {
			FirstMonthOfFiscalYear: 'January',
			UseAccountNumbers: true,
			TaxYearMonth: 'January',
			ClassTrackingPerTxn: false,
			TrackDepartments: true,
			TaxForm: '6',
			CustomerTerminology: 'Customers',
			BookCloseDate: '2018-12-31',
			DepartmentTerminology: 'Location',
			ClassTrackingPerTxnLine: true,
		},
		SalesFormsPrefs: {
			ETransactionPaymentEnabled: false,
			CustomTxnNumbers: false,
			AllowShipping: false,
			AllowServiceDate: false,
			ETransactionEnabledStatus: 'NotApplicable',
			DefaultCustomerMessage: 'Thank you for your business and have a great day!',
			EmailCopyToCompany: false,
			AllowEstimates: true,
			DefaultTerms: {
				value: '3',
			},
			AllowDiscount: true,
			DefaultDiscountAccount: '86',
			AllowDeposit: true,
			AutoApplyPayments: true,
			IPNSupportEnabled: false,
			AutoApplyCredit: true,
			CustomField: [
				{
					CustomField: [
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom3',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom2',
						},
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom1',
						},
					],
				},
				{
					CustomField: [
						{
							StringValue: 'Crew #',
							Type: 'StringType',
							Name: 'SalesFormsPrefs.SalesCustomName1',
						},
					],
				},
			],
			UsingPriceLevels: false,
			ETransactionAttachPDF: false,
		},
		VendorAndPurchasesPrefs: {
			BillableExpenseTracking: true,
			TrackingByCustomer: true,
			POCustomField: [
				{
					CustomField: [
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom3',
						},
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom2',
						},
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom1',
						},
					],
				},
				{
					CustomField: [
						{
							StringValue: 'Sales Rep',
							Type: 'StringType',
							Name: 'PurchasePrefs.PurchaseCustomName2',
						},
						{
							StringValue: 'Crew #',
							Type: 'StringType',
							Name: 'PurchasePrefs.PurchaseCustomName1',
						},
					],
				},
			],
		},
		TaxPrefs: {
			TaxGroupCodeRef: {
				value: '2',
			},
			UsingSalesTax: true,
		},
		OtherPrefs: {
			NameValue: [
				{
					Name: 'SalesFormsPrefs.DefaultCustomerMessage',
					Value: 'Thank you for your business and have a great day!',
				},
				{
					Name: 'SalesFormsPrefs.DefaultItem',
					Value: '1',
				},
				{
					Name: 'DTXCopyMemo',
					Value: 'false',
				},
				{
					Name: 'UncategorizedAssetAccountId',
					Value: '32',
				},
				{
					Name: 'UncategorizedIncomeAccountId',
					Value: '30',
				},
				{
					Name: 'UncategorizedExpenseAccountId',
					Value: '31',
				},
				{
					Name: 'SFCEnabled',
					Value: 'true',
				},
				{
					Name: 'DataPartner',
					Value: 'false',
				},
				{
					Name: 'Vendor1099Enabled',
					Value: 'true',
				},
				{
					Name: 'TimeTrackingFeatureEnabled',
					Value: 'true',
				},
				{
					Name: 'FDPEnabled',
					Value: 'false',
				},
				{
					Name: 'ProjectsEnabled',
					Value: 'false',
				},
				{
					Name: 'DateFormat',
					Value: 'Month Date Year separated by a slash',
				},
				{
					Name: 'DateFormatMnemonic',
					Value: 'MMDDYYYY_SEP_SLASH',
				},
				{
					Name: 'NumberFormat',
					Value: 'US Number Format',
				},
				{
					Name: 'NumberFormatMnemonic',
					Value: 'US_NB',
				},
				{
					Name: 'WarnDuplicateCheckNumber',
					Value: 'true',
				},
				{
					Name: 'WarnDuplicateBillNumber',
					Value: 'false',
				},
				{
					Name: 'SignoutInactiveMinutes',
					Value: '60',
				},
				{
					Name: 'AccountingInfoPrefs.ShowAccountNumbers',
					Value: 'false',
				},
			],
		},
		sparse: false,
		TimeTrackingPrefs: {
			WorkWeekStartDate: 'Monday',
			MarkTimeEntriesBillable: true,
			ShowBillRateToAll: false,
			UseServices: true,
			BillCustomers: true,
		},
		CurrencyPrefs: {
			HomeCurrency: {
				value: 'USD',
			},
			MultiCurrencyEnabled: false,
		},
		Id: '1',
		MetaData: {
			CreateTime: '2017-10-25T01:05:43-07:00',
			LastUpdatedTime: '2018-03-08T13:24:26-08:00',
		},
	},
	{
		EmailMessagesPrefs: {
			InvoiceMessage: {
				Message: 'Your invoice is attached. Payment is due within 30 days.\nWe value your business.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Invoice from Acme Consulting, Inc.',
			},
			EstimateMessage: {
				Message: 'Please find your estimate attached. Contact us with any questions.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Estimate from Acme Consulting, Inc.',
			},
			SalesReceiptMessage: {
				Message: 'Thank you for your payment. Your receipt is attached.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Receipt from Acme Consulting, Inc.',
			},
			StatementMessage: {
				Message: 'Please find your statement attached.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Statement from Acme Consulting, Inc.',
			},
		},
		ProductAndServicesPrefs: {
			QuantityWithPriceAndRate: false,
			ForPurchase: true,
			QuantityOnHand: false,
			ForSales: true,
		},
		domain: 'QBO',
		SyncToken: '3',
		ReportPrefs: {
			ReportBasis: 'Cash',
			CalcAgingReportFromTxnDate: true,
		},
		AccountingInfoPrefs: {
			FirstMonthOfFiscalYear: 'April',
			UseAccountNumbers: false,
			TaxYearMonth: 'April',
			ClassTrackingPerTxn: true,
			TrackDepartments: false,
			TaxForm: '5',
			CustomerTerminology: 'Clients',
			BookCloseDate: '2023-03-31',
			DepartmentTerminology: 'Department',
			ClassTrackingPerTxnLine: false,
		},
		SalesFormsPrefs: {
			ETransactionPaymentEnabled: true,
			CustomTxnNumbers: true,
			AllowShipping: true,
			AllowServiceDate: true,
			ETransactionEnabledStatus: 'Enabled',
			DefaultCustomerMessage: 'Thank you for your business!',
			EmailCopyToCompany: true,
			AllowEstimates: true,
			DefaultTerms: {
				value: '2',
			},
			AllowDiscount: false,
			DefaultDiscountAccount: '42',
			AllowDeposit: false,
			AutoApplyPayments: false,
			IPNSupportEnabled: true,
			AutoApplyCredit: false,
			CustomField: [
				{
					CustomField: [
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom3',
						},
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom2',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom1',
						},
					],
				},
				{
					CustomField: [
						{
							StringValue: 'Project ID',
							Type: 'StringType',
							Name: 'SalesFormsPrefs.SalesCustomName3',
						},
						{
							StringValue: 'Department',
							Type: 'StringType',
							Name: 'SalesFormsPrefs.SalesCustomName2',
						},
					],
				},
			],
			UsingPriceLevels: true,
			ETransactionAttachPDF: true,
		},
		VendorAndPurchasesPrefs: {
			BillableExpenseTracking: false,
			TrackingByCustomer: false,
			POCustomField: [
				{
					CustomField: [
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom3',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom2',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom1',
						},
					],
				},
				{
					CustomField: [
						{
							StringValue: 'Project Code',
							Type: 'StringType',
							Name: 'PurchasePrefs.PurchaseCustomName3',
						},
					],
				},
			],
		},
		TaxPrefs: {
			TaxGroupCodeRef: {
				value: '5',
			},
			UsingSalesTax: false,
		},
		OtherPrefs: {
			NameValue: [
				{
					Name: 'SalesFormsPrefs.DefaultCustomerMessage',
					Value: 'Thank you for your business!',
				},
				{
					Name: 'SalesFormsPrefs.DefaultItem',
					Value: '3',
				},
				{
					Name: 'DTXCopyMemo',
					Value: 'true',
				},
				{
					Name: 'UncategorizedAssetAccountId',
					Value: '45',
				},
				{
					Name: 'UncategorizedIncomeAccountId',
					Value: '46',
				},
				{
					Name: 'UncategorizedExpenseAccountId',
					Value: '47',
				},
				{
					Name: 'SFCEnabled',
					Value: 'false',
				},
				{
					Name: 'DataPartner',
					Value: 'true',
				},
				{
					Name: 'Vendor1099Enabled',
					Value: 'false',
				},
				{
					Name: 'TimeTrackingFeatureEnabled',
					Value: 'false',
				},
				{
					Name: 'FDPEnabled',
					Value: 'true',
				},
				{
					Name: 'ProjectsEnabled',
					Value: 'true',
				},
				{
					Name: 'DateFormat',
					Value: 'Date Month Year separated by a slash',
				},
				{
					Name: 'DateFormatMnemonic',
					Value: 'DDMMYYYY_SEP_SLASH',
				},
				{
					Name: 'NumberFormat',
					Value: 'UK Number Format',
				},
				{
					Name: 'NumberFormatMnemonic',
					Value: 'UK_NB',
				},
				{
					Name: 'WarnDuplicateCheckNumber',
					Value: 'false',
				},
				{
					Name: 'WarnDuplicateBillNumber',
					Value: 'true',
				},
				{
					Name: 'SignoutInactiveMinutes',
					Value: '30',
				},
				{
					Name: 'AccountingInfoPrefs.ShowAccountNumbers',
					Value: 'true',
				},
			],
		},
		sparse: false,
		TimeTrackingPrefs: {
			WorkWeekStartDate: 'Sunday',
			MarkTimeEntriesBillable: false,
			ShowBillRateToAll: true,
			UseServices: false,
			BillCustomers: false,
		},
		CurrencyPrefs: {
			HomeCurrency: {
				value: 'GBP',
			},
			MultiCurrencyEnabled: true,
		},
		Id: '2',
		MetaData: {
			CreateTime: '2022-04-15T09:22:15-05:00',
			LastUpdatedTime: '2022-05-05T11:14:33-05:00',
		},
	},
	{
		EmailMessagesPrefs: {
			InvoiceMessage: {
				Message: 'Your invoice is attached. Payment is due within 30 days.\nWe value your business.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Invoice from Acme Consulting, Inc.',
			},
			EstimateMessage: {
				Message: 'Please find your estimate attached. Contact us with any questions.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Estimate from Acme Consulting, Inc.',
			},
			SalesReceiptMessage: {
				Message: 'Thank you for your payment. Your receipt is attached.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Receipt from Acme Consulting, Inc.',
			},
			StatementMessage: {
				Message: 'Please find your statement attached.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Statement from Acme Consulting, Inc.',
			},
		},
		ProductAndServicesPrefs: {
			QuantityWithPriceAndRate: false,
			ForPurchase: true,
			QuantityOnHand: false,
			ForSales: true,
		},
		domain: 'QBO',
		SyncToken: '3',
		ReportPrefs: {
			ReportBasis: 'Cash',
			CalcAgingReportFromTxnDate: true,
		},
		AccountingInfoPrefs: {
			FirstMonthOfFiscalYear: 'April',
			UseAccountNumbers: false,
			TaxYearMonth: 'April',
			ClassTrackingPerTxn: true,
			TrackDepartments: false,
			TaxForm: '5',
			CustomerTerminology: 'Clients',
			BookCloseDate: '2023-03-31',
			DepartmentTerminology: 'Department',
			ClassTrackingPerTxnLine: false,
		},
		SalesFormsPrefs: {
			ETransactionPaymentEnabled: true,
			CustomTxnNumbers: true,
			AllowShipping: true,
			AllowServiceDate: true,
			ETransactionEnabledStatus: 'Enabled',
			DefaultCustomerMessage: 'Thank you for your business!',
			EmailCopyToCompany: true,
			AllowEstimates: true,
			DefaultTerms: {
				value: '2',
			},
			AllowDiscount: false,
			DefaultDiscountAccount: '42',
			AllowDeposit: false,
			AutoApplyPayments: false,
			IPNSupportEnabled: true,
			AutoApplyCredit: false,
			CustomField: [
				{
					CustomField: [
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom3',
						},
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom2',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom1',
						},
					],
				},
				{
					CustomField: [
						{
							StringValue: 'Project ID',
							Type: 'StringType',
							Name: 'SalesFormsPrefs.SalesCustomName3',
						},
						{
							StringValue: 'Department',
							Type: 'StringType',
							Name: 'SalesFormsPrefs.SalesCustomName2',
						},
					],
				},
			],
			UsingPriceLevels: true,
			ETransactionAttachPDF: true,
		},
		VendorAndPurchasesPrefs: {
			BillableExpenseTracking: false,
			TrackingByCustomer: false,
			POCustomField: [
				{
					CustomField: [
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom3',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom2',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom1',
						},
					],
				},
				{
					CustomField: [
						{
							StringValue: 'Project Code',
							Type: 'StringType',
							Name: 'PurchasePrefs.PurchaseCustomName3',
						},
					],
				},
			],
		},
		TaxPrefs: {
			TaxGroupCodeRef: {
				value: '5',
			},
			UsingSalesTax: false,
		},
		OtherPrefs: {
			NameValue: [
				{
					Name: 'SalesFormsPrefs.DefaultCustomerMessage',
					Value: 'Thank you for your business!',
				},
				{
					Name: 'SalesFormsPrefs.DefaultItem',
					Value: '3',
				},
				{
					Name: 'DTXCopyMemo',
					Value: 'true',
				},
				{
					Name: 'UncategorizedAssetAccountId',
					Value: '45',
				},
				{
					Name: 'UncategorizedIncomeAccountId',
					Value: '46',
				},
				{
					Name: 'UncategorizedExpenseAccountId',
					Value: '47',
				},
				{
					Name: 'SFCEnabled',
					Value: 'false',
				},
				{
					Name: 'DataPartner',
					Value: 'true',
				},
				{
					Name: 'Vendor1099Enabled',
					Value: 'false',
				},
				{
					Name: 'TimeTrackingFeatureEnabled',
					Value: 'false',
				},
				{
					Name: 'FDPEnabled',
					Value: 'true',
				},
				{
					Name: 'ProjectsEnabled',
					Value: 'true',
				},
				{
					Name: 'DateFormat',
					Value: 'Date Month Year separated by a slash',
				},
				{
					Name: 'DateFormatMnemonic',
					Value: 'DDMMYYYY_SEP_SLASH',
				},
				{
					Name: 'NumberFormat',
					Value: 'UK Number Format',
				},
				{
					Name: 'NumberFormatMnemonic',
					Value: 'UK_NB',
				},
				{
					Name: 'WarnDuplicateCheckNumber',
					Value: 'false',
				},
				{
					Name: 'WarnDuplicateBillNumber',
					Value: 'true',
				},
				{
					Name: 'SignoutInactiveMinutes',
					Value: '30',
				},
				{
					Name: 'AccountingInfoPrefs.ShowAccountNumbers',
					Value: 'true',
				},
			],
		},
		sparse: false,
		TimeTrackingPrefs: {
			WorkWeekStartDate: 'Sunday',
			MarkTimeEntriesBillable: false,
			ShowBillRateToAll: true,
			UseServices: false,
			BillCustomers: false,
		},
		CurrencyPrefs: {
			HomeCurrency: {
				value: 'GBP',
			},
			MultiCurrencyEnabled: true,
		},
		Id: '2',
		MetaData: {
			CreateTime: '2022-04-15T09:22:15-05:00',
			LastUpdatedTime: '2025-01-01T11:14:33-05:00',
		},
	},
	{
		EmailMessagesPrefs: {
			InvoiceMessage: {
				Message: 'Your invoice is attached. Payment is due within 30 days.\nWe value your business.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Invoice from Acme Consulting, Inc.',
			},
			EstimateMessage: {
				Message: 'Please find your estimate attached. Contact us with any questions.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Estimate from Acme Consulting, Inc.',
			},
			SalesReceiptMessage: {
				Message: 'Thank you for your payment. Your receipt is attached.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Receipt from Acme Consulting, Inc.',
			},
			StatementMessage: {
				Message: 'Please find your statement attached.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Statement from Acme Consulting, Inc.',
			},
		},
		ProductAndServicesPrefs: {
			QuantityWithPriceAndRate: false,
			ForPurchase: true,
			QuantityOnHand: false,
			ForSales: true,
		},
		domain: 'QBO',
		SyncToken: '3',
		ReportPrefs: {
			ReportBasis: 'Cash',
			CalcAgingReportFromTxnDate: true,
		},
		AccountingInfoPrefs: {
			FirstMonthOfFiscalYear: 'April',
			UseAccountNumbers: false,
			TaxYearMonth: 'April',
			ClassTrackingPerTxn: true,
			TrackDepartments: false,
			TaxForm: '5',
			CustomerTerminology: 'Clients',
			BookCloseDate: '2023-03-31',
			DepartmentTerminology: 'Department',
			ClassTrackingPerTxnLine: false,
		},
		SalesFormsPrefs: {
			ETransactionPaymentEnabled: true,
			CustomTxnNumbers: true,
			AllowShipping: true,
			AllowServiceDate: true,
			ETransactionEnabledStatus: 'Enabled',
			DefaultCustomerMessage: 'Thank you for your business!',
			EmailCopyToCompany: true,
			AllowEstimates: true,
			DefaultTerms: {
				value: '2',
			},
			AllowDiscount: false,
			DefaultDiscountAccount: '42',
			AllowDeposit: false,
			AutoApplyPayments: false,
			IPNSupportEnabled: true,
			AutoApplyCredit: false,
			CustomField: [
				{
					CustomField: [
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom3',
						},
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom2',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom1',
						},
					],
				},
				{
					CustomField: [
						{
							StringValue: 'Project ID',
							Type: 'StringType',
							Name: 'SalesFormsPrefs.SalesCustomName3',
						},
						{
							StringValue: 'Department',
							Type: 'StringType',
							Name: 'SalesFormsPrefs.SalesCustomName2',
						},
					],
				},
			],
			UsingPriceLevels: true,
			ETransactionAttachPDF: true,
		},
		VendorAndPurchasesPrefs: {
			BillableExpenseTracking: false,
			TrackingByCustomer: false,
			POCustomField: [
				{
					CustomField: [
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom3',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom2',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom1',
						},
					],
				},
				{
					CustomField: [
						{
							StringValue: 'Project Code',
							Type: 'StringType',
							Name: 'PurchasePrefs.PurchaseCustomName3',
						},
					],
				},
			],
		},
		TaxPrefs: {
			TaxGroupCodeRef: {
				value: '5',
			},
			UsingSalesTax: false,
		},
		OtherPrefs: {
			NameValue: [
				{
					Name: 'SalesFormsPrefs.DefaultCustomerMessage',
					Value: 'Thank you for your business!',
				},
				{
					Name: 'SalesFormsPrefs.DefaultItem',
					Value: '3',
				},
				{
					Name: 'DTXCopyMemo',
					Value: 'true',
				},
				{
					Name: 'UncategorizedAssetAccountId',
					Value: '45',
				},
				{
					Name: 'UncategorizedIncomeAccountId',
					Value: '46',
				},
				{
					Name: 'UncategorizedExpenseAccountId',
					Value: '47',
				},
				{
					Name: 'SFCEnabled',
					Value: 'false',
				},
				{
					Name: 'DataPartner',
					Value: 'true',
				},
				{
					Name: 'Vendor1099Enabled',
					Value: 'false',
				},
				{
					Name: 'TimeTrackingFeatureEnabled',
					Value: 'false',
				},
				{
					Name: 'FDPEnabled',
					Value: 'true',
				},
				{
					Name: 'ProjectsEnabled',
					Value: 'true',
				},
				{
					Name: 'DateFormat',
					Value: 'Date Month Year separated by a slash',
				},
				{
					Name: 'DateFormatMnemonic',
					Value: 'DDMMYYYY_SEP_SLASH',
				},
				{
					Name: 'NumberFormat',
					Value: 'UK Number Format',
				},
				{
					Name: 'NumberFormatMnemonic',
					Value: 'UK_NB',
				},
				{
					Name: 'WarnDuplicateCheckNumber',
					Value: 'false',
				},
				{
					Name: 'WarnDuplicateBillNumber',
					Value: 'true',
				},
				{
					Name: 'SignoutInactiveMinutes',
					Value: '30',
				},
				{
					Name: 'AccountingInfoPrefs.ShowAccountNumbers',
					Value: 'true',
				},
			],
		},
		sparse: false,
		TimeTrackingPrefs: {
			WorkWeekStartDate: 'Sunday',
			MarkTimeEntriesBillable: false,
			ShowBillRateToAll: true,
			UseServices: false,
			BillCustomers: false,
		},
		CurrencyPrefs: {
			HomeCurrency: {
				value: 'GBP',
			},
			MultiCurrencyEnabled: true,
		},
		Id: '2',
		MetaData: {
			CreateTime: '2022-04-15T09:22:15-05:00',
			LastUpdatedTime: '2023-01-05T11:14:33-05:00',
		},
	},
	{
		EmailMessagesPrefs: {
			InvoiceMessage: {
				Message: 'Your invoice is attached. Payment is due within 30 days.\nWe value your business.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Invoice from Acme Consulting, Inc.',
			},
			EstimateMessage: {
				Message: 'Please find your estimate attached. Contact us with any questions.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Estimate from Acme Consulting, Inc.',
			},
			SalesReceiptMessage: {
				Message: 'Thank you for your payment. Your receipt is attached.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Receipt from Acme Consulting, Inc.',
			},
			StatementMessage: {
				Message: 'Please find your statement attached.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Statement from Acme Consulting, Inc.',
			},
		},
		ProductAndServicesPrefs: {
			QuantityWithPriceAndRate: false,
			ForPurchase: true,
			QuantityOnHand: false,
			ForSales: true,
		},
		domain: 'QBO',
		SyncToken: '3',
		ReportPrefs: {
			ReportBasis: 'Cash',
			CalcAgingReportFromTxnDate: true,
		},
		AccountingInfoPrefs: {
			FirstMonthOfFiscalYear: 'April',
			UseAccountNumbers: false,
			TaxYearMonth: 'April',
			ClassTrackingPerTxn: true,
			TrackDepartments: false,
			TaxForm: '5',
			CustomerTerminology: 'Clients',
			BookCloseDate: '2023-03-31',
			DepartmentTerminology: 'Department',
			ClassTrackingPerTxnLine: false,
		},
		SalesFormsPrefs: {
			ETransactionPaymentEnabled: true,
			CustomTxnNumbers: true,
			AllowShipping: true,
			AllowServiceDate: true,
			ETransactionEnabledStatus: 'Enabled',
			DefaultCustomerMessage: 'Thank you for your business!',
			EmailCopyToCompany: true,
			AllowEstimates: true,
			DefaultTerms: {
				value: '2',
			},
			AllowDiscount: false,
			DefaultDiscountAccount: '42',
			AllowDeposit: false,
			AutoApplyPayments: false,
			IPNSupportEnabled: true,
			AutoApplyCredit: false,
			CustomField: [
				{
					CustomField: [
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom3',
						},
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom2',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom1',
						},
					],
				},
				{
					CustomField: [
						{
							StringValue: 'Project ID',
							Type: 'StringType',
							Name: 'SalesFormsPrefs.SalesCustomName3',
						},
						{
							StringValue: 'Department',
							Type: 'StringType',
							Name: 'SalesFormsPrefs.SalesCustomName2',
						},
					],
				},
			],
			UsingPriceLevels: true,
			ETransactionAttachPDF: true,
		},
		VendorAndPurchasesPrefs: {
			BillableExpenseTracking: false,
			TrackingByCustomer: false,
			POCustomField: [
				{
					CustomField: [
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom3',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom2',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom1',
						},
					],
				},
				{
					CustomField: [
						{
							StringValue: 'Project Code',
							Type: 'StringType',
							Name: 'PurchasePrefs.PurchaseCustomName3',
						},
					],
				},
			],
		},
		TaxPrefs: {
			TaxGroupCodeRef: {
				value: '5',
			},
			UsingSalesTax: false,
		},
		OtherPrefs: {
			NameValue: [
				{
					Name: 'SalesFormsPrefs.DefaultCustomerMessage',
					Value: 'Thank you for your business!',
				},
				{
					Name: 'SalesFormsPrefs.DefaultItem',
					Value: '3',
				},
				{
					Name: 'DTXCopyMemo',
					Value: 'true',
				},
				{
					Name: 'UncategorizedAssetAccountId',
					Value: '45',
				},
				{
					Name: 'UncategorizedIncomeAccountId',
					Value: '46',
				},
				{
					Name: 'UncategorizedExpenseAccountId',
					Value: '47',
				},
				{
					Name: 'SFCEnabled',
					Value: 'false',
				},
				{
					Name: 'DataPartner',
					Value: 'true',
				},
				{
					Name: 'Vendor1099Enabled',
					Value: 'false',
				},
				{
					Name: 'TimeTrackingFeatureEnabled',
					Value: 'false',
				},
				{
					Name: 'FDPEnabled',
					Value: 'true',
				},
				{
					Name: 'ProjectsEnabled',
					Value: 'true',
				},
				{
					Name: 'DateFormat',
					Value: 'Date Month Year separated by a slash',
				},
				{
					Name: 'DateFormatMnemonic',
					Value: 'DDMMYYYY_SEP_SLASH',
				},
				{
					Name: 'NumberFormat',
					Value: 'UK Number Format',
				},
				{
					Name: 'NumberFormatMnemonic',
					Value: 'UK_NB',
				},
				{
					Name: 'WarnDuplicateCheckNumber',
					Value: 'false',
				},
				{
					Name: 'WarnDuplicateBillNumber',
					Value: 'true',
				},
				{
					Name: 'SignoutInactiveMinutes',
					Value: '30',
				},
				{
					Name: 'AccountingInfoPrefs.ShowAccountNumbers',
					Value: 'true',
				},
			],
		},
		sparse: false,
		TimeTrackingPrefs: {
			WorkWeekStartDate: 'Sunday',
			MarkTimeEntriesBillable: false,
			ShowBillRateToAll: true,
			UseServices: false,
			BillCustomers: false,
		},
		CurrencyPrefs: {
			HomeCurrency: {
				value: 'GBP',
			},
			MultiCurrencyEnabled: true,
		},
		Id: '2',
		MetaData: {
			CreateTime: '2022-04-15T09:22:15-05:00',
			LastUpdatedTime: '2024-01-05T11:14:33-05:00',
		},
	},
	{
		EmailMessagesPrefs: {
			InvoiceMessage: {
				Message: 'Your invoice is attached. Payment is due within 30 days.\nWe value your business.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Invoice from Acme Consulting, Inc.',
			},
			EstimateMessage: {
				Message: 'Please find your estimate attached. Contact us with any questions.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Estimate from Acme Consulting, Inc.',
			},
			SalesReceiptMessage: {
				Message: 'Thank you for your payment. Your receipt is attached.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Receipt from Acme Consulting, Inc.',
			},
			StatementMessage: {
				Message: 'Please find your statement attached.\n\nRegards,\nAcme Consulting, Inc.',
				Subject: 'Statement from Acme Consulting, Inc.',
			},
		},
		ProductAndServicesPrefs: {
			QuantityWithPriceAndRate: false,
			ForPurchase: true,
			QuantityOnHand: false,
			ForSales: true,
		},
		domain: 'QBO',
		SyncToken: '3',
		ReportPrefs: {
			ReportBasis: 'Cash',
			CalcAgingReportFromTxnDate: true,
		},
		AccountingInfoPrefs: {
			FirstMonthOfFiscalYear: 'April',
			UseAccountNumbers: false,
			TaxYearMonth: 'April',
			ClassTrackingPerTxn: true,
			TrackDepartments: false,
			TaxForm: '5',
			CustomerTerminology: 'Clients',
			BookCloseDate: '2023-03-31',
			DepartmentTerminology: 'Department',
			ClassTrackingPerTxnLine: false,
		},
		SalesFormsPrefs: {
			ETransactionPaymentEnabled: true,
			CustomTxnNumbers: true,
			AllowShipping: true,
			AllowServiceDate: true,
			ETransactionEnabledStatus: 'Enabled',
			DefaultCustomerMessage: 'Thank you for your business!',
			EmailCopyToCompany: true,
			AllowEstimates: true,
			DefaultTerms: {
				value: '2',
			},
			AllowDiscount: false,
			DefaultDiscountAccount: '42',
			AllowDeposit: false,
			AutoApplyPayments: false,
			IPNSupportEnabled: true,
			AutoApplyCredit: false,
			CustomField: [
				{
					CustomField: [
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom3',
						},
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom2',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'SalesFormsPrefs.UseSalesCustom1',
						},
					],
				},
				{
					CustomField: [
						{
							StringValue: 'Project ID',
							Type: 'StringType',
							Name: 'SalesFormsPrefs.SalesCustomName3',
						},
						{
							StringValue: 'Department',
							Type: 'StringType',
							Name: 'SalesFormsPrefs.SalesCustomName2',
						},
					],
				},
			],
			UsingPriceLevels: true,
			ETransactionAttachPDF: true,
		},
		VendorAndPurchasesPrefs: {
			BillableExpenseTracking: false,
			TrackingByCustomer: false,
			POCustomField: [
				{
					CustomField: [
						{
							BooleanValue: true,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom3',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom2',
						},
						{
							BooleanValue: false,
							Type: 'BooleanType',
							Name: 'PurchasePrefs.UsePurchaseCustom1',
						},
					],
				},
				{
					CustomField: [
						{
							StringValue: 'Project Code',
							Type: 'StringType',
							Name: 'PurchasePrefs.PurchaseCustomName3',
						},
					],
				},
			],
		},
		TaxPrefs: {
			TaxGroupCodeRef: {
				value: '5',
			},
			UsingSalesTax: false,
		},
		OtherPrefs: {
			NameValue: [
				{
					Name: 'SalesFormsPrefs.DefaultCustomerMessage',
					Value: 'Thank you for your business!',
				},
				{
					Name: 'SalesFormsPrefs.DefaultItem',
					Value: '3',
				},
				{
					Name: 'DTXCopyMemo',
					Value: 'true',
				},
				{
					Name: 'UncategorizedAssetAccountId',
					Value: '45',
				},
				{
					Name: 'UncategorizedIncomeAccountId',
					Value: '46',
				},
				{
					Name: 'UncategorizedExpenseAccountId',
					Value: '47',
				},
				{
					Name: 'SFCEnabled',
					Value: 'false',
				},
				{
					Name: 'DataPartner',
					Value: 'true',
				},
				{
					Name: 'Vendor1099Enabled',
					Value: 'false',
				},
				{
					Name: 'TimeTrackingFeatureEnabled',
					Value: 'false',
				},
				{
					Name: 'FDPEnabled',
					Value: 'true',
				},
				{
					Name: 'ProjectsEnabled',
					Value: 'true',
				},
				{
					Name: 'DateFormat',
					Value: 'Date Month Year separated by a slash',
				},
				{
					Name: 'DateFormatMnemonic',
					Value: 'DDMMYYYY_SEP_SLASH',
				},
				{
					Name: 'NumberFormat',
					Value: 'UK Number Format',
				},
				{
					Name: 'NumberFormatMnemonic',
					Value: 'UK_NB',
				},
				{
					Name: 'WarnDuplicateCheckNumber',
					Value: 'false',
				},
				{
					Name: 'WarnDuplicateBillNumber',
					Value: 'true',
				},
				{
					Name: 'SignoutInactiveMinutes',
					Value: '30',
				},
				{
					Name: 'AccountingInfoPrefs.ShowAccountNumbers',
					Value: 'true',
				},
			],
		},
		sparse: false,
		TimeTrackingPrefs: {
			WorkWeekStartDate: 'Sunday',
			MarkTimeEntriesBillable: false,
			ShowBillRateToAll: true,
			UseServices: false,
			BillCustomers: false,
		},
		CurrencyPrefs: {
			HomeCurrency: {
				value: 'GBP',
			},
			MultiCurrencyEnabled: true,
		},
		Id: '2',
		MetaData: {
			CreateTime: '2021-04-15T09:22:15-05:00',
			LastUpdatedTime: '2023-01-05T11:14:33-05:00',
		},
	},
];
