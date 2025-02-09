/**
 * The type of query to run
 */
export enum Query {
	Invoice = 'select * from invoice',
	Estimate = 'select * from estimate',
	Customer = 'select * from customer',
	Payment = 'select * from payment',
	CreditMemo = 'select * from creditmemo',
	Preferences = 'select * from Preferences',
}
