require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const passport = require('passport');
const sendEmail = require('./utils/sendEmail');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = express.Router();
// Google Auth Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/', 
    failureRedirect: 'http://localhost:3000/login' 
}));
// GitHub Auth Routes
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback', passport.authenticate('github', {
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
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return next(err);
        }
        req.session = null; // Clear the session on the server
        res.clearCookie('connect.sid'); // Clear the session cookie (if using express-session)
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


router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    // Here you should generate a token and save it in the database along with the user's email
    const token = 'generatedToken'; // Replace this with your token generation logic

    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    const subject = 'Password Reset Link';
    const html = `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`;

  
    try {
        await sendEmail(email, subject, html);
        return res.status(200).json({ message: 'Password reset link sent to your email.' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to send email.' });
    }
});

// Reset password route (handle password update after receiving the token)
router.post('/reset-password/:token', async (req, res) => {
   
        const { token } = req.params;
        const { password } = req.body;
        try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

    
        if (!user) {
            return res.status(400).json({ message: 'Invalid token or user does not exist.' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password reset successful!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error, please try again.' });
    }
});


module.exports = router;
