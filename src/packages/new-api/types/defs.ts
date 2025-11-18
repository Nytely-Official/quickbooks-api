import { Account } from "./account";
import { Customer } from "./customer";
import { Estimate } from "./estimate";
import { Prettify } from "./helpers";
import { Invoice } from "./invoice";
import Vendor from "./vendor";

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
export type Date = {
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
}

/**
 * The Document Type Union
 */
export type DocumentType = Prettify<keyof Documents>;
