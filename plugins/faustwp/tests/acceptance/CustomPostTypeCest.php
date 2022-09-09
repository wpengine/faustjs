<?php

class CustomPostTypeCest
{

	public function _before(AcceptanceTester $I)
	{
		$I->loginAsAdmin();
		$I->amOnPluginsPage();
		$I->seePluginDeactivated('test-cpt-plugin');
		$I->activatePlugin('test-cpt-plugin');
	}

	public function _after(AcceptanceTester $I)
	{
		$I->loginAsAdmin();
		$I->amOnPluginsPage();
		$I->seePluginActivated('test-cpt-plugin');
		$I->deactivatePlugin('test-cpt-plugin');
	}
	/**
	 * Ensure the nodejs site url is set as the custom post type preview url.
	 */
	public function i_can_view_the_custom_post_type_preview_link(AcceptanceTester $I)
	{
		$cpt_title = 'CPT Document Preview';
		$cpt_name = 'cpt-document-preview';
		$cpt_content = 'Unpublished preview document content.';
		$front_end_url = 'http://localhost:3000';
		$cpt_id = $I->havePostInDatabase([
			'post_type' => 'document',
			'post_title' => $cpt_title,
			'post_content' => $cpt_content,
			'post_name' => $cpt_name,
		]);

		$I->loginAsAdmin();
		$I->amEditingPostWithId($cpt_id);

		$I->click('div.components-guide .components-modal__header button.components-button');
		$I->click('button.block-editor-post-preview__button-toggle');
		$I->wait(4); // Wait for previewlinks.js to modify button href.
		$I->seeLink(
			'Preview in new tab',
			"${front_end_url}/document/${cpt_name}/?preview=true&previewPathname=" . rawurlencode("/document/cpt-document-preview/") . "&p=${cpt_id}&typeName=Document",
		);
	}
}
