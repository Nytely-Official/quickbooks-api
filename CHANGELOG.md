# Changelog

## [0.9.1] - 2025-11-28

### Bug Fixes

- Fixed error code parsing in `ApiClient` error handling to properly convert error codes to integers
- Error codes from Intuit API responses are now correctly parsed as integers using `parseInt(String(error.code))` to handle both string and
  number types returned from the API

## [0.9.0] - 2025-11-28

### Features

- Added Intuit Transaction ID (`intuitTID`) to all successful API responses
- Enhanced `ApiClient.runRequest()` to extract `intuitTID` from response headers
- Updated `SearchResponse` interface to include `intuitTID` property for all search/list methods
- Improved error handling to support both old (uppercase) and new (lowercase) Intuit error response formats
- Added `IntuitFaultType` enum for type-safe error type handling
- Enhanced error mapping to handle both `Fault.Error` and `fault.error` response structures

### Breaking Changes

- All `get*ById()` methods now return `{ item: T | null, intuitTID: string }` instead of just `T | null`:
  - `getAccountById()`
  - `getBillById()`
  - `getCreditMemoById()`
  - `getCustomerById()`
  - `getEstimateById()`
  - `getInvoiceById()`
  - `getPaymentById()`
- `getCompanyInfo()` and `rawCompanyInfoQuery()` now return `{ companyInfo: CompanyInfo, intuitTID: string }` instead of just `CompanyInfo`
- All search/list methods now include `intuitTID` in the `SearchResponse` interface:
  - All `getAll*()` methods
  - All `get*ForDateRange()` methods
  - All `getUpdated*()` methods
  - All `raw*Query()` methods

### Code Quality

- Standardized response structure across all API methods
- Improved type safety with structured response interfaces
- Enhanced error handling compatibility with both Intuit API error response formats
- Updated all API service methods to consistently return `intuitTID`

### Tests

- Updated all unit tests to validate `intuitTID` presence and format
- Updated all live tests to check for `intuitTID` in responses
- Enhanced mock helpers to include `intuit_tid` header in test responses
- Added comprehensive test coverage for new response structures across all APIs

### Documentation

- Updated README with examples showing new response structures
- Added migration guide for breaking changes
- Documented `intuitTID` usage in API response examples

## [0.8.0] - 2025-11-27

### Features

- Added `QuickbooksError` class for enhanced error handling with structured Intuit API error details
- Implemented `ApiClient.getIntuitErrorDetails()` static method for extracting error information from Intuit API responses
- Enhanced error objects with comprehensive details:
  - HTTP status codes
  - Array of Intuit error objects (message, detail, code)
  - Intuit transaction IDs (intuitTID) for support tracking

### Breaking Changes

- All API methods now throw `QuickbooksError` instead of generic `Error` instances
- Error handling code must be updated to catch `QuickbooksError` and access `error.details` for Intuit-specific information
- `formatResponse()` methods in all API classes are now async to support error detail extraction

### Code Quality

- Standardized error handling across all API classes (Account, Bill, CompanyInfo, CreditMemo, Customer, Estimate, Invoice, Payment,
  Preferences)
- Updated `AuthProvider` to use `QuickbooksError` for all error scenarios
- Improved error propagation from Intuit API responses
- Enhanced type safety with structured error data interfaces

### Tests

- Updated all live tests to validate `QuickbooksError` structure and properties
- Added comprehensive error detail validation in test suites
- Updated unit tests to expect `QuickbooksError` instead of generic `Error`
- Enhanced error handling test coverage across all API endpoints

### Documentation

- Added error handling documentation to README
- Included examples of catching and handling `QuickbooksError`
- Documented error detail structure and properties

## [0.7.3] - 2025-10-22

### Bug Fixes

- Fixed CustomerRef filter syntax in EstimateQueryBuilder to match QuickBooks API requirements
- Removed unused DeepKeys import from EstimateQueryBuilder for cleaner code

### Tests

- Added new estimate API test case for retrieving estimates by customer ID
- Enhanced estimate API test coverage with customer-specific filtering validation
- Improved test validation for customer reference consistency across estimate queries

