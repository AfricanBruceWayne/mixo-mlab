'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../auth');

// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    login user
// @access  Public
router.post('/login', (req, res) => {

  const { email, password } = req.body;

    if(!email){
        return res.status(422).json({
            errors: { email: "can't be blank" }
        });
      }
    
      if(!password){
        return res.status(422).json({
            errors: { password: "can't be blank" }
        });
      }
    
      passport.authenticate('local', {session: false}, (err, user, info) => {
        if(err) { return next(err); }
    
        if(user) {
          user.token = user.generateJWT();
          return res.json({user: user.toAuthJSON()});
        } else {
          return res.status(422).json(info);
        }
      })(req, res, next);
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

// @route   GET api/auth/logout
// @desc    Get logout route
// @access  Private
router.get('/logout', (req, res) => {
    req.logout();
    req.flash("success", "See you later!");
    res.redirect("/");
});


module.exports = router;