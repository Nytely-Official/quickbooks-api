// Imports
import { DeliveryType, DateTime } from '../types';
/**
 * Delivery Info
 *
 * @description The delivery info for the invoice
 */
export interface DeliveryInfo {
	/**
	 * Type of the delivery. Used to confirm that email has been sent via the send operation.
	 * Valid values currently include: Email.
	 * @readonly
	 */
	DeliveryType: DeliveryType;

	/**
	 * Delivery date and time.
	 * @readonly
	 */
	DeliveryTime: DateTime;
}
