const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


// connect to the database
mongoose.connect('mongodb://localhost:27017/piqtour', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a schema for users
const userSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  age: Number,
  // path: String, // For possible avatar image
});

const User = mongoose.model('User', userSchema);

// Scheme for the images
const imageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  title: String,
  description: String,
  location: String,
  userid: String,
  path: String,
  // upticks: Number,
});

// Create a model for items in the museum.
const Image = mongoose.model('Image', imageSchema);

app.listen(3000, () => console.log('Server listening on port 3000!'));


// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Creates a new user
app.post('/api/users', async (req, res) => {
  console.log("adding user");
  const user = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
  });
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Post new image info.
app.post('/api/users/:userID/images', async (req, res) => {
  try {
    let user = await User.findOne({_id: req.params.userID});
    if (!user) {
      res.send(404);
      return;
    }
    let image = new Image({
      user: user,
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      userid: req.body.userid,
      path: req.body.path,
    });
    await image.save();
    res.send(image);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of all the users
app.get('/api/users/', async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a users info
app.get('/api/users/:userid', async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.params.userid
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all Images for a user
app.get('/api/users/:userID/images', async (req, res) => {
  try {
    let user = await User.findOne({_id: req.params.userID});
    if (!user) {
      res.send(404);
      return;
    }
    let images = await Image.find({user:user}).populate('user');
    res.send(images);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the images
app.get('/api/images', async (req, res) => {  // /users/
  try {
    let images = await Image.find();
    res.send(images);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// FIXMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE - req.params.imageID
// Get a list of all of the images
app.get('/api/users/images/:imageID', async (req, res) => {
  try {
    let images = await Image.findOne({_id:imageID});
    res.send(images);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Modify existing data for an existing image
app.put('/api/users/:userID/images/:imageID', async (req, res) => {
  try {
      let image = await Image.findOne({_id:req.params.imageID, project: req.params.userID});
      if (!image) {
          res.send(404);
          return;
      }
      image.title = req.body.title;
      image.description = req.body.description;
      image.location = req.body.location;
      await image.save();
      res.send(image);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});


// Delete am image
app.delete('/api/users/images/:imageid', async (req, res) => {
  try {
    await Image.deleteOne({
      _id: req.params.imageid
    });
    let images = await Image.find();
    res.send(images);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// delete a user
app.delete('/api/users/:userid', async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.userid
    });
    res.send(users)
    // let items = await Item.find();
    // res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


//  TODO: Be able to modify existing users

// Update a user
app.put('/api/users/:userid', async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.params.userid
    });
    user.username = req.body.username;
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.age = req.body.age;
    user.save();

    // Added so that currently selected object is deselected (personal preference)
    let users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// // Get a list of all of the sights added by a user.
// app.get('/api/users/:userid/images', async (req, res) => {
//   try {
//     let sights = await Sight.find({
//       userid: req.params.userid
//     });
//     res.send(sights);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });


// // Update an item
// app.put('/api/images/:photoid', async (req, res) => {
//   try {
//     let image = await Image.findOne({
//       _id: req.params.photoid
//     });
//     image.title = req.body.title;
//     image.description = req.body.description;
//     image.location = req.body.location;
//     image.userid = req.body.userid;
//     image.save();

//     // Added so that currently selected object is deselected (personal preference)
//     let images = await Image.find();
//     res.send(images);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });




