<?php

class SettingsCest
{
    /**
     * @type string
     */
    protected $wordPressUrl;

    /**
     * Save the WordPress url for later use.
     */
    public function _before(AcceptanceTester $I)
    {
        $this->wordPressUrl = getenv('TEST_SITE_WP_URL');
    }

    /**
     * Ensure the WPEngine Headless settings page is available.
     */
    public function i_can_access_the_settings_page(AcceptanceTester $I)
    {
        $I->loginAsAdmin();
        $I->visitWPEngineHeadlessSettingsPage();
        $I->see('Headless by WP Engine');
    }

    /**
     * Ensure the WPE Headless default settings are set when the plugin is
     * activated for the first time.
     */
    public function i_can_see_the_default_settings(AcceptanceTester $I)
    {
        $I->loginAsAdmin();
        $I->amOnPluginsPage();

        // Deactivate plugin and remove settings.
        $I->deactivatePlugin('wpengine-headless');
        $I->dontHaveOptionInDatabase('wpe_headless');

        // Reactivate plugin triggering default settings.
        $I->activatePlugin('wpengine-headless');

        $settings = $I->grabOptionFromDatabase('wpe_headless');

        $I->visitWPEngineHeadlessSettingsPage();
        $I->seeInField('wpe_headless[frontend_uri]', '');
        $I->seeInField('wpe_headless[secret_key]', $settings['secret_key']);
        $I->seeInField('wpe_headless[menu_locations]', 'Primary, Footer');
        $I->seeCheckboxIsChecked('#disable_theme');
        $I->seeCheckboxIsChecked('#enable_rewrites');
        $I->seeCheckboxIsChecked('#enable_redirects');
        $I->dontSeeCheckboxIsChecked('#enable_image_source');
    }
}
