const fs = require('node:fs/promises');
const path = require('node:path');
const pico = require('picocolors');

// Lets create a function that gives us the info of all files in a dir

// Lets create something similar as 'ls' in console
async function ls(directory) {
    let files;

    try {
        files = await fs.readdir(directory);
    } catch (error) {
        console.log(pico.red(`Couldn't read directory ${directory}`));
        process.exit(1);
    }

    const filePromises = files.map(async (file) => {
        const filePath = path.join(directory, file);
        let fileStats;
        try {
            fileStats = await fs.stat(filePath);
        } catch (error) {
            console.log(pico.red(`Couldn't read file ${filePath}`));
            process.exit(1);
        }

        const isDir = fileStats.isDirectory();
        const fileType = isDir ? 'd' : '-';
        const fileSize = fileStats.size;
        const fileModified = fileStats.mtime.toLocaleString();

        // padEnd & padStart to "reserve" some space before or after the value
        return `${fileType} ${pico.blue(file.padEnd(20))} ${pico.green(fileSize.toString().padStart(10))} ${pico.yellow(fileModified)}`;
    });

    const filesInfo = await Promise.all(filePromises);

    filesInfo.forEach((file) => {
        console.log(file);
    });
}

const folder = process.argv[2] ?? '.';
ls(folder);
