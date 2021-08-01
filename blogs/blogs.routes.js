const blogsRouter = require('express').Router();
const blogsController = require('./blogs.controller');

blogsRouter.get('/oneBlog/:id', blogsController.findBlog);
blogsRouter.get('/allBlogs', blogsController.findAllBlogs);
blogsRouter.post('/createBlog', blogsController.createBlog);
blogsRouter.put('/updateBlog/:id', blogsController.updateBlog);
blogsRouter.delete('/deleteBlog/:id', blogsController.deleteBlog);

module.exports = blogsRouter;