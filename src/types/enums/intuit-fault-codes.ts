/**
 * The Intuit Fault Codes Enum
 */
export enum IntuitFaultCodes {
	/**
	 * Unknown Error
	 */
	UnknownError = -1,

	/**
	 * Success response
	 */
	Success = 0,

	/**
	 * General Authentication Error
	 * Review the XXX error code and follow its recommendation. AuthenticationErrorGeneral: XXX
	 */
	GeneralAuthenticationError = 100,

	/**
	 * Authentication OAuth Error
	 * Review the XXX error code and follow its recommendation. AuthenticationOAuthError: XXX
	 */
	AuthenticationOAuthError = 110,

	/**
	 * Authorization Failure
	 * This means an accountant user was deleted from a QuickBooks Online company while the company was connected to your app. AuthorizationFailure: XXX
	 */
	AuthorizationFailure = 120,

	/**
	 * Accessing Wrong Cluster
	 * Review the XXX error code and follow its recommendation. WrongClusterError: XXX, statusCode: XXX
	 */
	AccessingWrongCluster = 130,

	/**
	 * Company Locked Out
	 * Review the XXX error code and follow its recommendation. CompanyLockedOut: XXX, statusCode: XXX
	 */
	CompanyLockedOut = 140,

	/**
	 * Company Under Maintenance
	 * Review the XXX error code and follow its recommendation. CompanyUnderMaintenance: XXX , statusCode: XXX
	 */
	CompanyUnderMaintenance = 150,

	/**
	 * Unsupported operation
	 * The operation you're trying to perform for a given entity isn't supported. Operation XXX is not supported.
	 */
	UnsupportedOperation = 500,

	/**
	 * Duplicate Request ID
	 * The request ID you're trying to use already exists in the QuickBooks Online Accounting API or QuickBooks Payments API. Our system detected the duplicate.
	 */
	DuplicateRequestId = 600,

	/**
	 * Object Not Found
	 * The object ID you're requesting doesn't exist.
	 */
	ObjectNotFound = 610,

	/**
	 * Txn ID Cannot Be Linked
	 * The Txn ID (identified by XXX) you're trying to use can't be linked.
	 */
	TxnIdCannotBeLinked = 620,

	/**
	 * Duplicate Object
	 * There's already an object with some properties (for example, duplicate reference IDs). This violates the unique constraint of the object.
	 */
	DuplicateObject = 630,

	/**
	 * Parent Reference Invalid
	 * The parent isn't a valid reference.
	 */
	ParentReferenceInvalid = 700,

	/**
	 * Cannot delete object
	 * The object can't be deleted due to existing dependencies. Delete those dependencies first.
	 */
	CannotDeleteObject = 800,

	/**
	 * Parent cannot be child
	 * The same object can't be the parent or child of itself.
	 */
	ParentCannotBeChild = 900,

	/**
	 * Operation failed
	 * The operation you're trying to perform failed for the entity (identified by XXX). Operation XXX failed.
	 */
	OperationFailed = 1000,

	/**
	 * Create Failed
	 * The object you tried to create wasn't created. Object creation failed, XXX.
	 */
	CreateFailed = 1010,

	/**
	 * Update Failed
	 * The object you tried to update wasn't updated. Object update failed, XXX.
	 */
	UpdateFailed = 1020,

	/**
	 * Batch size exceeds allowed limit
	 * The batch size for the batch request or BatchItemRequest is too big. The batch limit size is stated by the XXX value.
	 */
	BatchSizeExceedsAllowedLimit = 1040,

	/**
	 * Invalid Content Type
	 * This error occurs when messages are sent through the Java Message Service queue. We only support XML or JSON formats.
	 */
	InvalidContentType = 1050,

	/**
	 * Invalid or unsupported object name
	 * The specified object name is unsupported or invalid. Object Name: XXX.
	 */
	InvalidOrUnsupportedObjectName = 2000,

	/**
	 * Request has invalid or unsupported property
	 * The specified property name (identified by XXX) is unsupported or invalid. Property Name: XXX.
	 */
	RequestHasInvalidOrUnsupportedProperty = 2010,

	/**
	 * Required param missing, need to supply the required value for the API
	 * The required parameter is missing in the request. Required parameter XXX is missing.
	 */
	RequiredParamMissing = 2020,

