const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');
//Besoin d'utiliser multer pour prendre en charge les req.body en formdata
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, commentCtrl.createComment);
router.get('/:pubId', auth, commentCtrl.getAllComments);
router.put('/:commId', auth, multer, commentCtrl.modifyComment);
router.delete('/:commId', auth, commentCtrl.deleteComment);

module.exports = router;