<?php

class PostPreviewCest
{
    /**
     * Ensure the nodejs site url is set as the post preview url.
     */
    public function i_can_view_the_post_preview_link(AcceptanceTester $I)
    {
        $post_title = 'Post Preview Post';
        $post_name = 'post-preview-post';
		$post_content = 'Unpublished preview post content.';
        $front_end_url = 'http://localhost:3000';

        $I->haveFaustWPSetting('frontend_uri', $front_end_url);
        $I->haveFaustWPSetting('secret_key', '00000000-0000-4000-8000-000000000001');
        $post_id = $I->havePostInDatabase([
            'post_type' => 'post',
            'post_title' => $post_title,
			'post_content' => $post_content,
            'post_name' => $post_name,
        ]);

        $I->loginAsAdmin();
        $I->amEditingPostWithId($post_id);
        $I->click('button.block-editor-post-preview__button-toggle');
        $I->wait(4); // Wait for previewlinks.js to modify button href.
        $I->seeLink(
            'Preview in new tab',
            "${front_end_url}/${post_name}/?preview=true&previewPathname=" . rawurlencode("/post-preview-post/") . "&p=${post_id}&typeName=Post",
        );

		$I->click('Preview in new tab');
		$I->switchToNextTab();
		$I->wait(14); // Wait for authentication
        $I->see($post_title, 'section h1');
		$I->see($post_content, 'main.content-single .wrap p');
    }
}
