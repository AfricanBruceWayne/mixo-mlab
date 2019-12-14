'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/register', (req, res, next) => {

  const { username, email, password } = req.body;

  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) return res.status(400).json({ msg: 'User already exists' });

        const newUser = new User();
        
        newUser.username = username;
        newUser.email = email;
        newUser.setPassword(password);

        newUser.save()
          .then(() => {
            return res.json({ 
              newUser: newUser.toAuthJSON()
             });
          })
          .catch(next);
    });
});

module.exports = router;
