#!/usr/bin/env bun
import { AuthProvider, Environment, ApiClient, AuthScopes } from '../src/app';

// Setup the Required Env Var List
const requiredEnvVars = ['QB_CLIENT_ID', 'QB_CLIENT_SECRET', 'SERIALIZED_TOKEN', 'SECRET_KEY'];

// Validate environment variables
for (const env of requiredEnvVars) {
	// Check if the environment variable Exists and continue if it does
	if (process.env[env]) continue;

	// Log the Error
	console.error(`Missing required environment variable: ${env}`);

	// Exit the Process (with a failure)
	process.exit(1);
}

// Run the Test
(async () => {
	try {
		// Initialize auth provider with dummy redirect URI since we're using pre-serialized token
		const authProvider = new AuthProvider(process.env.QB_CLIENT_ID!, process.env.QB_CLIENT_SECRET!, 'http://localhost:3000/auth', [
			AuthScopes.Accounting,
			AuthScopes.OpenId,
		]);

		// Deserialize existing token
		await authProvider.deserializeToken(process.env.SERIALIZED_TOKEN!, process.env.SECRET_KEY!);

		// Initialize API client
		const apiClient = new ApiClient(authProvider, Environment.Sandbox);

		// Test sequence
		console.log('TAP version 13');

		// Setup the Test Count
		console.log('1..4');

		// Test 1: Basic invoice retrieval
		try {
			// Get All Invoices
			const invoices = await apiClient.invoices.getAllInvoices();

			// Log the Result
			console.log(`ok 1 - Retrieved ${invoices.length} invoices`);
		} catch (error) {
			// Log the Error
			console.log(`not ok 1 - Failed to retrieve invoices: ${error.message}`);
		}

		// Test 2: Single invoice by ID
		try {
			// Get All Invoices
			const invoices = await apiClient.invoices.getAllInvoices();

			// Get the First Invoice
			const testInvoice = await apiClient.invoices.getInvoiceById(invoices[0].Id);

			// Log the Result
			console.log(`ok 2 - Retrieved invoice ID ${testInvoice.Id}`);
		} catch (error) {
			// Log the Error
			console.log(`not ok 2 - Failed to retrieve single invoice: ${error.message}`);
		}

		// Test 3: Token refresh validation
		try {
			// Refresh the Token
			const newToken = await authProvider.refresh();

			// Log the Result
			console.log(`ok 3 - Token refreshed successfully (expires ${newToken.accessTokenExpiryDate.toISOString()})`);
		} catch (error) {
			// Log the Error
			console.log(`not ok 3 - Token refresh failed: ${error.message}`);
		}

		// Test 4: Serialization roundtrip
		try {
			// Reserialize the Token
			const reserialized = await authProvider.serializeToken(process.env.SECRET_KEY!);

			// Log the Result
			console.log('ok 4 - Token reserialized successfully');
		} catch (error) {
			// Log the Error
			console.log(`not ok 4 - Reserialization failed: ${error.message}`);
		}
	} catch (error) {
		// Log the Error
		console.error(`Bail out! Critical failure: ${error.message}`);

		// Exit the Process (with a failure)
		process.exit(1);
	}
})();
