const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const auth = require('../auth');

router.get('/', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.put('/update', auth.required, (req, res, next) => {
  User.findById(req.payload.id).then((user) => {
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.username !== 'undefined'){
      user.username = req.body.user.username;
    }
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.bio !== 'undefined'){
      user.bio = req.body.user.bio;
    }
    if(typeof req.body.user.image !== 'undefined'){
      user.image = req.body.user.image;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }

    return user.save().then(() => {
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});



// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res, next) => {

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
