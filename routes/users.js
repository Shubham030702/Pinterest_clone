const mongoose = require('mongoose');
const plm= require("passport-local-mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/app")
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique : true
  },
  email: {
    type: String,
    required: true,
    unique : true
    // You might want to add validation for email format
  },
  password: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Post'
  }],
  dp: {
    type: String, // Assuming dp is a URL or file path
  },
  fullname: {
    type: String,
  },
});

userSchema.plugin(plm)

module.exports = mongoose.model('User', userSchema);

