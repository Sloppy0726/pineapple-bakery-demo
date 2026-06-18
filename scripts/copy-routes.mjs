import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const routes = [
  join('dist', 'menu', 'index.html'),
  join('dist', 'schedule', 'index.html'),
  join('dist', 'about', 'index.html'),
  join('dist', 'faq', 'index.html'),
  join('dist', 'privacy-policy', 'index.html'),
  join('dist', 'terms-and-conditions', 'index.html')
];

for (const route of routes) {
  mkdirSync(dirname(route), { recursive: true });
  copyFileSync(join('dist', 'index.html'), route);
  console.log(`copied dist/index.html -> ${route}`);
}
