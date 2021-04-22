const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const sass = require('sass');

const rootPath = path.resolve(__dirname, '../../');
const sourcesDir = path.join(rootPath, '_sources');
chokidar.watch(sourcesDir).on('all', (event, filepath) => {
  const { dir, name, ext } = path.parse(filepath);
  if (ext !== '.scss') return;
  const cssFile = path.join(rootPath, dir.substring(sourcesDir.length), `${name}.css`);
  switch (event) {
    case "add":
    case "change":
      const result = sass.renderSync({
        file: filepath,
      })
      const css = result.css.toString();
      if (!css) return;
      fs.outputFileSync(cssFile, css);
      console.log(`build: ${filepath} -> ${cssFile}`);
      break;
    case "unlink":
      fs.removeSync(htmlFile);
      console.log(`removed: ${htmlFile}`);
    default:
      break;
  }
});