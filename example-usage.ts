// Imports
import express, { type Request, type Response } from 'express';
import { AuthProvider, Environment, ApiClient, AuthScopes, EstimateStatus, Invoice } from './src/app';

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
app.get('/test-token', (_req: Request, res: Response) => {
	// Initialize AuthProvider
	const testAuthProvider = new AuthProvider(
		process.env.QB_CLIENT_ID!,
		process.env.QB_CLIENT_SECRET!,
		'http://localhost:3000/generate-test-token',
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

	// Generate the Auth URL
	const authUrl = testAuthProvider.generateAuthUrl();

	// Redirect to the Auth URL
	res.redirect(authUrl.toString());
});

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

		// Log the progress
		console.log('Exchanged code for tokens');

		// Refresh the Token
		await authProvider.refresh();

		// Log the progress
		console.log('Refreshed token');

		// Initialize API Client with the authenticated provider
		const apiClient = new ApiClient(authProvider, Environment.Sandbox);

		// Example: Get invoices using the authenticated client
		const invoices = await apiClient.invoices.getAllInvoices();

		// Log the progress
		console.log('Got invoices');

		// Get the Invoices Due Today
		const dueInvoices = await apiClient.invoices.getInvoicesByDueDate(new Date());

		// Log the progress
		console.log('Got due invoices');

		// Setup the Custom Query Builder
		const customQueryBuilder = (await apiClient.invoices.getQueryBuilder()).setSearchOptions({
			orderBy: { field: 'DueDate', direction: 'DESC' },
			maxResults: 10,
		});

		// Log the progress
		console.log('Got custom query builder');

		// Advanced query using raw query builder
		const customQuery = await apiClient.invoices.rawInvoiceQuery(customQueryBuilder);

		// Log the progress
		console.log('Got custom query');

		// Get the First Invoice
		const firstInvoice = invoices.results[0];

		// Check if the First Invoice is Invalid and Return
		if (!firstInvoice || !firstInvoice.Id) {
			res.status(400).send('No invoices found');
			return;
		}

		// Example: Get invoice by ID
		const foundInvoice = await apiClient.invoices.getInvoiceById(firstInvoice.Id);

		// Log the progress
		console.log('Got found invoice');

		// Example: Get invoices for a date range
		const invoicesForDateRange = await apiClient.invoices.getInvoicesForDateRange(new Date('2024-01-01'), new Date('2024-01-31'));

		// Log the progress
		console.log('Got invoices for date range');

		// Example: Get updated invoices
		const updatedInvoices = await apiClient.invoices.getUpdatedInvoices(new Date('2024-01-01'));

		// Log the progress
		console.log('Got updated invoices');

		// Setup the List of Invoices
		const paginatedInvoices: Array<Invoice> = [];

		// Setup the has Next Page Boolean
		let hasNextPage = true;

		// Setup the Page Number
		let page = 1;

		// Example: Get all invoices (with search options and pagination)
		while (hasNextPage) {
			// Get the Invoices
			const searchResponse = await apiClient.invoices.getAllInvoices({
				maxResults: 10,
				page: page,
				orderBy: { field: 'Id', direction: 'DESC' },
			});

			// Add the Invoices to the List
			paginatedInvoices.push(...searchResponse.results);

			// Check if there is a next page
			hasNextPage = searchResponse.hasNextPage;

			// Log the progress
			console.log(`Got paginated invoices [${page}]`);

			// Increment the Page Number
			page++;
		}

		// Example: Get all estimates
		const estimates = await apiClient.estimates.getAllEstimates();

		// Log the progress
		console.log('Got estimates');

		// Example: Get all estimates for a date range
		const estimatesForDateRange = await apiClient.estimates.getEstimatesForDateRange(new Date('2025-01-01'), new Date('2025-01-31'));

		// Log the progress
		console.log('Got estimates for date range');

		// Example: Get updated estimates
		const updatedEstimates = await apiClient.estimates.getUpdatedEstimates(new Date('2025-01-09'));

		// Log the progress
		console.log('Got updated estimates');

		// Example: Get estimate by ID
		const foundEstimate = await apiClient.estimates.getEstimateById(estimates.results[0].Id);

		// Log the progress
		console.log('Got found estimate');

		// Example: Serialize the Token
		const serialized = await authProvider.serializeToken(process.env.SECRET_KEY!);

		// Log the progress
		console.log('Serialized token');

		// Example: Deserialize the Token
		await authProvider.deserializeToken(serialized!, process.env.SECRET_KEY!);

		// Log the progress
		console.log('Deserialized token');

		// Example: Get the Token
		const deserialized = await authProvider.getToken();

		// Log the progress
		console.log('Got token');

		// Example: Revoke the Token
		const revoked = await authProvider.revoke();

		// Log the progress
		console.log('Revoked token');

		// Return the Data
		res.json({
			invoices,
			firstInvoice,
			foundInvoice,
			invoicesForDateRange,
			updatedInvoices,
			paginatedInvoices,
			dueInvoices,
			customQuery,
			estimates,
			estimatesForDateRange,
			updatedEstimates,
			foundEstimate,
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

// Callback endpoint for OAuth response
app.get('/generate-test-token', async (req: Request, res: Response): Promise<void> => {
	// Initialize AuthProvider
	const testAuthProvider = new AuthProvider(
		process.env.QB_CLIENT_ID!,
		process.env.QB_CLIENT_SECRET!,
		'http://localhost:3000/generate-test-token',
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

	try {
		// Get the Code and Realm ID from the Request
		const { code, realmId } = req.query;

		// Check if the Code and Realm ID are present
		if (!code || !realmId) {
			res.status(400).send('Missing code or realmId in callback');
			return;
		}

		// Exchange authorization code for tokens
		await testAuthProvider.exchangeCode(code as string, realmId as string);

		// Refresh the Token
		await testAuthProvider.refresh();

		// Example: Serialize the Token
		const serialized = await testAuthProvider.serializeToken(process.env.SECRET_KEY!);

		// Return the Data
		res.send(serialized);
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
