const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { //Author Id
    type: String,
    required: true,
    unique: false
  },
  userName: { // Author name
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
  },
  likedUsers: [{
    type: String,
    ref: 'User' 
  }],
  NFTID: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Post', postSchema);