<?php

class RedirectsCest
{
	public function i_can_access_wordpress_feeds_with_redirects_enabled(AcceptanceTester $I)
	{
		$I->haveFaustWPSetting( 'enable_redirects', '1' );
		$I->amOnRootWPFeed();
	}
}
