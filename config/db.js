const mongoose = require('mongoose');
require('dotenv').config();

if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined!');
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
