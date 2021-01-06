const express=require('express');

const AdminUserController=require('../controller/AdminUserController');

const router=express.Router();


router.post('/createAccount',AdminUserController.registerUser);
router.get('/loginAccount',AdminUserController.loginUser);


module.exports=router;