# QuickBooks API SDK

[![CI](https://github.com/your-username/quickbooks-api/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/quickbooks-api/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/%40quickbooks-api%2Fauth.svg)](https://www.npmjs.com/package/@quickbooks-api/auth)

A TypeScript SDK for interacting with Intuit QuickBooks API. Currently supports OAuth 2.0 authentication flow.

## Packages

| Package                | Version                                                                                                                     | Description                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `@quickbooks-api/auth` | [![npm version](https://badge.fury.io/js/%40quickbooks-api%2Fauth.svg)](https://www.npmjs.com/package/@quickbooks-api/auth) | Authentication provider for QuickBooks OAuth 2.0 |

## Installation

```bash
bun add @quickbooks-api/auth
```

## Usage

```typescript
import { AuthProvider, Environment, AuthScopes } from "@quickbooks-api/auth";

const authProvider = new AuthProvider(
	"YOUR_CLIENT_ID",
	"YOUR_CLIENT_SECRET",
	"YOUR_REDIRECT_URI",
	[AuthScopes.Accounting, AuthScopes.OpenId],
	Environment.Sandbox
);

// Generate authorization URL
const authUrl = authProvider.generateAuthUrl();
```

## Documentation

Full documentation available at [GitHub Wiki](https://github.com/your-username/quickbooks-api/wiki)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

MIT
