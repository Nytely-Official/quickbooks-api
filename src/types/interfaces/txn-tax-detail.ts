// Imports
import { ReferenceType, TaxLine } from '../types';

/**
 * TxnTaxDetail
 *
 * @description The tax detail for the transaction
 */
export interface TxnTaxDetail {
	/**
	 * @description Query the TaxCode name list resource to determine the appropriate TaxCode object.
	 * - Use TaxCode.Id for TaxCodeRef.value
	 * - Use TaxCode.Name for TaxCodeRef.name
	 * - Ignored if sales tax is disabled (Preferences.TaxPrefs.UsingSalesTax = false)
	 * - For sales transactions: Replaced by automated sales tax engine if PartnerTaxEnabled = true
	 */
	TxnTaxCodeRef?: ReferenceType;

	/**
	 * @description Total tax calculated for the transaction, excluding any manually inserted tax lines
	 */
	TotalTax?: number;

	/**
	 * @see TaxLine for child attributes
	 */
	TaxLine?: Array<TaxLine>;
}
