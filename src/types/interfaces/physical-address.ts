// Physical Address Interface
export interface PhysicalAddress {
	/**
	 * Unique identifier (read-only, system-defined)
	 * @required Required for updates
	 */
	readonly Id: string;

	/** Postal code (max 30 chars) */
	PostalCode?: string;

	/** City name (max 255 chars) */
	City?: string;

	/** Country name (ISO alpha-3 or full name, max 255 chars) */
	Country?: string;

	/** Fifth address line (individual max 500 chars, combined max 2000 chars) */
	Line5?: string;

	/** Fourth address line (individual max 500 chars, combined max 2000 chars) */
	Line4?: string;

	/** Third address line (individual max 500 chars, combined max 2000 chars) */
	Line3?: string;

	/** Second address line (individual max 500 chars, combined max 2000 chars) */
	Line2?: string;

	/** First address line (individual max 500 chars, combined max 2000 chars) */
	Line1?: string;

	/** Latitude coordinate (read-only, system-defined) */
	readonly Lat?: string;

	/** Longitude coordinate (read-only, system-defined) */
	readonly Long?: string;

	/** Region code (e.g., state/province, max 255 chars) */
	CountrySubDivisionCode?: string;
}
