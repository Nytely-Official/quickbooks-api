// Imports
import { AuthProvider } from '../auth/auth-provider';
import { Environment } from '../../types/types';
import { InvoiceAPI } from './invoices/invoice-api';
import { EstimateAPI } from './estimates/estimate-api';
import { CustomerAPI } from './customer/customer-api';
import { PaymentAPI } from './payment/payment-api';
import { AccountAPI } from './account/account-api';

/**
 * API Client
 */
export class ApiClient {
	/**
	 * Customer API
	 */
	public customers: CustomerAPI;
	/**
	 * Invoices API
	 */
	public invoices: InvoiceAPI;

	/**
	 * Estimates API
	 */
	public estimates: EstimateAPI;

	/**
	 * Payments API
	 */
	public payments: PaymentAPI;

	/**
	 * Accounts API
	 */
	public accounts: AccountAPI;

	/**
	 * Automatically check for a next page (This creates an extra query to the API to check if there is a next page)
	 */
	public autoCheckNextPage: boolean = true;

	/**
	 * Constructor

	 * @param authProvider - The Auth Provider
	 */
	constructor(public readonly authProvider: AuthProvider, public readonly environment: Environment) {
		// Initialize the API's
		this.invoices = new InvoiceAPI(this);
		this.customers = new CustomerAPI(this);
		this.estimates = new EstimateAPI(this);
		this.accounts = new AccountAPI(this);
		this.payments = new PaymentAPI(this);
	}

	/**
	 * Runs a Request

	 * @param url - The URL to run the request on
	 * @param headers - The headers to run the request on
	 * @returns {AuthProvider} The Auth Provider
	 */
	public async runRequest(url: string, requestInit: RequestInit): Promise<any> {
		// Get the Token
		const token = await this.authProvider.getToken();

		// Setup the Request Data
		requestInit.headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'Accept-Encoding': 'gzip, deflate',
			Authorization: `Bearer ${token.accessToken}`,
			...requestInit.headers,
		};

		// Run the Request
		const response = await fetch(url, requestInit);

		// Check if the Response has failed
		if (!response.ok) {
			// Get the Error Message
			const errorMessage = await response.text();

			// Throw an Error
			throw new Error(`Failed to run request: ${errorMessage}`);
		}
		// Check if the response is an Object and if it is, parse it as JSON
		const responseData = response.headers.get('Content-Type')?.includes('application/json') ? await response.json() : null;

		// Return the Response
		return responseData;
	}
}
