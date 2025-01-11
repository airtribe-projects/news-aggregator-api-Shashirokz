const { fetchNews } = require('../utils/newsAPI');
const { getUserById } = require('../services/userService');
const { saveArticle } = require('../services/articleService');
const Article = require('../models/Article');

const getArticles = async (req, res) => {
	try {
		const user = req.user;

		const dbUser = await getUserById(req.user.id);
		const preference = dbUser.preference;

		const articles = await fetchNews(preference);

		await Promise.all(
			articles.map(async (article) => {
				await saveArticle(article, user._id);
			})
		);

		res.json({ articles });
	} catch (error) {
		res.status(500).json({ message: 'Failed to fetch articles', error: error.message });
	}
}

const setArticleAsRead = async (req, res) => {
	try {
		const articleId = req.params.id;

		const article = await Article.findById(articleId);
		if (!article) {
			return res.status(404).json({ message: 'Article not found.' });
		}

		article.read = true;
		await article.save();

		res.json({ message: 'Article marked as read.', article });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to mark article as read', error: error.message });
	}
};

const setArticleAsFavorite = async (req, res) => {
	try {
		const articleId = req.params.id;

		const article = await Article.findById(articleId);
		if (!article) {
			return res.status(404).json({ message: 'Article not found.' });
		}

		article.favorite = true;
		await article.save();

		res.json({ message: 'Article marked as favorite.', article });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to mark article as favorite', error: error.message });
	}
};

const getReadArticles = async (req, res) => {
	try {
		const readArticles = await Article.find({ read: true });
		res.json({ readArticles });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to retrieve read articles', error: error.message });
	}
};

const getFavoriteArticles = async (req, res) => {
	try {
		const favoriteArticles = await Article.find({ favorite: true });
		res.json({ favoriteArticles });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Failed to retrieve favorite articles', error: error.message });
	}
};

const searchArticles = async (req, res) => {
	try {
		const keyword = req.params.keyword;

		const articles = await Article.find({
			$text: { $search: keyword }
		});

		if (articles.length === 0) {
			return res.status(404).json({ message: `No articles found for the given keyword : ${keyword}` });
		}

		res.json({ articles });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error', error: error.message });
	}
};

module.exports = {
	getArticles,
	setArticleAsRead,
	setArticleAsFavorite,
	getReadArticles,
	getFavoriteArticles,
	searchArticles
};
