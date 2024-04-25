const express=require('express');
const { getAlluser, registerController, loginController } = require('../controllers/userController');
//router object
const router = express.Router()
//get all user
router.get('/all-users',getAlluser);
//for register new user
router.post('/register',registerController);
//for login user
router.post('/login',loginController);
module.exports=router;





module.exports=router;