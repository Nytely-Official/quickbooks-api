// Import the Types
import { ApiClient } from '../../api/api-client';
import { DeliveryMethod, EmailAddress, ModificationMetadata, ReferenceType, TelephoneNumber, WebsiteAddress } from '../../../types/types';

/**
 * Customer
 *
 * @description
 * The Customer Object
 *
 * @see {@link https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/customer}
 */
export class Customer {
    /**
     * @description The API client used to make requests to the API to manage the Customer object
     */
    private apiClient: ApiClient;

    // Setup the Readonly Properties
    /**
     * @description Unique identifier for this object
     * @readonly @systemDefined
     * @filterable
     * @sortable
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
     * @description Currency reference for all customer amounts
     * @readonly
     */
    public readonly CurrencyRef?: ReferenceType;

    /**
     * @description System-defined metadata. Read-only
     */
    public readonly MetaData?: ModificationMetadata;

    /**
     * @description Fully qualified hierarchical name
     * @readonly
     * @systemDefined
     * @filterable
     * @sortable
     * @remarks Format: Customer:Job:Sub-job (max 5 levels)
     * @example "ParentCustomer:ChildJob:SubJob"
     */
    public readonly FullyQualifiedName: string;

    /**
     * @description Hierarchy level position
     * @readonly
     * @systemDefined
     * @remarks 0 = top level, increments with depth (max 5 levels)
     */
    public readonly Level: number;

    // Setup the Optional Properties
    /**
     * @description Primary email address
     * @filterable
     * @maxLength 500
     */
    public PrimaryEmailAddr?: EmailAddress;

    /**
     * @description Resale number or additional customer info
     * @maxLength 16
     */
    public ResaleNum?: string;

    /**
     * @description Default tax code reference (requires Taxable=true)
     * @remarks Ignored if Taxable=false. System-managed when automated tax enabled
     */
    public DefaultTaxCodeRef?: ReferenceType;

    /**
     * @description Preferred delivery method
     */
    public PreferredDeliveryMethod?: DeliveryMethod;

    /**
     * @description Reference to sales terms associated with this customer
     * @remarks Query SalesTerm list to determine appropriate reference
     */
    public SalesTermRef?: ReferenceType;

    /**
     * @description Customer type classification reference
     * @remarks From predefined customer type list
     */
    public CustomerTypeRef?: ReferenceType;

    /**
     * @description Fax number
     * @maxLength 30
     */
    public Fax?: TelephoneNumber;

    /**
     * @description Indicates if customer is billed with parent
     * @remarks Only valid for Job/Sub-Customer, requires ParentRef
     */
    public BillWithParent?: boolean;

    /**
     * @description Mobile phone number
     * @maxLength 30
     */
    public Mobile?: TelephoneNumber;

    /**
     * @description Indicates if this is a Job/Sub-customer
     * @remarks Requires ParentRef if true
     */
    public Job?: boolean;

    /**
     * @description Cumulative open balance including sub-jobs
     * @readonly
     * @sortable
     */
    public BalanceWithJobs?: number;

    /**
     * @description Primary phone number
     * @maxLength 30
     */
    public PrimaryPhone?: TelephoneNumber;

    /**
     * @description Date of opening balance
     * @remarks Write-on-create field
     */
    public OpenBalanceDate?: string;

    /**
     * @description Indicates if transactions are taxable
     * @remarks Defaults true if DefaultTaxCodeRef defined
     */
    public Taxable?: boolean;

    /**
     * @description Alternate phone number
     * @maxLength 30
     */
    public AlternatePhone?: TelephoneNumber;

    /**
     * @description Reference to parent customer
     * @remarks Required for sub-customers/jobs
     */
    public ParentRef?: ReferenceType;

    /**
     * @description Free-form notes about customer
     * @maxLength 2000
     */
    public Notes?: string;

    /**
     * @description Website address
     * @maxLength 1000
     */
    public WebAddr?: WebsiteAddress;

    /**
     * @description Customer active status
     * @filterable
     * @sortable
     * @remarks Inactive customers with balances get CreditMemo
     */
    public Active?: boolean;

    /**
     * @description Associated company name
     * @maxLength 100
     * @filterable
     * @sortable
     */
    public CompanyName?: string;

    /**
     * @description Open balance amount
     * @filterable
     * @sortable
     * @remarks Write-on-create field
     */
    public Balance?: number;

    /**
     * @description Default shipping address
     * @remarks Address components handled differently in transactions
     */
    public ShipAddr?: string;

