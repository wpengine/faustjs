import { ApolloLink, FetchResult, Operation, Observable } from '@apollo/client';
import { errorLog } from '../utils/log.js';

/**
 * Checks if the given error is a server error.
 * @param error The error to check.
 * @returns A boolean indicating whether the error is a server error.
 */
function isServerError(error: unknown): error is {
	response: Response;
	statusCode: number;
	result?: unknown;
	bodyText?: string;
} {
	return (
		typeof error === 'object' &&
		error !== null &&
		'response' in error &&
		'statusCode' in error
	);
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
		// Apollo Client 3 calls this NextLink and 4 calls it ForwardFunction.
		forward: NonNullable<Parameters<ApolloLink['request']>[1]>,
	): ReturnType<ApolloLink['request']> {
		return new Observable<FetchResult>(
			(observer: {
				next: (value: FetchResult) => void;
				error: (error: unknown) => void;
				complete: () => void;
			}) => {
				const subscription = forward(operation).subscribe({
					next: (result: FetchResult) => {
						// Check if there are GraphQL errors in the result
						if (result.errors && result.errors.length > 0) {
							errorLog('GraphQL errors:', result.errors);
						}
						observer.next(result);
					},
					error: (error: unknown) => {
						// Check if the error is a server error
						if (isServerError(error)) {
							errorLog('Server error:', error);
							// Apollo Client 3 parses the body into result; 4 keeps the raw bodyText.
							errorLog('Fetch result:', error.result ?? error.bodyText);
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
			},
		);
	}
}
