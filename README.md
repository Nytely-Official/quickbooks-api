# QuickBooks API SDK

[![CI](https://github.com/Nytely-Official/quickbooks-api/actions/workflows/ci.yml/badge.svg)](https://github.com/Nytely-Official/quickbooks-api/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/quickbooks-api.svg)](https://www.npmjs.com/package/quickbooks-api)

A modular TypeScript SDK for seamless integration with Intuit QuickBooks APIs. Provides robust authentication handling and a future-ready
foundation for accounting, payments, and commerce operations.

## Key Features

- **OAuth 2.0 Authentication:** Simplified and secure authentication flow.
- **Token Management:** Automatic refresh, rotation, and secure serialization/deserialization.
- **API Coverage:**
  - Invoices
  - Estimates
  - Customers
  - Payments
  - Accounts
  - CompanyInfo
  - Bills
  - Preferences
  - Credit Memos
- **Type-Safe API:** Full TypeScript declarations for all requests and responses.
- **Pagination:** Automatic handling of paginated responses.
- **Environment Support:** Supports both Production and Sandbox environments.
- **Bun & Node.js Compatible:** Optimized builds for both runtimes.

---

## Installation

```bash
bun add quickbooks-api
# or
npm install quickbooks-api
```

---

## Getting Started

### 1. Initialize the Auth Provider

```typescript
import { AuthProvider, Environment, AuthScopes } from 'quickbooks-api';

const authProvider = new AuthProvider('YOUR_CLIENT_ID', 'YOUR_CLIENT_SECRET', 'YOUR_REDIRECT_URI', [
  AuthScopes.Accounting,
  AuthScopes.OpenId,
]);
```

### 2. Generate the Authorization URL

```typescript
const authUrl = authProvider.generateAuthUrl();
// Redirect user to authUrl.toString()
```

### 3. Handle the Callback

```typescript
import type { UserAuthResponse } from 'quickbooks-api';

async function handleCallback(query: UserAuthResponse) {
  try {
    const token = await authProvider.exchangeCode(query.code, query.realmId);
    console.log('Access Token:', token.accessToken);
  } catch (error) {
    console.error('Authentication failed:', error);
  }
}
```

### 4. Initialize the API Client

```typescript
import { ApiClient, Environment } from 'quickbooks-api';

const apiClient = new ApiClient(authProvider, Environment.Sandbox);
```

### 5. Make API Calls (with Invoice Options)

```typescript
import { ApiClient, Environment, InvoiceStatus, InvoiceOptions } from 'quickbooks-api';

// Example: Get all invoices (with search options and pagination)
let hasNextPage = true;
let page = 1;
const paginatedInvoices = [];

while (hasNextPage) {
  // Setup the Invoice
  const invoiceOptions: InvoiceOptions = {
    searchOptions: {
      maxResults: 10,
      page: page,
      orderBy: { field: 'Id', direction: 'DESC' },
    },
  };
  // Get the Invoices
  const searchResponse = await apiClient.invoices.getAllInvoices(invoiceOptions);

  // Add the Invoices to the List
  paginatedInvoices.push(...searchResponse.results);

  // Check if there is a next page
  hasNextPage = searchResponse.hasNextPage;

  // Increment the Page
  page++;
}

// Get the list of Paid Invoice
const paidInvoices = await apiClient.invoices.getAllInvoices({ status: InvoiceStatus.Paid });
```

---

## Token Management

The `AuthProvider` handles token refresh, revocation, and secure storage. Use the following methods:

- `refresh()`: Refreshes the access token.
- `revoke()`: Revokes the access token.
- `serializeToken(secretKey: string)`: Securely encrypts and serializes the token for storage.
- `deserializeToken(serialized: string, secretKey: string)`: Decrypts and restores the serialized token.

**Important:** Store tokens securely using `serializeToken` and `deserializeToken`.

---

## API Reference

The `ApiClient` provides access to the following APIs:

- `apiClient.invoices`: Invoices API
- `apiClient.estimates`: Estimates API
- `apiClient.customers`: Customers API
- `apiClient.payments`: Payments API
- `apiClient.accounts`: Accounts API
- `apiClient.preferences`: Preferences API
- `apiClient.creditMemos`: Credit Memos API
- `apiClient.companyInfo`: Company Info API
- `apiClient.bills`: Bills API

Refer to the individual API documentation for available methods and options.

---

## Support

Join our [Discord server](https://discord.gg/zcdUNMRcQR) for community support and discussions.

---

## Security Considerations

- **Secure Token Storage:** Never store tokens in client-side storage. Use secure server-side storage and the provided `serializeToken` and
  `deserializeToken` methods.
- **Strong Secret Key:** Use a strong, randomly generated secret key (minimum 32 characters) for token serialization. Rotate the key
  regularly.
- **HTTPS:** Always use HTTPS in production environments.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## Legal Disclaimer

This project is not affiliated with, endorsed by, or in any way officially connected with Intuit Inc., QuickBooks®, or any related
subsidiaries. All trademarks and registered trademarks are the property of their respective owners.

QuickBooks® is a registered trademark of Intuit Inc., registered in the United States and other countries.
