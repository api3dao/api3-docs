const fs = require('fs');
const path = require('path');
const config = require('../docs/.vitepress/config.js');

const docsDir = path.join(__dirname, '..', 'docs');
const staticDir = path.join(__dirname, '..', 'docs', 'public');
const llmsTxtPath = path.join(staticDir, 'llms.txt');
const llmsFullTxtPath = path.join(staticDir, 'llms-full.txt');

const sections = Object.entries(config.themeConfig.sidebar).map(([prefix, sidebar]) => ({
  title: config.themeConfig.nav.find((item) => item.link === prefix)?.text ?? prefix,
  sidebar,
}));

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
  let content = `# ${config.title}\n\n`;
  content += `> Documentation for API3, covering ${sections.map((section) => section.title).join(', ')}.\n\n`;

  for (const { title, sidebar } of sections) {
    content += `## ${title}\n\n`;
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
        const url = match[2].replace('https://docs.api3.org', '').replace('.html', '.md');
        const filePath = path.join(docsDir, url);
        if (fs.existsSync(filePath)) {
          let fileContent = fs.readFileSync(filePath, 'utf-8');
          const lines = fileContent.split('\n');
          let pageHeaderValue = '';
          for (const line of lines) {
            if (line.startsWith('pageHeader: ')) {
              pageHeaderValue = line.substring('pageHeader: '.length);
              break;
            }
          }

          const pageHeaderIndex = fileContent.indexOf(pageHeader);
          if (pageHeaderIndex === -1) {
            throw new Error(`Could not find PageHeader in ${filePath}`);
          }
          fileContent = fileContent.substring(pageHeaderIndex + pageHeader.length);
          const titleMatch = fileContent.match(/# (.*)/);
          if (titleMatch && pageHeaderValue) {
            fileContent = fileContent.replace(/# (.*)/, `# ${titleMatch[1]} (${pageHeaderValue})`);
          }
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
