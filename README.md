# QuickBooks API SDK

![Version](https://img.shields.io/npm/v/quickbooks-api?style=for-the-badge&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fquickbooks-api)
![Downloads](https://img.shields.io/npm/d18m/quickbooks-api?style=for-the-badge&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fquickbooks-api)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Nytely-Official/quickbooks-api/ci.yml?style=for-the-badge&link=https%3A%2F%2Fgithub.com%2FNytely-Official%2Fquickbooks-api)

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

## Error Handling

The SDK uses a custom `QuickbooksError` class that extends the standard `Error` class and provides structured access to Intuit API error
details.

### QuickbooksError Structure

```typescript
import { QuickbooksError } from 'quickbooks-api';

try {
  const invoice = await apiClient.invoices.getInvoiceById('invalid-id');
} catch (error) {
  if (error instanceof QuickbooksError) {
    // Access the error message
    console.error('Error:', error.message);

    // Access structured error details
    console.error('Status Code:', error.details.statusCode);
    console.error('Transaction ID:', error.details.intuitTID);

    // Access Intuit-specific error information
    error.details.intuitError.forEach((err) => {
      console.error('Error Code:', err.code);
      console.error('Error Message:', err.message);
      console.error('Error Detail:', err.detail);
    });
  }
}
```

### Error Details

The `QuickbooksError` includes the following properties:

- `message: string` - Human-readable error message
- `details.statusCode: number` - HTTP status code from the API response
- `details.intuitError: Array<{message: string, detail: string, code: string}>` - Array of Intuit API error objects
- `details.intuitTID: string` - Intuit transaction ID for support tracking

### Example: Handling API Errors

```typescript
import { ApiClient, QuickbooksError } from 'quickbooks-api';

async function fetchAccount(accountId: string) {
  try {
    const account = await apiClient.accounts.getAccountById(accountId);
    return account;
  } catch (error) {
    if (error instanceof QuickbooksError) {
      // Handle specific error cases
      if (error.details.statusCode === 404) {
        console.error('Account not found');
      } else if (error.details.statusCode === 401) {
        console.error('Authentication failed - token may be expired');
      } else {
        // Log full error details for debugging
        console.error('QuickBooks API Error:', {
          message: error.message,
          statusCode: error.details.statusCode,
          intuitErrors: error.details.intuitError,
          transactionId: error.details.intuitTID,
        });
      }
    } else {
      // Handle unexpected errors
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}
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
