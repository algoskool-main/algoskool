// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { 
        type: String, 
        required: function() {
            return !this.googleId && !this.githubId; // Password is required if googleId is not present
        }
    }, 
    googleId: { type: String },
    githubId: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;