	/**
	 * Invalid ID
	 * IDs need to be a valid number. This error can be for any entity or operation. Supplied value: XXX.
	 */
	InvalidId = 2030,

	/**
	 * Invalid String
	 * An element contains invalid characters. Review the string. It may contain unsupported characters. Element contains invalid characters: XXX.
	 */
	InvalidString = 2040,

	/**
	 * Invalid String Length
	 * A specified string length is either too long or too short. Minimum and maximum length defined in the error response. Min: XXX, Max: XXX, Supplied length: XXX.
	 */
	InvalidStringLength = 2050,

	/**
	 * Invalid Date Format
	 * The date format isn't valid.
	 */
	InvalidDateFormat = 2060,

	/**
	 * Invalid Date
	 * The date value must be a valid value. Supplied value: XXX.
	 */
	InvalidDate = 2070,

	/**
	 * Invalid Number Format
	 * The number format supplied isn't valid.
	 */
	InvalidNumberFormat = 2080,

	/**
	 * Invalid Number
	 * The number supplied is the correct format, but the value isn't supported by the API.
	 */
	InvalidNumber = 2090,

	/**
	 * Invalid Decimal Format
	 * The decimal format isn't valid.
	 */
	InvalidDecimalFormat = 2100,

	/**
	 * Invalid Decimal
	 * The decimal supplied may be the correct format, but the value isn't supported by the API.
	 */
	InvalidDecimal = 2110,

	/**
	 * Invalid Type
	 * The specified type isn't compatible or supported by the API. This error usually applies to entities that have categories or types. For example, items can have a "product" or "service" type.
	 */
	InvalidType = 2120,

	/**
	 * Invalid Request Id Format
	 * The format of request ID is invalid and not supported by the API.
	 */
	InvalidRequestIdFormat = 2130,

	/**
	 * Invalid Amount
	 * The amount value isn't supported by the API.
	 */
	InvalidAmount = 2140,

	/**
	 * Invalid Percent
	 * The percent value is invalid and not supported by the API.
	 */
	InvalidPercent = 2150,

	/**
	 * Invalid Quantity
	 * The quantity value is invalid and not supported by the API.
	 */
	InvalidQuantity = 2160,

	/**
	 * Invalid Enumeration
	 * The enumeration value is invalid and not supported by the API.
	 */
	InvalidEnumeration = 2170,

	/**
	 * Invalid String Range
	 * The string range isn't valid.
	 */
	InvalidStringRange = 2180,

	/**
	 * Invalid Date Range
	 * The date range isn't valid.
	 */
	InvalidDateRange = 2190,

	/**
	 * Malformed Website Address Format
	 * The URL isn't in the correct format. Supplied value: XXX.
	 */
	MalformedWebsiteAddressFormat = 2200,

	/**
	 * Invalid Email Address Format
	 * The email address doesn't conform to RFC 822 syntax rules. Supplied value: XXX.
	 */
	InvalidEmailAddressFormat = 2210,

	/**
	 * Invalid Currency Type
	 * The specified currency type isn't valid.
	 */
	InvalidCurrencyType = 2220,

	/**
	 * Invalid Boolean
	 * The specified boolean value isn't valid.
	 */
	InvalidBoolean = 2230,

	/**
	 * Invalid Number Range
	 * The specified number isn't within the valid range. Supplied value: XXX.
	 */
	InvalidNumberRange = 2240,

	/**
	 * Missing lines
	 * You must enter at least one split line.
	 */
	MissingLines = 2250,

	/**
	 * MissingPostingType
	 * A posting type is required. Valid values are Credit or Debit.
	 */
	MissingPostingType = 2260,

	/**
	 * MissingTaxApplicableOn
	 * The TaxApplicableOn entity is required. Set it in the request payload. Valid values are Credit or Debit.
	 */
	MissingTaxApplicableOn = 2270,

	/**
	 * MissingTaxAmount
	 * A tax amount is required with TaxCodeRef applied.
	 */
	MissingTaxAmount = 2280,

	/**
	 * NegativeAmount
	 * Negative amounts aren't supported on transaction lines.
	 */
	NegativeAmount = 2290,

