const mongoose = require('mongoose');

const dbURI = "mongodb://localhost:27017/users"; 

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, options);
    console.log("Success to connect mongoDB");
  } catch (err) {
    console.error("Fail to connect:", err.message);
  }
};

module.exports = connectDB;