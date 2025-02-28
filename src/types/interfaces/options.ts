// Import the Search Options
import { Account, CreditMemo, Customer, Estimate, Invoice, InvoiceStatus, Payment, Preferences, SearchOptions } from '../types';

// Setup the Invoice Options
export interface InvoiceOptions extends Options<Invoice> {
	status?: InvoiceStatus;
}

// Setup the Estimate Options
export interface EstimateOptions extends Options<Estimate> {}

// Setup the Invoice Options
export interface CustomerOptions extends Options<Customer> {}

// Setup the Payment Options
export interface PaymentOptions extends Options<Payment> {}

// Setup the Account Options
export interface AccountOptions extends Options<Account> {}

// Setup the Credit Memo Options
export interface CreditMemoOptions extends Options<CreditMemo> {}

// Setup the Preference Options
export interface PreferenceOptions extends Options<Preferences> {}

// Export the Options
export interface Options<T> {
	searchOptions?: SearchOptions<T>;
}