	/**
	 * Amount on debits not equal to credits
	 * A journal entry you created or updated unbalanced an account. Balance the debits and credits for the account.
	 */
	AmountOnDebitsNotEqualToCredits = 2300,

	/**
	 * Invalid Reference Id
	 * The reference ID is invalid: XXX.
	 */
	InvalidReferenceId = 2500,

	/**
	 * Invalid Request Conflict Element in Request
	 * Conflicting elements found in the request.
	 */
	InvalidRequestConflictElementInRequest = 2600,

	/**
	 * Invalid Custom Field
	 * The custom field for the specified object isn't valid.
	 */
	InvalidCustomField = 3000,

	/**
	 * ApplicationAuthenticationFailed
	 * The signature in the Oauth request has been changed and is now invalid. SignatureBaseString: XXX.
	 */
	ApplicationAuthenticationFailed = 3200,

	/**
	 * EmptyField
	 * Review the error message for the cause of the issue. Related to oauth_token.
	 */
	EmptyField = 3202,

	/**
	 * The query cannot be parsed, refer to detailed message for reasons
	 * Review the error message for the cause of the issue. Query Parser Error: XXX.
	 */
	QueryCannotBeParsed = 4000,

	/**
	 * The query is invalid
	 * Review the error message for the cause of the issue. QueryValidationError: XXX.
	 */
	QueryIsInvalid = 4001,

	/**
	 * The query could not be processed due to unexpected errors
	 * Review the error message for the cause of the issue. QueryProcessingError: XXX.
	 */
	QueryCouldNotBeProcessed = 4002,

	/**
	 * Deprecated field
	 * The request has a deprecated field.
	 */
	DeprecatedField = 5000,

	/**
	 * Stale Object
	 * The requested update is for a stale object. Client needs to refresh the object.
	 */
	StaleObject = 5010,

	/**
	 * Permission Denied
	 * You don't have permissions to access this feature.
	 */
	PermissionDenied = 5020,

	/**
	 * Feature Not Supported
	 * The requested feature isn't supported.
	 */
	FeatureNotSupported = 5030,

	/**
	 * Business Validation Error
	 * Review the error message for the cause of the issue. BusinessValidationError: XXX.
	 */
	BusinessValidationError = 6000,

	/**
	 * Invalid Account.AccountType && Account.SubType
	 * You must specify either an Account.AccountType or an Account.AccountSubType.
	 */
	InvalidAccountAccountTypeAndSubType = 6010,

	/**
	 * Content length missing in request
	 * Can't find the content-length header.
	 */
	ContentLengthMissingInRequest = 6020,

	/**
	 * Upload request size exceeds allowed limit
	 * The file size exceeds the size limit. Upload requests shouldn't exceed (XXX).
	 */
	UploadRequestSizeExceedsAllowedLimit = 6030,

	/**
	 * The file metadata must be of Attachable type
	 * The submitted file metadata must be attachable. Supplied Type: XXX. Request parameter: XXX.
	 */
	FileMetadataMustBeOfAttachableType = 6040,

	/**
	 * Invalid Uploaded File
	 * The uploaded file isn't valid. Learn more about accepted attach images and note types
	 */
	InvalidUploadedFile = 6041,

	/**
	 * The entity reference type is unsupported for Attachable
	 * The entity reference type (specified by XXX) isn't supported for attachable.
	 */
	EntityReferenceTypeUnsupportedForAttachable = 6050,

	/**
	 * Account.OpenBalanceDate must be specified with Account.OpenBalance
	 * A value for the Account.OpenBalanceDate field is required when specifying an Account.OpenBalance.
	 */
	AccountOpenBalanceDateMustBeSpecifiedWithOpenBalance = 6060,

	/**
	 * Amount calculation incorrect in the request
	 * The amount isn't equal to the Qty * UnitPrice. Supplied value: XXX.
	 */
	AmountCalculationIncorrectInRequest = 6070,

	/**
	 * No Name Provided
	 * Fill out values for at least one of the following: Title, GivenName, MiddleName, FamilyName, DisplayName, Suffix.
	 */
	NoNameProvided = 6080,

	/**
	 * Discount Line missing required info
	 * A discount amount or percent is required.
	 */
	DiscountLineMissingRequiredInfo = 6090,

