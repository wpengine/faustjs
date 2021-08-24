const fs = require('fs');
const path = require('path');

const writeFileAsync = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

(async () => {
  try {
    await writeFileAsync(
      path.resolve(process.cwd(), './dist/mjs/package.json'),
      '{\n    "type": "module"\n}\n',
    );
    await writeFileAsync(
      path.resolve(process.cwd(), './dist/cjs/package.json'),
      '{\n    "type": "commonjs"\n}\n',
    );

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
