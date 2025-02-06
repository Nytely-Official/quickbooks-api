import { AuthProvider } from "../src/auth-provider";
import { AuthScopes, Environment, TokenType } from "../src/types/types";
import { describe, expect, it, beforeEach, mock, afterEach } from "bun:test";
import { type Token } from "../src/types/interfaces/token";
import { mockAuthResponseData, mockFetch, mockTokenData } from "./helpers";

// Mock environment variables
const TEST_CONFIG = {
	clientId: "test_client_id",
	clientSecret: "test_client_secret",
	redirectUri: "http://localhost:3000/auth-code",
	scopes: [AuthScopes.Accounting],
	environment: Environment.Sandbox,
};

describe("AuthProvider", () => {
	// Setup the Auth Provider
	let authProvider: AuthProvider;
	let globalFetch: typeof fetch;

	// Setup the Auth Provider
	beforeEach(() => {
		// Store original fetch
		globalFetch = global.fetch;

		// Create the Auth Provider
		authProvider = new AuthProvider(
			TEST_CONFIG.clientId,
			TEST_CONFIG.clientSecret,
			TEST_CONFIG.redirectUri,
			TEST_CONFIG.scopes,
			TEST_CONFIG.environment
		);
	});

	afterEach(() => {
		// Restore original fetch
		global.fetch = globalFetch;
	});

	// Validate Auth URL
	describe("generateAuthUrl", () => {
		// Validate Auth URL Success
		it("should generate valid OAuth URL", () => {
			// Generate the Auth URL
			const url = authProvider.generateAuthUrl();

			// Assert the URL
			expect(url.toString()).toStartWith("https://appcenter.intuit.com/connect/oauth2");
			expect(url.searchParams.get("client_id")).toBe(TEST_CONFIG.clientId);
			expect(url.searchParams.get("scope")).toBe(TEST_CONFIG.scopes.join(" "));
			expect(url.searchParams.get("redirect_uri")).toBe(TEST_CONFIG.redirectUri);
			expect(url.searchParams.get("response_type")).toBe("code");
			expect(url.searchParams.get("state")).toBeTruthy();
		});
	});

	// Validate Exchange
	describe("exchangeCode", () => {
		// Validate Exchange Success
		it("should exchange auth code for token", async () => {
			// Setup the Mock
			global.fetch = mockFetch(JSON.stringify(mockAuthResponseData.old));

			// Exchange the Code
			const token = await authProvider.exchangeCode("test_code", "test_realm");

			// Assert the Token
			expect(token.accessToken).toBe(mockAuthResponseData.old.access_token);
		});

		// Validate Exchange Failure
		it("should throw error on failed exchange", async () => {
			// Setup the Mock
			global.fetch = mockFetch(JSON.stringify({ error: "invalid_client" }), 400);

			// Exchange the Code
			expect(authProvider.exchangeCode("invalid_code", "test_realm")).rejects.toThrow(
				'Failed to exchange auth code for a token: {"error":"invalid_client"}'
			);
		});
	});

	// Validate Refresh
	describe("refresh", () => {
		// Setup the Old Token
		const oldToken: Token = {
			...mockTokenData,
			refreshToken: "old_refresh_token",
			accessToken: "old_access_token",
		};

		// Validate Refresh Success
		it("should refresh token successfully", async () => {
			// Setup the Mock
			global.fetch = mockFetch(JSON.stringify(mockAuthResponseData.new));

			// Refresh the Token
			const newToken = await authProvider.refresh(oldToken);

			// Assert the New Token
			expect(newToken.accessToken).toBe(mockTokenData.accessToken);
		});

		// Validate Refresh Failure
		it("should throw error on failed token refresh", async () => {
			// Setup the Mock
			global.fetch = mockFetch(JSON.stringify({ error: "invalid_client" }), 400);

			// Refresh a non-expired token
			expect(authProvider.refresh(oldToken)).rejects.toThrow("Failed to refresh token");
		});

		// Validate Refresh Failure
		it("should throw error on expired refresh token", async () => {
			// Setup the Mock
			global.fetch = mockFetch(JSON.stringify({ error: "refresh_token_expired" }), 400);

			// Expire the Refresh Token
			const expiredToken = { ...oldToken, refreshTokenExpiryDate: new Date(Date.now() - 1000) };

			// Refresh the Expired Token
			expect(authProvider.refresh(expiredToken)).rejects.toThrow("Refresh token is expired, please re-authenticate");
		});
	});
});
