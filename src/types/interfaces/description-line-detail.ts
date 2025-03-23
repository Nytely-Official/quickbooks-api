// Imports
import { ReferenceType } from '../types';

/**
 * Description Line Detail
 *
 * @description The detail of a description line
 */
export interface DescriptionLineDetail {
	/**
	 * Reference to the TaxCode for this item
	 *
	 * @description
	 * - Query the TaxCode name list resource to determine the appropriate TaxCode object
	 * - Use `TaxCode.Id` for `TaxCodeRef.value`
	 * - Use `TaxCode.Name` for `TaxCodeRef.name`
	 */
	TaxCodeRef?: ReferenceType;

	/**
	 * Date when the service is performed
	 */
	ServiceDate?: Date;
}
