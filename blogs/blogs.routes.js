const blogsRouter = require('express').Router();
const blogsController = require('./blogs.controller');

blogsRouter.get('/oneBlog/:id', blogsController.findBlog);
blogsRouter.get('/allBlogs', blogsController.findAllBlogs);
blogsRouter.post('/createWriter', blogsController.createBlog);
blogsRouter.put('/updateWriter/:id', blogsController.updateBlog);
blogsRouter.delete('/deleteWriter/:id', blogsController.deleteBlog);

module.exports = blogsRouter;