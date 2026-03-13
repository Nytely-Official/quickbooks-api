// Import the Types
import { ApiClient } from '../../packages/api/api-client';
import { QuickbooksError, type ModificationMetadata } from '../types';
import type { RecurringInfo, RecurringInvoice, RecurringBill } from '../interfaces/recurring-transaction';

/**
 * RecurringTransaction
 *
 * @description The RecurringTransaction Object — a template that QBO uses to
 * automatically (or on reminder) create recurring invoices, bills, etc.
 *
 * @see {@link https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/recurringtransaction}
 */
export class RecurringTransaction {
	/**
	 * @description The API client used to make requests to the API
	 */
	private apiClient: ApiClient;

	// Readonly / system-defined properties
	/**
	 * @description Unique identifier for this object
	 * @readonly @systemDefined
	 * @requiredForUpdate
	 */
	public readonly Id: string;

	/**
	 * @description Version number for update tracking
	 * @readonly @systemDefined
	 * @requiredForUpdate
	 */
	public readonly SyncToken: string;

	/**
	 * @description System-defined metadata. Read-only
	 */
	public readonly MetaData?: ModificationMetadata;

	// Required properties
	/**
	 * @description Schedule and recurrence configuration
	 */
	public RecurringInfo: RecurringInfo;

	// Polymorphic transaction — exactly one will be set
	/**
	 * @description Invoice template (present when the recurring transaction wraps an Invoice)
	 */
	public Invoice?: RecurringInvoice;

	/**
	 * @description Bill template (present when the recurring transaction wraps a Bill)
	 */
	public Bill?: RecurringBill;

	// Optional properties
	/**
	 * @description Domain of the data source
	 */
	public domain?: string;

	/**
	 * @description Sparse update flag
	 */
	public sparse?: boolean;

	/**
	 * @description Constructor for RecurringTransaction
	 * @param apiClient - The API client
	 * @param creationData - The data for the recurring transaction
	 */
	constructor(apiClient: ApiClient, creationData: RecurringTransactionCreationData) {
		// Set the API Client
		this.apiClient = apiClient;

		// Initialize the System Defined Properties
		this.Id = null!;
		this.SyncToken = null!;

		// Build the Required Properties
		this.RecurringInfo = creationData?.RecurringInfo ?? null!;
		this.Invoice = creationData?.Invoice;
		this.Bill = creationData?.Bill;
	}

	/**
	 * @description Set the API Client
	 * @param apiClient - The API client
	 */
	public setApiClient(apiClient: ApiClient) {
		this.apiClient = apiClient;
	}

	/**
	 * @description Reload the RecurringTransaction Data
	 * @throws {QuickbooksError} If the RecurringTransaction was not found
	 */
	public async reload() {
		// Get the RecurringTransaction by ID
		const result = await this.apiClient.recurringTransactions.getRecurringTransactionById(this.Id);

		// Check if the RecurringTransaction was not Found
		if (!result.recurringTransaction)
			throw new QuickbooksError('RecurringTransaction not found', await ApiClient.getIntuitErrorDetails(null));

		// Assign the Properties
		Object.assign(this, result.recurringTransaction);
	}

	/**
	 * @description Custom JSON serialization to exclude private properties
	 */
	private toJSON() {
		// Setup the Excluded Properties
		const excludedProperties = ['apiClient'];

		// Setup the JSON Object
		const jsonData = { ...Object.fromEntries(Object.entries(this).filter(([key]) => !excludedProperties.includes(key))) };

		// Return the JSON Object
		return jsonData;
	}

	/**
	 * @description Updates or creates (if the Id is not set) the RecurringTransaction
	 */
	public async save() {
		// Get the RecurringTransaction URL
		const url = await this.apiClient.recurringTransactions.getUrl();

		// Setup the Request Data
		const requestData: RequestInit = {
			method: 'POST',
			body: JSON.stringify({ ...this.toJSON(), sparse: true }),
		};

		// Update the RecurringTransaction
		const { responseData } = await this.apiClient.runRequest(url.href, requestData);

		// Extract the RecurringTransaction from the response
		const data = responseData?.RecurringTransaction?.[0] || responseData?.RecurringTransaction || responseData;

		// Assign the Properties
		Object.assign(this, data);
	}

	/**
	 * @description Deletes the RecurringTransaction
	 * @throws {QuickbooksError} If the RecurringTransaction ID is not set
	 */
	public async delete() {
		// Check if the RecurringTransaction has an ID
		if (!this.Id)
			throw new QuickbooksError('RecurringTransaction must be saved before deleting', await ApiClient.getIntuitErrorDetails(null));

		// Get the RecurringTransaction URL and append operation=delete
		const url = await this.apiClient.recurringTransactions.getUrl();
		url.searchParams.set('operation', 'delete');

		// Setup the Request Data
		const requestData: RequestInit = {
			method: 'POST',
			body: JSON.stringify({ Id: this.Id, SyncToken: this.SyncToken }),
		};

		// Delete the RecurringTransaction
		await this.apiClient.runRequest(url.href, requestData);
	}
}

// Setup the Creation Data
export type RecurringTransactionCreationData = {
	RecurringInfo: RecurringInfo;
	Invoice?: RecurringInvoice;
	Bill?: RecurringBill;
};
