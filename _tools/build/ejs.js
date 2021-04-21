const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const ejs = require('ejs');

const rootPath = path.resolve(__dirname, '../../');
const sourcesDir = path.join(rootPath, '_sources');
chokidar.watch(sourcesDir).on('all', (event, filepath) => {
  const { dir, name, ext } = path.parse(filepath);
  if (ext !== '.ejs') return;
  const htmlFile = path.join(rootPath, dir.substring(sourcesDir.length), `${name}.html`);
  switch (event) {
    case "add":
    case "change":
      const html = ejs.render(fs.readFileSync(filepath, { encoding: 'utf8' }));
      fs.outputFileSync(htmlFile, html);
      console.log(`build: ${filepath} -> ${htmlFile}`);
      break;
    case "unlink":
      fs.removeSync(htmlFile);
      console.log(`removed: ${htmlFile}`);
    default:
      break;
  }
});