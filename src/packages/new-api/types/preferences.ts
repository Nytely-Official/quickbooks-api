import type { EmailAddress, MetaData, ReferenceType } from "./defs";
import type { Pair } from "./helpers";

export type Preferences = {
    /**
     * Unique identifier for this object. Sort order is ASC by default.
     * @filterable
     * @sortable
     * @defaultSortOrder ASC
     * @systemDefined
     * @requiredForUpdate
     */
    readonly Id: string;

    /**
     * Version number of the object used for optimistic locking.
     * Incremented on each modification.
     * @systemDefined
     * @requiredForUpdate
     */
    readonly SyncToken: string;

    /**
     * Descriptive information about the object. Read-only.
     */
    MetaData?: MetaData;

    /**
     * Email message preferences per document type.
     */
    EmailMessagesPrefs?: {
        InvoiceMessage?: EmailMessageType;
        EstimateMessage?: EmailMessageType;
        SalesReceiptMessage?: EmailMessageType;
        StatementMessage?: EmailMessageType;
    };

    /**
     * Product and services preferences.
     */
    ProductAndServicesPrefs?: {
        /**
         * Revenue recognition enabled. (QBO Advanced only)
         * @minorVersion 65
         */
        RevenueRecognitionEnabled?: boolean;
        /**
         * How frequently revenue is recognised. (QBO Advanced only)
         * Allowed: Daily | Weekly | Monthly
         * @minorVersion 65
         */
        RecognitionFrequencyType?: RecognitionFrequencyType;
        ForSales?: boolean;
        QuantityOnHand?: boolean;
        QuantityWithPriceAndRate?: boolean;
        ForPurchase?: boolean;
    };

    /**
     * Report preferences.
     */
    ReportPrefs?: {
        ReportBasis?: ReportBasis;
        readonly CalcAgingReportFromTxnDate?: boolean;
    };

    /**
     * Accounting and company info preferences.
     */
    AccountingInfoPrefs?: {
        /**
         * First month of fiscal year.
         * @minorVersion 21
         * @readonly
         */
        readonly FirstMonthOfFiscalYear?: MonthEnum;
        /**
         * Enable account numbers.
         * @minorVersion 21
         * @readonly
         */
        readonly UseAccountNumbers?: boolean;
        /**
         * First month of income tax year.
         * @minorVersion 21
         * @readonly
         */
        readonly TaxYearMonth?: string;
        /**
         * Assign classes at the transaction level.
         */
        ClassTrackingPerTxn?: boolean;
        /**
         * Track locations preference.
         */
        TrackDepartments?: boolean;
        /**
         * Tax form preference.
         * @minorVersion 21
         * @readonly
         */
        readonly TaxForm?: string;
        /**
         * Customer label preference string (e.g., Clients, Customers, etc).
         */
        CustomerTerminology?: string;
        /**
         * Closing date; transactions before this date are protected.
         * Format: YYYY-MM-DD
         * @minorVersion 21
         * @readonly
         */
        readonly BookCloseDate?: string;
        /**
         * Department label string (shown on transaction forms).
         * Returned only if Track locations is enabled.
         */
        DepartmentTerminology?: string;
        /**
         * Assign classes at the line level.
         */
        ClassTrackingPerTxnLine?: boolean;
    };

    /**
     * Sales forms preferences.
     */
    SalesFormsPrefs?: {
        /**
         * Default BCC email for invoices.
         * @minorVersion 8
         */
        SalesEmailBcc?: EmailAddress;
        /**
         * Default CC email for invoices.
         * @minorVersion 8
         */
        SalesEmailCc?: EmailAddress;
        /**
         * Enables Progress Invoicing (read-only).
         * @minorVersion 32
         */
        readonly UsingProgressInvoicing?: boolean;
        /**
         * Toggles whether Sales Forms Custom Fields are enabled.
         */
        readonly CustomField?: Pair<BooleanCustomField, StringCustomField>;

        AllowServiceDate?: boolean;
        /**
         * Message to customers on estimates (read-only).
         */
        readonly EstimateMessage?: string;
        /**
         * CC company on all customer emails for sales transactions.
         * Uses CompanyInfo.Email.Address.
         * @minorVersion 8
         */
        EmailCopyToCompany?: boolean;
        /**
         * Default customer message.
         */
        DefaultCustomerMessage?: string;
        AllowShipping?: boolean;
        DefaultDiscountAccount?: boolean;
        /**
         * IPN support enabled (deprecated, read-only).
         */
        readonly IPNSupportEnabled?: boolean;
        ETransactionPaymentEnabled?: boolean;
        /**
         * Default sales terms.
         */
        DefaultTerms?: ReferenceType;
        AllowDeposit?: boolean;
        /**
         * If true, price levels are enabled (read-only).
         */
        readonly UsingPriceLevels?: boolean;
        DefaultShippingAccount?: boolean;
        /**
         * Attach PDF to ETransaction emails.
         */
        ETransactionAttachPDF?: boolean;
        /**
         * Enable custom transaction numbers for sales transactions.
         */
        CustomTxnNumbers?: boolean;
        /**
         * ETransaction status (read-only).
         */
        readonly ETransactionEnabledStatus?: ETransactionEnabledStatus;
        AllowEstimates?: boolean;
        AllowDiscount?: boolean;
        /**
         * Automatically applies credits to next invoice (read-only).
         * @minorVersion 21
         */
        readonly AutoApplyCredit?: boolean;
    };

    /**
     * Vendor and purchases preferences.
     */
    VendorAndPurchasesPrefs?: {
        /**
         * Purchase Order Custom Field definitions (read-only).
         */
        POCustomField?: Pair<BooleanCustomField, StringCustomField>;
        /**
         * Default markup account.
         */
        DefaultMarkupAccount?: ReferenceType;
        TrackingByCustomer?: boolean;
        /**
         * Default terms.
         */
        DefaultTerms?: ReferenceType;
        BillableExpenseTracking?: boolean;
        /**
         * Default markup rate (percent 0..100).
         */
        DefaultMarkup?: number;
        /**
         * Indicates if TPAR enabled by customer (read-only).
         * @minorVersion 40
         */
        readonly TPAREnabled?: boolean;
    };

    /**
     * Tax preferences and automated sales tax indicators.
     */
    TaxPrefs?: {
        /**
         * Automated sales tax enabled and set up (read-only).
         */
        readonly PartnerTaxEnabled?: boolean;
        /**
         * Reference to default Tax Code Group (read-only).
         */
        readonly TaxGroupCodeRef?: string;
        /**
         * Sales tax enabled (read-only).
         */
        readonly UsingSalesTax?: boolean;
    };

    /**
     * Name/Value extension preferences at top level.
     */
    OtherPrefs?: NameValuePair[];

    /**
     * Time tracking preferences.
     */
    TimeTrackingPrefs?: {
        readonly WorkWeekStartDate?: WeekEnum;
        readonly MarkTimeEntriesBillable?: boolean;
        ShowBillRateToAll?: boolean;
        UsingSalesTax?: boolean;
        BillCustomers?: boolean;
    };

    /**
     * Currency preferences.
     */
    CurrencyPrefs?: {
        /**
         * Currency code of the country where the business is located (read-only).
         */
        readonly HomeCurrency?: ReferenceType;
        /**
         * Multicurrency enabled (read-only).
         */
        readonly MultiCurrencyEnabled?: boolean;
    };
}

