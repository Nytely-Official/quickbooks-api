// Imports
import { AuthProvider, Environment, ApiClient, AuthScopes, type SearchOptions, CompanyInfo, QuickbooksError } from '../src/app';
import { describe, expect, test } from 'bun:test';

// Describe the Company Info API
describe('Live API: Company Info', async () => {
	// Initialize the Auth Provider
	const authProvider = new AuthProvider(
		process.env.QB_CLIENT_ID!,
		process.env.QB_CLIENT_SECRET!,
		process.env.REDIRECT_URI!,
		[AuthScopes.Accounting],
		null,
		Environment.Sandbox,
	);

	// Deserialize the Token
	await authProvider.deserializeToken(process.env.SERIALIZED_TOKEN!, process.env.SECRET_KEY!);

	// Setup the API Client
	const apiClient = new ApiClient(authProvider, Environment.Sandbox);

	// Test retrieving company info
	test('should retrieve company info', async () => {
		// Get company info
		const companyInfoResponse = await apiClient.companyInfo.getCompanyInfo();

		// Test the Company Info Response Structure
		expect(companyInfoResponse).toBeDefined();
		expect(companyInfoResponse).toHaveProperty('companyInfo');
		expect(companyInfoResponse).toHaveProperty('intuitTID');
		expect(typeof companyInfoResponse.intuitTID).toBe('string');

		// Test the Company Info
		expect(companyInfoResponse.companyInfo.Id).toBeDefined();
		expect(companyInfoResponse.companyInfo.CompanyName).toBeDefined();
		expect(companyInfoResponse.companyInfo.LegalName).toBeDefined();
	});

	// Test retrieving company info with search options
	test('should retrieve company info with search options', async () => {
		// Setup the Search Options
		const searchOptions: SearchOptions<CompanyInfo> = { maxResults: 1 };

		// Get company info with search options
		const companyInfoResponse = await apiClient.companyInfo.getCompanyInfo(searchOptions);

		// Test the Company Info Response Structure
		expect(companyInfoResponse).toBeDefined();
		expect(companyInfoResponse).toHaveProperty('companyInfo');
		expect(companyInfoResponse).toHaveProperty('intuitTID');
		expect(typeof companyInfoResponse.intuitTID).toBe('string');

		// Test the Company Info
		expect(companyInfoResponse.companyInfo.Id).toBeDefined();
		expect(companyInfoResponse.companyInfo.CompanyName).toBeDefined();
		expect(companyInfoResponse.companyInfo.LegalName).toBeDefined();
	});

	// Test retrieving company info with raw query
	test('should retrieve company info with raw query', async () => {
		// Get company info with raw query
		const companyInfoResponse = await apiClient.companyInfo.rawCompanyInfoQuery('select * from companyinfo');

		// Test the Company Info Response Structure
		expect(companyInfoResponse).toBeDefined();
		expect(companyInfoResponse).toHaveProperty('companyInfo');
		expect(companyInfoResponse).toHaveProperty('intuitTID');
		expect(typeof companyInfoResponse.intuitTID).toBe('string');

		// Test the Company Info
		expect(companyInfoResponse.companyInfo.Id).toBeDefined();
		expect(companyInfoResponse.companyInfo.CompanyName).toBeDefined();
		expect(companyInfoResponse.companyInfo.LegalName).toBeDefined();
	});

	// Test error handling for invalid raw query
	test('should throw QuickbooksError for invalid raw query', async () => {
		try {
			await apiClient.companyInfo.rawCompanyInfoQuery('select * from invalid');
			expect(false).toBe(true); // Should not reach here
		} catch (error) {
			// Assert the Error is a QuickbooksError
			expect(error).toBeInstanceOf(QuickbooksError);
			expect(error).toBeInstanceOf(Error);

			// Assert the Error has the correct structure
			expect(error.message).toBeDefined();
			expect(error.details).toBeDefined();
			expect(error.details.statusCode).toBeDefined();
			expect(typeof error.details.statusCode).toBe('number');
			expect(error.details.intuitError).toBeDefined();
			expect(Array.isArray(error.details.intuitError)).toBe(true);
			expect(error.details.intuitTID).toBeDefined();
			expect(typeof error.details.intuitTID).toBe('string');
		}
	});

	// Test company info contains expected fields
	test('should contain expected fields', async () => {
		// Get company info
		const companyInfoResponse = await apiClient.companyInfo.getCompanyInfo();

		// Test the Company Info Response Structure
		expect(companyInfoResponse).toHaveProperty('companyInfo');
		expect(companyInfoResponse).toHaveProperty('intuitTID');
		expect(typeof companyInfoResponse.intuitTID).toBe('string');

		// Test the Company Info has expected fields
		expect(companyInfoResponse.companyInfo).toHaveProperty('Id');
		expect(companyInfoResponse.companyInfo).toHaveProperty('CompanyName');
		expect(companyInfoResponse.companyInfo).toHaveProperty('LegalName');
		expect(companyInfoResponse.companyInfo).toHaveProperty('CompanyAddr');
		expect(companyInfoResponse.companyInfo).toHaveProperty('Country');
		expect(companyInfoResponse.companyInfo).toHaveProperty('Email');
		expect(companyInfoResponse.companyInfo).toHaveProperty('WebAddr');
		expect(companyInfoResponse.companyInfo).toHaveProperty('SupportedLanguages');
		expect(companyInfoResponse.companyInfo).toHaveProperty('FiscalYearStartMonth');
	});

	// Test company info address structure
	test('should have valid address structure', async () => {
		// Get company info
		const companyInfoResponse = await apiClient.companyInfo.getCompanyInfo();

		// Test the Company Info Response Structure
		expect(companyInfoResponse).toHaveProperty('companyInfo');
		expect(companyInfoResponse).toHaveProperty('intuitTID');
		expect(typeof companyInfoResponse.intuitTID).toBe('string');

		// Test the Company Address
		expect(companyInfoResponse.companyInfo.CompanyAddr).toBeDefined();
		expect(companyInfoResponse.companyInfo.CompanyAddr).toHaveProperty('Id');
		expect(companyInfoResponse.companyInfo.CompanyAddr).toHaveProperty('Line1');
		expect(companyInfoResponse.companyInfo.CompanyAddr).toHaveProperty('City');
		expect(companyInfoResponse.companyInfo.CompanyAddr).toHaveProperty('PostalCode');
	});

	// Test company info metadata
	test('should have valid metadata', async () => {
		// Get company info
		const companyInfoResponse = await apiClient.companyInfo.getCompanyInfo();

		// Test the Company Info Response Structure
		expect(companyInfoResponse).toHaveProperty('companyInfo');
		expect(companyInfoResponse).toHaveProperty('intuitTID');
		expect(typeof companyInfoResponse.intuitTID).toBe('string');

		// Test the Metadata
		expect(companyInfoResponse.companyInfo.MetaData).toBeDefined();
		expect(companyInfoResponse.companyInfo.MetaData).toHaveProperty('CreateTime');
		expect(companyInfoResponse.companyInfo.MetaData).toHaveProperty('LastUpdatedTime');
	});

	// Test company info name values
	test('should have name values', async () => {
		// Get company info
		const companyInfoResponse = await apiClient.companyInfo.getCompanyInfo();

		// Test the Company Info Response Structure
		expect(companyInfoResponse).toHaveProperty('companyInfo');
		expect(companyInfoResponse).toHaveProperty('intuitTID');
		expect(typeof companyInfoResponse.intuitTID).toBe('string');

		// Test the Name Values
		expect(companyInfoResponse.companyInfo.NameValue).toBeDefined();
		expect(companyInfoResponse.companyInfo.NameValue).toBeInstanceOf(Array);
		expect(companyInfoResponse.companyInfo.NameValue.length).toBeGreaterThan(0);

		// Test the first Name Value
		const firstNameValue = companyInfoResponse.companyInfo.NameValue[0];
		expect(firstNameValue).toHaveProperty('Name');
		expect(firstNameValue).toHaveProperty('Value');
	});
});
