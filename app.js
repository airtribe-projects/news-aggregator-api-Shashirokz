const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config()

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = (req, res, next) => {
  console.log(`${req.method}: Request Received On ${req.url}`)
  next()
}
app.use(logger)

const usersRoute = require('./routes/userRoutes');
const articlesRoute = require('./routes/articleRoutes');

const startServer = async () => {
  try {
    await connectDB();

    require('./routes')(app);

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