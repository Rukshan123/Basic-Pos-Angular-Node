const mongoose=require('mongoose');
const AdminUserSchema=new mongoose.Schema({

   email:{
       type:String,
       required:true
   },
    password:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true,
    },

    contact:{
        type:String,
        required:true,
    }

});

module.exports=mongoose.model('adminUser',AdminUserSchema);