import { loginToWordPressAdmin, visitPluginsPage, wpAdminUrl } from '../utils.js';
const { test, expect } = require('@wordpress/e2e-test-utils-playwright');

export const selectors = {
    pluginsMenuItem: '#menu-plugins a',
    pluginDeactivationLink: '#deactivate-test-cpt-plugin',
};

// Login to WordPress before each test
test.beforeEach(async ({ page }) => {
    await loginToWordPressAdmin(page);
});

test('should navigate to plugin settings and display IDE Settings tab', async ({ page }) => {
    // Edit our dummy content
    await visitPluginsPage(page);
});