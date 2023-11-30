const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src');

function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file === 'index.html') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

const pages = findHtmlFiles(srcPath).reduce((acc, filePath) => {
  const entryName = path.relative(srcPath, filePath).replace(/\\/g, '/').replace('/index.html', '').replace('/home/jonathan/git/sharpes-hit-list/src/', 'root');
  acc[entryName] = filePath;
  return acc;
}, {});

const viteConfig = {
  build: {
    rollupOptions: {
      input: pages,
    },
  },
};

fs.writeFileSync(path.join(__dirname, 'test.config.js'), `import { defineConfig } from 'vite';\n\nexport default defineConfig(${JSON.stringify(viteConfig, null, 2)});`);
