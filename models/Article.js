const mongoose = require('mongoose');
const Preference = require('../enums/preferencesEnum');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true, unique: true },
  source: { type: String },
  category: { type: String, enum: Object.values(Preference) },
  region: { type: String,enum: ['us', 'eu', 'asia'] },
  publishedAt: { type: Date, default: Date.now },
  content: { type: String },
  read: { type: Boolean, default: false },
  favorite: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

articleSchema.index({ url: 1, title: 'text', description: 'text', content: 'text' });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
