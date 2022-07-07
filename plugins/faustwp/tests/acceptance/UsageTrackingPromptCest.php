<?php

class UsageTrackingPromptCest
{
	/**
     * I can see the prompt notice on activation
     */
    public function i_can_see_the_usage_tracking_prompt_on_activation(AcceptanceTester $I)
    {
        $I->loginAsAdmin();
        $I->amOnPluginsPage();

        // Deactivate plugin and remove settings.
        $I->deactivatePlugin('faustwp');
        $I->dontSeeUserMetaInDatabase([ 'meta_key' => 'faustwp_usage_tracking_dismissed']);

        // Reactivate plugin triggering default settings.
        $I->activatePlugin('faustwp');
		$I->dontSeeUserMetaInDatabase([ 'meta_key' => 'faustwp_usage_tracking_dismissed']);
		$I->seeElementInDOM( '#faustwp_plugin_usage_tracking' );
	}

	/**
     * I can dismiss the prompt notice only once
     */
    public function i_can_dismiss_the_usage_tracking_prompt_once(AcceptanceTester $I)
    {
        $I->loginAsAdmin();
        $I->amOnPluginsPage();

		$I->click( '#faustwp_plugin_usage_tracking > button' );
		$I->wait(4);
		$I->dontSeeElementInDOM( '#faustwp_plugin_usage_tracking' );
		$I->amOnFaustWPSettingsPage();

		$I->click(' #enable_usage_tracking ');
		$I->click( '#submit' );
		$I->wait(2);

		$I->click(' #enable_usage_tracking ');
		$I->click( '#submit' );
		$I->wait(2);
		$I->dontSeeElementInDOM( '#faustwp_plugin_usage_tracking' );
	}
}
