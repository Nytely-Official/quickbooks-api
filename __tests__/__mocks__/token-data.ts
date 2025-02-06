// Imports
import { type Token, TokenType } from "../../src/types/types";

// Export the Mock Token Data
export const mockTokenData: Token = {
	tokenType: TokenType.Bearer,
	accessToken: "new_access_token",
	refreshToken: "new_refresh_token",
	accessTokenExpiryDate: new Date(Date.now() + 3600),
	refreshTokenExpiryDate: new Date(Date.now() + 86400),
	realmId: "test_realm",
};
