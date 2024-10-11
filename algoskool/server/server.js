// server/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./auth');
const MongoStore = require('connect-mongo'); 
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB
mongoose.connect('mongodb://localhost:27017/Students')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
}));
app.use(express.json());
app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/Students' }), // Use your MongoDB URL
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Session expires after 1 day
    }

}));

// Passport configuration इंपोर्ट करें
require('./config/passport');

// Passport मिडलवेयर सेटअप
app.use(passport.initialize());
app.use(passport.session());

// रूट्स
app.use('/api', authRoutes);

// सर्वर शुरू करें
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
