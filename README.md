# QuickBooks API SDK

[![CI](https://github.com/Nytely-Official/quickbooks-api/actions/workflows/ci.yml/badge.svg)](https://github.com/Nytely-Official/quickbooks-api/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/quickbooks-api.svg)](https://www.npmjs.com/package/quickbooks-api)

A modular TypeScript SDK for seamless integration with Intuit QuickBooks APIs. Provides robust authentication handling and future-ready
foundation for accounting, payments, and commerce operations.

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
import { AuthProvider, Environment, AuthScopes } from 'quickbooks-api';

// Initialize with your application credentials
const authProvider = new AuthProvider(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URI',
  [AuthScopes.Accounting, AuthScopes.OpenId], // Array of required scopes
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
import type { UserAuthResponse } from '@quickbooks-api/auth';

// After user redirects back to your app
async function handleCallback(query: UserAuthResponse) {
  try {
    const token = await authProvider.exchangeCode(
      query.code, // Authorization code from query params
      query.realmId, // Realm ID from query params
    );

    // Store token securely
    console.log('Access Token:', token.accessToken);
    console.log('Expires at:', token.accessTokenExpiryDate);
  } catch (error) {
    console.error('Authentication failed:', error);
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
    console.error('Token refresh failed:', error);
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
    console.error('Token revoke failed:', error);
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
// Validate secret key
if (!process.env.SECRET_KEY || process.env.SECRET_KEY.length < 32) throw new Error('SECRET_KEY must be at least 32 characters long');

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
import { ApiClient, Environment } from 'quickbooks-api';

// Initialize API client after authentication
const apiClient = new ApiClient(authProvider, Environment.Sandbox);

// Get all invoices
const allInvoices = await apiClient.invoices.getAllInvoices();

// Get specific invoice by ID
const invoice = await apiClient.invoices.getInvoiceById('129');

// Get invoices within date range
const januaryInvoices = await apiClient.invoices.getInvoicesForDateRange(new Date('2024-01-01'), new Date('2024-01-31'));

// Get all invoices with pagination and sorting
const paginatedInvoices = {
  page1: await apiClient.invoices.getAllInvoices({
    maxResults: 10,
    startPosition: 0,
    orderBy: { field: 'Id', direction: 'DESC' },
  }),
  page2: await apiClient.invoices.getAllInvoices({
    maxResults: 10,
    startPosition: 10,
    orderBy: { field: 'Id', direction: 'DESC' },
  }),
};

// Get specific invoice with additional options
const invoice = await apiClient.invoices.getInvoiceById('129', {
  minorVersion: '45',
});

// Advanced query with multiple options
const recentInvoices = await apiClient.invoices.getUpdatedInvoices(new Date('2024-01-01'), {
  maxResults: 50,
  orderBy: { field: 'DueDate', direction: 'ASC' },
});
```

### Available Invoice Methods

All methods now support optional `InvoiceSearchOptions` parameter:

- `getAllInvoices(options?: InvoiceSearchOptions)` - Retrieve invoices with pagination/sorting
- `getInvoiceById(id: string, options?: InvoiceSearchOptions)` - Fetch by ID with options
- `getInvoicesForDateRange(start: Date, end: Date, options?: InvoiceSearchOptions)`
- `getUpdatedInvoices(since: Date, options?: InvoiceSearchOptions)`
- `getInvoicesByDueDate(date: Date, options?: InvoiceSearchOptions)`

### Key Interfaces

```typescript
// Search options structure
interface InvoiceSearchOptions {
  startPosition?: number; // Pagination offset (0-based)
  maxResults?: number; // Page size (1-1000)
  minorVersion?: string; // API minor version
  orderBy?: {
    // Sorting configuration
    field: keyof Invoice; // Field to sort by
    direction: 'ASC' | 'DESC';
  };
}

// Token structure (existing)
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

### Query Builder Updates

The new search options system integrates with the existing QueryBuilder:

```typescript
// Create custom queries with search options
const queryBuilder = await apiClient.invoices
  .getQueryBuilder()
  .setSearchOptions({
    maxResults: 100,
    orderBy: { field: 'TotalAmt', direction: 'DESC' },
  })
  .whereDueDate(new Date());

const customResults = await apiClient.invoices.rawInvoiceQuery(queryBuilder);
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
> - Store tokens securely:
>   - Never store in client-side storage (localStorage, sessionStorage)
>   - Use secure server-side storage (e.g., encrypted databases)
>   - Implement proper key rotation policies
>   - Use the built-in `serializeToken` and `deserializeToken` methods to serialize and deserialize tokens for storage
> - Secret key requirements:
>   - Minimum length: 32 characters
>   - High entropy (use cryptographically secure random generation)
>   - Regular rotation schedule
> - Always handle token expiration dates
> - Use HTTPS in production environments

## Legal Disclaimer

This project is not affiliated with, endorsed by, or in any way officially connected with Intuit Inc., QuickBooks®, or any related
subsidiaries. All trademarks and registered trademarks are the property of their respective owners.

QuickBooks® is a registered trademark of Intuit Inc., registered in the United States and other countries.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)
