// External Imports
import { TinyEmitter } from 'tiny-emitter';

// Internal Imports
import {
	Endpoints,
	AuthScopes,
	GrantType,
	type Token,
	type TokenResponse,
	type IdToken,
	type IdTokenClaims,
	type UserProfile,
	QuickbooksError,
	Environment,
	APIUrls,
} from '../../types/types';
import { ApiClient } from '../api/api-client';

/**
 * The Auth Provider is responsible for handling the OAuth2 flow for the application.
 * It is responsible for generating the OAuth2 URL and handling the callback.
 */
export class AuthProvider {
	public readonly serializationHeader = 'QBOAUTHTOKEN';

	/**
	 * The Auth Header for the application
	 */
	public readonly authHeader: string;

	/**
	 * The Event Emitter for the Auth Provider
	 */
	private readonly eventEmitter: TinyEmitter = new TinyEmitter();

	/**
	 * Wether to automatically refresh the token when it is expired
	 */
	private autoRefresh: boolean = true;

	/**
	 * Initialize the Auth Provider
	 * @param clientId The client ID for the application *Required*
	 * @param clientSecret The client secret for the application *Required*
	 * @param redirectUri The redirect URI for the application *Required*
	 * @param scopes The scopes for the application *Required*
	 * @param token The token for the application (optional)
	 * @param environment The environment to use for the application (optional, defaults to Production)
	 */

	constructor(
		private readonly clientId: string,
		private readonly clientSecret: string,
		private readonly redirectUri: string,
		private readonly scopes: Array<AuthScopes>,
		private token?: Token,
		private readonly environment: Environment = Environment.Production,
	) {
		// Generate the Auth Header
		this.authHeader = 'Basic ' + Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
	}

	/**
	 * Enable the Auto Refresh
	 */
	public enableAutoRefresh(): void {
		this.autoRefresh = true;
	}

	/**
	 * Disable the Auto Refresh
	 */
	public disableAutoRefresh(): void {
		this.autoRefresh = false;
	}

	/**
	 * Get the Access Token
	 * @throws {QuickbooksError} If the token is not provided
	 * @returns {string} The access token
	 */
	public async getToken(): Promise<Token> {
		// Check if the token is expired
		if (!this.token)
			throw new QuickbooksError(
				'User is not Authorized, please re-authenticate or set the token manually with the setToken method',
				await ApiClient.getIntuitErrorDetails(null),
			);

		// Check if the Token is Expired and Refresh it if it is
		if (this.token.accessTokenExpiryDate < new Date() && this.autoRefresh) await this.refresh();

		// Return the Token
		return this.token;
	}

	/**
	 * Set the Token
	 * @param token The token to set
	 * @throws {QuickbooksError} If the token is not provided
	 */
	public async setToken(newToken: Token | null): Promise<void> {
		// Check if the Token is not provided and clear the token
		if (!newToken) return (this.token = undefined);

		// Update the Token
		this.token = newToken;

		// Check if the Token is Expired
		if (newToken.accessTokenExpiryDate < new Date() && this.autoRefresh) await this.refresh();
	}

	/**
	 * Generates the OAuth2 URL to get the auth code from the user
	 * @param state The state to use for the OAuth2 URL (optional, auto-generated if not provided)
	 * @param nonce The nonce to use for OpenID Connect (optional, auto-generated if SSO is enabled)
	 * @returns {URL} The OAuth2 URL to get the auth code from the user
	 */
	public generateAuthUrl(state: string = crypto.randomUUID(), nonce?: string): URL {
		// Join the scopes into a string
		const scopeUriString = this.scopes.join(' ');

		// Setup the Auth URL
		const authUrl = new URL(Endpoints.UserAuth);

		// Set the Query Params
		authUrl.searchParams.set('client_id', this.clientId);
		authUrl.searchParams.set('scope', scopeUriString);
		authUrl.searchParams.set('redirect_uri', this.redirectUri);
		authUrl.searchParams.set('response_type', 'code');
		authUrl.searchParams.set('state', state);

		// Add nonce for OpenID Connect if SSO is enabled
		if (this.isSsoEnabled()) {
			const nonceValue = nonce ?? crypto.randomUUID();
			authUrl.searchParams.set('nonce', nonceValue);
		}

		// Return the Auth URL
		return authUrl;
	}

