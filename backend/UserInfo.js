const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String, //BIP39
  userName: String
});

module.exports = mongoose.model('User', userSchema);
