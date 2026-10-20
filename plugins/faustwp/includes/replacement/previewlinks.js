/**
 * Points the block editor's save notice link at the Faust.js preview.
 *
 * After saving a post that isn't public yet, the save notice ("View Post",
 * "View Page", etc.) links to the post's permalink, which the frontend can't
 * show. The editor's Preview button doesn't need this: it reads the preview
 * link from the REST API, which FaustWP already rewrites.
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

  // The save notice's ID changed from SAVE_POST_NOTICE_ID to editor-save in
  // newer versions of the block editor.
  const saveNoticeIds = ['editor-save', 'SAVE_POST_NOTICE_ID'];

  // Only the editor's own save notice is rewritten. Its link is found by the
  // URL in the notice's action, so links in other plugins' notices are left
  // alone.
  function getSaveNoticeLinks() {
    const notices =
      window.wp?.data?.select('core/notices')?.getNotices() || [];
    const saveNotice = notices.find((notice) =>
      saveNoticeIds.includes(notice.id),
    );
    const noticeUrl = saveNotice?.actions?.[0]?.url;

    if (!noticeUrl) {
      return [];
    }

    return Array.from(
      document.querySelectorAll('.components-snackbar__action'),
    ).filter((link) => link.getAttribute('href') === noticeUrl);
  }

  // Once a post is public, the save notice's link goes to the live post, so
  // only rewrite it before then. Private and scheduled posts keep the preview
  // link, since the frontend can't show them to visitors.
  function isPostPublic() {
    const editor = window.wp?.data?.select('core/editor');
    return editor
      ? editor.getCurrentPostAttribute('status') === 'publish'
      : false;
  }

  function updateSaveNoticeLinks() {
    if (isPostPublic()) {
      return;
    }

    getSaveNoticeLinks().forEach((link) => {
      link.setAttribute('href', faustPreviewLink);
    });
  }

  // The save notice is rendered after each save, so check again whenever the
  // editor's DOM changes.
  const debouncedUpdateSaveNoticeLinks = debounce(updateSaveNoticeLinks, 300);
  const observer = new MutationObserver(debouncedUpdateSaveNoticeLinks);
  observer.observe(document.body, { childList: true, subtree: true });
});
