// Imports
import { AuthProvider } from '../auth/auth-provider';
import {
	Environment,
	IntuitErrorData,
	IntuitErrorItem,
	IntuitErrorResponse,
	IntuitFaultCodes,
	IntuitFaultType,
	QuickbooksError,
} from '../../types/types';
import { InvoiceAPI } from './invoices/invoice-api';
import { EstimateAPI } from './estimates/estimate-api';
import { CustomerAPI } from './customer/customer-api';
import { PaymentAPI } from './payment/payment-api';
import { AccountAPI } from './account/account-api';
import { PreferenceAPI } from './preferences/preference-api';
import { CreditMemoAPI } from './credit-memo/credit-memo-api';
import { CompanyInfoAPI } from './company-info/company-info-api';
import { BillAPI } from './bill/bill-api';

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
	 * Credit Memo API
	 */
	public creditMemos: CreditMemoAPI;

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
	 * Preferences API
	 */
	public preferences: PreferenceAPI;

	/**
	 * Company Info API
	 */
	public companyInfo: CompanyInfoAPI;

	/**
	 * Bills API
	 */
	public bills: BillAPI;

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
		this.preferences = new PreferenceAPI(this);
		this.creditMemos = new CreditMemoAPI(this);
		this.companyInfo = new CompanyInfoAPI(this);
		this.bills = new BillAPI(this);
	}

	/**
	 * Runs a Request

	 * @param url - The URL to run the request on
	 * @param headers - The headers to run the request on
	 * @returns {AuthProvider} The Auth Provider
	 */
	public async runRequest(url: string, requestInit: RequestInit): Promise<{ response: Response; responseData: any; intuitTID: string }> {
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
			// Get the Intuit Error Details
			const errorDetails = await ApiClient.getIntuitErrorDetails(response);

			// Throw the Quickbooks Error
			throw new QuickbooksError(`Failed to run request`, errorDetails);
		}

		// Check if the response is an Object and if it is, parse it as JSON
		const responseData = response.headers.get('Content-Type')?.includes('application/json') ? await response.json() : null;

		// Get the Intuit Transaction ID
		const intuitTID = response.headers.get('intuit_tid') ?? '0-00000000-000000000000000000000000';

		// Return the Response Data and Response Object
		return { response, responseData, intuitTID };
	}

	/**
	 * Gets the Intuit error details from the response
	 * @param response The response to get the Intuit error details from
	 * @returns {IntuitErrorData} The Intuit error details
	 */
	public static async getIntuitErrorDetails(response: Response | null): Promise<IntuitErrorData> {
		// Setup the Default Response Data
		const unknownResponseData: IntuitErrorResponse = {
			fault: {
				error: [{ message: 'Unknown Error', detail: 'Unknown Error', code: IntuitFaultCodes.UnknownError }],
				type: IntuitFaultType.UnknownFault,
			},
			time: new Date(),
		};

		// Get the Response Data
		const responseData: IntuitErrorResponse = (await response?.json().catch(() => null)) ?? unknownResponseData;

		// Get the Fault
		const fault = responseData.Fault ?? responseData.fault;

		// Setup the Error Items (Mapped to the lowercase version)
		let mappedErrors: IntuitErrorItem[] = responseData.fault?.error ?? new Array();

		// Check if the Fault is the old version and if it is, map the Error Objects to the lowercase version
		if (responseData.Fault)
			mappedErrors = responseData.Fault.Error.map((error) => ({
				message: error.Message,
				detail: error.Detail,
				code: parseInt(String(error.code)), // We need to parse the error code as a string to an integer as a number gets returned from the API
			}));

		// Get the Intuit Error Code
		const errorDetails: IntuitErrorData = {
			statusCode: response?.status ?? 0,
			intuitError: mappedErrors,
			intuitTID: response?.headers.get('intuit_tid') ?? '	0-00000000-000000000000000000000000',
			type: fault?.type ?? IntuitFaultType.UnknownFault,
		};

		// Return the Intuit Error Details
		return errorDetails;
	}
}
