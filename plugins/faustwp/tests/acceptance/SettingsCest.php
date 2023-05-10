<?php

class SettingsCest
{
    /**
     * Ensure the Faust settings page is available.
     */
    public function i_can_access_the_settings_page(AcceptanceTester $I)
    {
        $I->loginAsAdmin();
        $I->amOnFaustWPSettingsPage();
        $I->see('Faust by WP Engine');
    }

    /**
     * Ensure the Faust default settings are set when the plugin is
     * activated for the first time.
     */
    public function i_can_see_the_default_settings(AcceptanceTester $I)
    {
        $I->loginAsAdmin();
        $I->amOnPluginsPage();

        // Deactivate plugin and remove settings.
        $I->deactivatePlugin('faustwp');
        $I->dontHaveOptionInDatabase('faustwp_settings');

        // Reactivate plugin triggering default settings.
        $I->activatePlugin('faustwp');

        $settings = $I->grabOptionFromDatabase('faustwp_settings');

        $I->amOnFaustWPSettingsPage();
        $I->seeInField('faustwp_settings[frontend_uri]', '');
        $I->seeInField('faustwp_settings[secret_key]', $settings['secret_key']);
        $I->seeInField('faustwp_settings[menu_locations]', 'Primary, Footer');
        $I->dontSeeCheckboxIsChecked('#disable_theme');
        $I->seeCheckboxIsChecked('#enable_rewrites');
        $I->seeCheckboxIsChecked('#enable_redirects');
        $I->dontSeeCheckboxIsChecked('#enable_image_source');
    }

    /**
     * Ensure the frontend_uri is updated when the user saves a valid value.
     */
    public function i_can_update_my_frontend_uri(AcceptanceTester $I) {
        $I->loginAsAdmin();
        $I->amOnFaustWPSettingsPage();

        $new_frontend_uri = 'http://headless.example.com';

        $I->dontSeeInField('faustwp_settings[frontend_uri]', $new_frontend_uri);
        $I->fillField('faustwp_settings[frontend_uri]', $new_frontend_uri);

        $I->click("Save Changes");

        $I->see("Settings saved.");
        $I->seeInField('faustwp_settings[frontend_uri]', $new_frontend_uri);
    }

    /**
     * Ensure the frontend_uri is updated when the user saves a valid value.
     */
    public function i_see_no_trailing_slash_when_saving_frontend_uri_with_a_trailing_slash(AcceptanceTester $I) {
        $I->loginAsAdmin();
        $I->amOnFaustWPSettingsPage();

        $new_frontend_uri = 'http://headless.example.com/';

        $I->dontSeeInField('faustwp_settings[frontend_uri]', $new_frontend_uri);
        $I->fillField('faustwp_settings[frontend_uri]', $new_frontend_uri);

        $I->click("Save Changes");

        $I->see("Settings saved.");
        $I->seeInField('faustwp_settings[frontend_uri]', rtrim( $new_frontend_uri, '/\\' ));
    }

    /**
     * Ensure the frontend_uri is not updated and an error message is shown when
     * the user saves an invalid value.
     */
    public function i_see_errors_when_saving_invalid_frontend_uri(AcceptanceTester $I) {
        $I->loginAsAdmin();
        $I->amOnFaustWPSettingsPage();

        $settings = $I->grabOptionFromDatabase('faustwp_settings');
        $new_frontend_uri = 'headless.example.com';

        $I->dontSeeInField('faustwp_settings[frontend_uri]', $new_frontend_uri);
        $I->fillField('faustwp_settings[frontend_uri]', $new_frontend_uri);

        $I->click("Save Changes");

        $I->see("Please enter a valid URL.");
        $I->seeInField('faustwp_settings[frontend_uri]', $settings['frontend_uri']);
    }

    /**
     * Ensure the secret_key is rolled when a user clicks 'regenerate'.
     */
    public function i_can_regenerate_my_secret_key(AcceptanceTester $I)
    {
        $I->loginAsAdmin();
        $I->amOnFaustWPSettingsPage();

        $old_secret_key = $I->grabValueFrom('faustwp_settings[secret_key]');

        $I->click('.content form a.field-action');
        $I->acceptPopup();
        $I->dontSeeInField('faustwp_settings[secret_key]', '');
        $I->dontSeeInField('faustwp_settings[secret_key]', $old_secret_key);
    }

    /**
     * Ensure that my secret key will not be regnerated if I click 'cancel' on the confirmation.
     */
    public function i_can_cancel_my_secret_key_from_being_regenerated(AcceptanceTester $I)
    {
        $I->loginAsAdmin();
        $I->amOnFaustWPSettingsPage();

        $secret_key = $I->grabValueFrom('faustwp_settings[secret_key]');

        $I->click('.content form a.field-action');
        $I->cancelPopup();
        $I->seeInField('faustwp_settings[secret_key]', $secret_key);
    }
}
