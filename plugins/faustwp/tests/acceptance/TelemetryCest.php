<?php

class TelemetryCest
{
	/**
	 * Ensure the telemetry endpoint is accessible with the secret key.
	 */
	public function i_can_access_the_telemetry_endpoint_with_secret_key(AcceptanceTester $I)
	{
		$secret_key = '00000000-0000-4000-8000-000000000001';

		$I->haveFaustWPSetting('frontend_uri', 'http://localhost:3000');
		$I->haveFaustWPSetting('secret_key', $secret_key);
		$I->haveHttpHeader('x-faustwp-secret', $secret_key);
		$I->sendPost('/wp-json/faustwp/v1/telemetry', []);
		$I->seeResponseCodeIsSuccessful();
		$I->seeResponseIsJson();
		$I->seeResponseContains('{"faustwp":{"has_frontend_uri":true}}');
	}
}
