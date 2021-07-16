const fs = require('fs');
const path = require('path');
const { EOL } = require('os');
const corePkg = require('../packages/core/package.json');
const nextPkg = require('../packages/next/package.json');
const reactPkg = require('../packages/react/package.json');

async function writeFileAsync(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

const packages = [
  { name: 'core', value: corePkg },
  { name: 'next', value: nextPkg },
  { name: 'react', value: reactPkg },
];

console.info(`Using core version: ${corePkg.version}`);
console.info(`Using next version: ${nextPkg.version}`);
console.info(`Using react version: ${reactPkg.version}`);

reactPkg.dependencies['@faustjs/core'] = `^${corePkg.version}`;
nextPkg.dependencies['@faustjs/core'] = `^${corePkg.version}`;
nextPkg.dependencies['@faustjs/react'] = `^${reactPkg.version}`;

(async () => {
  try {
    await Promise.all(
      packages.slice(1).map((pkg) => {
        return writeFileAsync(
          path.resolve(__dirname, `../packages/${pkg.name}/package.json`),
          `${JSON.stringify(pkg.value, null, 2)}${EOL}`,
        );
      }),
    );
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
