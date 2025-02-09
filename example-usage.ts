// Imports
import express, { type Request, type Response } from 'express';
import { AuthProvider, Environment, ApiClient, AuthScopes } from './src/app';

// Initialize the Express App
const app = express();
const port = process.env.PORT || 3000;

// Initialize AuthProvider
const authProvider = new AuthProvider(
	process.env.QB_CLIENT_ID!,
	process.env.QB_CLIENT_SECRET!,
	process.env.REDIRECT_URI!,
	[
		AuthScopes.Payment,
		AuthScopes.Accounting,
		AuthScopes.OpenId,
		AuthScopes.Profile,
		AuthScopes.Email,
		AuthScopes.Phone,
		AuthScopes.Address,
	], // Scopes
);

// Auth endpoint to initiate OAuth flow
app.get('/auth', (_req: Request, res: Response) => {
	// Generate the Auth URL
	const authUrl = authProvider.generateAuthUrl();

	// Redirect to the Auth URL
	res.redirect(authUrl.toString());
});

// Callback endpoint for OAuth response
app.get('/auth-code', async (req: Request, res: Response) => {
	try {
		// Get the Code and Realm ID from the Request
		const { code, realmId } = req.query;

		// Check if the Code and Realm ID are present
		if (!code || !realmId) {
			res.status(400).send('Missing code or realmId in callback');
			return;
		}

		// Exchange authorization code for tokens
		await authProvider.exchangeCode(code as string, realmId as string);

		// Refresh the Token
		await authProvider.refresh();

		// Initialize API Client with the authenticated provider
		const apiClient = new ApiClient(authProvider, Environment.Sandbox);

		// Example: Get invoices using the authenticated client
		const invoices = await apiClient.invoices.getAllInvoices();

		// Get the Invoices Due Today
		const dueInvoices = await apiClient.invoices.getInvoicesByDueDate(new Date());

		// Setup the Custom Query Builder
		const customQueryBuilder = (await apiClient.invoices.getQueryBuilder()).orderBy('DueDate', 'DESC').limit(10);

		// Advanced query using raw query builder
		const customQuery = await apiClient.invoices.rawInvoiceQuery(customQueryBuilder);

		// Get the First Invoice
		const firstInvoice = invoices[0];

		// Check if the First Invoice is Invalid and Return
		if (!firstInvoice || !firstInvoice.Id) {
			res.status(400).send('No invoices found');
			return;
		}

		// Example: Get invoice by ID
		const foundInvoice = await apiClient.invoices.getInvoiceById(firstInvoice.Id);

		// Example: Get invoices for a date range
		const invoicesForDateRange = await apiClient.invoices.getInvoicesForDateRange(new Date('2024-01-01'), new Date('2024-01-31'));

		// Example: Get updated invoices
		const updatedInvoices = await apiClient.invoices.getUpdatedInvoices(new Date('2024-01-01'));

		// Example: Serialize the Token
		const serialized = await authProvider.serializeToken(process.env.SECRET_KEY!);

		// Example: Deserialize the Token
		await authProvider.deserializeToken(serialized!, process.env.SECRET_KEY!);

		// Example: Get the Token
		const deserialized = await authProvider.getToken();

		// Example: Revoke the Token
		const revoked = await authProvider.revoke();

		// Return the Data
		res.json({
			invoices,
			firstInvoice,
			foundInvoice,
			invoicesForDateRange,
			updatedInvoices,
			dueInvoices,
			customQuery,
			revoked,
			serialized,
			deserialized,
		});
	} catch (error) {
		// Log the Error
		console.error('Auth callback error:', error);

		// Send the Error
		res.status(500).send('Authentication failed');
	}
});

// Start the Server
app.listen(port, () => {
	// Log the Server is Running
	console.log(`Server running on port ${port}`);
});
