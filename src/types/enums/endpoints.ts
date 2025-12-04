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
	SandboxUserInfo = `${APIUrls.SandboxPlatform}/openid_connect/userinfo`,
	ProductionUserInfo = `${APIUrls.ProductionPlatform}/openid_connect/userinfo`,

	// API Related Endpoints
	SandboxCompanyApi = `${APIUrls.SandboxApiBaseUrl}/company`,
	ProductionCompanyApi = `${APIUrls.ProductionApiBaseUrl}/company`,
}
