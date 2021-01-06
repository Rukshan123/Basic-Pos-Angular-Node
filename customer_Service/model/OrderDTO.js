const mongoose=require('mongoose');
const OrderSchema=new mongoose.Schema({

    cId:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        required:true
    },

    items:{
        type:Array,
        required:true
    }
});

module.exports=mongoose.model('order',OrderSchema);