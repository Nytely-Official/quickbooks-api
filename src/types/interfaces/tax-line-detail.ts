// Imports
import { ReferenceType } from '../types';

/**
 * TaxLineDetail
 *
 * @description The tax line detail for the transaction
 */
export interface TaxLineDetail {
	/**
	 * Reference to a TaxRate to apply to the entire transaction
	 * @description Query the TaxRate name list resource to determine the appropriate TaxRate object.
	 * Use TaxRate.Id and TaxRate.Name for TaxRateRef.value and TaxRateRef.name respectively.
	 * For non-US QuickBooks, the TaxRate must be in the referenced tax code's rate list (SalesTaxRateList
	 * or PurchaseTaxRateList) corresponding to the transaction type. Each rate may only be listed once.
	 */
	TaxRateRef: ReferenceType;

	/**
	 * Taxable amount for applicable tax rates
	 * @description Total of lines where this rate is applied. Different from Line.Amount which is the final tax amount.
	 * @default null
	 */
	NetAmountTaxable?: number;

	/**
	 * Indicates if tax rate is percentage-based
	 * @description true = percentage, false = flat amount
	 */
	PercentBased?: boolean;

	/**
	 * Total amount including tax
	 * @description Total amount including tax
	 */
	TaxInclusiveAmount?: number;

	/**
	 * Difference between actual tax and overridden amount
	 * @description Difference between actual tax and overridden amount
	 */
	OverrideDeltaAmount?: number;

	/**
	 * Sales tax percentage as numerical value
	 * @description Sales tax percentage as numerical value
	 * @example 8.5  // Represents 8.5% tax rate
	 */
	TaxPercent?: number;
}
