// Imports
import { Endpoints } from "@/types/enums/endpoints";
import { AuthScopes, GrantType, type Token, type TokenResponse } from "../../types/types";

/**
 * The Auth Provider is responsible for handling the OAuth2 flow for the application.
 * It is responsible for generating the OAuth2 URL and handling the callback.
 */
export class AuthProvider {
	/**
	 * The Auth Header for the application
	 */
	public readonly authHeader: string;

	/**
	 * Initialize the Auth Provider
	 * @param clientId The client ID for the application *Required*
	 * @param clientSecret The client secret for the application *Required*
	 * @param redirectUri The redirect URI for the application *Required*
	 * @param scopes The scopes for the application *Required*
	 * @param token The token for the application (optional)
	 */

	constructor(
		private readonly clientId: string,
		private readonly clientSecret: string,
		private readonly redirectUri: string,
		private readonly scopes: Array<AuthScopes>,
		private token?: Token
	) {
		// Generate the Auth Header
		this.authHeader = "Basic " + Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");
	}

	/**
	 * Get the Access Token
	 * @returns {string} The access token
	 */
	public async getToken(): Promise<Token> {
		// Check if the token is expired
		if (!this.token) throw new Error("User is not Authorized, please re-authenticate or set the token manually with the setToken method");

		// Check if the Token is Expired and Refresh it if it is
		if (this.token.accessTokenExpiryDate < new Date()) await this.refresh();

		// Return the Token
		return this.token;
	}

	/**
	 * Set the Token
	 * @param token The token to set
	 */
	public async setToken(newToken: Token) {
		// Check if the Token is Expired
		if (newToken.accessTokenExpiryDate < new Date()) await this.refresh();

		// Update the Token
		this.token = newToken;
	}

	/**

	 * Generates the OAuth2 URL to get the auth code from the user

	 * @returns {URL} The OAuth2 URL to get the auth code from the user
	 */
	public generateAuthUrl(): URL {
		// Join the scopes into a string
		const scopeUriString = this.scopes.join(" ");

		// Setup the Auth URL
		const authUrl = new URL(Endpoints.UserAuth);

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
		const response = await fetch(Endpoints.TokenBearer, requestOptions);

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

		// Update the Token
		this.token = token;

		// Return the token
		return token;
	}

	/**
	 * Exchanges a Refresh Token for a Token
	 * @param refreshToken The refresh token to exchange for a token
	 * @returns {Promise<Token>} The token
	 */
	public async refresh(): Promise<Token> {
		// Check if the token is provided
		if (!this.token) throw new Error("Token is not provided, please set the token manually with the setToken method");

		// Check if the refresh token is expired
		if (this.token.refreshTokenExpiryDate < new Date()) throw new Error("Refresh token is expired, please re-authenticate");

		// Setup the Request Data
		const requestData = new URLSearchParams({
			refresh_token: this.token.refreshToken,
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
		const response = await fetch(Endpoints.TokenBearer, requestOptions);

		// Check if the response is successful
		if (!response.ok) throw new Error("Failed to refresh token");

		// Parse the response
		const data = (await response.json().catch(() => {
			throw new Error("Failed to parse the token response");
		})) as TokenResponse;

		// Parse the token response
		const newToken = this.parseTokenResponse(data, this.token.realmId);

		// Update the Token
		this.token = newToken;

		// Return the new token
		return newToken;
	}

	/**
	 * Revokes a Token
	 * @param token The token to revoke
	 * @returns {Promise<boolean>} True if the token was revoked, false otherwise
	 */
	public async revoke(): Promise<boolean> {
		// Check if the token is provided
		if (!this.token) throw new Error("Token is not provided, please set the token manually with the setToken method");

		// Setup the Request Data
		const requestData = {
			token: this.token.refreshToken,
		};

		// Setup the Request Options
		const requestOptions: RequestInit = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: this.authHeader,
			},
			body: JSON.stringify(requestData),
		};

		// Request the Revoke
		const response = await fetch(Endpoints.TokenRevoke, requestOptions);

		// Check if the response is successful
		if (!response.ok) throw new Error(`Failed to revoke token: invalid_token`);

		// Clear the Token
		this.token = undefined;

		// Return true
		return true;
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
