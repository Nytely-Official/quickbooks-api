// Imports
import type { Query } from "@/app";

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
	 * Build the Query
	 * @returns The URL
	 */
	build(): string {
		// Setup the Query
		let query = this.baseQuery.toString();

		// Add Where Clauses
		if (this.whereClauses.length > 0) query += ` where ${this.whereClauses.join(" and ")}`;

		// Build parameters with literal spaces
		const params = [`query=${query}`, ...Object.entries(this.urlParams).map(([k, v]) => `${k}=${v}`)].join("&");

		// Manually construct URL string
		return `${this.endpoint}/query?${params}`;
	}
}
