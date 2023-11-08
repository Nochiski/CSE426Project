const mongoose = require('mongoose');
const User = require('./UserInfo.js');
const dbURI = "mongodb://rootuser:rootpass@mongo:27017/Bwrite?authSource=admin";


const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Success to connect mongoDB");
  } catch (err) {
    console.error("Fail to connect:", err.message);
  }
};

const findUserByBIB39 = async (bip39) => {
    try {
        const user = await User.findOne({ username: bip39 });
        if (user) {
          console.log(user);
          return user;
        } else {
          console.log('Can not find user from :',bip39);
          return null;
        }
      } catch (error) {
        console.error('error occured in findUserByBIB39 function:', error);
      }    
}

module.exports = {findUserByBIB39, connectDB};