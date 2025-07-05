// CommonJS export modules
 
function multiply(a,b){
    return a*b;
}

//If exported like this
module.exports = {
  multiply, // This connects to the MULTIPLY function because of the same name
};
/*(you could do this too: Use an object)
module.exports = {
  multiply: function multiply(a, b) {
    return a + b;
  },
};
*/

// Then when using the module, its required to use the same name as here