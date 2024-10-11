require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const router = express.Router();
const passport = require('passport');


// Google Auth Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/', 
    failureRedirect: 'http://localhost:3000/login' 
}));

// Sign-up route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const existingUser = await User.findOne({
            $or: [{ email }]
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json({
                username: user.username,
                email: user.email
            });
        });
    })(req, res, next);
});

// Logout 
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.json({ message: 'Logged out successfully' });
    });
});

router.get('/current_user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            username: req.user.username,
            email: req.user.email
        });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

module.exports = router;


module.exports = router;
