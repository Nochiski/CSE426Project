const mongoose = require('mongoose');
const User = require('./UserInfo');
const Post = require('./Post')
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
};

const findAllPosts = async () => {
  const docs = await Post.find().sort({ createdAt: -1 });
  console.log(docs);
  return docs;
};

const findPostById = async (id) => {
  try {
    const docs = await Post.findOne({_id: id});
    return docs;
  }catch(err) {
    console.error('Error occurred in findPostById function: ', err);
    return null
  }
}

module.exports = {findUserByBIB39, findPostById, findAllPosts, connectDB};