const mongoose = require('mongoose');
const User = require('./UserInfo');
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
    const docs = await User.findOne({ userId: bip39 });
    console.log(docs);
    return docs;
  } catch (error) {
    console.error('Error occurred in findUserByBIB39 function:', error);
    return null;
  }
}
module.exports = {findUserByBIB39, connectDB};