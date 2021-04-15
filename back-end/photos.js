const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});
const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const photoSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    location: {
        type: mongoose.Schema.ObjectId,
        ref: 'Location'
    },
    path: String,
    title: String,
    review: String,
    rating: Number,
    created: {
      type: Date,
      default: Date.now
    },
  });

  const Photo = mongoose.model('Photo', photoSchema);

  
  // upload photo
router.post("/", validUser, upload.single('photo'), async (req, res) => {
    // check parameters
    if (!req.file)
      return res.status(400).send({
        message: "Must upload a file."
      });
  
    const photo = new Photo({
      user: req.user,
      path: "/images/" + req.file.filename,
      title: req.body.title,
      review: req.body.review,
      rating: req.body.rating,
    });
    try {
      await photo.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });
  
  // get my photos
  router.get("/", validUser, async (req, res) => {
    // return photos
    try {
      let photos = await Photo.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('user');
      return res.send(photos);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  // get my Photos at a location
  router.get("/:locationId/:photoId", validUser, async (req, res) => {
    // return photos
    try {
        let location = await Location.findOne({_id:req.params.locationid});
        let photos = await Photo.find({
            location: location,
            _id:req.params.photoid,
        }).sort({
            created: -1
        }).populate('user');
        return res.send(photos);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  // get location Photos
  router.get("/all/:locationId", validUser, async (req, res) => {
    // return photos
    try {
        let location = await Location.findOne({_id:req.params.locationid});
        let photos = await Photo.find({
            location: location
        }).sort({
            created: -1
        }).populate('user');
        return res.send(photos);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });
  
  // get all photos
  router.get("/all", async (req, res) => {
    try {
      let photos = await Photo.find().sort({
        created: -1
      }).populate('user');
      return res.send(photos);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });
  
  // get one photo
  router.get("/:photoid", async (req, res) => {
    try {
      let photo = await Photo.findOne({_id:req.params.photoid}).populate('user');
      return res.send(photo);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });
  
  module.exports = {
    model: Photo,
    routes: router,
  }