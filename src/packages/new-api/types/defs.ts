import type Account from "./account";
import type Customer from "./customer";
import type Estimate from "./estimate";
import type Invoice from "./invoice";
import type Vendor from "./vendor";
import type Bill from "./bill";
import type Preferences from "./preferences";

import type { Prettify } from "./helpers";

/**
 * The ReferenceType Object
 */
export type ReferenceType = {
    /**
     * The ID for the referenced object as found in the Id field of the
     * object payload. The context is set by the type of reference and is
     * specific to the QuickBooks company file.
     */
	value: string;
    
    /**
     * An identifying name for the object being referenced by `value` and is
     * derived from the field that holds the common name of that object. This
     * varies by context and specific type of object referenced. For example,
     * references to a Customer object use `Customer.DisplayName` to populate
     * this field. Optionally returned in responses, implementation dependent.
     */
	name?: string;
};

/**
 * The MetaData Object
 */
export type MetaData = {
	/**
	 * Time the entity was created in the source domain.
	 */
	readonly CreateTime: string;

	/**
	 * Time the entity was last updated in the source domain.
	 */
	readonly LastUpdatedTime: string;
};

/**
 * The EmailAddress Object
 */
export type EmailAddress = {
	/**
	 * Email address following RFC 822 standard
	 * @max 100 characters
	 * @example "user@example.com"
	 */
	Address?: string;
}

/**
 * The TelephoneNumber Object
 */
export type TelephoneNumber = {
	/**
	 * Free-form telephone number (max 30 chars)
	 * @description Specifies the telephone number in free form
	 * @example "+1 (555) 123-4567"
	 */
	FreeFormNumber?: string;
}

/**
 * The WebsiteAddress Object
 */
export type WebsiteAddress = {
	/**
	 * Uniform Resource Identifier (max 1000 chars)
	 * @description Website address URI
     * @max 1000 characters
	 * @example "https://example.com"
	 */
	URI?: string;
}

/**
 * The Date Object
 */
export type QBDate = {
	/**
	 * Local timezone: `YYYY-MM-DD`
     * UTC: `YYYY-MM-DDZ`
     * Specific time zone: `YYYY-MM-DD+/-HH:MM`
     * The date format follows the {@link https://www.w3.org/TR/xmlschema-2/ XML Schema standard}
	 */
	date: string;
}

/**
 * The DeliveryMethod Union
 */
export type DeliveryMethod = 'Print' | 'Email' | 'None';

export type Documents = {
    Customer: Customer,
    Estimate: Estimate,
    Account: Account,
    Invoice: Invoice,
    Vendor: Vendor,
    Bill: Bill,
    Preferences: Preferences,
}

/**
 * The Document Type Union
 */
export type DocumentType = Prettify<keyof Documents>;


/**
 * The billable status of the expense. This field is not
 * updatable through an API request. The value automatically
 * changes when an invoice is created.
 */
export type BillableStatus = 'Billable' | 'NotBillable' | 'HasBeenBilled';

/**
 * The markup info for the expense.
 */
export type MarkupInfo = {
    /**
     * Reference to a PriceLevel for the markup.
     */
    PriceLevelRef?: ReferenceType;

    /**
     * Markup amount expressed as a percent of charges already entered
     * in the current transaction. To enter a rate of 10% use 10.0, not 0.01.
     */
    Percent?: number;

    /**
     * The account associated with the markup.
     * Available with invoice objects only and when LinkedTxn specifies a ReimburseCharge.
     * @systemDefined
     */
    readonly MarkUpIncomeAccountRef?: ReferenceType;
};