	/**
	 * Exchanges an Auth Code for a Token
	 * @param code The auth code to exchange for a token
	 * @param realmId The realm ID from the OAuth callback
	 * @param nonce Optional nonce to validate the ID token (should match the one used in generateAuthUrl)
	 * @param autoFetchUserProfile Whether to automatically fetch user profile when SSO is enabled (default: true)
	 * @throws {QuickbooksError} If the token is not provided or the refresh token is expired
	 * @returns {Promise<Token>} The token
	 */
	public async exchangeCode(code: string, realmId: string, nonce?: string, autoFetchUserProfile: boolean = true): Promise<Token> {
		// Setup the Request Data
		const requestData = new URLSearchParams({
			redirect_uri: this.redirectUri,
			code: code,
			grant_type: GrantType.AuthorizationCode,
		});

		// Setup the Request Options
		const requestOptions: RequestInit = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
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
			throw new QuickbooksError(
				`Failed to exchange auth code for a token: ${errorMessage}`,
				await ApiClient.getIntuitErrorDetails(response),
			);
		}

		// Parse the response
		const data: TokenResponse = await response.json().catch(async () => {
			throw new QuickbooksError('Failed to parse the token response', await ApiClient.getIntuitErrorDetails(response));
		});

		// Clear the Current Token
		this.token = undefined;

		// Parse the token response
		const token = await this.parseTokenResponse(data, realmId, nonce, autoFetchUserProfile);

		// Update the Token
		this.token = token;

