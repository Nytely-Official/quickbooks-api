// Imports
import { DeepKeys, Query, SearchOptions } from '../../../types/types';

export abstract class BaseQueryBuilder<T> {
	/**
	 * The Where Clauses
	 */
	protected whereClauses: Array<string> = new Array();

	/**
	 * The Search Options
	 */
	protected searchOptions: SearchOptions<T> = {} as SearchOptions<T>;

	/**
	 * Constructor
	 * @param endpoint - The Endpoint
	 * @param baseQuery - The Base Query
	 */
	constructor(protected readonly endpoint: string, protected readonly baseQuery: Query) {}

	/**
	 * Where ID
	 * @param id - The ID
	 * @returns The Query Builder
	 */
	public whereId(id: string): this {
		this.whereClauses.push(`id = '${id}'`);
		return this;
	}

	/**
	 * Where Last Updated After
	 * @param date - The Date
	 * @returns The Query Builder
	 */
	public whereLastUpdatedAfter(date: Date): this {
		const whereProperty = 'MetaData.LastUpdatedTime';
		this.whereClauses.push(`${whereProperty} > '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Where Last Updated Before
	 * @param date - The Date
	 * @returns The Query Builder
	 */
	public whereLastUpdatedBefore(date: Date): this {
		const whereProperty = 'MetaData.LastUpdatedTime';
		this.whereClauses.push(`${whereProperty} < '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Where Created After
	 * @param date - The Date
	 * @returns The Query Builder
	 */
	public whereCreatedAfter(date: Date): this {
		const whereProperty = 'MetaData.CreateTime';
		this.whereClauses.push(`${whereProperty} > '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Where Created Before
	 * @param date - The Date
	 * @returns The Query Builder
	 */
	public whereCreatedBefore(date: Date): this {
		const whereProperty = 'MetaData.CreateTime';
		this.whereClauses.push(`${whereProperty} < '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Set the Search Options
	 * @param options - The Search Options
	 * @returns The Query Builder
	 */
	public setSearchOptions(options: SearchOptions<T>): this {
		this.searchOptions = options;
		return this;
	}

	/**
	 * Build the Query
	 * @returns The URL
	 */
	public build(): string {
		// Setup the Query
		let query = this.baseQuery.toString();

		// Add Where Clauses
		if (this.whereClauses.length > 0) query += ` where ${this.whereClauses.join(' and ')}`;

		// Map the URL Parameters
		const options = this.buildSearchOptions();

		// Build parameters with literal spaces
		const params = `query=${query} ${options}`;

		// Manually construct URL string
		return `${this.endpoint}/query?${params}`;
	}

	/**
	 * Builds the Search Options
	 * @returns The Search Options
	 */
	protected buildSearchOptions(): string {
		// Ensure the Start Position is not negative
		if (this.searchOptions.startPosition) this.searchOptions.startPosition = Math.max(this.searchOptions.startPosition, 0);

		// Ensure the Max Results is not negative
		if (this.searchOptions.maxResults) this.searchOptions.maxResults = Math.max(this.searchOptions.maxResults, 1);

		// Ensure the Max Results is not greater than 1000 (API Limit)
		if (this.searchOptions.maxResults) this.searchOptions.maxResults = Math.min(this.searchOptions.maxResults, 1000);

		// Setup the Search Options String
		let options: Array<string> = new Array();

		// Add the Search Options
		if (this.searchOptions.orderBy) options.push(`orderby ${this.searchOptions.orderBy.field} ${this.searchOptions.orderBy.direction}`);
		if (this.searchOptions.startPosition) options.push(`startposition ${this.searchOptions.startPosition}`);
		if (this.searchOptions.maxResults) options.push(`maxresults ${this.searchOptions.maxResults}`);
		if (this.searchOptions.minorVersion) options.push(`minorversion ${this.searchOptions.minorVersion}`);

		// Return the Search Options
		return options.join(' ');
	}

	// Common date filter methods
	protected addDateFilter(field: DeepKeys<T>, date: Date, operator: '>' | '<' | '='): void {
		this.whereClauses.push(`${field} ${operator} '${date.toISOString()}'`);
	}
}
