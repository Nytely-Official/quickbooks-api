import type {
	DeliveryMethod,
	EmailAddress,
	MetaData,
	ReferenceType,
	Date,
	TelephoneNumber,
	WebsiteAddress,
} from "./defs";


/**
 * Customer
 *
 * @see {@link https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/customer}
 */
export type Customer = {
	/**
	 * Unique identifier for this object.
	 * @filterable
	 * @sortable
	 * @defaultSortOrder ASC
	 * @systemDefined
	 * @requiredForUpdate
	 */
	readonly Id: string;

	/**
	 * Version number of the object.
	 * @systemDefined
	 * @requiredForUpdate
	 */
	readonly SyncToken: string;

	/**
	 * The name of the person or organization as displayed. Must be
	 * unique across all Customer, Vendor, and Employee objects.
	 * Cannot be removed with sparse update. If not supplied, the
	 * system generates `DisplayName` by concatenating customer name
	 * components supplied in the request from the following list:
	 * `Title`, `GivenName`, `MiddleName`, `FamilyName`, and `Suffix`.
	 * @max 500 characters
	 * @filterable
	 * @sortable
	 */
	DisplayName?: string;

	/**
	 * Title of the person. This tag supports i18n, all locales. The
	 * `DisplayName` attribute or at least one of `Title`, `GivenName`,
	 * `MiddleName`, `FamilyName`, or `Suffix` attributes is required.
	 * @max 16 characters
	 */
	Title?: string;

	/**
	 * Given name or first name of a person.
	 * Conditionally required (DisplayName, or at least one name component).
	 * Max 100 characters. String, filterable, sortable.
	 */
	GivenName?: string;

	/**
	 * Middle name of the person.
	 * Conditionally required (DisplayName, or at least one name component).
	 * Max 100 characters. String, filterable, sortable.
	 */
	MiddleName?: string;

	/**
	 * Suffix of the name. For example, Jr.
	 * Conditionally required (DisplayName, or at least one name component).
	 * Max 16 characters.
	 */
	Suffix?: string;

	/**
	 * Family name or last name of person.
	 * Conditionally required (DisplayName, or at least one name component).
	 * Max 100 characters. String, filterable, sortable.
	 */
	FamilyName?: string;

	/**
	 * Primary email address. (filterable)
	 */
	PrimaryEmailAddr?: EmailAddress;

	/**
	 * Resale number or additional info. Max 16 chars.
	 */
	ResaleNum?: string;

	/**
	 * Secondary tax identifier (e.g., UTR No.).
	 * Masked in responses except for last five characters.
	 */
	SecondaryTaxIdentifier?: string;

	/**
	 * Identifies the AR account for this customer (FR companies only).
	 * Only for minorVersion 3+.
	 */
	ARAccountRef?: ReferenceType;

	/**
	 * Reference to default tax code (applies if Customer.Taxable is true).
	 */
	DefaultTaxCodeRef?: ReferenceType;

	/**
	 * Preferred delivery method. ('Print' | 'Email' | 'None')
	 */
	PreferredDeliveryMethod?: DeliveryMethod;

	/**
	 * GST identification number (IN only).
	 * Max 15 characters. Only for minorVersion 33+.
	 */
	GSTIN?: string;

	/**
	 * Reference to SalesTerm.
	 */
	SalesTermRef?: ReferenceType;

	/**
	 * Reference to customer type.
	 */
	CustomerTypeRef?: string;

	/**
	 * Fax number (max 30 chars).
	 */
	Fax?: TelephoneNumber;

	/**
	 * Business number / PAN (IN). Max 10 chars. Only for minorVersion 33+.
	 */
	BusinessNumber?: string;

	/**
	 * If true, billed with parent (for Jobs/Sub-Customers only).
	 */
	BillWithParent?: boolean;

	/**
	 * Reference to the currency for this customer.
	 * Read-only after set. Max 16 chars.
	 * @max 16 characters
	 */
	CurrencyRef?: ReferenceType;

	/**
	 * Mobile phone (max 30 chars).
	 * @max 30 characters
	 */
	Mobile?: TelephoneNumber;

	/**
	 * If true, this is a Job or sub-customer.
	 */
	Job?: boolean;

	/**
	 * Primary phone (max 30 chars).
	 * @max 30 characters
	 */
	PrimaryPhone?: TelephoneNumber;

	/**
	 * Alternate phone (max 30 chars).
	 * @max 30 characters
	 */
	AlternatePhone?: TelephoneNumber;

	/**
	 * Descriptive information about the entity. The MetaData values
	 * are set by Data Services and are read only for all applications. 
	 */
	MetaData?: MetaData;

	/**
	 * Date of the Open Balance (for create only).
	 */
	OpenBalanceDate?: Date;

	/**
	 * If true, transactions are taxable.
	 */
	Taxable?: boolean;

	/**
	 * A reference to a Customer object that is the immediate parent of
	 * the Sub-Customer/Job in the hierarchical Customer:Job list. Required
	 * for the create operation if this object is a sub-customer or Job.
	 * Query the Customer name list resource to determine the appropriate
	 * Customer object for this reference. Use `Customer.Id` and `Customer.DisplayName`
	 * from that object for `ParentRef.value` and `ParentRef.name`, respectively.
	 */
	ParentRef?: ReferenceType;

	/**
	 * Free form notes about customer.
	 * @max 2000 characters
	 */
	Notes?: string;

	/**
	 * Website address.
	 * @max 1000 characters
	 */
	WebAddr?: WebsiteAddress;

	/**
	 * If true, this customer is enabled (active in QuickBooks).
	 */
	Active?: boolean;

	/**
	 * Associated company name.
	 * @max 100 characters
	 */
	CompanyName?: string;

	/**
	 * Opening or current balance (unpaid by customer).
	 */
	Balance?: number;

	/**
	 * Default shipping address.
	 */
	ShipAddr?: string;

	/**
	 * Reference to preferred payment method.
	 */
	PaymentMethodRef?: ReferenceType;

	/**
	 * Name printed on checks.
	 * @max 110 characters
	 */
	PrintOnCheckName?: string;

	/**
	 * Default billing address.
	 */
	BillAddr?: string;

	/**
	 * Tax exemption reason ID, for automated sales tax
	 * @minorVersion 10+
	 */
	TaxExemptionReasonId?: number;

	/**
	 * Primary tax identifier
	 * @minorVersion 4+
	 */
	PrimaryTaxIdentifier?: string;

	/**
	 * GST registration type
	 * See docs for allowed values.
	 * @minorVersion 33+
	 * @max 15 characters
	 */
	GSTRegistrationType?: string;

	/**
	 * If true, indicates this is a Project
	 * Read-only.
	 * @minorVersion 25+
	 */
	IsProject?: boolean;

	/**
	 * The source type of the transactions
	 * Example values: QBCommerce
	 * @minorVersion 59+
	 * @example "QBCommerce"
	 */
	Source?: string;
};

export type { Customer as default };
