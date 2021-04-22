const path = require('path');
const chokidar = require('chokidar');
const buildEjs = require('./buildEjs');
const buildSass = require('./buildSass');

const rootPath = path.resolve(__dirname, '../../');
const sourcesDir = path.join(rootPath, '_sources');
chokidar.watch(sourcesDir).on('all', (event, filepath) => {
  const { dir, name, ext } = path.parse(filepath);
  switch (event) {
    case 'add':
    case 'change':
      if (ext === '.ejs') buildEjs.onChange(filepath, dir, name);
      if (ext === '.scss') buildSass.onChange(filepath, dir, name);
      break;
    case 'unlink':
      if (ext === '.ejs') buildEjs.onRemove(filepath, dir, name);
      if (ext === '.scss') buildSass.onRemove(filepath, dir, name);
      break;
    default:
      break;
  }
});
