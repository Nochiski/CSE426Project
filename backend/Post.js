const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { //Author Id
    type: String,
    required: true,
    unique: true
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
    required: true
  } 
}, {
  timestamps: true 
});

module.exports = mongoose.model('Post', postSchema);