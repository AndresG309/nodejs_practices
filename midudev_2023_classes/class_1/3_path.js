const path = require('node:path');

// 1) CREATE ROUTES with path.join

// doing './content/subfolder/test.txt' in NodeJS -> IS WRONG
// Due to Operative System.
// Unix -> /
// Windows -> \

//Check slash separation in ur OS
console.log('Slash separation in this OS: ', path.sep);

// Create routes the right way
// lets create './content/subfolder/test.txt'
const filePath = path.join('content', 'subfolder', 'test.txt');
console.log('Path created: ', filePath);


// 2) Check file name from a route
const baseName = path.basename('/this/is/a/fake/route/test.txt');
console.log('BaseName: ', baseName);

// 2.1) Check filename without the extension
const fileName = path.basename('/this/is/a/fake/route/test.txt', '.txt');
console.log('fileName: ', fileName);

// 3) Check extension in a file
const extension = path.extname('/this/is/a/fake/route/test.txt');
console.log('Extension: ', extension);