    /**
     * @description Preferred payment method reference
     * @remarks Query PaymentMethod list for valid references
     */
    public PaymentMethodRef?: ReferenceType;

    /**
     * @description Name printed on checks
     * @maxLength 110
     * @filterable
     * @sortable
     * @remarks Defaults to DisplayName if not provided
     */
    public PrintOnCheckName?: string;

    /**
     * @description Default billing address
     * @remarks Address components handled differently in transactions
     */
    public BillAddr?: string;

    /**
     * @description Display name (conditionally required)
     * @maxLength 500
     * @filterable
     * @sortable
     * @remarks Must be unique across all entities. Generated from name components if not provided
     */
    public DisplayName: string;

    /**
     * @description Title (conditionally required)
     * @maxLength 16
     * @remarks Part of name component group (with GivenName/MiddleName/FamilyName/Suffix)
     */
    public Title: string;

    /**
     * @description Given name (conditionally required). Maximum 100 characters
     * @filterable, sortable
     * @remarks Part of name component group
     */
    public GivenName: string;

    /**
     * @description Middle name (conditionally required). Maximum 100 characters
     * @filterable, sortable
     * @remarks Part of name component group
     */
    public MiddleName: string;

    /**
     * @description Name suffix (conditionally required). Maximum 16 characters
     * @remarks Part of name component group
     */
    public Suffix: string;

    /**
     * @description Family name (conditionally required). Maximum 100 characters
     * @filterable, sortable
     * @remarks Part of name component group
     */
    public FamilyName: string;

    /**
     * @description Constructor for Customer
     * @param apiClient - The API client
     * @param customerCreationData - The data for the customer
     */
    constructor(apiClient: ApiClient, customerCreationData: CustomerCreationData) {
        // Set the API Client
        this.apiClient = apiClient;

        // Initialize the System Defined Properties
        this.Id = null!;
        this.SyncToken = null!;
        this.FullyQualifiedName = null!;
        this.Level = null!;

        // Build the Required Properties
        this.DisplayName = customerCreationData?.DisplayName ?? null!;
        this.Title = customerCreationData?.Title ?? null!;
        this.GivenName = customerCreationData?.GivenName ?? null!;
        this.MiddleName = customerCreationData?.MiddleName ?? null!;
        this.Suffix = customerCreationData?.Suffix ?? null!;
        this.FamilyName = customerCreationData?.FamilyName ?? null!;
    }

    /**
     * @description Set the API Client
     * @param apiClient - The API client
     */
    public setApiClient(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    // /**
    //  * @description Reload the Customer Data
    //  */
    // public async reload() {
    //     // Get the Customer by ID
    //     const customer = await this.apiClient.customers.getCustomerById(this.Id);

    //     // Check if the Customer was not Found
    //     if (!customer) throw new Error('Customer not found');

    //     // Assign the Properties
    //     Object.assign(this, customer);
    // }

    /**
     * @description Custom JSON serialization to exclude private properties
     */
    // private toJSON() {
    //     // Setup the Excluded Properties
    //     const excludedProperties = ['apiClient'];

    //     // Setup the JSON Object
    //     const jsonData = { ...Object.fromEntries(Object.entries(this).filter(([key]) => !excludedProperties.includes(key))) };

    //     // Return the JSON Object
    //     return jsonData;
    // }

    /**
     * @description Updates or creates (if the Id is not set) the Customer
     */
    // public async save() {
    //     // Get the Customer URL
    //     const url = await this.apiClient.customers.getUrl();

    //     // Setup the Request Data
    //     const requestData: RequestInit = {
    //         method: 'POST',
    //         body: JSON.stringify({ ...this.toJSON(), sparse: true }),
    //     };

    //     // Update the Customer
    //     const response = await this.apiClient.runRequest(url.href, requestData);

    //     // Assign the Properties
    //     Object.assign(this, response);
    // }
}

// Setup the Creation Data
export type CustomerCreationData = {
    DisplayName: string;
    Title: string;
    GivenName: string;
    MiddleName: string;
    Suffix: string;
    FamilyName: string;
};

// Customer Filters
export type CustomerFilters = "Id" | "DisplayName" | "GivenName" | "MiddleName" | "FamilyName" | "PrimaryEmailAddr" | "Active" | "CompanyName" | "Balance" | "PrintOnCheckName" | "FullyQualifiedName"

// Customer Sortables
export type CustomerSortables = "Id" | "FullyQualifiedName" | "BalanceWithJobs" | "Active" | "Balance" | "PrintOnCheckName" | "MetaData.LastUpdatedTime" | "MetaData.CreateTime"