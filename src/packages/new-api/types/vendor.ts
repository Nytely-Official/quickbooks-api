import type { 
	EmailAddress, 
	MetaData, 
	ReferenceType, 
	TelephoneNumber, 
	WebsiteAddress, 
	PhysicalAddress 
} from "./defs";

export type Vendor = {
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
	 * Title of the person. Supports i18n, all locales.
	 * The DisplayName attribute or at least one of Title, GivenName,
	 * MiddleName, FamilyName, or Suffix is required during create.
	 * @max 16 characters
	 */
	Title?: string;

	/**
	 * Given name or first name of a person.
	 * @max 100 characters
	 * @filterable
	 * @sortable
	 */
	GivenName?: string;

	/**
	 * Middle name of the person. Can have zero or more middle names.
	 * @max 100 characters
	 * @filterable
	 * @sortable
	 */
	MiddleName?: string;

	/**
	 * Suffix of the name (e.g., Jr.).
	 * @max 16 characters
	 * @filterable
	 * @sortable
	 */
	Suffix?: string;

	/**
	 * Family name or last name of the person.
	 * @max 100 characters
	 * @filterable
	 * @sortable
	 */
	FamilyName?: string;

	/**
	 * Primary email address.
	 */
	PrimaryEmailAddr?: EmailAddress;

	/**
	 * The name of the vendor as displayed. Must be unique across Vendor,
	 * Customer, and Employee objects. Cannot be removed with sparse update.
	 * If not supplied, system generates DisplayName from name components.
	 * @max 500 characters
	 * @filterable
	 * @sortable
	 */
	DisplayName?: string;

	/**
	 * List of ContactInfo entities of any contact info type.
	 */
	OtherContactInfo?: ContactInfo[];

	/**
	 * Identifies the accounts payable account to be used for this supplier.
	 * Applicable for France companies only.
	 * @minorVersion 3
	 */
	APAccountRef?: ReferenceType;

	/**
	 * Reference to a default Term associated with this Vendor.
	 */
	TermRef?: ReferenceType;

	/**
	 * The Source type of the transactions created by QuickBooks Commerce.
	 * @minorVersion 59
	 * @example "QBCommerce"
	 */
	Source?: string;

	/**
	 * GST identification number.
	 * @minorVersion 33
	 * @max 15 characters
	 */
	GSTIN?: string;

	/**
	 * True if vendor is T4A eligible (CA locale).
	 * @minorVersion 56
	 */
	T4AEligible?: boolean;

	/**
	 * Fax number.
	 */
	Fax?: TelephoneNumber;

	/**
	 * Business number / PAN (IN).
	 * @minorVersion 33
	 * @max 10 characters
	 */
	BusinessNumber?: string;

	/**
	 * Reference to the currency for this vendor. Read-only after set.
	 * If specified and not in the company's currency list, it is added.
	 */
	readonly CurrencyRef?: ReferenceType;

	/**
	 * Indicates if the vendor has TPAR enabled (AU).
	 * @minorVersion 40
	 */
	HasTPAR?: boolean;

	/**
	 * Method in which the supplier tracks their income (FR only).
	 * @minorVersion 3
	 */
	TaxReportingBasis?: TaxReportingBasis;

	/**
	 * Mobile phone number.
	 */
	Mobile?: TelephoneNumber;

	/**
	 * Primary phone number.
	 */
	PrimaryPhone?: TelephoneNumber;

	/**
	 * If true, this object is currently enabled for use by QuickBooks.
	 * @filterable
	 * @sortable
	 */
	Active?: boolean;

	/**
	 * Alternate phone number.
	 */
	AlternatePhone?: TelephoneNumber;

	/**
	 * Descriptive information about the object. Read-only.
	 */
	MetaData?: MetaData;

	/**
	 * This vendor is an independent contractor (1099).
	 */
	Vendor1099?: boolean;

	/**
	 * Pay rate of the vendor.
	 */
	CostRate?: number;

	/**
	 * Vendor hourly billing rate.
	 */
	BillRate?: number;

	/**
	 * Website address.
	 */
	WebAddr?: WebsiteAddress;

	/**
	 * True if vendor is T5018 eligible (CA locale).
	 * @minorVersion 56
	 */
	T5018Eligible?: boolean;

	/**
	 * Name of the company associated with the person or organization.
	 * @max 100 characters
	 * @filterable
	 * @sortable
	 */
	CompanyName?: string;

	/**
	 * Vendor payment bank detail.
	 * @minorVersion 40
	 */
	VendorPaymentBankDetail?: VendorPaymentBankDetail;

	/**
	 * The tax ID of the person or organization. Masked in responses,
	 * exposing only last four characters.
	 * @max 20 characters
	 */
	TaxIdentifier?: string;

	/**
	 * Name or number of the account associated with this vendor.
	 * @max 100 characters
	 */
	AcctNum?: string;

	/**
	 * For the filing of GSTR, transactions need to be classified 
     * depending on the type of vendor from whom the purchase is made. 
     * To facilitate this, we have introduced a new field as 
     * 'GST registration type'. Possible values are listed below:
     * 
     * - `GST_REG_REG` GST registered- Regular. Customer who has a business
     * which is registered under GST and has a GSTIN (doesn't include
     * customers registered under composition scheme, as an SEZ or as
     * EOU's, STP's EHTP's etc.).
     * 
     * - `GST_REG_COMP` GST registered-Composition. Customer who has a
     * business which is registered under the composition scheme of GST
     * and has a GSTIN.
     * 
     * - `GST_UNREG` GST unregistered. Customer who has a business which
     * is not registered under GST and does not have a GSTIN
     * 
     * - `CONSUMER` Consumer. Customer who is not registered under GST and
     * is the final consumer of the service or product sold
     * - OVERSEAS Overseas. Customer who has a business which is located
     * out of India.
     * 
     * - `SEZ` SEZ. Customer who has a business which is registered under
     * GST, has a GSTIN and is located in a SEZ or is a SEZ Developer
     * 
     * - `DEEMED` Deemed exports- EOU's, STP's EHTP's etc. Customer who has
     * a business which is registered under GST and falls in the category
     * of companies (EOU's, STP's EHTP's etc.), to which supplies are made
     * they are termed as deemed exports.
	 * @minorVersion 33
	 * @max 15 characters
	 */
	GSTRegistrationType?: string;

	/**
	 * Name printed on checks. If not provided, populated from DisplayName.
	 * Cannot be removed with sparse update.
	 * @max 100 characters
	 * @filterable
	 * @sortable
	 */
	PrintOnCheckName?: string;

	/**
	 * Default billing address.
	 */
	BillAddr?: PhysicalAddress;

	/**
	 * Specifies the open balance amount (unpaid). For create, represents
	 * opening balance; otherwise read-only.
	 * @filterable
	 * @sortable
	 */
	readonly Balance?: number;
}

export type ContactInfo = {
    /**
     * The type of contact information.
     */
	Type?: "TelephoneNumber";
	Telephone?: TelephoneNumber;
};

export type VendorPaymentBankDetail = {
    /**
     * The name on the Bank Account
     */
	BankAccountName?: string;

    /**
     * The bank identification number used to identify the Bank Branch. 6 digit value in format xxx-xxx.
     */

	BankBranchIdentifier?: string;
    /**
     * The vendor's Bank Account number.
     */
	BankAccountNumber?: string;
};

export type TaxReportingBasis = 'Cash' | 'Accrual';

export type { Vendor as default };