const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const photos = require("./photos.js");
const Photo = photos.model;
// const validPhoto = photos.valid;
const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const commentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    photo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Photo'
    },
    comment: String,
    helpful: Number,
    unhelpful: Number,
    created: {
      type: Date,
      default: Date.now
    },
  });
  
  const Comment = mongoose.model('Comment', commentSchema);

  // upload photo
  router.post("/:photoid", validUser, async (req, res) => {
    // check parameters
    try {
        let photo = await Photo.findOne({_id:req.params.photoid});
        let comment = new Comment({
            user: req.user,
            photo: photo,
            comment: req.body.comment,
            helpful: req.body.helpful,
            unhelpful: req.body.unhelpful,
        });
        await comment.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error saving comment."
        });
    }
  });
  
  // get all comments for a photo
  router.get("/:photoid", async (req, res) => {
    try {
        let photo = await Photo.findOne({_id:req.params.photoid}).populate('user');
        let comments = await Comment.find({
            photo: photo
        }).populate('user');
        return res.send(comments);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
  });

  router.put("/helpful/:commentId", async (req, res) => {
        try {
            let comment = await Comment.findOne({_id:req.params.commentId});
            comment.helpful = comment.helpful + req.body.incrament;
            comment.save();
            
            res.send(comment);          
      } catch (error) {
          console.log(error);
          return res.sendStatus(500);
      }
  });

  router.put("/unhelpful/:commentId", async (req, res) => {
    try {
        let comment = await Comment.findOne({_id:req.params.commentId});
        comment.unhelpful = comment.unhelpful + req.body.incrament;
        comment.save();
        
        res.send(comment);          
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
  });

  router.delete("/:commentId", validUser, async (req, res) => {
      try {
        await Comment.deleteOne({
            user: req.user,
            _id: req.params.commentId
        });
        // TODO UPDATE AND SEND COMMENTS FOR PHOTO!!!!
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
  });


  module.exports = {
    model: Comment,
    routes: router,
  }