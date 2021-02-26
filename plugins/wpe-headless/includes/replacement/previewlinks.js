window.addEventListener('DOMContentLoaded', () => {
  wp.domReady(() => {
    const intervalId = setInterval(() => {
      const previewButton = document.querySelectorAll(
        'button[class~="block-editor-post-preview__button-toggle"]',
      );

      if (!previewButton) return;
      clearInterval(intervalId);
      previewButton[0].addEventListener('click', () => {
        setTimeout(() => {
          const link = document.querySelector(
            'a[class~="edit-post-header-preview__button-external"]',
          );
          if (!!link && !/\/preview(\/\w|\?)/.test(link.href)) {
            link.href = `${link.protocol}//${link.host}${link.pathname.replace(/\/$/, '')}/preview${link.search}`;
          }
        }, 100);
      });
    }, 100);
  });
});
