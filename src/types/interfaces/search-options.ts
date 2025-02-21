// Imports
import { Range, type DeepKeys } from '../types';

// Export the Search Options
export interface SearchOptions<T> {
	/** The page number to fetch */
	page?: number;

	/** The Quickbooks API only allows fetching maximum results of 200 */
	maxResults?: Range<1, 201>;

	/** @deprecated Minor Versions 1 - 74 Will be removed on July 30, 2025*/
	minorVersion?: `${Range<1, 76>}`;

	/** The field to order the results by */
	orderBy?: { field: DeepKeys<T>; direction: 'ASC' | 'DESC' };
}
