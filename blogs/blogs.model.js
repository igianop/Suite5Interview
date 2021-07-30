const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Articles = require('../articles/articles.model');

const BlogsModel = new Schema({
    title: { type: String, required:true },
    articles: [{ type: Schema.Types.ObjectId, ref:Articles}]
},{
    timestamps: true
});

const Blog = mongoose.model('Blog', BlogsModel);

module.exports = Blog;