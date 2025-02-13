// Imports
import { type DeepKeys, type Invoice } from '../types';

// Export the Invoice Search Options
export interface InvoiceSearchOptions {
	startPosition?: number;
	maxResults?: number;
	minorVersion?: string;
	orderBy?: { field: DeepKeys<Invoice>; direction: 'ASC' | 'DESC' };
}
