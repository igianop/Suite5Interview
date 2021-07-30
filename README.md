# Suite5Interview

## Project Description
There will be 3 entities (Writers, Blogs and Articles). A writer can write multiple articles,
articles can be published to many blogs and blogs can have multiple articles (from multiple
writers).
• Writers should include name, age and email, with all of them required
• Articles should include title, excerpt, text, date created, date updated, writer and an
article image (image is optional, rest are required)
• Blogs should have a title and a list of articles

## Tasks
1. Create REST endpoints for full CRUD operations on writers
2. Create REST endpoints for full CRUT operations on blogs
3. Writers should be able to create articles, edit, retrieve and delete them
4. Writers should be able to add and remove their articles in one or more blogs
5. Create an endpoint to retrieve all articles of a blog

## Built With
*[NodeJS](https://nodejs.org/en/)
*[Express](https://expressjs.com/)
*[MongoDB](https://www.mongodb.com/)

## Installation
1. Clone repo
```sh
git clone https://github.com/igianop/Suite5Interview.git
```
2. Install NPM packages
```sh
npm install
```
3.Create .env file in root folder with the following variables
```sh
ATLAS_URI = mongodb://127.0.0.1:27017/suite5
PORT = 4000
```
## Run the application
```sh
npm start
```

## Folders Explanation
For every entity we construct a separate folder with 3 files inside. 
For the Writers you will see a file that includes all the available routes to make the calls(writers.routes.js), a file which processes are managed depending on the endpoint you call (writers.controller.js) and a file which is the model of the database (writers.model.js). The same pattern followed for the other 2 entities (blogs and articles), except that the articles doesn't have routes because all management works from the writers routes.