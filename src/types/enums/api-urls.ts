/**
 * The Avaialble Endpoints for the Auth Provider
 */
export enum APIUrls {
	// Auth Related URL's
	UserAuth = 'https://appcenter.intuit.com',
	OAuth2 = 'https://oauth.platform.intuit.com/oauth2/v1',
	OAuthDeveloper = 'https://developer.api.intuit.com/v2/oauth2',

	// OpenID Connect URL's
	SandboxPlatform = 'https://sandbox-accounts.platform.intuit.com/v1',
	ProductionPlatform = 'https://accounts.platform.intuit.com/v1',

	// API Related URL's
	SandboxApiBaseUrl = 'https://sandbox-quickbooks.api.intuit.com/v3',
	ProductionApiBaseUrl = 'https://quickbooks.api.intuit.com/v3',

	// Issuers
	Issuer = 'https://oauth.platform.intuit.com/op/v1',
}
