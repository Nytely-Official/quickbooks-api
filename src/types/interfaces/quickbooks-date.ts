// Quickbooks Date Interface
export interface QuickbooksDate {
	/**
	 * Date string following XML Schema format
	 * @format Local: YYYY-MM-DD | UTC: YYYY-MM-DDZ | Timezone: YYYY-MM-DD±HH:MM
	 * @example "2023-07-15", "2023-07-15Z", "2023-07-15-08:00"
	 */
	date: string;
}
