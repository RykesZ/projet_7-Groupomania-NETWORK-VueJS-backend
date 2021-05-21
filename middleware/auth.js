const jwt = require('jsonwebtoken');

/* Middleware permettant de vérifier que l'utilisateur possède un token d'authentification
valide lui permettant d'accéder à la route à laquelle il tente d'accéder */
module.exports = (req, res, next) => {
  try {
    /* Isole le token de la requête grâce au " " entre Bearer et le token dans le header de la requête 
    Vérifie ensuite que le token est bien issu de la chaîne de caractères utilisée par le serveur pour générer des tokens
    Puis cherche le user associé à ce token*/
    //console.log(req.headers.authorization);
    //const token = req.headers.authorization.split(' ')[1];
    const token = req.query.token;
    console.log(token);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const tokenId = decodedToken.userId;
    //console.log(req.body);
    const userId = Number(req.query.userId);
    console.log(userId);
    /* Compare le userId associé à ce token et celui fourni par la requête. Si les deux sont identiques, 
    permet l'accès à la fonction suivante de la route, sinon renvoie une erreur */
    if (userId && userId !== tokenId) {
      throw 'Invalid user ID';
    } else if (userId && userId === tokenId) {
      //res.locals.tokenId = tokenId;
      next();
    } else {
      throw 'An error occured'
    }
  } catch(error) {
    res.status(401).json({
      error });
  }
};