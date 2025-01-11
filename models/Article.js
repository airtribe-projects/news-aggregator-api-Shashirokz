const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  source: { type: String },
  category: { type: String },
  region: { type: String },
  publishedAt: { type: Date },
  content: { type: String },
  read: { type: Boolean, default: false },
  favorite: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

articleSchema.index({ title: 'text', description: 'text', content: 'text' });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
