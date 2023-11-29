/**
 * XXX: Please remove this once this issue is resolved: https://github.com/WordPress/gutenberg/issues/13998
 */

document.addEventListener('DOMContentLoaded', function () {
  // Get the preview data via wp_localize_script
  const faustPreviewData = window._faustwp_preview_data;

  /**
   * Check to make sure there is a preview link before continuing, as there may not be a preview link
   * for every instance the block editor is enqueued (e.g. /wp-admin/widgets.php)
   */
  if (!faustPreviewData) {
    return;
  }

  const wpVersion = faustPreviewData._wp_version;
  const faustPreviewLink = faustPreviewData._preview_link;

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func(args);
      }, wait);
    };
  }

  // Handle potential breaking changes from WordPress.
  function getPreviewLinksByVersion(version) {
    switch (version) {
      default:
        return {
          headerLink: document.querySelector(
            '.edit-post-header-preview__grouping-external a',
          ),
          snackbarLink: document.querySelector(
            '.components-snackbar__content a',
          ),
        };
    }
  }

  function updateUIElements() {
    const { headerLink, snackbarLink } = getPreviewLinksByVersion(wpVersion);

    if (headerLink && headerLink.getAttribute('href') !== faustPreviewLink) {
      headerLink.setAttribute('href', faustPreviewLink);
    }

    if (
      snackbarLink &&
      snackbarLink.getAttribute('href') !== faustPreviewLink
    ) {
      snackbarLink.setAttribute('href', faustPreviewLink);
    }
  }

  // Run the update function on initial page load.
  const debouncedUpdateUIElements = debounce(updateUIElements, 300);

  // Observe DOM changes to update UI elements accordingly.
  const observer = new MutationObserver(debouncedUpdateUIElements);
  observer.observe(document.body, { childList: true, subtree: true });
});
