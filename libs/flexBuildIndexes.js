/**
 * See /dev/flexsearch.md
 */

const yaml = require('js-yaml');
const fs = require('fs');
var file = require('file');
const fse = require('fs-extra');
const { Index } = require('flexsearch');
const parse = require('html-dom-parser');

let directoriesArr = [];
let id = 1; // Used as the id for each page added to the index
let indexAllDev = new Index({
  tokenize: 'full',
});
let indexAll = new Index({
  tokenize: 'full',
});
let indexLatest = new Index({
  tokenize: 'full',
});

// The latest docsets
let latestDocsets = [
  '/dist/explore/',
  '/dist/guides/',
  '/dist/reference/qrng',
  '/dist/reference/dapis/',
  '/dist/reference/dao-members/',
  '/dist/reference/ois/latest/',
  '/dist/reference/airnode/latest/',
];

/**
 * Callback for file.walkSync, add each
 * @param {*} dirPath
 * @param {*} dirs
 * @param {*} files
 */
function walkCB(dirPath, dirs, files) {
  directoriesArr.push({ dir: dirPath, files: files });
}

/**
 * --------------------------------------------------------------
 * Build the content json files used to create FlexSearch indexes.
 * Get the innerText from the html and create a
 * content page for the html page in /indexes/content-files
 * --------------------------------------------------------------
 */
