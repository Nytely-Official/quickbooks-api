// Imports
import { type DeepKeys } from '../types';

// Export the Search Options
export interface SearchOptions<T> {
	startPosition?: number;
	maxResults?: number;
	minorVersion?: string;
	orderBy?: { field: DeepKeys<T>; direction: 'ASC' | 'DESC' };
}
