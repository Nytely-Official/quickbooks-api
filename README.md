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
- **Entity Management:** Full CRUD operations with class-based entity methods:
  - Create, update, and save entities
  - Send entities via email (Invoice, Estimate, CreditMemo)
  - Download entities as PDF (Invoice, Estimate, CreditMemo, Bill, Payment)
  - Void transactions (Invoice, CreditMemo, Payment)
  - Soft delete entities (Account, Customer)
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

  // Log the Intuit Transaction ID for tracking
  console.log('Transaction ID:', searchResponse.intuitTID);

  // Increment the Page
  page++;
}

// Get the list of Paid Invoice
const paidInvoices = await apiClient.invoices.getAllInvoices({ status: InvoiceStatus.Paid });
console.log('Transaction ID:', paidInvoices.intuitTID);
```

---

## Error Handling

The SDK uses a custom `QuickbooksError` class that extends the standard `Error` class and provides structured access to Intuit API error
details.

### QuickbooksError Structure

```typescript
import { QuickbooksError } from 'quickbooks-api';

try {
  const { invoice, intuitTID } = await apiClient.invoices.getInvoiceById('invalid-id');
  if (invoice) {
    console.log('Invoice ID:', invoice.Id);
    console.log('Transaction ID:', intuitTID);
  }
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
    const { account, intuitTID } = await apiClient.accounts.getAccountById(accountId);
    if (account) {
      console.log('Account retrieved:', account.Name);
      console.log('Transaction ID:', intuitTID);
      return account;
    }
    return null;
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

## API Response Structure

All API methods now include the Intuit Transaction ID (`intuitTID`) in their responses for better request tracking and support debugging.

### Search/List Methods

Methods that return multiple results (like `getAllInvoices()`, `getAllAccounts()`, etc.) return a `SearchResponse` object:

```typescript
interface SearchResponse<T> {
  results: Array<T>;
  hasNextPage?: boolean;
  intuitTID: string; // Intuit Transaction ID
}
```

**Example:**

```typescript
const response = await apiClient.invoices.getAllInvoices();
console.log('Invoices:', response.results);
console.log('Has next page:', response.hasNextPage);
console.log('Transaction ID:', response.intuitTID);
```

### Single Item Methods

Methods that return a single item (like `getInvoiceById()`, `getAccountById()`, etc.) return an object with the item and `intuitTID`:

```typescript
// For most entities
const { invoice, intuitTID } = await apiClient.invoices.getInvoiceById('123');
if (invoice) {
  console.log('Invoice ID:', invoice.Id);
  console.log('Transaction ID:', intuitTID);
}

// For Company Info
const { companyInfo, intuitTID } = await apiClient.companyInfo.getCompanyInfo();
console.log('Company Name:', companyInfo.CompanyName);
console.log('Transaction ID:', intuitTID);
```

**Affected Methods:**

- `getAccountById()`
- `getBillById()`
- `getCreditMemoById()`
- `getCustomerById()`
- `getEstimateById()`
- `getInvoiceById()`
- `getPaymentById()`
- `getCompanyInfo()`
- `rawCompanyInfoQuery()`

### Using Transaction IDs

The `intuitTID` is useful for:

- **Support Requests**: Provide the transaction ID when contacting Intuit support
- **Debugging**: Track specific API requests in logs
- **Audit Trails**: Maintain records of API interactions

---

## Entity Management

All entity classes provide instance methods for managing QuickBooks entities. After retrieving an entity using `get*ById()` methods, you can
perform various operations on the entity instance.

### Saving Entities

The `save()` method handles both creating new entities and updating existing ones:

```typescript
// Get an invoice
const { invoice, intuitTID } = await apiClient.invoices.getInvoiceById('123');
if (invoice) {
  // Modify the invoice
  invoice.PrivateNote = 'Updated note';

  // Save changes (update)
  await invoice.save();

  // Or create a new invoice
  const newInvoice = new Invoice(apiClient, {
    Line: [...],
    CustomerRef: { value: '456' },
    // ... other required fields
  });
  await newInvoice.save(); // Creates new invoice
}
```

### Sending Entities via Email

Send invoices, estimates, and credit memos directly via email:

```typescript
// Send an invoice via email
const { invoice } = await apiClient.invoices.getInvoiceById('123');
if (invoice) {
  await invoice.send();
  console.log('Invoice sent successfully');
}

// Send an estimate
const { estimate } = await apiClient.estimates.getEstimateById('456');
if (estimate) {
  await estimate.send();
  console.log('Estimate sent successfully');
}

// Send a credit memo
const { creditMemo } = await apiClient.creditMemos.getCreditMemoById('789');
if (creditMemo) {
  await creditMemo.send();
  console.log('Credit memo sent successfully');
}
```

### Downloading PDFs

Download invoices, estimates, credit memos, bills, and payments as PDF files:

```typescript
// Download invoice PDF
const { invoice } = await apiClient.invoices.getInvoiceById('123');
if (invoice) {
  const pdfBlob = await invoice.downloadPDF();

  // Save to file (Node.js example)
  const fs = require('fs').promises;
  await fs.writeFile('invoice.pdf', Buffer.from(await pdfBlob.arrayBuffer()));

  // Or use in browser
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'invoice.pdf';
  link.click();
}

// Download estimate PDF
const { estimate } = await apiClient.estimates.getEstimateById('456');
if (estimate) {
  const pdfBlob = await estimate.downloadPDF();
  // Handle PDF blob...
}

// Download credit memo, bill, or payment PDF
const { creditMemo } = await apiClient.creditMemos.getCreditMemoById('789');
if (creditMemo) {
  const pdfBlob = await creditMemo.downloadPDF();
  // Handle PDF blob...
}
```

### Voiding Transactions

Void invoices, credit memos, and payments:

```typescript
// Void an invoice
const { invoice } = await apiClient.invoices.getInvoiceById('123');
if (invoice && invoice.Balance > 0) {
  await invoice.void();
  console.log('Invoice voided successfully');
}

// Void a credit memo
const { creditMemo } = await apiClient.creditMemos.getCreditMemoById('456');
if (creditMemo && creditMemo.Balance > 0) {
  await creditMemo.void();
  console.log('Credit memo voided successfully');
}

// Void a payment
const { payment } = await apiClient.payments.getPaymentById('789');
if (payment && payment.TotalAmt > 0) {
  await payment.void();
  console.log('Payment voided successfully');
}
```

### Soft Deleting Entities

Soft delete accounts and customers by setting `Active=false`:

```typescript
// Soft delete an account
const { account } = await apiClient.accounts.getAccountById('123');
if (account && account.Active) {
  await account.delete(); // Sets Active=false
  console.log('Account deactivated');

  // Reactivate if needed
  account.Active = true;
  await account.save();
}

// Soft delete a customer
const { customer } = await apiClient.customers.getCustomerById('456');
if (customer && customer.Active) {
  await customer.delete(); // Sets Active=false
  console.log('Customer deactivated');

  // Reactivate if needed
  customer.Active = true;
  await customer.save();
}
```

### Reloading Entity Data

Refresh entity data from the API:

```typescript
// Reload invoice data
const { invoice } = await apiClient.invoices.getInvoiceById('123');
if (invoice) {
  // Make local changes
  invoice.PrivateNote = 'Local change';

  // Reload from API to get latest data
  await invoice.reload();
  console.log('Invoice data refreshed');
}
```

### Error Handling with Entity Methods

All entity methods throw `QuickbooksError` with detailed information:

```typescript
try {
  const { invoice } = await apiClient.invoices.getInvoiceById('123');
  if (invoice) {
    // This will throw if invoice doesn't have an ID
    await invoice.downloadPDF();
  }
} catch (error) {
  if (error instanceof QuickbooksError) {
    console.error('PDF download failed:', error.message);
    console.error('Error details:', error.details);
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
