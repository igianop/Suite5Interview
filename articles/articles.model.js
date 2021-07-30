const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Writers = require('../writers/writers.model')


const ArticlesModel = new Schema({
    title: { type: String, required:true },
    excerpt: { type: String, required:true },
    text: { type: String, required:true },
    dateCreated: { type: Date, required:true },
    dateUpdated: { type: Date, required:true },
    writer: { type: Schema.Types.ObjectId, ref:Writers, required:true },
    articleImage: { type: Buffer }
},{
    timestamps: true
});

const Articles = mongoose.model('Articles', ArticlesModel);

module.exports = Articles;