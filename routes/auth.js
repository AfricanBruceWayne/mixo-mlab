/*
*   The JWT authentication middleware authenticates callers 
*   using a JWT. If the token is valid, req.user will be set 
*   with the JSON object decoded to be used 
*   by later middleware for authorization and access control.
*/ 

var jwt = require('express-jwt');
var secret = require('../config').secret;

// req (Object) - The express request object.
// payload (Object) - An object with the JWT claims.
// done (Function) - A function with signature function(err, secret) to be invoked when the secret is retrieved.
// err (Any) - The error that occurred.
// secret (String) - The secret to use to verify the JWT.

function getTokenFromHeader(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }

  return null;
}

var auth = {
  required: jwt({
    secret: secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;
