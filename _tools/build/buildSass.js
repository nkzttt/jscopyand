const fs = require('fs-extra');
const path = require('path');
const sass = require('sass');

const rootPath = path.resolve(__dirname, '../../');
const sourcesDir = path.join(rootPath, '_sources');
module.exports = {
  onChange(filepath, dir, name) {
    if (/_modules/.test(dir)) return;
    const cssFile = path.join(
      rootPath,
      dir.substring(sourcesDir.length),
      `${name}.css`
    );
    const result = sass.renderSync({
      file: filepath,
    });
    const css = result.css.toString();
    if (!css) return;
    fs.outputFileSync(cssFile, css);
    console.log(`build: ${filepath} -> ${cssFile}`);
  },
  onRemove(filepath, dir, name) {
    const cssFile = path.join(
      rootPath,
      dir.substring(sourcesDir.length),
      `${name}.css`
    );
    fs.removeSync(cssFile);
    console.log(`removed: ${cssFile}`);
  },
};
