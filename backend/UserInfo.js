const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  checkedBlock: [{
    type: String
  }],

}, {
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);