import {
	ApolloLink,
	FetchResult,
	NextLink,
	Operation,
	Observable,
	ServerError,
} from '@apollo/client';
import { errorLog } from '../utils/log.js';

/**
 * Checks if the given error is a server error.
 * @param error The error to check.
 * @returns A boolean indicating whether the error is a server error.
 */
function isServerError(error: unknown): error is ServerError {
	if (
		typeof error === 'object' &&
		error !== null &&
		'response' in error &&
		'result' in error &&
		'statusCode' in error
	) {
		return true;
	}
	return false;
}

/**
 * Apollo Link that captures GraphQL errors and server errors, and prints them into the console.
 */
export class ErrorLoggingLink extends ApolloLink {
	/**
	 * Intercepts each GraphQL operation request.
	 * @param operation The GraphQL operation being executed.
	 * @param forward The next link in the chain to delegate the operation to.
	 * @returns An Observable with the operation result or error.
	 */
	// eslint-disable-next-line class-methods-use-this
	request(
		operation: Operation,
		forward: NextLink,
	): Observable<FetchResult> | null {
		return new Observable<FetchResult>((observer) => {
			const subscription = forward(operation).subscribe({
				next: (result) => {
					// Check if there are GraphQL errors in the result
					if (result.errors && result.errors.length > 0) {
						errorLog('GraphQL errors:', result.errors);
					}
					observer.next(result);
				},
				error: (error) => {
					// Check if the error is a server error
					if (isServerError(error)) {
						errorLog('Server error:', error);
						errorLog('Fetch result:', error.result);
					} else {
						errorLog('Network error:', error);
					}
					observer.error(error);
				},
				complete: () => {
					observer.complete();
				},
			});

			return () => {
				subscription.unsubscribe();
			};
		});
	}
}
