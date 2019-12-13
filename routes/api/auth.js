'use strict';

const express = require('express');
const router = express.Router();
const validator = require('validator');
const passport = require('passport');
const auth = require('../auth');

// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    login user
// @access  Public
router.post('/login', (req, res) => {

    const { email, password } = req.body;
    const validationErrors = [];

    // Simple validation
    if (!validator.isEmail(email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
    if (!validator.isLength(password, { min: 6 })) validationErrors.push({ msg: 'Password must be at least 6 characters' });

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User Does not exist' });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) 
                    return res.status(400).json({ 
                        msg: 'Invalid credentials' 
                    });

                    passport.authenticate('local', {session: false}, (err, user, info) => {
                        if(err){ return next(err); }
                    
                        if(user){
                          user.token = user.generateJWT();
                          return res.json({user: user.toAuthJSON()});
                        } else {
                          return res.status(422).json(info);
                        }
                      })(req, res, next);
                });
        });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth.required, (req, res, next) => {
    User.findById(req.payload.id)
       .then((user) => {
           if (!user) 
           {
               return res.sendStatus(401);
           }
           return res.json({ user: user.toAuthJSON() });
       }).catch(next);
});


module.exports = router;