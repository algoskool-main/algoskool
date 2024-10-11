// server/config/passport.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const axios = require('axios');

// Serialize User
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Deserialize User
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id
        });
        await newUser.save();
        done(null, newUser);
    } catch (err) {
        console.error(err);
        done(err, null);
    }
}));

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'usernameOrEmail',
    passwordField: 'password'
},
async (usernameOrEmail, password, done) => {
    try {
        const user = await User.findOne({
            $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
        });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        if (user.password == null) {
            return done(null, false, { message: 'Please log in using Google ' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));


// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Fetch user's emails if not present
        if (!profile.emails || profile.emails.length === 0) {
            const emailsResponse = await axios.get('https://api.github.com/user/emails', {
                headers: {
                    Authorization: `token ${accessToken}`,
                    'User-Agent': 'Your-App-Name'
                }
            });

            if (emailsResponse.data && emailsResponse.data.length > 0) {
                profile.emails = emailsResponse.data.map(emailObj => ({ value: emailObj.email, primary: emailObj.primary, verified: emailObj.verified }));
            }
        }

        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

        if (!email) {
            return done(null, false, { message: 'No email associated with this GitHub account.' });
        }

        const existingUser = await User.findOne({ githubId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        // Optionally, check if the email is already used by another account
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            return done(null, false, { message: 'Email already in use. Please log in using your credentials.' });
        }

        const newUser = new User({
            username: profile.username || profile.displayName || 'GitHubUser',
            email: email,
            githubId: profile.id
        });
        await newUser.save();
        done(null, newUser);
    } catch (err) {
        console.error(err);
        done(err, null);
    }
}));