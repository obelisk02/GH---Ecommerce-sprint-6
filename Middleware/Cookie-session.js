const session = require('express-session');
var express = require('express')
  
  //Sesion cookie
  req.session.usuario= email;
  req.session.password= pass;
  res.send(`El usuario ${req.session.usuario} y constrase;a ${req.session.password}`);
  //console.log(`El usuario ${req.session.usuario} y constrase;a ${req.session.password}`)
  console.log(req.session)
  
  var myLogger = function (req, res, next) {
    console.log('LOGGED');
    next();
  }; 
  

  async function cookieValidator (cookies) {
    try {
      await externallyValidateCookie(cookies.testCookie)
    } catch {
      throw new Error('Invalid cookies')
    }
  }