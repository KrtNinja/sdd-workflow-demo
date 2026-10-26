// Собирает assets/content.js: все markdown/yaml примера вшиваются в страницу,
// чтобы index.html работал и на GitHub Pages, и открытым как локальный файл.
// Запуск: node scripts/build.mjs
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const include = ['AGENTS.md', 'docs', 'contracts', 'examples', 'openspec'];
const exts = ['.md', '.yaml', '.yml'];
const files = {};

const walk = (p) => {
  const st = statSync(p);
  if (st.isDirectory()) return readdirSync(p).sort().forEach((n) => walk(join(p, n)));
  if (exts.some((e) => p.endsWith(e))) files[relative(root, p).split(sep).join('/')] = readFileSync(p, 'utf8');
};
include.forEach((p) => walk(join(root, p)));

mkdirSync(join(root, 'assets'), { recursive: true });
writeFileSync(
  join(root, 'assets/content.js'),
  '// Сгенерировано scripts/build.mjs — не править руками\nwindow.SDD_FILES = ' + JSON.stringify(files, null, 1) + ';\n',
);
console.log(`assets/content.js: ${Object.keys(files).length} файлов`);
