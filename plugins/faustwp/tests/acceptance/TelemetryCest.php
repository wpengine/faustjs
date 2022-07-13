<?php

class TelemetryCest
{
	/**
	 * Ensure the nodejs site url is set as the post preview url.
	 */
	public function i_can_access_the_telemetry_endpoint(AcceptanceTester $I)
	{
		$I->haveFaustWPSetting('frontend_uri', 'http://localhost:3000');
		$I->haveFaustWPSetting('secret_key', '00000000-0000-4000-8000-000000000001');
	}
}
