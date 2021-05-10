const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');


router.post('/', auth, commentCtrl.createComment);
router.get('/:pubUuid', auth, commentCtrl.getAllComments);
/*router.put('/:uuid', auth, commentCtrl.modifyComment);
router.delete('/:uuid', auth, commentCtrl.deleteComment);*/

module.exports = router;