/**
 * DateTime
 *
 * @description The date and time for the invoice
 */
export interface DateTime {
	/**
	 * Date and time in ISO 8601 format. Accepts:
	 * - Local time zone: YYYY-MM-DDTHH:MM:SS
	 * - UTC: YYYY-MM-DDTHH:MM:SSZ
	 * - Specific time zone: YYYY-MM-DDTHH:MM:SS±HH:MM
	 */
	dateTime: string;
}
