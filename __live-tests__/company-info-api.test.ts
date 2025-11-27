// Imports
import { AuthProvider, Environment, ApiClient, AuthScopes, type SearchOptions, CompanyInfo, QuickbooksError } from '../src/app';
import { describe, expect, test } from 'bun:test';

// Describe the Company Info API
describe('Live API: Company Info', async () => {
	// Initialize the Auth Provider
	const authProvider = new AuthProvider(process.env.QB_CLIENT_ID!, process.env.QB_CLIENT_SECRET!, process.env.REDIRECT_URI!, [
		AuthScopes.Accounting,
	]);

	// Deserialize the Token
	await authProvider.deserializeToken(process.env.SERIALIZED_TOKEN!, process.env.SECRET_KEY!);

	// Setup the API Client
	const apiClient = new ApiClient(authProvider, Environment.Sandbox);

	// Test retrieving company info
	test('should retrieve company info', async () => {
		// Get company info
		const companyInfo = await apiClient.companyInfo.getCompanyInfo();

		// Test the Company Info
		expect(companyInfo).toBeDefined();
		expect(companyInfo.Id).toBeDefined();
		expect(companyInfo.CompanyName).toBeDefined();
		expect(companyInfo.LegalName).toBeDefined();
	});

	// Test retrieving company info with search options
	test('should retrieve company info with search options', async () => {
		// Setup the Search Options
		const searchOptions: SearchOptions<CompanyInfo> = { maxResults: 1 };

		// Get company info with search options
		const companyInfo = await apiClient.companyInfo.getCompanyInfo(searchOptions);

		// Test the Company Info
		expect(companyInfo).toBeDefined();
		expect(companyInfo.Id).toBeDefined();
		expect(companyInfo.CompanyName).toBeDefined();
		expect(companyInfo.LegalName).toBeDefined();
	});

	// Test retrieving company info with raw query
	test('should retrieve company info with raw query', async () => {
		// Get company info with raw query
		const companyInfo = await apiClient.companyInfo.rawCompanyInfoQuery('select * from companyinfo');

		// Test the Company Info
		expect(companyInfo).toBeDefined();
		expect(companyInfo.Id).toBeDefined();
		expect(companyInfo.CompanyName).toBeDefined();
		expect(companyInfo.LegalName).toBeDefined();
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
		const companyInfo = await apiClient.companyInfo.getCompanyInfo();

		// Test the Company Info has expected fields
		expect(companyInfo).toHaveProperty('Id');
		expect(companyInfo).toHaveProperty('CompanyName');
		expect(companyInfo).toHaveProperty('LegalName');
		expect(companyInfo).toHaveProperty('CompanyAddr');
		expect(companyInfo).toHaveProperty('Country');
		expect(companyInfo).toHaveProperty('Email');
		expect(companyInfo).toHaveProperty('WebAddr');
		expect(companyInfo).toHaveProperty('SupportedLanguages');
		expect(companyInfo).toHaveProperty('FiscalYearStartMonth');
	});

	// Test company info address structure
	test('should have valid address structure', async () => {
		// Get company info
		const companyInfo = await apiClient.companyInfo.getCompanyInfo();

		// Test the Company Address
		expect(companyInfo.CompanyAddr).toBeDefined();
		expect(companyInfo.CompanyAddr).toHaveProperty('Id');
		expect(companyInfo.CompanyAddr).toHaveProperty('Line1');
		expect(companyInfo.CompanyAddr).toHaveProperty('City');
		expect(companyInfo.CompanyAddr).toHaveProperty('PostalCode');
	});

	// Test company info metadata
	test('should have valid metadata', async () => {
		// Get company info
		const companyInfo = await apiClient.companyInfo.getCompanyInfo();

		// Test the Metadata
		expect(companyInfo.MetaData).toBeDefined();
		expect(companyInfo.MetaData).toHaveProperty('CreateTime');
		expect(companyInfo.MetaData).toHaveProperty('LastUpdatedTime');
	});

	// Test company info name values
	test('should have name values', async () => {
		// Get company info
		const companyInfo = await apiClient.companyInfo.getCompanyInfo();

		// Test the Name Values
		expect(companyInfo.NameValue).toBeDefined();
		expect(companyInfo.NameValue).toBeInstanceOf(Array);
		expect(companyInfo.NameValue.length).toBeGreaterThan(0);

		// Test the first Name Value
		const firstNameValue = companyInfo.NameValue[0];
		expect(firstNameValue).toHaveProperty('Name');
		expect(firstNameValue).toHaveProperty('Value');
	});
});
