const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
// const { loadavg } = require('node:os');
const User = users.model;
const validUser = users.valid;

const locationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: String,
    lng: String,
    lat: String,
    description: String,
    placeId: String,
    created: {
        type: Date,
        default: Date.now
    },
    // OTHER LOCATION STUFF

});

// Add a new location
const Location =  mongoose.model('Location', locationSchema);
  router.post("/", validUser, async (req, res) => {
    // check parameters
    const location = new Location({
      user: req.user,
      title: req.body.title,
      lng: req.body.lng,
      lat: req.body.lat,
      placeId: req.body.placeId,
      description: req.body.description,
    });
    try {
      await location.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

// get a user's locations
router.get("/user/:userId", validUser, async (req, res) => {
    // return photos
    try {
        let user = await User.findOne({_id: req.params.userId})
      let locations = await Location.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('user');
      return res.send(locations);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

// get all locations
router.get("/all", async (req, res) => {
    // return locations
    try {
      let locations = await Location.find({}).sort({
        created: -1
      }).populate('user');
      return res.send(locations);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

// get a specific location
router.get("/:locationid", async (req, res) => {
    try {
        let location = await Location.findOne({_id:req.params.locationid}).populate('user');
        return res.send(location);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});


module.exports = {
    model: Location,
    routes: router,
}