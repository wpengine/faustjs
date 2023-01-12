const fs = require('fs/promises');
const path = require('path');

function storeVersion() {
  console.log();
  const version = require(path.join(
    path.resolve(process.cwd()),
    'package.json',
  ))?.version ?? 'faust';
  const content = `export const LIB_VERSION = '${version}';`;
  fs.writeFile(
    path.join(path.resolve(process.cwd()), 'src', 'version.ts'),
    content,
  ).catch((err) => {
    console.error(err);
  });
}

storeVersion();
