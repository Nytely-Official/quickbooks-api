import { ApiClient } from '../../packages/api/api-client';
import { CustomField, DescriptionOnlyLine, DiscountLine, EmailAddress, EmailStatus, GlobalTaxCalculation, GroupLine, LinkedTxn, MemoRef, ModificationMetadata, PhysicalAddress, PrintStatus, ReferenceType, SalesItemLine, SubTotalLine, TxnStatus, TxnTaxDetail } from '../types';

export class Estimate {
    /**
     * @description The API client used to make requests to the API to manage the Customer object
     */
    private apiClient: ApiClient;

    // Setup the Required Properties
    /**
     * @description Unique identifier for this object
     * @readonly @systemDefined
     * @filterable
     * @sortable
     * @requiredForUpdate
     */
    public readonly Id: string;

    /**
     * @description Currency reference for all customer amounts
     * @filterable
     * @requiredForUpdate
     */
    public readonly CustomerRef: ReferenceType;

    /**
     * @description Version number for update tracking
     * @readonly @systemDefined
     * @requiredForUpdate
     */
    public readonly SyncToken: string;

    /**
     * @description Shipping origin address (required for automated tax)
     * @minorVersion 35
     */
    public ShipFromAddr: PhysicalAddress;

    /**
     * @description Currency reference (required if multicurrency enabled)
     */
    public CurrencyRef: ReferenceType;

    /**
     * @description Global tax calculation
     */
    public GlobalTaxCalculation: GlobalTaxCalculation;

    /**
     * @description Project reference (required)
     * @minorVersion 69
     * @filterable
     */
    public ProjectRef: ReferenceType;

    /**
     * @description Billing email (required if EmailStatus=NeedToSend)
     */
    public BillEmail: EmailAddress;

    // Setup the Readonly Properties
    /**
     * @description Total amount of the transaction
     * @readonly @systemDefined
     */
    public readonly TotalAmt: number;

    /**
     * @description Recurring transaction reference
     * @readonly @systemDefined
     * @minorVersion 52
     */
    public readonly RecurDataRef: ReferenceType;

    /**
     * @description Tax exemption reference
     * @readonly @systemDefined
     * @minorVersion 21
     */
    public readonly TaxExemptionRef: ReferenceType;

    /**
     * @description Total amount of the transaction in the home currency
     * @readonly @systemDefined
     */
    public readonly HomeTotalAmt: number;

    /**
     * @description Denotes how ShipAddr is stored
     * @readonly @systemDefined
     */
    public readonly FreeFormAddress: boolean;

    // Setup the Optional Properties
    /**
     * @description Transaction date (yyyy/MM/dd)
     * @filterable
     * @sortable
     */
    public TxnDate?: Date;

    /**
     * @description Shipping date (yyyy/MM/dd)

     */
    public ShipDate?: Date;

    /**
     * @description Reference to the Class associated with the transaction
     */
    public ClassRef?: ReferenceType;

    /**
     * @description Printing status of the invoice
     */
    public PrintStatus?: PrintStatus;

    /**
     * @description One of, up to three custom fields for the transaction.
     */
    public CustomField?: CustomField;

    /**
     * @description Reference to the sales term associated with the transaction.
     */
    public SalesTermRef?: ReferenceType;

    /**
     * @description Source of the transaction
     */
    public TxnStatus?: TxnStatus;

    /**
     * @description Zero or more Invoice objects related to this transaction
     */
    public LinkedTxn?: LinkedTxn[];

    /**
     * @description Date estimate was accepted.
     */
    public AcceptedDate?: Date;

    /**
     * @description Expiration date of the estimate.
     */
    public ExpirationDate?: Date;

    /**
     * @description Type of transaction location
     */
    public TransactionLocationType?: string;

    /**
     * @description Due date of the estimate.
     * @filterable
     * @sortable
     */
    public DueDate?: Date;

    /**
     * @description Descriptive information about the object
     */
    public MetaData?: ModificationMetadata;

    /**
     * @description Reference number for the transaction.
     * @filterable
     * @sortable
     */
    public DocNumber?: string;

