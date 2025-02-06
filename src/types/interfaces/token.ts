// Import the Token Type
import type { TokenType } from "../types";

/**
 * The Token Object
 */
export interface Token {
	tokenType: TokenType;
	refreshToken: string;
	refreshTokenExpiryDate: Date;
	accessToken: string;
	accessTokenExpiryDate: Date;
	realmId: string;
}
