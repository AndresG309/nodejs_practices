/*
IMPORTANT
.js -> Uses CommonJS by default
.mjs -> Uses ES Modules
.cjs -> Uses CommonJS 
*/

// OTHER METHOD OF IMPORTATION
// In EcmaScript modules, it is required to include the file extension (.mjs) in the path
import { sum, sub } from "./sum.mjs";

console.log("Suma", sum(1, 2));

console.log("resta", sub(1, 2));