export type PhysicalAddress = {
	/**
	 * Unique identifier of the address (auto-incremented on change).
	 * Read-only.
	 * @requiredForUpdate
	 * @systemDefined
	 */
	readonly Id?: string;

	/**
	 * Postal code. For example, zip code for USA and Canada.
	 * @max 30 characters
	 */
	PostalCode?: string;

	/**
	 * City name.
	 * @max 255 characters
	 */
	City?: string;

	/**
	 * Country name. Use ISO alpha-3 or full country name for international addresses.
	 * @max 255 characters
	 */
	Country?: string;

	/**
	 * Address line 5.
	 * @max 500 characters
	 */
	Line5?: string;

	/**
	 * Address line 4.
	 * @max 500 characters
	 */
	Line4?: string;

	/**
	 * Address line 3.
	 * @max 500 characters
	 */
	Line3?: string;

	/**
	 * Address line 2.
	 * @max 500 characters
	 */
	Line2?: string;

	/**
	 * Address line 1.
	 * @max 500 characters
	 */
	Line1?: string;

	/**
	 * Latitude of geocode. INVALID returned for invalid addresses.
	 * Read-only.
	 * @systemDefined
	 */
	readonly Lat?: string;

	/**
	 * Longitude of geocode. INVALID returned for invalid addresses.
	 * Read-only.
	 * @systemDefined
	 */
	readonly Long?: string;

	/**
	 * Region within a country (state/province).
	 * @max 255 characters
	 */
	CountrySubDivisionCode?: string;
}

export type GlobalTaxCalculation = 'TaxExcluded' | 'TaxInclusive' | 'NotApplicable';
export type EmailStatus = 'NotSet' | 'NeedToSend' | 'EmailSent';

/**
 * Zero or more related transactions to this Invoice object. The
 * following linked relationships are supported:

 * - Links to `Estimate` and `TimeActivity` objects can be established 
 * directly to this `Invoice` object with UI or with the API. Create, 
 * Read, Update, and Query operations are avaialble at the API level 
 * for these types of links.
 * 
 * - Only one link can be made to an `Estimate`. Progress Invoicing 
 * is not supported via the API.
 * 
 * - Links to expenses incurred on behalf of the customer are returned 
 * in the response with `LinkedTxn.TxnType` set to `ReimburseCharge`, 
 * `ChargeCredit` or `StatementCharge` corresponding to billable customer 
 * expenses of type `Cash`, `Delayed Credit`, and `Delayed Charge`, 
 * respectively. Links to these types of transactions are established 
 * within the QuickBooks UI, only, and are available as read-only 
 * at the API level.
 * 
 * - Links to payments applied to an Invoice object are returned in 
 * the response with `LinkedTxn.TxnType` set to `Payment`. Links to 
 * Payment transactions are established within the QuickBooks UI, 
 * only, and are available as read-only at the API level.
 *
 * Use `LinkedTxn.TxnId` as the ID in a separate read request for the 
 * specific resource to retrieve details of the linked object.
 */
export type LinkedTxn = {
	/**
	 * Transaction Id of the related transaction.
	 * Required.
	 */
	TxnId: string;

	/**
	 * Transaction type of the linked object.
	 * Required.
	 */
	TxnType: string;

	/**
	 * Line number of a specific line of the linked transaction (when applicable).
	 */
	TxnLineId?: string;
}

export type CustomField = {
	/**
	 * Unique identifier of the CustomFieldDefinition that corresponds to this field.
	 * Read-only.
	 * @systemDefined
	 */
	readonly DefinitionId: string;

	/**
	 * The value for the StringType custom field.
	 */
	StringValue?: string;

	/**
	 * Name of the custom field. Read-only.
	 */
	readonly Name?: string;

	/**
	 * Data type of custom field. Currently: StringType. Read-only.
	 */
	readonly Type?: string;
}

export type TxnTaxDetail = {
	TxnTaxCodeRef?: ReferenceType;
	TotalTax?: number;
	TaxLine?: TaxLine[];
}

export type TaxLine = {
	Amount?: number;
	DetailType: TaxLineDetailType;
	TaxLineDetail?: {
		TaxRateRef?: ReferenceType;
		PercentBased?: boolean;
		TaxPercent?: number;
		NetAmountTaxable?: number;
	};
}

export type TaxLineDetailType = 'TaxLineDetail';