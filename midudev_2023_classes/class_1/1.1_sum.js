// CommonJS export modules

function sum(a, b) {
  return a + b;
}

//If the module is exported like this
module.exports = sum;
// then when you use it on other scripts you can use whatever name you want

// Continue explanation on multiply.js