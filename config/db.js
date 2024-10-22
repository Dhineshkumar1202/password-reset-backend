

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://password789:password789@password-reset-cluster.wxa7m.mongodb.net/password-reset-cluster');
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;