### Code Quality

- Simplified EstimateQueryBuilder CustomerRef filter implementation
- Removed unnecessary type complexity in estimate query builder methods
- Standardized CustomerRef filter usage across all query builders (now consistent with v0.7.2 fixes)

## [0.7.2] - 2025-10-22

### Bug Fixes

- Fixed CustomerRef filter syntax in query builders across multiple APIs:
  - AccountQueryBuilder: Changed `CustomerRef.value = '${customerId}'` to `CustomerRef = '${customerId}'`
  - CreditMemoQueryBuilder: Updated CustomerRef filter syntax for proper QuickBooks API compatibility
  - InvoiceQueryBuilder: Fixed CustomerRef filter to use correct syntax
  - PaymentQueryBuilder: Corrected CustomerRef filter implementation
  - PreferenceQueryBuilder: Updated CustomerRef filter syntax
- Fixed salt type casting in AuthProvider encryption algorithm to use `BufferSource` type

### Tests

- Extended bill API test date range from 120 days to 730 days for better test coverage
- Added new invoice test case for retrieving invoices by customer ID
- Enhanced invoice API test coverage with customer-specific filtering validation

### Dependencies

- Updated Express from v4.21.2 to v5.1.0
- Updated TypeScript from v5.7.3 to v5.9.3
- Updated @types/express from v5.0.0 to v5.0.3
- Updated tsc-alias from v1.8.10 to v1.8.16
- Updated @types/bun from v1.2.2 to v1.3.0
- Updated various Express-related dependencies to support Express v5

### Code Quality

- Improved type safety in authentication provider encryption methods
- Enhanced test coverage for customer-specific invoice queries
- Standardized CustomerRef filter usage across all query builders

## [0.7.1] - 2025-03-23

### Features

- Added InvoiceFilters enum for type-safe invoice queries
- Implemented class transformation for Invoice API responses
- Added getUrl() method to InvoiceAPI for endpoint URL construction

### Code Quality

- Migrated Invoice interface to class-based implementation
- Standardized filter usage in InvoiceQueryBuilder with enum values
- Improved type safety in invoice query builder methods

### Bug Fixes

- Fixed invoice instance API client binding in getInvoiceById

### Breaking Changes

- All invoice API methods now return Invoice class instances instead of plain objects
- Requires using `plainToClass` for object transformation
- Enables new instance methods on Invoice objects

## [0.7.0] - 2025-03-21

### Features

- Started the Major Move from Interface Based Entities to Class Based Enties for better Management
- Added class-transformer dependency for object-class transformation
- Implemented Customer class instance methods with API client binding
- Added `getUrl()` method to CustomerAPI for endpoint URL retrieval
- Enhanced type exports for Customer-related interfaces
- Added save() method demonstration to example usage flow

### Code Quality

- Migrated Customer interface to class-based implementation
- Improved type safety in CompanyInfoAPI search options
- Removed redundant Customer interface file
- Standardized CustomerFilter usage in query builder

### Bug Fixes

- Fixed CustomerQueryBuilder ID filter to use proper enum value
- Improved response handling in API client request runner

### Documentation

- Updated example usage with customer modification flow
- Enhanced type definitions with proper class exports

### Breaking Changes

- `getCustomerById()` now returns Customer class instances instead of plain objects:
  - Requires using `plainToClass` for object transformation
  - Enables new `save()` method on Customer instances
- Removed legacy Customer interface in favor of class-based implementation

## [0.6.2] - 2025-03-14

### Features

- Added Billing API
- Added Company API

### Tests

- Added comprehensive test cases for the New Billing and Company API

---

## [0.6.1] - 2025-03-06

### Bug Fixes

- Token Validity Check within the Auth Provider was causing some issues for clients who want to deserialize a token that has an expired
  access token, therefore, the validity checks within the deserialize and serialize methods was removed to prevent these issues
- Fixed wrong install command in the Readme File

---

## [0.6.0] - 2025-03-05

### Features

