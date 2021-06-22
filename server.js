require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication');
const commentRoutes = require('./routes/comment');

const app = express();

// parse everything
//app.use(formidable());

// parse requests of content-type: application/json
//app.use(express.json());

// for parsing multipart/form-data
//app.use(upload.array()); 
//app.use(express.static('public'));

// parse requests of content-type: application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

// Définition des headers autorisés pour les requêtes entrantes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Incroyable : sans ce truc obsolète, les req.files ne sont pas reconnus
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/comments', commentRoutes);

// set port, listen for requests
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});