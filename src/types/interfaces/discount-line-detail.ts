// Imports
import { ReferenceType } from '../types';

/**
 * Discount Line Detail
 *
 * @description The detail of a discount line
 */
export interface DiscountLineDetail {
	/**
	 * Reference to the Class associated with this discount
	 * @description Query the Class name list resource to determine the appropriate Class object.
	 * Use Class.Id and Class.Name for ClassRef.value and ClassRef.name respectively.
	 */
	ClassRef?: ReferenceType;

	/**
	 * The TaxCode associated with the sales tax for the expense
	 * @description Query the TaxCode name list resource to determine the appropriate TaxCode object.
	 * Use TaxCode.Id and TaxCode.Name for TaxCodeRef.value and TaxCodeRef.name respectively.
	 */
	TaxCodeRef?: ReferenceType;

	/**
	 * Income account used to track discounts
	 * @description Query the Account name list resource where Account.AccountType=Income and
	 * Account.AccountSubType=DiscountsRefundsGiven. Use Account.Id and Account.Name for
	 * DiscountAccountRef.value and DiscountAccountRef.name respectively.
	 */
	DiscountAccountRef?: ReferenceType;

	/**
	 * Indicates if the discount is percentage-based
	 * @description True if the discount is a percentage; null or false if discount based on amount
	 */
	PercentBased?: boolean;

	/**
	 * Percentage by which the amount due is reduced
	 * @description Valid values from 0% to 100%. Format: 8.5 represents 8.5% (not 0.085)
	 */
	DiscountPercent?: number;
}
