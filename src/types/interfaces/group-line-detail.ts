// Imports
import { ReferenceType, SalesItemLine } from '../types';

/**
 * Group Line Detail
 *
 * @description The detail of a group line
 */
export interface GroupLineDetail {
	/**
	 * Quantity of the group item
	 */
	Quantity?: number;

	/**
	 * Individual ItemLine elements that comprise a bundle
	 * @description Returned in responses
	 */
	Line?: Array<SalesItemLine>;

	/**
	 * Reference to a group item for all lines that belong to the bundle
	 * @description Query Item name list resource to determine appropriate Item group object (Item.Type=Group).
	 * Use Item.Id and Item.Name from that object for GroupItemRef.value and GroupItemRef.name respectively.
	 */
	GroupItemRef?: ReferenceType;
}
