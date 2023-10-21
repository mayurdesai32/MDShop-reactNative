const express = require('express');
const singleUpload = require('../middleware/multer');
const {
  createuser,
  loginin,
  forgotPassword,
  logout,
  resetPassword,
  updatePassword,
  updateByUser,
  updatePicByUser,
  getUserProfile,
} = require('../controller/user');
const { authenticateUser } = require('../middleware/auth');
const router = express.Router();
router.post('/register', singleUpload, createuser);

router.post('/login', loginin);

router.post('/forgotpassword', forgotPassword);
router.get('/profile', authenticateUser, getUserProfile);
router.put('/resetpassword/:resetToken', resetPassword);
router.put('/updateprofile', authenticateUser, updateByUser);
router.put('/updatepic', authenticateUser, singleUpload, updatePicByUser);
router.put('/updatepassword', authenticateUser, updatePassword);
router.post('/logout', authenticateUser, logout);

module.exports = router;
