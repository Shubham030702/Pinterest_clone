var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');
let userModel = require('./users')
let postModel = require('./post')
const passport = require('passport')
const upload = require("./multer")
const localStrategy = require('passport-local');
const { post } = require('../app');
passport.use(new localStrategy(userModel.authenticate()))

// Route to registration page
router.get('/', function (req, res, next) {
  res.render('index');
});

// Route to user 
router.get('/user/:id', async function (req, res, next) {
  const oid = new ObjectId(req.params.id)
  const userData = await userModel.findOne({ _id: oid }).populate("posts")
  res.render("user", { user: userData })
});

// Route to feed
router.get('/feed', isLoggedIn, async function (req, res, next) {
  const postdata= await postModel.find({
    user:{ $exists: true }
  }).populate("user")
  res.render("feed",{post:postdata});
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

// Route to upload
router.post('/upload', isLoggedIn, upload.single("file"), async function (req, res, next) {
  if (!req.file) {
    res.status(404).send("no files were given")
  }
  const user = await userModel.findOne({ username: req.session.passport.user })
  const postdata = await postModel.create({
    image: req.file.filename,
    imageText: req.body.filecaption,
    user: user._id
  })
  user.posts.push(postdata._id)
  await user.save()
  res.redirect("/profile")
});
router.get('/login', function (req, res, next) {
  res.render('login', { error: req.flash('error') });
});
router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
    .populate("posts")
  res.render("profile", { user })
});
router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
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
  userModel.register(userData, password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect('/profile');
    })
  })
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login")
}
module.exports = router;
