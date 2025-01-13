const Article = require('../models/Article');

const saveArticle = async (articleData, userId) => {
	try {
		const existingArticle = await Article.findOne({ url: articleData.url });

		if (existingArticle) {
			return existingArticle;
		}

		const newArticle = new Article({
			title: articleData.title,
			description: articleData.description,
			url: articleData.url,
			source: articleData.source.name,
			category: articleData.category || 'general',
			region: articleData.region || 'us',
			publishedAt: articleData.publishedAt,
			content: articleData.content,
			read: false,
			favorite: false,
			user: userId,
		});

		return await newArticle.save();
	} catch (error) {
		console.error('Error details:', error);
		throw new Error('Error saving article: An unexpected error occurred. ' + error.message);
	}
};

module.exports = { saveArticle };