async function buildContentFile(path) {
  const contentDir = 'indexes/content-files';
  let plainText = ''; // Populated by the function processBaseObj(obj)

  /**
   * This function parses all the elements in the parsed file between FLEX markers
   * @param  obj
   */
  async function processBaseObj(obj) {
    if (obj.type === 'text') {
      plainText += ' ' + obj.data;
    } else if (obj.type === 'comment') {
      // skip it
    } else if (!obj.children) {
      console.log(' NO CHILDREN');
    } else if (obj.type) {
      // Look out for <a> elements without children in the above line of code.
      // May need to change: else if (obj.type&& obj.children)

      for (let i = 0; i < obj.children.length; i++) {
        let child = obj.children[i];
        if (child.type === 'text') {
          plainText += ' ' + child.data;
        } else if (child.children) {
          for (let z = 0; z < child.children.length; z++) {
            await processBaseObj(child.children[z]);
          }
        }
      }
    }
  }

  // Make sure the /flexContentFiles dir exists
  fse.ensureDirSync(contentDir);

  // contentPath: the file with extracted HTML text
  let parsedPath = path.split('/.vitepress/dist')[1];
  let contentPath = contentDir + parsedPath.replace('.html', '.json');

  // The frontmatter and url ex: /explore
  const pathMarkdown =
    'docs/' + path.split('docs/.vitepress/dist/')[1].replace('.html', '.md');
  let frontmatter = yaml.load(
    fs.readFileSync(pathMarkdown, 'utf8').split('---')[1]
  );

  // Get the html
  let htmlString = fs.readFileSync(path, 'utf8');

  // Parse the content between the flex tags.
  let s = htmlString.split('>FLEX_START_TAG</span>')[1]; // From <FlexStartTag/>

  // Wrap the content with a div element
  let parsedHtml =
    '<div>' + s.split('<span class="api3-flex-end-tag"')[0] + '</div>'; // From <FlexEndTag/>
  // Parse with html-dom-parser to get the JSON object
  let obj = parse(parsedHtml);
  // Start the process of text extraction
  await processBaseObj(obj[0]); // Zero is the outer div we added above

  // Remove excessive spaces, line feeds, ====, and -----
  plainText = plainText.replace(/=====/g, '');
  plainText = plainText.replace(/-----/g, '');
  plainText = plainText.replace(/&#39;/g, "'"); //'
  plainText = plainText.replace(/\n/g, '');
  plainText = plainText.replace(/    /g, ' ');
  plainText = plainText.replace(/   /g, ' ');
  plainText = plainText.replace(/  /g, ' ');

  // Updates the lookup file so search can find the page by its ID
  await addToFrontmatter(id, frontmatter);

  // Create the json object and write file to /indexes/content-files/ dir
  let json = {
    id: id,
    content: plainText,
  };
  fse.outputFileSync(contentPath, JSON.stringify(json));

  // ----------------------------------
  // ----- START > add to indexes -----
  // Update the in memory flexSearch indexes to be exported later
  // Exclude the docset /dev

  // All files (from all docsets) go into indexAllDev including /next
  indexAllDev.add(id, json.content);

  // All files (from all docsets) go into indexAll excluding /next
  if (path.indexOf('/next/') === -1) {
    indexAll.add(id, json.content);
  }

  // Only add path within the latest docsets
  latestDocsets.forEach((element) => {
    if (path.indexOf(element) > -1) {
      indexLatest.add(id, json.content);
    }
  });
  // ----- END > add to indexes -----
  // --------------------------------

  id++;
}

/*
  Updates the frontmatterIds file so search can find the page by its ID
*/
let frontmatterObj = {};
async function addToFrontmatter(id, frontmatter) {
  frontmatterObj[id] = frontmatter;
}

/*
  Export all flex indexes to disk /public/indexes/all
*/
function exportAllDevIndexFiles() {
  indexAllDev.export((key, data) => {
    let dir = 'docs/public/indexes/all-dev';
    const path = `${dir}/${key}.json`;
    fse.writeFileSync(path, data !== undefined ? data : '');
    outputFileSize(path);
  });
}

function exportAllIndexFiles() {
  indexAll.export((key, data) => {
    let dir = 'docs/public/indexes/all';
    const path = `${dir}/${key}.json`;
    fse.writeFileSync(path, data !== undefined ? data : '');
    outputFileSize(path);
  });
}

function exportLatestIndexFiles() {
  indexLatest.export((key, data) => {
    let dir = 'docs/public/indexes/latest';
    const path = `${dir}/${key}.json`;
    fse.writeFileSync(path, data !== undefined ? data : '');
    outputFileSize(path);
  });
}

function outputFileSize(path) {
  var stats = fs.statSync(path);
  var fileSizeInBytes = stats.size;
  // Convert the file size to megabytes
  var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
  console.log(' >', path, fileSizeInMegabytes, 'MB');
}

/*
  Load all HTML files from /docs/.vitepress/dist 
*/
async function start() {
  console.log('> Creating content pages in /indexes/content-files/');
  file.walkSync('./docs/.vitepress/dist', walkCB);

  // It is important that the file have the FLEX_START_TAG in it.
  // Some markdown files exist to be included inside others and
  // do not contain frontmatter.
  const inclusiveFiles = ['chains-list.html'];
  const skipFiles = [
    './docs/.vitepress/dist/index.html',
    './docs/.vitepress/dist/team.html',
    './docs/.vitepress/dist/404.html',
  ];
  console.log('Skip files:');
  console.log(skipFiles);
  // For each directory in directoriesArr, will list its files with inner loop below
  for (let i = 0; i < directoriesArr.length; i++) {
    const dir = directoriesArr[i].dir;
    const files = directoriesArr[i].files;

    // For each file in directoriesArr, excluding docset /dev
    for (let x = 0; x < files.length; x++) {
      if (
        files[x].indexOf('.html') > -1 &&
        !skipFiles.includes(dir + '/' + files[x]) &&
        dir.indexOf('/dist/dev') === -1
      ) {
        // If the md file is an inclusive file do not build a content file for it.
        // Its content will be part of its parent file.
        if (!inclusiveFiles.includes(files[x])) {
          try {
            await buildContentFile(dir + '/' + files[x]);
          } catch (err) {
            console.log('>>> ERROR');
            console.error(dir + '/' + files[x]);
            console.error(err);
          }
        }
      }
    }
  }
  console.log('\n> Finishing');

  console.log(
    '> Creating "all-dev" files in /public/indexes/all-dev (async operation *)'
  );
  exportAllDevIndexFiles();

  console.log(
    '> Creating "all" files in /public/indexes/all (async operation *)'
  );
  exportAllIndexFiles();

  console.log(
    '> Creating "latest" files in  /public/indexes/latest (async operation *)'
  );
  exportLatestIndexFiles();

  console.log('> Creating frontmatterIds file in /.vitepress/');
  fs.writeFileSync(
    'docs/.vitepress/frontmatterIds.json',
    JSON.stringify(frontmatterObj)
  );
}

console.log('\n----- Building FlexSearch Indexes -----');
fse.ensureDirSync('docs/public/indexes/all-dev');
fse.ensureDirSync('docs/public/indexes/all');
fse.ensureDirSync('docs/public/indexes/latest');

start();
