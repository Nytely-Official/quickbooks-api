# QuickBooks API SDK

[![CI](https://github.com/Nytely-Official/quickbooks-api/actions/workflows/ci.yml/badge.svg)](https://github.com/Nytely-Official/quickbooks-api/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/quickbooks-api.svg)](https://www.npmjs.com/package/quickbooks-api)

A modular TypeScript SDK for seamless integration with Intuit QuickBooks APIs. Provides robust authentication handling and future-ready foundation for accounting, payments, and commerce operations.

## Current Features

✅ OAuth 2.0 Authentication Flow  
✅ Token Management (Refresh/Rotation)  
✅ Secure Token Serialization/Deserialization  
✅ Token Validation  
✅ Environment-Specific Endpoints (Sandbox/Production)  
✅ Invoice API Search Operations  
✅ Type-Safe API Surface

## Future Roadmap

▶️ Accounting API Integration  
▶️ Tax API Support  
▶️ Webhook Management  
▶️ Batch Processing Utilities

## Technical Highlights

⚡ Bun runtime optimized builds  
📜 Full TypeScript declarations

Designed for developers building:

- QuickBooks integrations
- Financial automation tools
- ERP system connectors
- Commerce platforms

## Packages

| Package          | Version                                                                                                        | Description                       |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `quickbooks-api` | [![npm version](https://badge.fury.io/js/%40quickbooks-api.svg)](https://www.npmjs.com/package/quickbooks-api) | QuickBooks API SDK for TypeScript |

## Installation

```bash
bun add quickbooks-api
```

## Usage

### Initialization

```typescript
import { AuthProvider, Environment, AuthScopes } from "quickbooks-api";

// Initialize with your application credentials
const authProvider = new AuthProvider(
	"YOUR_CLIENT_ID",
	"YOUR_CLIENT_SECRET",
	"YOUR_REDIRECT_URI",
	[AuthScopes.Accounting, AuthScopes.OpenId] // Array of required scopes
);
```

### Authorization Flow

```typescript
// Generate authorization URL
const authUrl = authProvider.generateAuthUrl();

// Redirect user to authUrl.toString()
```

### Token Exchange (Callback Handler)

```typescript
import type { UserAuthResponse } from "@quickbooks-api/auth";

// After user redirects back to your app
async function handleCallback(query: UserAuthResponse) {
	try {
		const token = await authProvider.exchangeCode(
			query.code, // Authorization code from query params
			query.realmId // Realm ID from query params
		);

		// Store token securely
		console.log("Access Token:", token.accessToken);
		console.log("Expires at:", token.accessTokenExpiryDate);
	} catch (error) {
		console.error("Authentication failed:", error);
	}
}
```

### Token Refresh

```typescript
async function refreshAccessToken() {
	try {
		const newToken = await authProvider.refresh();
		return newToken;
	} catch (error) {
		console.error("Token refresh failed:", error);
		// Handle re-authentication
	}
}
```

### Token Revoke

```typescript
async function revokeToken() {
	try {
		const revoked = await authProvider.revoke();
		return revoked;
	} catch (error) {
		console.error("Token revoke failed:", error);
	}
}
```

### Available Auth Methods

- `generateAuthUrl()` - Generate the authorization URL the user needs to visit
- `exchangeCode(code: string, realmId: string)` - Exchange the authorization code for a token
- `validateToken()` - Verify token validity and auto-refresh if needed
- `serializeToken(secretKey: string)` - Securely encrypt and serialize token for storage
- `deserializeToken(serialized: string, secretKey: string)` - Decrypt and restore serialized token
- `setToken(token: Token)` - Set the token manually (if expired, it will be refreshed)
- `getToken()` - Get the current token (if expired, it will be refreshed)
- `refresh()` - Refreshes the stored access token
- `revoke()` - Revokes the stored access token

### Secure Token Serialization Example

```typescript
// Serialize token for secure storage
const serialized = await authProvider.serializeToken(process.env.SECRET_KEY!);

// Later, restore the token from serialized format
await authProvider.deserializeToken(serialized, process.env.SECRET_KEY!);
const restoredToken = await authProvider.getToken();

// Validate token integrity
const isValid = await authProvider.validateToken();
```

### Invoice API Example

```typescript
import { ApiClient, Environment } from "quickbooks-api";

// Initialize API client after authentication
const apiClient = new ApiClient(authProvider, Environment.Sandbox);

// Get all invoices
const allInvoices = await apiClient.invoices.getAllInvoices();

// Get invoices within date range
const januaryInvoices = await apiClient.invoices.getInvoicesForDateRange(new Date("2024-01-01"), new Date("2024-01-31"));

// Get recently updated invoices
const updatedInvoices = await apiClient.invoices.getUpdatedInvoices(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // Last 7 days

// Get specific invoice by ID
const invoice = await apiClient.invoices.getInvoiceById("129");
```

### Available Invoice Methods

- `getAllInvoices()` - Retrieve all accessible invoices
- `getInvoiceById(id: string)` - Fetch specific invoice by ID
- `getInvoicesForDateRange(start: Date, end: Date)` - Filter invoices by date
- `getUpdatedInvoices(since: Date)` - Get invoices modified after specified date

### Key Interfaces

```typescript
// Token structure
interface Token {
	tokenType: TokenType.Bearer;
	refreshToken: string;
	refreshTokenExpiryDate: Date;
	accessToken: string;
	accessTokenExpiryDate: Date;
	realmId: string;
}

// Authorization response
interface UserAuthResponse {
	code: string;
	realmId: string;
	state: string;
}
```

### Available Enums

```typescript
// Authentication scopes
AuthScopes.Accounting; // com.intuit.quickbooks.accounting
AuthScopes.Payment; // com.intuit.quickbooks.payment
AuthScopes.OpenId; // openid
// ... other scopes

// Environments
Environment.Sandbox; // Test environment
Environment.Production; // Live environment

// Grant types (internal use)
GrantType.AuthorizationCode; // authorization_code
GrantType.RefreshToken; // refresh_token
```

> **Important Considerations**
>
> - Store tokens securely (never in client-side storage)
> - Serialize tokens before storing them with strong secret keys
> - Always handle token expiration dates
> - Use HTTPS in production environments

## Legal Disclaimer

This project is not affiliated with, endorsed by, or in any way officially connected with Intuit Inc., QuickBooks®, or any related subsidiaries. All trademarks and registered trademarks are the property of their respective owners.

QuickBooks® is a registered trademark of Intuit Inc., registered in the United States and other countries.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)
