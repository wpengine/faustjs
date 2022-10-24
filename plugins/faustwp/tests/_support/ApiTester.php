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
class ApiTester extends \Codeception\Actor
{
	use _generated\ApiTesterActions;

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