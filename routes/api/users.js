const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const auth = require('../auth');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/register', (req, res, next) => {

  const validationErrors = [];
  const { username, email, password } = req.body;

  // Simple validation
  if (!validator.isEmail(email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (!validator.isLength(password, { min: 6 })) validationErrors.push({ msg: 'Password must be at least 6 characters' });

  User.findOne({ email })
    .exec()
    .then(existingUser => {
      if (existingUser) 
      {
        return res.status(400).json({
          msg: 'User already exists'
        });
      }

        const newUser = new User({
          username,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if  (err)
            {
              return res.status(400).json({
                error: 'Something went wrong, ' + err
              });
            } else 
            {
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  jwt.sign(
                    { id: user.id },
                    process.env.SESSION_SECRET,
                    { expiresIn: 3600 },
                    (err, token) => {
                      if (err)
                      {
                        res.status(400).json({
                          error: err
                        });
                      }
                      res.status(201).json({
                        token,
                        user: 
                        {
                          id: user.id,
                          username: user.username,
                          email: user.email
                        },
                        msg: 'Account Created Successfully'
                      });
                    }
                  )
                });
            }
          });
        });
    });
});

module.exports = router;
