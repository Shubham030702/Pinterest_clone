const mongoose = require('mongoose');
const plm = require("passport-local-mongoose")
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
    // You might want to add validation for email format
  },
  password: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  dp: {
    type: String, // Assuming dp is a URL or file path
  },
  bio: {
    type: String,
  },
  description: {
    type: String,
  },
  fullname: {
    type: String,
  },
});

userSchema.plugin(plm)

module.exports = mongoose.model('User', userSchema);

