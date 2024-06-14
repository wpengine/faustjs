/**
 * Utility functions for Playwright tests in WordPress Admin and GraphiQL IDE.
 *
 * This file contains helper functions designed to simplify interactions with the WordPress
 * admin dashboard and the GraphiQL IDE within end-to-end tests using Playwright. Functions
 * include logging into the WordPress admin, typing queries and variables into CodeMirror editors,
 * and clearing CodeMirror editor content.
 *
 * @file Utility functions for WordPress Admin and GraphiQL IDE interaction.
 * @module utils
 */

/**
 * @typedef {Object} Selectors
 * @property {string} loginUsername - The CSS selector for the username input field in the WordPress login form.
 * @property {string} loginPassword - The CSS selector for the password input field in the WordPress login form.
 * @property {string} submitButton  - The CSS selector for the submit button in the WordPress login form.
 */

/**
 * CSS selectors used for navigating the WordPress admin login page.
 * @type {Selectors}
 */
const selectors = {
    loginUsername: '#user_login',
    loginPassword: '#user_pass',
    submitButton: '#wp-submit',
};

export const wpHomeUrl = 'http://localhost:8889';
export const wpAdminUrl = 'http://localhost:8889/wp-admin';

/**
 * Log in to the WordPress admin dashboard.
 * @param {import('@playwright/test').Page} page The Playwright page object.
 */
export async function loginToWordPressAdmin(page) {
    await page.goto('http://localhost:8889/wp-admin', {
        waitUntil: 'networkidle',
    });

    const isLoggedIn = await page.$('#wpadminbar');

    // If already logged in, return early
    if (isLoggedIn) {
        return;
    }

    await page.fill(selectors.loginUsername, 'admin');
    await page.fill(selectors.loginPassword, 'password');
    await page.click(selectors.submitButton);
    await page.waitForSelector('#wpadminbar'); // Confirm login by waiting for the admin bar
}


export async function visitPublicFacingPage(page) {
    await page.goto(wpHomeUrl, { waitUntil: 'networkidle' });
}

export async function visitAdminFacingPage(page) {
    await page.goto(wpAdminUrl, { waitUntil: 'networkidle' });
}

export async function visitPluginsPage(page) {
    await page.goto(`${wpAdminUrl}/plugins.php`, {
        waitUntil: 'networkidle',
    });
}