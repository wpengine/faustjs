/**
 * XXX: Please remove this once this issue is resolved: https://github.com/WordPress/gutenberg/issues/13998
 */

window.addEventListener('DOMContentLoaded', function () {
  jQuery(document).ready(function () {
    // Get the correct preview link via wp_localize_script
    const previewLink = window._faustwp_preview_link
      ? window._faustwp_preview_link._preview_link
      : undefined;

    /**
     * Check to make sure there is a preview link before continuing, as there may not be a preview link
     * for every instance the block editor is enqueued (e.g. /wp-admin/widgets.php)
     */
    if (!previewLink) {
      return;
    }

    const intervalId = setInterval(function () {
      const wpPreviewLink = jQuery(
        'a[class~="edit-post-header-preview__button-external"]',
      );

      if (!wpPreviewLink.length) {
        return;
      }
      // don't add extra link if the faust preview link and the default WP links are the same
      if (wpPreviewLink.href === previewLink) {
        return;
      }

      clearInterval(intervalId);

      var faustPreviewLink = wpPreviewLink.clone();
      faustPreviewLink[0].href = previewLink;
      faustPreviewLink.html(
        `Preview Headless site <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M18.2 17c0 .7-.6 1.2-1.2 1.2H7c-.7 0-1.2-.6-1.2-1.2V7c0-.7.6-1.2 1.2-1.2h3.2V4.2H7C5.5 4.2 4.2 5.5 4.2 7v10c0 1.5 1.2 2.8 2.8 2.8h10c1.5 0 2.8-1.2 2.8-2.8v-3.6h-1.5V17zM14.9 3v1.5h3.7l-6.4 6.4 1.1 1.1 6.4-6.4v3.7h1.5V3h-6.3z"></path></svg>`,
      );
      faustPreviewLink[0].addEventListener('click', function () {
        wp.data.dispatch('core/editor').autosave();
      });
      faustPreviewLink.insertAfter(wpPreviewLink);
      faustPreviewLink.parent().css('display', 'block');
    }, 100);
  });
});
