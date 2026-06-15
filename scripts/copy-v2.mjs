import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const aliases = [join('dist', 'v2', 'index.html'), join('dist', 'menu', 'index.html')];
for (const alias of aliases) {
  mkdirSync(dirname(alias), { recursive: true });
  copyFileSync(join('dist', 'index.html'), alias);
  console.log(`copied dist/index.html -> ${alias}`);
}
