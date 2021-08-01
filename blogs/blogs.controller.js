const mongoose = require('mongoose');
const BlogsModel = require('./blogs.model');
const { isNil, isEmpty } = require('lodash');


const BlogsController = {
    async createBlog(req, res){
        const blog = new BlogsModel({
            title: req.body.title,
            articles: req.body.articles
        });

        await blog.save();
        return res.status(200).json({message: "Blog created", id: blog._id});
    },
    async updateBlog(req, res){
        const blog = await BlogsModel.findByIdAndUpdate({ _id: req.params.id }, req.body );
        if(isNil(blog)){
            return res.status(404).json('Blog not found');
        }
        return res.status(200).json({message: "Blog updated", id: blog._id});
    },
    async updateBlogArticle(req, res){
        const blog = await BlogsModel.findById(req.params.id);
        if(isEmpty(blog)){
            return res.status(404).json('Blog not found');
        }
        blog.articles.push(req.body.articles);
        await blog.save();
        return res.status(200).json({message: "Blog updated", id: blog._id});
    },
    async deleteBlog(req, res){
        const blog = await BlogsModel.findByIdAndDelete({ _id: req.params.id });
        if(isNil(blog)){
            return res.status(404).json('Blog not found');
        }
        return res.status(200).json("Blog deleted");
    },
    async deleteBlogArticles(req, res){
        const blogs = await BlogsModel.find({ articles: req.params.id});
        if(isEmpty(blogs)){
            return res.status(404).json('Blog for given article not found');
        }
        const blogArticle = blogs[0].articles.indexOf(req.params.id);
            if(blogArticle > -1){
                blogs[0].articles.splice(blogArticle, 1);
            }
        const updatedBlog = await BlogsModel.findByIdAndUpdate({_id: blogs[0]._id}, blogs[0]);
        return res.status(200).json("Article in blog deleted");
    },
    async findBlog(req, res){
        const blog = await BlogsModel.findById( req.params.id ).populate('articles');

        if(isNil(blog)){
            return res.status(404).json("Blog not found");
        }

        return res.status(200).json({message: 'Blog for specific id', blog: blog});
    },
    async findAllBlogs(req, res){
        const page = Number.parseInt(req.query.page ? req.query.page : '0');
        const itemsPerPage = Number.parseInt(req.query.itemsPerPage ? req.query.itemsPerPage : '20');
        const blogs = await BlogsModel.find({}).sort({ updatedAt: -1}).limit(itemsPerPage).skip(itemsPerPage * page).populate('articles');

        if(isEmpty(blogs)){
            return res.status(404).json("Blogs not found");
        }

        return res.status(200).json({message:"You receive all blogs", blogs: blogs});
    }
};

module.exports = BlogsController;