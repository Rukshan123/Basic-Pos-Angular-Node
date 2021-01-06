const express=require('express');

const OrderController=require('../controller/OrderController');

const router=express.Router();


router.post('/placedOrder',OrderController.placeOrder);


module.exports=router;