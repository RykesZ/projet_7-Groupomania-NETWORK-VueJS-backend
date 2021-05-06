const express = require('express');
const { sequelize } = require('./models');
const path = require('path');

const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication');
const commentRoutes = require('./routes/comment');

const app = express();
app.use(express.json());

app.listen({ port: 5000 }, async () => {
    console.log('Server up on http://localhost:5000');
    try {
        await sequelize.authenticate();
        console.log('Database Connected');
    } catch(err) {
        console.log('Unable to connect with database')
    }
    
});

// Définition des headers autorisés pour les requêtes entrantes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/auth', userRoutes);
  app.use('/api/publications', publicationRoutes);
  app.use('/api/comments', commentRoutes);

  module.exports = app;