    /**
     * @description User entered, organization-private note about the transaction. (Max 4000 characters)
     */
    public PrivateNote?: string;

    // Setup the Required Properties
    /**
     * @description Transaction line items (required)
     * @required
     * @maxItems 750 when taxable
     */
    public Line?: Array<SalesItemLine | GroupLine | DescriptionOnlyLine | DiscountLine | SubTotalLine>;

    /**
     * @description Customer memo for the transaction.
     */
    public CustomerMemo?: MemoRef;

    /**
     * @description Email status of the transaction.
     */
    public EmailStatus?: EmailStatus;

    /**
     * @description Tax detail for the transaction.
     */
    public TxnTaxDetail?: TxnTaxDetail;

    /**
     * @description Name of customer who accepted the estimate.
     */
    public AcceptedBy?: string;

    /**
     * @description The number of home currency units it takes to equal one unit of currency specified by CurrencyRef
     */
    public ExchangeRate?: number;

    /**
     * @description Identifies the address where the goods must be shipped
     */
    public ShipAddr?: PhysicalAddress;

    /**
     * @description A reference to a Department object specifying the location of the transaction.
     */
    public DepartmentRef?: ReferenceType;

    /**
     * @description Reference to the ShipMethod associated with the transaction.
     */
    public ShipMethodRef?: ReferenceType;

    /**
     * @description Bill-to address of the Invoice.
     */
    public BillAddr?: PhysicalAddress;

    /**
     * @description Indicates if tax is applied after discount
     */
    public ApplyTaxAfterDiscount?: boolean;

    /**
     * @description The constructor for the Estimate object
     * @param apiClient The API client used to make requests to the API
     * @param estimateCreationData The data used to create the estimate
     */
    constructor(apiClient: ApiClient, estimateCreationData: EstimateCreationData) {
        // Set the API Client
        this.apiClient = apiClient;

        // Set the Creation Data
        this.CustomerRef = estimateCreationData?.CustomerRef ?? null!;
        this.SyncToken = estimateCreationData?.SyncToken ?? null!;
        this.ShipFromAddr = estimateCreationData?.ShipFromAddr ?? null!;
        this.CurrencyRef = estimateCreationData?.CurrencyRef ?? null!;
        this.GlobalTaxCalculation = estimateCreationData?.GlobalTaxCalculation ?? null!;
        this.ProjectRef = estimateCreationData?.ProjectRef ?? null!;
        this.BillEmail = estimateCreationData?.BillEmail ?? null!;

        // Set the Readonly Properties
        this.Id = null!;
        this.TotalAmt = null!;
        this.RecurDataRef = null!;
        this.TotalAmt = null!;
        this.RecurDataRef = null!;
        this.TaxExemptionRef = null!;
        this.HomeTotalAmt = null!;
        this.FreeFormAddress = null!;
    }

    /**
     * @description Set the API Client
     * @param apiClient - The API client
     */
    public setApiClient(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    /**
     * @description Reload the Estimate Data
     */
    public async reload() {
        // Get the Estimate by ID
        const estimate = await this.apiClient.estimates.getEstimateById(this.Id);

        // Check if the Estimate was not Found
        if (!estimate) throw new Error('Estimate not found');

        // Assign the Properties
        Object.assign(this, estimate);
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
     * @description Updates or creates (if the Id is not set) the Estimate
     */
    public async save() {
        // Get the Estimate URL
        const url = await this.apiClient.estimates.getUrl();

        // Setup the Request Data
        const requestData: RequestInit = {
            method: 'POST',
            body: JSON.stringify({ ...this.toJSON(), sparse: true }),
        };

        // Update the Estimate
        const response = await this.apiClient.runRequest(url.href, requestData);

        // Assign the Properties
        Object.assign(this, response);
    }
}

export type EstimateCreationData = {
    CustomerRef: ReferenceType;
    SyncToken: string;
    ShipFromAddr: PhysicalAddress;
    CurrencyRef: ReferenceType;
    GlobalTaxCalculation: GlobalTaxCalculation;
    ProjectRef: ReferenceType;
    BillEmail: EmailAddress;
};