// Imports
import { Endpoints, AuthScopes, GrantType, type Token, type TokenResponse } from '../../types/types';
import { TinyEmitter } from 'tiny-emitter';

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
	 */

	constructor(
		private readonly clientId: string,
		private readonly clientSecret: string,
		private readonly redirectUri: string,
		private readonly scopes: Array<AuthScopes>,
		private token?: Token,
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
	 * @returns {string} The access token
	 */
	public async getToken(): Promise<Token> {
		// Check if the token is expired
		if (!this.token) throw new Error('User is not Authorized, please re-authenticate or set the token manually with the setToken method');

		// Check if the Token is Expired and Refresh it if it is
		if (this.token.accessTokenExpiryDate < new Date() && this.autoRefresh) await this.refresh();

		// Return the Token
		return this.token;
	}

	/**
	 * Set the Token
	 * @param token The token to set
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
	 * @returns {URL} The OAuth2 URL to get the auth code from the user
	 */
	public generateAuthUrl(state: string = crypto.randomUUID()): URL {
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
			throw new Error(`Failed to exchange auth code for a token: ${errorMessage}`);
		}

		// Parse the response
		const data = (await response.json().catch(() => {
			throw new Error('Failed to parse the token response');
		})) as TokenResponse;

		// Clear the Current Token
		this.token = undefined;

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
		if (!this.token) throw new Error('Token is not provided, please set the token manually with the setToken method');

		// Check if the refresh token is expired
		if (this.token.refreshTokenExpiryDate < new Date()) throw new Error('Refresh token is expired, please re-authenticate');

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
			// Get the error message
			const errorMessage = await response.text().catch(() => '');

			// Throw an error
			throw new Error(`Failed to refresh token: ${errorMessage}`);
		}

		// Parse the response
		const data = (await response.json().catch(() => {
			throw new Error('Failed to parse the token response');
		})) as TokenResponse;

		// Parse the token response
		const newToken = this.parseTokenResponse(data, this.token.realmId);

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
	 * @returns {Promise<boolean>} True if the token was revoked, false otherwise
	 */
	public async revoke(): Promise<boolean> {
		// Check if the token is provided
		if (!this.token) throw new Error('Token is not provided, please set the token manually with the setToken method');

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
		if (!response.ok) throw new Error(`Failed to revoke token: invalid_token`);

		// Emit the Revoke Event
		this.eventEmitter.emit('revoke', this.token);

		// Clear the Token
		this.token = undefined;

		// Return true
		return true;
	}

	/**
	 * Validates the Token
	 * @returns {Promise<boolean>} True if the token is valid, false otherwise
	 */
	public async validateToken(): Promise<boolean> {
		// Check if the token is provided
		if (!this.token) throw new Error('Token is not provided, please set the token manually with the setToken method');

		// Check if the token is expired
		const tokenExpired = this.token.accessTokenExpiryDate < new Date();

		// Check if the refresh token is expired
		const refreshTokenExpired = this.token.refreshTokenExpiryDate < new Date();

		// Check if the Token and Refresh Token are expired
		if (refreshTokenExpired) throw new Error('Token and Refresh Token are expired, please re-authenticate');

		// Refresh the token if it is expired
		if (tokenExpired && this.autoRefresh)
			await this.refresh().catch((error: Error) => {
				throw new Error(`Failed to refresh token: ${error.message}`);
			});

		// Check if the token is expired and auto refresh is disabled
		if (tokenExpired && !this.autoRefresh) throw new Error('Token is expired, please refresh the token');

		// Return true if the token is valid
		return true;
	}

	/**
	 * Serializes the Token
	 * @returns {string | undefined} The serialized token
	 */
	public async serializeToken(secretKey: string): Promise<string | undefined> {
		// Check if the secret key is weak
		if (secretKey.length < 32) throw new Error('Secret key must be at least 32 characters long');

		// Check if the token is not provided
		if (!this.token) throw new Error('Token is not provided, please set the token manually with the setToken method');

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
			.catch((error: Error) => {
				// Throw an Error
				throw new Error(`Token serialization failed: ${error.message}`);
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
	 */
	public async deserializeToken(serialized: string, secretKey: string): Promise<void> {
		// Check if the Serialized String is not Valid
		if (!serialized.includes(':')) throw new Error('Invalid serialized token');

		// Split the Serialized String
		const [headerBase64, combinedBase64] = serialized.split(':');

		// Check if the header or combined data is not valid
		if (!headerBase64 || !combinedBase64) throw new Error('Invalid serialized token');

		// Convert the Header to a String
		const headerString = Buffer.from(headerBase64, 'base64').toString('utf-8');

		// Check if the Header is not Valid
		if (headerString !== this.serializationHeader) throw new Error('Invalid serialized token');

		// Convert combined data from base64
		const combined = Buffer.from(combinedBase64, 'base64');

		// Extract IV (16 bytes), Salt (16 bytes), and ciphertext
		const iv = combined.subarray(0, 16);
		const salt = combined.subarray(16, 32);
		const ciphertext = combined.subarray(32);

		// Setup the Crypto Key
		const cryptoKey = await this.deriveKey(secretKey, salt, 'decrypt');

		// Decrypt the data
		const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, cryptoKey, ciphertext).catch((error: Error) => {
			// Throw an Error
			throw new Error(`Token deserialization failed: ${error.message}`);
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
	 * @returns {Token} The parsed token
	 */
	private parseTokenResponse(response: TokenResponse, realmId: string): Token {
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
