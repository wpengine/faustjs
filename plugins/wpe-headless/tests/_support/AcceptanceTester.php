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
     * Visit the WPE Headless settings page.
     */
    public function amOnWPEngineHeadlessSettingsPage()
    {
        $this->amOnPage('/wp-admin/options-general.php?page=wpe-headless-settings');
    }

    /**
     * Set a wpe_headless setting value.
     *
     * @param string $name  The wpe_headless setting name.
     * @param string $value The wpe_headless setting value.
     */
    public function haveWpeHeadlessSetting($name, $value = '')
    {
        $options = $this->grabOptionFromDatabase('wpe_headless');
        $options[ $name ] = $value;

        $this->haveOptionInDatabase('wpe_headless', $options);
    }
}
