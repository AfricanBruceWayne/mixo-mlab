'use strict';

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const passport = require('passport');
const validator = require('validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/register', (req, res, next) => {

  const { username, email, password } = req.body;

   // Simple validation
   if(!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const newUser = new User({
    username: username,
    email: email,
    password: password
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists.' });
      return res.status(400).json({ msg: err });
    }
    newUser.save((err) => {
      if (err) { return next(err); }
      req.logIn(newUser, (err) => {
        if (err) {
          return next(err);
        }
      });
      res.status(200).json({ msg: 'Welcome To Mixo: ' + newUser.username });
    });
  });
  
});

module.exports = router;
