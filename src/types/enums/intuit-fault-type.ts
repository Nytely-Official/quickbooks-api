/**
 * The Intuit Fault Type Enum
 */
export enum IntuitFaultType {
	/**
	 * Indicates a potential error in your request.
	 * Review your request. There may be invalid code or data.
	 * Fix the request payload and header and it will succeed.
	 */
	ValidationFault = 'ValidationFault',

	/**
	 * This means there's a problem with our servers, you can't fix this.
	 */
	SystemFault = 'SystemFault',

	/**
	 * Review the authorization credentials in your request. They may not be correct.
	 */
	AuthenticationFault = 'AuthenticationFault',

	/**
	 * This means your user hasn’t granted your app authorization for the specified resource.
	 * Since you don’t have authorization, the request failed.
	 * We require users (who are admins in QuickBooks Online) to authorize access to all resources when they first connect to and authorize your app.
	 * As long as the authorization process is in place, this shouldn’t happen for our APIs.
	 */
	AuthorizationFault = 'AuthorizationFault',

	/**
	 * This means there's an unknown error.
	 * Review the request and try again. If the problem persists, contact support.
	 */
	UnknownFault = 'UnknownFault',

	/**
	 * Review the authorization credentials in your request. They may not be correct.
	 */
	AUTHENTICATION = 'AUTHENTICATION',
}
