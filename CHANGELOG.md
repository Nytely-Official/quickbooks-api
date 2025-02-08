# Changelog

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
