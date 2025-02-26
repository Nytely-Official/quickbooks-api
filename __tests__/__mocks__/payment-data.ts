// Imports
import type { Payment } from '../../src/app';

export const mockPaymentData: Array<Payment> = [
	{
		SyncToken: '1',
		domain: 'QBO',
		DepositToAccountRef: { value: '101' },
		UnappliedAmt: 0,
		TxnDate: '2024-02-15',
		TotalAmt: 500.0,
		ProjectRef: { value: 'P001' },
		ProcessPayment: true,
		sparse: false,
		Line: [
			{
				Amount: 500.0,
				LineEx: { any: [] },
				LinkedTxn: [{ TxnId: '1001', TxnType: 'Invoice' }],
			},
		],
		CustomerRef: { name: 'Alice', value: 'C001' },
		Id: '10',
		MetaData: {
			CreateTime: '2024-02-15T12:00:00-07:00',
			LastUpdatedTime: '2024-02-16T09:30:00-07:00',
		},
	},
	{
		SyncToken: '2',
		domain: 'QBO',
		DepositToAccountRef: { value: '102' },
		UnappliedAmt: 50,
		TxnDate: '2021-01-28',
		TotalAmt: 300.5,
		ProjectRef: { value: 'P002' },
		ProcessPayment: false,
		sparse: false,
		Line: [
			{
				Amount: 300.5,
				LineEx: { any: [] },
				LinkedTxn: [{ TxnId: '1002', TxnType: 'Invoice' }],
			},
		],
		CustomerRef: { name: 'Mike', value: 'C002' },
		Id: '11',
		MetaData: {
			CreateTime: '2024-01-28T14:45:00-07:00',
			LastUpdatedTime: '2021-02-01T08:20:00-07:00',
		},
	},
	{
		SyncToken: '3',
		domain: 'QBO',
		DepositToAccountRef: { value: '103' },
		UnappliedAmt: 0,
		TxnDate: '2022-03-05',
		TotalAmt: 1200.75,
		ProjectRef: { value: 'P003' },
		ProcessPayment: true,
		sparse: false,
		Line: [
			{
				Amount: 1200.75,
				LineEx: { any: [] },
				LinkedTxn: [{ TxnId: '1003', TxnType: 'Invoice' }],
			},
		],
		CustomerRef: { name: 'Jenny', value: 'C003' },
		Id: '12',
		MetaData: {
			CreateTime: '2024-03-05T10:10:00-07:00',
			LastUpdatedTime: '2022-03-06T11:15:00-07:00',
		},
	},
	{
		SyncToken: '4',
		domain: 'QBO',
		DepositToAccountRef: { value: '104' },
		UnappliedAmt: 20,
		TxnDate: '2023-02-10',
		TotalAmt: 800.0,
		ProjectRef: { value: 'P004' },
		ProcessPayment: true,
		sparse: false,
		Line: [
			{
				Amount: 800.0,
				LineEx: { any: [] },
				LinkedTxn: [{ TxnId: '1004', TxnType: 'Invoice' }],
			},
		],
		CustomerRef: { name: 'Tom', value: 'C004' },
		Id: '13',
		MetaData: {
			CreateTime: '2024-02-10T09:15:00-07:00',
			LastUpdatedTime: '2023-02-12T08:40:00-07:00',
		},
	},
	{
		SyncToken: '5',
		domain: 'QBO',
		DepositToAccountRef: { value: '105' },
		UnappliedAmt: 10,
		TxnDate: '2025-01-20',
		TotalAmt: 150.25,
		ProjectRef: { value: 'P005' },
		ProcessPayment: false,
		sparse: false,
		Line: [
			{
				Amount: 150.25,
				LineEx: { any: [] },
				LinkedTxn: [{ TxnId: '1005', TxnType: 'Invoice' }],
			},
		],
		CustomerRef: { name: 'Emma', value: 'C005' },
		Id: '14',
		MetaData: {
			CreateTime: '2024-01-20T07:30:00-07:00',
			LastUpdatedTime: '2025-01-22T12:00:00-07:00',
		},
	},
];
