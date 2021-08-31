/**
 * XXX: Please remove this once this issue is resolved: https://github.com/WordPress/gutenberg/issues/13998
 */

window.addEventListener('DOMContentLoaded', function () {
  wp.domReady(function () {
    // Get the correct preview link via wp_localize_script
    const previewLink = window._wpe_headless_preview_link
      ? window._wpe_headless_preview_link._preview_link
      : undefined;

    if (!previewLink) {
      return;
    }

    const intervalId = setInterval(function () {
      const previewButton = document.querySelectorAll(
        'button[class~="block-editor-post-preview__button-toggle"]',
      );

      if (!previewButton) {
        return;
      }

      clearInterval(intervalId);
      previewButton[0].addEventListener('click', function () {
        setTimeout(function () {
          const links = document.querySelectorAll('a[target*="wp-preview"]');

          if (!links) {
            return;
          }

          links.forEach((link) => {
            if (!/\/preview(\/\w|\?)/.test(link.href)) {
              link.href = previewLink;
            }

            var copy = link.cloneNode(true);
            copy.addEventListener('click', function (ev) {
              previewButton[0].click();

              wp.data.dispatch('core/editor').autosave();
            });

            link.parentElement.insertBefore(copy, link);
            link.style.display = 'none';
          });
        }, 100);
      });
    }, 100);
  });
});
