import { APIUrls } from "../types";

export enum Endpoints {
	// Auth Related Endpoints
	UserAuth = `${APIUrls.UserAuth}/connect/oauth2`,
	TokenBearer = `${APIUrls.OAuth}/tokens/bearer`,

	// API Related Endpoints
	SandboxCompanyApi = `${APIUrls.SandboxApiBaseUrl}/company`,
	ProductionCompanyApi = `${APIUrls.ProductionApiBaseUrl}/company`,
}