export type { Preferences as default };

/**
 * Email message details for a document.
 */
export type EmailMessageType = {
    /**
     * The body of the email message.
     */
    Message?: string;
    /**
     * The subject of the email.
     */
    Subject?: string;
};

/**
 * Recognition frequency enum.
 */
export type RecognitionFrequencyType = 'Daily' | 'Weekly' | 'Monthly';

/**
 * Report basis enum.
 */
export type ReportBasis = 'Cash' | 'Accrual';

/**
 * Month enum (full month names).
 */
export type MonthEnum =
    | 'January' | 'February' | 'March' | 'April' | 'May' | 'June'
    | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

/**
 * Week enum for work week start day.
 */
export type WeekEnum =
    | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

/**
 * ETransaction enabled status enum.
 */
export type ETransactionEnabledStatus = 'NotApplicable' | 'Enabled' | 'Disabled';

export type CustomFieldType = 'StringType' | 'BooleanType';

/**
 * Custom field definition used in prefs (read-only configuration).
 */
export type CustomField = BooleanCustomField | StringCustomField;

type BooleanCustomField = {
    /**
     * Used to enable the custom field. Set to `True` to enable the field. 
     * Once enabled, it is available on purchase order forms in the QuickBooks 
     * UI and available for QuickBooks services.
     */
    BooleanValue: boolean;

    /**
     * Value is `BooleanType`. Denotes this is a custom field enabling object. 
     * @systemDefined
     */
    Type: CustomFieldType;

    /**
     * The internal name of an enabled custom field, `Name` takes the form 
     * `PurchasePrefs.UsePurchaseNameN`, where N is `1`, `2`, or `3` for 
     * up to three available custom fields that have been enabled.
     * @systemDefined
     */
    readonly Name: string;
}
type StringCustomField = {
    /**
     * The name of the custom field as it appears on the Purchase Order form.
     */
    StringValue: string;

    /**
     * Denotes that this is a custom field definition. Value is `StringType`. 
     * This type of custom field is available once the field has been enabled 
     * with a corresponding `CustomField` object of type `BooleanType`.
     * @systemDefined
     */
    Type: CustomFieldType;

    /**
     * The internal name of an enabled custom field, `Name` takes the form 
     * `PurchasePrefs.PurchaseCustomNameN`, where N is `1`, `2`, or `3` for 
     * up to three available custom fields that have been enabled.
     */
    readonly Name: string;
}

/**
 * Name/Value pair for extensible preferences.
 */
export type NameValuePair = {
    Name: string;
    Value: string;
};