	/**
	 * Invalid Line TaxCode in the request
	 * The TaxCode value isn't valid. For US, specify TAX or NON. Supplied value: XXX.
	 */
	InvalidLineTaxCodeInRequest = 6100,

	/**
	 * MAS Transaction cannot be updated
	 * The requested transaction can't be updated since it's a MAS transaction.
	 */
	MasTransactionCannotBeUpdated = 6110,

	/**
	 * MAS Transaction cannot be deleted
	 * The requested transaction can't be deleted since it's a MAS transaction.
	 */
	MasTransactionCannotBeDeleted = 6120,

	/**
	 * Cannot change who customer bills with
	 * You can't change who this customer bills with because there are invoices connected to a parent account. These invoices include charges for this customer. Or, it's possible there are payments from the parent account that are applied to invoices for this customer. Delete all payments or invoices for the parent account that are linked to this customer.
	 */
	CannotChangeWhoCustomerBillsWith = 6130,

	/**
	 * Duplicate Doc Num
	 * The specified number is already in use. Specify a different number.
	 */
	DuplicateDocNum = 6140,

	/**
	 * ParentRef Required Validation Error
	 * A ParentRef is required depending if (XXX) is true or false.
	 */
	ParentRefRequiredValidationError = 6150,

	/**
	 * Invalid TaxCodeRef Error
	 * The specified CustomSalesTax ID can't be used to create a transaction.
	 */
	InvalidTaxCodeRefError = 6160,

	/**
	 * Invalid TxnTaxDetail Error
	 * The TxnTaxDetail attribute isn't allowed when GlobalTaxCalculation is set to NotApplicable.
	 */
	InvalidTxnTaxDetailError = 6170,

	/**
	 * Sub Level Limit
	 * Review the number of nested accounts and customers. You can nest up to 5 levels.
	 */
	SubLevelLimit = 6180,

	/**
	 * Invalid Company Status Error
	 * The subscription period for the QuickBooks Online company has ended, has a billing problem, or was canceled. Learn more about QuickBooks Online subscription states.
	 */
	InvalidCompanyStatusError = 6190,

	/**
	 * Account Period Closed Error
	 * The user has "closed the books" so the account period is closed for edits.
	 */
	AccountPeriodClosedError = 6200,

	/**
	 * Account Period Closed Required Password Error
	 * The user has "closed the books" so the account period is closed for edits. A password is required to make changes and updates.
	 */
	AccountPeriodClosedRequiredPasswordError = 6210,

	/**
	 * Delete Entity Has Balance Error
	 * The object or entity you're trying to delete has an open balance.
	 */
	DeleteEntityHasBalanceError = 6220,

	/**
	 * Invalid TaxCodeRef Error
	 * You can't update transactions to use the CustomSalesTax ID.
	 */
	InvalidTaxCodeRefErrorUpdate = 6230,

	/**
	 * Duplicate Name Exists Error
	 * The specified name already exists. The customer ID is: XXX.
	 */
	DuplicateNameExistsError = 6240,

	/**
	 * InvalidSalesCustomer
	 * The specified customer (identified by XXX) doesn't exist, or is inactive.
	 */
	InvalidSalesCustomer = 6250,

	/**
	 * InventoryTxnDatedBeforeItemStartDate
	 * Transactions with inventory items that have a quantity on hand can't be dated earlier than the specified InventoryStartDate.
	 */
	InventoryTxnDatedBeforeItemStartDate = 6270,

	/**
	 * Delete Customer Has Unbilled Expenses Error
	 * This customer can't be deleted because they have unbilled charges.
	 */
	DeleteCustomerHasUnbilledExpensesError = 6280,

	/**
	 * InvalidEmployeeOrVendor
	 * You must specify either an "employee" or "vendor." You can't enter both. Their ID is: XXX.
	 */
	InvalidEmployeeOrVendor = 6290,

	/**
	 * InvalidEmployeeOrVendorName
	 * The employee or vendor's name is either missing or invalid. It should be Employee or Vendor.
	 */
	InvalidEmployeeOrVendorName = 6300,

	/**
	 * MissingCustomer
	 * A customer is required if the transaction is billable.
	 */
	MissingCustomer = 6310,

