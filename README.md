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
✅ Estimates API Support ✅ Pagination Support

## Technical Highlights

⚡ Bun runtime optimized builds  
📜 Full TypeScript declarations

Designed for developers building:

- QuickBooks integrations
- Financial automation tools
- ERP system connectors
- Commerce platforms

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

### Secure Token Serialization

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

### API Client Setup

```typescript
import { ApiClient, Environment } from 'quickbooks-api';

// Initialize API client after authentication
const apiClient = new ApiClient(authProvider, Environment.Sandbox);
```

### Invoice API Examples

```typescript
// Get all invoices
const allInvoices = await apiClient.invoices.getAllInvoices();

// Log the First Invoice ID
console.log(allInvoices.results[0].Id);

// Get specific invoice by ID
const invoice = await apiClient.invoices.getInvoiceById('129');

// Log the Found Invoice ID
console.log(invoice.Id);

// Get invoices within date range
const januaryInvoices = await apiClient.invoices.getInvoicesForDateRange(new Date('2024-01-01'), new Date('2024-01-31'));

// Setup Pagination
const paginatedInvoices: Array<Invoice> = [];
let hasNextPage = true;
let currentPage = 1;

// Get all invoices with pagination and sorting (Automatic pagination handling)
while (hasNextPage) {
  // Get the next Page
  const nextPage = await apiClient.invoices.getAllInvoices({
    maxResults: 10,
    page: currentPage + 1,
    orderBy: { field: 'Id', direction: 'DESC' },
  });

  // Add the Invoices to the List
  paginatedInvoices.push(...nextPage.results);

  // Check if there is a next page
  hasNextPage = nextPage.hasNextPage;

  // Increment the Page Number
  currentPage++;
}

// Get specific invoice with additional options
const invoice = await apiClient.invoices.getInvoiceById('129', {
  minorVersion: '75',
});

// Advanced query with multiple options
const recentInvoices = await apiClient.invoices.getUpdatedInvoices(new Date('2024-01-01'), {
  maxResults: 50,
  orderBy: { field: 'DueDate', direction: 'ASC' },
});
```

### Estimates API Examples

```typescript
// Estimate Operations
const estimates = await apiClient.estimates.getAllEstimates();
const estimate = await apiClient.estimates.getEstimateById('EST456');
const recentEstimates = await apiClient.estimates.getUpdatedEstimates(new Date('2024-01-01'));
```

## API Reference

### Authentication Methods

- `generateAuthUrl()` - Generate the authorization URL the user needs to visit
- `exchangeCode(code: string, realmId: string)` - Exchange the authorization code for a token
- `validateToken()` - Verify token validity and auto-refresh if needed
- `serializeToken(secretKey: string)` - Securely encrypt and serialize token for storage
- `deserializeToken(serialized: string, secretKey: string)` - Decrypt and restore serialized token
- `setToken(token: Token)` - Set the token manually (if expired, it will be refreshed)
- `getToken()` - Get the current token (if expired, it will be refreshed)
- `refresh()` - Refreshes the stored access token
- `revoke()` - Revokes the stored access token

### Invoices API

| Method                      | Description              |
| --------------------------- | ------------------------ |
| `getAllInvoices()`          | Get all invoices         |
| `getInvoiceById()`          | Get single invoice       |
| `getInvoicesForDateRange()` | Filter by date range     |
| `getUpdatedInvoices()`      | Get updated invoices     |
| `getInvoicesByDueDate()`    | Get invoices by due date |
| `rawInvoiceQuery()`         | Get raw invoice query    |

### Estimates API

| Method                       | Description              |
| ---------------------------- | ------------------------ |
| `getAllEstimates()`          | Get all estimates        |
| `getEstimateById()`          | Get single estimate      |
| `getEstimatesForDateRange()` | Filter estimates by date |
| `getUpdatedEstimates()`      | Get updated estimates    |
| `rawEstimateQuery()`         | Get raw estimate query   |

## Advanced Usage

### Query Building

```typescript
// Estimate query
const estimateQuery = await apiClient.estimates.getQueryBuilder().whereExpirationDate(new Date('2024-12-31')).whereTxnDate(new Date());
```

### Search Options

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

### Token Structure

```typescript
// Search options structure
interface SearchOptions<T> {
  page?: number; // Pagination offset (1-based)
  maxResults?: number; // Page size (1-200)
  minorVersion?: string; // API minor version (default: 75) *All versions below 75 are deprecated and will be removed on July 31st, 2025*
  orderBy?: {
    // Sorting configuration
    field: keyof T; // Field to sort by
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

// Search Response
interface SearchResponse<T> {
  results: T[];
  hasNextPage: boolean;
}
```

## Security Considerations

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

## Roadmap

▶️ Accounting API Integration  
▶️ Tax API Support  
▶️ Webhook Management  
▶️ Batch Processing Utilities

## Legal Disclaimer

This project is not affiliated with, endorsed by, or in any way officially connected with Intuit Inc., QuickBooks®, or any related
subsidiaries. All trademarks and registered trademarks are the property of their respective owners.

QuickBooks® is a registered trademark of Intuit Inc., registered in the United States and other countries.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)
