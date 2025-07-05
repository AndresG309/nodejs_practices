// -------------- File System => SUPER IMPORTANT
const fs = require('node:fs');

// File to practice
const path = 'file_system/hello_world.txt';
//idk why but i had to use the full path inside the project

//Some Functions

//
//
//
//
//
console.log('------- STAT ------------');
// 1) STAT

// Stat is used to get the file info
const stats = fs.statSync(path);

console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size // bytes
);

//
//
//
//
//
//
console.log('------- READ FILE SYNC ------------');
// 2) READ FILE SYNC

const text_buffer = fs.readFileSync(path); // This returns a memory buffer of the file
const text_converted = fs.readFileSync(path, 'utf-8');

console.log('File content:\n', text_converted);

//
//
//
//
//
//
console.log('------- READ FILE ------------');
// 3) READ FiLE -> asynchronous

// All that process was SYNCHRONOUS, so it blocks the program.
// To avoid that, we use asynchronous methods

console.log('\n\n\n --Callbacks\n');
// ____ 3.1) CALLBACKS

// here we use a 3rd param for the callback
//The callback is (error, text after reading)
fs.readFile(path, 'utf-8', (err, text) => {
    console.log('First async text:\n', text);
});

console.log('I am doing things after started reading file 1');

console.log('\n\n\n --Promises\n');
// ____ 3.2) PROMISES

// Node has a module to use filesystem with promises
const fsPromise = require('node:fs/promises');
//Importation with EcmaScript modules:
// import { readFile } from 'node:fs/promises'

const path2 = 'file_system/second_text.txt';

console.log('I am doing things before started reading file 2');

fsPromise.readFile(path2, 'utf-8').then((text) => {
    console.log('Second Async text:\n', text);
});

console.log('I am doing things after started reading file 2');

console.log('\n\n\n --Promisify function\n');
// ____ 3.3) Promisify function. Don't use if node:fs/promises is available
// Converts into a promise the 'node:fs' async readFile function:

const { promisify } = require('node:util');
const readFileWithPromisify = promisify(fs.readFile);

readFileWithPromisify(path2, 'utf-8').then((text) => {
    console.log('Async text reading with promisify:\n', text);
});

console.log('\n\n\n --readFile with await\n');
// ____ 3.4) Using readFile with AWAIT

// This will return error because CommonJS don't support AWAIT in their function bodies
/*
const await_text_1 = await fs.readFile(path, 'utf-8');
console.log('Await text 1:\n', await_text_1);

const await_text_2 = await fs.readFile(path2, 'utf-8');
console.log('Await text 2:\n', await_text_2);
*/

// Meanwhile, EcmaScript Modules have something called "Top Level Await"
// and that property makes them able to use await in their function bodies

/*
// Using Await in ES Modules

import { readFile } from 'node:fs/promises'

const await_text_1 = await readFile(path, 'utf-8');
console.log('Await text 1:\n', await_text_1);


const await_text_2 = await readFile(path2, 'utf-8');
console.log('Await text 2:\n', await_text_2);
*/

// Anyways, its possible to solve this problem with CommonJS
// Using an auto invocable function

const { readFile } = require('node:fs/promises');

// IIFE - Immediately Invoked Function Expression
/*
construction
(
    (params) => {body}
)();
*/
// Here we make the function asynchronous with 'async'
(async () => {
    const await_text_1 = await readFile(path, 'utf-8');
    console.log('Await text 1:\n', await_text_1);

    const await_text_2 = await readFile(path2, 'utf-8');
    console.log('Await text 2:\n', await_text_2);
})();
