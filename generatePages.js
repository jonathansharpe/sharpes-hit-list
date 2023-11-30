// generatePages.js
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
  const relativePath = path.relative(srcPath, filePath).replace(/\\/g, '/');
  const entryName = relativePath.replace('/index.html', '');
  acc[entryName] = `./src/${relativePath}`;
  return acc;
}, {});

const viteConfig = {
  build: {
    rollupOptions: {
      input: pages,
    },
  },
  server: {
    open: true,
  },
};

fs.writeFileSync(
  path.join(__dirname, 'test.config.js'),
  `import { defineConfig } from 'vite';\n\nexport default defineConfig(${JSON.stringify(
    viteConfig,
    null,
    2
  )});`
);