- Enhanced live tests for getUpdated methods across all API endpoints
- Added empty array validation tests for update methods in Accounts, Credit Memos, Customers, Estimates, Invoices and Payments
- Improved error handling for entity lookup methods to return null instead of throwing errors

### Bug Fixes

- Improved response validation in all API formatResponse methods
- Fixed empty array handling when QueryResponse exists but contains no results
- Standardized error handling for invalid API responses across all entities

### Tests

- Added comprehensive test cases for empty update scenarios
- Improved date handling consistency in update method tests
- Added validation for proper empty array returns when no updates exist

### Breaking Changes

- `get*ById` methods now return `null` instead of throwing errors when entities are not found:
  - getAccountById
  - getCreditMemoById
  - getCustomerById
  - getEstimateById
  - getInvoiceById
  - getPaymentById
- Clients must now check for null return values instead of catching 'not found' errors

---

## [0.5.1] - 2025-03-01

### Features

- Added Account API with full CRUD support
- Added Credit Memo API with full CRUD support
- Added Payment API with full CRUD support
- Added Preference API with full CRUD support
- Added comprehensive live tests for Account, Credit Memo, Payment, and Preference APIs
- Enhanced test suite with mock data for Account, Credit Memo, Payment, and Preference entities

### Code Quality

- Improved type definitions for Account, Credit Memo, Payment, and Preference entities
- Standardized API response handling across Account, Credit Memo, Payment, and Preference endpoints

---

## [0.5.0] - 2025-02-28

### Added

- Status filtering support for invoice API methods
- Entity-specific option interfaces (InvoiceOptions, EstimateOptions, CustomerOptions)
- Enhanced type safety for API method parameters
- Additional status validation tests for invoice endpoints

### Changed

- Unified option handling across all API methods
- Updated live tests to use entity-specific options
- Improved documentation for search options and status filtering
- Refactored query builder to support status conditions

### Fixed

- Type definitions for customer and estimate APIs
- Pagination handling in documentation examples
- Search options validation in service methods

---

## [0.4.3] - 2025-02-25

### Added

- Auto-refresh functionality with `enableAutoRefresh()` and `disableAutoRefresh()` methods
- New error handling for expired tokens when auto-refresh is disabled
- Additional test cases for token serialization/deserialization edge cases

### Changed

- Improved token validation logic with auto-refresh awareness
- Updated test suite with better error case coverage

### Fixed

- Validation logic when both access and refresh tokens are expired

---

## [0.4.2] - 2025-02-25

### Features

- Added Customer API support
- Implemented customer search methods:
  - `getAllCustomers()`
  - `getCustomerById()`
  - `getCustomersForDateRange()`
  - `getUpdatedCustomers()`
  - `rawCustomerQuery()`
- Added customer query builder with filtering capabilities

### Tests

- Added comprehensive live tests for Customer API endpoints
- Implemented unit tests for customer query builder
- Added mock customer data for testing scenarios
- Enhanced pagination test coverage across all APIs
- Improved error handling tests for invalid IDs

### Code Quality

- Added date validation checks in date range methods
- Improved error messages for invalid customer IDs
- Standardized API response handling across customer endpoints
- Enhanced type safety for customer interface definitions

### Infrastructure

- Updated test runner configuration with longer timeout values
- Added customer data mocking utilities
- Improved test cleanup procedures

---

# [0.4.1] - 2025-02-21

### Features

- Added event emitter for token refresh and revoke events
- Implemented `onRefresh` and `onRevoke` callback registration methods

### Documentation

- Updated authentication section with event listener examples
- Added API reference entries for new event methods

---

# [0.4.0] - 2025-02-21

### Features

- Added pagination support with `hasNextPage` flag in SearchResponse interface
- Implemented automatic next page checking in API client
- Added `page` parameter to SearchOptions for simplified pagination
- Deprecated `startPosition` in favor of page-based pagination
- Enhanced type safety with Range type constraints for maxResults
- Entities that return multiple results (Example: getAllInvoices) will now return a SearchResponse object instead that contains the results
  and a boolean value indicating if there is a next page (example: { results: [Invoice1, Invoice2], hasNextPage: true })

