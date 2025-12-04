// Import the Token Type
import type { TokenType } from '../types';
import type { IdToken } from './id-token';
import type { UserProfile } from './user-profile';

/**
 * The Token Object
 */
export interface Token {
	/**
	 * The type of token
	 */
	tokenType: TokenType;

	/**
	 * The refresh token
	 */
	refreshToken: string;

	/**
	 * The expiration time of the refresh token
	 */
	refreshTokenExpiryDate: Date;

	/**
	 * The access token
	 */
	accessToken: string;

	/**
	 * The expiration time of the access token
	 */
	accessTokenExpiryDate: Date;

	/**
	 * The realm ID
	 */
	realmId: string;

	/**
	 * The ID token from OpenID Connect (present when openid scope is requested)
	 */
	idToken?: IdToken;

	/**
	 * The user profile information (present when SSO is used)
	 */
	userProfile?: UserProfile;
}
