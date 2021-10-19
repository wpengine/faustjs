<?php

class SettingsCest
{
    /**
     * Ensure the Faust WP settings page is available.
     */
    public function i_can_access_the_settings_page(AcceptanceTester $I)
    {
        $I->loginAsAdmin();
        $I->amOnFaustWPSettingsPage();
        $I->see('Headless by WP Engine');
    }

    /**
     * Ensure the Faust WP default settings are set when the plugin is
     * activated for the first time.
     */
    public function i_can_see_the_default_settings(AcceptanceTester $I)
    {
        $I->loginAsAdmin();
        $I->amOnPluginsPage();

        // Deactivate plugin and remove settings.
        $I->deactivatePlugin('faust-wp');
        $I->dontHaveOptionInDatabase('wpe_headless');

        // Reactivate plugin triggering default settings.
        $I->activatePlugin('faust-wp');

        $settings = $I->grabOptionFromDatabase('wpe_headless');

        $I->amOnFaustWPSettingsPage();
        $I->seeInField('wpe_headless[frontend_uri]', '');
        $I->seeInField('wpe_headless[secret_key]', $settings['secret_key']);
        $I->seeInField('wpe_headless[menu_locations]', 'Primary, Footer');
        $I->seeCheckboxIsChecked('#disable_theme');
        $I->seeCheckboxIsChecked('#enable_rewrites');
        $I->seeCheckboxIsChecked('#enable_redirects');
        $I->dontSeeCheckboxIsChecked('#enable_image_source');
    }

    /**
     * Ensure the secret_key is rolled when a user clicks 'regenerate'.
     */
    public function i_can_regenerate_my_secret_key(AcceptanceTester $I)
    {
        $I->loginAsAdmin();
        $I->amOnFaustWPSettingsPage();

        $old_secret_key = $I->grabValueFrom('wpe_headless[secret_key]');

        $I->click('.content form a.field-action');
        $I->acceptPopup();
        $I->dontSeeInField('wpe_headless[secret_key]', '');
        $I->dontSeeInField('wpe_headless[secret_key]', $old_secret_key);
    }

    /**
     * Ensure that my secret key will not be regnerated if I click 'cancel' on the confirmation.
     */
    public function i_can_cancel_my_secret_key_from_being_regenerated(AcceptanceTester $I)
    {
        $I->loginAsAdmin();
        $I->amOnFaustWPSettingsPage();

        $secret_key = $I->grabValueFrom('wpe_headless[secret_key]');

        $I->click('.content form a.field-action');
        $I->cancelPopup();
        $I->seeInField('wpe_headless[secret_key]', $secret_key);
    }
}
