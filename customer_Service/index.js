const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors =require('cors');


//////////////////////////////////////////////////////////
const CustomerRoute=require('./route/CustomerRoute');
const AdminUserRoute=require('./route/AdminUserRoute');
const OrderRoute=require('./route/OrderRoute');
//////////////////////////////////////////////////////////


const app = express();

app.use(bodyParser());
app.use(cors());

 mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{


     app.listen(3000,()=>{

         console.log('Customer service started on port 3000')
     });

 }).catch(err=>{
     console.log('try again')
 });

///////////////////////////////////////////////////////////////////////

app.use('/api/v1/customer',CustomerRoute);//http://localhost:3000/api/customer/saveCustomer(post) ==> save customer method
app.use('/api/v1/adminUser',AdminUserRoute);
app.use('/api/v1/orderRoute',OrderRoute);


/////////////////////////////////////////////////////////////////////////