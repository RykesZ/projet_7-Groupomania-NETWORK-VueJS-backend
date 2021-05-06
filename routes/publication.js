const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const publicationCtrl = require('../controllers/publication');
const multer = require('../middleware/multer-config');

// Les différentes routes associées aux différents controllers pour les publications
router.post('/', auth, multer, publicationCtrl.createPublication);
router.get('/:uuid', auth, publicationCtrl.getOnePublication);
router.get('/', auth, publicationCtrl.getAllPublications);
router.put('/:uuid', auth, multer, publicationCtrl.modifyPublication);
router.delete('/:uuid', auth, publicationCtrl.deletePublication);
router.post('/:uuid/like', auth, publicationCtrl.likePublication);

module.exports = router;
