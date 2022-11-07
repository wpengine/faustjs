// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('isomorphic-fetch');

void (async () => {
  const changelogs = [
    {
      url: 'https://raw.githubusercontent.com/wpengine/faustjs/main/packages/faustwp-core/CHANGELOG.md',
      filename: 'faustwp-core.md',
    },
    {
      url: 'https://raw.githubusercontent.com/wpengine/faustjs/main/packages/faustwp-cli/CHANGELOG.md',
      filename: 'faustwp-cli.md',
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
