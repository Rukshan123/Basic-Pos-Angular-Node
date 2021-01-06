const express=require('express');

const CustomerController=require('../controller/CustomerController');

const router=express.Router();


router.post('/saveCustomer',CustomerController.saveCustomer);
router.get('/getAllCustomer',CustomerController.getAllCustomer);
router.put('/updateCustomer',CustomerController.updateCustomer);
router.delete('/deleteCustomer',CustomerController.deleteCustomer);
router.get('/getCustomerByID',CustomerController.getCustomerByID);
router.get('/getCustomerWithOrders',CustomerController.getCustomerWithOrder);
router.get('/getChartData',CustomerController.getChartData);

module.exports=router;