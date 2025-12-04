// Imports
import { APIUrls } from './api-urls';

/**
 * The Endpoints for the API
 */
export enum Endpoints {
	// Auth Related Endpoints
	UserAuth = `${APIUrls.UserAuth}/connect/oauth2`,
	TokenBearer = `${APIUrls.OAuth2}/tokens/bearer`,
	TokenRevoke = `${APIUrls.OAuthDeveloper}/tokens/revoke`,

	// OpenID Connect Endpoints
	SandboxUserInfo = 'https://sandbox-accounts.platform.intuit.com/v1/openid_connect/userinfo',
	ProductionUserInfo = 'https://accounts.platform.intuit.com/v1/openid_connect/userinfo',

	// API Related Endpoints
	SandboxCompanyApi = `${APIUrls.SandboxApiBaseUrl}/company`,
	ProductionCompanyApi = `${APIUrls.ProductionApiBaseUrl}/company`,
}
