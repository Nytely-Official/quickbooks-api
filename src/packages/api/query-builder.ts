// Imports
import type { Query, InvoiceSearchOptions } from '../../types/types';

/**
 * The Query Builder
 */
export class QueryBuilder {
	/**
	 * The Where Clauses
	 */
	private whereClauses: Array<string> = new Array();

	/**
	 * The Search Options
	 */
	private searchOptions: InvoiceSearchOptions = {};

	/**
	 * Constructor
	 * @param endpoint - The Endpoint
	 * @param baseQuery - The Base Query
	 */
	constructor(private readonly endpoint: string, private readonly baseQuery: Query) {}

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
		this.whereClauses.push(`Metadata.LastUpdatedTime > '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Where Last Updated Before
	 * @param date - The Date
	 * @returns The Query Builder
	 */
	public whereLastUpdatedBefore(date: Date): this {
		this.whereClauses.push(`Metadata.LastUpdatedTime < '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Where Created After
	 * @param date - The Date
	 * @returns The Query Builder
	 */
	public whereCreatedAfter(date: Date): this {
		this.whereClauses.push(`Metadata.CreateTime > '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Where Created Before
	 * @param date - The Date
	 * @returns The Query Builder
	 */
	public whereCreatedBefore(date: Date): this {
		this.whereClauses.push(`Metadata.CreateTime < '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Where Due Date
	 * @param date - The due date
	 * @returns The Query Builder
	 */
	public whereDueDate(date: Date): this {
		this.whereClauses.push(`DueDate = '${date.toISOString()}'`);
		return this;
	}

	/**
	 * Where Customer ID
	 * @param customerId - The customer ID
	 * @returns The Query Builder
	 */
	public whereCustomerId(customerId: string): this {
		this.whereClauses.push(`CustomerRef.value = '${customerId}'`);
		return this;
	}

	/**
	 * Set the Search Options
	 * @param options - The Search Options
	 * @returns The Query Builder
	 */
	public setSearchOptions(options: InvoiceSearchOptions): this {
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
	 * Builds the Search Options (In the specific order required by the API)
	 * @returns The Search Options
	 */
	private buildSearchOptions(): string {
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
}
