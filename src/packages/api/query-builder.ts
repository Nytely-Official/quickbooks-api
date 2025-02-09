// Imports
import type { Invoice, Query, DeepKeys } from '../../types/types';

/**
 * The Query Builder
 */
export class QueryBuilder {
	/**
	 * The Where Clauses
	 */
	private whereClauses: Array<string> = new Array();

	/**
	 * The URL Parameters
	 */
	private urlParams: Record<string, string> = {};

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
	 * With Minor Version
	 * @param version - The Version
	 * @returns The Query Builder
	 */
	public withMinorVersion(version: string): this {
		this.urlParams.minorversion = version;
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
	 * Order By
	 * @param field - The field to sort by
	 * @param direction - Sort direction (ASC/DESC)
	 * @returns The Query Builder
	 */
	public orderBy(field: DeepKeys<Invoice>, direction: 'ASC' | 'DESC' = 'ASC'): this {
		this.urlParams.orderby = `${field} ${direction}`;
		return this;
	}

	/**
	 * Limit Results
	 * @param count - Maximum number of results
	 * @returns The Query Builder
	 */
	public limit(count: number): this {
		this.urlParams.limit = count.toString();
		return this;
	}

	/**
	 * Build the Query
	 * @returns The URL
	 */
	build(): string {
		// Setup the Query
		let query = this.baseQuery.toString();

		// Add Where Clauses
		if (this.whereClauses.length > 0) query += ` where ${this.whereClauses.join(' and ')}`;

		// Map the URL Parameters
		const urlParams = Object.entries(this.urlParams).map(([k, v]) => `${k}=${v}`);

		// Build parameters with literal spaces
		const params = [`query=${query}`, ...urlParams].join('&');

		// Manually construct URL string
		return `${this.endpoint}/query?${params}`;
	}
}
