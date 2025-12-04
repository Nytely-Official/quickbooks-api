// Imports
import type { TokenType } from '../enums/token-type';

/**
 * The object returned from the Token Exchange Request
 */
export interface TokenResponse {
	/**
	 * The type of token
	 */
	token_type: TokenType;

	/**
	 * The expiration time of the token
	 */
	expires_in: number;

	/**
	 * The refresh token
	 */
	refresh_token: string;

	/**
	 * The expiration time of the refresh token
	 */
	x_refresh_token_expires_in: number;

	/**
	 * The access token
	 */
	access_token: string;

	/**
	 * The ID token from OpenID Connect (present when openid scope is requested)
	 */
	id_token?: string;
}