### Bug Fixes

- Fixed pagination calculation logic in BaseQueryBuilder
- Updated test suites for new pagination interface
- Corrected example usage to use page-based pagination
- Fixed type definitions in SearchOptions interface

### Documentation

- Updated README with new pagination examples
- Added console logging to example usage flow
- Improved inline documentation for search options

### Code Quality

- Standardized SearchResponse interface across all API methods
- Refactored query builder to expose searchOptions property
- Improved error handling in pagination checks
- Enhanced type safety for numeric range constraints

---

## [0.3.2] - 2025-03-17

### Bug Fixes

- Moved the 5 minute Buffer from the Refresh Token Expiry Date Calculation to the Access Token Expiry Date Calculation to ensure the access
  token is always up to date
- Used newly given Refresh Token instead of existing Refresh Token after refreshing the access token to ensure the refresh token is always
  up to date

---

## [0.3.1] - 2025-03-16

### Bug Fixes

- Fixed token refresh race condition by clearing current token before parsing new response
- Used existing Refresh Token after refreshing the access token to avoid overwriting the existing refresh token and expiry date

### Code Quality

- Refactored token parsing logic to handle edge cases more reliably

---

## [0.3.0] - 2025-03-15

### Features

- Added Estimates Search API support (Searching, Pagination, Sorting) with query building capabilities
- Implemented Estimate status tracking and expiration date handling
- Added new SearchOptions interface for type-safe queries

### Documentation

- Updated README with Estimates API examples and usage patterns
- Added API reference tables for Estimate methods and parameters
- Improved search options documentation with generic type support

### Tests

- Added live integration tests for Estimates API endpoints
- Implemented comprehensive unit tests for estimate query builder
- Added mock estimate data for testing scenarios

### Code Quality

- Refactored QueryBuilder into base class with type-safe inheritance
- Improved type safety with generic SearchOptions<T> interface
- Standardized API response handling across all endpoints

### Infrastructure

- Added biome.json configuration for code formatting
- Updated test helpers to support estimate data mocking
- Improved token serialization/deserialization examples

---

## [0.2.0] - 2025-02-11

### Features

- Added InvoiceSearchOptions interface for pagination, sorting, and API versioning
- Updated all invoice methods to support optional search parameters:
  - `maxResults` for pagination limits
  - `startPosition` for pagination offsets
  - `orderBy` for field-based sorting
  - `minorVersion` for API version control
- Enhanced QueryBuilder with integrated search options handling
- Improved error messages for token refresh failures

### Tests

- Added live tests for pagination functionality
- Implemented search options validation tests
- Added sorting order verification tests
- Expanded test coverage for API version parameter

### Documentation

- Updated README with new search options examples
- Added QueryBuilder integration guide
- Improved API reference documentation
- Enhanced code examples with pagination and sorting

### Code Quality

- Refactored invoice service methods to use unified search options
- Improved type safety with InvoiceSearchOptions interface
- Standardized query builder usage across all API methods
- Removed deprecated URL parameter handling from QueryBuilder

---

## [0.1.4] - 2025-02-10

### Features

- Added the ability to generate the Auth URL with a custom state

---

## [0.1.3] - 2025-02-10

### Infrastructure

- Updated the Build Flow to include tsc-alias for TypeScript alias resolution (emit js extension in imports)

---

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

---

## [0.1.1] - 2025-02-08

### QOL

- Updated the Workflow file used to publish the package to NPM

---

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

---

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

---

## [0.0.3] | 2025-02-07

### Features

- Published package to NPM

---

## [0.0.2] | 2025-02-07

### Features

- Add new API system for interacting with QB Invoices (675083e)

### Tests

- Setup tests for Invoice API (b42d420)

### Chores

- Update documentation and Readme (84d7cb5)
- Clean up Readme file (9979196)

---

## [0.0.1] | 2025-02-06

### Initial Release

- Initial codebase implementation
- Basic system setup and configuration
- Authentication system for OAuth 2.0
