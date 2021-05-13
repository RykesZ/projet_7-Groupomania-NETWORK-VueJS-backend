require('dotenv').config()
const express = require("express");
const path = require('path');


const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication');
const commentRoutes = require('./routes/comment');

const app = express();


// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
/*app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});*/

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/publications', publicationRoutes);
//app.use('/api/comments', commentRoutes);

// set port, listen for requests
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});