		// Return the token
		return token;
	}

	/**
	 * Exchanges a Refresh Token for a Token
	 * @param refreshToken The refresh token to exchange for a token
	 * @throws {QuickbooksError} If the token is not provided or the refresh token is expired
	 * @returns {Promise<Token>} The refreshed token
	 */
	public async refresh(): Promise<Token> {
		// Check if the token is provided
		if (!this.token)
			throw new QuickbooksError(
				'Token is not provided, please set the token manually with the setToken method',
				await ApiClient.getIntuitErrorDetails(null),
			);

		// Check if the refresh token is expired
		if (this.token.refreshTokenExpiryDate < new Date())
			throw new QuickbooksError('Refresh token is expired, please re-authenticate', await ApiClient.getIntuitErrorDetails(null));

		// Setup the Request Data
		const requestData = new URLSearchParams({
			refresh_token: this.token.refreshToken,
			grant_type: GrantType.RefreshToken,
		});

		// Setup the Request Options
		const requestOptions: RequestInit = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: this.authHeader,
			},
			body: requestData,
		};

		// Request the Refresh Token
		const response = await fetch(Endpoints.TokenBearer, requestOptions);

		// Check if the response is successful
		if (!response.ok) {
			// Get the Intuit Error Details
			const errorDetails = await ApiClient.getIntuitErrorDetails(response);

			// Throw the Quickbooks Error
			throw new QuickbooksError(`Failed to refresh token`, errorDetails);
		}

		// Parse the response
		const data: TokenResponse = await response.json().catch(async () => {
			throw new QuickbooksError('Failed to parse the token response', await ApiClient.getIntuitErrorDetails(response));
		});

		// Parse the token response
		const newToken = await this.parseTokenResponse(data, this.token.realmId);

		// Update the Token
		this.token = newToken;

		// Emit the Refresh Event
		this.eventEmitter.emit('refresh', newToken);

		// Return the new token
		return newToken;
	}

	/**
	 * Revokes a Token
	 * @param token The token to revoke
	 * @throws {QuickbooksError} If the token is not provided
	 * @returns {Promise<boolean>} True if the token was revoked, false otherwise
	 */
	public async revoke(): Promise<boolean> {
		// Check if the token is provided
		if (!this.token)
			throw new QuickbooksError(
				'Token is not provided, please set the token manually with the setToken method',
				await ApiClient.getIntuitErrorDetails(null),
			);

		// Setup the Request Data
		const requestData = {
			token: this.token.refreshToken,
		};

		// Setup the Request Options
		const requestOptions: RequestInit = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: this.authHeader,
			},
			body: JSON.stringify(requestData),
		};

		// Request the Revoke
		const response = await fetch(Endpoints.TokenRevoke, requestOptions);

		// Check if the response is successful
		if (!response.ok) throw new QuickbooksError(`Failed to revoke token: invalid_token`, await ApiClient.getIntuitErrorDetails(response));

		// Emit the Revoke Event
		this.eventEmitter.emit('revoke', this.token);

		// Clear the Token
		this.token = undefined;

		// Return true
		return true;
	}

	/**
	 * Validates the Token
	 * @throws {QuickbooksError} If the token is not provided
	 * @returns {Promise<boolean>} True if the token is valid, false otherwise
	 */
	public async validateToken(): Promise<boolean> {
		// Check if the token is provided
		if (!this.token)
			throw new QuickbooksError(
				'Token is not provided, please set the token manually with the setToken method',
				await ApiClient.getIntuitErrorDetails(null),
			);

		// Check if the token is expired
		const tokenExpired = this.token.accessTokenExpiryDate < new Date();

		// Check if the refresh token is expired
		const refreshTokenExpired = this.token.refreshTokenExpiryDate < new Date();

		// Check if the Token and Refresh Token are expired
		if (refreshTokenExpired)
			throw new QuickbooksError('Token and Refresh Token are expired, please re-authenticate', await ApiClient.getIntuitErrorDetails(null));

		// Refresh the token if it is expired
		if (tokenExpired && this.autoRefresh)
			await this.refresh().catch((error: QuickbooksError) => {
				throw new QuickbooksError(`Failed to refresh token: ${error.message}`, error.details);
			});

		// Check if the token is expired and auto refresh is disabled
		if (tokenExpired && !this.autoRefresh)
			throw new QuickbooksError('Token is expired, please refresh the token', await ApiClient.getIntuitErrorDetails(null));

		// Return true if the token is valid
		return true;
	}

	/**
	 * Serializes the Token
	 * @param secretKey The secret key to use for the serialization
	 * @throws {QuickbooksError} If the secret key is not provided or the token is not provided
	 * @returns {string | undefined} The serialized token
	 */
	public async serializeToken(secretKey: string): Promise<string | undefined> {
		// Check if the secret key is weak
		if (secretKey.length < 32)
			throw new QuickbooksError('Secret key must be at least 32 characters long', await ApiClient.getIntuitErrorDetails(null));

		// Check if the token is not provided
		if (!this.token)
			throw new QuickbooksError(
				'Token is not provided, please set the token manually with the setToken method',
				await ApiClient.getIntuitErrorDetails(null),
			);

		// Generate a Random Salt
		const salt = crypto.getRandomValues(new Uint8Array(16));

		// Generate a Random IV
		const iv = crypto.getRandomValues(new Uint8Array(16));

		// Encode the Token Data
		const tokenData = new TextEncoder().encode(JSON.stringify(this.token));

		// Get the Crypto Key
		const cryptoKey = await this.deriveKey(secretKey, salt, 'encrypt');

		// Encrypt the Token Data with AES-GCM
		const encrypted = await crypto.subtle
			.encrypt({ name: 'AES-GCM', iv: iv, tagLength: 128 }, cryptoKey, tokenData)
			.catch(async (error: Error) => {
				// Throw an Error
				throw new QuickbooksError(`Token serialization failed: ${error.message}`, await ApiClient.getIntuitErrorDetails(null));
			});

		// Setup the Combined Array
		const combined = new Uint8Array([...iv, ...salt, ...new Uint8Array(encrypted)]);

		// Convert the Header to a Base64 String
		const headerBase64 = Buffer.from(this.serializationHeader).toString('base64');

		// Convert the Combined Array to a Base64 String
		const combinedBase64 = Buffer.from(combined).toString('base64');

		// Return the Serialized Token
		return `${headerBase64}:${combinedBase64}`;
	}

	/**
	 * Deserializes the Token
	 * @param serialized The serialized token to deserialize
	 * @param secretKey The secret key used for decryption
	 * @throws {QuickbooksError} If the serialized token is not valid or the secret key is not provided
	 */
	public async deserializeToken(serialized: string, secretKey: string): Promise<void> {
		// Check if the Serialized String is not Valid
		if (!serialized.includes(':')) throw new QuickbooksError('Invalid serialized token', await ApiClient.getIntuitErrorDetails(null));

		// Split the Serialized String
		const [headerBase64, combinedBase64] = serialized.split(':');

		// Check if the header or combined data is not valid
		if (!headerBase64 || !combinedBase64)
			throw new QuickbooksError('Invalid serialized token', await ApiClient.getIntuitErrorDetails(null));

		// Convert the Header to a String
		const headerString = Buffer.from(headerBase64, 'base64').toString('utf-8');

		// Check if the Header is not Valid
		if (headerString !== this.serializationHeader)
			throw new QuickbooksError('Invalid serialized token', await ApiClient.getIntuitErrorDetails(null));

		// Convert combined data from base64
		const combined = Buffer.from(combinedBase64, 'base64');

		// Extract IV (16 bytes), Salt (16 bytes), and ciphertext
		const iv = combined.subarray(0, 16);
		const salt = combined.subarray(16, 32);
		const ciphertext = combined.subarray(32);

		// Setup the Crypto Key
		const cryptoKey = await this.deriveKey(secretKey, salt, 'decrypt');

		// Decrypt the data
		const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, cryptoKey, ciphertext).catch(async (error: Error) => {
			// Throw an Error
			throw new QuickbooksError(`Token deserialization failed: ${error.message}`, await ApiClient.getIntuitErrorDetails(null));
		});

		// Decode the decrypted data
		const decoded = new TextDecoder().decode(decrypted);

		// Parse the decoded token data
		const parsed = JSON.parse(decoded) as Token;

		// Update the Token
		this.token = this.restoreTokenTypes(parsed);
	}

	/**
	 * Adds a callback to be called when the token is refreshed
	 * @param callback The callback to call when the token is refreshed
	 */
	public onRefresh(callback: (refreshedToken: Token) => void): void {
		// Add the callback to the list of callbacks
		this.eventEmitter.on('refresh', callback);
	}

	/**
	 * Adds a callback to be called when the token is revoked
	 * @param callback The callback to call when the token is revoked
	 */
	public onRevoke(callback: (revokedToken: Token) => void): void {
		// Add the callback to the list of callbacks
		this.eventEmitter.on('revoke', callback);
	}

	/**
	 * Decodes an ID token from a JWT string
	 * @param idTokenString The ID token JWT string
	 * @returns {IdToken} The decoded ID token
	 * @throws {QuickbooksError} If the ID token is invalid or cannot be decoded
	 */
	public async decodeIdToken(idTokenString: string): Promise<IdToken> {
		try {
			// Split the JWT into parts (header.payload.signature)
			const parts = idTokenString.split('.');
			if (parts.length !== 3) throw new Error('Invalid ID token format');

			// Decode the payload (second part)
			const payload = parts[1];
			// Add padding if needed for base64 decoding
			const paddedPayload = payload + '='.repeat((4 - (payload.length % 4)) % 4);
			const decodedPayload = Buffer.from(paddedPayload, 'base64').toString('utf-8');
			const claims: IdTokenClaims = JSON.parse(decodedPayload);

			return {
				raw: idTokenString,
				claims,
			};
		} catch (error) {
			throw new QuickbooksError(
				`Failed to decode ID token: ${error instanceof Error ? error.message : 'Unknown error'}`,
				await ApiClient.getIntuitErrorDetails(null),
			);
		}
	}

	/**
	 * Validates an ID token
	 * @param idToken The ID token to validate
	 * @param nonce Optional nonce to validate against (should match the one used in generateAuthUrl)
	 * @returns {boolean} True if the ID token is valid
	 * @throws {QuickbooksError} If the ID token is invalid
	 */
	public async validateIdToken(idToken: IdToken, nonce?: string): Promise<boolean> {
		// Get the claims from the ID token
		const claims = idToken.claims;
		const now = Math.floor(Date.now() / 1000);

		// Validate issuer (null-safety check first)
		if (!claims.iss) throw new QuickbooksError('ID token issuer is missing', await ApiClient.getIntuitErrorDetails(null));

		// Validate issuer with strict equality check
		if (claims.iss !== APIUrls.Issuer)
			throw new QuickbooksError(
				`Invalid ID token issuer. Expected: ${APIUrls.Issuer}, Received: ${claims.iss}`,
				await ApiClient.getIntuitErrorDetails(null),
			);

		// Validate audience (should match client ID)
		// The aud claim can be either a string or an array of strings per OpenID Connect spec
		const audienceMatches =
			typeof claims.aud === 'string' ? claims.aud === this.clientId : Array.isArray(claims.aud) && claims.aud.includes(this.clientId);

		// Check if the Audience does not match the client ID
		if (!audienceMatches) {
			// Get the received audience
			const receivedAud = typeof claims.aud === 'string' ? claims.aud : JSON.stringify(claims.aud);

			// Throw an error
			throw new QuickbooksError(
				`ID token audience does not match client ID. Expected: ${this.clientId}, Received: ${receivedAud}`,
				await ApiClient.getIntuitErrorDetails(null),
			);
		}

		// Validate expiration
		if (claims.exp && claims.exp < now) throw new QuickbooksError('ID token has expired', await ApiClient.getIntuitErrorDetails(null));

		// Validate nonce if provided
		if (nonce && claims.nonce !== nonce)
			throw new QuickbooksError('ID token nonce does not match', await ApiClient.getIntuitErrorDetails(null));

		// Validate email verification if email is present
		if (claims.email && claims.email_verified === false)
			throw new QuickbooksError('Email is not verified', await ApiClient.getIntuitErrorDetails(null));

		// Return true if the ID token is valid
		return true;
	}

	/**
	 * Retrieves the user profile from Intuit's user info endpoint
	 * This method requires an access token and is used for SSO flows
	 * @returns {Promise<UserProfile>} The user profile information
	 * @throws {QuickbooksError} If the request fails or the token is not available
	 */
	public async getUserProfile(): Promise<UserProfile> {
		// Get the access token
		const token = await this.getToken();

		// Determine the endpoint based on environment
		// If not specified, try to detect from ID token issuer, otherwise default to production
		const userInfoEndpoint = this.environment === Environment.Sandbox ? Endpoints.SandboxUserInfo : Endpoints.ProductionUserInfo;

		// Setup the Request Options
		const requestOptions: RequestInit = {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token.accessToken}`,
			},
		};

		// Request the User Profile
		const response = await fetch(userInfoEndpoint, requestOptions);

		// Check if the response is successful
		if (!response.ok) {
			// Get the error message
			const errorMessage = await response.text();

			// Throw an error
			throw new QuickbooksError(`Failed to retrieve user profile: ${errorMessage}`, await ApiClient.getIntuitErrorDetails(response));
		}

		// Parse the response
		const data: UserProfile = await response.json().catch(async () => {
			throw new QuickbooksError('Failed to parse the user profile response', await ApiClient.getIntuitErrorDetails(response));
		});

		// Return the user profile
		return data;
	}

	/**
	 * Checks if SSO (OpenID Connect) is enabled
	 * @returns {boolean} True if the openid scope is included
	 */
	public isSsoEnabled(): boolean {
		// Return true if the openid scope is included
		return this.scopes.includes(AuthScopes.OpenId);
	}

	/**
	 * Gets the current user profile if SSO is enabled
	 * This is a convenience method that returns the cached user profile from the token
	 * or fetches it if not available
	 * @returns {Promise<UserProfile | undefined>} The user profile or undefined if SSO is not enabled
	 */
	public async getCurrentUserProfile(): Promise<UserProfile | undefined> {
		// Check if SSO is enabled
		if (!this.isSsoEnabled()) return undefined;

		// Check if we have a token with user profile
		if (this.token?.userProfile) return this.token.userProfile;

		// Try to get the user profile
		try {
			const userProfile = await this.getUserProfile();
			// Cache it in the token if we have one
			if (this.token) this.token.userProfile = userProfile;

			return userProfile;
		} catch (error) {
			// If we can't get the profile, return undefined
			return undefined;
		}
	}

	/**
	 * Derives a Crypto Key
	 * @param secretKey The secret key to derive the key from
	 * @param salt The salt to derive the key from
	 * @param keyUsage The key usage for the derived key
	 * @returns {Promise<CryptoKey>} The derived key
	 */
	private async deriveKey(secretKey: string, salt: Uint8Array, keyUsage: 'encrypt' | 'decrypt'): Promise<CryptoKey> {
		// Encode the Secret Key
		const keyBuffer = new TextEncoder().encode(secretKey);

		// Setup the Encryption Algorithm
		const encryptionAlgorithm: Pbkdf2Params = { name: 'PBKDF2', salt: salt as BufferSource, iterations: 100000, hash: 'SHA-256' };

		// Setup the Key Material
		const keyMaterial = await crypto.subtle.importKey('raw', keyBuffer, 'PBKDF2', false, ['deriveKey']);

		// Derive the encryption key
		const cryptoKey = await crypto.subtle.deriveKey(
			encryptionAlgorithm,
			keyMaterial,
			{ name: 'AES-GCM', length: 256 }, // Fixed algorithm specification
			false,
			[keyUsage],
		);

		// Return the Crypto Key
		return cryptoKey;
	}

	/**
	 * Parses the Token Response
	 * @param response The token response to parse
	 * @param realmId The realm ID for the token
	 * @param nonce Optional nonce to validate the ID token
	 * @param autoFetchUserProfile Whether to automatically fetch user profile when SSO is enabled
	 * @returns {Promise<Token>} The parsed token
	 */
	private async parseTokenResponse(
		response: TokenResponse,
		realmId: string,
		nonce?: string,
		autoFetchUserProfile: boolean = true,
	): Promise<Token> {
		// Calculate the New Expiry Data
		const newRefreshTokenExpiryDate = new Date(Date.now() + response.x_refresh_token_expires_in * 1000);

		// Calculate the Expiry Date for the Access Token with a 5 minute buffer
		const accessTokenExpiryDate = new Date(Date.now() + (response.expires_in - 300) * 1000);

		// Parse the Token
		const parsedToken: Token = {
			tokenType: response.token_type,
			refreshToken: response.refresh_token,
			refreshTokenExpiryDate: newRefreshTokenExpiryDate,
			accessToken: response.access_token,
			accessTokenExpiryDate: accessTokenExpiryDate,
			realmId: realmId,
		};

		// Check if there is no Id token and return the parsed token
		if (!response.id_token) return parsedToken;

		/**
		 * Handle ID Token if present
		 * The flow after this is only to handle SSO related functionality
		 * If you want to use the ID token for other purposes, you can decode it using the decodeIdToken method
		 */

		// Decode the ID token
		const idToken = await this.decodeIdToken(response.id_token).catch(async (error: Error) => {
			// Log a warning
			console.warn('Failed to decode ID token:', error);

			// Do not throw an error, we want to continue with the token exchange even if the ID token is not valid
			return null;
		});

		// Check if the ID token is not valid and return the parsed token
		if (!idToken) return parsedToken;

		// Store the ID token
		parsedToken.idToken = idToken;

		// Validate the ID token
		const isValid = await this.validateIdToken(idToken, nonce).catch(async (error: Error) => {
			// Log a warning
			console.warn('Failed to validate ID token:', error);

			// Do not throw an error, we want to continue with the token exchange even if the ID token is not valid
			return false;
		});

		// Check if the ID token is not valid and return the parsed token
		if (!isValid) return parsedToken;

		// Store the ID token
		parsedToken.idToken = idToken;

		// Check if Auto Fetch User Profile is disable or SSO is not enabled and return the parsed token
		if (!autoFetchUserProfile || !this.isSsoEnabled()) return parsedToken;

		// Temporarily set the token to fetch user profile
		const tempToken = this.token;

		// Update the token
		this.token = parsedToken;

		// Get the user profile
		const userProfile = await this.getUserProfile().catch(async (error: Error) => {
			// Log a warning
			console.warn('Failed to fetch user profile:', error);

			// Do not throw an error, we want to continue with the token exchange even if the user profile is not available
			return null;
		});

		// Check if the user profile is not available and return the parsed token
		if (!userProfile) {
			// Restore the token
			this.token = tempToken;

			// Return the parsed token
			return parsedToken;
		}

		// Update the token
		parsedToken.userProfile = userProfile;

		// Restore the token
		this.token = tempToken;

		// Return the parsed token
		return parsedToken;
	}

	/**
	 * Restores the Token Types
	 * @param parsedToken The parsed token to restore
	 * @returns {Token} The restored token
	 */
	private restoreTokenTypes(parsedToken: Token): Token {
		// Create a copy of the parsed token
		const restored: Token = { ...parsedToken };

		// Convert date strings back to Date objects
		for (const [key, value] of Object.entries(restored)) {
			// Handle date fields
			if (typeof value === 'string' && this.isDateString(value)) restored[key as keyof Token] = new Date(value) as any;
		}

		// Return the restored token
		return restored;
	}

	/**
	 * Checks if a value is an ISO date string
	 * @param value The value to check
	 * @returns {boolean} True if the value is an ISO date string, false otherwise
	 */
	private isDateString(value: string): boolean {
		// Check if the value is a valid date string
		const date = new Date(value);

		// Return true if the value is a valid date string
		return !isNaN(date.getTime());
	}
}
