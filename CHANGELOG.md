# Changelog

## [0.1.3] - 2025-02-10

### Infrastructure

- Updated the Build Flow to include tsc-alias for TypeScript alias resolution (emit js extension in imports)

## [0.1.2] - 2025-02-10

### Features

- Added new Invoice API methods:
  - `getInvoicesByDueDate()` - Retrieve invoices by their due date
  - `rawInvoiceQuery()` - Execute custom queries using QueryBuilder
- Enhanced QueryBuilder with chainable methods:
  - `orderBy()` - Sort results by specific fields
  - `limit()` - Constrain result set size
  - Added support for complex query construction

### Infrastructure

- Updated CI workflow to run tests on both main and develop branches
- Added separate live test workflow with environment variables
- Configured Prettier formatting rules for consistent code style

### Tests

- Added comprehensive live tests for AuthProvider token operations
- Implemented live integration tests for Invoice API endpoints
- Expanded test coverage for error scenarios and edge cases
- Added test cleanup procedures to prevent state leakage

### Code Quality

- Enforced single quotes and consistent formatting across codebase
- Improved type safety by replacing generic Function type with specific signatures
- Fixed unhandled promise rejections in test cases
- Added proper error handling for token state modifications

### Documentation

- Updated README with consistent code formatting examples
- Added missing documentation for UserAuthResponse interface
- Improved type definitions with DeepKeys utility type
- Enhanced error messages and inline documentation

## [0.1.1] - 2025-02-08

### QOL

- Updated the Workflow file used to publish the package to NPM

## [0.1.0] - 2025-02-08

### Features

- Added secure token serialization/deserialization with crypto validation (#2)
- Implemented token revocation functionality (#1)
- Added validation for weak secret keys during serialization
- Introduced token expiration handling and refresh mechanism

### Improvements

- Updated example usage with token management best practices
- Enhanced error handling for token operations
- Improved documentation with security guidelines
- Added stricter type checking for token payloads

### Tests

- Added tests for weak secret key detection
- Expanded test coverage for token refresh scenarios
- Added validation tests for expired tokens
- Implemented negative testing for invalid token operations

### Documentation

- Revised README with updated security recommendations
- Added detailed API reference for token management
- Included code examples for token revocation flow
- Documented secret key requirements and best practices

## [0.0.4] - 2025-02-07

### Features

- Initial release of QuickBooks API SDK
- Core authentication provider implementation
- OAuth2 token management foundation
- Basic API client infrastructure

### Infrastructure

- Configured CI/CD publishing workflow
- Set up TypeScript build system
- Initial test framework configuration
- Documentation scaffolding

## **v0.0.3** | 2025-02-07

### Features

- Published package to NPM

---

## **v0.0.2** | 2025-02-07

### Features

- Add new API system for interacting with QB Invoices (675083e)

### Tests

- Setup tests for Invoice API (b42d420)

### Chores

- Update documentation and Readme (84d7cb5)
- Clean up Readme file (9979196)

---

## **v0.0.1** | 2025-02-06

### Initial Release

- Initial codebase implementation
- Basic system setup and configuration
- Authentication system for OAuth 2.0
