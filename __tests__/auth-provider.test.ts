import { AuthProvider } from '../src/packages/auth/auth-provider';
import { AuthScopes, Environment } from '../src/types/types';
import { describe, expect, it, beforeEach, afterEach } from 'bun:test';
import { type Token } from '../src/types/interfaces/token';
import { mockAuthResponseData, mockFetch, mockTokenData } from './helpers';

// Mock environment variables
const TEST_CONFIG = {
	clientId: 'test_client_id',
	clientSecret: 'test_client_secret',
	redirectUri: 'http://localhost:3000/auth-code',
	scopes: [AuthScopes.Accounting],
	environment: Environment.Sandbox,
	secretKey: 'test-secret-key-12345678901234567890123456789012',
};

describe('AuthProvider', () => {
	// Setup the Auth Provider
	let authProvider: AuthProvider;
	let globalFetch: typeof fetch;

	// Setup the Auth Provider
	beforeEach(() => {
		// Store original fetch
		globalFetch = global.fetch;

		// Create the Auth Provider
		authProvider = new AuthProvider(TEST_CONFIG.clientId, TEST_CONFIG.clientSecret, TEST_CONFIG.redirectUri, TEST_CONFIG.scopes);
	});

	afterEach(() => {
		// Restore original fetch
		global.fetch = globalFetch;
	});

	// Validate Auth URL
	describe('generateAuthUrl', () => {
		// Validate Auth URL Success
		it('should generate valid OAuth URL', () => {
			// Generate the Auth URL
			const url = authProvider.generateAuthUrl();

			// Assert the URL
			expect(url.toString()).toStartWith('https://appcenter.intuit.com/connect/oauth2');
			expect(url.searchParams.get('client_id')).toBe(TEST_CONFIG.clientId);
			expect(url.searchParams.get('scope')).toBe(TEST_CONFIG.scopes.join(' '));
			expect(url.searchParams.get('redirect_uri')).toBe(TEST_CONFIG.redirectUri);
			expect(url.searchParams.get('response_type')).toBe('code');
			expect(url.searchParams.get('state')).toBeTruthy();
		});
	});

	// Validate Exchange
	describe('exchangeCode', () => {
		// Validate Exchange Success
		it('should exchange auth code for token', async () => {
			// Setup the Mock
			global.fetch = mockFetch(JSON.stringify(mockAuthResponseData.old));

			// Exchange the Code
			const token = await authProvider.exchangeCode('test_code', 'test_realm');

			// Assert the Token
			expect(token.accessToken).toBe(mockAuthResponseData.old.access_token);
		});

		// Validate Exchange Failure
		it('should throw error on failed exchange', async () => {
			// Setup the Mock
			global.fetch = mockFetch(JSON.stringify({ error: 'invalid_client' }), 400);

			// Exchange the Code
			expect(authProvider.exchangeCode('invalid_code', 'test_realm')).rejects.toThrow(
				'Failed to exchange auth code for a token: {"error":"invalid_client"}',
			);
		});
	});

	// Validate Get Token
	describe('getToken', () => {
		// Setup the Old Token
		const oldToken: Token = {
			...mockTokenData,
			refreshToken: 'old_refresh_token',
			accessToken: 'old_access_token',
		};

		// Validate Get Token Success
		it('should get token successfully', async () => {
			// Setup the Mock
			global.fetch = mockFetch(JSON.stringify(mockAuthResponseData.new));

			// Set the Token
			authProvider.setToken(oldToken);

			// Get the Token
			const token = await authProvider.getToken();

			// Assert the New Token
			expect(token.accessToken).toBe(oldToken.accessToken);
		});

		// Validate Get Token Failure
		it('should throw error on failed token get', async () => {
			// Get the Token
			expect(authProvider.getToken()).rejects.toThrow(
				'User is not Authorized, please re-authenticate or set the token manually with the setToken method',
			);
		});

		// Validate auto refresh token
		it('should auto refresh token', async () => {
			// Setup the Mock
			global.fetch = mockFetch(JSON.stringify(mockAuthResponseData.new));

			// Setup the Expired Token
			const expiredToken = {
				...mockTokenData,
				accessToken: 'old_access_token',
				refreshToken: 'old_refresh_token',
				accessTokenExpiryDate: new Date(Date.now() - 1000),
			};

			// Set the Token
			authProvider.setToken(expiredToken);

			// Get the Token
			const token = await authProvider.getToken();

			// Assert the New Token
			expect(token.accessToken).toBe(mockAuthResponseData.new.access_token);
		});

		// Validate not auto refresh token
		it('should not auto refresh token', async () => {
			// Setup the Mock
			global.fetch = mockFetch(JSON.stringify(mockAuthResponseData.new));

			// Setup the Expired Token
			const expiredToken = {
				...mockTokenData,
				accessToken: 'old_access_token',
				refreshToken: 'old_refresh_token',
				accessTokenExpiryDate: new Date(Date.now() - 1000),
			};

			// Disable auto refresh
			authProvider.disableAutoRefresh();

			// Set the Token
			authProvider.setToken(expiredToken);

			// Get the Token
			const token = await authProvider.getToken();

			// Assert the New Token
			expect(token.accessToken).toBe(expiredToken.accessToken);
		});
	});

	// Validate Refresh
	describe('refresh', () => {
		// Setup the Old Token
		const oldToken: Token = {
			...mockTokenData,
			refreshToken: 'old_refresh_token',
			accessToken: 'old_access_token',
		};

		// Validate Refresh Success
		it('should refresh token successfully', async () => {
			// Setup the Mock
			global.fetch = mockFetch(JSON.stringify(mockAuthResponseData.new));

			// Set the Token
			authProvider.setToken(oldToken);

			// Refresh the Token
			const newToken = await authProvider.refresh();

			// Assert the New Token
			expect(newToken.accessToken).toBe(mockTokenData.accessToken);
		});

		// Validate Refresh Failure
		it('should throw error on failed token refresh', async () => {
			// Setup the Mock
			global.fetch = mockFetch(JSON.stringify({ error: 'invalid_client' }), 400);

			// Set the Token
			authProvider.setToken(oldToken);

			// Refresh the Token
			expect(authProvider.refresh()).rejects.toThrow('Failed to refresh token');
		});

		// Validate Refresh Failure
		it('should throw error on expired refresh token', async () => {
			// Setup the Mock
			global.fetch = mockFetch(JSON.stringify({ error: 'refresh_token_expired' }), 400);

			// Expire the Refresh Token
			const expiredToken = { ...oldToken, refreshTokenExpiryDate: new Date(Date.now() - 1000) };

			// Set the Token
			authProvider.setToken(expiredToken);

			// Refresh the Expired Token
			expect(authProvider.refresh()).rejects.toThrow('Refresh token is expired, please re-authenticate');
		});
	});

	// Validate Revoke
	describe('revoke', () => {
		// Validate Revoke Success
		it('should revoke token successfully', async () => {
			// Setup the Mock
			global.fetch = mockFetch('', 200);

			// Set the Token
			authProvider.setToken(mockTokenData);

			// Revoke the Token
			const result = await authProvider.revoke();

			// Assert the Result
			expect(result).toBe(true);
		});

		// Validate Revoke Failure
		it('should throw error on failed token revocation', async () => {
			// Setup the Mock
			global.fetch = mockFetch('', 400);

			// Set the Token
			authProvider.setToken(mockTokenData);

			// Revoke the Token
			expect(authProvider.revoke()).rejects.toThrow('Failed to revoke token: invalid_token');
		});
	});

	// Validate Token
	describe('validateToken', () => {
		// Validate Token Success
		it('should validate a valid token', async () => {
			// Set valid token
			authProvider.setToken(mockTokenData);

			// Mock successful validation
			global.fetch = mockFetch('', 200);

			// Validate the Token
			const isValid = await authProvider.validateToken();

			// Assert the Result
			expect(isValid).toBe(true);
		});

		// Validate Token Failure
		it('should throw error when no token exists', async () => {
			// Assert the Result
			expect(authProvider.validateToken()).rejects.toThrow('Token is not provided, please set the token manually with the setToken method');
		});

		// Validate Token Failure
		it('should refresh expired token during validation', async () => {
			// Mock successful refresh
			global.fetch = mockFetch(JSON.stringify(mockAuthResponseData.new), 200);

			// Create expired token
			const expiredToken = {
				...mockTokenData,
				accessToken: 'old_access_token',
				accessTokenExpiryDate: new Date(),
			};

			// Set expired token
			await authProvider.setToken(expiredToken);

			// Wait for the token to expire
			await new Promise((resolve) => setTimeout(resolve, 1100));

			// Validate token
			const isValid = await authProvider.validateToken();

			// Assert token was refreshed
			expect(isValid).toBe(true);

			// Get the new token
			const newToken = await authProvider.getToken();

			// Assert the new token
			expect(newToken.accessToken).not.toBe(expiredToken.accessToken);
		});

		// Validate Token Failure
		it('should reject weak secret keys', async () => {
			// Set valid token
			authProvider.setToken(mockTokenData);

			// Try to serialize with weak key
			expect(authProvider.serializeToken('weak')).rejects.toThrow('Secret key must be at least 32 characters long');
		});
	});

	// Validate Serialize
	describe('serializeToken', () => {
		// Validate Serialize Success
		it('should serialize a valid token', async () => {
			// Setup the Mock
			global.fetch = mockFetch('', 200);

			// Set the Token
			authProvider.setToken(mockTokenData);

			// Serialize the Token
			const serialized = await authProvider.serializeToken(TEST_CONFIG.secretKey);

			// Get the Serialization Header as base64
			const base64Header = Buffer.from(authProvider.serializationHeader).toString('base64');

			// Assert the Result
			expect(serialized).toStartWith(base64Header);
			expect(serialized).toInclude(':');
		});

		// Validate Serialize Failure
		it('should throw error when no token exists', async () => {
			// Serialize the Token
			expect(authProvider.serializeToken(TEST_CONFIG.secretKey)).rejects.toThrow(
				'Token is not provided, please set the token manually with the setToken method',
			);
		});
	});

	// Validate Deserialize
	describe('deserializeToken', () => {
		// Validate Deserialize Success
		it('should deserialize a valid token', async () => {
			// Setup the Mock
			global.fetch = mockFetch('', 200);

			// Set the Token
			authProvider.setToken(mockTokenData);

			// Serialize the Token
			const serialized = await authProvider.serializeToken(TEST_CONFIG.secretKey);

			// Clear existing token
			authProvider.setToken(null);

			// Deserialize the token
			await authProvider.deserializeToken(serialized!, TEST_CONFIG.secretKey);

			// Get the Token
			const token = await authProvider.getToken();

			// Assert the Token
			expect(token).toMatchObject(mockTokenData);
		});

		// Validate Deserialize Failure
		it('should throw error for invalid serialized format', async () => {
			// Deserialize the Token
			expect(authProvider.deserializeToken('invalid_format', TEST_CONFIG.secretKey)).rejects.toThrow('Invalid serialized token');
		});

		// Validate Deserialize Failure
		it('should throw error for tampered data', async () => {
			// Setup the Mock
			global.fetch = mockFetch('', 200);

			// Set the Token
			authProvider.setToken(mockTokenData);

			// Serialize the Token
			const serialized = await authProvider.serializeToken(TEST_CONFIG.secretKey);

			// Setup the Tampered Data
			const tamperedData = Buffer.from('tampered_data').toString('base64');

			// Tamper the Data
			const tampered = serialized.replace(/:.*/g, `${tamperedData}:`);

			// Deserialize the Token
			expect(authProvider.deserializeToken(tampered, TEST_CONFIG.secretKey)).rejects.toThrow('Invalid serialized token');
		});

		// Validate Deserialize Failure
		it('should throw error for tampered header', async () => {
			// Setup the Mock
			global.fetch = mockFetch('', 200);

			// Set the Token
			authProvider.setToken(mockTokenData);

			// Serialize the Token
			const serialized = await authProvider.serializeToken(TEST_CONFIG.secretKey);

			// Expect serialized to be a string
			expect(serialized).toBeTypeOf('string');

			// Setup the Tampered Header
			const tamperedHeader = Buffer.from('tampered_header').toString('base64');

			// Tamper the Header
			const tampered = serialized.replace(/.*:/g, `${tamperedHeader}:`);

			// Deserialize the Token
			expect(authProvider.deserializeToken(tampered, TEST_CONFIG.secretKey)).rejects.toThrow('Invalid serialized token');
		});
	});
});
