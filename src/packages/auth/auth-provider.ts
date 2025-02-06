// Imports
import { AuthEndpoints, AuthScopes, GrantType, type Token, type TokenResponse } from "../../types/types";

/**
 * The Auth Provider is responsible for handling the OAuth2 flow for the application.
 * It is responsible for generating the OAuth2 URL and handling the callback.
 */
export class AuthProvider {
	/**
	 * The Auth Header for the application
	 */
	private readonly authHeader: string;

	/**
	 * Initialize the Auth Provider
	 * @param clientId The client ID for the application
	 * @param clientSecret The client secret for the application
	 * @param redirectUri The redirect URI for the application
	 */
	constructor(
		private readonly clientId: string,
		private readonly clientSecret: string,
		private readonly redirectUri: string,
		private readonly scopes: Array<AuthScopes>
	) {
		// Generate the Auth Header
		this.authHeader = "Basic " + Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");
	}

	/**
	 * Generates the OAuth2 URL to get the auth code from the user
	 * @returns {URL} The OAuth2 URL to get the auth code from the user
	 */
	public generateAuthUrl(): URL {
		// Join the scopes into a string
		const scopeUriString = this.scopes.join(" ");

		// Setup the Auth URL
		const authUrl = new URL(AuthEndpoints.AuthUrl);

		// Generate a Unique State
		const state = crypto.randomUUID();

		// Set the Query Params
		authUrl.searchParams.set("client_id", this.clientId);
		authUrl.searchParams.set("scope", scopeUriString);
		authUrl.searchParams.set("redirect_uri", this.redirectUri);
		authUrl.searchParams.set("response_type", "code");
		authUrl.searchParams.set("state", state);

		// Return the Auth URL
		return authUrl;
	}

	/**
	 * Exchanges an Auth Code for a Token
	 * @param authCode The auth code to exchange for a token
	 * @returns {Promise<Token>} The token
	 */
	public async exchangeCode(code: string, realmId: string): Promise<Token> {
		// Setup the Request Data
		const requestData = new URLSearchParams({
			redirect_uri: this.redirectUri,
			code: code,
			grant_type: GrantType.AuthorizationCode,
		});

		// Setup the Request Options
		const requestOptions: RequestInit = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: this.authHeader,
			},
			body: requestData,
		};

		// Request the Refresh Token
		const response = await fetch(AuthEndpoints.TokenBearer, requestOptions);

		// Check if the response is successful
		if (!response.ok) {
			// Get the error message
			const errorMessage = await response.text();

			// Throw an error
			throw new Error(`Failed to exchange auth code for a token: ${errorMessage}`);
		}

		// Parse the response
		const data = (await response.json().catch(() => {
			throw new Error("Failed to parse the token response");
		})) as TokenResponse;

		// Parse the token response
		const token = this.parseTokenResponse(data, realmId);

		// Return the token
		return token;
	}

	/**
	 * Exchanges a Refresh Token for a Token
	 * @param refreshToken The refresh token to exchange for a token
	 * @returns {Promise<Token>} The token
	 */
	public async refresh(token: Token): Promise<Token> {
		// Check if the refresh token is expired
		if (token.refreshTokenExpiryDate < new Date()) throw new Error("Refresh token is expired, please re-authenticate");

		// Setup the Request Data
		const requestData = new URLSearchParams({
			refresh_token: token.refreshToken,
			grant_type: GrantType.RefreshToken,
		});

		// Setup the Request Options
		const requestOptions: RequestInit = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: this.authHeader,
			},
			body: requestData,
		};

		// Request the Refresh Token
		const response = await fetch(AuthEndpoints.TokenBearer, requestOptions);

		// Check if the response is successful
		if (!response.ok) throw new Error("Failed to refresh token");

		// Parse the response
		const data = (await response.json().catch(() => {
			throw new Error("Failed to parse the token response");
		})) as TokenResponse;

		// Parse the token response
		const newToken = this.parseTokenResponse(data, token.realmId);

		// Return the new token
		return newToken;
	}

	private parseTokenResponse(response: TokenResponse, realmId: string): Token {
		// Calculate the Expiry Date for the Refresh Token
		const refreshTokenExpiryDate = new Date(Date.now() + response.x_refresh_token_expires_in * 1000);

		// Calculate the Expiry Date for the Access Token
		const accessTokenExpiryDate = new Date(Date.now() + response.expires_in * 1000);

		// Parse the Token
		const parsedToken: Token = {
			tokenType: response.token_type,
			refreshToken: response.refresh_token,
			refreshTokenExpiryDate: refreshTokenExpiryDate,
			accessToken: response.access_token,
			accessTokenExpiryDate: accessTokenExpiryDate,
			realmId: realmId,
		};

		// Return the parsed token
		return parsedToken;
	}
}
