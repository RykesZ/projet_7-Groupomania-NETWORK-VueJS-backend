const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const publicationCtrl = require('../controllers/publication');
const multer = require('../middleware/multer-config');

// Les différentes routes associées aux différents controllers pour les publications
router.post('/', auth, multer, publicationCtrl.createPublication);
router.get('/:pubId', auth, publicationCtrl.getOnePublication);
router.get('/', auth, publicationCtrl.getAllPublications);
router.put('/:pubId', auth, multer, publicationCtrl.modifyPublication);
router.delete('/', auth, publicationCtrl.deletePublication);
router.post('/:pubId/like/:like', auth, publicationCtrl.likePublication);

module.exports = router;
