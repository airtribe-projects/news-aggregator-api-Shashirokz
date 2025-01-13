require('dotenv').config()
const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 });

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_URL = process.env.NEWS_URL;

const fetchNews = async (preference = '') => {
  const cacheKey = preference || 'general';

  if (!process.env.NEWS_API_KEY) {
    console.error('Server error: NEWS_API_KEY is not defined!');
    process.exit(1);
  }

  if (!process.env.NEWS_URL) {
    console.error('Server error: NEWS_URL is not defined!');
    process.exit(1);
  }

  const cachedArticles = cache.get(cacheKey);
  if (cachedArticles) {
    console.log('Returning cached articles');
    return cachedArticles;
  }

  try {
    const categoryParam = preference || 'general';

    const response = await axios.get(NEWS_URL, {
      params: {
        apiKey: NEWS_API_KEY,
        category: categoryParam,
        country: 'us',
        pageSize: 10,
      },
    });

    cache.set(cacheKey, response.data.articles);

    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news articles:', error.message);
    throw new Error('Unable to fetch news articles. Error: ${error.message}`');
  }
};

module.exports = { fetchNews };
