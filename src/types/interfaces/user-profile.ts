/**
 * User profile information retrieved from Intuit's user info endpoint
 */
export interface UserProfile {
	/**
	 * The unique identifier for the user
	 */
	sub: string;

	/**
	 * Email address of the user
	 */
	email?: string;

	/**
	 * Whether the email is verified
	 */
	emailVerified?: boolean;

	/**
	 * Given name (first name) of the user
	 */
	givenName?: string;

	/**
	 * Family name (last name) of the user
	 */
	familyName?: string;

	/**
	 * Full name of the user
	 */
	name?: string;

	/**
	 * Phone number of the user
	 */
	phoneNumber?: string;

	/**
	 * Whether the phone number is verified
	 */
	phoneNumberVerified?: boolean;
}
