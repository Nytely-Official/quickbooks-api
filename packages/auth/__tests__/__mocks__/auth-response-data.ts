// Imports
import { TokenType, type TokenResponse } from "../../src/app";

// Create the Auth Response Data
export const mockAuthResponseData: { old: TokenResponse; new: TokenResponse } = {
	old: {
		token_type: TokenType.Bearer,
		expires_in: 3600,
		refresh_token: "old_refresh_token",
		x_refresh_token_expires_in: 86400,
		access_token: "old_access_token",
	},
	new: {
		token_type: TokenType.Bearer,
		expires_in: 3600,
		refresh_token: "new_refresh_token",
		x_refresh_token_expires_in: 86400,
		access_token: "new_access_token",
	},
};
