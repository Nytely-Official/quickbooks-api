// Imports
import { AuthProvider, AuthScopes } from '../src/app';
import { describe, expect, test } from 'bun:test';

// Describe the Auth Provider
describe('Live Auth Provider', async () => {
	// Initialize the Auth Provider
	const authProvider = new AuthProvider(process.env.QB_CLIENT_ID!, process.env.QB_CLIENT_SECRET!, process.env.REDIRECT_URI!, [
		AuthScopes.Accounting,
	]);

	// Set the Token
	await authProvider.deserializeToken(process.env.SERIALIZED_TOKEN!, process.env.SECRET_KEY!);

	// Test token validation
	test('should validate token', async () => {
		// Validate the Token
		const validated = await authProvider.validateToken();

		// Test the Token
		expect(validated).toBe(true);
	});

	// Test token retrieval
	test('should retrieve token', async () => {
		// Get the Token
		const token = await authProvider.getToken();

		// Test the Token
		expect(token).toBeDefined();
	});

	// Test token refresh
	test('should refresh token', async () => {
		// Get the original Token
		const originalToken = await authProvider.getToken();

		// Refresh the Token
		await authProvider.refresh();

		// Get the new Token
		const newToken = await authProvider.getToken();

		// Test the Token
		expect(newToken).toBeDefined();
		expect(newToken.accessToken).not.toBe(originalToken.accessToken);
	});

	// Test token serialization
	test('should serialize token', async () => {
		// Serialize the Token
		const serialized = await authProvider.serializeToken(process.env.SECRET_KEY!);

		// Test the Token
		expect(serialized).toBeDefined();
	});

	// Test token deserialization
	test('should deserialize token', async () => {
		// Get the original Token
		const originalToken = await authProvider.getToken();

		// Serialize the Token
		const serialized = await authProvider.serializeToken(process.env.SECRET_KEY!);

		// Deserialize the Token
		await authProvider.deserializeToken(serialized!, process.env.SECRET_KEY!);

		// Get the Deserialized Token
		const deserialized = await authProvider.getToken();

		// Test the Token
		expect(deserialized).toBeDefined();
		expect(deserialized.accessToken).toBe(originalToken.accessToken);
	});

	// Test token deserialization errors with invalid token
	test('should fail to deserialize token with invalid token', async () => {
		// Test the Token
		expect(authProvider.deserializeToken('invalid-token', process.env.SECRET_KEY!)).rejects.toThrow();
	});

	// Test token deserialization errors with invalid secret key
	test('should fail to deserialize token with invalid secret key', async () => {
		// Test the Token
		expect(authProvider.deserializeToken(process.env.SERIALIZED_TOKEN!, 'invalid-secret-key!')).rejects.toThrow();
	});

	// Test token refresh errors with expired refresh token
	test('should fail to refresh token with expired refresh token', async () => {
		// get the token
		const token = await authProvider.getToken();

		// set the token to expired
		token.refreshTokenExpiryDate = new Date(Date.now() - 1000);

		// Refresh the Token
		expect(authProvider.refresh()).rejects.toThrow();
	});
});
