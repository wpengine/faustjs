import { getIronSession } from 'iron-session';
import { defaultIronOptions } from '../config/defaults';

// Default configuration
const defaultConfig = {
	ironOptions: defaultIronOptions,
	tokenExpirationBuffer: 60000, // 1 minute buffer
	errorMessages: {
		notLoggedIn: 'User is not logged in.',
		tokenExpired: 'Token has expired.',
		invalidCredentials: 'Invalid credentials.',
		serverError: 'Internal server error.',
		unknownAction: 'Unknown action',
		missingPassword:
			'Cookie password is not set. Please set it to a secure password of at least 32 characters.',
	},
	supportedActions: ['login', 'logout', 'me', 'introspect', 'refresh', 'token'],
};

// Pure utility functions
const validateIronOptions = (ironOptions, config) => {
	if (!ironOptions?.password) {
		throw new Error(config.errorMessages.missingPassword);
	}
	return true;
};

const sendError = (res, statusCode, message, details = null) =>
	res.status(statusCode).json({
		error: true,
		message,
		details,
		timestamp: new Date().toISOString(),
	});

const sendSuccess = (res, data = null, message = 'Success') =>
	res.status(200).json({
		success: true,
		message,
		data,
		timestamp: new Date().toISOString(),
	});

const isTokenExpired = (
	token,
	bufferMs = defaultConfig.tokenExpirationBuffer,
) => {
	try {
		const decodedToken = JSON.parse(
			Buffer.from(token.split('.')[1], 'base64').toString(),
		);

		if (!decodedToken?.exp) {
			return false;
		}

		const expiresAt = new Date(decodedToken.exp * 1000);
		const now = new Date();

		return now.getTime() > expiresAt.getTime() - bufferMs;
	} catch (error) {
		return true; // If we can't decode, consider it expired
	}
};

// Async utility functions
const refreshAuthToken = async (client, refreshToken) => {
	const query = `
    mutation GetAuthToken($refreshToken: String!) {
		refreshToken(input: { refreshToken: $refreshToken }) {
			authToken
			authTokenExpiration
			success
		}
    }
  `;

	try {
		const res = await client.request(query, {
			refreshToken,
		});

		if (res?.errors) {
			throw new Error(res.errors[0].message);
		}

		return res?.data?.refreshToken;
	} catch (error) {
		throw new Error(`Token refresh failed: ${error.message}`);
	}
};

const getOrRefreshSession = async ({
	req,
	res,
	client,
	ironOptions,
	config = defaultConfig,
}) => {
	const session = await getIronSession(req, res, ironOptions);
	const { refreshToken, authToken } = session ?? {};

	// No refresh token means not logged in
	if (!refreshToken) {
		session.destroy();
		return { success: false, error: 'NO_REFRESH_TOKEN' };
	}

	// Check if auth token needs refresh
	if (!authToken || isTokenExpired(authToken, config.tokenExpirationBuffer)) {
		try {
			const refreshRes = await refreshAuthToken(client, refreshToken);

			if (!refreshRes?.authToken) {
				session.destroy();
				return { success: false, error: 'TOKEN_REFRESH_FAILED' };
			}

			session.authToken = refreshRes.authToken;
			await session.save();

			return { success: true, session, refreshRes };
		} catch (error) {
			// Keep session but remove auth token
			delete session.authToken;
			await session.save();
			return {
				success: false,
				error: 'TOKEN_REFRESH_ERROR',
				details: error.message,
			};
		}
	}

	return { success: true, session };
};

// Higher-order function for error handling
const withErrorHandling =
	(handler, config = defaultConfig) =>
	async (params) => {
		try {
			return await handler(params);
		} catch (error) {
			return sendError(
				params.res,
				500,
				config.errorMessages.serverError,
				error.message,
			);
		}
	};

// Individual handler functions
const loginHandler = async ({
	client,
	ironOptions,
	loginProvider = 'PASSWORD',
	req,
	res,
	config = defaultConfig,
}) => {
	const session = await getIronSession(req, res, ironOptions);

	const query = `
    mutation Login($input: LoginInput!) {
      login(input: $input) {
        authToken
        refreshToken
      }
    }
  `;

	try {
		const response = await client.request(query, {
			input: { ...req.body, provider: loginProvider },
		});

		if (response?.errors) {
			throw new Error(response.errors[0].message);
		}

		const data = response?.data?.login;

		session.authToken = data.authToken;
		session.refreshToken = data.refreshToken;
		await session.save();

		return sendSuccess(
			res,
			{ authToken: data.authToken },
			'Logged in successfully',
		);
	} catch (error) {
		return sendError(
			res,
			401,
			config.errorMessages.invalidCredentials,
			error.message,
		);
	}
};

const logoutHandler = async ({
	ironOptions,
	req,
	res,
	config = defaultConfig,
}) => {
	try {
		const session = await getIronSession(req, res, ironOptions);
		session.destroy();
		return sendSuccess(res, null, 'Logged out successfully');
	} catch (error) {
		return sendError(res, 500, config.errorMessages.serverError, error.message);
	}
};

