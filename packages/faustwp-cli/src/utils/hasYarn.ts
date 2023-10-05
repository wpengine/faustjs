import process from 'process';
import path from 'path';
import fs from 'fs';

export function hasYarn(cwd = process.cwd()) {
  return fs.existsSync(path.resolve(cwd, 'yarn.lock'));
}
