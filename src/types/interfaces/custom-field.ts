// Imports
import { CustomFieldType } from '../types';

/**
 * CustomField
 *
 * @description Custom field for the invoice
 */
export interface CustomField {
	/**
	 * Unique identifier of the CustomFieldDefinition that corresponds to this CustomField
	 * @readonly
	 */
	DefinitionId: string;

	/**
	 * The value for the StringType custom field
	 */
	StringValue?: string;

	/**
	 * Name of the custom field
	 * @readonly
	 */
	Name?: string;

	/**
	 * Data type of custom field
	 * @readonly
	 * @description Only one type is currently supported: StringType
	 */
	Type?: CustomFieldType;
}
