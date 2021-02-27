/**
 * XXX: Please remove this once this issue is resolved: https://github.com/WordPress/gutenberg/issues/13998
 */

window.addEventListener('DOMContentLoaded', function () {
  wp.domReady(function () {
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
          const links = document.querySelectorAll(
            'a[target*="wp-preview"]',
          );

		  if (!links) {
			  return;
		  }

		  links.forEach((link) => {
			if (!/\/preview(\/\w|\?)/.test(link.href)) {
			  link.href =
				link.protocol +
				'//' +
				link.host +
				link.pathname.replace(/\/$/, '') +
				'/preview' +
				link.search;
			}

			var copy = link.cloneNode(true);
			copy.addEventListener('click', function(ev) {
				previewButton[0].click();

				wp.data.dispatch('core/editor')
					.autosave();
			});

			link.parentElement.insertBefore(copy, link);
			link.style.display = 'none';
		  });
        }, 100);
      });
    }, 100);
  });
});
