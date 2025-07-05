// All global variables (console, promise, etc...) come from <globalThis> global variable
// console.log(globalThis);

//
//
//
//
//
// ----------- IMPORT MODULES

// With randomName (Check sum.js for explanation)
const randomName = require('./1.1_sum');
console.log('Sum: ', randomName(1, 2));

// With the same defined name (Check multiply.js for explanation)
const { multiply } = require('./1.2_multiply');
console.log('Multiply: ', multiply(1, 2));

// Check this: gives error
try {
    const { randomMultiply } = require('./1.2_multiply');
    console.log(randomMultiply(1, 2));
} catch (error) {
    console.log('Error using ./multiply module with random name:\n', error);
}

//
//
//
//
//
// ----------- NATIVE MODULES
console.log('\n');

//We can do
const deprecated_os = require('os');
//But after node v16 its better to use 'node' prefix
const os = require('node:os');
const { join } = require('node:path');

console.log('OS INFORMATION');
console.log('--------------------------------');

console.log('OS name: ', os.platform());
console.log('OS version: ', os.release());
console.log('Architecture: ', os.arch());
console.log('CPUs: ', os.cpus()); //Usable to scale processes on node
console.log('Free memory: ', os.freemem() / 1024 / 1024, 'MB'); // Divided to get megabytes
console.log('Total memory: ', os.totalmem() / 1024 / 1024, 'MB');
console.log('Uptime: ', os.uptime() / 60 / 60, 'hours'); // Uptime is in seconds, divide to get hours

//
//
//
//
//
// ------------- PROCESS: Global variable

// Entry arguments
console.log(' ---------- Entry arguments ---------');
console.log(process.argv);

// Manage process and its exit
/* this is a comment to not interfere with the rest of the code

process.exit(0); // -> All good, finish
process.exit(1); // -> Something happened, we 'force' the exit

*/

// Control process events
process.on('exit', () => {
    // Do Something
});

// Get current working directory
console.log(process.cwd());

// Get current platform
console.log(process.platform);

// Using environment variables
//Check this example with this command line in console
/*
If MacOS or linux:
    VAR=value node index.js
If windows powershell:
    $env:VAR="value"; node index.js
*/
console.log('env.VAR: ', process.env.VAR);