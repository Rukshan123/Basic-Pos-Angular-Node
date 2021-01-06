const AdminUserSchema=require('../model/AdminUserDTO');
const bcrypt = require('bcrypt');


const registerUser=(req,resp)=>{

    AdminUserSchema.findOne({email:req.body.email}).then(userObject=>{
        if(userObject==null){
            bcrypt.hash(req.body.password, 10, function(err, hash) {

                const user=new AdminUserSchema({

                    email:req.body.email,
                    password:hash,
                    name:req.body.name,
                    contact:req.body.contact,

                });

                user.save().then(result=>{
                    resp.status(200).json({isRegistered:true});
                }).catch(err=>{
                    resp.status(500).json(err);
                });


            });

        }else{
            resp.status(200).json({isRegistered:'Email Already Exists..'});
        }
    }).catch(errorObject=>{
        resp.status(500).json(errorObject);
    })




};


const loginUser=(req,resp)=>{


    AdminUserSchema.findOne({email:req.headers.email}).then(result=>{

        if (result!=null){
            bcrypt.compare(req.headers.password, result.password, function(err, final_Result) {

                if (final_Result===true){
                    const data={
                        email:result.email,
                        name:result.name,
                        contact:result.contact,
                    }
                    resp.status(200).json({message:"success..!",data:JSON.stringify(data)})
                }else {
                    resp.status(200).json({message:'Try Again'});
                }
            });

        }else{
            resp.status(200).json({message:'record not found here...!'});
        }

    }).catch(error=>{
        resp.status(500).json(error);
    });


};

module.exports={
    registerUser,
    loginUser
};