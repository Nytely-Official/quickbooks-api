// Imports
import type { TokenType } from '../enums/token-type';

/**
 * The object returned from the Token Exchange Request
 */
export interface TokenResponse {
	token_type: TokenType;
	expires_in: number;
	refresh_token: string;
	x_refresh_token_expires_in: number;
	access_token: string;
}
