const mongoose = require('mongoose');
const ArticlesModel = require('./articles.model');
const { isNil, isEmpty } = require('lodash');
const moment = require('moment');

const ArticlesController = {
    async createArticles(req, res){
        const article = new ArticlesModel({
            title: req.body.name,
            excerpt: req.body.excerpt,
            text: req.body.text,
            writer: req.body.writer,
            dateCreated: moment(req.body.dateCreated, ["MM-DD-YYYY", "DD-MM-YYYY"], 'gr', true),
            dateUpdated: moment(req.body.dateUpdated, ["MM-DD-YYYY", "DD-MM-YYYY"], 'gr', true),
        });

        await article.save();
        return res.status(200).json({message: "Article created", id: article._id});
    },
    async uploadImage(req, res){
        const article = await ArticlesModel.findById(req.params.id);
        // article.articleImage = ;
    },
    async updateArticle(req, res){
        req.body.dateCreated = moment(req.body.dateCreated, ["MM-DD-YYYY", "DD-MM-YYYY"], 'gr', true);
        req.body.dateUpdated = moment(req.body.dateUpdated, ["MM-DD-YYYY", "DD-MM-YYYY"], 'gr', true);
        const article = await ArticlesModel.findByIdAndUpdate({ _id: req.params.id }, req.body );
        if(isNil(article)){
            return res.status(404).json('Article not found');
        }
        return res.status(200).json({message: "Article updated", id: article._id});
    },
    async deleteArticle(req, res){
        const article = await ArticlesModel.findByIdAndDelete({ _id: req.params.id });
        if(isNil(article)){
            return res.status(404).json('Article not found');
        }
        return res.status(200).json("Article deleted");
    },
    async findArticle(req, res){
        const article = await ArticlesModel.findById( req.params.id ).populate('writer');

        if(isNil(article)){
            return res.status(404).json("Article not found");
        }

        return res.status(200).json({message: 'Article for specific id', Article: article});
    },
    async findAllArticles(req, res){
        const page = Number.parseInt(req.query.page ? req.query.page : '0');
        const itemsPerPage = Number.parseInt(req.query.itemsPerPage ? req.query.itemsPerPage : '20');
        const article = await ArticlesModel.find({ _id: req.params.id}).sort({ updatedAt: -1}).limit(itemsPerPage).skip(itemsPerPage * page).populate('writer');

        if(isEmpty(article)){
            return res.status(404).json("Articles not found");
        }

        return res.status(200).json({message:"You receive all Articles", Articles: article});
    }
};

module.exports = ArticlesController;