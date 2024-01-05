<?php

class DenyPublicAccessCest
{
	/**
	 * Ensure robots.txt is accessible on the WP site and is not redirected when
	 */
	public function i_can_view_robots_txt_when_redirects_are_enabled(AcceptanceTester $I)
	{
		$robots = 'robots.txt';
		$robots_first_line = 'User-agent: *';
		$robots_second_line = 'Disallow: /wp-admin/';
		$I->haveFaustWPSetting('enable_redirects', 1);
		$I->loginAsAdmin();
		$I->amOnPage($robots);
		$I->see($robots_first_line);
		$I->see($robots_second_line);
	}
}
