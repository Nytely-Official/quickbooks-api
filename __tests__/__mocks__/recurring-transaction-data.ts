import type { RecurringTransaction } from '../../src/app';

export const mockRecurringTransactionData: Array<RecurringTransaction> = [
	{
		Id: 'RT-001',
		SyncToken: '0',
		MetaData: {
			CreateTime: '2024-01-15T10:00:00Z',
			LastUpdatedTime: '2024-01-15T10:30:00Z',
		},
		RecurringInfo: {
			Name: 'Monthly HOA Invoice - Unit 2A',
			RecurType: 'Automated',
			Active: true,
			ScheduleInfo: {
				IntervalType: 'Monthly',
				NumInterval: 1,
				DayOfMonth: 1,
				StartDate: '2026-03-01',
				NextDate: '2026-03-01',
				MaxOccurrences: 0,
				DaysBefore: 0,
			},
		},
		Invoice: {
			CustomerRef: { value: 'QBO-CUST-001', name: 'Jane Smith' },
			Line: [
				{
					Amount: 500.0,
					DetailType: 'SalesItemLineDetail',
					Description: 'Monthly Common Charge',
					SalesItemLineDetail: {
						ItemRef: { value: '1', name: 'HOA Common Charge' },
						UnitPrice: 500.0,
						Qty: 1,
					},
				},
			],
			DueDate: '2026-03-01',
			BillEmail: { Address: 'jane.smith@test.com' },
		},
	},
	{
		Id: 'RT-002',
		SyncToken: '1',
		MetaData: {
			CreateTime: '2024-01-15T10:05:00Z',
			LastUpdatedTime: '2024-01-15T10:35:00Z',
		},
		RecurringInfo: {
			Name: 'Monthly HOA Invoice - Unit 3B',
			RecurType: 'Automated',
			Active: true,
			ScheduleInfo: {
				IntervalType: 'Monthly',
				NumInterval: 1,
				DayOfMonth: 1,
				StartDate: '2026-03-01',
				NextDate: '2026-03-01',
				MaxOccurrences: 0,
				DaysBefore: 0,
			},
		},
		Invoice: {
			CustomerRef: { value: 'QBO-CUST-002', name: 'John Lee' },
			Line: [
				{
					Amount: 500.0,
					DetailType: 'SalesItemLineDetail',
					Description: 'Monthly Common Charge',
					SalesItemLineDetail: {
						ItemRef: { value: '1', name: 'HOA Common Charge' },
						UnitPrice: 500.0,
						Qty: 1,
					},
				},
				{
					Amount: 100.0,
					DetailType: 'SalesItemLineDetail',
					Description: 'Special Assessment',
					SalesItemLineDetail: {
						ItemRef: { value: '2', name: 'Special Assessment' },
						UnitPrice: 100.0,
						Qty: 1,
					},
				},
			],
			DueDate: '2026-03-01',
			BillEmail: { Address: 'john.lee@test.com' },
		},
	},
	{
		Id: 'RT-003',
		SyncToken: '0',
		MetaData: {
			CreateTime: '2024-02-01T08:00:00Z',
			LastUpdatedTime: '2025-06-01T09:00:00Z',
		},
		RecurringInfo: {
			Name: 'Quarterly Vendor Bill',
			RecurType: 'Reminded',
			Active: false,
			ScheduleInfo: {
				IntervalType: 'Monthly',
				NumInterval: 3,
				DayOfMonth: 15,
				StartDate: '2024-01-15',
				NextDate: '2024-04-15',
				MaxOccurrences: 4,
				DaysBefore: 5,
			},
		},
		Bill: {
			VendorRef: { value: '45', name: 'Office Depot' },
			Line: [
				{
					Id: '1',
					Description: 'Office Supplies',
					Amount: 250.0,
					DetailType: 'AccountBasedExpenseLineDetail',
					AccountBasedExpenseLineDetail: {
						AccountRef: { value: '70', name: 'Office Supplies' },
					},
				},
			],
			DueDate: '2024-02-15',
			TotalAmt: 250.0,
		},
	},
];