	/**
	 * InvalidBillable
	 * Invalid billable status: XXX.
	 */
	InvalidBillable = 6320,

	/**
	 * MissingBillingRate
	 * Invalid hourly rate: XXX.
	 */
	MissingBillingRate = 6330,

	/**
	 * InvalidTime
	 * You must specify a time (hours:minutes): XXX.
	 */
	InvalidTime = 6340,

	/**
	 * MissingTime
	 * Time (hours:minutes) is missing: XXX.
	 */
	MissingTime = 6350,

	/**
	 * InvalidStartOrEndTime
	 * Enter a valid start and end time. Make sure break times aren't longer than the elapsed time.
	 */
	InvalidStartOrEndTime = 6360,

	/**
	 * StartTimeAfterEndTime
	 * The start time is after end time: XXX.
	 */
	StartTimeAfterEndTime = 6370,

	/**
	 * InvalidDuration
	 * The time duration isn't within the valid range: XXX.
	 */
	InvalidDuration = 6380,

	/**
	 * InvalidMultipleDurations
	 * Invalid multiple time durations. Specify a total elapsed time (hours:minutes) or the start and end time.
	 */
	InvalidMultipleDurations = 6390,

	/**
	 * Deleting linkedPurchase results in invalid Invoice
	 * The purchase can't be deleted since it would invalidate a linked invoice.
	 */
	DeletingLinkedPurchaseResultsInInvalidInvoice = 6400,

	/**
	 * Email address is required
	 * An email address is required for this customer since the delivery type is "email."
	 */
	EmailAddressIsRequired = 6420,

	/**
	 * Invalid account type used
	 * Invalid account type: XXX
	 */
	InvalidAccountTypeUsed = 6430,

	/**
	 * Transaction Detail Information Required
	 * You must select a product or service or an account for each split line that has an amount or a billable customer.
	 */
	TransactionDetailInformationRequired = 6440,

	/**
	 * Attempt to Void Transaction failed
	 * Since the transaction is already settled, you can't void it.
	 */
	AttemptToVoidTransactionFailed = 6450,

	/**
	 * Invoice MAS Transaction Deposit Amount mismatch
	 * The invoice deposit amount (XXX) and credit card amount (YYY) don't match.
	 */
	InvoiceMasTransactionDepositAmountMismatch = 6460,

	/**
	 * TaxLiabilityAccount or TaxRateError
	 * You either selected a tax on a transaction that's not allowed, or haven't specified a tax rate.
	 */
	TaxLiabilityAccountOrTaxRateError = 6470,

	/**
	 * Matched Transaction Delete Error
	 * You can't delete this transaction. It's matched to another transaction that was categorized into a different financial account.
	 */
	MatchedTransactionDeleteError = 6480,

	/**
	 * MultipleBudgetSecondaryListTypes
	 * Review the details in the error response.
	 */
	MultipleBudgetSecondaryListTypes = 6490,

	/**
	 * MissingBudgetDetails
	 * Review the details in the error response.
	 */
	MissingBudgetDetails = 6500,

	/**
	 * BudgetAccountMismatch
	 * Review the details in the error response.
	 */
	BudgetAccountMismatch = 6510,

	/**
	 * Missing Tracked Inventory Item Quantity
	 * The tracked inventory item must have a quantity.
	 */
	MissingTrackedInventoryItemQuantity = 6520,

	/**
	 * Found raw Credit Card Numbering request
	 * You can't enter raw credit card numbers. Manual credit card data isn't supported. Use a token for the credit card number.
	 */
	FoundRawCreditCardNumberingRequest = 6530,

	/**
	 * Deposited Transaction cannot be changed
	 * This transaction is part of a deposit. If you want to change or delete it, you must edit and remove it from the deposit it appears on.
	 */
	DepositedTransactionCannotBeChanged = 6540,

	/**
	 * An application error has occurred while processing your request
	 * Review the System Failure Error code (XXX) to identify the issue.
	 */
	ApplicationErrorOccurred = 10000,

	/**
	 * Result Set Big
	 * The result for the query is too large.
	 */
	ResultSetBig = 10100,

	/**
	 * Company Reset
	 * Company has been reset. Request for CUD is stale.
	 */
	CompanyReset = 10200,
}
