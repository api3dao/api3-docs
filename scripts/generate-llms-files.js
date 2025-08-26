const fs = require('fs');
const path = require('path');
const dappsSidebar = require('../docs/dapps/sidebar.js');
const oevSearchersSidebar = require('../docs/oev-searchers/sidebar.js');

const docsDir = path.join(__dirname, '..', 'docs');
const staticDir = path.join(__dirname, '..', 'docs', 'public');
const llmsTxtPath = path.join(staticDir, 'llms.txt');
const llmsFullTxtPath = path.join(staticDir, 'llms-full.txt');

function getMarkdownFiles(items) {
  let files = [];
  for (const item of items) {
    if (item.link) {
      files.push(item.link);
    }
    if (item.items) {
      files = files.concat(getMarkdownFiles(item.items));
    }
  }
  return files;
}

function generateLlmsTxt() {
  let content = '# Api3 Docs\n\n';
  content += `> Api3 Docs helps developers build dApps using Api3 data feeds and searchers recapture oracle extractable value (OEV).\n\n`;

  const sidebars = {
    dapps: dappsSidebar,
    'oev-searchers': oevSearchersSidebar,
  };

  for (const key in sidebars) {
    const sidebar = sidebars[key];
    if (sidebar) {
      content += `## ${key}\n\n`;
      const files = getMarkdownFiles(sidebar);
      for (const file of files) {
        const filePath = path.join(docsDir, `${file}.md`);
        if (fs.existsSync(filePath)) {
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const lines = fileContent.split('\n');
          let title = path.basename(file, '.md');
          for (const line of lines) {
            if (line.startsWith('title: ')) {
              title = line.substring('title: '.length);
              break;
            }
          }
          const url = `https://docs.api3.org${file}`;
          content += `- [${title}](${url.replace(/\/$/, '/index')}.html)\n`;
        } else {
          const indexPath = path.join(docsDir, file, 'index.md');
          if (fs.existsSync(indexPath)) {
            const fileContent = fs.readFileSync(indexPath, 'utf-8');
            const lines = fileContent.split('\n');
            let title = path.basename(file);
            for (const line of lines) {
              if (line.startsWith('title: ')) {
                title = line.substring('title: '.length);
                break;
              }
            }
            const url = `https://docs.api3.org${file}`;
            content += `- [${title}](${url.replace(/\/$/, '/index.html')})\n`;
          }
        }
      }
      content += '\n';
    }
  }

  fs.writeFileSync(llmsTxtPath, content);
  console.log(`Successfully created ${llmsTxtPath}`);
}

function generateLlmsFullTxt() {
  const llmsTxtContent = fs.readFileSync(llmsTxtPath, 'utf-8');
  const links = llmsTxtContent.match(/- \[(.*?)\]\((.*?)\)/g);
  let fullContent = '';
  const pageHeader = '<PageHeader/>\n\n';

  if (links) {
    for (const link of links) {
      const match = link.match(/- \[(.*?)\]\((.*?)\)/);
      if (match) {
        const url = match[2]
          .replace('https://docs.api3.org', '')
          .replace('.html', '.md');
        const filePath = path.join(docsDir, url);
        if (fs.existsSync(filePath)) {
          let fileContent = fs.readFileSync(filePath, 'utf-8');
          const pageHeaderIndex = fileContent.indexOf(pageHeader);
          if (pageHeaderIndex === -1) {
            throw new Error(`Could not find PageHeader in ${filePath}`);
          }
          fileContent = fileContent.substring(
            pageHeaderIndex + pageHeader.length
          );
          fullContent += fileContent + '\n\n';
        }
      }
    }
  }

  fs.writeFileSync(llmsFullTxtPath, fullContent);
  console.log(`Successfully created ${llmsFullTxtPath}`);
}

function main() {
  try {
    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir, { recursive: true });
    }
    generateLlmsTxt();
    generateLlmsFullTxt();
  } catch (err) {
    console.error('Error creating llms files:', err);
    process.exit(1);
  }
}

main();
