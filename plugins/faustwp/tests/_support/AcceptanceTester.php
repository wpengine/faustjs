<?php


/**
 * Inherited Methods
 * @method void wantToTest($text)
 * @method void wantTo($text)
 * @method void execute($callable)
 * @method void expectTo($prediction)
 * @method void expect($prediction)
 * @method void amGoingTo($argumentation)
 * @method void am($role)
 * @method void lookForwardTo($achieveValue)
 * @method void comment($description)
 * @method void pause()
 *
 * @SuppressWarnings(PHPMD)
*/
class AcceptanceTester extends \Codeception\Actor
{
    use _generated\AcceptanceTesterActions;

    /**
     * Visit the headless site with optional path.
     *
     * Waits 1 second to allow rendering.
     *
     * @param string $path Optional path to visit.
     */
    public function amOnHeadlessSite($path = '')
    {
        $this->amOnUrl(getenv('HEADLESS_SITE_URL'));

        if ($path) {
            $this->amOnPage($path);
        }

        $this->wait(1);
    }

    /**
     * Visit the Faust settings page.
     */
    public function amOnFaustWPSettingsPage()
    {
        $this->amOnPage('/wp-admin/options-general.php?page=faustwp-settings');
    }

    /**
     * Set a faustwp_settings setting value.
     *
     * @param string $name  The faustwp_settings setting name.
     * @param string $value The faustwp_settings setting value.
     */
    public function haveFaustWPSetting($name, $value = '')
    {
        $options = $this->grabOptionFromDatabase('faustwp_settings') ?: [];
        $options[ $name ] = $value;

        $this->haveOptionInDatabase('faustwp_settings', $options);
    }
}
