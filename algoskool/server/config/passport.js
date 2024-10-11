// server/config/passport.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

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