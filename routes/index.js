const userRoutes = require('./userRoutes');
const articleRoutes = require('./articleRoutes');

module.exports = (app) => {
  app.use('/apis/v1/users', userRoutes);
  app.use('/apis/v1/news', articleRoutes);
};