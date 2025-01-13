const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method}: Request Received On ${req.url}`);
  next();
}
app.use(logger)

const startServer = async () => {
  try {
    await connectDB();

    routes(app);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
