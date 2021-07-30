const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 9000;


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const writersRouter = require('./writers/writers.routes');
const blogsRouter = require('./blogs/blogs.routes');


app.use('/writers', writersRouter);
app.use('/blogss', blogsRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
