const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getArticles,
  setArticleAsRead,
  setArticleAsFavorite,
  getReadArticles,
  getFavoriteArticles,
  searchArticles
} = require('../controllers/articleController');

const router = express.Router();

router.get('/', protect, getArticles);

router.post('/:id/read', protect, setArticleAsRead);
router.post('/:id/favorite', protect, setArticleAsFavorite);
router.get('/read', protect, getReadArticles);
router.get('/favorites', protect, getFavoriteArticles);

router.get('/search/:keyword', protect, searchArticles);

module.exports = router;
