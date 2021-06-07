const multer = require('multer');


// Redéfinit les extensions des différentes images qu'il faudra traiter
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
  /*'video/mp4': 'mp4',
  'video/m4v': 'm4v'*/
};


/* Indique dans quel répertoire il faudra stocker les fichiers sur le disque local 
et redéfinit le format du nom sous lequel les fichiers seront enregistrés */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file.mimetype)
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif') {
      callback(null, 'images');
    } else if (file.mimetype == 'video/mp4' || file.mimetype == 'video/m4v') {
      callback(null, 'videos');
    }

    
  },
  filename: (req, file, callback) => {
    const userId = req.body.userId;
    console.log(userId);
    const name = //`profilePictureOfUser${userId}`;
    file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Middleware permettant de stocker les images associées aux requêtes reçues par le serveur
module.exports = multer({storage: storage}).single('file')