const meHandler = async ({
	client,
	ironOptions,
	req,
	res,
	config = defaultConfig,
}) => {
	const result = await getOrRefreshSession({
		req,
		res,
		client,
		ironOptions,
		config,
	});

	if (!result.success) {
		return sendError(res, 401, config.errorMessages.notLoggedIn);
	}

	// Fetch user data from GraphQL API
	try {
		// TODO make customizable
		const query = `
        query GetCurrentUser {
            viewer {
                id
                databaseId
                email
                name
                firstName
                lastName
                username
            }
        }`;

		const response = await client.request(
			query,
			{},
			{
				Authorization: `Bearer ${result.session.authToken}`,
			},
		);

		return sendSuccess(
			res,
			{
				isAuthenticated: true,
				user: response?.data?.viewer || null,
			},
			'User information retrieved',
		);
	} catch (error) {
		return sendError(res, 500, 'Failed to fetch user data', error.message);
	}
};

// Token handler - provides the authToken, refreshing it if expired
const tokenHandler = async ({
	client,
	ironOptions,
	req,
	res,
	config = defaultConfig,
}) => {
	const result = await getOrRefreshSession({
		req,
		res,
		client,
		ironOptions,
		config,
	});

	if (!result.success) {
		return sendError(res, 401, config.errorMessages.notLoggedIn);
	}

	// Get the token (either from existing session or newly refreshed)
	const { authToken } = result.session;
	const wasRefreshed = !!result.refreshRes;

	return sendSuccess(res, {
		authToken,
		expiresAt: wasRefreshed ? result.refreshRes.authTokenExpiration : null,
	});
};

// Pure introspect handler - no side effects, just checks current auth state
const introspectHandler = async ({
	client,
	ironOptions,
	req,
	res,
	config = defaultConfig,
}) => {
	const session = await getIronSession(req, res, ironOptions);
	const { refreshToken, authToken } = session ?? {};

	// No refresh token means not logged in
	if (!refreshToken) {
		return sendError(res, 401, config.errorMessages.notLoggedIn, {
			isAuthenticated: false,
			hasRefreshToken: false,
			hasAuthToken: false,
			tokenExpired: null,
		});
	}

	// Check if auth token exists and if it's expired
	const tokenExpired = authToken
		? isTokenExpired(authToken, config.tokenExpirationBuffer)
		: null;
	const hasValidToken = authToken && !tokenExpired;

	// If not authenticated, use sendError for consistency
	if (!hasValidToken) {
		return sendError(res, 401, config.errorMessages.tokenExpired, {
			isAuthenticated: false,
			hasRefreshToken: true,
			hasAuthToken: !!authToken,
			tokenExpired,
		});
	}

	// If authenticated, use sendSuccess
	return sendSuccess(
		res,
		{
			isAuthenticated: true,
			hasRefreshToken: true,
			hasAuthToken: true,
			tokenExpired: false,
		},
		'User is authenticated',
	);
};

// Dedicated refresh handler - only refreshes tokens
const refreshHandler = async ({
	client,
	ironOptions,
	req,
	res,
	config = defaultConfig,
}) => {
	const session = await getIronSession(req, res, ironOptions);
	const { refreshToken } = session ?? {};

	// No refresh token means can't refresh
	if (!refreshToken) {
		session.destroy();
		return sendError(res, 401, config.errorMessages.notLoggedIn);
	}

	try {
		const refreshRes = await refreshAuthToken(client, refreshToken);

		if (!refreshRes?.authToken) {
			session.destroy();
			return sendError(res, 401, 'Failed to refresh authentication token');
		}

		session.authToken = refreshRes.authToken;
		await session.save();

		return sendSuccess(
			res,
			{
				authToken: refreshRes.authToken,
				refreshed: true,
			},
			'Tokens refreshed successfully',
		);
	} catch (error) {
		// Keep session but remove auth token
		delete session.authToken;
		await session.save();
		return sendError(res, 401, 'Failed to refresh token', error.message);
	}
};

// Action handler mapping
const actionHandlers = {
	login: loginHandler,
	logout: logoutHandler,
	me: meHandler,
	introspect: introspectHandler,
	refresh: refreshHandler,
	token: tokenHandler,
};

// Main routing function with currying for configuration
const createAuthRouter = (userConfig = {}) => {
	const config = { ...defaultConfig, ...userConfig };

	return async ({
		client,
		ironOptions = config.ironOptions,
		action,
		loginProvider = 'PASSWORD',
		req,
		res,
	}) => {
		// Validate iron options
		validateIronOptions(ironOptions, config);

		// Check if action is supported
		if (!config.supportedActions.includes(action)) {
			return sendError(
				res,
				400,
				`${config.errorMessages.unknownAction}: ${action}`,
			);
		}

		const handler = actionHandlers[action];
		if (!handler) {
			return sendError(
				res,
				400,
				`${config.errorMessages.unknownAction}: ${action}`,
			);
		}

		// Apply error handling wrapper and call handler
		const safeHandler = withErrorHandling(handler, config);

		// All handlers now use the same named parameter structure
		return safeHandler({
			client,
			ironOptions,
			loginProvider,
			req,
			res,
			config,
		});
	};
};

// Create default auth router
const authRouter = createAuthRouter();

// Export everything
export {
	// Main functions
	createAuthRouter,
	authRouter,

	// Individual handlers
	loginHandler,
	logoutHandler,
	meHandler,
	introspectHandler,
	refreshHandler,
	tokenHandler,

	// Utilities
	validateIronOptions,
	sendError,
	sendSuccess,
	isTokenExpired,
	refreshAuthToken,
	getOrRefreshSession,
	withErrorHandling,

	// Configuration
	defaultConfig,
};
