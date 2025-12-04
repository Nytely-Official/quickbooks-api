/**
 * ID Token claims from OpenID Connect
 * Based on QuickBooks OpenID Connect specification
 */
export interface IdTokenClaims {
	/**
	 * Issuer - The URL of the authorization server
	 */
	iss: string;

	/**
	 * Subject - The unique identifier for the user
	 */
	sub: string;

	/**
	 * Audience - The client ID of the application
	 */
	aud: string | Array<string>;

	/**
	 * Expiration time - Unix timestamp when the token expires
	 */
	exp: number;

	/**
	 * Issued at - Unix timestamp when the token was issued
	 */
	iat: number;

	/**
	 * Nonce - Random string used to prevent replay attacks
	 */
	nonce?: string;

	/**
	 * Email address of the user
	 */
	email?: string;

	/**
	 * Whether the email is verified
	 */
	email_verified?: boolean;

	/**
	 * Given name (first name) of the user
	 */
	given_name?: string;

	/**
	 * Family name (last name) of the user
	 */
	family_name?: string;

	/**
	 * Full name of the user
	 */
	name?: string;

	/**
	 * Phone number of the user
	 */
	phone_number?: string;

	/**
	 * Whether the phone number is verified
	 */
	phone_number_verified?: boolean;
}

/**
 * Decoded ID Token
 */
export interface IdToken {
	/**
	 * The raw ID token string
	 */
	raw: string;

	/**
	 * The decoded claims from the ID token
	 */
	claims: IdTokenClaims;
}
