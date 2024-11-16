const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/login', userController.loginController);

router.post('/logout',userController.logoutController)

router.post('/register', userController.registerController);



router.get('/user-details/:userId', userController.getUserDetails);

module.exports = router;
