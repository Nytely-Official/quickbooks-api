// Imports
import type { Estimate } from '../../src/app';

// Export the Mock Invoice Data
export const mockEstimateData: Array<Estimate> = [
	{
		domain: 'QBO',
		sparse: false,
		Id: '100',
		SyncToken: '0',
		MetaData: {
			CreateTime: '2025-01-09T13:37:55-08:00',
			LastUpdatedTime: '2025-01-10T13:16:17-08:00',
		},
		CustomField: [],
		DocNumber: '1001',
		TxnDate: '2025-01-07',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		TxnStatus: 'Closed' as any,
		LinkedTxn: [
			{
				TxnId: '130',
				TxnType: 'Invoice',
			},
		],
		Line: [
			{
				Id: '1',
				LineNum: 1,
				Description: 'Rock Fountain',
				Amount: 275,
				DetailType: 'SalesItemLineDetail' as any,
				SalesItemLineDetail: {
					ItemRef: {
						value: '5',
						name: 'Rock Fountain',
					},
					UnitPrice: 275,
					Qty: 1,
					ItemAccountRef: {
						value: '48',
						name: 'Landscaping Services:Job Materials:Fountains and Garden Lighting',
					},
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Id: '2',
				LineNum: 2,
				Description: 'Fountain Pump',
				Amount: 12.75,
				DetailType: 'SalesItemLineDetail' as any,
				SalesItemLineDetail: {
					ItemRef: {
						value: '11',
						name: 'Pump',
					},
					UnitPrice: 12.75,
					Qty: 1,
					ItemAccountRef: {
						value: '48',
						name: 'Landscaping Services:Job Materials:Fountains and Garden Lighting',
					},
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Id: '3',
				LineNum: 3,
				Description: 'Concrete for fountain installation',
				Amount: 47.5,
				DetailType: 'SalesItemLineDetail' as any,
				SalesItemLineDetail: {
					ItemRef: {
						value: '3',
						name: 'Concrete',
					},
					UnitPrice: 9.5,
					Qty: 5,
					ItemAccountRef: {
						value: '48',
						name: 'Landscaping Services:Job Materials:Fountains and Garden Lighting',
					},
					TaxCodeRef: {
						value: 'TAX',
					},
				},
			},
			{
				Amount: 335.25,
				DetailType: 'SubTotalLineDetail' as any,
				SubTotalLineDetail: {},
			},
		],
		TxnTaxDetail: {
			TxnTaxCodeRef: {
				value: '2',
			},
			TotalTax: 26.82,
			TaxLine: [
				{
					Amount: 26.82,
					DetailType: 'TaxLineDetail' as any,
					TaxLineDetail: {
						TaxRateRef: {
							value: '3',
						},
						PercentBased: true,
						TaxPercent: 8,
						NetAmountTaxable: 335.25,
					},
				},
			],
		},
		CustomerRef: {
			value: '24',
			name: 'Sonnenschein Family Store',
		},
		CustomerMemo: {
			value: 'Thank you for your business and have a great day!',
		},
		BillAddr: {
			Id: '86',
			Line1: 'Russ Sonnenschein',
			Line2: 'Sonnenschein Family Store',
			Line3: '5647 Cypress Hill Ave.',
			Line4: 'Middlefield, CA  94303',
			Lat: '37.4238562',
			Long: '-122.1141681',
		},
		ShipAddr: {
			Id: '25',
			Line1: '5647 Cypress Hill Ave.',
			City: 'Middlefield',
			CountrySubDivisionCode: 'CA',
			PostalCode: '94303',
			Lat: '37.4238562',
			Long: '-122.1141681',
		},
		FreeFormAddress: true,
		TotalAmt: 362.07,
		ApplyTaxAfterDiscount: false,
		PrintStatus: 'NeedToPrint',
		EmailStatus: 'NotSet' as any,
		BillEmail: {
			Address: 'Familiystore@intuit.com',
		},
	},
	{
		domain: 'QBO',
		sparse: false,
		Id: '41',
		SyncToken: '0',
		MetaData: {
			CreateTime: '2025-01-08T11:20:06-08:00',
			LastUpdatedTime: '2025-01-09T13:41:59-08:00',
		},
		CustomField: [],
		DocNumber: '1001',
		TxnDate: '2024-12-29',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		TxnStatus: 'Closed' as any,
		LinkedTxn: [
			{
				TxnId: '103',
				TxnType: 'Invoice',
			},
		],
		Line: [
			{
				Id: '1',
				LineNum: 1,
				Description: 'Rock Fountain',
				Amount: 275,
				DetailType: 'SalesItemLineDetail' as any,
				SalesItemLineDetail: {
					ItemRef: {
						value: '5',
						name: 'Rock Fountain',
					},
					UnitPrice: 275,
					Qty: 1,
					ItemAccountRef: {
						value: '48',
						name: 'Landscaping Services:Job Materials:Fountains and Garden Lighting',
					},
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
			{
				Id: '2',
				LineNum: 2,
				Description: 'Custom Design',
				Amount: 262.5,
				DetailType: 'SalesItemLineDetail' as any,
				SalesItemLineDetail: {
					ItemRef: {
						value: '4',
						name: 'Design',
					},
					UnitPrice: 75,
					Qty: 3.5,
					ItemAccountRef: {
						value: '82',
						name: 'Design income',
					},
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
			{
				Id: '3',
				LineNum: 3,
				Description: 'Fountain Pump',
				Amount: 45,
				DetailType: 'SalesItemLineDetail' as any,
				SalesItemLineDetail: {
					ItemRef: {
						value: '11',
						name: 'Pump',
					},
					UnitPrice: 22.5,
					Qty: 2,
					ItemAccountRef: {
						value: '48',
						name: 'Landscaping Services:Job Materials:Fountains and Garden Lighting',
					},
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
			{
				Amount: 582.5,
				DetailType: 'SubTotalLineDetail' as any,
				SubTotalLineDetail: {},
			},
		],
		TxnTaxDetail: {
			TotalTax: 0,
		},
		CustomerRef: {
			value: '10',
			name: 'Geeta Kalapatapu',
		},
		CustomerMemo: {
			value: 'Thank you for your business and have a great day!',
		},
		BillAddr: {
			Id: '59',
			Line1: 'Geeta Kalapatapu',
			Line2: '1987 Main St.',
			Line3: 'Middlefield, CA  94303',
			Lat: '37.4530553',
			Long: '-122.1178261',
		},
		ShipAddr: {
			Id: '10',
			Line1: '1987 Main St.',
			City: 'Middlefield',
			CountrySubDivisionCode: 'CA',
			PostalCode: '94303',
			Lat: '37.445013',
			Long: '-122.1391443',
		},
		FreeFormAddress: true,
		TotalAmt: 582.5,
		ApplyTaxAfterDiscount: false,
		PrintStatus: 'NeedToPrint',
		EmailStatus: 'NotSet' as any,
		BillEmail: {
			Address: 'Geeta@Kalapatapu.com',
		},
	},
	{
		domain: 'QBO',
		sparse: false,
		Id: '46',
		SyncToken: '0',
		MetaData: {
			CreateTime: '2025-01-08T11:36:01-08:00',
			LastUpdatedTime: '2025-01-09T12:42:59-08:00',
		},
		CustomField: [],
		DocNumber: '1001',
		TxnDate: '2025-01-06',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		TxnStatus: 'Closed' as any,
		LinkedTxn: [
			{
				TxnId: '69',
				TxnType: 'Invoice',
			},
		],
		Line: [
			{
				Id: '1',
				LineNum: 1,
				Description: 'Pest Control Services',
				Amount: 70,
				DetailType: 'SalesItemLineDetail' as any,
				SalesItemLineDetail: {
					ItemRef: {
						value: '10',
						name: 'Pest Control',
					},
					UnitPrice: 35,
					Qty: 2,
					ItemAccountRef: {
						value: '54',
						name: 'Pest Control Services',
					},
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
			{
				Amount: 70,
				DetailType: 'SubTotalLineDetail' as any,
				SubTotalLineDetail: {},
			},
		],
		TxnTaxDetail: {
			TotalTax: 0,
		},
		CustomerRef: {
			value: '20',
			name: 'Red Rock Diner',
		},
		CustomerMemo: {
			value: 'Thank you for your business and have a great day!',
		},
		BillAddr: {
			Id: '65',
			Line1: 'Stephanie Martini',
			Line2: 'Red Rock Diner',
			Line3: '500 Red Rock Rd.',
			Line4: 'Bayshore, CA  94326',
			Lat: 'INVALID',
			Long: 'INVALID',
		},
		ShipAddr: {
			Id: '21',
			Line1: '500 Red Rock Rd.',
			City: 'Bayshore',
			CountrySubDivisionCode: 'CA',
			PostalCode: '94326',
			Lat: 'INVALID',
			Long: 'INVALID',
		},
		FreeFormAddress: true,
		TotalAmt: 70,
		ApplyTaxAfterDiscount: false,
		PrintStatus: 'NeedToPrint',
		EmailStatus: 'NotSet' as any,
		BillEmail: {
			Address: 'qbwebsamplecompany@yahoo.com',
		},
	},
	{
		domain: 'QBO',
		sparse: false,
		Id: '48',
		SyncToken: '0',
		MetaData: {
			CreateTime: '2025-01-08T11:42:38-08:00',
			LastUpdatedTime: '2025-01-08T11:43:20-08:00',
		},
		CustomField: [],
		DocNumber: '1001',
		TxnDate: '2025-01-06',
		CurrencyRef: {
			value: 'USD',
			name: 'United States Dollar',
		},
		TxnStatus: 'Closed' as any,
		LinkedTxn: [
			{
				TxnId: '49',
				TxnType: 'Invoice',
			},
		],
		Line: [
			{
				Id: '1',
				LineNum: 1,
				Description: 'Custom Design',
				Amount: 300,
				DetailType: 'SalesItemLineDetail' as any,
				SalesItemLineDetail: {
					ItemRef: {
						value: '4',
						name: 'Design',
					},
					UnitPrice: 75,
					Qty: 4,
					ItemAccountRef: {
						value: '82',
						name: 'Design income',
					},
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
			{
				Id: '2',
				LineNum: 2,
				Description: 'Installation of landscape design',
				Amount: 250,
				DetailType: 'SalesItemLineDetail' as any,
				SalesItemLineDetail: {
					ItemRef: {
						value: '7',
						name: 'Installation',
					},
					UnitPrice: 50,
					Qty: 5,
					ItemAccountRef: {
						value: '52',
						name: 'Landscaping Services:Labor:Installation',
					},
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
			{
				Id: '3',
				LineNum: 3,
				Description: 'Rock Fountain',
				Amount: 275,
				DetailType: 'SalesItemLineDetail' as any,
				SalesItemLineDetail: {
					ItemRef: {
						value: '5',
						name: 'Rock Fountain',
					},
					UnitPrice: 275,
					Qty: 1,
					ItemAccountRef: {
						value: '48',
						name: 'Landscaping Services:Job Materials:Fountains and Garden Lighting',
					},
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
			{
				Id: '4',
				LineNum: 4,
				Description: 'Garden Rocks',
				Amount: 180,
				DetailType: 'SalesItemLineDetail' as any,
				SalesItemLineDetail: {
					ItemRef: {
						value: '13',
						name: 'Rocks',
					},
					UnitPrice: 22.5,
					Qty: 8,
					ItemAccountRef: {
						value: '48',
						name: 'Landscaping Services:Job Materials:Fountains and Garden Lighting',
					},
					TaxCodeRef: {
						value: 'NON',
					},
				},
			},
			{
				Amount: 1005,
				DetailType: 'SubTotalLineDetail' as any,
				SubTotalLineDetail: {},
			},
		],
		TxnTaxDetail: {
			TotalTax: 0,
		},
		CustomerRef: {
			value: '18',
			name: 'Paulsen Medical Supplies',
		},
		CustomerMemo: {
			value: 'Thank you for your business and have a great day!',
		},
		BillAddr: {
			Id: '67',
			Line1: 'Kathy Paulsen',
			Line2: 'Paulsen Medical Supplies',
			Line3: '900 Main St.',
			Line4: 'Middlefield, CA  94303',
			Lat: '37.4530553',
			Long: '-122.1178261',
		},
		ShipAddr: {
			Id: '19',
			Line1: '38921 S. Boise Ave',
			City: 'Middlefield',
			CountrySubDivisionCode: 'CA',
			PostalCode: '94304',
			Lat: '37.3989376',
			Long: '-122.1443935',
		},
		FreeFormAddress: true,
		TotalAmt: 1005,
		ApplyTaxAfterDiscount: false,
		PrintStatus: 'NeedToPrint',
		EmailStatus: 'NeedToSend' as any,
		BillEmail: {
			Address: 'Medical@intuit.com',
		},
		DeliveryInfo: {
			DeliveryType: 'Email',
		},
	},
];
