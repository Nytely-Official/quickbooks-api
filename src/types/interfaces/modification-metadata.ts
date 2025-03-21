// Modification Metadata Interface
export interface ModificationMetadata {
	/**
	 * Creation timestamp (read-only, system-defined)
	 * @format DateTime
	 * @filterable
	 * @sortable
	 */
	readonly CreateTime: string;

	/**
	 * Last update timestamp (read-only, system-defined)
	 * @format DateTime
	 * @filterable
	 * @sortable
	 */
	readonly LastUpdatedTime: string;
}
