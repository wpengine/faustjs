const { defineConfig } = require('@playwright/test');
const path = require('path');
const baseConfig = require('@wordpress/scripts/config/playwright.config');

const config = defineConfig({
  ...baseConfig,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: path.join(process.cwd(), 'artifacts', 'html') }],
    ['github']
  ],
  webServer: {
    command: 'npm run --workspace=examples/next/faustwp-getting-started start',
    port: 8889,
    timeout: 120_000, // 120 seconds.
    reuseExistingServer: true,
  }
});

export default config;
