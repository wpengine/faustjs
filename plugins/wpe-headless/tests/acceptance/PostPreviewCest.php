<?php

class PostPreviewCest
{
    /**
     * Ensure the nodejs site url is set as the post preivew url.
     */
    public function i_can_view_the_post_preview_link(AcceptanceTester $I)
    {
        $post_title = 'Post Preview Post';
        $post_name = 'post-preview-post';
        $front_end_url = 'http://localhost:3000';

        $I->haveWpeHeadlessSetting('frontend_uri', $front_end_url);
        $I->haveWpeHeadlessSetting('secret_key', '3c042434-155d-4612-bce9-fe1de743dc6e');
        $post_id = $I->havePostInDatabase([
            'post_type' => 'post',
            'post_title' => $post_title,
            'post_name' => $post_name,
        ]);

        $I->loginAsAdmin();
        $I->amEditingPostWithId($post_id);
        $I->click('div.components-guide .components-modal__header button.components-button');
        $I->click('button.block-editor-post-preview__button-toggle');
        $I->seeLink(
            'Preview in new tab',
            "${front_end_url}/${post_name}/?preview=true",
        );

        $I->amOnHeadlessSite("${post_name}/?preview=true");
        $I->see('Post Preview Post', 'main.content-single h1');
    }
}
