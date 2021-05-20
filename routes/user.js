const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/info', auth, userCtrl.getUserInfo)
router.put('/modify', auth, multer, userCtrl.modifyUser);
router.delete('/delete', auth, userCtrl.deleteUser);

module.exports = router;