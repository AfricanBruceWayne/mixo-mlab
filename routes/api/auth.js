const express = require('express');
const router = express.Router();
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                    jwt.sign(
                        { id: user.id },
                        process.env.SESSION_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err)
                            {
                                return res.status(400).json({
                                    msg: 'Authentication Failed: ' + err
                                });
                            }
                            res.status(200).json({
                                msg: 
                                {
                                    user: 
                                    {
                                        id: user.id,
                                        name: user.username,
                                        email: user.email
                                    }
                                },
                                token: token
                            });
                        }
                    )
                });
        });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});


module.exports = router;