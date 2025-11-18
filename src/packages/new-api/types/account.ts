import type { MetaData, ReferenceType } from "./defs";

/**
 * Account
 *
 * @see {@link https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account}
 */
export type Account = {
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
	 * User recognizable name for the Account. Account.Name must not contain
	 * double quotes (") or colon (:).
	 * @max 100 characters
	 * @filterable
	 * @sortable
	 */
	Name: string;

	/**
	 * Version number of the object used for optimistic locking.
	 * Incremented on each modification.
	 * @systemDefined
	 * @requiredForUpdate
	 */
	readonly SyncToken: string;

	/**
	 * User-defined account number. Must be unique. The Account.AcctNum attribute
	 * must not contain colon (:).
	 *
	 * For French locales:
	 * - Length must be between 6 and 20 characters
	 * - Must start with the account number from the master category list
	 * - Limited to alphanumeric characters
	 *
	 * Max length by locale:
	 * - AU & CA: 20 characters
	 * - US, UK & IN: 7 characters
	 */
	AcctNum?: string;

	/**
	 * Reference to the currency in which this account holds amounts.
	 * Read-only.
	 */
	readonly CurrencyRef?: ReferenceType;

	/**
	 * Specifies the Parent AccountId if this represents a SubAccount.
	 * @filterable
	 * @sortable
	 */
	ParentRef?: ReferenceType;

	/**
	 * User entered description for the account.
	 * @max 100 characters
	 * @filterable
	 * @sortable
	 */
	Description?: string;

	/**
	 * Whether the account is active.
	 * @filterable
	 */
	Active?: boolean;

	/**
	 * Descriptive metadata about the object. Read-only.
	 */
	MetaData?: MetaData;

	/**
	 * Specifies whether this object represents a subaccount.
	 * false = parent, true = subaccount
	 * @systemDefined
	 * @filterable
	 * @sortable
	 */
	readonly SubAccount?: boolean;

	/**
	 * The high-level classification of an account.
	 * Not supported for non-posting accounts.
	 * @systemDefined
	 * @filterable
	 */
	readonly Classification?: AccountClassification;

	/**
	 * Fully qualified name of the account derived from Name and ParentRef.
	 * Format: Parent:Account1:SubAccount1:SubAccount2 (max 5 levels).
	 * System generated.
	 * @systemDefined
	 * @filterable
	 * @sortable
	 */
	readonly FullyQualifiedName?: string;

	/**
	 * The account location. For France locales only.
	 * @minorVersion 5
	 */
	TxnLocationType?: AccountTxnLocationType;

	/**
	 * A detailed account classification that specifies the use of this account.
	 * The type is based on Classification.
	 * @filterable
	 */
	AccountType?: AccountType;

	/**
	 * Cumulative balance amount for the current Account and all its sub-accounts.
	 * @filterable
	 * @sortable
	 */
	readonly CurrentBalanceWithSubAccounts?: number;

	/**
	 * A user friendly name for the account. Must be unique across all account
	 * categories. For France locales only.
	 * @minorVersion 5
	 */
	AccountAlias?: string;

	/**
	 * Reference to the default tax code used by this account.
	 * Available when endpoint is invoked with minorversion=3 (global locales only).
	 * @minorVersion 3
	 */
	TaxCodeRef?: ReferenceType;

	/**
	 * The account sub-type classification based on AccountType.
	 * @filterable
	 */
	AccountSubType?: string;

	/**
	 * Specifies the balance amount for the current Account.
	 * Valid for Balance Sheet accounts.
	 * @filterable
	 * @sortable
	 */
	readonly CurrentBalance?: number;
};

export type AccountClassification = 'Asset' | 'Equity' | 'Expense' | 'Liability' | 'Revenue';
export type AccountTxnLocationType = 'WithinFrance' | 'FranceOverseas' | 'OutsideFranceWithEU' | 'OutsideEU';
export type AccountType = string;

export type { Account as default };
