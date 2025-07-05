const fs = require('node:fs');

console.log('------- READ DIRECTORY ------------');

// Read actual directory:
//Remember: '.' dir is the one where the file is being executed
// (current console route, for example)

fs.readdir('.', (err, files) => {
    if (err) {
        console.log('Error reading directory: ', err);
        return;
    }

    console.log('--- Callback reading');
    files.forEach((file) => {
        console.log(file);
    });
});


// Lets read a directory with an advanced technique
// And using promises
const fsPromise = require('node:fs/promises');
const path = require('node:path');

// Get a folder route from the command or by default use '.'
const folder = process.argv[2] ?? '.';
/* Remember: we use in console 'node index.js' to execute the file 
[0] -> node
[1] -> route to file
[2] -> lets use this position to get the folder
*/

fsPromise.readdir(folder)
    .then((files) => {
        console.log('--- Promise reading');
        files.forEach((file) => {
            const filePath = path.join(folder, file);

            fsPromise.stat(filePath);
        });
    })
    .catch((err) => {
        console.log('Error reading directory: ', err);
    });
