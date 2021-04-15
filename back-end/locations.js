const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const User = users.model;
const validUser = users.valid;

const locationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    // OTHER LOCATION STUFF
    
});