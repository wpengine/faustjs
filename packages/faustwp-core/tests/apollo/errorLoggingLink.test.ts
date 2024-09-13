import { ApolloError } from '@apollo/client/core';
import { Observable } from 'zen-observable-ts';
import { ErrorLoggingLink } from '../../src/apollo/errorLoggingLink';

describe('ErrorLoggingLink', () => {
  let link: ErrorLoggingLink;
  let mockNextLink: jest.Mock;

  beforeEach(() => {
    link = new ErrorLoggingLink();
    mockNextLink = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('logs GraphQL errors', (done) => {
    const mockErrors = [
      new ApolloError({ errorMessage: 'Test GraphQL error' }),
    ];
    const mockResult = { errors: mockErrors };
    const mockOperation = { query: {} };

    mockNextLink.mockReturnValueOnce(
      new Observable((observer) => {
        observer.next(mockResult);
        observer.complete();
      }),
    );

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    link.request(mockOperation as any, mockNextLink as any).subscribe({
      next: (result) => {
        // Check if there are GraphQL errors in the result
        if (result.errors && result.errors.length > 0) {
          expect(consoleLogSpy).toHaveBeenCalled();
          expect(consoleLogSpy.mock.calls[0][0]).toContain('GraphQL errors');
          expect(consoleLogSpy.mock.calls[0][1]).toEqual(mockErrors);
        } else {
          // We shouldn't reach here for an error-free result
          expect(true).toBe(false);
        }
        consoleLogSpy.mockRestore();
        done();
      },
      error: () => {
        // We shouldn't reach here
        expect(true).toBe(false);
        done();
      },
    });
  }, 1000);

  it('logs server errors along with fetch result', (done) => {
    const mockServerError = new ApolloError({
      errorMessage: 'Test server error',
      graphQLErrors: [],
      networkError: null, // Ensure networkError is null to simulate a server error
    });
    const mockOperation = { query: {} };

    mockNextLink.mockReturnValueOnce(
      new Observable((observer) => {
        observer.error(mockServerError);
      }),
    );

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    link.request(mockOperation as any, mockNextLink as any).subscribe({
      next: () => {
        // We shouldn't reach here
        expect(true).toBe(false);
        done();
      },
      error: () => {
        expect(consoleLogSpy).toHaveBeenCalled();
        consoleLogSpy.mockRestore();
        done();
      },
    });
  }, 1000);

  it('logs network errors', (done) => {
    const mockNetworkError = {
      response: {},
      result: {},
      statusCode: 500,
    };
    const mockOperation = { query: {} };

    mockNextLink.mockReturnValueOnce(
      new Observable((observer) => {
        observer.error(mockNetworkError); // Emit a network error instead of a server error
      }),
    );

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    link.request(mockOperation as any, mockNextLink as any).subscribe({
      next: () => {
        // We shouldn't reach here
        expect(true).toBe(false);
        done();
      },
      error: (error) => {
        expect(consoleLogSpy).toHaveBeenCalled();
        expect(consoleLogSpy.mock.calls[0][0]).toContain('Server error');
        expect(error).toEqual(mockNetworkError);
        done();
      },
    });
  }, 1000);
});
