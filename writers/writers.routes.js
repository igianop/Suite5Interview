const writersRouter = require('express').Router();
const writersController = require('./writers.controller');
const articlesController = require('../articles/articles.controller');
const blogsController = require('../blogs/blogs.controller');

//Endpoint for writers CRUD operations
writersRouter.get('/oneWriter/:id', writersController.findWriter);
writersRouter.get('/allWriters', writersController.findAllWriters);
writersRouter.post('/createWriter', writersController.createWriter);
writersRouter.put('/updateWriter/:id', writersController.updateWriter);
writersRouter.delete('/deleteWriter/:id', writersController.deleteWriter);

//Endpoints for writers operations in articles
writersRouter.get('/article/:id', articlesController.findArticle);
writersRouter.get('/articles', articlesController.findAllArticles);
writersRouter.post('/createArticle', articlesController.createArticles);
writersRouter.put('/updateArticle/:id', articlesController.updateArticle);
writersRouter.delete('/deleteArticle/:id', articlesController.deleteArticle);

//Endpoints for writers operations in blogs
writersRouter.put('/updateBlogArticle/:id', blogsController.updateBlogArticle);
writersRouter.delete('/deleteBlogArticles/:id', blogsController.deleteBlogArticles);

module.exports = writersRouter;