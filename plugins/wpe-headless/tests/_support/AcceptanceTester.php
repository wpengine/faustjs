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
     * Define custom actions here
     */
    public function visitWPEngineHeadlessSettingsPage()
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
