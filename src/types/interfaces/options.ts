// Import the Search Options
import { Customer, Estimate, Invoice, InvoiceStatus, SearchOptions } from '../types';

// Setup the Invoice Options
export interface InvoiceOptions extends Options<Invoice> {
	status?: InvoiceStatus;
}

// Setup the Estimate Options
export interface EstimateOptions extends Options<Estimate> {}

// Setup the Invoice Options
export interface CustomerOptions extends Options<Customer> {}

// Export the Options
export interface Options<T> {
	searchOptions?: SearchOptions<T>;
}
