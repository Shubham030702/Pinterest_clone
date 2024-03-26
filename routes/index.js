var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
let userModel = require('./users')
let postModel = require('./post')
const passport = require('passport')
const multer = require("multer")
const localStrategy = require('passport-local');
const flash = require('connect-flash');
const session = require('express-session');
const { storage, display } = require('./multerConfig');

const app = express();
const upload = multer({ storage: storage });
const store = multer({ storage: display });
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

passport.use(new localStrategy(userModel.authenticate()))

// Route to registration page
router.get('/', function (req, res) {
  res.render('index', { error: req.flash('error') });
});


// Route to user 
router.get('/user/:id', async function (req, res, next) {
  const oid = new ObjectId(req.params.id)
  const user = await userModel.findOne({username: req.session.passport.user})
  if(user._id == req.params.id) res.redirect("/profile");
  const userData = await userModel.findOne({ _id: oid }).populate("posts")
  res.render("user", { user: userData })
});

// Route to feed
router.get('/feed', isLoggedIn, async function (req, res, next) {
  const postdata = await postModel.find({
    user: { $exists: true }
  }).populate("user").populate("likes")
  // res.send(postdata)
  res.render("feed", { post: postdata});
});

// Route to delete 
router.get('/delete/:id', isLoggedIn, async function (req, res, next) {
  const oid = new ObjectId(req.params.id)
  await postModel.deleteOne({ _id: oid })
  const user = await userModel.findOne({ username: req.session.passport.user })
  let index = user.posts.indexOf(oid);
  user.posts.splice(index, 1)
  user.save()
  res.redirect("/profile")
})

// route to like
router.post('/like/:id', isLoggedIn, async function (req, res, next) {
  const oid = new ObjectId(req.params.id);
  const post = await postModel.findOne({ _id: oid }).populate('likes', 'fullname'); // Populate likes with user's fullname
  const user = await userModel.findOne({ username: req.session.passport.user });
  if (!post || !user) {
    return res.status(404).json({ error: "Post or user not found" });
  }
  const likeIndex = post.likes.findIndex(element => element.equals(user._id));
  if (likeIndex !== -1) {
    post.likes.splice(likeIndex, 1);
  } else {
    post.likes.push(user._id);
  }
  await post.save();
  res.json({ success: true, post: post });
});



// Route to upload
router.post('/upload', isLoggedIn, upload.single("file"), async function (req, res, next) {
  try {
    const imageUrl = req.file.secure_url;
    console.log('Image uploaded successfully!');
    const user = await userModel.findOne({ username: req.session.passport.user });
    const postdata = await postModel.create({
      image: req.file.filename,
      imageText: req.body.filecaption,
      user: user._id
    });
    user.posts.push(postdata._id);
    await user.save();
    res.redirect('/profile')
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while processing your request" });
  }
});


router.post('/editprofile', isLoggedIn, store.single("file"), async function (req, res) {
  try {
    const user = await userModel.findOne({ username: req.session.passport.user });
    if (req.body.bio) {
      user.bio = req.body.bio;
    }
    if (req.body.description) {
      user.description = req.body.description;
    }
    if (req.file) {
      const imageUrl = req.file.secure_url;
      user.dp = req.file.filename;
    }
    await user.save();
    res.redirect("/profile");
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Internal Server Error");
  }
});


router.get('/login', function (req, res, next) {
  res.render('login', { error: req.flash('error') });
});

router.get('/upload', function (req, res, next) {
  res.render('upload', { error: req.flash('error') });
});

router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
    .populate("posts")
  res.render("profile", { user })
});

router.post('/login', passport.authenticate("local", {
  successRedirect: "/feed",
  failureRedirect: "/login",
  failureFlash: true
}), function (req, res) {
});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

router.post("/register", function (req, res) {
  const { username, email, password, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });
  userModel.register(userData, password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect('/feed');
      });
    })
    .catch(function (err) {
      if (err.code === 11000 && err.keyPattern && err.keyPattern.email === 1) {
        req.flash('error', 'This email address is already in use. Please use a different email.');
      } else {
        req.flash('error', err.message);
      }
      res.redirect('/');
    });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login")
}
module.exports = router;
