const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

const rootPath = path.resolve(__dirname, '../../');
const sourcesDir = path.join(rootPath, '_sources');
module.exports = {
  onChange(filepath, dir, name) {
    if (/_ejsModules/.test(dir)) return;
    const htmlFile = path.join(
      rootPath,
      dir.substring(sourcesDir.length),
      `${name}.html`
    );
    const html = ejs.render(fs.readFileSync(filepath, { encoding: 'utf8' }), {
      filename: filepath,
    });
    fs.outputFileSync(htmlFile, html);
    console.log(`build: ${filepath} -> ${htmlFile}`);
  },
  onRemove(filepath, dir, name) {
    const htmlFile = path.join(
      rootPath,
      dir.substring(sourcesDir.length),
      `${name}.html`
    );
    fs.removeSync(htmlFile);
    console.log(`removed: ${htmlFile}`);
  },
};
