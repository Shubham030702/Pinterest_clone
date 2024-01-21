var express = require('express');
var router = express.Router();
let userModel = require('./users')
let postModel = require('./post')
const passport = require('passport')
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()))
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/feed', function (req, res, next) {
  res.render('feed');
});
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render("profile")
});
router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login"
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
  userModel.register(userData,password).then(function () {
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
