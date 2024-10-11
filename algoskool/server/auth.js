require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const passport = require('passport');
const sendEmail = require('./utils/sendEmail');
const crypto = require('crypto');
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

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'No account with that email found.' });
        }

        // Generate a unique reset token
        const token = crypto.randomBytes(20).toString('hex');

        // Set token and expiration on user object
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
        await user.save();

        // Construct reset URL
        const resetURL = `http://localhost:3000/reset-password/${token}`; // Adjust if different

        // Email content
        const subject = 'Password Reset Request';
        const html = `
            <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
            <p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>
            <a href="${resetURL}">${resetURL}</a>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        `;

        // Send the email
        await sendEmail(user.email, subject, html);

        res.status(200).json({ message: 'Password reset link sent to your email.' });
    } catch (error) {
        console.error('Error in forgot-password route:', error);
        res.status(500).json({ message: 'Failed to send reset email. Please try again later.' });
    }
});

// Reset password route (handle password update after receiving the token)
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    
    console.log('Received token:', token);
    console.log('Received password:', password);
    try {
        // Find user by reset token and ensure token is not expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
        }

        // Hash the new password
        const saltRounds = 10; // Define saltRounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Update user's password and remove reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        // Optionally, send a confirmation email
        const subject = 'Your password has been changed';
        const html = `
            <p>Hello,</p>
            <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>
        `;
        await sendEmail(user.email, subject, html);

        res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        console.error('Error in reset-password route:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});



module.exports = router;
