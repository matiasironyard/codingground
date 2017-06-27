'use strict';

// Require Crypto module
var crypto = require('crypto');

// Set configuration parameters.

var config = {
    salt: function(length){
    // 'Math.ceil(length * 3 / 4)' generates a base64 value.
    return crypto.randomBytes(Math.ceil(32 * 3 / 4)).toString('base64').slice(0, length);
    // If returning a value in hex format, do the following:
    // return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0, length);
    },
    iterations: 20000,
    keylen: 512,
    digest: 'sha512'
};


// ei = encryption item.
var ei = function(password, salt){
  var hash = crypto.pbkdf2Sync(password, salt, config.iterations, config.keylen, config.digest); // Pass in password, salt, iterations, keylength, and algorithm (sha256 or sha512),.
  //hash.update(password); // Update password.
  var hashedPassword = hash.toString('base64');
  // If using hex, do the following:
  // var hashedPassword = hash.toString('hex');
  return { salt: salt, hashedPassword: hashedPassword, iterations: config.iterations };
};



// Generate hash
function hashPassword(passwordinput){
  var salt = config.salt(32); // Pass in salt length
  var encPassword = ei(passwordinput, salt); // encrypt password using algorithm and salt.
  //TODO: save encrypted password.
  //TODO: save salt.
  //TODO: save iterations.
  console.log('Hashed password: ', encPassword.hashedPassword);
  console.log('Salt: ', encPassword.salt );
  console.log('Iterations: ', encPassword.iterations );
}

// For Demonstration purposes:
// Call hashPassword passing in password input.

hashPassword('password123!');