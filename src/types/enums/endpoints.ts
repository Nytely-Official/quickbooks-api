// Imports
import { APIUrls } from '../types';

/**
 * The Endpoints for the API
 */
export enum Endpoints {
	// Auth Related Endpoints

	UserAuth = `${APIUrls.UserAuth}/connect/oauth2`,
	TokenBearer = `${APIUrls.OAuth2}/tokens/bearer`,
	TokenRevoke = `${APIUrls.OAuthDeveloper}/tokens/revoke`,

	// API Related Endpoints
	SandboxCompanyApi = `${APIUrls.SandboxApiBaseUrl}/company`,
	ProductionCompanyApi = `${APIUrls.ProductionApiBaseUrl}/company`,
}
