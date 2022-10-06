// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('isomorphic-fetch');

void (async () => {
  const changelogs = [
    {
      url: 'https://raw.githubusercontent.com/wpengine/faustjs/main/packages/core/CHANGELOG.md',
      filename: 'core.md',
    },
    {
      url: 'https://raw.githubusercontent.com/wpengine/faustjs/main/packages/next/CHANGELOG.md',
      filename: 'next.md',
    },
    {
      url: 'https://raw.githubusercontent.com/wpengine/faustjs/main/packages/react/CHANGELOG.md',
      filename: 'react.md',
    },
    {
      url: 'https://raw.githubusercontent.com/wpengine/faustjs/main/plugins/faustwp/CHANGELOG.md',
      filename: 'faustwp.md',
    },
  ];

  try {
    if (!fs.existsSync('./.changelogs')) {
      fs.mkdirSync('./.changelogs');
    }

    await Promise.all(
      changelogs.map(async (changelog) => {
        const res = await fetch(changelog.url);
        fs.writeFileSync(
          `./.changelogs/${changelog.filename}`,
          await res.text(),
        );
      }),
    );

    // eslint-disable-next-line no-console
    console.log('Successfully downloaded changelogs');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('There was an error downloading changelogs', err);
  }
})();
