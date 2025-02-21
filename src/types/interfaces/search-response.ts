// Export the Search Options
export interface SearchResponse<T> {
	/** The Results */
	results: Array<T>;

	/** Indicates if there is a next page */
	hasNextPage?: boolean;
}
