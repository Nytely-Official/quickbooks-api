/**
 * Represents a linked transaction reference
 */
export interface LinkedTxn {
	/**
	 * @property {string} TxnId - Transaction ID of the related transaction
	 */
	TxnId: string;

	/**
	 * @property {string} TxnType - Transaction type of the linked object
	 */
	TxnType: string;

	/**
	 * @property {string} TxnLineId - Line number of a specific line in the linked transaction.
	 * @conditionallyRequired Required for Deposit and Bill entities. Requires TxnId and TxnType when used.
	 */
	TxnLineId: string;
}
