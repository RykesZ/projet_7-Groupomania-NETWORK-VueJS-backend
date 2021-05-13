const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');


router.post('/', auth, commentCtrl.createComment);
router.get('/:pubId', auth, commentCtrl.getAllComments);
router.put('/:commId', auth, commentCtrl.modifyComment);
router.delete('/:commId', auth, commentCtrl.deleteComment);

module.exports = router;